// Type definitions for environment variables
// This provides autocomplete and type checking for process.env

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace NodeJS {
  interface ProcessEnv {
    // App Configuration
    NEXT_PUBLIC_APP_NAME: string;
    NEXT_PUBLIC_APP_URL: string;

    // API Configuration
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_MAX_FILE_SIZE: string;
    NEXT_PUBLIC_MAX_FILES: string;

    // Server-side only
    API_SECRET: string;
    ENCRYPTION_KEY: string;

    // Image Processing
    MAX_IMAGE_WIDTH: string;
    MAX_IMAGE_HEIGHT: string;
    DEFAULT_QUALITY: string;

    // Storage (optional)
    STORAGE_PROVIDER?: string;
    AWS_ACCESS_KEY_ID?: string;
    AWS_SECRET_ACCESS_KEY?: string;
    AWS_REGION?: string;
    AWS_S3_BUCKET?: string;

    // Database (optional)
    DATABASE_URL?: string;
    DATABASE_NAME?: string;

    // Third-party Services (optional)
    ANALYTICS_ID?: string;
    SENTRY_DSN?: string;

    // Feature Flags
    NEXT_PUBLIC_ENABLE_ANALYTICS: string;
    NEXT_PUBLIC_ENABLE_BATCH_PROCESSING: string;

    // Node Environment
    NODE_ENV: "development" | "production" | "test";
  }
}

// Export empty object to make this a module
export {};
