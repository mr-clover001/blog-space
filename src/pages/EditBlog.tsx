
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { UpdateBlogFormData } from '@/types/blog';
import { Edit, Save } from 'lucide-react';

const updateBlogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters long'),
  isPublished: z.boolean().default(true)
});

const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateBlog, getBlogById } = useBlog();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const blog = id ? getBlogById(id) : undefined;

  // Check if user can edit this blog
  if (!blog || blog.authorId !== user?.id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The blog post you're trying to edit doesn't exist or you don't have permission to edit it.
          </p>
          <Button onClick={() => navigate('/my-blogs')}>
            Back to My Blogs
          </Button>
        </div>
      </div>
    );
  }

  const form = useForm<UpdateBlogFormData>({
    resolver: zodResolver(updateBlogSchema),
    defaultValues: {
      title: blog.title,
      content: blog.content,
      isPublished: blog.isPublished
    }
  });

  const onSubmit = async (data: Omit<UpdateBlogFormData, 'id'>) => {
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      const success = await updateBlog({ ...data, id });
      if (success) {
        toast({
          title: 'Blog updated successfully!',
          description: 'Your blog post has been updated.',
        });
        navigate('/my-blogs');
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update blog post. Please try again.',
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center text-orange-800">
            <Edit className="h-8 w-8 mr-3 text-orange-600" />
            Edit Blog Post
          </h1>
          <p className="text-muted-foreground">
            Update your blog post details
          </p>
        </div>

        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">Blog Details</CardTitle>
            <CardDescription>
              Modify the details of your blog post
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
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Updating...' : 'Update Blog'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/my-blogs')}
                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditBlog;
