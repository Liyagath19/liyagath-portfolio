'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Python", "Java", "SQL"]
  },
  {
    title: "Web & AI Technologies",
    skills: ["Google AI Studio", "Claude", "ChatGPT", "Gemini", "Antigravity"]
  },
  {
    title: "Version Control",
    skills: ["Git", "GitHub"]
  },
  {
    title: "Soft Skills",
    skills: ["Problem Solving", "Team Management", "Communication", "Adaptability"]
  }
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Magnetic hover effect on skill cards
    const cards = containerRef.current.querySelectorAll('.skill-card');
    
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const target = card as HTMLElement;
        const rect = target.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        
        target.style.setProperty('--mouse-x', `${x}px`);
        target.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-32 relative z-10 bg-[#0c0d0f]/50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="skill-card relative glass p-8 rounded-3xl overflow-hidden group hover:border-[var(--color-secondary)]/50 transition-colors"
            >
              {/* Radial gradient follow mouse effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(108, 99, 255, 0.15), transparent 40%)`
                }}
              />
              
              <h3 className="text-xl font-bold mb-6 text-white relative z-10">{category.title}</h3>
              
              <ul className="space-y-4 relative z-10">
                {category.skills.map((skill, i) => (
                  <motion.li 
                    key={skill}
                    whileHover={{ x: 10, color: 'var(--color-secondary)' }}
                    className="text-white/70 flex items-center gap-3 transition-colors cursor-default"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
