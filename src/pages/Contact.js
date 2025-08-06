import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaHeartbeat, FaPaperPlane, FaUser, FaComments } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
            Contact Us
          </h1>
          <p className="text-xl text-gray-700 font-medium max-w-3xl mx-auto">
            Get in touch with our team for support, questions, or feedback about Medicor AI
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="card p-8 shadow-glow">
              <h2 className="text-2xl font-bold text-gradient mb-6 flex items-center">
                <FaUser className="mr-3 text-2xl" />
                Get In Touch
              </h2>
              <p className="text-gray-700 font-medium mb-8">
                We're here to help! Reach out to us for any questions about our AI-powered healthcare platform, 
                technical support, or general inquiries.
              </p>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-glow-blue"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-700 font-medium">support@medicorai.com</p>
                    <p className="text-gray-600 text-sm">We'll respond within 24 hours</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-glow-green"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Phone</h3>
                    <p className="text-gray-700 font-medium">+1 (555) 123-4567</p>
                    <p className="text-gray-600 text-sm">Monday - Friday, 9 AM - 6 PM EST</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-glow"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Address</h3>
                    <p className="text-gray-700 font-medium">123 Healthcare Ave, Tech City</p>
                    <p className="text-gray-600 text-sm">Innovation District, TC 12345</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-glow-red"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                    <FaClock className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Business Hours</h3>
                    <p className="text-gray-700 font-medium">Monday - Friday: 9 AM - 6 PM</p>
                    <p className="text-gray-600 text-sm">Saturday: 10 AM - 4 PM</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-8 shadow-glow"
          >
            <h2 className="text-2xl font-bold text-gradient mb-6 flex items-center">
              <FaComments className="mr-3 text-2xl" />
              Send Message
            </h2>
            <p className="text-gray-700 font-medium mb-8">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-800 font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="input-field resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full flex items-center justify-center"
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card p-8 shadow-glow"
        >
          <h2 className="text-3xl font-bold text-gradient text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">How accurate is the AI diagnosis?</h3>
                <p className="text-gray-700 font-medium">
                  Our AI system achieves 95%+ accuracy based on comprehensive medical databases and continuous learning from new data.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Is my health data secure?</h3>
                <p className="text-gray-700 font-medium">
                  Yes, we use enterprise-grade encryption and follow HIPAA guidelines to ensure your data remains completely secure.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Can I use this instead of seeing a doctor?</h3>
                <p className="text-gray-700 font-medium">
                  No, our platform is designed to provide health insights but should not replace professional medical consultation.
                </p>
              </div>
              <div className="border-l-4 border-pink-500 pl-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">How do I get technical support?</h3>
                <p className="text-gray-700 font-medium">
                  Contact our support team via email or phone, and we'll assist you with any technical issues within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact; 