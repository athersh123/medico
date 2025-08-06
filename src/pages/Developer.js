import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaCode, FaDatabase, FaBrain, FaMobile, FaCloud, FaShieldAlt, FaUsers, FaRocket, FaAward } from 'react-icons/fa';

const Developer = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      expertise: 'Internal Medicine, AI Healthcare',
      experience: '15+ years',
      avatar: '👩‍⚕️',
      color: 'from-blue-500 to-purple-500'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'AI Research Lead',
      expertise: 'Machine Learning, Medical AI',
      experience: '10+ years',
      avatar: '👨‍💻',
      color: 'from-green-500 to-teal-500'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Clinical Research Director',
      expertise: 'Clinical Trials, Evidence-Based Medicine',
      experience: '12+ years',
      avatar: '👩‍🔬',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Alex Thompson',
      role: 'Full Stack Developer',
      expertise: 'React, Node.js, Healthcare APIs',
      experience: '8+ years',
      avatar: '👨‍💼',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Lisa Wang',
      role: 'UX/UI Designer',
      expertise: 'Healthcare UX, Accessibility',
      experience: '6+ years',
      avatar: '👩‍🎨',
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'David Kim',
      role: 'Data Scientist',
      expertise: 'Medical Data Analysis, ML Models',
      experience: '9+ years',
      avatar: '👨‍🔬',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const technologies = [
    {
      name: 'React 18',
      description: 'Modern UI framework for building interactive healthcare interfaces',
      icon: <FaCode className="text-3xl" />,
      color: 'text-blue-500'
    },
    {
      name: 'Node.js',
      description: 'Server-side JavaScript for scalable healthcare APIs',
      icon: <FaDatabase className="text-3xl" />,
      color: 'text-green-500'
    },
    {
      name: 'TensorFlow',
      description: 'Advanced machine learning for medical diagnosis',
      icon: <FaBrain className="text-3xl" />,
      color: 'text-purple-500'
    },
    {
      name: 'React Native',
      description: 'Cross-platform mobile app development',
      icon: <FaMobile className="text-3xl" />,
      color: 'text-pink-500'
    },
    {
      name: 'AWS Cloud',
      description: 'Secure and scalable cloud infrastructure',
      icon: <FaCloud className="text-3xl" />,
      color: 'text-orange-500'
    },
    {
      name: 'HIPAA Compliance',
      description: 'Enterprise-grade security and privacy protection',
      icon: <FaShieldAlt className="text-3xl" />,
      color: 'text-red-500'
    }
  ];

  const achievements = [
    {
      title: '99.5% Accuracy',
      description: 'AI diagnosis accuracy rate',
      icon: <FaAward className="text-2xl" />,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: '500+ Diseases',
      description: 'Comprehensive disease coverage',
      icon: <FaUsers className="text-2xl" />,
      color: 'from-blue-400 to-purple-500'
    },
    {
      title: '10K+ Users',
      description: 'Active platform users',
      icon: <FaRocket className="text-2xl" />,
      color: 'from-green-400 to-teal-500'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock assistance',
      icon: <FaHeartbeat className="text-2xl" />,
      color: 'from-pink-400 to-rose-500'
    }
  ];

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-300 rounded-full animate-float opacity-30"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-300 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-300 rounded-full animate-float opacity-30" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-green-300 rounded-full animate-float opacity-40" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-glow mb-6"
          >
            <FaHeartbeat className="text-white text-3xl animate-pulse-slow" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Development Team
          </h1>
          <p className="text-xl text-gray-700 font-medium max-w-3xl mx-auto">
            Meet the talented team behind Medicor AI - experts in healthcare, AI, and technology
          </p>
        </motion.div>

        {/* Team Members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gradient text-center mb-8">
            Our Expert Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="card p-6 shadow-glow"
              >
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow`}>
                    <span className="text-2xl">{member.avatar}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-gradient font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-700 font-medium text-sm mb-1">{member.expertise}</p>
                  <p className="text-gray-600 text-sm">{member.experience} experience</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gradient text-center mb-8">
            Technology Stack
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="card p-6 shadow-glow"
              >
                <div className="text-center mb-4">
                  <div className={`${tech.color} mb-3 animate-pulse-slow`}>
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{tech.name}</h3>
                  <p className="text-gray-700 font-medium text-sm">{tech.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gradient text-center mb-8">
            Key Achievements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="card p-6 shadow-glow text-center"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow`}>
                  <div className="text-white">
                    {achievement.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
                <p className="text-gray-700 font-medium text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="card p-8 shadow-glow"
        >
          <h2 className="text-3xl font-bold text-gradient text-center mb-6">
            Our Development Philosophy
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Innovation First</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                We continuously push the boundaries of what's possible in healthcare technology, 
                leveraging cutting-edge AI and machine learning to create solutions that truly 
                make a difference in people's lives.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quality & Security</h3>
              <p className="text-gray-700 font-medium leading-relaxed">
                Every line of code is written with patient safety in mind. We maintain the 
                highest standards of security and quality, ensuring our platform meets 
                healthcare industry regulations and best practices.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Developer; 