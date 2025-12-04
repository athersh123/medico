import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUpload, 
  FaFileMedical, 
  FaBrain, 
  FaShieldAlt, 
  FaDownload,
  FaEye,
  FaTrash,
  FaHeartbeat,
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle
} from 'react-icons/fa';
import { reportAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Scan = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [reportId, setReportId] = useState(null);

  const handleFileSelect = (file) => {
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const analyzeReport = async () => {
    if (!selectedFile || !user) {
      setError('Please log in and select a file to analyze.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setError('');

    try {
      console.log('Scan: Starting analysis for file:', selectedFile.name);
      console.log('Scan: User authenticated:', !!user);
      console.log('Scan: Token exists:', !!localStorage.getItem('medicor_token'));
      
      // Prepare file data for API
      const fileData = {
        fileName: selectedFile.name,
        fileSize: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
        fileType: selectedFile.type,
        fileData: selectedFile.name // In real implementation, this would be base64 or file upload
      };

      console.log('Scan: Sending analysis request with data:', fileData);

      // Call the API to analyze the report
      const response = await reportAPI.analyzeReport(fileData);
      
      console.log('Scan: Analysis response received:', response);
      
      if (response.success) {
        const analysis = response.analysis;
        
        // Add icons to findings
        const findingsWithIcons = analysis.findings.map(finding => ({
          ...finding,
          icon: finding.findingType === 'Normal' 
            ? <FaCheckCircle className="text-green-500" />
            : <FaExclamationTriangle className="text-yellow-500" />
        }));

        setAnalysisResult({
          ...analysis,
          findings: findingsWithIcons
        });
        setReportId(response.reportId);
        console.log('Scan: Analysis completed successfully');
      } else {
        console.error('Scan: Analysis failed - no success flag');
        setError(response.message || 'Failed to analyze report. Please try again.');
      }
    } catch (error) {
      console.error('Scan: Analysis error:', error);
      console.error('Scan: Error response:', error.response);
      
      // Better error handling
      let errorMessage = 'Failed to analyze report. Please try again.';
      
      if (error.response?.status === 401) {
        errorMessage = 'Please log in to analyze reports.';
      } else if (error.response?.status === 403) {
        errorMessage = 'You do not have permission to analyze reports.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setAnalysisResult(null);
    setError('');
    setReportId(null);
  };

  const downloadReport = async () => {
    if (!reportId) return;

    try {
      const response = await reportAPI.downloadReport(reportId);
      
      if (response.success) {
        // Create a downloadable report
        const reportData = response.report;
        const reportContent = `
MEDICAL REPORT ANALYSIS
======================

File: ${reportData.fileName}
Analysis Date: ${reportData.analysisDate}
Confidence: ${reportData.confidence}%

FINDINGS:
${reportData.findings.map((finding, index) => 
  `${index + 1}. ${finding.findingType} (${finding.confidence}%)
     ${finding.description}`
).join('\n\n')}

RECOMMENDATIONS:
${reportData.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

RISK FACTORS:
${reportData.riskFactors.map((risk, index) => `${index + 1}. ${risk}`).join('\n')}

MEDICATION CONSIDERATIONS:
${reportData.medications.map((med, index) => `${index + 1}. ${med}`).join('\n')}

---
Generated by Medicor AI
        `;

        // Create and download file
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `medical_report_analysis_${reportData.fileName.replace(/\.[^/.]+$/, "")}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download error:', error);
      setError('Failed to download report. Please try again.');
    }
  };

  const viewFullAnalysis = () => {
    // In a real application, this would open a detailed modal or navigate to a full analysis page
    alert('Full analysis view would show detailed breakdowns, charts, and additional insights. This feature will be implemented in the next version.');
  };

  return (
    <div className="min-h-screen gradient-bg py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="flex items-center justify-center mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <FaFileMedical className="text-6xl text-gradient mr-4 animate-pulse-slow" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-30 animate-glow"></div>
            </div>
            <h1 className="text-5xl font-bold text-gradient">Medical Report Analysis</h1>
          </motion.div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Upload your medical reports, scans, or test results for AI-powered analysis. 
            Get instant insights and professional recommendations.
          </p>
        </motion.div>

        {/* File Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card max-w-4xl mx-auto mb-8"
        >
          <div className="text-center mb-8">
            <FaUpload className="text-4xl text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Medical Report</h2>
            <p className="text-gray-600">Supported formats: PDF, JPG, PNG, DICOM</p>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
              dragActive
                ? 'border-primary-500 bg-primary-50'
                : selectedFile
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-primary-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <FaFileMedical className="text-4xl text-green-500 mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedFile.name}</h3>
                  <p className="text-gray-600">
                    Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={analyzeReport}
                    disabled={isAnalyzing}
                    className="btn-primary flex items-center"
                  >
                    {isAnalyzing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FaBrain className="mr-2" />
                        Analyze Report
                      </>
                    )}
                  </button>
                  <button
                    onClick={removeFile}
                    className="btn-secondary flex items-center"
                  >
                    <FaTrash className="mr-2" />
                    Remove
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <FaUpload className="text-4xl text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drag and drop your medical report here
                  </p>
                  <p className="text-gray-600">or</p>
                </div>
                <label className="btn-primary inline-flex items-center cursor-pointer">
                  <FaUpload className="mr-2" />
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.dcm"
                    onChange={(e) => handleFileSelect(e.target.files[0])}
                  />
                </label>
              </div>
            )}
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="bg-red-50 border-2 border-red-500 text-red-700 px-6 py-4 rounded-xl flex items-start">
              <FaExclamationTriangle className="text-2xl mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">Analysis Error</h3>
                <p>{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Analysis Results</h2>
              <p className="text-gray-600">
                AI-powered analysis completed with {analysisResult.confidence}% confidence
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Report Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  <FaFileMedical className="text-2xl text-primary-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Report Details</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">File Name:</span>
                    <span className="font-medium">{analysisResult.fileName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">File Size:</span>
                    <span className="font-medium">{analysisResult.fileSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Analysis Date:</span>
                    <span className="font-medium">{analysisResult.analysisDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Confidence:</span>
                    <span className="font-medium text-primary-600">{analysisResult.confidence}%</span>
                  </div>
                </div>
              </motion.div>

              {/* Key Findings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  <FaBrain className="text-2xl text-secondary-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Key Findings</h3>
                </div>
                <div className="space-y-4">
                  {analysisResult.findings.map((finding, index) => (
                    <div key={index} className="border-l-4 border-gray-200 pl-4">
                      <div className="flex items-center mb-2">
                        {finding.icon}
                        <span className="ml-2 font-semibold text-gray-900">{finding.findingType}</span>
                        <span className="ml-auto text-sm text-gray-500">{finding.confidence}%</span>
                      </div>
                      <p className="text-gray-600 text-sm">{finding.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Risk Assessment */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  <FaShieldAlt className="text-2xl text-red-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">Risk Factors</h3>
                </div>
                <ul className="space-y-2">
                  {analysisResult.riskFactors.map((risk, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span className="text-gray-800 font-medium">{risk}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card mt-8"
            >
              <div className="flex items-center mb-6">
                <FaChartLine className="text-2xl text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Recommendations</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Next Steps</h4>
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span className="text-gray-800 font-medium">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Medicine Considerations</h4>
                  <ul className="space-y-2">
                    {analysisResult.medications.map((med, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-800 font-medium">{med}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center space-x-4 mt-8"
            >
              <button 
                onClick={downloadReport}
                className="btn-primary flex items-center"
              >
                <FaDownload className="mr-2" />
                Download Report
              </button>
              <button 
                onClick={viewFullAnalysis}
                className="btn-secondary flex items-center"
              >
                <FaEye className="mr-2" />
                View Full Analysis
              </button>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-2">
                  <FaInfoCircle className="text-yellow-500 mr-2" />
                  <span className="font-semibold text-gray-900">Important Notice</span>
                </div>
                <p className="text-gray-700 text-sm">
                  This AI analysis is for informational purposes only and should not replace professional medical advice. 
                  Always consult with qualified healthcare providers for diagnosis and treatment decisions.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Scan; 