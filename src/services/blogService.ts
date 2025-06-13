
import api from './api';
import { Blog, CreateBlogFormData, UpdateBlogFormData } from '@/types/blog';

export interface BlogsResponse {
  blogs: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const blogService = {
  // Get all blogs (public, with pagination and search)
  getBlogs: async (page: number = 1, limit: number = 10, search?: string): Promise<BlogsResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (search) {
      params.append('search', search);
    }
    
    const response = await api.get(`/blogs?${params}`);
    return response.data;
  },

  // Get blog by ID
  getBlogById: async (id: string): Promise<Blog> => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },

  // Create new blog
  createBlog: async (blogData: CreateBlogFormData): Promise<Blog> => {
    const response = await api.post('/blogs', blogData);
    return response.data;
  },

  // Update blog
  updateBlog: async (id: string, blogData: UpdateBlogFormData): Promise<Blog> => {
    const response = await api.put(`/blogs/${id}`, blogData);
    return response.data;
  },

  // Delete blog
  deleteBlog: async (id: string): Promise<void> => {
    await api.delete(`/blogs/${id}`);
  },

  // Get user's blogs
  getUserBlogs: async (page: number = 1, limit: number = 10): Promise<BlogsResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    const response = await api.get(`/blogs/user?${params}`);
    return response.data;
  },

  // Get all blogs for admin
  getAllBlogsForAdmin: async (page: number = 1, limit: number = 10, search?: string): Promise<BlogsResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (search) {
      params.append('search', search);
    }
    
    const response = await api.get(`/blogs/admin?${params}`);
    return response.data;
  },

  // Publish/unpublish blog
  togglePublish: async (id: string): Promise<Blog> => {
    const response = await api.patch(`/blogs/${id}/toggle-publish`);
    return response.data;
  },
};
