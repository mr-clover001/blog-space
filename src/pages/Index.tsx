
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { PenTool, Users, UserCheck, Search, Upload, Lock, BookOpen, Eye, Edit } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="container mx-auto px-4 py-8 sm:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-4">
              Ready to share your thoughts with the world?
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4">
              <Link to="/blogs">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 w-full sm:w-auto">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore Blogs
                </Button>
              </Link>
              <Link to="/create-blog">
                <Button variant="outline" size="lg" className="border-orange-300 text-orange-600 hover:bg-orange-50 w-full sm:w-auto">
                  <PenTool className="h-5 w-5 mr-2" />
                  Write Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            BlogSpace
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Your creative space to share stories, insights, and connect with a community of passionate writers and readers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white w-full sm:w-auto">
                Start Writing
              </Button>
            </Link>
            <Link to="/blogs">
              <Button variant="outline" size="lg" className="border-orange-300 text-orange-600 hover:bg-orange-50 w-full sm:w-auto">
                Explore Blogs
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4">
          <Card className="hover:shadow-lg transition-shadow border-orange-200">
            <CardHeader className="text-center sm:text-left">
              <PenTool className="h-12 w-12 text-orange-600 mb-4 mx-auto sm:mx-0" />
              <CardTitle className="text-orange-800">Rich Writing Experience</CardTitle>
              <CardDescription>
                Create beautiful blog posts with our intuitive writing interface
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-orange-200">
            <CardHeader className="text-center sm:text-left">
              <Users className="h-12 w-12 text-orange-600 mb-4 mx-auto sm:mx-0" />
              <CardTitle className="text-orange-800">Community Driven</CardTitle>
              <CardDescription>
                Connect with fellow writers and readers in our vibrant community
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-orange-200">
            <CardHeader className="text-center sm:text-left">
              <Eye className="h-12 w-12 text-orange-600 mb-4 mx-auto sm:mx-0" />
              <CardTitle className="text-orange-800">Discover Stories</CardTitle>
              <CardDescription>
                Explore diverse perspectives and stories from writers worldwide
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-orange-200">
            <CardHeader className="text-center sm:text-left">
              <Edit className="h-12 w-12 text-orange-600 mb-4 mx-auto sm:mx-0" />
              <CardTitle className="text-orange-800">Easy Management</CardTitle>
              <CardDescription>
                Edit and manage your blog posts with simple and powerful tools
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-orange-200">
            <CardHeader className="text-center sm:text-left">
              <Search className="h-12 w-12 text-orange-600 mb-4 mx-auto sm:mx-0" />
              <CardTitle className="text-orange-800">Smart Search</CardTitle>
              <CardDescription>
                Find exactly what you're looking for with advanced search features
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-orange-200">
            <CardHeader className="text-center sm:text-left">
              <Lock className="h-12 w-12 text-orange-600 mb-4 mx-auto sm:mx-0" />
              <CardTitle className="text-orange-800">Secure Platform</CardTitle>
              <CardDescription>
                Your content is safe with our robust security and privacy features
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Demo Section */}
        <Card className="max-w-4xl mx-auto border-orange-200 mx-4">
          <CardHeader>
            <CardTitle className="text-center text-xl sm:text-2xl text-orange-800">Try the Platform</CardTitle>
            <CardDescription className="text-center">
              Experience all features with our demo accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-4 sm:p-6 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold mb-2 flex items-center text-orange-800">
                  <Users className="h-5 w-5 mr-2 text-orange-600" />
                  Admin Account
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Full access to user management and content moderation
                </p>
                <div className="space-y-1 text-sm">
                  <p><strong>Email:</strong> admin@example.com</p>
                  <p><strong>Password:</strong> password123</p>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold mb-2 flex items-center text-orange-800">
                  <PenTool className="h-5 w-5 mr-2 text-orange-600" />
                  Writer Account
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Create, edit, and manage your own blog posts
                </p>
                <div className="space-y-1 text-sm">
                  <p><strong>Email:</strong> john@example.com</p>
                  <p><strong>Password:</strong> password123</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
