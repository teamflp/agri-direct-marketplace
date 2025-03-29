
export interface BlogPostType {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
  likes: number;
  comments: number;
  status: 'draft' | 'published';
}

export interface EventType {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  startDate: string;
  endDate: string;
  organizer: string;
  tags: string[];
  attendees: number;
  status: 'upcoming' | 'ongoing' | 'past';
}
