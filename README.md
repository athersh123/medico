# Medicor AI - Healthcare Diagnosis Platform

A modern, AI-powered healthcare application that provides symptom analysis, disease prediction, and medical report scanning capabilities.

## 🏥 Features

### Core Functionality

- **Symptom Analysis**: AI-powered disease prediction based on user symptoms
- **Medical Report Scanning**: Upload and analyze medical reports, scans, and test results
- **Voice Recognition**: Speech-to-text for hands-free symptom input
- **Comprehensive Results**: Disease description, safety precautions, medications, workouts, and diet recommendations

### User Interface

- **Modern Design**: Beautiful, responsive UI with smooth animations
- **Authentication**: Secure login/signup with Google integration
- **Navigation**: Intuitive navigation between different sections
- **Real-time Feedback**: Loading states and progress indicators

### Pages

1. **Login Page**: Email/password authentication with Google sign-in
2. **Sign Up Page**: User registration with form validation
3. **Home Page**: Main symptom analysis interface with AI predictions
4. **About Page**: Information about the platform and team
5. **Contact Page**: Contact form and company information
6. **Developer Page**: Team profiles and technology stack
7. **Scan Page**: Medical report upload and analysis

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd medicor
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up environment variables**

   Create a `.env` file in the `server` directory:

   ```env
   MONGODB_URI=mongodb://localhost:27017/medicor
   JWT_SECRET=your-secret-key-here
   PORT=5000
   EMAIL_PASSWORD=your-gmail-app-password
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your local machine or have a MongoDB Atlas connection string.

6. **Start the backend server**

   ```bash
   cd server
   node server.js
   ```

   The backend will run on `http://localhost:5000`

7. **Start the frontend development server** (in a new terminal)

   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

8. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 🛠️ Technology Stack

### Frontend

- **React 18**: Modern UI framework
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Icons**: Icon library
- **Axios**: HTTP client for API requests

### Backend

- **Node.js**: Server runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **Nodemailer**: Email sending functionality

### Development Tools

- **Create React App**: Development environment
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing
- **dotenv**: Environment variable management

## 📁 Project Structure

```
medicor/
├── public/
│   └── index.html
├── server/
│   ├── server.js
│   ├── package.json
│   └── .env
├── src/
│   ├── components/
│   │   └── Header.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── services/
│   │   └── api.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── SignUp.js
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Contact.js
│   │   ├── Developer.js
│   │   └── Scan.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Design Features

### UI/UX Highlights

- **Glass Morphism**: Modern glass effect components
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Mobile-first approach
- **Color Scheme**: Professional healthcare color palette
- **Typography**: Inter font family for readability

### Interactive Elements

- **Hover Effects**: Subtle animations on interactive elements
- **Loading States**: Spinner animations during processing
- **Form Validation**: Real-time input validation
- **Drag & Drop**: File upload functionality

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS with custom configuration:

- Custom color palette (primary, secondary)
- Custom animations and keyframes
- Responsive breakpoints
- Component classes

### Environment Variables

Create a `.env` file in the root directory for any environment-specific configurations:

```env
REACT_APP_API_URL=your_api_url_here
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

## 🚀 Deployment

### Deploy to Production

**Complete Deployment Guides:**
- 📋 [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md) - Step-by-step deployment checklist
- 🖥️ [`BACKEND_DEPLOYMENT.md`](BACKEND_DEPLOYMENT.md) - Backend deployment (Railway/Render/Heroku)
- 🌐 [`NETLIFY_DEPLOYMENT.md`](NETLIFY_DEPLOYMENT.md) - Frontend deployment to Netlify

**Quick Start:**
1. Deploy backend to Railway/Render (see backend guide)
2. Deploy frontend to Netlify (see Netlify guide)
3. Connect them with environment variables
4. Test all features

**Requirements:**
- GitHub account
- MongoDB Atlas (free)
- Netlify account (free)
- Railway/Render account (free tier available)

### Build for Production

```bash
npm run build
```

### Deploy Frontend to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variable: `REACT_APP_API_URL=https://your-backend-url.com/api`
6. Deploy!

### Deploy Backend to Railway

1. Sign up at https://railway.app
2. Create project from GitHub repo
3. Set root directory: `server`
4. Add environment variables (MongoDB URI, JWT secret, etc.)
5. Deploy and copy backend URL

**📚 See full guides in deployment documentation files.**

---

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Build Analysis

```bash
npm run build
npm run analyze
```

## 🔧 Troubleshooting

### Login/Signup Not Working

1. **Check if MongoDB is running**

   ```bash
   # Windows
   net start MongoDB

   # Or check if the service is running
   services.msc
   ```

2. **Verify backend server is running**

   - Backend should be running on `http://localhost:5000`
   - Check terminal for "Connected to MongoDB" message
   - Test health endpoint: `http://localhost:5000/api/health`

3. **Check browser console for errors**

   - Open browser DevTools (F12)
   - Look for CORS or network errors
   - Verify API requests are going to `http://localhost:5000/api`

4. **Clear browser cache and local storage**

   ```javascript
   // Open browser console and run:
   localStorage.clear();
   ```

5. **Verify CORS settings**
   - Backend CORS should allow `http://localhost:3000`
   - Check `server/server.js` CORS configuration

### Email Sending Not Working

1. **Set up Gmail App Password**

   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Generate app password and add to `.env` file

2. **Update EMAIL_PASSWORD in `.env`**

   ```env
   EMAIL_PASSWORD=your-16-character-app-password
   ```

3. **Restart backend server** after updating `.env`

### General Tips

- Make sure both frontend (port 3000) and backend (port 5000) are running
- Check for any firewall blocking localhost connections
- Ensure all npm packages are installed (`npm install` in both root and server directories)
- MongoDB connection string is correct in `.env` file

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Important Notice

This application is for educational and demonstration purposes. The AI predictions and medical advice should not replace professional medical consultation. Always consult with qualified healthcare providers for diagnosis and treatment decisions.

## 🆘 Support

For support or questions:

- Email: support@medicor.ai
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

---

**Built with ❤️ for better healthcare accessibility**
