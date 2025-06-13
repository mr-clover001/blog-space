
# API Structure Documentation

This document outlines the API structure and endpoints needed for the BlogSpace application.

## Base Configuration

- **Base URL**: `http://localhost:3001/api`
- **Authentication**: JWT with refresh tokens
- **Content Type**: `application/json`

## Authentication Endpoints

### POST `/auth/register`
Register a new user
```json
{
  "firstName": "string",
  "lastName": "string", 
  "email": "string",
  "password": "string",
  "profileImage": "string (optional)"
}
```

### POST `/auth/login`
Login user
```json
{
  "email": "string",
  "password": "string"
}
```

### POST `/auth/forgot-password`
Request password reset
```json
{
  "email": "string"
}
```

### POST `/auth/reset-password`
Reset password with token
```json
{
  "token": "string",
  "password": "string"
}
```

### POST `/auth/verify-email`
Verify email with token
```json
{
  "token": "string"
}
```

### POST `/auth/google`
Google OAuth login
```json
{
  "token": "string"
}
```

### POST `/auth/refresh`
Refresh access token
```json
{
  "refreshToken": "string"
}
```

### POST `/auth/logout`
Logout user (no body required)

## User Endpoints

### GET `/users/profile`
Get current user profile (authenticated)

### PUT `/users/profile`
Update user profile (authenticated)
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "email": "string (optional)",
  "profileImage": "string (optional)"
}
```

### GET `/users`
Get all users with pagination and search
Query parameters:
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `search`: string (optional)

### GET `/users/:id`
Get user by ID

### DELETE `/users/:id`
Delete user (admin only)

### POST `/users/upload-image`
Upload profile image (multipart/form-data)

## Blog Endpoints

### GET `/blogs`
Get all published blogs with pagination and search
Query parameters:
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `search`: string (optional)

### GET `/blogs/:id`
Get blog by ID

### POST `/blogs`
Create new blog (authenticated)
```json
{
  "title": "string",
  "content": "string",
  "isPublished": "boolean"
}
```

### PUT `/blogs/:id`
Update blog (authenticated, owner only)
```json
{
  "title": "string",
  "content": "string",
  "isPublished": "boolean"
}
```

### DELETE `/blogs/:id`
Delete blog (authenticated, owner or admin)

### GET `/blogs/user`
Get current user's blogs with pagination
Query parameters:
- `page`: number (default: 1)
- `limit`: number (default: 10)

### GET `/blogs/admin`
Get all blogs for admin with pagination and search
Query parameters:
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `search`: string (optional)

### PATCH `/blogs/:id/toggle-publish`
Toggle blog publish status (authenticated, owner only)

## Response Formats

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "string"
}
```

### Error Response
```json
{
  "success": false,
  "error": "string",
  "message": "string",
  "statusCode": number
}
```

### Pagination Response
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "total": number,
    "page": number,
    "limit": number,
    "totalPages": number
  }
}
```

## Authentication Headers

For authenticated requests, include:
```
Authorization: Bearer <access_token>
```

## Database Models

### User Model
```javascript
{
  id: UUID,
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  profileImage: String,
  role: Enum('user', 'admin'),
  isEmailVerified: Boolean,
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  refreshToken: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Blog Model
```javascript
{
  id: UUID,
  title: String,
  content: Text,
  authorId: UUID (foreign key),
  isPublished: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables Required

```
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=blogspace
DB_USER=root
DB_PASSWORD=password

# JWT
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRE=1h
JWT_REFRESH_EXPIRE=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# File Upload
UPLOAD_PATH=uploads/
MAX_FILE_SIZE=5242880

# App
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Implementation Notes

1. Use Sequelize ORM for MySQL database operations
2. Implement Redis for caching user sessions and frequently accessed data
3. Use Multer for file upload handling
4. Implement express-validator for request validation
5. Use bcrypt for password hashing
6. Implement rate limiting for API endpoints
7. Add CORS configuration for frontend communication
8. Use helmet for security headers
9. Implement proper error handling and logging
10. Add API documentation using Swagger/OpenAPI
