'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Database, BrainCircuit, LineChart } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'B.Tech AI & DS', value: '8.51 CGPA', icon: <BrainCircuit /> },
  { label: '12th Standard', value: '79.8%', icon: <Code2 /> },
  { label: 'Languages', value: 'Tamil, English', icon: <Database /> },
  { label: 'Problem Solving', value: 'Strong', icon: <LineChart /> },
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Animate stats cards on scroll
    gsap.fromTo(
      '.stat-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden glass p-2 group">
              {/* Profile Image */}
              <div className="w-full h-full rounded-2xl relative overflow-hidden flex items-center justify-center border border-white/5 bg-[#111214]">
                <Image 
                  src="/profile-updated.jpg" 
                  alt="Liyagath R" 
                  fill 
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 mix-blend-luminosity hover:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/40 to-[var(--color-secondary)]/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                
                {/* Decorative scanning line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-secondary)]/50 shadow-[0_0_20px_var(--color-secondary)] opacity-0 group-hover:animate-scan pointer-events-none" />
              </div>
              
              {/* Floating tech stack badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-6 glass px-6 py-4 rounded-2xl border-white/10 shadow-2xl flex items-center gap-3"
              >
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse" />
                <span className="font-semibold text-sm">Open to Work</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-6 text-white/90">
              Passionate about <span className="text-[var(--color-secondary)]">innovation & continuous learning</span>.
            </h3>
            <p className="text-white/60 mb-6 leading-relaxed text-lg">
              To secure a challenging position in a reputed company where I can effectively contribute my technical skills, problem-solving abilities, and grow professionally while contributing to organizational goals.
            </p>
            <p className="text-white/60 mb-10 leading-relaxed text-lg">
              I aim to work in a dynamic environment that encourages continuous learning and innovation. Currently pursuing B.Tech in Artificial Intelligence and Data Science at V.S.B College of Engineering Technical Campus.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card glass p-6 rounded-2xl hover:bg-white/5 transition-colors border-white/5">
                  <div className="text-[var(--color-primary)] mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
