# AIVY Agents System Architecture
*Production-Grade Multi-Agent System for FabriiQ Marketing & Operations*

## Executive Summary

AIVY Agents is a production-grade, multi-agent system built on 12-factor principles that handles visitor engagement, CRM management, content creation, research, and email automation for FabriiQ. The system integrates with existing RAG infrastructure while adding autonomous capabilities for marketing and sales operations.

---

## System Architecture Overview

### Core Components

```
┌─────────────────────────────────────────────────────────────┐
│                    AIVY Agents Orchestrator                  │
│               (Stateless Reducer Pattern)                    │
└──────────────────┬──────────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼────────┐   ┌───────▼────────┐
│  Agent Layer   │   │   Tool Layer    │
│  (Specialized) │   │   (Shared)      │
└───────┬────────┘   └───────┬────────┘
        │                     │
┌───────▼─────────────────────▼────────┐
│        Infrastructure Layer           │
│  - Supabase RAG                       │
│  - CRM Database                       │
│  - External APIs                      │
│  - Content Storage                    │
└───────────────────────────────────────┘
```

---

## 12-Factor Principles Implementation

### Factor 1: Explicit Tools, Not Function Calling
**Implementation**: Define clear, single-purpose tools with explicit schemas

```typescript
// Bad: Implicit function calling
agent.call("send_email", {content: "..."})

// Good: Explicit tool definition
const SendEmailTool = {
  name: "send_email_to_lead",
  description: "Send personalized email to a qualified lead in CRM",
  schema: z.object({
    lead_id: z.string(),
    email_type: z.enum(["intro", "follow_up", "partnership"]),
    context: z.object({
      pain_points: z.array(z.string()),
      institution_type: z.string(),
    })
  }),
  execute: async (params) => { /* ... */ }
}
```

### Factor 2: Prompts as Source Code
**Implementation**: Version-controlled, testable prompts

```typescript
// prompts/visitor-engagement.ts
export const VISITOR_ENGAGEMENT_PROMPT = {
  version: "2.1.0",
  system: `You are AIVY, FabriiQ's conversational assistant...`,
  
  templates: {
    initial_greeting: (name: string) => 
      `Hello ${name}! I'm AIVY, and I'm here to help you understand how FabriiQ can transform your educational operations.`,
    
    follow_up_question: (context: VisitorContext) =>
      `Based on your interest in ${context.topic}, ${generateQuestion(context)}`
  },
  
  // Testable assertions
  tests: [
    {
      input: {role: "CFO", query: "costs"},
      expectedIntent: "financial_concerns",
      expectedMentions: ["TCO", "ROI"]
    }
  ]
}
```

### Factor 3: State Machines, Not Vibes
**Implementation**: Explicit conversation states

```typescript
type ConversationState = 
  | "initial_contact"
  | "exploring_needs"
  | "demonstrating_value"
  | "addressing_concerns"
  | "partnership_discussion"
  | "scheduling_demo"
  | "qualified_lead"
  | "unqualified_lead";

type ConversationEvent =
  | { type: "visitor_asks_question", question: string }
  | { type: "expresses_interest", area: string }
  | { type: "raises_concern", concern: string }
  | { type: "requests_demo" }
  | { type: "provides_contact", contact: ContactInfo };

const conversationMachine = {
  initial: "initial_contact",
  states: {
    initial_contact: {
      on: {
        visitor_asks_question: {
          target: "exploring_needs",
          actions: ["analyzeIntent", "checkCRMHistory"]
        }
      }
    },
    exploring_needs: {
      on: {
        expresses_interest: {
          target: "demonstrating_value",
          actions: ["logInterest", "selectRelevantCapability"]
        },
        raises_concern: {
          target: "addressing_concerns",
          actions: ["categorize", "prepareResponse"]
        }
      }
    },
    // ... more states
  }
}
```

### Factor 4: Idempotent Operations
**Implementation**: Every action can be safely retried

```typescript
class CRMOperations {
  async createOrUpdateLead(params: LeadParams): Promise<Lead> {
    // Idempotency key from conversation + email
    const idempotencyKey = hash(`${params.conversationId}-${params.email}`);
    
    // Check if already processed
    const existing = await this.db.leads.findByKey(idempotencyKey);
    if (existing) return existing;
    
    // Create with idempotency key
    return await this.db.leads.upsert({
      ...params,
      idempotencyKey,
      createdAt: params.createdAt || new Date()
    });
  }
  
  async sendEmail(params: EmailParams): Promise<EmailResult> {
    const messageId = hash(`${params.leadId}-${params.template}-${params.timestamp}`);
    
    // Check if email already sent
    const sent = await this.emailLog.findByMessageId(messageId);
    if (sent) return { status: "already_sent", messageId };
    
    // Send and log atomically
    const result = await this.emailProvider.send({...params, messageId});
    await this.emailLog.create({messageId, ...result});
    
    return result;
  }
}
```

### Factor 5: Reproducible Execution
**Implementation**: Deterministic agent behavior with fixed seeds

```typescript
class AgentExecutor {
  async executeWithReproducibility(
    agent: Agent,
    input: AgentInput,
    options: {
      seed?: number,
      temperature?: number,
      maxTokens?: number
    } = {}
  ): Promise<AgentOutput> {
    const config = {
      seed: options.seed ?? generateDeterministicSeed(input),
      temperature: options.temperature ?? 0.7,
      maxTokens: options.maxTokens ?? 1000,
      timestamp: input.timestamp, // Use input timestamp, not current
    };
    
    // Log for reproducibility
    await this.auditLog.record({
      agentId: agent.id,
      input: input,
      config: config,
      executionId: generateExecutionId(input, config)
    });
    
    return await agent.execute(input, config);
  }
}
```

### Factor 6: Structured Outputs
**Implementation**: Zod schemas for all agent responses

```typescript
// Agent output schemas
const VisitorAnalysisOutput = z.object({
  executiveRole: z.enum(["CFO", "CIO", "CAO", "Superintendent", "Other"]),
  primaryConcerns: z.array(z.string()).min(1).max(3),
  qualificationScore: z.number().min(0).max(100),
  suggestedResponse: z.object({
    insight: z.string(),
    capability: z.string(),
    question: z.string()
  }),
  crmActions: z.array(z.object({
    action: z.enum(["create_lead", "update_lead", "log_interaction"]),
    params: z.record(z.any())
  }))
});

// Usage
const analysis = await visitorAgent.analyze(conversation);
const validated = VisitorAnalysisOutput.parse(analysis); // Type-safe!
```

### Factor 7: Observable Actions
**Implementation**: Comprehensive logging and tracing

```typescript
class ObservableAgent {
  async execute(input: AgentInput): Promise<AgentOutput> {
    const traceId = generateTraceId();
    const span = this.tracer.startSpan("agent.execute", { traceId });
    
    try {
      // Log input
      await this.logger.info("Agent execution started", {
        traceId,
        agentId: this.id,
        input: sanitize(input),
        timestamp: Date.now()
      });
      
      // Execute with instrumentation
      const tools = this.tools.map(tool => 
        this.instrumentTool(tool, traceId)
      );
      
      const output = await this.runAgent(input, tools);
      
      // Log output
      await this.logger.info("Agent execution completed", {
        traceId,
        output: sanitize(output),
        duration: span.duration()
      });
      
      return output;
    } catch (error) {
      await this.logger.error("Agent execution failed", {
        traceId,
        error: serializeError(error)
      });
      throw error;
    } finally {
      span.end();
    }
  }
}
```

### Factor 8: Humans in the Loop
**Implementation**: Approval workflows for critical actions

```typescript
interface HumanApprovalRequired {
  action: "send_partnership_email" | "schedule_demo" | "mark_as_qualified";
  context: Record<string, any>;
  explanation: string;
  urgency: "low" | "medium" | "high";
}

class HumanLoopManager {
  async requireApproval(
    agent: Agent,
    action: HumanApprovalRequired
  ): Promise<ApprovalDecision> {
    // Create approval request
    const request = await this.db.approvalRequests.create({
      agentId: agent.id,
      action: action.action,
      context: action.context,
      explanation: action.explanation,
      status: "pending",
      createdAt: new Date()
    });
    
    // Notify human reviewer
    await this.notifications.send({
      channel: "slack",
      message: this.formatApprovalRequest(request),
      urgency: action.urgency
    });
    
    // Wait for approval (with timeout)
    return await this.waitForApproval(request.id, {
      timeout: action.urgency === "high" ? 3600 : 86400 // 1h or 24h
    });
  }
}
```

### Factor 9: No Fine-Tuning
**Implementation**: Prompt engineering and RAG instead

```typescript
class PromptBasedAgent {
  constructor(
    private ragSystem: RAGSystem,
    private promptLibrary: PromptLibrary
  ) {}
  
  async respond(query: string, context: ConversationContext): Promise<string> {
    // Retrieve relevant knowledge
    const knowledge = await this.ragSystem.search({
      query: query,
      filters: {
        role: context.executiveRole,
        concernArea: context.primaryConcern
      },
      topK: 5
    });
    
    // Select appropriate prompt template
    const prompt = this.promptLibrary.select({
      conversationState: context.state,
      executiveRole: context.executiveRole,
      intent: context.intent
    });
    
    // Construct prompt with retrieved knowledge
    return await this.llm.generate({
      system: prompt.system,
      messages: [
        ...prompt.examples,
        {
          role: "user",
          content: prompt.formatUserQuery(query, knowledge)
        }
      ]
    });
  }
}
```

### Factor 10: Small, Focused Agents
**Implementation**: Single-responsibility agents (see Agent Personas below)

### Factor 11: Auditable
**Implementation**: Complete audit trail

```typescript
class AuditSystem {
  async logAgentAction(action: AgentAction): Promise<void> {
    await this.db.auditLog.create({
      timestamp: new Date(),
      agentId: action.agentId,
      action: action.type,
      input: action.input,
      output: action.output,
      toolsCalled: action.toolsCalled,
      tokens: action.tokenUsage,
      cost: action.estimatedCost,
      humanApproved: action.humanApproved,
      success: action.success,
      error: action.error,
      traceId: action.traceId
    });
  }
  
  async generateComplianceReport(
    startDate: Date,
    endDate: Date
  ): Promise<ComplianceReport> {
    const actions = await this.db.auditLog.findBetween(startDate, endDate);
    
    return {
      totalActions: actions.length,
      byAgent: groupBy(actions, 'agentId'),
      humanApprovalRate: calculateApprovalRate(actions),
      errors: actions.filter(a => !a.success),
      costs: sumBy(actions, 'cost'),
      dataAccessed: extractDataAccess(actions)
    };
  }
}
```

### Factor 12: Stateless Reducer
**Implementation**: Pure functions, external state

```typescript
type AgentState = {
  conversationHistory: Message[];
  crmData: CRMRecord | null;
  qualificationScore: number;
  nextActions: Action[];
};

type AgentAction =
  | { type: "visitor_message", content: string }
  | { type: "crm_data_loaded", data: CRMRecord }
  | { type: "qualification_updated", score: number }
  | { type: "action_completed", actionId: string };

// Pure reducer function
function agentReducer(
  state: AgentState,
  action: AgentAction
): AgentState {
  switch (action.type) {
    case "visitor_message":
      return {
        ...state,
        conversationHistory: [...state.conversationHistory, {
          role: "user",
          content: action.content,
          timestamp: Date.now()
        }]
      };
    
    case "qualification_updated":
      return {
        ...state,
        qualificationScore: action.score,
        nextActions: deriveNextActions(state, action.score)
      };
    
    default:
      return state;
  }
}

// Agent executor (stateless)
class StatelessAgentExecutor {
  async execute(
    state: AgentState,
    input: AgentInput
  ): Promise<{ newState: AgentState, output: AgentOutput }> {
    // Load current state from external store
    const currentState = await this.stateStore.load(state.id);
    
    // Execute agent logic (pure function)
    const action = await this.decideAction(currentState, input);
    const newState = agentReducer(currentState, action);
    
    // Save new state to external store
    await this.stateStore.save(state.id, newState);
    
    return { newState, output: action };
  }
}
```

---

## Agent Personas & Responsibilities

### 1. **Visitor Engagement Agent** (Primary Interface)

**Persona**: Senior Educational Technology Consultant  
**Primary Responsibility**: Real-time visitor conversation on FabriiQ website

**Capabilities**:
- Engage visitors using AIVY conversational style
- Analyze executive role and intent from questions
- Provide strategic insights (not feature dumps)
- Qualify leads based on conversation patterns
- Trigger CRM updates in real-time

**Tools**:
- `analyze_visitor_intent(conversation)` → Returns executive role, concerns, qualification score
- `search_knowledge_base(query, filters)` → RAG search for FabriiQ capabilities
- `format_executive_response(insight, capability, question)` → Structured response
- `update_crm_visitor(visitorId, data)` → Real-time CRM logging
- `escalate_to_human(reason, context)` → Human loop for high-value leads

**State Machine**:
```
initial_contact → exploring_needs → {
  demonstrating_value → partnership_discussion → qualified_lead
  addressing_concerns → exploring_needs (loop)
  unqualified → polite_conclusion
}
```

**Metrics**:
- Conversation depth (message count)
- Qualification rate (% reaching qualified_lead)
- Response relevance score
- Lead conversion rate

---

### 2. **CRM Manager Agent**

**Persona**: Operations Manager  
**Primary Responsibility**: Manage leads and interactions in CRM

**Capabilities**:
- Create/update lead records from conversations
- Enrich lead data from research
- Score and qualify leads automatically
- Track lead journey and touchpoints
- Identify follow-up opportunities

**Tools**:
- `create_lead(contactInfo, source, context)` → Idempotent lead creation
- `update_lead_score(leadId, factors)` → Calculate qualification score
- `log_interaction(leadId, type, content)` → Track touchpoints
- `identify_follow_up(leadId)` → Determine next action timing
- `segment_leads(criteria)` → Group for targeted campaigns

**Decision Logic**:
```typescript
if (qualificationScore > 80 && hasExecutiveContact) {
  action = "schedule_demo_outreach"
} else if (qualificationScore > 60) {
  action = "nurture_email_sequence"
} else if (concernsAddressed < 2) {
  action = "educational_content"
} else {
  action = "monthly_newsletter_only"
}
```

---

### 3. **Research Agent**

**Persona**: Market Research Analyst  
**Primary Responsibility**: Online research for leads and content

**Capabilities**:
- Research institutions mentioned by visitors
- Gather competitive intelligence
- Find relevant case studies and statistics
- Monitor educational technology trends
- Enrich CRM data with institutional context

**Tools**:
- `search_web(query, filters)` → Web search API
- `extract_institution_data(name)` → Scrape institution website/LinkedIn
- `find_decision_makers(institution)` → LinkedIn/ZoomInfo lookup
- `monitor_edtech_news(topics)` → RSS/news aggregation
- `analyze_competitor(name)` → Competitive intelligence

**Workflow Example**:
```
Trigger: Lead mentions "University of XYZ"
  ↓
1. Search web for "University of XYZ multi-campus operations"
2. Extract: # campuses, enrollment size, current tech stack (if public)
3. Find decision-makers: CIO, CFO names from LinkedIn
4. Check recent news: expansion plans, technology initiatives
5. Update CRM with enriched data
6. Suggest personalized talking points for follow-up
```

---

### 4. **Content Creation Agent**

**Persona**: Educational Technology Writer  
**Primary Responsibility**: Generate blogs, social posts, case studies

**Capabilities**:
- Write blog posts on educational technology topics
- Create social media content (LinkedIn, Twitter)
- Generate email templates for campaigns
- Develop case study narratives
- Produce thought leadership content

**Tools**:
- `generate_blog_post(topic, outline, targetAudience)` → Long-form content
- `create_social_post(topic, platform, length)` → Platform-optimized posts
- `write_email_sequence(leadSegment, campaign)` → Email series
- `develop_case_study(clientData, outcomes)` → Success story
- `research_topic(subject)` → Calls Research Agent for facts

**Content Types**:
1. **Blog Posts**: 
   - "Beyond LMS: Why Educational Institutions Need Operating Systems"
   - "Multi-Campus Governance in the Digital Age"
   - "The ROI of Unified Educational Technology"

2. **Social Media**:
   - LinkedIn thought leadership
   - Twitter educational tech insights
   - Feature announcements
   - Customer success highlights

3. **Email Campaigns**:
   - Lead nurture sequences
   - Partnership invitation series
   - Educational content drips
   - Event invitations

**Quality Checks**:
- Educational accuracy (calls RAG for FabriiQ facts)
- Tone alignment (Pi AI-inspired, consultative)
- SEO optimization
- Human review for publication

---

### 5. **Email Agent**

**Persona**: Sales Development Representative  
**Primary Responsibility**: Handle email communications with leads

**Capabilities**:
- Draft personalized outreach emails
- Respond to inbound inquiries
- Schedule follow-ups based on lead behavior
- A/B test email variations
- Track email engagement and optimize

**Tools**:
- `draft_email(leadId, template, personalization)` → Generate email
- `send_email(leadId, content, schedule)` → Send via CRM/email provider
- `track_engagement(emailId)` → Monitor opens, clicks, replies
- `optimize_send_time(leadProfile)` → Best time to send
- `require_human_approval(emailType, leadValue)` → Human loop for high-stakes

**Email Types**:
1. **Initial Outreach**: Cold emails to qualified leads
2. **Follow-Up**: Post-conversation or demo follow-ups
3. **Nurture**: Educational content delivery
4. **Partnership Invitation**: Development partner outreach
5. **Response**: Answers to inbound questions

**Human Approval Required**:
- Partnership invitation emails (high-stakes)
- Custom pricing discussions
- C-suite outreach at large institutions
- Any email > $50K potential deal value

---

### 6. **Scheduler Agent**

**Persona**: Executive Assistant  
**Primary Responsibility**: Schedule demos, meetings, follow-ups

**Capabilities**:
- Schedule demo calls with qualified leads
- Coordinate partnership discussions
- Manage follow-up reminders
- Handle calendar conflicts
- Send meeting prep materials

**Tools**:
- `check_availability(teamMember, dateRange)` → Calendar API
- `schedule_meeting(leadId, type, duration)` → Create calendar event
- `send_calendar_invite(meetingId, attendees)` → Email invitation
- `prepare_meeting_materials(meetingId, leadContext)` → Generate brief
- `set_reminder(leadId, action, when)` → Future task

**Meeting Types**:
- Discovery calls (30 min)
- Platform demos (45 min)
- Partnership discussions (60 min)
- Technical deep-dives (90 min)

---

### 7. **Analytics Agent**

**Persona**: Data Analyst  
**Primary Responsibility**: Analyze performance and provide insights

**Capabilities**:
- Track conversion funnel metrics
- Analyze conversation patterns
- Measure agent performance
- Identify optimization opportunities
- Generate executive reports

**Tools**:
- `query_metrics(dateRange, dimensions)` → Analytics database
- `calculate_conversion_rate(segment)` → Funnel analysis
- `analyze_conversation_quality(agentId)` → Agent performance
- `identify_drop_offs(funnelStage)` → Bottleneck detection
- `generate_report(reportType, period)` → Executive dashboard

**Key Metrics**:
- **Visitor Engagement**: Avg messages per conversation, bounce rate
- **Lead Quality**: Qualification rate, lead score distribution
- **Conversion**: Visitor→Lead, Lead→Demo, Demo→Partner
- **Agent Performance**: Response time, accuracy, human escalation rate
- **Content**: Blog traffic, social engagement, email open rates
- **ROI**: Cost per lead, cost per demo, cost per partner

---

## System Integration Architecture

### Data Flow

```
Website Visitor
    ↓
┌───────────────────┐
│ Visitor Engagement│ ← RAG System (existing)
│     Agent         │
└─────────┬─────────┘
          ↓
    ┌─────┴─────┐
    │           │
┌───▼────┐  ┌──▼─────┐
│CRM Mgr │  │Research│
│ Agent  │  │ Agent  │
└───┬────┘  └──┬─────┘
    │          │
    ↓          ↓
┌───────────────────┐
│   CRM Database    │
│   (Supabase)      │
└─────────┬─────────┘
          │
    ┌─────┴────┐
    │          │
┌───▼───┐  ┌──▼──────┐
│Email  │  │Scheduler│
│Agent  │  │ Agent   │
└───────┘  └─────────┘
```

### Tool Sharing Architecture

```typescript
// Shared tool registry
const ToolRegistry = {
  // CRM tools (used by multiple agents)
  crm: {
    createLead: CreateLeadTool,
    updateLead: UpdateLeadTool,
    searchLeads: SearchLeadsTool,
  },
  
  // Communication tools
  communication: {
    sendEmail: SendEmailTool,
    scheduleEmail: ScheduleEmailTool,
    sendSlackNotification: SlackNotificationTool,
  },
  
  // Research tools
  research: {
    searchWeb: WebSearchTool,
    scrapeWebsite: WebScrapeTool,
    enrichData: DataEnrichmentTool,
  },
  
  // Content tools
  content: {
    generateText: TextGenerationTool,
    optimizeSEO: SEOOptimizationTool,
    checkGrammar: GrammarCheckTool,
  }
};

// Agent tool assignment
const VisitorAgent = new Agent({
  tools: [
    ToolRegistry.crm.createLead,
    ToolRegistry.crm.updateLead,
    // specific tools only
  ]
});
```

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)
**Goal**: Core infrastructure and Visitor Engagement Agent

**Deliverables**:
- 12-factor architecture implementation
- Visitor Engagement Agent (AIVY conversational interface)
- CRM integration (Supabase schema + basic CRUD)
- Observability setup (logging, tracing)
- Human approval workflow

**Success Criteria**:
- Visitor conversations are logged and analyzable
- Lead creation is automatic and idempotent
- Human approval works for high-value interactions
- All actions are auditable

### Phase 2: CRM & Research (Weeks 5-8)
**Goal**: Intelligent lead management and enrichment

**Deliverables**:
- CRM Manager Agent with lead scoring
- Research Agent with web search capability
- Lead enrichment workflows
- Automated follow-up triggers

**Success Criteria**:
- Leads are automatically qualified and scored
- Institution data is enriched from web research
- Follow-up actions are suggested and scheduled
- 80%+ data accuracy in enrichment

### Phase 3: Content & Email (Weeks 9-12)
**Goal**: Automated content creation and outreach

**Deliverables**:
- Content Creation Agent with blog/social generation
- Email Agent with template library
- A/B testing framework for emails
- Content approval workflow

**Success Criteria**:
- Blog posts generated weekly (with human review)
- Social content posted daily (automated)
- Email sequences running automatically
- 20%+ email open rate improvement

### Phase 4: Scheduling & Analytics (Weeks 13-16)
**Goal**: Complete automation and optimization

**Deliverables**:
- Scheduler Agent with calendar integration
- Analytics Agent with dashboards
- Optimization recommendations
- Executive reporting

**Success Criteria**:
- Demos scheduled automatically (human confirmed)
- Weekly analytics reports generated
- Conversion funnel optimized
- Agent performance tracked and improving

---

## Technology Stack

### Core Framework
- **Language**: TypeScript/Node.js
- **Agent Framework**: LangGraph or custom (following 12-factor principles)
- **LLM**: Claude 3.5 Sonnet (via Anthropic API)
- **State Management**: Supabase (PostgreSQL + Realtime)

### Infrastructure
- **RAG**: Existing Supabase vector store
- **CRM**: Supabase tables with custom schema
- **Email**: SendGrid or Resend API
- **Calendar**: Google Calendar API or Calendly
- **Web Search**: Brave Search API or Tavily
- **Analytics**: PostHog or Mixpanel

### Observability
- **Logging**: Pino + Supabase logs
- **Tracing**: OpenTelemetry
- **Monitoring**: Sentry for errors
- **Dashboards**: Grafana or custom

### Development
- **Testing**: Vitest + Playwright
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel or Railway
- **Version Control**: Git with prompt versioning

---

## Security & Compliance

### Data Protection
- **Encryption**: All PII encrypted at rest (AES-256)
- **Access Control**: Role-based permissions for agents
- **Audit Trail**: Complete action logging (Factor 11)
- **Data Retention**: Configurable per GDPR/privacy laws

### Agent Safety
- **Rate Limiting**: Prevent runaway agent costs
- **Cost Caps**: Per-agent spending limits
- **Human Approval**: Required for high-stakes actions (Factor 8)
- **Error Handling**: Graceful degradation, no cascading failures

### API Security
- **Authentication**: API keys with rotation
- **Sandboxing**: Agents can't access arbitrary systems
- **Input Validation**: All tool inputs validated (Zod schemas)
- **Output Sanitization**: No PII in logs

---

## Cost Management

### Token Usage Optimization
- **Caching**: Prompt caching for repeated system messages
- **Model Selection**: Use Claude Haiku for simple tasks, Sonnet for complex
- **Context Pruning**: Limit conversation history length
- **Batch Processing**: Group operations when possible

### Monitoring
```typescript
const CostTracker = {
  async trackUsage(agent: Agent, operation: Operation) {
    const cost = calculateCost(operation.tokens, operation.model);
    
    await db.costs.create({
      agentId: agent.id,
      operation: operation.type,
      tokens: operation.tokens,
      model: operation.model,
      cost: cost,
      timestamp: new Date()
    });
    
    // Alert if approaching budget
    const monthlyTotal = await this.getMonthlyTotal(agent.id);
    if (monthlyTotal > agent.budget * 0.9) {
      await this.alertBudgetThreshold(agent.id, monthlyTotal);
    }
  }
}
```

---

## Success Metrics

### Agent Performance
- **Visitor Engagement Agent**: 
  - Avg conversation depth: 8-12 messages
  - Qualification rate: 30%+ of conversations
  - Response relevance: 90%+ (human evaluation)
  - Lead capture rate: 15%+ provide contact info

- **CRM Manager Agent**:
  - Data accuracy: 95%+ for enriched leads
  - Lead scoring accuracy: 85%+ (validated against conversions)
  - Follow-up timeliness: 100% within SLA
  - Duplicate prevention: 99%+ (idempotency working)

- **Research Agent**:
  - Data enrichment rate: 80%+ of leads enriched within 24h
  - Information accuracy: 90%+ (spot-checked)
  - Research completion time: <5 min per lead
  - Cost per enrichment: <$0.50

- **Content Creation Agent**:
  - Blog posts: 4/month with 95%+ approval rate
  - Social posts: 20/week with 90%+ engagement vs. baseline
  - Email templates: 10/month with A/B test winners
  - Human edit time: <30 min per blog post

- **Email Agent**:
  - Open rate: 25%+ (industry avg: 20%)
  - Reply rate: 8%+ (industry avg: 5%)
  - Unsubscribe rate: <1%
  - Deliverability: 98%+
  - Human approval turnaround: <2 hours

- **Scheduler Agent**:
  - Booking rate: 40%+ of qualified leads
  - No-show rate: <15% (with reminders)
  - Calendar conflict rate: <2%
  - Prep materials delivered: 100% 1h before meeting

- **Analytics Agent**:
  - Report generation: 100% on schedule
  - Data accuracy: 99%+
  - Insight actionability: 70%+ implemented
  - Executive dashboard uptime: 99.9%

### Business Outcomes
- **Lead Generation**: 3x increase in qualified leads
- **Conversion Rate**: 2x improvement in lead-to-demo
- **Response Time**: <2 min average (from 4+ hours manual)
- **Cost per Lead**: 50% reduction vs. manual process
- **Content Production**: 5x increase in output
- **Sales Team Efficiency**: 60% time savings on qualification

---

## Example Workflows

### Workflow 1: Visitor to Qualified Lead

```
1. Visitor lands on FabriiQ website, opens AIVY chat
   ↓
2. Visitor Engagement Agent greets: "Hello! I'm AIVY..."
   ↓
3. Visitor asks: "How do you handle multi-campus fee management?"
   ↓
4. Agent analyzes intent:
   - Executive role: Likely CFO/Finance Director
   - Primary concern: Financial operations
   - Qualification signal: Multi-campus = larger institution
   ↓
5. Agent searches RAG for "fee management multi-campus CFO"
   ↓
6. Agent responds with strategic insight:
   "Multi-campus financial reporting is one of those challenges 
    that sounds simple but gets incredibly complex with different 
    systems and data formats..."
   ↓
7. Agent calls CRM Manager: create_lead({
     source: "website_chat",
     role: "CFO_suspected",
     concern: "financial_operations",
     institutionType: "multi_campus"
   })
   ↓
8. Conversation continues, visitor provides more context
   ↓
9. Agent identifies high qualification score (85/100)
   ↓
10. Agent suggests: "Would a brief demo of our unified financial 
     system be valuable? I can connect you with our team."
    ↓
11. Visitor agrees, provides email: john.smith@university.edu
    ↓
12. CRM Manager Agent:
    - Updates lead with contact info
    - Triggers Research Agent enrichment
    - Calculates final qualification score: 92/100
    ↓
13. Research Agent (background):
    - Searches: "University of XYZ"
    - Finds: 4 campuses, 15,000 students, current LMS: Canvas
    - Updates CRM with enriched data
    ↓
14. Email Agent (human approval required):
    - Drafts demo invitation email
    - Personalizes with research data
    - Submits for approval: "High-value lead detected"
    ↓
15. Human approves email within 1 hour
    ↓
16. Scheduler Agent:
    - Checks team calendar availability
    - Sends calendar invite with demo options
    - Prepares meeting brief with conversation history
    ↓
17. Demo booked, CRM updated, analytics logged

Total time: 3 minutes (vs. 48+ hours manual process)
```

### Workflow 2: Weekly Content Creation

```
Monday 9 AM:
┌─────────────────────────────────────────┐
│ Content Creation Agent Triggered        │
└─────────────────────────────────────────┘
    ↓
1. Agent checks content calendar: "Blog post due this week"
   ↓
2. Agent calls Research Agent: research_topic({
     topic: "Multi-campus financial management",
     targetAudience: "CFOs",
     depth: "comprehensive"
   })
   ↓
3. Research Agent:
   - Web search: recent trends, statistics
   - Competitor analysis: what others are writing
   - Returns: research brief with sources
   ↓
4. Content Agent generates blog post:
   - Title: "The Hidden Cost of Fragmented Financial Systems"
   - Outline: 5 sections, 2000 words
   - Includes: statistics, case studies, FabriiQ insights
   ↓
5. Agent calls RAG: verify FabriiQ capabilities mentioned
   ↓
6. Agent generates draft with proper citations
   ↓
7. Agent submits for human review: "Blog post ready"
   ↓
8. Human reviews (30 min), makes minor edits
   ↓
9. Human approves for publication
   ↓
10. Agent publishes to CMS
    ↓
11. Agent creates social media snippets:
    - LinkedIn post (300 words, professional tone)
    - Twitter thread (5 tweets, key insights)
    - Email newsletter blurb
    ↓
12. Analytics Agent tracks performance:
    - Page views, time on page, conversions
    - Social engagement
    - Email open rates

Total human time: 30 minutes (vs. 4+ hours manual)
```

### Workflow 3: Lead Nurture Campaign

```
Trigger: Lead created but not yet qualified (score: 45/100)
    ↓
Day 1: CRM Manager Agent identifies nurture opportunity
    ↓
Day 2: Email Agent sends educational email:
    "5 Signs You Need a School Operating System"
    (No approval needed - pre-approved template)
    ↓
Day 2: Email opened → Analytics Agent logs engagement
    ↓
Day 5: Email Agent sends case study:
    "How XYZ University Unified 6 Systems"
    ↓
Day 7: Lead returns to website, reads blog post
    ↓
Day 7: Visitor Engagement Agent recognizes returning lead
    - Loads CRM history
    - Personalizes greeting: "Welcome back! Last time we 
      discussed multi-campus operations..."
    ↓
Day 7: Conversation goes deeper, qualification score → 75/100
    ↓
Day 8: Email Agent sends partnership invitation
    (Human approval required - high-value action)
    ↓
Day 8: Human approves email
    ↓
Day 9: Lead replies expressing interest
    ↓
Day 9: CRM Manager updates score → 88/100
    ↓
Day 9: Scheduler Agent sends demo booking link
    ↓
Day 10: Demo booked, Research Agent prepares institution brief
    ↓
Demo Day: Sales team has complete context and customized pitch

Lead progression: 45 → 88 score in 10 days (vs. weeks/months manual)
```

---

## Agent Prompt Templates

### Visitor Engagement Agent System Prompt

```typescript
const VISITOR_AGENT_PROMPT = `You are AIVY, the intelligent conversational assistant for FabriiQ - the first comprehensive School Operating System designed for modern educational excellence.

## Your Role
Senior Educational Technology Consultant speaking with C-level executives and decision-makers at educational institutions.

## Communication Style
- Conversational like Pi AI: natural, thoughtful, engaging
- Strategic focus: business outcomes, not feature lists
- Consultative partnership: advisor, not vendor
- Response length: 50-150 words unless asked for detail

## Response Pattern
1. Lead with strategic insight (1-2 sentences)
2. Connect FabriiQ capability to their need (2-3 sentences)
3. Ask clarifying question (1 sentence)

## Current Conversation State
State: ${state.conversationState}
Messages: ${state.messageCount}
Qualification Score: ${state.qualificationScore}/100
Executive Role: ${state.suspectedRole || "Unknown"}

## Available Tools
- analyze_visitor_intent(conversation) - Determine role and concerns
- search_knowledge_base(query, filters) - RAG search FabriiQ info
- update_crm(visitorId, data) - Log interaction
- escalate_to_human(reason) - Request human takeover

## Key Metrics to Use
- 90% reduction in manual enrollment time
- 50-70% reduction in total technology costs
- 35% improvement in retention rates
- Native FERPA compliance built-in

## Your Task
The visitor just said: "${userMessage}"

Respond as AIVY following your communication style and response pattern.`;
```

### CRM Manager Agent System Prompt

```typescript
const CRM_AGENT_PROMPT = `You are the CRM Manager Agent for FabriiQ's AIVY system.

## Your Role
Manage lead lifecycle from first contact to partnership, ensuring data quality and timely follow-ups.

## Responsibilities
1. Create/update lead records from conversations
2. Calculate qualification scores based on signals
3. Trigger appropriate follow-up actions
4. Ensure data integrity and no duplicates

## Qualification Scoring
Calculate score 0-100 based on:
- Executive role identified: +20 (C-suite), +10 (Director), +5 (Manager)
- Institution size: +20 (>3 campuses), +10 (2-3), +5 (1)
- Pain points expressed: +10 per relevant concern (max 30)
- Engagement depth: +5 per meaningful exchange (max 20)
- Contact info provided: +10
- Demo interest expressed: +15

Qualification thresholds:
- 80-100: High priority, immediate outreach
- 60-79: Qualified, nurture sequence
- 40-59: Educational content
- 0-39: Newsletter only

## Available Tools
- create_lead(data) - Idempotent lead creation
- update_lead(leadId, data) - Update existing lead
- calculate_score(signals) - Compute qualification score
- trigger_follow_up(leadId, action, delay) - Schedule next action
- search_duplicates(email) - Prevent duplicate records

## Your Task
Process this conversation data and determine appropriate CRM actions:
${JSON.stringify(conversationData, null, 2)}

Output structured JSON with:
- lead_action: "create" | "update" | "no_action"
- qualification_score: number
- next_actions: Array<{action: string, delay: string}>
- reasoning: string`;
```

### Content Creation Agent System Prompt

```typescript
const CONTENT_AGENT_PROMPT = `You are the Content Creation Agent for FabriiQ.

## Your Role
Educational technology writer creating thought leadership content for C-level executives.

## Writing Style
- Consultative tone, not sales-heavy
- Strategic insights backed by data
- Executive-appropriate depth (not too technical)
- Clear structure with actionable takeaways

## Content Types
1. **Blog Posts** (1500-2500 words):
   - Problem → Insight → Solution → Call-to-Action
   - SEO optimized with keywords
   - Citations for statistics/claims

2. **Social Posts**:
   - LinkedIn: 200-300 words, professional, insight-driven
   - Twitter: 280 chars, punchy, question-provoking

3. **Email Content**:
   - Subject line: curiosity gap, personalized
   - Body: problem/solution, 200-400 words
   - CTA: single, clear action

## FabriiQ Key Messages
- School Operating System (SOS), not just LMS
- Unified platform eliminates 40-60% hidden integration costs
- Native multi-campus architecture (not retrofitted)
- FERPA-native compliance, not added later
- Development partnerships: co-creation, not just implementation

## Available Tools
- research_topic(topic, depth) - Call Research Agent
- search_knowledge_base(query) - Verify FabriiQ facts
- optimize_seo(content, keywords) - SEO enhancement
- generate_social_variations(content, platform) - Adapt content

## Your Task
Create ${contentType} on topic: "${topic}"
Target audience: ${targetAudience}
Key message: ${keyMessage}

Research the topic, verify facts, and generate content following style guidelines.`;
```

---

## Testing Strategy

### Unit Tests (Per Agent)

```typescript
describe('Visitor Engagement Agent', () => {
  it('should identify CFO role from financial questions', async () => {
    const input = {
      message: "How do you handle fee management across multiple campuses?",
      conversationHistory: []
    };
    
    const analysis = await visitorAgent.analyzeIntent(input);
    
    expect(analysis.executiveRole).toBe("CFO");
    expect(analysis.primaryConcerns).toContain("financial_operations");
    expect(analysis.qualificationScore).toBeGreaterThan(50);
  });
  
  it('should use RAG to answer capability questions', async () => {
    const input = {
      message: "Tell me about your compliance features",
      conversationHistory: []
    };
    
    const response = await visitorAgent.respond(input);
    
    expect(response).toContain("FERPA");
    expect(response).toContain("compliance");
    expect(response.length).toBeLessThan(500); // Concise response
  });
  
  it('should trigger CRM update on qualification signal', async () => {
    const input = {
      message: "I'd like to schedule a demo",
      conversationHistory: mockHistory,
      visitorId: "test-visitor-123"
    };
    
    const crmUpdateSpy = jest.spyOn(crmManager, 'updateLead');
    
    await visitorAgent.respond(input);
    
    expect(crmUpdateSpy).toHaveBeenCalledWith(
      "test-visitor-123",
      expect.objectContaining({
        qualificationScore: expect.any(Number),
        demoInterest: true
      })
    );
  });
});
```

### Integration Tests (Multi-Agent)

```typescript
describe('Lead Conversion Flow', () => {
  it('should handle visitor to qualified lead workflow', async () => {
    // 1. Visitor starts conversation
    const visitorId = await simulateVisitorLanding();
    
    // 2. Engagement agent handles conversation
    await visitorAgent.handleMessage({
      visitorId,
      message: "We have 5 campuses and struggle with enrollment reporting"
    });
    
    // 3. CRM manager creates lead
    const lead = await crmManager.getLeadByVisitor(visitorId);
    expect(lead).toBeDefined();
    expect(lead.qualificationScore).toBeGreaterThan(60);
    
    // 4. Research agent enriches data
    await waitForEnrichment(lead.id);
    const enrichedLead = await crmManager.getLead(lead.id);
    expect(enrichedLead.institutionData).toBeDefined();
    
    // 5. Email agent drafts outreach
    const emailDraft = await emailAgent.draftEmail(lead.id, 'demo_invitation');
    expect(emailDraft.requiresApproval).toBe(true);
    
    // 6. Verify audit trail
    const auditLog = await auditSystem.getLogForLead(lead.id);
    expect(auditLog.length).toBeGreaterThan(0);
    expect(auditLog).toContainEqual(
      expect.objectContaining({
        action: 'lead_created',
        agentId: 'visitor-engagement-agent'
      })
    );
  });
});
```

### End-to-End Tests (Full System)

```typescript
describe('Complete Lead Journey', () => {
  it('should process visitor from landing to demo booking', async () => {
    // Simulate realistic visitor behavior
    const visitor = await testHarness.createVisitor({
      source: 'google_search',
      landingPage: '/capabilities/multi-campus'
    });
    
    // Day 1: Initial visit
    await visitor.openChat();
    await visitor.sendMessage("Tell me about multi-campus operations");
    
    const response1 = await visitor.getResponse();
    expect(response1).toMatch(/unified|single platform/i);
    
    // Day 1: Continued conversation
    await visitor.sendMessage("We have 4 campuses with separate systems");
    await visitor.sendMessage("What's the implementation timeline?");
    
    // Day 1: Provides contact
    await visitor.sendMessage("My email is cfo@university.edu");
    
    // Verify CRM state
    const lead = await testHarness.getLeadByEmail("cfo@university.edu");
    expect(lead.qualificationScore).toBeGreaterThan(70);
    
    // Day 2: Research enrichment completed
    await testHarness.advanceTime('24 hours');
    const enrichedLead = await testHarness.getLead(lead.id);
    expect(enrichedLead.institutionData.campusCount).toBe(4);
    
    // Day 3: Email sent (after human approval)
    await testHarness.approveEmail(lead.id, 'demo_invitation');
    const emailSent = await testHarness.getEmailsSent(lead.id);
    expect(emailSent.length).toBe(1);
    
    // Day 4: Visitor clicks demo link
    await visitor.clickLink(emailSent[0].demoLink);
    
    // Day 5: Demo booked
    const demoBooked = await testHarness.getDemoBookings(lead.id);
    expect(demoBooked.length).toBe(1);
    expect(demoBooked[0].status).toBe('confirmed');
    
    // Verify complete audit trail
    const fullAudit = await testHarness.getFullAuditTrail(lead.id);
    expect(fullAudit).toContainActions([
      'visitor_landed',
      'conversation_started',
      'lead_created',
      'lead_enriched',
      'email_drafted',
      'email_approved',
      'email_sent',
      'demo_booked'
    ]);
  });
});
```

---


### Monitoring Dashboard

```typescript
// monitoring/dashboard.ts
export const AIVYDashboard = {
  metrics: {
    // Agent health
    agentStatus: [
      { agent: "visitor-engagement", status: "healthy", uptime: "99.9%" },
      { agent: "crm-manager", status: "healthy", uptime: "100%" },
      // ...
    ],
    
    // Performance
    responseTime: {
      p50: "250ms",
      p95: "800ms",
      p99: "1500ms"
    },
    
    // Costs
    dailyCost: {
      total: "$45.20",
      byAgent: {
        "visitor-engagement": "$25.00",
        "content-creation": "$12.50",
        "research": "$5.20",
        "other": "$2.50"
      }
    },
    
    // Business metrics
    leads: {
      today: 12,
      qualified: 4,
      demos_booked: 1
    },
    
    // Errors
    errorRate: "0.2%",
    recentErrors: [
      { agent: "email", error: "Rate limit exceeded", time: "10:45 AM" }
    ]
  },
  
  alerts: [
    {
      severity: "warning",
      message: "Content agent approaching monthly token budget (85%)",
      action: "Review usage or increase budget"
    }
  ]
};
```

---

## Conclusion

This AIVY Agents architecture provides FabriiQ with a production-grade, scalable system that:

1. **Follows 12-Factor Principles**: Reliable, auditable, and maintainable
2. **Specialized Agents**: Single-responsibility, focused capabilities
3. **Human-in-the-Loop**: Approval workflows for high-stakes actions
4. **Complete Integration**: Website chat → CRM → Email → Analytics
5. **Cost-Effective**: Optimized token usage, batch operations
6. **Scalable**: Stateless design, horizontal scaling
7. **Observable**: Complete audit trail, real-time monitoring

The system transforms FabriiQ's marketing and sales operations from manual, time-consuming processes to automated, intelligent workflows that scale with the business while maintaining quality and human oversight where it matters most.

**Next Steps**:
1. Review and approve architecture
2. Set up development environment
3. Begin Phase 1 implementation (Weeks 1-4)
4. Iterate based on real-world feedback
