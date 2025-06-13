
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth, getAllUsers } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Users, UserCheck, Shield, Calendar, ArrowRight, User as UserIcon } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const allUsers = getAllUsers();
  
  const totalUsers = allUsers.length;
  const verifiedUsers = allUsers.filter(u => u.isVerified).length;
  const adminUsers = allUsers.filter(u => u.role === 'admin').length;
  const recentUsers = allUsers
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your user management system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Active registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedUsers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((verifiedUsers / totalUsers) * 100)}% verification rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers}</div>
            <p className="text-xs text-muted-foreground">
              System administrators
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations</CardDescription>
              </div>
              <Link to="/users">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((recentUser) => (
                <div key={recentUser.id} className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={recentUser.profileImage} alt={recentUser.firstName} />
                    <AvatarFallback>
                      {recentUser.firstName.charAt(0)}{recentUser.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {recentUser.firstName} {recentUser.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {recentUser.email}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge variant={recentUser.role === 'admin' ? 'default' : 'secondary'} className="text-xs">
                      {recentUser.role === 'admin' ? (
                        <Shield className="h-2 w-2 mr-1" />
                      ) : (
                        <UserIcon className="h-2 w-2 mr-1" />
                      )}
                      {recentUser.role}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {new Date(recentUser.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/users" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                View All Users
              </Button>
            </Link>
            
            <Link to="/profile" className="block">
              <Button variant="outline" className="w-full justify-start">
                <UserIcon className="h-4 w-4 mr-2" />
                Edit My Profile
              </Button>
            </Link>

            {user?.role === 'admin' && (
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Admin Settings
              </Button>
            )}

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                System Info
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Your Role:</span>
                  <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'} className="text-xs">
                    {user?.role}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Account Status:</span>
                  <Badge variant={user?.isVerified ? 'outline' : 'destructive'} className="text-xs">
                    {user?.isVerified ? 'Verified' : 'Unverified'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Member Since:</span>
                  <span>{new Date(user?.createdAt || '').toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
