// Environment variable utilities with type safety and validation

/**
 * Get an environment variable value
 * @param key - The environment variable key
 * @param fallback - Optional fallback value if the variable is not set
 * @throws Error if the variable is not set and no fallback is provided
 */
export function getEnv(key: string, fallback?: string): string {
  const value = process.env[key];

  if (value === undefined) {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

/**
 * Get a required environment variable (throws if not set)
 */
export function getRequiredEnv(key: string): string {
  return getEnv(key);
}

/**
 * Get an environment variable as a number
 * @param key - The environment variable key
 * @param fallback - Optional fallback value
 */
export function getEnvAsNumber(key: string, fallback?: number): number {
  const value = process.env[key];

  if (value === undefined) {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(`Missing environment variable: ${key}`);
  }

  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(
      `Environment variable ${key} is not a valid number: ${value}`
    );
  }

  return parsed;
}

/**
 * Get an environment variable as a boolean
 * @param key - The environment variable key
 * @param fallback - Optional fallback value
 */
export function getEnvAsBoolean(key: string, fallback?: boolean): boolean {
  const value = process.env[key];

  if (value === undefined) {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value.toLowerCase() === "true" || value === "1";
}

/**
 * Check if the app is running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/**
 * Check if the app is running in development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

/**
 * Check if the app is running in test environment
 */
export function isTest(): boolean {
  return process.env.NODE_ENV === "test";
}

/**
 * Get all public environment variables (those prefixed with NEXT_PUBLIC_)
 * Safe to use on the client side
 */
export function getPublicEnv() {
  return {
    appName: getEnv("NEXT_PUBLIC_APP_NAME", "Image Optimiser"),
    appUrl: getEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
    apiUrl: getEnv("NEXT_PUBLIC_API_URL", "/api"),
    maxFileSize: getEnvAsNumber("NEXT_PUBLIC_MAX_FILE_SIZE", 10485760), // 10MB
    maxFiles: getEnvAsNumber("NEXT_PUBLIC_MAX_FILES", 10),
    enableAnalytics: getEnvAsBoolean("NEXT_PUBLIC_ENABLE_ANALYTICS", false),
    enableBatchProcessing: getEnvAsBoolean(
      "NEXT_PUBLIC_ENABLE_BATCH_PROCESSING",
      true
    ),
  };
}

/**
 * Get server-side only configuration
 * DO NOT use on the client side or expose to the browser
 */
export function getServerConfig() {
  return {
    apiSecret: getRequiredEnv("API_SECRET"),
    encryptionKey: getRequiredEnv("ENCRYPTION_KEY"),
    maxImageWidth: getEnvAsNumber("MAX_IMAGE_WIDTH", 4096),
    maxImageHeight: getEnvAsNumber("MAX_IMAGE_HEIGHT", 4096),
    defaultQuality: getEnvAsNumber("DEFAULT_QUALITY", 80),
  };
}
