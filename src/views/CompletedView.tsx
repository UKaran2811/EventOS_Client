import { useEffect, useState } from "react";
import { EventData } from "../types";
import PhotoGallery from "../components/PhotoGallery";

interface CompletedViewProps {
  event: EventData;
  onBack: () => void;
}

export default function CompletedView({ event, onBack }: CompletedViewProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  // Define some random configurations for 30 confetti pieces
  const [confettiPieces] = useState(() => {
    const colors = ["#C4380A", "#B8860B", "#2D6A2D", "#1A4A8C", "#EDD88A"];
    return Array.from({ length: 30 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${2.0 + Math.random() * 1.0}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
      width: `${5 + Math.random() * 4}px`,
      height: `${7 + Math.random() * 5}px`,
      rotate: `${Math.random() * 180}deg`,
    }));
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="completed-view" className="min-h-screen bg-[#FAF9F6] px-4 py-6 animate-fade-in flex flex-col justify-between text-brand-text-primary">
      {showConfetti && (
        <div className="confetti-container animate-fade-out" aria-hidden="true" style={{ animationDelay: "3.5s" }}>
          {confettiPieces.map((piece, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: piece.left,
                animationDelay: piece.delay,
                animationDuration: piece.duration,
                backgroundColor: piece.color,
                width: piece.width,
                height: piece.height,
                transform: `rotate(${piece.rotate})`,
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full max-w-[480px] md:max-w-[720px] mx-auto space-y-8 px-2 md:px-0">
        
        {/* Top brand indicator */}
        <div className="flex items-center justify-between h-[40px] px-1 border-b border-neutral-200/40">
          <div className="flex items-center gap-0.5 font-sans text-[13px] tracking-wider uppercase font-extrabold">
            <span>Event</span>
            <span className="text-brand-accent">OS</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="text-brand-text-secondary hover:text-brand-accent transition-colors text-[13px] font-bold cursor-pointer"
            >
              ← Exit
            </button>
            <span className="text-[10px] text-brand-text-muted font-bold tracking-widest uppercase">
              Completed
            </span>
          </div>
        </div>

        {/* Hero Success */}
        <div id="completed-hero" className="text-center py-6">
          <div className="w-12 h-12 rounded-full border border-brand-green/30 text-brand-green flex items-center justify-center text-xl mx-auto mb-4" aria-hidden="true">
            ✓
          </div>

          <h1 className="font-serif text-[28px] italic font-medium leading-tight">
            Celebration complete.
          </h1>

          <p className="font-sans text-[14px] text-brand-text-secondary mt-2 font-bold">
            {event.name}
          </p>
          <p className="font-sans text-[12px] text-brand-text-muted mt-0.5">
            {event.subEvent} · {event.date}
          </p>
        </div>

        {/* Flat minimal stats row */}
        <div id="completed-stats" className="grid grid-cols-4 gap-4 py-4 border-y border-neutral-200/40 text-center">
          <div>
            <div className="font-serif text-[24px] font-semibold italic text-brand-text-primary leading-none">
              {event.progress.total}
            </div>
            <div className="font-sans text-[10px] text-brand-text-muted mt-1 uppercase font-bold tracking-wider">
              Tasks
            </div>
          </div>

          <div>
            <div className="font-serif text-[24px] font-semibold italic text-brand-text-primary leading-none">
              100%
            </div>
            <div className="font-sans text-[10px] text-brand-text-muted mt-1 uppercase font-bold tracking-wider">
              On Time
            </div>
          </div>

          <div>
            <div className="font-serif text-[24px] font-semibold italic text-brand-text-primary leading-none">
              {event.rsvp.confirmed}
            </div>
            <div className="font-sans text-[10px] text-brand-text-muted mt-1 uppercase font-bold tracking-wider">
              Guests
            </div>
          </div>

          <div>
            <div className="font-serif text-[24px] font-semibold italic text-brand-text-primary leading-none">
              {event.departments.length}
            </div>
            <div className="font-sans text-[10px] text-brand-text-muted mt-1 uppercase font-bold tracking-wider">
              Teams
            </div>
          </div>
        </div>

        {/* Photos Grid */}
        <div id="completed-photos-section" className="space-y-3">
          <h2 className="font-sans text-[14px] font-bold text-brand-text-primary">
            Sangeet Gallery
          </h2>
          <PhotoGallery photos={event.photos} layout="grid" />
        </div>

        {/* Minimal Thank You Quote */}
        <div id="thank-you-note" className="py-2 border-l-2 border-brand-gold pl-4">
          <blockquote className="font-serif text-[15px] italic text-brand-text-primary leading-relaxed">
            "It was an honor coordinating your celebration."
          </blockquote>
          <span className="block font-sans text-[12px] text-brand-text-secondary font-bold mt-1.5">
            — {event.coordinator.name}, {event.coordinator.company}
          </span>
        </div>

      </div>

      {/* Footer */}
      <footer id="completed-footer" className="text-center py-6 mt-10 border-t border-neutral-200/20">
        <p className="font-sans text-[11px] text-brand-text-muted uppercase tracking-widest font-bold">
          Coordinated by {event.coordinator.company} · EventOS
        </p>
      </footer>
    </div>
  );
}
