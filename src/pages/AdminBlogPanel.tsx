
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useBlog } from '@/context/BlogContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Search, Trash2, Calendar, Shield, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminBlogPanel = () => {
  const { blogs, deleteBlog } = useBlog();
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);

  // Only show this page to admins
  if (user?.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${blog.author.firstName} ${blog.author.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteBlog = async (blogId: string) => {
    setDeletingBlogId(blogId);
    try {
      const success = await deleteBlog(blogId);
      if (success) {
        toast({
          title: 'Blog deleted successfully',
          description: 'The blog post has been permanently removed.',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete blog post. Please try again.',
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
      setDeletingBlogId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Shield className="h-8 w-8 mr-3" />
          Admin Blog Management
        </h1>
        <p className="text-muted-foreground">
          Manage all blog posts across the platform
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Blogs</CardDescription>
            <CardTitle className="text-2xl">{blogs.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Published</CardDescription>
            <CardTitle className="text-2xl">
              {blogs.filter(blog => blog.isPublished).length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Drafts</CardDescription>
            <CardTitle className="text-2xl">
              {blogs.filter(blog => !blog.isPublished).length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Authors</CardDescription>
            <CardTitle className="text-2xl">
              {new Set(blogs.map(blog => blog.authorId)).size}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search blogs, authors, or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {filteredBlogs.map((blog) => (
          <Card key={blog.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={blog.author.profileImage} alt={blog.author.firstName} />
                      <AvatarFallback>
                        {blog.author.firstName.charAt(0)}{blog.author.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {blog.author.firstName} {blog.author.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <CardTitle className="mb-2">{blog.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mb-3">
                    {blog.content}
                  </CardDescription>
                  <div className="flex items-center space-x-2">
                    <Badge variant={blog.isPublished ? 'default' : 'secondary'}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Link to={`/blog/${blog.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteBlog(blog.id)}
                          disabled={deletingBlogId === blog.id}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {deletingBlogId === blog.id ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blogs found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default AdminBlogPanel;
