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
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage('');

    try {
      // Send to your backend server
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        console.log('Email sent successfully!');
        setStatusMessage('✅ Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Clear success message after 5 seconds
        setTimeout(() => setStatusMessage(''), 5000);
      } else {
        throw new Error(data.message || 'Failed to send email');
      }

    } catch (error) {
      console.error('Failed to send email:', error);
      setStatusMessage('❌ Failed to send message. Please try again or email us directly at athersh124@gmail.com');
      
      // Clear error message after 7 seconds
      setTimeout(() => setStatusMessage(''), 7000);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full animate-float opacity-30"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
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
                Healthcare
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
                    <p className="text-gray-700 font-medium">athersh124@gmail.com</p>
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
                    <p className="text-gray-700 font-medium">+91-7904852910</p>
                    <p className="text-gray-600 text-sm">Monday - Satursday,9 AM - 6 PM EST</p>
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
                    <p className="text-gray-600 text-sm">coimbatore,cb-12345</p>
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
              {/* Status Message */}
              {statusMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    statusMessage.includes('✅') 
                      ? 'bg-green-100 border-2 border-green-500 text-green-800' 
                      : 'bg-red-100 border-2 border-red-500 text-red-800'
                  }`}
                >
                  <p className="font-semibold">{statusMessage}</p>
                </motion.div>
              )}

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
                  disabled={isSending}
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
                  disabled={isSending}
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
                  disabled={isSending}
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
                  disabled={isSending}
                  rows="5"
                  className="input-field resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{ scale: isSending ? 1 : 1.05 }}
                whileTap={{ scale: isSending ? 1 : 0.95 }}
                className={`btn-primary w-full flex items-center justify-center ${
                  isSending ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </>
                )}
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
                  Yes, we use enterprise-grade encryption and follow guidelines to ensure your data remains completely secure.
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