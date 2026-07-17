'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" ref={containerRef} className="py-32 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>
            <p className="text-white/60 mb-12 text-lg leading-relaxed">
              Whether you have a question, a project proposal, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full glass flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Email</div>
                  <a href="mailto:lgath5919@gmail.com" className="text-lg text-white hover:text-[var(--color-secondary)] transition-colors">lgath5919@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full glass flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Phone</div>
                  <a href="tel:+919025790871" className="text-lg text-white hover:text-[var(--color-secondary)] transition-colors">+91 9025790871</a>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full glass flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-sm text-white/50 mb-1">Location</div>
                  <div className="text-lg text-white">Trichy, Tamilnadu, India</div>
                </div>
              </div>
            </div>
            
            {/* Live Google Maps Embed - Trichy, Tamil Nadu */}
            <div className="mt-12 rounded-3xl overflow-hidden relative group" style={{ aspectRatio: '16/9' }}>
              {/* Styled border glow */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-[var(--color-primary)]/30 group-hover:ring-[var(--color-secondary)]/60 transition-all duration-500 z-10 pointer-events-none" />
              
              {/* Map iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31334.56789012345!2d78.87234!3d11.14830!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab9e53b3c8d6f5%3A0xb4f52b6a9d8e1c2a!2sThuraiyur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Liyagath R Location - Thuraiyur, Tamil Nadu"
                className="w-full h-full"
              />

              {/* Location pin overlay */}
              <a
                href="https://maps.google.com/?q=Thuraiyur,Tamil+Nadu,India"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 z-20 flex items-center gap-2 glass px-4 py-2 rounded-full border border-white/20 hover:border-[var(--color-secondary)]/60 transition-all group/pin"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse shadow-[0_0_10px_var(--color-secondary)]" />
                <span className="text-sm font-medium text-white group-hover/pin:text-[var(--color-secondary)] transition-colors">Thuraiyur, Tamil Nadu 📍</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-3xl flex flex-col gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <MagneticButton 
                className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 group overflow-hidden mt-4"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSuccess ? (
                  <span>Message Sent!</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
