
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useBlog } from '@/context/BlogContext';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const BlogView = () => {
  const { id } = useParams<{ id: string }>();
  const { getBlogById } = useBlog();
  
  const blog = id ? getBlogById(id) : undefined;

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
          <p className="text-muted-foreground mb-4">The blog post you're looking for doesn't exist.</p>
          <Link to="/blogs">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link to="/blogs">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blogs
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-6">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src={blog.author.profileImage} alt={blog.author.firstName} />
              <AvatarFallback>
                {blog.author.firstName.charAt(0)}{blog.author.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium flex items-center">
                <User className="h-4 w-4 mr-1" />
                {blog.author.firstName} {blog.author.lastName}
              </p>
              <p className="text-sm text-muted-foreground flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="ml-auto">
              <Badge variant={blog.isPublished ? 'default' : 'secondary'}>
                {blog.isPublished ? 'Published' : 'Draft'}
              </Badge>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {blog.title}
          </h1>
        </CardHeader>
        
        <CardContent>
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {blog.content}
            </div>
          </div>
          
          {blog.updatedAt !== blog.createdAt && (
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogView;
