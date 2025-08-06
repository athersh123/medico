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

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medicor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern UI framework
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Icons**: Icon library

### Development Tools
- **Create React App**: Development environment
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📁 Project Structure

```
medicor/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Header.js
│   ├── context/
│   │   └── AuthContext.js
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

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

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