'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X, Eye } from 'lucide-react';
import Image from 'next/image';

const certifications = [
  {
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    color: 'from-orange-500 to-amber-400',
    glow: '#f97316',
    icon: '☁️',
    image: '/nptel-cloud-cert.png',
  },
  {
    title: 'Data Structure and Algorithm using Python',
    issuer: 'Infosys Springboard',
    color: 'from-blue-500 to-cyan-400',
    glow: '#3b82f6',
    icon: '🐍',
  },
  {
    title: 'Arduino Robotics',
    issuer: 'IIT Madras',
    color: 'from-red-500 to-rose-400',
    glow: '#ef4444',
    icon: '🤖',
    image: '/arduino-robotics-cert.jpg',
  },
  {
    title: 'Introduction to Python',
    issuer: 'Infosys Springboard',
    color: 'from-green-500 to-emerald-400',
    glow: '#22c55e',
    icon: '💻',
    image: '/infosys-python-cert.jpg',
  },
  {
    title: 'Data Analytics Course',
    issuer: 'Novi Tech Master Class',
    color: 'from-purple-500 to-violet-400',
    glow: '#a855f7',
    icon: '📊',
    image: '/novitech-data-analytics-cert.jpg',
  },
];

export default function Certifications() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="certifications" ref={ref} className="py-32 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Certifi<span className="text-gradient">cations</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto rounded-full" />
          <p className="text-white/50 mt-6 max-w-xl mx-auto">
            Continuously leveling up with industry-recognized credentials. Click on cards with previews to view.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => cert.image && setSelectedImage(cert.image)}
              className={`relative glass rounded-2xl p-6 border border-white/10 group overflow-hidden ${
                cert.image ? 'cursor-pointer hover:border-[var(--color-secondary)]/50' : 'cursor-default'
              }`}
              style={{ boxShadow: `0 0 0 0 ${cert.glow}00` }}
            >
              {/* Glow blob on hover */}
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ background: cert.glow }}
              />

              {/* Top bar gradient */}
              <div className={`h-1 w-full rounded-full bg-gradient-to-r ${cert.color} mb-6 group-hover:w-full transition-all`} />

              <div className="flex items-start gap-4">
                <div className="text-4xl select-none">{cert.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-base leading-snug mb-1 group-hover:text-gradient transition-all line-clamp-2">
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <div className="flex items-center gap-2">
                      <Award size={13} className="text-white/40 shrink-0" />
                      <span className="text-xs text-white/50 font-medium tracking-wide uppercase">
                        {cert.issuer}
                      </span>
                    </div>
                    {cert.image && (
                      <span className="text-[10px] text-[var(--color-secondary)] font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye size={10} /> View
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-4xl w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl glass p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/45 flex items-center justify-center">
                <Image
                  src={selectedImage}
                  alt="Certificate View"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/10 transition-all hover:scale-110"
                onClick={() => setSelectedImage(null)}
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
