'use client'

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentCalendar } from "./components/content-calendar";
import { BlogList } from "./components/blog-list";
import { BlogEditor } from "./components/blog-editor";
import { AIContentGenerator } from "./components/ai-content-generator";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { type Post } from "@/lib/services/blogService";

export default function ContentPage() {
    const [activeTab, setActiveTab] = useState("calendar");
    const [postToEdit, setPostToEdit] = useState<Post | null>(null);
    const [aiGeneratedContent, setAiGeneratedContent] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleCreateNewPost = () => {
        setPostToEdit(null);
        setAiGeneratedContent(null);
        setActiveTab("editor");
    };

    const handleEditPost = (post: Post) => {
        setPostToEdit(post);
        setAiGeneratedContent(null);
        setActiveTab("editor");
    };

    const handleSavePost = (savedPost: Post) => {
        setPostToEdit(null);
        setAiGeneratedContent(null);
        setRefreshKey(prev => prev + 1);
        setActiveTab("posts");
    };

    const handleContentGenerated = (content: string) => {
        setPostToEdit(null);
        setAiGeneratedContent(content);
        setActiveTab("editor");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Content Management</h1>
                <Button onClick={handleCreateNewPost}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Post
                </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="calendar">Content Calendar</TabsTrigger>
                    <TabsTrigger value="posts">Blog Posts</TabsTrigger>
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="ai-generator">AI Content Generator</TabsTrigger>
                </TabsList>
                <TabsContent value="calendar" className="mt-4">
                    <ContentCalendar key={`calendar-${refreshKey}`} />
                </TabsContent>
                <TabsContent value="posts" className="mt-4">
                    <BlogList key={`list-${refreshKey}`} onEditPost={handleEditPost} />
                </TabsContent>
                <TabsContent value="editor" className="mt-4">
                    <BlogEditor
                        postToEdit={postToEdit}
                        onSave={handleSavePost}
                        initialContent={aiGeneratedContent}
                    />
                </TabsContent>
                <TabsContent value="ai-generator" className="mt-4">
                    <AIContentGenerator onContentGenerated={handleContentGenerated} />
                </TabsContent>
            </Tabs>
        </div>
    );
}