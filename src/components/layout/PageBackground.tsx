'use client';

import { useEffect, useRef } from 'react';

export default function PageBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Animated particle grid on canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = document.documentElement.scrollHeight;

    const resize = () => {
      W = window.innerWidth;
      H = document.documentElement.scrollHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener('resize', resize);

    // Floating dots
    const dots = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Connect nearby dots with lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(108,99,255,${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,99,255,${d.alpha})`;
        ctx.fill();

        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {/* ── 1. Deep space base gradient ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% -10%,  rgba(108,99,255,0.22) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 90% 30%,   rgba(0,229,255,0.10) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 10% 70%,   rgba(124,58,237,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 70% 60% at 50% 110%,  rgba(0,229,255,0.09) 0%, transparent 70%),
            linear-gradient(180deg, #08090A 0%, #0a0b10 40%, #080c12 70%, #08090A 100%)
          `,
        }}
      />

      {/* ── 2. Aurora bands (CSS animation) ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="aurora-band aurora-1" />
        <div className="aurora-band aurora-2" />
        <div className="aurora-band aurora-3" />
      </div>

      {/* ── 3. Subtle dot-grid pattern ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(108,99,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── 4. Horizontal scan line sweep ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="scan-line" />
      </div>

      {/* ── 5. Animated particle canvas (full page height) ── */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full z-0 pointer-events-none opacity-70"
        style={{ height: '100%' }}
      />

      {/* ── 6. Vignette edges ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 50% 50%,
              transparent 55%,
              rgba(8,9,10,0.55) 100%)
          `,
        }}
      />

      <style>{`
        /* Aurora bands */
        .aurora-band {
          position: absolute;
          width: 200%;
          height: 320px;
          border-radius: 50%;
          filter: blur(72px);
          opacity: 0.13;
          animation: auroraFloat 18s ease-in-out infinite alternate;
        }
        .aurora-1 {
          top: 5%;
          left: -30%;
          background: linear-gradient(90deg, #6C63FF, #00E5FF, #7C3AED);
          animation-duration: 20s;
          animation-delay: 0s;
        }
        .aurora-2 {
          top: 42%;
          left: 20%;
          background: linear-gradient(90deg, #00E5FF, #7C3AED, #6C63FF);
          animation-duration: 25s;
          animation-delay: -8s;
          opacity: 0.09;
        }
        .aurora-3 {
          bottom: 8%;
          left: -20%;
          background: linear-gradient(90deg, #7C3AED, #6C63FF, #00E5FF);
          animation-duration: 22s;
          animation-delay: -14s;
          opacity: 0.11;
        }
        @keyframes auroraFloat {
          0%   { transform: translateX(0%)   translateY(0px)  scaleY(1); }
          33%  { transform: translateX(8%)   translateY(30px) scaleY(1.1); }
          66%  { transform: translateX(-6%)  translateY(-20px) scaleY(0.95); }
          100% { transform: translateX(12%)  translateY(15px) scaleY(1.05); }
        }

        /* Scan line */
        .scan-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0,229,255,0.18) 30%,
            rgba(108,99,255,0.35) 50%,
            rgba(0,229,255,0.18) 70%,
            transparent 100%
          );
          animation: scanDown 8s linear infinite;
          opacity: 0;
        }
        @keyframes scanDown {
          0%   { top: -2px;   opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.6; }
          100% { top: 100vh;  opacity: 0; }
        }
      `}</style>
    </>
  );
}
