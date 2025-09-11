# Medicor Backend Server

This is the backend server for the Medicor AI application, providing user authentication and database management using MongoDB.

## Features

- User registration and login with JWT authentication
- Password hashing using bcrypt
- MongoDB database integration
- RESTful API endpoints
- CORS enabled for frontend integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/medicor
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

   **Note:** Replace the MongoDB URI with your actual MongoDB connection string. For MongoDB Atlas, use the connection string provided in your dashboard.

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on port 5000 (or the port specified in your .env file).

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Health Check
- `GET /api/health` - Server health status

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  lastLogin: Date
}
```

## Security Features

- Password hashing with bcrypt (12 salt rounds)
- JWT tokens with 7-day expiration
- Protected routes requiring authentication
- Input validation and sanitization

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/medicor` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key-change-in-production` |
| `PORT` | Server port | `5000` |

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or your Atlas cluster is accessible
- Check your connection string format
- Verify network access and firewall settings

### JWT Issues
- Ensure JWT_SECRET is set in your .env file
- Check token expiration times
- Verify token format in Authorization header

## Development

The server uses nodemon for development, which automatically restarts when files change.

## Production Deployment

- Change the JWT_SECRET to a strong, unique key
- Use environment variables for all sensitive configuration
- Enable HTTPS in production
- Set up proper MongoDB authentication
- Configure CORS for your production domain
