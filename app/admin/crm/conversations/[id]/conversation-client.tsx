'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { type Conversation } from "@/lib/services/crmService";
import { ArrowLeft, User, Bot } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function ConversationClient({ conversation }: { conversation: Conversation }) {

    const getStageColor = (stage: string) => {
        const colors: Record<string, string> = {
            awareness: 'bg-gray-200 text-gray-800',
            interest: 'bg-blue-200 text-blue-800',
            consideration: 'bg-yellow-200 text-yellow-800',
            evaluation: 'bg-purple-200 text-purple-800',
            decision: 'bg-orange-200 text-orange-800',
            partnership: 'bg-green-200 text-green-800',
        };
        return colors[stage] || 'bg-gray-200';
    };

    return (
        <div className="p-6 space-y-6">
            <Link href="/admin/crm/conversations" className="flex items-center text-sm text-gray-500 hover:text-black mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all conversations
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Conversation Transcript</CardTitle>
                            <CardDescription>
                                Session ID: {conversation.session_id}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                                {conversation.conversation_turns?.map((turn, index) => (
                                    <div key={index} className="flex flex-col">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-secondary p-2 rounded-full">
                                                <User className="h-5 w-5 text-secondary-foreground" />
                                            </div>
                                            <div className="bg-muted p-3 rounded-lg w-full">
                                                <p className="text-sm">{turn.user_query}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 mt-2 justify-end">
                                            <div className="bg-primary p-3 rounded-lg w-full text-primary-foreground">
                                                <p className="text-sm">{turn.response_content}</p>
                                            </div>
                                            <div className="bg-primary/20 p-2 rounded-full">
                                                <Bot className="h-5 w-5 text-primary" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold">{conversation.contact_name}</p>
                            <p className="text-sm text-muted-foreground">{conversation.contact_email}</p>
                            <p className="text-sm text-muted-foreground">{conversation.organization}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Conversation Analytics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="flex justify-between"><span>Engagement Score:</span> <span className="font-bold">{conversation.user_engagement_score}</span></div>
                            <div className="flex justify-between"><span>Total Messages:</span> <span className="font-bold">{conversation.total_messages}</span></div>
                            <div className="flex justify-between"><span>Duration (min):</span> <span className="font-bold">{conversation.conversation_duration_minutes}</span></div>
                            <div className="flex justify-between items-center">
                                <span>Conversion Stage:</span>
                                <Badge className={getStageColor(conversation.conversion_stage)}>
                                    {conversation.conversion_stage}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}