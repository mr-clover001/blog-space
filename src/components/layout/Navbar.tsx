
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { 
  Menu, 
  X, 
  BookOpen, 
  Users, 
  PenTool, 
  User, 
  LogOut,
  Home
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg shadow-lg group-hover:shadow-orange-200 transition-all duration-300">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              BlogSpace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'} 
                size="sm"
                className={isActive('/') ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'text-orange-700 hover:bg-orange-50'}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>

            <Link to="/blogs">
              <Button 
                variant={isActive('/blogs') ? 'default' : 'ghost'} 
                size="sm"
                className={isActive('/blogs') ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'text-orange-700 hover:bg-orange-50'}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Blogs
              </Button>
            </Link>

            {isAuthenticated && (
              <>
                {/* Only show Users link for admin */}
                {user?.role === 'admin' && (
                  <Link to="/users">
                    <Button 
                      variant={isActive('/users') ? 'default' : 'ghost'} 
                      size="sm"
                      className={isActive('/users') ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'text-orange-700 hover:bg-orange-50'}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Users
                    </Button>
                  </Link>
                )}

                <Link to="/my-blogs">
                  <Button 
                    variant={isActive('/my-blogs') ? 'default' : 'ghost'} 
                    size="sm"
                    className={isActive('/my-blogs') ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'text-orange-700 hover:bg-orange-50'}
                  >
                    <PenTool className="h-4 w-4 mr-2" />
                    My Blogs
                  </Button>
                </Link>

                <Link to="/profile">
                  <Button 
                    variant={isActive('/profile') ? 'default' : 'ghost'} 
                    size="sm"
                    className={isActive('/profile') ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'text-orange-700 hover:bg-orange-50'}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-3">
                <Avatar className="h-8 w-8 border-2 border-orange-200">
                  <AvatarFallback className="bg-orange-500 text-white font-semibold text-sm">
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-orange-700 hover:bg-orange-50">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-orange-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-100 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-2">
              <Link to="/" onClick={closeMobileMenu}>
                <Button 
                  variant={isActive('/') ? 'default' : 'ghost'} 
                  size="sm" 
                  className={`w-full justify-start ${isActive('/') ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'text-orange-700 hover:bg-orange-50'}`}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>

              <Link to="/blogs" onClick={closeMobileMenu}>
                <Button 
                  variant={isActive('/blogs') ? 'default' : 'ghost'} 
                  size="sm" 
                  className={`w-full justify-start ${isActive('/blogs') ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'text-orange-700 hover:bg-orange-50'}`}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Blogs
                </Button>
              </Link>

              {isAuthenticated && (
                <>
                  {/* Only show Users link for admin */}
                  {user?.role === 'admin' && (
                    <Link to="/users" onClick={closeMobileMenu}>
                      <Button 
                        variant={isActive('/users') ? 'default' : 'ghost'} 
                        size="sm" 
                        className={`w-full justify-start ${isActive('/users') ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'text-orange-700 hover:bg-orange-50'}`}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Users
                      </Button>
                    </Link>
                  )}

                  <Link to="/my-blogs" onClick={closeMobileMenu}>
                    <Button 
                      variant={isActive('/my-blogs') ? 'default' : 'ghost'} 
                      size="sm" 
                      className={`w-full justify-start ${isActive('/my-blogs') ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'text-orange-700 hover:bg-orange-50'}`}
                    >
                      <PenTool className="h-4 w-4 mr-2" />
                      My Blogs
                    </Button>
                  </Link>

                  <Link to="/profile" onClick={closeMobileMenu}>
                    <Button 
                      variant={isActive('/profile') ? 'default' : 'ghost'} 
                      size="sm" 
                      className={`w-full justify-start ${isActive('/profile') ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'text-orange-700 hover:bg-orange-50'}`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>

                  <div className="pt-2 border-t border-orange-100 mt-2">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <Avatar className="h-8 w-8 border-2 border-orange-200">
                        <AvatarFallback className="bg-orange-500 text-white font-semibold text-sm">
                          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-gray-700">
                        {user?.firstName} {user?.lastName}
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleLogout}
                      className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </>
              )}

              {!isAuthenticated && (
                <div className="pt-2 border-t border-orange-100 mt-2 space-y-2">
                  <Link to="/login" onClick={closeMobileMenu}>
                    <Button variant="ghost" size="sm" className="w-full text-orange-700 hover:bg-orange-50">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={closeMobileMenu}>
                    <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
