
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useBlog } from '@/context/BlogContext';
import { useToast } from '@/hooks/use-toast';
import { CreateBlogFormData } from '@/types/blog';
import { PenTool, Save, Eye } from 'lucide-react';

const createBlogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters long'),
  isPublished: z.boolean().default(true)
});

const CreateBlog = () => {
  const navigate = useNavigate();
  const { createBlog } = useBlog();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateBlogFormData>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: '',
      content: '',
      isPublished: true
    }
  });

  const onSubmit = async (data: CreateBlogFormData) => {
    setIsSubmitting(true);
    try {
      const success = await createBlog(data);
      if (success) {
        toast({
          title: 'Blog created successfully!',
          description: 'Your blog post has been published.',
        });
        navigate('/blogs');
      } else {
        toast({
          title: 'Error',
          description: 'Failed to create blog post. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <PenTool className="h-8 w-8 mr-3" />
          Create New Blog Post
        </h1>
        <p className="text-muted-foreground">
          Share your thoughts and insights with the community
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Details</CardTitle>
          <CardDescription>
            Fill in the details for your new blog post
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your blog title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your blog content here..."
                        rows={15}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write your blog content in plain text. Minimum 10 characters required.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Publish immediately</FormLabel>
                      <FormDescription>
                        Make this blog post visible to all users immediately
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex space-x-4 pt-4">
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Creating...' : 'Create Blog'}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/blogs')}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBlog;
