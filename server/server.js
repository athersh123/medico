const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001',
    'https://euphonious-strudel-4e0d7b.netlify.app'
  ],
  credentials: true
}));
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medicor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// User Registration
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    console.log('Signup attempt for email:', email);

    // Validation
    if (!name || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      console.log('Password too short');
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    console.log('Creating new user:', email);

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    console.log('User saved successfully:', email);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data (without password) and token
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };

    console.log('Signup successful for:', email);

    res.status(201).json({
      message: 'User created successfully',
      user: userData,
      token
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt for email:', email);

    // Validation
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('User found, checking password...');

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('Password valid, logging in user:', email);

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data (without password) and token
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    };

    console.log('Login successful for:', email);

    res.json({
      message: 'Login successful',
      user: userData,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user profile (protected route)
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user profile (protected route)
app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    // Update user data
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    };

    res.json({
      message: 'Profile updated successfully',
      user: userData
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Medical Report Analysis Schema
const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  analysisResult: {
    confidence: Number,
    findings: [{
      findingType: String,  // Changed from 'type' to avoid Mongoose keyword conflict
      description: String,
      confidence: Number
    }],
    recommendations: [String],
    riskFactors: [String],
    medications: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Report = mongoose.model('Report', reportSchema);

// Medical Report Analysis endpoint
app.post('/api/analyze-report', authenticateToken, async (req, res) => {
  try {
    const { fileName, fileSize, fileType, fileData } = req.body;

    // Simulate AI analysis processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Enhanced AI analysis results based on file type
    let analysisResult;
    
    if (fileType === 'application/pdf' || fileName.toLowerCase().includes('chest') || fileName.toLowerCase().includes('xray')) {
      analysisResult = {
        confidence: Math.floor(Math.random() * 15) + 85, // 85-99%
        findings: [
          {
            findingType: 'Normal',
            description: 'Heart size and position appear normal',
            confidence: Math.floor(Math.random() * 10) + 90
          },
          {
            findingType: 'Attention Required',
            description: 'Mild cardiomegaly detected in left ventricle',
            confidence: Math.floor(Math.random() * 15) + 80
          },
          {
            findingType: 'Normal',
            description: 'Lung fields are clear without evidence of pathology',
            confidence: Math.floor(Math.random() * 10) + 90
          }
        ],
        recommendations: [
          'Follow up with cardiologist within 2 weeks',
          'Monitor blood pressure regularly',
          'Consider lifestyle modifications',
          'Schedule repeat imaging in 6 months'
        ],
        riskFactors: [
          'Age-related cardiovascular changes',
          'Family history of heart disease',
          'Previous hypertension diagnosis'
        ],
        medications: [
          'Consult with physician for potential medication adjustments',
          'Consider ACE inhibitors if not contraindicated',
          'Monitor for any new symptoms'
        ]
      };
    } else if (fileName.toLowerCase().includes('blood') || fileName.toLowerCase().includes('lab')) {
      analysisResult = {
        confidence: Math.floor(Math.random() * 12) + 88, // 88-99%
        findings: [
          {
            findingType: 'Normal',
            description: 'Complete blood count within normal ranges',
            confidence: Math.floor(Math.random() * 8) + 92
          },
          {
            findingType: 'Monitor',
            description: 'Slightly elevated cholesterol levels',
            confidence: Math.floor(Math.random() * 10) + 85
          },
          {
            findingType: 'Normal',
            description: 'Blood glucose levels are optimal',
            confidence: Math.floor(Math.random() * 8) + 92
          }
        ],
        recommendations: [
          'Continue current dietary habits',
          'Increase physical activity to 150 minutes per week',
          'Monitor cholesterol levels quarterly',
          'Maintain regular check-ups'
        ],
        riskFactors: [
          'Family history of cardiovascular disease',
          'Sedentary lifestyle',
          'Diet high in saturated fats'
        ],
        medications: [
          'Consider statin therapy if cholesterol remains elevated',
          'Omega-3 supplements may be beneficial',
          'Regular monitoring of lipid profile'
        ]
      };
    } else {
      // Generic medical report analysis
      analysisResult = {
        confidence: Math.floor(Math.random() * 10) + 90, // 90-99%
        findings: [
          {
            findingType: 'Normal',
            description: 'Overall findings appear within normal parameters',
            confidence: Math.floor(Math.random() * 8) + 92
          },
          {
            findingType: 'Attention Required',
            description: 'Minor abnormalities detected requiring follow-up',
            confidence: Math.floor(Math.random() * 12) + 83
          }
        ],
        recommendations: [
          'Schedule follow-up appointment with primary care physician',
          'Continue current treatment plan',
          'Monitor symptoms and report any changes',
          'Maintain healthy lifestyle habits'
        ],
        riskFactors: [
          'Age-related changes',
          'Family medical history',
          'Environmental factors'
        ],
        medications: [
          'Continue current medications as prescribed',
          'Discuss any side effects with healthcare provider',
          'Regular medication review recommended'
        ]
      };
    }

    // Save report to database
    const report = new Report({
      userId: req.user.userId,
      fileName,
      fileSize,
      fileType,
      analysisResult
    });

    await report.save();

    res.json({
      success: true,
      analysis: {
        fileName,
        fileSize,
        analysisDate: new Date().toLocaleDateString(),
        ...analysisResult
      },
      reportId: report._id
    });

  } catch (error) {
    console.error('Report analysis error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to analyze medical report' 
    });
  }
});

// Get user's medical reports
app.get('/api/reports', authenticateToken, async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .select('-analysisResult.fileData');

    res.json({ success: true, reports });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch reports' 
    });
  }
});

// Download report as PDF
app.get('/api/reports/:reportId/download', authenticateToken, async (req, res) => {
  try {
    const report = await Report.findOne({ 
      _id: req.params.reportId, 
      userId: req.user.userId 
    });

    if (!report) {
      return res.status(404).json({ 
        success: false,
        message: 'Report not found' 
      });
    }

    // Generate PDF content (simplified version)
    const pdfContent = {
      fileName: report.fileName,
      analysisDate: report.createdAt.toLocaleDateString(),
      confidence: report.analysisResult.confidence,
      findings: report.analysisResult.findings,
      recommendations: report.analysisResult.recommendations,
      riskFactors: report.analysisResult.riskFactors,
      medications: report.analysisResult.medications
    };

    res.json({
      success: true,
      report: pdfContent,
      downloadUrl: `/api/reports/${report._id}/pdf`
    });

  } catch (error) {
    console.error('Download report error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to download report' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Medicor API is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Create email transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'athersh124@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password-here' // Use app password, not regular Gmail password
      }
    });

    // Email content
    const mailOptions = {
      from: 'athersh124@gmail.com',
      to: 'athersh124@gmail.com',
      subject: `Medicor Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`API base URL: http://localhost:${PORT}/api`);
});
