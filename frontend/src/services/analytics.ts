import apiService from './api';
import type { Analytics, ApiResponse } from '../types';

export interface DashboardAnalytics extends Analytics {}

export interface ContactAnalytics {
  period: string;
  dailyTrend: Array<{ _id: string; count: number }>;
  sourceDistribution: Record<string, number>;
  budgetDistribution: Record<string, number>;
  responseTime: {
    avgResponseTime: number;
    minResponseTime: number;
    maxResponseTime: number;
  };
}

export interface ProjectAnalytics {
  categoryStats: Array<{
    _id: string;
    totalViews: number;
    totalLikes: number;
    projectCount: number;
    avgViews: number;
  }>;
  technologyStats: Array<{
    _id: string;
    count: number;
    totalViews: number;
  }>;
  statusDistribution: Record<string, number>;
}

export interface BlogAnalytics {
  categoryStats: Array<{
    _id: string;
    totalViews: number;
    totalLikes: number;
    blogCount: number;
    avgViews: number;
    avgReadTime: number;
  }>;
  publishingTrend: Array<{
    _id: { year: number; month: number };
    count: number;
    totalViews: number;
  }>;
  tagStats: Array<{
    _id: string;
    count: number;
    totalViews: number;
  }>;
}

class AnalyticsService {
  // Get dashboard analytics
  async getDashboardAnalytics(): Promise<ApiResponse<DashboardAnalytics>> {
    return await apiService.get<ApiResponse<DashboardAnalytics>>('/analytics/dashboard');
  }

  // Get contact analytics
  async getContactAnalytics(period: '7d' | '30d' | '90d' | '1y' = '30d'): Promise<ApiResponse<ContactAnalytics>> {
    return await apiService.get<ApiResponse<ContactAnalytics>>(`/analytics/contacts?period=${period}`);
  }

  // Get project analytics
  async getProjectAnalytics(): Promise<ApiResponse<ProjectAnalytics>> {
    return await apiService.get<ApiResponse<ProjectAnalytics>>('/analytics/projects');
  }

  // Get blog analytics
  async getBlogAnalytics(): Promise<ApiResponse<BlogAnalytics>> {
    return await apiService.get<ApiResponse<BlogAnalytics>>('/analytics/blogs');
  }

  // Format analytics data for charts
  formatDataForChart(data: Array<{ _id: string; count: number }>, fillMissingDates: boolean = false) {
    if (!fillMissingDates) {
      return data.map(item => ({
        date: item._id,
        value: item.count
      }));
    }

    // Fill missing dates for time series data
    const result = [];
    const dates = data.map(item => new Date(item._id));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));

    for (let date = new Date(minDate); date <= maxDate; date.setDate(date.getDate() + 1)) {
      const dateStr = date.toISOString().split('T')[0];
      const existingData = data.find(item => item._id === dateStr);
      
      result.push({
        date: dateStr,
        value: existingData ? existingData.count : 0
      });
    }

    return result;
  }

  // Format data for pie charts
  formatDataForPieChart(data: Record<string, number>) {
    return Object.entries(data).map(([key, value]) => ({
      name: this.formatLabel(key),
      value,
      percentage: 0 // Will be calculated by the chart component
    }));
  }

  // Format data for bar charts
  formatDataForBarChart(data: Array<{ _id: string; count?: number; totalViews?: number; [key: string]: any }>) {
    return data.map(item => ({
      category: this.formatLabel(item._id),
      count: item.count || 0,
      views: item.totalViews || 0,
      ...item
    }));
  }

  // Helper to format labels
  private formatLabel(key: string): string {
    return key
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Calculate growth percentage
  calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  }

  // Get time period options
  getTimePeriods(): Array<{ label: string; value: string }> {
    return [
      { label: 'Last 7 days', value: '7d' },
      { label: 'Last 30 days', value: '30d' },
      { label: 'Last 90 days', value: '90d' },
      { label: 'Last year', value: '1y' }
    ];
  }

  // Format numbers for display
  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  // Format duration (hours to human readable)
  formatDuration(hours: number): string {
    if (hours < 1) {
      return `${Math.round(hours * 60)} minutes`;
    } else if (hours < 24) {
      return `${hours.toFixed(1)} hours`;
    } else {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return `${days}d ${remainingHours.toFixed(1)}h`;
    }
  }

  // Get chart colors
  getChartColors(): string[] {
    return [
      '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
      '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#d35400'
    ];
  }

  // Export analytics data
  exportAnalyticsData(data: any, filename: string): void {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService;
