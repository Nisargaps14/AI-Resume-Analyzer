// Auto-update configuration for real-time job data
export interface AutoUpdateConfig {
  interval: number; // in seconds
  enableNotifications: boolean;
  maxRetries: number;
  retryDelay: number; // in seconds
  backgroundUpdate: boolean;
  pauseOnInactive: boolean;
}

export const DEFAULT_AUTO_UPDATE_CONFIG: AutoUpdateConfig = {
  interval: 120, // 2 minutes
  enableNotifications: true,
  maxRetries: 3,
  retryDelay: 30, // 30 seconds
  backgroundUpdate: true,
  pauseOnInactive: true,
};

// Enhanced auto-update manager
export class AutoUpdateManager {
  private config: AutoUpdateConfig;
  private intervalId: number | null = null;
  private retryCount: number = 0;
  private lastUpdate: Date = new Date();
  private isActive: boolean = false;
  private callbacks: {
    onUpdate?: (data: any) => void;
    onError?: (error: Error) => void;
    onStatusChange?: (status: 'online' | 'offline' | 'updating') => void;
    onNewJobs?: (count: number) => void;
  } = {};

  constructor(config: Partial<AutoUpdateConfig> = {}) {
    this.config = { ...DEFAULT_AUTO_UPDATE_CONFIG, ...config };
  }

  // Start auto-updates
  start(updateFunction: () => Promise<any>) {
    if (this.isActive) return;
    
    this.isActive = true;
    this.callbacks.onStatusChange?.('online');
    
    // Initial update
    this.performUpdate(updateFunction);
    
    // Set up interval
    this.intervalId = setInterval(() => {
      if (this.isActive) {
        this.performUpdate(updateFunction);
      }
    }, this.config.interval * 1000);
  }

  // Stop auto-updates
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isActive = false;
    this.callbacks.onStatusChange?.('offline');
  }

  // Perform update with retry logic
  private async performUpdate(updateFunction: () => Promise<any>) {
    try {
      this.callbacks.onStatusChange?.('updating');
      
      const result = await updateFunction();
      this.lastUpdate = new Date();
      this.retryCount = 0;
      
      // Check for new data
      if (result && this.callbacks.onNewJobs) {
        // This would be implemented by the calling component
        // to compare old vs new data
      }
      
      this.callbacks.onUpdate?.(result);
      this.callbacks.onStatusChange?.('online');
      
    } catch (error) {
      console.error('Auto-update failed:', error);
      this.callbacks.onError?.(error as Error);
      
      // Retry logic
      if (this.retryCount < this.config.maxRetries) {
        this.retryCount++;
        console.log(`Retrying update (${this.retryCount}/${this.config.maxRetries})...`);
        
        setTimeout(() => {
          if (this.isActive) {
            this.performUpdate(updateFunction);
          }
        }, this.config.retryDelay * 1000);
      } else {
        this.callbacks.onStatusChange?.('offline');
      }
    }
  }

  // Set callbacks
  setCallbacks(callbacks: typeof this.callbacks) {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  // Get status
  getStatus() {
    return {
      isActive: this.isActive,
      lastUpdate: this.lastUpdate,
      retryCount: this.retryCount,
      config: this.config,
    };
  }

  // Update configuration
  updateConfig(newConfig: Partial<AutoUpdateConfig>) {
    this.config = { ...this.config, ...newConfig };
    
    // Restart if interval changed
    if (this.intervalId && newConfig.interval !== undefined) {
      this.stop();
      // Note: Would need to restart with the update function
    }
  }
}

// Singleton instance for app-wide usage
export const autoUpdateManager = new AutoUpdateManager();
