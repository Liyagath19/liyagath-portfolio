'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Python", "Java", "SQL"],
    icon: "⌨️",
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Web & AI Technologies",
    skills: ["Google AI Studio", "Claude", "ChatGPT", "Gemini", "Antigravity"],
    icon: "🤖",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Version Control",
    skills: ["Git", "GitHub"],
    icon: "🔗",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Soft Skills",
    skills: ["Problem Solving", "Team Management", "Communication", "Adaptability"],
    icon: "🌟",
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "UI/UX Tools",
    skills: ["Figma", "Canva", "Adobe Photoshop"],
    icon: "🎨",
    color: "from-pink-500 to-rose-600",
  },
];

// Slide directions per card index
const slideDirections = [
  { x: -120, y: 0 },
  { x: 0,    y: 80 },
  { x: 120,  y: 0 },
  { x: 0,    y: 80 },
  { x: 120,  y: 0 },
];

const cardVariants: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: slideDirections[i].x,
    y: slideDirections[i].y,
    scale: 0.85,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 16,
      delay: i * 0.15,
    },
  }),
};

const skillItemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 18,
      delay: i * 0.08,
    },
  }),
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.skill-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const target = card as HTMLElement;
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--mouse-x', `${mouseEvent.clientX - rect.left}px`);
        target.style.setProperty('--mouse-y', `${mouseEvent.clientY - rect.top}px`);
      });
    });
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-32 relative z-10 bg-[#0c0d0f]/50 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Section heading slides down */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            style={{ originX: 0.5 }}
            className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto rounded-full"
          />
        </motion.div>

        {/* Cards grid — first 4 on top row, UI/UX Tools centred below */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {skillCategories.slice(0, 4).map((category, index) => (
            <motion.div
              key={category.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{ y: -8, scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className="skill-card relative glass p-8 rounded-3xl overflow-hidden group hover:border-[var(--color-secondary)]/50 transition-colors cursor-default"
            >
              {/* Radial spotlight on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(108,99,255,0.18), transparent 40%)`,
                }}
              />

              {/* Gradient top bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.3, ease: 'easeOut' }}
                style={{ originX: 0 }}
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} rounded-t-3xl`}
              />

              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -30 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: index * 0.15 + 0.2 }}
                className="text-3xl mb-4 relative z-10"
              >
                {category.icon}
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: index * 0.15 + 0.25 }}
                className="text-xl font-bold mb-6 text-white relative z-10"
              >
                {category.title}
              </motion.h3>

              {/* Skill items */}
              <ul className="space-y-4 relative z-10">
                {category.skills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    custom={i}
                    variants={skillItemVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    whileHover={{ x: 10, color: 'var(--color-secondary)', transition: { duration: 0.2 } }}
                    className="text-white/70 flex items-center gap-3 transition-colors"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: index * 0.15 + i * 0.08 + 0.4, type: 'spring', stiffness: 300 }}
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} flex-shrink-0`}
                    />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* UI/UX Tools card — centred on its own row */}
        <div className="flex justify-center">
          {(() => {
            const category = skillCategories[4];
            const index = 4;
            return (
              <motion.div
                key={category.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                whileHover={{ y: -8, scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="skill-card relative glass p-8 rounded-3xl overflow-hidden group hover:border-[var(--color-secondary)]/50 transition-colors cursor-default w-full max-w-sm"
              >
                {/* Radial spotlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(236,72,153,0.18), transparent 40%)`,
                  }}
                />

                {/* Gradient top bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3, ease: 'easeOut' }}
                  style={{ originX: 0 }}
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} rounded-t-3xl`}
                />

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -30 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: index * 0.15 + 0.2 }}
                  className="text-3xl mb-4 relative z-10"
                >
                  {category.icon}
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.25 }}
                  className="text-xl font-bold mb-6 text-white relative z-10"
                >
                  {category.title}
                </motion.h3>

                {/* Skill items */}
                <ul className="space-y-4 relative z-10">
                  {category.skills.map((skill, i) => (
                    <motion.li
                      key={skill}
                      custom={i}
                      variants={skillItemVariants}
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                      whileHover={{ x: 10, color: 'var(--color-secondary)', transition: { duration: 0.2 } }}
                      className="text-white/70 flex items-center gap-3 transition-colors"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: index * 0.15 + i * 0.08 + 0.4, type: 'spring', stiffness: 300 }}
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} flex-shrink-0`}
                      />
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })()}
        </div>

      </div>
    </section>
  );
}
