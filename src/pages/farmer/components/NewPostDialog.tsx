
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogPostType, EventType } from '../types/blogTypes';
import { v4 as uuidv4 } from 'uuid';

interface NewPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePost: (post: BlogPostType | EventType) => void;
  type: 'blog' | 'event';
}

const NewPostDialog = ({ open, onOpenChange, onCreatePost, type }: NewPostDialogProps) => {
  const isBlogPost = type === 'blog';
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  
  // Champs spécifiques pour les articles de blog
  const [excerpt, setExcerpt] = useState('');
  
  // Champs spécifiques pour les événements
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    if (isBlogPost) {
      const newBlogPost: BlogPostType = {
        id: uuidv4(),
        title,
        content,
        excerpt,
        image: imageUrl || 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=300&fit=crop',
        date: new Date().toISOString().split('T')[0],
        author: 'Sophie Dubois',
        tags: tagsArray,
        likes: 0,
        comments: 0,
        status: 'published'
      };
      onCreatePost(newBlogPost);
    } else {
      const newEvent: EventType = {
        id: uuidv4(),
        title,
        description: content,
        image: imageUrl || 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=300&fit=crop',
        location,
        startDate,
        endDate,
        organizer: 'Sophie Dubois',
        tags: tagsArray,
        attendees: 0,
        status: 'upcoming'
      };
      onCreatePost(newEvent);
    }
    
    // Reset form fields
    setTitle('');
    setContent('');
    setExcerpt('');
    setImageUrl('');
    setTags('');
    setLocation('');
    setStartDate('');
    setEndDate('');
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isBlogPost ? 'Créer un nouvel article' : 'Créer un nouvel événement'}
            </DialogTitle>
            <DialogDescription>
              {isBlogPost 
                ? 'Partagez des informations sur l\'agriculture durable avec votre communauté' 
                : 'Annoncez vos prochains événements et ateliers'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isBlogPost ? "Les bienfaits de l'agriculture biologique" : "Atelier de permaculture"}
                required
              />
            </div>
            
            {isBlogPost && (
              <div className="grid gap-2">
                <Label htmlFor="excerpt">Extrait</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Bref résumé de votre article"
                  required
                />
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="content">{isBlogPost ? 'Contenu' : 'Description'}</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={isBlogPost ? "Contenu détaillé de votre article..." : "Description détaillée de l'événement..."}
                className="min-h-[120px]"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">URL de l'image</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Bio, Agriculture, Écologie"
              />
            </div>
            
            {!isBlogPost && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="location">Lieu</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ferme des Quatre Saisons, Route de la Vallée 12"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Date et heure de début</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">Date et heure de fin</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              {isBlogPost ? 'Publier l\'article' : 'Créer l\'événement'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostDialog;
