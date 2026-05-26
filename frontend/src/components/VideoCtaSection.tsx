import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const videoSrc = '/videos/hero.mp4';

export default function VideoCtaSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section className="video-cta-root">
      <div className="video-wrap">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="bg-video"
        />
        <div className="overlay overlay-dark" />
        <div className="overlay overlay-gradient" />
        <div className="overlay overlay-vignette" />
      </div>

      <div className="noise" />

      <div className="content">
        <span className="badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          AI-Powered Dermatology
        </span>

        <h2 className="headline">
          Ready to Get
          <br />
          <em>Started?</em>
        </h2>

        <p className="subtext">
          Upload a skin image and receive instant AI analysis
          <br />
          with clinical-grade accuracy.
        </p>

        <div className="cta-row">
          <Link to="/analysis" className="btn-primary">
            Start Analysis Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link to="/features" className="btn-ghost">
            Learn More
          </Link>
        </div>

        <div className="trust-row">
          <span className="trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Zero Waiting Time
          </span>
          <span className="trust-dot">·</span>
          <span className="trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Safe &amp; Secure
          </span>
          <span className="trust-dot">·</span>
          <span className="trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            85%+ Accuracy
          </span>
        </div>
      </div>

      <div className="scroll-hint">
        <span className="scroll-label">SCROLL</span>
        <div className="scroll-pill">
          <div className="scroll-dot" />
        </div>
      </div>

      <style>{`
        .video-cta-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #071521;
          font-family: 'Inter', sans-serif;
        }

        .video-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .bg-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: saturate(0.85) brightness(0.88);
          transform: scale(1.02);
        }

        .overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .overlay-dark {
          background: rgba(0, 10, 20, 0.42);
        }

        .overlay-gradient {
          background:
            radial-gradient(circle at 50% 0%, rgba(125, 211, 252, 0.18) 0%, rgba(14, 165, 233, 0.08) 18%, rgba(7, 21, 33, 0) 42%),
            linear-gradient(to bottom, rgba(7, 21, 33, 0.08) 0%, rgba(7, 21, 33, 0.52) 58%, rgba(7, 21, 33, 0.9) 100%);
        }

        .overlay-vignette {
          background: radial-gradient(ellipse at center, transparent 36%, rgba(0, 0, 0, 0.52) 100%);
        }

        .noise {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-size: 256px;
          pointer-events: none;
        }

        .content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 3rem 1.5rem;
          max-width: 760px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          animation: fadeUp 900ms ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(10px);
          color: rgba(255,255,255,0.9);
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          animation: fadeUp 900ms ease 80ms both;
        }

        .headline {
          margin: 0;
          font-size: clamp(2.8rem, 7vw, 5.6rem);
          font-weight: 500;
          line-height: 1.04;
          color: #ffffff;
          letter-spacing: -0.04em;
          animation: fadeUp 900ms ease 160ms both;
        }

        .headline em {
          font-style: italic;
          color: #7dd3fc;
          text-shadow: 0 0 24px rgba(125, 211, 252, 0.36);
        }

        .subtext {
          margin: 0;
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: rgba(255,255,255,0.8);
          line-height: 1.7;
          font-weight: 300;
          animation: fadeUp 900ms ease 240ms both;
        }

        .cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeUp 900ms ease 320ms both;
        }

        .btn-primary, .btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 12px;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;
          will-change: transform;
        }

        .btn-primary {
          background: rgba(255,255,255,0.95);
          color: #0f172a;
          font-size: 0.98rem;
          font-weight: 700;
          box-shadow: 0 20px 45px rgba(0,0,0,0.34);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 26px 56px rgba(0,0,0,0.42);
          background: #e0f2fe;
        }

        .btn-ghost {
          border: 1px solid rgba(255,255,255,0.26);
          color: rgba(255,255,255,0.92);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
          font-size: 0.98rem;
          font-weight: 600;
        }

        .btn-ghost:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.42);
        }

        .trust-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          color: rgba(255,255,255,0.66);
          font-size: 0.82rem;
          animation: fadeUp 900ms ease 400ms both;
        }

        .trust-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .trust-dot {
          opacity: 0.4;
        }

        .scroll-hint {
          position: absolute;
          bottom: 1.75rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: fadeUp 900ms ease 620ms both;
        }

        .scroll-label {
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.5);
        }

        .scroll-pill {
          width: 22px;
          height: 36px;
          border: 1.5px solid rgba(255,255,255,0.34);
          border-radius: 999px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 5px;
        }

        .scroll-dot {
          width: 4px;
          height: 8px;
          background: rgba(255,255,255,0.76);
          border-radius: 999px;
          animation: scrollBounce 1.8s ease-in-out infinite;
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          60% { transform: translateY(12px); opacity: 0.2; }
        }

        @media (max-width: 640px) {
          .cta-row { flex-direction: column; align-items: stretch; width: 100%; max-width: 320px; }
          .trust-row { padding: 0 0.5rem; }
          .trust-dot { display: none; }
        }
      `}</style>
    </section>
  );
}