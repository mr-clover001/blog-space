import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
import { getAllUsers } from '@/context/AuthContext';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types/user';
import { Search, UserX, Eye, Trash2, Shield, User as UserIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 6;

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState(getAllUsers());
  const { user: currentUser } = useAuth();
  const { toast } = useToast();

  // Redirect non-admin users
  if (currentUser?.role !== 'admin') {
    return <Navigate to="/blogs" replace />;
  }

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDeleteUser = (userId: string) => {
    // Get current users from localStorage
    const storedUsers = localStorage.getItem('registered_users');
    if (storedUsers) {
      const allUsers = JSON.parse(storedUsers);
      const updatedUsers = allUsers.filter((user: any) => user.id !== userId);
      localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers.map(({ password, ...user }: any) => user as User));
    }
    
    toast({
      title: "User deleted",
      description: "The user has been successfully deleted.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-gray-600">
            Manage and view all registered users
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 border-orange-200 focus:border-orange-400 bg-white/70 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* User Grid */}
        {paginatedUsers.length === 0 ? (
          <Card className="p-8 text-center bg-white/60 backdrop-blur-sm border-orange-100">
            <UserX className="h-16 w-16 mx-auto text-orange-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-800">No users found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms' : 'No users are currently registered'}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedUsers.map((user) => (
              <Card 
                key={user.id} 
                className="group bg-white/60 backdrop-blur-sm border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 border-2 border-orange-200">
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold">
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate text-gray-800">
                        {user.firstName} {user.lastName}
                      </CardTitle>
                      <p className="text-sm text-gray-600 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className={user.role === 'admin' ? 'bg-orange-500 hover:bg-orange-600' : ''}>
                      {user.role === 'admin' ? (
                        <Shield className="h-3 w-3 mr-1" />
                      ) : (
                        <UserIcon className="h-3 w-3 mr-1" />
                      )}
                      {user.role}
                    </Badge>
                    <Badge variant={user.isVerified ? 'outline' : 'destructive'} className={user.isVerified ? 'border-orange-300 text-orange-700' : ''}>
                      {user.isVerified ? 'Verified' : 'Unverified'}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-4">
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    
                    {user.id !== currentUser?.id && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete User</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {user.firstName} {user.lastName}? 
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              Previous
            </Button>
            
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 ${page === currentPage ? 'bg-orange-500 hover:bg-orange-600' : 'border-orange-300 text-orange-600 hover:bg-orange-50'}`}
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
