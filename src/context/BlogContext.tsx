
import React, { createContext, useContext, useState } from 'react';
import { Blog, CreateBlogFormData, UpdateBlogFormData } from '@/types/blog';
import { useAuth } from './AuthContext';

interface BlogContextType {
  blogs: Blog[];
  userBlogs: Blog[];
  createBlog: (blogData: CreateBlogFormData) => Promise<boolean>;
  updateBlog: (blogData: UpdateBlogFormData) => Promise<boolean>;
  deleteBlog: (blogId: string) => Promise<boolean>;
  getBlogById: (blogId: string) => Blog | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Mock blogs data
const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    content: 'React is a powerful JavaScript library for building user interfaces. In this blog post, we will explore the basics of React and how to get started with your first React application.',
    authorId: '2',
    author: {
      id: '2',
      firstName: 'John',
      lastName: 'Doe',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    isPublished: true
  },
  {
    id: '2',
    title: 'Advanced TypeScript Tips',
    content: 'TypeScript brings type safety to JavaScript development. Here are some advanced tips and tricks to make the most out of TypeScript in your projects.',
    authorId: '1',
    author: {
      id: '1',
      firstName: 'Admin',
      lastName: 'User',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    isPublished: true
  },
  {
    id: '3',
    title: 'Building Responsive Web Applications',
    content: 'Creating responsive web applications is crucial in today\'s multi-device world. Learn the best practices for building apps that work seamlessly across all devices.',
    authorId: '3',
    author: {
      id: '3',
      firstName: 'Jane',
      lastName: 'Smith',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z',
    isPublished: true
  }
];

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<Blog[]>(mockBlogs);
  const { user } = useAuth();

  const userBlogs = blogs.filter(blog => blog.authorId === user?.id);

  const createBlog = async (blogData: CreateBlogFormData): Promise<boolean> => {
    if (!user) return false;

    const newBlog: Blog = {
      id: Date.now().toString(),
      ...blogData,
      authorId: user.id,
      author: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setBlogs(prev => [newBlog, ...prev]);
    console.log('Blog created successfully:', newBlog);
    return true;
  };

  const updateBlog = async (blogData: UpdateBlogFormData): Promise<boolean> => {
    if (!user) return false;

    setBlogs(prev => prev.map(blog => 
      blog.id === blogData.id && blog.authorId === user.id
        ? {
            ...blog,
            title: blogData.title,
            content: blogData.content,
            isPublished: blogData.isPublished,
            updatedAt: new Date().toISOString()
          }
        : blog
    ));
    console.log('Blog updated successfully:', blogData.id);
    return true;
  };

  const deleteBlog = async (blogId: string): Promise<boolean> => {
    setBlogs(prev => prev.filter(blog => blog.id !== blogId));
    console.log('Blog deleted successfully:', blogId);
    return true;
  };

  const getBlogById = (blogId: string): Blog | undefined => {
    return blogs.find(blog => blog.id === blogId);
  };

  return (
    <BlogContext.Provider value={{
      blogs,
      userBlogs,
      createBlog,
      updateBlog,
      deleteBlog,
      getBlogById
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
