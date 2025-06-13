
import api from './api';
import { User } from '@/types/user';

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  profileImage?: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const userService = {
  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData: UpdateProfileRequest): Promise<User> => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  // Get all users (with pagination and search)
  getUsers: async (page: number = 1, limit: number = 10, search?: string): Promise<UsersResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (search) {
      params.append('search', search);
    }
    
    const response = await api.get(`/users?${params}`);
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Delete user (admin only)
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  // Upload profile image
  uploadProfileImage: async (file: File): Promise<{ imageUrl: string }> => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post('/users/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
