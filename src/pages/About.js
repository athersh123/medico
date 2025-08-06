import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaBrain, FaShieldAlt, FaUsers, FaChartLine, FaAward } from 'react-icons/fa';

const About = () => {
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
            About Medicor AI
          </h1>
          <p className="text-xl text-gray-700 font-medium max-w-3xl mx-auto">
            Revolutionizing healthcare through advanced AI-powered symptom analysis and medical report interpretation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="card p-6 shadow-glow"
          >
            <div className="text-center mb-4">
              <FaBrain className="text-4xl text-gradient mx-auto mb-3 animate-pulse-slow" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Powered Analysis</h3>
            </div>
            <p className="text-gray-700 font-medium text-center">
              Our advanced AI algorithms analyze symptoms and medical reports to provide accurate diagnoses and treatment recommendations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="card p-6 shadow-glow"
          >
            <div className="text-center mb-4">
              <FaShieldAlt className="text-4xl text-green-500 mx-auto mb-3 animate-bounce-slow" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Safety First</h3>
            </div>
            <p className="text-gray-700 font-medium text-center">
              We prioritize patient safety with comprehensive safety precautions and evidence-based medical recommendations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="card p-6 shadow-glow"
          >
            <div className="text-center mb-4">
              <FaUsers className="text-4xl text-blue-500 mx-auto mb-3 animate-float" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">User-Friendly</h3>
            </div>
            <p className="text-gray-700 font-medium text-center">
              Designed with patients in mind, our platform is intuitive and accessible to users of all technical levels.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="card p-6 shadow-glow"
          >
            <div className="text-center mb-4">
              <FaChartLine className="text-4xl text-purple-500 mx-auto mb-3 animate-pulse-slow" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Continuous Learning</h3>
            </div>
            <p className="text-gray-700 font-medium text-center">
              Our AI continuously learns from new data to improve accuracy and provide better healthcare insights.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="card p-6 shadow-glow"
          >
            <div className="text-center mb-4">
              <FaAward className="text-4xl text-pink-500 mx-auto mb-3 animate-bounce-slow" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Assurance</h3>
            </div>
            <p className="text-gray-700 font-medium text-center">
              Rigorous testing and validation ensure our recommendations meet the highest standards of medical accuracy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="card p-6 shadow-glow"
          >
            <div className="text-center mb-4">
              <FaHeartbeat className="text-4xl text-red-500 mx-auto mb-3 animate-pulse-slow" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Comprehensive Care</h3>
            </div>
            <p className="text-gray-700 font-medium text-center">
              From diagnosis to treatment plans, we provide complete healthcare solutions tailored to individual needs.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="card p-8 shadow-glow"
        >
          <h2 className="text-3xl font-bold text-gradient text-center mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 font-medium text-center leading-relaxed">
            At Medicor AI, we believe that everyone deserves access to high-quality healthcare insights. 
            Our mission is to bridge the gap between patients and medical knowledge through innovative 
            AI technology, providing accurate, reliable, and accessible health information that empowers 
            individuals to make informed decisions about their health and well-being.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 