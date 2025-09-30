'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { type Post } from '@/lib/services/blogService';
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export function ContentCalendar() {
    const [date, setDate] = useState(new Date(2025, 9, 1)); // Set to October 2025
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
                    throw new Error('Failed to fetch posts for calendar');
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
            case 'published': return 'bg-green-200 text-green-800';
            case 'scheduled': return 'bg-blue-200 text-blue-800';
            case 'draft': return 'bg-gray-200 text-gray-800';
            case 'pending_review': return 'bg-yellow-200 text-yellow-800';
            case 'rejected': return 'bg-red-200 text-red-800';
            default: return 'bg-gray-100';
        }
    };

    const renderCalendarBody = () => {
        if (isLoading) {
            return (
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 35 }).map((_, i) => (
                        <div key={i} className="border p-2 h-24">
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
                    <div key={day} className="font-bold text-sm">{day}</div>
                ))}
                {blanks.map((_, i) => <div key={`blank-${i}`} />)}
                {days.map(day => {
                    const dayEvents = posts.filter(post => {
                        const eventDate = post.scheduled_at ? new Date(post.scheduled_at) : null;
                        return eventDate &&
                            eventDate.getDate() === day &&
                            eventDate.getMonth() === date.getMonth() &&
                            eventDate.getFullYear() === date.getFullYear();
                    });
                    return (
                        <div key={day} className="border p-2 h-28 flex flex-col relative">
                            <span className="font-semibold">{day}</span>
                            <div className="flex-grow overflow-y-auto text-xs mt-1 space-y-1">
                                {dayEvents.map(event => (
                                    <div key={event.id} className={`p-1 rounded text-left ${getStatusColor(event.status)}`}>
                                        {event.title}
                                    </div>
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
        <CardTitle>{`${monthName} ${year}`}</CardTitle>
        <div className="space-x-2">
            <button onClick={handlePrevMonth} className="px-2 py-1 border rounded hover:bg-accent">&lt;</button>
            <button onClick={handleNextMonth} className="px-2 py-1 border rounded hover:bg-accent">&gt;</button>
        </div>
      </CardHeader>
      <CardContent>
        {renderCalendarBody()}
      </CardContent>
    </Card>
  );
}