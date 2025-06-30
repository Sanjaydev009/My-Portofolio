import apiService from './api';
import type { Contact, ContactFormData, ApiResponse } from '../types';

export interface ContactsResponse extends ApiResponse {
  contacts: Contact[];
  stats?: Record<string, number>;
}

class ContactService {
  // Submit contact form
  async submitContact(contactData: ContactFormData): Promise<ApiResponse<{ contactId: string }>> {
    return await apiService.post<ApiResponse<{ contactId: string }>>('/contact', contactData);
  }

  // Admin only methods
  // Get all contacts
  async getContacts(params?: {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
    projectType?: string;
    search?: string;
    includeSpam?: boolean;
  }): Promise<ContactsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.priority) queryParams.append('priority', params.priority);
    if (params?.projectType) queryParams.append('projectType', params.projectType);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.includeSpam) queryParams.append('includeSpam', 'true');
    
    const queryString = queryParams.toString();
    const url = queryString ? `/contact?${queryString}` : '/contact';
    
    return await apiService.get<ContactsResponse>(url);
  }

  // Get single contact
  async getContact(id: string): Promise<ApiResponse<Contact>> {
    return await apiService.get<ApiResponse<Contact>>(`/contact/${id}`);
  }

  // Update contact status
  async updateContactStatus(
    id: string, 
    data: {
      status?: string;
      priority?: string;
      notes?: string;
    }
  ): Promise<ApiResponse<Contact>> {
    return await apiService.put<ApiResponse<Contact>>(`/contact/${id}/status`, data);
  }

  // Reply to contact
  async replyToContact(id: string, message: string): Promise<ApiResponse> {
    return await apiService.post<ApiResponse>(`/contact/${id}/reply`, { message });
  }

  // Mark contact as spam
  async markAsSpam(id: string): Promise<ApiResponse> {
    return await apiService.put<ApiResponse>(`/contact/${id}/spam`);
  }

  // Delete contact
  async deleteContact(id: string): Promise<ApiResponse> {
    return await apiService.delete<ApiResponse>(`/contact/${id}`);
  }

  // Get contact statuses for filters
  getStatuses(): string[] {
    return ['new', 'read', 'replied', 'in-progress', 'completed', 'archived'];
  }

  // Get priority levels for filters
  getPriorities(): string[] {
    return ['low', 'medium', 'high', 'urgent'];
  }

  // Get project types for filters
  getProjectTypes(): string[] {
    return ['web-development', 'mobile-app', 'consultation', 'collaboration', 'other'];
  }

  // Get budget ranges for forms
  getBudgetRanges(): string[] {
    return ['<$1000', '$1000-$5000', '$5000-$10000', '$10000+', 'negotiable'];
  }

  // Get timeline options for forms
  getTimelineOptions(): string[] {
    return ['asap', '1-month', '2-3 months', '3-6 months', 'flexible'];
  }

  // Get source options
  getSourceOptions(): string[] {
    return ['website', 'linkedin', 'email', 'referral', 'other'];
  }

  // Format contact data for display
  formatContactForDisplay(contact: Contact) {
    return {
      ...contact,
      statusColor: this.getStatusColor(contact.status),
      priorityColor: this.getPriorityColor(contact.priority),
      formattedDate: new Date(contact.createdAt).toLocaleDateString(),
      formattedTime: new Date(contact.createdAt).toLocaleTimeString()
    };
  }

  // Get status color for UI
  private getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      new: '#f39c12',
      read: '#3498db',
      replied: '#27ae60',
      'in-progress': '#e67e22',
      completed: '#2ecc71',
      archived: '#95a5a6'
    };
    return colors[status] || '#95a5a6';
  }

  // Get priority color for UI
  private getPriorityColor(priority: string): string {
    const colors: Record<string, string> = {
      low: '#95a5a6',
      medium: '#f39c12',
      high: '#e67e22',
      urgent: '#e74c3c'
    };
    return colors[priority] || '#95a5a6';
  }
}

export const contactService = new ContactService();
export default contactService;
