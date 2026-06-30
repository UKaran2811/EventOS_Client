import { useEffect, useState } from "react";
import { ProgressSummary } from "../types";

interface ProgressRingProps {
  progress: ProgressSummary;
  updatedJustNow: boolean;
}

export default function ProgressRing({ progress, updatedJustNow }: ProgressRingProps) {
  const { total, completed, onTrack, delayed, blocked } = progress;
  const percentage = Math.round((completed / total) * 100);
  
  const [animatedOffset, setAnimatedOffset] = useState(283); // starts fully empty

  const radius = 45;
  const circumference = 2 * Math.PI * radius; // Approx 282.74

  useEffect(() => {
    const targetOffset = circumference - (percentage / 100) * circumference;
    const timer = setTimeout(() => {
      setAnimatedOffset(targetOffset);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage, circumference]);

  return (
    <div id="progress-container" className="flex items-center gap-6 py-4 border-b border-[#EDE8DF]/40">
      <div className="relative w-[110px] h-[110px] flex items-center justify-center shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 110 110">
          {/* Background circle */}
          <circle
            cx="55"
            cy="55"
            r={radius}
            fill="transparent"
            stroke="#F5F3EF"
            strokeWidth="5"
          />
          {/* Animated active path circle */}
          <circle
            cx="55"
            cy="55"
            r={radius}
            fill="transparent"
            stroke="#2D6A2D"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={animatedOffset}
            strokeLinecap="round"
            className="transition-all duration-1200 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span id="progress-percentage" className="font-serif text-[22px] italic font-semibold text-brand-text-primary leading-none">
            {percentage}%
          </span>
          <span id="progress-label" className="font-sans text-[9px] uppercase tracking-wider text-brand-text-muted mt-0.5">
            Done
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-1.5">
        <div className="font-sans text-[14px] text-brand-text-primary font-bold">
          {completed} of {total} completed
        </div>
        
        {/* Compact list of statuses */}
        <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-[11px] font-medium text-brand-text-secondary">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
            {onTrack} On Track
          </span>
          {delayed > 0 && (
            <span className="flex items-center gap-1 text-brand-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              {delayed} Delayed
            </span>
          )}
          {blocked > 0 && (
            <span className="flex items-center gap-1 text-brand-muted-red">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-muted-red" />
              {blocked} Blocked
            </span>
          )}
        </div>

        {updatedJustNow && (
          <div className="font-sans text-[11px] text-brand-green font-semibold animate-fade-in">
            ✓ Syncing live...
          </div>
        )}
      </div>
    </div>
  );
}
