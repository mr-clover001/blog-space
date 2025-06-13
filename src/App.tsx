import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { BlogProvider } from "@/context/BlogContext";
import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UserList from "./pages/UserList";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import BlogList from "./pages/BlogList";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";
import AdminBlogPanel from "./pages/AdminBlogPanel";
import BlogView from "./pages/BlogView";
import NotFound from "./pages/NotFound";
import EditBlog from "./pages/EditBlog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <BlogProvider>
            <div className="min-h-screen bg-background">
              <Navbar />
              <Routes>
                <Route path="/" element={<Index />} />
                
                {/* Public Blog Routes */}
                <Route path="/blogs" element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogView />} />
                
                {/* Auth Routes - Only accessible when not authenticated */}
                <Route 
                  path="/login" 
                  element={
                    <ProtectedRoute requireAuth={false}>
                      <Login />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/register" 
                  element={
                    <ProtectedRoute requireAuth={false}>
                      <Register />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/forgot-password" 
                  element={
                    <ProtectedRoute requireAuth={false}>
                      <ForgotPassword />
                    </ProtectedRoute>
                  } 
                />

                {/* Protected Routes - Only accessible when authenticated */}
                <Route 
                  path="/users" 
                  element={
                    <ProtectedRoute>
                      <UserList />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/create-blog" 
                  element={
                    <ProtectedRoute>
                      <CreateBlog />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/edit-blog/:id" 
                  element={
                    <ProtectedRoute>
                      <EditBlog />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/my-blogs" 
                  element={
                    <ProtectedRoute>
                      <MyBlogs />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/blogs" 
                  element={
                    <ProtectedRoute>
                      <AdminBlogPanel />
                    </ProtectedRoute>
                  } 
                />

                {/* Catch all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BlogProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
