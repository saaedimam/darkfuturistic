import React from 'react';
import { motion } from 'motion/react';

export function VectorLogo() {
  return (
    <motion.div 
      className="flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer ring */}
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 2"
        />
        
        {/* Inner geometric shape */}
        <motion.path
          d="M12 20L20 12L28 20L20 28Z"
          fill="url(#gradient2)"
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Central dot */}
        <circle
          cx="20"
          cy="20"
          r="3"
          fill="url(#gradient3)"
        />
        
        {/* Letter S stylized */}
        <motion.path
          d="M15 14C15 12 16.5 11 18 11C19.5 11 21 12 21 14C21 16 19.5 17 18 17C16.5 17 15 18 15 20C15 22 16.5 23 18 23C19.5 23 21 22 21 20"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4CAF50" />
            <stop offset="50%" stopColor="#66BB6A" />
            <stop offset="100%" stopColor="#81C784" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#388E3C" />
            <stop offset="100%" stopColor="#4CAF50" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#81C784" />
            <stop offset="100%" stopColor="#A5D6A7" />
          </linearGradient>
        </defs>
      </motion.svg>
      
      <motion.div
        className="font-outfit tracking-wider"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-white text-xl font-medium">saaed</span>
        <span className="text-[#4CAF50] text-xl font-medium">imam</span>
      </motion.div>
    </motion.div>
  );
}
