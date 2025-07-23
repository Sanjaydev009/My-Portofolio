/**
 * Resume Download Utility
 * Handles resume downloads across different deployment platforms
 */

export interface ResumeDownloadOptions {
  filename?: string;
  showUserFeedback?: boolean;
  fallbackUrl?: string;
}

export class ResumeDownloadService {
  private static readonly DEFAULT_FILENAME = 'Sanju_Resume.pdf';
  private static readonly RESUME_PATHS = [
    '/documents/Sanju_Resume.pdf',
    './documents/Sanju_Resume.pdf',
    '/assets/documents/Sanju_Resume.pdf',
    `${window.location.origin}/documents/Sanju_Resume.pdf`,
  ];

  /**
   * Download resume with multiple fallback strategies
   */
  static async downloadResume(options: ResumeDownloadOptions = {}): Promise<boolean> {
    const {
      filename = this.DEFAULT_FILENAME,
      showUserFeedback = true,
      fallbackUrl
    } = options;

    // Try each download method
    for (const method of [this.fetchAndDownload, this.directLinkDownload]) {
      for (const path of this.RESUME_PATHS) {
        try {
          const success = await method(path, filename);
          if (success) {
            console.log(`Resume downloaded successfully from: ${path}`);
            return true;
          }
        } catch (error) {
          console.warn(`Download method failed for ${path}:`, error);
        }
      }
    }

    // All methods failed, try fallbacks
    return this.handleDownloadFailure(fallbackUrl, showUserFeedback);
  }

  /**
   * Method 1: Fetch file and create blob download
   */
  private static async fetchAndDownload(path: string, filename: string): Promise<boolean> {
    const response = await fetch(path, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('application/pdf')) {
      console.warn(`Unexpected content type: ${contentType}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    setTimeout(() => window.URL.revokeObjectURL(url), 1000);

    return true;
  }

  /**
   * Method 2: Direct link download
   */
  private static async directLinkDownload(path: string, filename: string): Promise<boolean> {
    return new Promise((resolve) => {
      const link = document.createElement('a');
      link.href = path;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.display = 'none';

      // Add event listeners to check if download started
      const cleanup = () => {
        document.body.removeChild(link);
        link.removeEventListener('click', onSuccess);
      };

      const onSuccess = () => {
        cleanup();
        resolve(true);
      };

      link.addEventListener('click', onSuccess);
      document.body.appendChild(link);
      link.click();

      // Fallback timeout
      setTimeout(() => {
        cleanup();
        resolve(false);
      }, 3000);
    });
  }

  /**
   * Handle download failure with user feedback
   */
  private static handleDownloadFailure(fallbackUrl?: string, showUserFeedback: boolean = true): boolean {
    const finalFallback = fallbackUrl || this.RESUME_PATHS[0];

    // Open in new tab as last resort
    try {
      window.open(finalFallback, '_blank', 'noopener,noreferrer');
      
      if (showUserFeedback) {
        setTimeout(() => {
          const message = 'Resume opened in a new tab. If it doesn\'t open automatically, please try again or contact me directly.';
          alert(message);
        }, 1500);
      }

      return true;
    } catch (error) {
      console.error('All download methods failed:', error);
      
      if (showUserFeedback) {
        alert('Unable to download resume automatically. Please contact me directly at sanju.4532@gmail.com for the resume file.');
      }

      return false;
    }
  }

  /**
   * Check if resume file exists at given path
   */
  static async checkResumeExists(path: string = this.RESUME_PATHS[0]): Promise<boolean> {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get the best available resume URL
   */
  static async getBestResumeUrl(): Promise<string | null> {
    for (const path of this.RESUME_PATHS) {
      if (await this.checkResumeExists(path)) {
        return path;
      }
    }
    return null;
  }
}

export default ResumeDownloadService;
