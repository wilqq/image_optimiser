// Application configuration using environment variables
// This file provides a centralized configuration object

import { getPublicEnv, getServerConfig, isDevelopment } from "@/lib/utils/env";

/**
 * Public configuration - safe to use on client and server
 * These values are embedded in the client bundle at build time
 */
export const publicConfig = getPublicEnv();

/**
 * Server-only configuration - NEVER use on the client
 * Only import this in API routes, server components, or server actions
 *
 * @example
 * // In an API route
 * import { serverConfig } from "@/lib/config";
 * const secret = serverConfig.apiSecret;
 */
export const serverConfig = isDevelopment()
  ? {
      // Only load server config when actually needed
      // This prevents errors when bundling for the client
      get apiSecret() {
        return getServerConfig().apiSecret;
      },
      get encryptionKey() {
        return getServerConfig().encryptionKey;
      },
      get maxImageWidth() {
        return getServerConfig().maxImageWidth;
      },
      get maxImageHeight() {
        return getServerConfig().maxImageHeight;
      },
      get defaultQuality() {
        return getServerConfig().defaultQuality;
      },
    }
  : getServerConfig();

/**
 * Feature flags for conditional functionality
 */
export const features = {
  analytics: publicConfig.enableAnalytics,
  batchProcessing: publicConfig.enableBatchProcessing,
} as const;

/**
 * API configuration
 */
export const api = {
  baseUrl: publicConfig.apiUrl,
  maxFileSize: publicConfig.maxFileSize,
  maxFiles: publicConfig.maxFiles,
} as const;
