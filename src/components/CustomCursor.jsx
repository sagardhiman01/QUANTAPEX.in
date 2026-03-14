import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // only show after first mouse move

  useEffect(() => {
    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      // Check if hovering over a clickable element
      const isClickable = e.target.closest('a') || 
                          e.target.closest('button') || 
                          e.target.closest('.service-card') || 
                          e.target.closest('.case-study-row');
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  // Don't render cursor on mobile/touch interfaces
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
     return null;
  }

  if (!isVisible) return null;

  return (
    <motion.div
      animate={{
        x: mousePosition.x - 20,
        y: mousePosition.y - 20,
        scale: isHovering ? 1.5 : 1,
        opacity: isHovering ? 0.8 : 0.4
      }}
      transition={{ 
        type: "spring", 
        stiffness: 150, 
        damping: 15, 
        mass: 0.3 
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid rgba(108, 99, 255, 0.4)',
        backgroundColor: isHovering ? 'rgba(108, 99, 255, 0.2)' : 'transparent',
        pointerEvents: 'none',
        zIndex: 9999,
        boxShadow: isHovering ? '0 0 20px rgba(108, 99, 255, 0.4)' : 'none'
      }}
    />
  );
}
