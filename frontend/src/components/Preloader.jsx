import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only show once per session or quick short reveal (1.2 seconds max)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.77, 0, 0.175, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <img
              src={logo}
              alt="Architecture Wonders Logo"
              className="h-14 sm:h-16 w-auto object-contain"
            />
            {/* Minimal architectural progress rule */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeInOut' }}
              className="mt-6 h-[1.5px] bg-studio-teal"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
