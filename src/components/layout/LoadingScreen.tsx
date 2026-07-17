'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for 3D assets and fonts
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[var(--color-background)]"
        >
          <div className="flex flex-col items-center">
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 uppercase flex flex-wrap justify-center overflow-hidden"
            >
              {"LIYAGATH PORTFOLIO".split("").map((char, index) => {
                const colors = ["#6C63FF", "#00E5FF", "#7C3AED", "#FFFFFF", "#6C63FF"];
                return (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { y: -100, opacity: 0 },
                      visible: { 
                        y: 0, 
                        opacity: 1, 
                        transition: { type: "spring", damping: 12, stiffness: 150 } 
                      },
                    }}
                    style={{
                      color: char === " " ? "transparent" : colors[index % colors.length],
                      textShadow: char !== " " ? `0 0 20px ${colors[index % colors.length]}80` : "none",
                      display: "inline-block",
                      marginRight: char === " " ? "1rem" : "0",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              })}
            </motion.div>
            
            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-1/2 bg-[var(--color-primary)] rounded-full shadow-[0_0_15px_var(--color-primary)]"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-6 text-sm md:text-base tracking-widest text-white/50 uppercase font-medium"
            >
              Loading experience...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
