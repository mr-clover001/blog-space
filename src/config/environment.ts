
// Environment configuration
export const config = {
  // API Configuration
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  
  // App Configuration
  APP_NAME: 'BlogSpace',
  APP_VERSION: '1.0.0',
  
  // Feature Flags
  FEATURES: {
    GOOGLE_LOGIN: process.env.REACT_APP_ENABLE_GOOGLE_LOGIN === 'true',
    EMAIL_VERIFICATION: process.env.REACT_APP_ENABLE_EMAIL_VERIFICATION === 'true',
    IMAGE_UPLOAD: process.env.REACT_APP_ENABLE_IMAGE_UPLOAD === 'true',
  },
  
  // Third-party Keys (should be set in environment variables)
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  
  // Pagination defaults
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
  
  // File upload limits
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  
  // Development
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
};

export default config;
