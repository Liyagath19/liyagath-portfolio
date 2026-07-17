'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'Intelligent Temperature Forecasting (Patent)',
    category: 'AI & Big Data',
    description: 'Developed an advanced predictive framework utilizing a Swarm Intelligence-optimized LSTM neural network architecture to process massive scale, high-frequency environmental data.',
    tech: ['Python', 'LSTM', 'Swarm Intelligence', 'Big Data Analytics'],
    image: '/project-temperature.png',
    gradient: 'from-indigo-500/30 to-purple-600/30',
  },
  {
    id: 2,
    title: 'Smart Irrigation Monitoring',
    category: 'Internet of Things',
    description: 'Smart irrigation monitoring using IoT, sensors, AI, and data analytics to optimize irrigation based on real-time conditions instead of manual scheduling.',
    tech: ['IoT', 'Sensors', 'AI', 'Data Analytics'],
    image: '/project-irrigation.png',
    gradient: 'from-cyan-500/30 to-blue-600/30',
  },
  {
    id: 3,
    title: 'Carbon Footprint Calculator',
    category: 'Web Development',
    description: 'Developed a web-based calculator to estimate individual carbon emissions. Designed the frontend and implemented backend logic using Python for accurate values.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Python'],
    image: '/project-carbon.png',
    gradient: 'from-emerald-500/30 to-teal-600/30',
  }
];

const categories = ['All', 'AI & Big Data', 'Internet of Things', 'Web Development'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filteredProjects = projects.filter(project => 
    activeFilter === 'All' ? true : project.category === activeFilter
  );

  return (
    <section id="projects" className="py-32 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto rounded-full mb-12" />
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category 
                    ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-[0_0_15px_rgba(108,99,255,0.4)]'
                    : 'glass text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-3xl overflow-hidden glass p-4 hover:border-[var(--color-primary)]/50 transition-colors"
              >
                {/* Project Image */}
                <div className="w-full aspect-video rounded-2xl mb-6 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-60 group-hover:opacity-20 transition-opacity duration-500`} />
                  {/* Hover shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="px-2">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xs font-semibold text-[var(--color-secondary)] mb-2 tracking-wider uppercase">
                        {project.category}
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-[var(--color-primary)] transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex gap-3">
                      <a href="#" className="p-2 rounded-full glass-hover text-white/70 hover:text-white hover:scale-110 transition-all">
                        <FaGithub size={18} />
                      </a>
                      <a href="#" className="p-2 rounded-full glass-hover text-white/70 hover:text-white hover:scale-110 transition-all">
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                  
                  <p className="text-white/60 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/80">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
