export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  bio?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  images: {
    url: string;
    caption?: string;
    isMain: boolean;
  }[];
  links: {
    demo?: string;
    github?: string;
    website?: string;
  };
  category: 'web' | 'mobile' | 'desktop' | 'api' | 'other';
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  priority: number;
  tags: string[];
  challenges?: string;
  solutions?: string;
  duration?: string;
  teamSize: number;
  isPublic: boolean;
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: User;
  featuredImage?: {
    url: string;
    caption?: string;
    alt?: string;
  };
  category: 'technology' | 'tutorial' | 'career' | 'personal' | 'review' | 'other';
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  views: number;
  likes: {
    user?: string;
    date: Date;
  }[];
  comments: {
    name: string;
    email: string;
    comment: string;
    isApproved: boolean;
    date: Date;
  }[];
  readTime: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  projectType: 'web-development' | 'mobile-app' | 'consultation' | 'collaboration' | 'other';
  budget: '<$1000' | '$1000-$5000' | '$5000-$10000' | '$10000+' | 'negotiable';
  timeline: 'asap' | '1-month' | '2-3 months' | '3-6 months' | 'flexible';
  status: 'new' | 'read' | 'replied' | 'in-progress' | 'completed' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  notes?: string;
  ipAddress?: string;
  userAgent?: string;
  source: 'website' | 'linkedin' | 'email' | 'referral' | 'other';
  isSpam: boolean;
  repliedAt?: Date;
  replies: {
    message: string;
    sentAt: Date;
    sentBy: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  _id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'mobile' | 'devops' | 'design' | 'other';
  proficiency: number;
  experience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
  icon?: string;
  color: string;
  description?: string;
  certifications: {
    name: string;
    issuer: string;
    date: Date;
    url?: string;
  }[];
  projects: Project[];
  isVisible: boolean;
  order: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Analytics {
  overview: {
    totalContacts: number;
    newContacts: number;
    totalProjects: number;
    totalBlogs: number;
    publishedBlogs: number;
    totalUsers: number;
  };
  contacts: {
    statusBreakdown: Record<string, number>;
    trend: Array<{ _id: string; count: number }>;
    projectTypeDistribution: Record<string, number>;
    monthlyGrowth: Array<{
      _id: { year: number; month: number };
      contacts: number;
    }>;
  };
  projects: {
    categoryBreakdown: Array<{
      _id: string;
      totalViews: number;
      totalLikes: number;
      projectCount: number;
      avgViews: number;
    }>;
    popular: Project[];
  };
  blogs: {
    categoryBreakdown: Array<{
      _id: string;
      totalViews: number;
      totalLikes: number;
      blogCount: number;
      avgViews: number;
      avgReadTime: number;
    }>;
    popular: BlogPost[];
  };
  recent: {
    contacts: Contact[];
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ThemeMode {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProjectFormData extends Omit<Project, '_id' | 'views' | 'likes' | 'createdAt' | 'updatedAt'> {}

export interface BlogFormData extends Omit<BlogPost, '_id' | 'author' | 'views' | 'likes' | 'comments' | 'createdAt' | 'updatedAt'> {}

export interface SkillFormData extends Omit<Skill, '_id' | 'projects' | 'createdAt' | 'updatedAt'> {}
