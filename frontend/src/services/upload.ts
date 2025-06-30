import apiService from './api';

class UploadService {
  // Upload single image
  async uploadImage(
    file: File, 
    options?: {
      folder?: string;
      quality?: string;
      format?: string;
    },
    onProgress?: (progress: number) => void
  ): Promise<any> {
    const formData = new FormData();
    formData.append('image', file);
    
    if (options?.folder) formData.append('folder', options.folder);
    if (options?.quality) formData.append('quality', options.quality);
    if (options?.format) formData.append('format', options.format);

    return await apiService.uploadFile('/upload/image', file, onProgress);
  }

  // Upload multiple images
  async uploadImages(
    files: File[], 
    options?: {
      folder?: string;
      quality?: string;
      format?: string;
    },
    onProgress?: (progress: number) => void
  ): Promise<any> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    
    if (options?.folder) formData.append('folder', options.folder);
    if (options?.quality) formData.append('quality', options.quality);
    if (options?.format) formData.append('format', options.format);

    return await apiService.uploadFiles('/upload/multiple', files, onProgress);
  }

  // Delete image
  async deleteImage(publicId: string): Promise<any> {
    const encodedPublicId = encodeURIComponent(publicId);
    return await apiService.delete(`/upload/${encodedPublicId}`);
  }

  // Get all uploaded images
  async getImages(params?: {
    folder?: string;
    max_results?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams();
    
    if (params?.folder) queryParams.append('folder', params.folder);
    if (params?.max_results) queryParams.append('max_results', params.max_results.toString());
    
    const queryString = queryParams.toString();
    const url = queryString ? `/upload/images?${queryString}` : '/upload/images';
    
    return await apiService.get(url);
  }

  // Transform image
  async transformImage(publicId: string, transformations: any): Promise<any> {
    return await apiService.post('/upload/transform', {
      publicId,
      transformations
    });
  }

  // Validate file before upload
  validateFile(file: File, options?: {
    maxSize?: number; // in MB
    allowedTypes?: string[];
  }): { isValid: boolean; error?: string } {
    const maxSize = options?.maxSize || 10; // 10MB default
    const allowedTypes = options?.allowedTypes || ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return {
        isValid: false,
        error: `File size must be less than ${maxSize}MB`
      };
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`
      };
    }

    return { isValid: true };
  }

  // Generate thumbnail URL
  generateThumbnailUrl(imageUrl: string, width: number = 300, height: number = 200): string {
    // For Cloudinary URLs, we can add transformation parameters
    if (imageUrl.includes('cloudinary.com')) {
      const parts = imageUrl.split('/upload/');
      if (parts.length === 2) {
        return `${parts[0]}/upload/w_${width},h_${height},c_fill,q_auto,f_auto/${parts[1]}`;
      }
    }
    
    return imageUrl;
  }

  // Optimize image URL
  optimizeImageUrl(imageUrl: string, options?: {
    width?: number;
    height?: number;
    quality?: 'auto' | 'best' | 'good' | 'eco' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  }): string {
    if (imageUrl.includes('cloudinary.com')) {
      const parts = imageUrl.split('/upload/');
      if (parts.length === 2) {
        const transformations = [];
        
        if (options?.width) transformations.push(`w_${options.width}`);
        if (options?.height) transformations.push(`h_${options.height}`);
        if (options?.quality) transformations.push(`q_${options.quality}`);
        if (options?.format) transformations.push(`f_${options.format}`);
        
        // Add default optimizations
        if (!options?.quality) transformations.push('q_auto');
        if (!options?.format) transformations.push('f_auto');
        
        const transformString = transformations.join(',');
        return `${parts[0]}/upload/${transformString}/${parts[1]}`;
      }
    }
    
    return imageUrl;
  }

  // Create image preview
  createImagePreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('Failed to create image preview'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }
}

export const uploadService = new UploadService();
export default uploadService;
