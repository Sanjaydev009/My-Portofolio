import apiService from './api';
import type { BlogPost, BlogFormData, ApiResponse } from '../types';

export interface BlogsResponse extends ApiResponse {
  blogs: BlogPost[];
}

export interface BlogResponse extends ApiResponse {
  blog: BlogPost;
  relatedPosts?: BlogPost[];
}

class BlogService {
  // Get all published blog posts
  async getBlogs(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    tags?: string;
    sort?: 'newest' | 'oldest' | 'popular' | 'featured';
  }): Promise<BlogsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.tags) queryParams.append('tags', params.tags);
    if (params?.sort) queryParams.append('sort', params.sort);
    
    const queryString = queryParams.toString();
    const url = queryString ? `/blog?${queryString}` : '/blog';
    
    return await apiService.get<BlogsResponse>(url);
  }

  // Get featured blog posts
  async getFeaturedBlogs(): Promise<BlogsResponse> {
    return await apiService.get<BlogsResponse>('/blog/featured');
  }

  // Get single blog post by slug
  async getBlog(slug: string): Promise<BlogResponse> {
    return await apiService.get<BlogResponse>(`/blog/${slug}`);
  }

  // Like a blog post
  async likeBlog(id: string): Promise<ApiResponse<{ likes: number }>> {
    return await apiService.post<ApiResponse<{ likes: number }>>(`/blog/${id}/like`);
  }

  // Admin only methods
  // Get all blog posts including drafts
  async getAllBlogs(params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
    search?: string;
  }): Promise<BlogsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    const url = queryString ? `/blog/admin/all?${queryString}` : '/blog/admin/all';
    
    return await apiService.get<BlogsResponse>(url);
  }

  // Create new blog post
  async createBlog(blogData: BlogFormData): Promise<ApiResponse<BlogPost>> {
    return await apiService.post<ApiResponse<BlogPost>>('/blog', blogData);
  }

  // Update blog post
  async updateBlog(id: string, blogData: Partial<BlogFormData>): Promise<ApiResponse<BlogPost>> {
    return await apiService.put<ApiResponse<BlogPost>>(`/blog/${id}`, blogData);
  }

  // Delete blog post
  async deleteBlog(id: string): Promise<ApiResponse> {
    return await apiService.delete<ApiResponse>(`/blog/${id}`);
  }

  // Get blog categories
  getCategories(): string[] {
    return ['technology', 'tutorial', 'career', 'personal', 'review', 'other'];
  }

  // Get blog statuses
  getStatuses(): string[] {
    return ['draft', 'published', 'archived'];
  }

  // Generate slug from title
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }

  // Calculate reading time
  calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // Extract excerpt from content
  extractExcerpt(content: string, maxLength: number = 200): string {
    // Remove HTML tags
    const textOnly = content.replace(/<[^>]*>/g, '');
    
    if (textOnly.length <= maxLength) {
      return textOnly;
    }
    
    return textOnly.substring(0, maxLength).trim() + '...';
  }

  // Format blog data for display
  formatBlogForDisplay(blog: BlogPost) {
    return {
      ...blog,
      formattedDate: new Date(blog.publishedAt || blog.createdAt).toLocaleDateString(),
      formattedTime: new Date(blog.publishedAt || blog.createdAt).toLocaleTimeString(),
      readTimeText: `${blog.readTime} min read`,
      statusColor: this.getStatusColor(blog.status),
      categoryColor: this.getCategoryColor(blog.category)
    };
  }

  // Get status color for UI
  private getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      draft: '#f39c12',
      published: '#27ae60',
      archived: '#95a5a6'
    };
    return colors[status] || '#95a5a6';
  }

  // Get category color for UI
  private getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      technology: '#3498db',
      tutorial: '#9b59b6',
      career: '#e67e22',
      personal: '#e74c3c',
      review: '#2ecc71',
      other: '#95a5a6'
    };
    return colors[category] || '#95a5a6';
  }

  // Get popular tags (mock implementation)
  getPopularTags(): string[] {
    return [
      'react', 'typescript', 'javascript', 'nodejs', 'tutorial',
      'webdev', 'frontend', 'backend', 'fullstack', 'programming',
      'career', 'tips', 'guide', 'learning', 'technology'
    ];
  }
}

export const blogService = new BlogService();
export default blogService;
