import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const icons = {
  React: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
      <path d="M12 22.5c-1.9 0-3.6-.4-4.9-1.1-1.2-.7-2-1.6-2.3-2.7-.3-1-.2-2.2.3-3.5.3-.7.7-1.4 1.2-2.2-1.3-1.9-2-3.6-2-5 0-1.1.3-2.1.9-2.9.6-.8 1.5-1.4 2.7-1.8 1.2-.4 2.5-.5 4.1-.3.7.1 1.4.2 2.2.4.8-.9 1.6-1.7 2.4-2.2.9-.6 1.8-1 2.7-1 .9 0 1.6.3 2.2.8.6.5.9 1.3.9 2.2 0 .9-.3 1.8-.8 2.9-.3.6-.7 1.2-1.1 1.9 1.2 1.8 1.9 3.5 1.9 4.9 0 1.1-.3 2.1-.9 2.9-.6.8-1.5 1.4-2.7 1.8-1.2.4-2.5.5-4.1.3-.7-.1-1.4-.2-2.2-.4-.8.9-1.6 1.7-2.4 2.2-.9.6-1.8 1-2.7 1Z"/>
      <path d="M14.5 2.1c1 .2 1.1 1.4.8 3.4-.1.6-.2 1.2-.4 1.8.6.3 1.1.5 1.6.8 1.8 1 2.9 2.2 2.9 3.4 0 1.3-1.1 2.5-3 3.5-.5.3-1 .5-1.6.7.2.6.3 1.2.4 1.8.3 2 .2 3.2-.8 3.4-1 .2-2.1-.5-3.3-1.9-.4-.4-.7-.9-1.1-1.4-.4.5-.8 1-1.1 1.4-1.2 1.4-2.3 2.1-3.3 1.9-1-.2-1.1-1.4-.8-3.4.1-.6.2-1.2.4-1.8-.6-.2-1.1-.5-1.6-.7-1.9-1-3-2.2-3-3.5 0-1.3 1.1-2.5 3-3.5.5-.3 1-.5 1.6-.8-.2-.6-.3-1.2-.4-1.8-.3-2-.2-3.2.8-3.4 1-.2 2.1.5 3.3 1.9.4.4.7.9 1.1 1.4.4-.5.8-1 1.1-1.4 1.2-1.4 2.3-2.1 3.3-1.9Z"/>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2C6.477 2 6 3.477 6 9v1h6v1H4.5c-2.5 0-4.5 2-4.5 4.5v3C0 20.5 2 22 4.5 22h3C9.5 22 11 20.5 11 18.5V17h2v1.5c0 2 1.5 3.5 3.5 3.5h3c2.5 0 4.5-1.5 4.5-3.5v-3c0-2.5-2-4.5-4.5-4.5H13v-1h6V9c0-5.523-.477-7-6-7zm-.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 10a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>
    </svg>
  ),
  "Machine Learning": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2c-4 0-8 4-8 8 0 2.5 1 4.5 2.5 6L12 22l5.5-6c1.5-1.5 2.5-3.5 2.5-6 0-4-4-8-8-8zm0 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
    </svg>
  ),
  TensorFlow: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm-1 16.5L4 15v-4l7 3.5v4zm1-5.5L5 9.5l7-3.5 7 3.5-7 3.5zm8 1.5v4l-7 3.5v-4l7-3.5z"/>
    </svg>
  ),
  PyTorch: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13v6l5 3-1.4 2.3-6.6-4V7h3z"/>
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.8 0 3.5-.5 5-1.3l-5-7.7V16h-2V8h6v2h-2.2l4.4 6.8c2.4-2 3.8-4.9 3.8-8.1 0-5.9-4.5-10.3-10-10.3z"/>
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 15.5L5 14V9l7 4v4.5z"/>
    </svg>
  ),
  AWS: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.9 13.5h-2.1l-2.8-6.9-2.8 6.9H7.1L3 7.5h2.1l2.8 6.9 2.8-6.9h1.9l2.8 6.9 2.8-6.9H20l-3.1 8z"/>
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M3 3h18v18H3V3zm16.5 12c0 2.5-2 4.5-4.5 4.5-1.5 0-2.9-.7-3.8-1.8l1.5-1.5c.5.7 1.3 1.1 2.2 1.1 1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5v-2c2.5 0 4.5 2 4.5 4.5zm-10 0c0 2.5-2 4.5-4.5 4.5v-2c1.4 0 2.5-1.1 2.5-2.5S6.4 12 5 12v-2c2.5 0 4.5 2 4.5 4.5z"/>
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M3 3h18v18H3V3zm10.5 10.5H9v-2h4.5V7h2v4.5H20v2h-4.5V18h-2v-4.5zM6.5 13v-2H8v2H6.5zm0 2H8v2H6.5v-2z"/>
    </svg>
  ),
  "C++": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6H7v-2h4V7h2v2h4v2h-4v6z"/>
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M13 2.1C12.7.9 11.5 0 10 0S7.3.9 7 2.1C5.8 2.4 5 3.5 5 5v3H3v14h18V8h-2V5c0-1.5-.8-2.6-2-2.9zM8 5c0-.6.4-1 1-1s1 .4 1 1v3H8V5zm6 0c0-.6.4-1 1-1s1 .4 1 1v3h-2V5zM5 20V9h14v11H5z"/>
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M2.6 10.59L8.38 4.8l1.69 1.7c-.24.85.15 1.78.93 2.23v5.54c-.6.34-1 .99-1 1.73 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.39-1-1.73V9.41l2.07 2.09c-.07.15-.07.32-.07.5 0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2c-.18 0-.35 0-.5.07L13.93 7.5C14.23 6.97 14.23 6.24 13.93 5.71l1.69-1.69 5.77 5.77L12 21.17 2.6 10.59z"/>
    </svg>
  )
};

const SkillItem = ({ skill, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
    >
      <div className="flex items-center justify-center space-x-2 p-4 bg-black border border-yellow-500/20 rounded-lg">
        <span className="text-yellow-500">{icons[skill] || null}</span>
        <span className="text-white">{skill}</span>
      </div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 p-2 bg-black border border-yellow-500/20 text-white rounded-lg shadow-xl z-10 min-w-[200px]"
          >
            <div className="text-center">
              <p className="font-semibold text-yellow-500">{skill}</p>
              <p className="text-sm text-white/80">
                {getSkillDescription(skill)}
              </p>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-black border-r border-b border-yellow-500/20" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const getSkillDescription = (skill) => {
  const descriptions = {
    React: "A JavaScript library for building user interfaces",
    Python: "A versatile programming language for ML and web development",
    "Machine Learning": "Building systems that can learn from data",
    TensorFlow: "An open-source ML library developed by Google",
    PyTorch: "A deep learning framework by Facebook",
    "Next.js": "The React framework for production",
    "Node.js": "JavaScript runtime built on Chrome's V8 engine",
    AWS: "Cloud computing services by Amazon",
    JavaScript: "The programming language of the web",
    TypeScript: "A typed superset of JavaScript",
    "C++": "A high-performance programming language",
    Docker: "Platform for containerized applications",
    Git: "Distributed version control system"
  };
  return descriptions[skill] || "Technology skill";
};

export default SkillItem; 