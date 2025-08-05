import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  onClick = null,
  ...props 
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg',
    elevated: 'bg-white shadow-xl border border-gray-100',
    outlined: 'bg-white border-2 border-gray-200 shadow-sm',
    gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 shadow-lg',
    glass: 'bg-white/60 backdrop-blur-lg border border-white/20 shadow-lg',
    dark: 'bg-gray-800 border border-gray-700 shadow-lg text-white'
  };
  
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${hoverClasses} ${clickableClasses} ${className}`;
  
  const cardProps = {
    className: classes,
    onClick,
    ...props
  };
  
  if (hover || onClick) {
    return (
      <motion.div
        {...cardProps}
        whileHover={hover ? { y: -4, scale: 1.02 } : {}}
        whileTap={onClick ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div {...cardProps}>
      {children}
    </div>
  );
};

// Card sub-components for better composition
Card.Header = ({ children, className = '' }) => (
  <div className={`p-6 pb-4 ${className}`}>
    {children}
  </div>
);

Card.Body = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={`p-6 pt-4 border-t border-gray-200/50 ${className}`}>
    {children}
  </div>
);

Card.Image = ({ src, alt, className = '' }) => (
  <div className={`overflow-hidden rounded-t-xl ${className}`}>
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
    />
  </div>
);

export default Card;