import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Newsletter from './Newsletter';

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Mostrar modal após 30 segundos de navegação
    const timer = setTimeout(() => {
      const hasSeenModal = localStorage.getItem('hasSeenNewsletterModal');
      if (!hasSeenModal) {
        setIsOpen(true);
        localStorage.setItem('hasSeenNewsletterModal', 'true');
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5 text-neutral-500" />
            </button>
            <div className="p-1">
              <Newsletter variant="modal" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;
