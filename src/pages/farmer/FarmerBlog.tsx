
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { User } from 'lucide-react';
import BlogOverview from './components/BlogOverview';
import { BlogPostType, EventType } from './types/blogTypes';
import NewPostDialog from './components/NewPostDialog';
import { mockBlogPosts, mockEvents } from './data/blogData';

const FarmerBlog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>(mockBlogPosts);
  const [events, setEvents] = useState<EventType[]>(mockEvents);
  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false);
  const [postType, setPostType] = useState<'blog' | 'event'>('blog');

  const handleCreatePost = (post: BlogPostType | EventType, type: 'blog' | 'event') => {
    if (type === 'blog') {
      setBlogPosts([post as BlogPostType, ...blogPosts]);
    } else {
      setEvents([post as EventType, ...events]);
    }
    setIsNewPostDialogOpen(false);
  };

  const openNewPostDialog = (type: 'blog' | 'event') => {
    setPostType(type);
    setIsNewPostDialogOpen(true);
  };

  return (
    <DashboardLayout
      name="Sophie Dubois"
      email="sophie@fermequatresaisons.fr"
      avatar="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
      menuItems={[
        { title: "Tableau de bord", path: "/farmer-dashboard", icon: <User className="h-4 w-4" /> },
        { title: "Produits", path: "/farmer-dashboard/products", icon: <User className="h-4 w-4" /> },
        { title: "Inventaire", path: "/farmer-dashboard/inventory", icon: <User className="h-4 w-4" /> },
        { title: "Commandes", path: "/farmer-dashboard/orders", icon: <User className="h-4 w-4" /> },
        { title: "Messagerie", path: "/farmer-dashboard/messages", icon: <User className="h-4 w-4" /> },
        { title: "Blog/Actualités", path: "/farmer-dashboard/blog", icon: <User className="h-4 w-4" /> },
        { title: "Abonnement", path: "/farmer-dashboard/subscription", icon: <User className="h-4 w-4" /> },
      ]}
    >
      <BlogOverview 
        blogPosts={blogPosts} 
        events={events} 
        onCreatePost={openNewPostDialog}
      />
      
      {isNewPostDialogOpen && (
        <NewPostDialog
          open={isNewPostDialogOpen}
          onOpenChange={setIsNewPostDialogOpen}
          onCreatePost={(post) => handleCreatePost(post, postType)}
          type={postType}
        />
      )}
    </DashboardLayout>
  );
};

export default FarmerBlog;
