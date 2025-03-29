
import React from 'react';
import { BlogPostType } from '../types/blogTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ThumbsUp, MessageSquare, Eye } from 'lucide-react';

interface BlogPostListProps {
  posts: BlogPostType[];
}

const BlogPostList = ({ posts }: BlogPostListProps) => {
  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-500">Aucun article de blog pour le moment</p>
        </div>
      ) : (
        posts.map((post) => (
          <Card key={post.id} className="overflow-hidden border-gray-200 hover:border-gray-300 transition-all">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 h-48 md:h-auto">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="flex-1 p-4 md:p-6">
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-gray-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      {post.comments}
                    </span>
                    <span>Publié le {formatDate(post.date)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default BlogPostList;
