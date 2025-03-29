
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogPostType, EventType } from '../types/blogTypes';
import BlogPostList from './BlogPostList';
import EventsList from './EventsList';
import { Plus, Filter } from 'lucide-react';

interface BlogOverviewProps {
  blogPosts: BlogPostType[];
  events: EventType[];
  onCreatePost: (type: 'blog' | 'event') => void;
}

const BlogOverview = ({ blogPosts, events, onCreatePost }: BlogOverviewProps) => {
  const [activeTab, setActiveTab] = useState<string>("posts");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Blog & Actualités</h1>
          <p className="text-gray-500 mt-1">
            Partagez des informations sur l'agriculture durable et vos événements
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Filtrer
          </Button>
          <Button 
            onClick={() => onCreatePost(activeTab === "posts" ? 'blog' : 'event')}
            className="bg-agrimarket-green hover:bg-agrimarket-green/90"
          >
            <Plus className="mr-1 h-4 w-4" />
            {activeTab === "posts" ? "Nouvel article" : "Nouvel événement"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gérez votre contenu</CardTitle>
          <CardDescription>
            Créez et partagez des articles et des événements pour informer votre communauté
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="posts" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="posts">Articles de blog</TabsTrigger>
              <TabsTrigger value="events">Événements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts">
              <BlogPostList posts={blogPosts} />
            </TabsContent>
            
            <TabsContent value="events">
              <EventsList events={events} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogOverview;
