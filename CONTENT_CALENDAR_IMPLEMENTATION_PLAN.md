# Content Calendar & AI Content Generator - Implementation Plan

## 1. System Architecture Overview

### 1.1 Current System Analysis
- **Frontend**: Next.js with TypeScript
- **Backend**: Supabase (PostgreSQL)
- **AI Integration**: Existing RAG implementation available
- **Authentication**: Supabase Auth

### 1.2 Proposed Architecture Additions
1. **Content Management Module**
   - Content Calendar
   - Blog Management
   - Media Library
   - Approval Workflow

2. **AI Content Generation Service**
   - Integration with existing RAG
   - Content generation API endpoints
   - Template management

3. **Public Blog Module**
   - Blog listing
   - Individual post pages
   - Category/tag filtering

## 2. Database Schema Updates

### 2.1 New Tables

```sql
-- Content Posts
CREATE TABLE content_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'approved', 'scheduled', 'published', 'rejected')),
  type TEXT NOT NULL CHECK (type IN ('blog_post', 'social_media', 'newsletter', 'custom')),
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ai_generated BOOLEAN DEFAULT FALSE
);

-- Post Metadata
CREATE TABLE post_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES content_posts(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(post_id, key)
);

-- Content Categories
CREATE TABLE content_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Post Categories (Junction Table)
CREATE TABLE post_categories (
  post_id UUID REFERENCES content_posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES content_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Content Tags
CREATE TABLE content_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Post Tags (Junction Table)
CREATE TABLE post_tags (
  post_id UUID REFERENCES content_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES content_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Media Library
CREATE TABLE media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AI Generation Logs
CREATE TABLE ai_generation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt TEXT NOT NULL,
  parameters JSONB NOT NULL,
  output TEXT,
  status TEXT NOT NULL,
  error_message TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## 3. API Endpoints

### 3.1 Content Management API

#### Posts
- `GET /api/content/posts` - List posts with filters
- `POST /api/content/posts` - Create new post
- `GET /api/content/posts/:id` - Get post by ID
- `PATCH /api/content/posts/:id` - Update post
- `DELETE /api/content/posts/:id` - Delete post
- `POST /api/content/posts/:id/publish` - Publish post
- `POST /api/content/posts/:id/approve` - Approve post
- `POST /api/content/posts/:id/reject` - Reject post

#### Categories & Tags
- `GET /api/content/categories` - List categories
- `POST /api/content/categories` - Create category
- `GET /api/content/tags` - List tags
- `POST /api/content/tags` - Create tag

#### Media
- `POST /api/content/media/upload` - Upload media
- `GET /api/content/media` - List media
- `DELETE /api/content/media/:id` - Delete media

### 3.2 AI Content Generation API
- `POST /api/ai/generate` - Generate content
- `GET /api/ai/generate/status/:id` - Get generation status
- `POST /api/ai/generate/improve` - Improve existing content
- `GET /api/ai/templates` - List content templates

## 4. Frontend Components

### 4.1 Admin Components

#### Content Calendar
- `ContentCalendar.tsx` - Main calendar view
- `CalendarEvent.tsx` - Individual event component
- `PostEditorModal.tsx` - Rich text editor
- `SchedulingPanel.tsx` - Post scheduling interface

#### AI Content Generator
- `AIContentGenerator.tsx` - Main AI generation interface
- `GenerationHistory.tsx` - Past generations
- `AITemplateSelector.tsx` - Template selection

#### Blog Management
- `BlogList.tsx` - Blog post listing
- `BlogEditor.tsx` - Blog post editor
- `MediaLibrary.tsx` - Media management

### 4.2 Public Components

#### Blog
- `BlogHome.tsx` - Blog listing page
- `BlogPost.tsx` - Individual blog post
- `BlogSidebar.tsx` - Categories, tags, and recent posts

## 5. Integration Points

### 5.1 Existing System Integration
1. **Authentication**
   - Use existing Supabase Auth
   - Role-based access control

2. **RAG System**
   - Leverage existing RAG for content suggestions
   - Document context for AI generation

3. **Analytics**
   - Track content performance
   - User engagement metrics

### 5.2 Third-party Integrations
1. **Social Media**
   - Twitter API
   - LinkedIn API
   - Facebook Graph API

2. use existing AI services

## 6. Implementation Phases

### Phase 1: Core Infrastructure (2 weeks)
- Database schema setup
- Basic API endpoints
- Authentication & authorization
- Basic content management UI

### Phase 2: Content Calendar (3 weeks)
- Calendar view
- Post scheduling
- Status management
- Basic reporting

### Phase 3: AI Content Generation (3 weeks)
- AI generation interface
- Template system
- Integration with RAG
- Generation history

### Phase 4: Blog Management (2 weeks)
- Rich text editor
- Media management
- Categories & tags
- SEO optimization

### Phase 5: Public Blog (2 weeks)
- Blog listing
- Individual post pages
- Search & filtering
- Social sharing

## 7. Technical Considerations

### 7.1 Performance
- Server-side rendering for public pages
- Image optimization
- Caching strategy
- Lazy loading

### 7.2 Security
- Input validation
- XSS protection
- Rate limiting
- API authentication

### 7.3 Scalability
- Database indexing
- Query optimization
- CDN for media
- Background jobs

## 8. Testing Strategy

### 8.1 Unit Tests
- Component rendering
- Utility functions
- API routes

### 8.2 Integration Tests
- User flows
- API interactions
- Database operations

### 8.3 E2E Tests
- Critical user journeys
- Cross-browser testing
- Performance testing

## 9. Deployment Plan

### 9.1 Staging
- Test environment
- QA testing
- User acceptance testing

### 9.2 Production
- Blue-green deployment
- Feature flags
- Rollback plan

## 10. Success Metrics

1. **Content Creation**
   - Time to create new content
   - AI generation success rate
   - Content approval rate

2. **User Engagement**
   - Blog traffic
   - Time on page
   - Social shares

3. **System Performance**
   - Page load times
   - API response times
   - Error rates

## Next Steps

1. Review and finalize the database schema
2. Set up development environment
3. Begin implementation of Phase 1
4. Schedule regular check-ins for progress updates
