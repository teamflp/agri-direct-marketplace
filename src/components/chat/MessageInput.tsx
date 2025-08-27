import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { userChatService, Message } from '@/services/user-chat-service';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Send } from 'lucide-react';

interface MessageInputProps {
  conversationId: string;
}

const formSchema = z.object({
  content: z.string().min(1, "Le message ne peut pas être vide."),
});

export const MessageInput: React.FC<MessageInputProps> = ({ conversationId }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
        if (!user) throw new Error("User not authenticated");
        return userChatService.sendMessage(conversationId, user.id, values.content);
    },
    onSuccess: (newMessage) => {
        // Manually update the cache to avoid a refetch, providing an optimistic update feel.
        queryClient.setQueryData(['messages', conversationId], (oldData: Message[] | undefined) => {
            return oldData ? [...oldData, newMessage] : [newMessage];
        });
        // Also invalidate conversations to update the last message preview
        queryClient.invalidateQueries({ queryKey: ['conversations'] });
        form.reset();
    },
    onError: (error) => {
        console.error("Error sending message:", error);
        // Here you could show a toast to the user
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.content.trim()) return;
    sendMessageMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-2">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Écrivez un message..." {...field} autoComplete="off" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" size="icon" disabled={sendMessageMutation.isPending}>
            <Send className="h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};
