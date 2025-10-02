'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { type Post } from '@/lib/services/blogService';
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

function ContentCalendar() {
    const [date, setDate] = useState(new Date());
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/content/posts');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch posts for calendar');
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
                setError(errorMessage);
                toast({
                    title: 'Error fetching calendar data',
                    description: errorMessage,
                    variant: 'destructive',
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [toast]);

    const monthName = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const blanks = Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handlePrevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    };

    const getStatusColor = (status: string | null) => {
        switch (status) {
            case 'published': return 'bg-green-100 text-green-800 border-green-200';
            case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'pending_review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-50';
        }
    };

    const renderCalendarBody = () => {
        if (isLoading) {
            return (
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 35 }).map((_, i) => (
                        <div key={i} className="border p-2 h-28 bg-white rounded-md">
                            <Skeleton className="h-full w-full" />
                        </div>
                    ))}
                </div>
            )
        }

        if (error) {
            return <p className="text-red-500 text-center py-8">{error}</p>
        }

        return (
            <div className="grid grid-cols-7 gap-1 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="font-bold text-sm text-gray-600 pb-2">{day}</div>
                ))}
                {blanks.map((_, i) => <div key={`blank-${i}`} />)}
                {days.map(day => {
                    const dayEvents = posts.filter(post => {
                        const eventDate = post.scheduled_at ? new Date(post.scheduled_at) : null;
                        return eventDate &&
                            eventDate.getUTCDate() === day &&
                            eventDate.getUTCMonth() === date.getMonth() &&
                            eventDate.getUTCFullYear() === date.getFullYear();
                    });
                    return (
                        <div key={day} className="border p-2 h-32 flex flex-col relative bg-white rounded-md shadow-sm">
                            <span className="font-semibold text-gray-700">{day}</span>
                            <div className="flex-grow overflow-y-auto text-xs mt-1 space-y-1">
                                {dayEvents.map(event => (
                                    <Link href={`/admin/content/posts/${event.id}/edit`} key={event.id}>
                                        <div className={`p-1.5 rounded text-left text-xs border ${getStatusColor(event.status)} hover:shadow-md transition-shadow cursor-pointer`}>
                                            {event.title}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl">{`${monthName} ${year}`}</CardTitle>
                <div className="space-x-2">
                    <Button variant="outline" onClick={handlePrevMonth}>&lt;</Button>
                    <Button variant="outline" onClick={handleNextMonth}>&gt;</Button>
                </div>
            </CardHeader>
            <CardContent>
                {renderCalendarBody()}
            </CardContent>
        </Card>
    );
}


export default function CalendarPage() {
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Content Calendar</h1>
                <Link href="/admin/content/posts/new">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Post
                    </Button>
                </Link>
            </div>
            <ContentCalendar />
        </div>
    )
}