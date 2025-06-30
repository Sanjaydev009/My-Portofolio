import apiService from './api';
import type { Project, ProjectFormData, ApiResponse } from '../types';

export interface ProjectsResponse extends ApiResponse {
  projects: Project[];
  filters?: {
    categories: string[];
    statuses: string[];
  };
}

class ProjectService {
  // Get all public projects
  async getProjects(params?: {
    page?: number;
    limit?: number;
    category?: string;
    featured?: boolean;
    search?: string;
    tech?: string;
    sort?: 'newest' | 'oldest' | 'popular' | 'featured';
  }): Promise<ProjectsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured) queryParams.append('featured', 'true');
    if (params?.search) queryParams.append('search', params.search);
    if (params?.tech) queryParams.append('tech', params.tech);
    if (params?.sort) queryParams.append('sort', params.sort);
    
    const queryString = queryParams.toString();
    const url = queryString ? `/projects?${queryString}` : '/projects';
    
    return await apiService.get<ProjectsResponse>(url);
  }

  // Get featured projects
  async getFeaturedProjects(): Promise<ProjectsResponse> {
    return await apiService.get<ProjectsResponse>('/projects/featured');
  }

  // Get single project by ID
  async getProject(id: string): Promise<ApiResponse<Project>> {
    return await apiService.get<ApiResponse<Project>>(`/projects/${id}`);
  }

  // Like a project
  async likeProject(id: string): Promise<ApiResponse<{ likes: number }>> {
    return await apiService.post<ApiResponse<{ likes: number }>>(`/projects/${id}/like`);
  }

  // Admin only methods
  // Get all projects including private ones
  async getAllProjects(params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
  }): Promise<ProjectsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    const url = queryString ? `/projects/admin/all?${queryString}` : '/projects/admin/all';
    
    return await apiService.get<ProjectsResponse>(url);
  }

  // Create new project
  async createProject(projectData: ProjectFormData): Promise<ApiResponse<Project>> {
    return await apiService.post<ApiResponse<Project>>('/projects', projectData);
  }

  // Update project
  async updateProject(id: string, projectData: Partial<ProjectFormData>): Promise<ApiResponse<Project>> {
    return await apiService.put<ApiResponse<Project>>(`/projects/${id}`, projectData);
  }

  // Delete project
  async deleteProject(id: string): Promise<ApiResponse> {
    return await apiService.delete<ApiResponse>(`/projects/${id}`);
  }

  // Get project categories for filters
  getCategories(): string[] {
    return ['web', 'mobile', 'desktop', 'api', 'other'];
  }

  // Get project statuses for filters
  getStatuses(): string[] {
    return ['completed', 'in-progress', 'planned'];
  }

  // Get common technologies for suggestions
  getCommonTechnologies(): string[] {
    return [
      'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express',
      'MongoDB', 'PostgreSQL', 'MySQL', 'Redux', 'Next.js',
      'Vue.js', 'Angular', 'Python', 'Django', 'Flask',
      'React Native', 'Flutter', 'Swift', 'Kotlin', 'Java',
      'C#', '.NET', 'PHP', 'Laravel', 'WordPress',
      'Docker', 'AWS', 'Firebase', 'GraphQL', 'REST API',
      'Material-UI', 'Tailwind CSS', 'Bootstrap', 'Sass',
      'Git', 'GitHub', 'GitLab', 'Vercel', 'Netlify'
    ];
  }
}

export const projectService = new ProjectService();
export default projectService;
