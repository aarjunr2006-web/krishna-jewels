import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-sans font-medium uppercase tracking-wider text-sm transition-colors duration-300 py-3 px-6 select-none focus:outline-none focus:ring-1 focus:ring-kj-gold cursor-pointer';
  
  const variantStyles = {
    primary: 'bg-kj-maroon text-kj-ivory hover:bg-[#521323] active:bg-[#400d1a] shining-hover',
    secondary: 'border border-kj-maroon text-kj-maroon hover:bg-kj-maroon hover:text-kj-ivory shining-hover',
    outline: 'border border-kj-gold text-kj-charcoal hover:bg-kj-gold hover:text-kj-charcoal shining-hover',
    ghost: 'text-kj-charcoal hover:text-kj-gold hover:bg-black/5',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};
export default Button;
