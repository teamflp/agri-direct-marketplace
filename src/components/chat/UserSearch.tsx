import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userChatService, ChatUserProfile } from '@/services/user-chat-service';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserSearchProps {
  onSelectUser: (user: ChatUserProfile) => void;
}

export const UserSearch: React.FC<UserSearchProps> = ({ onSelectUser }) => {
  const { user } = useAuth();
  const [query, setQuery] = useState('');

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['userSearch', query],
    queryFn: () => {
        if (!query || !user) return Promise.resolve([]);
        return userChatService.searchUsers(query, user.id);
    },
    enabled: !!query && !!user,
  });

  return (
    <div>
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="Trouver un utilisateur..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {isLoading && <div className="p-2">Recherche...</div>}
      {searchResults && searchResults.length > 0 && (
        <ScrollArea className="h-[150px] mt-2 border rounded-md">
          <div className="p-2">
            {searchResults.map((foundUser) => (
              <div
                key={foundUser.id}
                className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                onClick={() => {
                  onSelectUser(foundUser);
                  setQuery('');
                }}
              >
                <Avatar>
                  <AvatarFallback>{foundUser.first_name?.[0]}{foundUser.last_name?.[0]}</AvatarFallback>
                </Avatar>
                <span>{foundUser.first_name} {foundUser.last_name}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
