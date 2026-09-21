'use client';

import { motion } from 'framer-motion';

export default function ScreenContainer({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      style={{ minHeight: '100vh', width: '100%', position: 'relative' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
