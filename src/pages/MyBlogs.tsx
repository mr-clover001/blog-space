
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useBlog } from '@/context/BlogContext';
import { useAuth } from '@/context/AuthContext';
import { Search, Plus, Calendar, Edit, Eye } from 'lucide-react';

const MyBlogs = () => {
  const { userBlogs } = useBlog();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = userBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-orange-800">My Blog Posts</h1>
            <p className="text-muted-foreground">
              Manage and view your published blog posts
            </p>
          </div>
          
          {user?.role !== 'admin' && (
            <Link to="/create-blog">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Write New Blog
              </Button>
            </Link>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search your blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-orange-200 focus:border-orange-400"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-orange-200">
            <CardHeader className="pb-2">
              <CardDescription>Total Blogs</CardDescription>
              <CardTitle className="text-2xl text-orange-600">{userBlogs.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-orange-200">
            <CardHeader className="pb-2">
              <CardDescription>Published</CardDescription>
              <CardTitle className="text-2xl text-orange-600">
                {userBlogs.filter(blog => blog.isPublished).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-orange-200">
            <CardHeader className="pb-2">
              <CardDescription>Drafts</CardDescription>
              <CardTitle className="text-2xl text-orange-600">
                {userBlogs.filter(blog => !blog.isPublished).length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Blog List */}
        <div className="space-y-4">
          {filteredBlogs.map((blog) => (
            <Card key={blog.id} className="border-orange-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="mb-2 text-orange-800">{blog.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mb-3">
                      {blog.content}
                    </CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                      <Badge variant={blog.isPublished ? 'default' : 'secondary'} className={blog.isPublished ? 'bg-orange-500 hover:bg-orange-600' : ''}>
                        {blog.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Link to={`/edit-blog/${blog.id}`}>
                      <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Link to={`/blog/${blog.id}`}>
                      <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {userBlogs.length === 0 
                ? "You haven't created any blogs yet." 
                : "No blogs found matching your search."
              }
            </p>
            {userBlogs.length === 0 && user?.role !== 'admin' && (
              <Link to="/create-blog">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Blog
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
