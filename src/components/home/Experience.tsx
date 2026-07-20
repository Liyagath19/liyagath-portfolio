'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'Data Science Intern',
    company: 'Training Trains',
    date: 'June 2025 - July 2025',
    description: 'Gained practical exposure to data preprocessing, exploratory data analysis (EDA), and predictive modeling using Python.',
    icon: <Briefcase size={20} />,
  },
  {
    id: 2,
    role: 'Internet Of Things Intern',
    company: 'EMIGLITZ',
    date: 'Jan 2024 - Feb 2024',
    description: 'Worked on sensor integration, hardware-to-software communication protocol execution, and data logging architectures.',
    icon: <Briefcase size={20} />,
  },
  {
    id: 3,
    role: 'B.Tech AI & Data Science',
    company: 'V.S.B College of Engineering Technical Campus',
    date: '2023 - 2027',
    description: 'Currently pursuing Bachelor of Technology. Achieving 8.51 CGPA. Coimbatore.',
    icon: <GraduationCap size={20} />,
  },
  {
    id: 4,
    role: '12th Standard',
    company: 'Sowdambikaa Matric HR SEC School',
    date: '2023',
    description: 'Completed higher secondary education with 79.8%. Thuraiyur.',
    icon: <GraduationCap size={20} />,
  }
];

function TimelineCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });
  const fromLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`timeline-item relative flex flex-col md:flex-row items-center justify-between ${fromLeft ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--color-background)] border-4 border-[var(--color-secondary)] hidden md:flex items-center justify-center z-10 shadow-[0_0_15px_var(--color-secondary)] text-[var(--color-secondary)]"
      >
        {exp.icon}
      </motion.div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: fromLeft ? -60 : 60 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full md:w-[45%] glass p-8 rounded-3xl relative group hover:border-[var(--color-secondary)]/50 transition-colors"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <h3 className="text-2xl font-bold text-white group-hover:text-[var(--color-primary)] transition-colors">{exp.role}</h3>
          <span className="text-sm font-semibold text-[var(--color-secondary)] bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">{exp.date}</span>
        </div>
        <h4 className="text-lg font-medium text-white/80 mb-4">{exp.company}</h4>
        <p className="text-white/60 leading-relaxed">
          {exp.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  return (
    <section id="experience" ref={sectionRef} className="py-32 relative z-10 bg-[#0c0d0f]/50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience & <span className="text-gradient">Education</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto rounded-full" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-transparent -translate-x-1/2 hidden md:block" />

          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, index) => (
              <TimelineCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
