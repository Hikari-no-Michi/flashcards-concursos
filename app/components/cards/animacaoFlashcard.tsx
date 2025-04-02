import React from 'react';
import { motion } from 'framer-motion';

interface AnimacaoFlashcardProps {
  animacao: number;
  children: React.ReactNode;
}

const AnimacaoFlashcard: React.FC<AnimacaoFlashcardProps> = ({ animacao, children }) => (
  <motion.div
    initial={{ x: 0 }}
    animate={{ x: animacao * 300, opacity: animacao ? 0 : 1 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default AnimacaoFlashcard;
