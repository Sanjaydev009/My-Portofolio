import apiService from './api';
import type { User, LoginFormData, RegisterFormData, ApiResponse } from '../types';

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

class AuthService {
  // Login user
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials);
    
    if (response.success && response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  // Register user
  async register(userData: RegisterFormData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/register', userData);
    
    if (response.success && response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  // Get current user profile
  async getProfile(): Promise<ApiResponse<User>> {
    return await apiService.get<ApiResponse<User>>('/auth/me');
  }

  // Update user profile
  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return await apiService.put<ApiResponse<User>>('/auth/profile', userData);
  }

  // Change password
  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<ApiResponse> {
    return await apiService.post<ApiResponse>('/auth/change-password', data);
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Get stored user data
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if user is admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  // Get all users (admin only)
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiResponse<User[]>> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    const url = queryString ? `/auth/users?${queryString}` : '/auth/users';
    
    return await apiService.get<ApiResponse<User[]>>(url);
  }
}

export const authService = new AuthService();
export default authService;
