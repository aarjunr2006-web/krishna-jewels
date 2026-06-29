import React from 'react';

interface BadgeProps {
  variant?: 'primary' | 'gold' | 'sale' | 'emerald';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const baseStyle = 'inline-block text-[11px] font-sans font-semibold tracking-wider uppercase px-2 py-0.5 rounded-sm select-none';
  
  const variantStyles = {
    primary: 'bg-kj-maroon text-kj-ivory',
    gold: 'bg-kj-gold-light text-kj-charcoal border border-kj-gold/30',
    sale: 'bg-kj-rose text-kj-ivory',
    emerald: 'bg-kj-emerald/10 text-kj-emerald border border-kj-emerald/20',
  };

  return (
    <span className={`${baseStyle} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
export default Badge;
