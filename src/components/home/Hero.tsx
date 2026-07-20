'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NetworkBackground from './NetworkBackground';
import MagneticButton from '../ui/MagneticButton';
import { ArrowRight, Download, Eye } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on scroll
      gsap.to(textRef.current, {
        y: '30%',
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <NetworkBackground />
      
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[var(--color-primary)]/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-[var(--color-secondary)]/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center" ref={textRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.8, ease: 'easeOut' }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full glass border border-[var(--color-secondary)]/30 text-sm font-medium tracking-wider text-[var(--color-secondary)] uppercase"
          >
            AI & Data Science | VSB Engineering
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3, ease: 'easeOut' }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Hi, I'm <br className="hidden md:block" />
            <span className="text-gradient">Liyagath R</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.2, ease: 'easeOut' }}
            className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Continuous learner and innovator in AI and Data Science. Ready to effectively contribute technical skills and problem-solving abilities to dynamic environments.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="#contact">
              <MagneticButton className="group flex items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-8 py-4 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(108,99,255,0.4)] hover:shadow-[0_0_30px_rgba(108,99,255,0.6)]">
                Hire Me
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </Link>
            
            <Link
              href="https://drive.google.com/file/d/1qvNmkHaJJSOpUh2n3DbOqaBCFE-Yppq7/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MagneticButton className="group flex items-center gap-2 glass px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all text-white border border-white/20 hover:border-[var(--color-secondary)]/60">
                <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
                Resume
              </MagneticButton>
            </Link>
            
            <Link href="#projects">
              <MagneticButton className="group flex items-center gap-2 glass px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all text-white">
                <Eye size={18} />
                View Projects
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-white/50 uppercase font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="w-full h-1/2 bg-[var(--color-secondary)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
