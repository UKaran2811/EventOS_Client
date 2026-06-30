import React from "react";
import { Milestone } from "../types";

interface MilestoneItemProps {
  key?: React.Key;
  milestone: Milestone;
  isLast: boolean;
}

export default function MilestoneItem({ milestone, isLast }: MilestoneItemProps) {
  const { time, label, status } = milestone;

  const isDone = status === "DONE";
  const isInProgress = status === "IN_PROGRESS";
  const isUpcoming = status === "UPCOMING";

  return (
    <div 
      id={`milestone-${time.replace(/[:\s]/g, "")}`}
      className="relative flex items-stretch gap-4 py-3"
    >
      {/* Time column */}
      <div className="w-[60px] shrink-0 font-sans text-[12px] font-bold text-brand-text-secondary flex items-center">
        {time}
      </div>

      {/* Timeline Bullet Column */}
      <div className="relative flex flex-col items-center justify-center shrink-0 w-5">
        {/* Connection line */}
        {!isLast && (
          <div className="absolute top-[60%] bottom-[-60%] w-[1px] bg-[#EDE8DF]/60" />
        )}

        {/* Bullet point */}
        {isDone && (
          <div className="z-10 w-3 h-3 rounded-full bg-brand-green" />
        )}
        {isInProgress && (
          <div className="z-10 w-3 h-3 rounded-full bg-brand-gold flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-white animate-live-pulse" />
          </div>
        )}
        {isUpcoming && (
          <div className="z-10 w-3 h-3 rounded-full border border-[#EDE8DF] bg-white" />
        )}
      </div>

      {/* Label and Badge Column */}
      <div className="flex-1 flex items-center justify-between gap-4">
        <span className={`font-sans text-[13px] ${
          isDone ? "text-brand-text-muted line-through" : "text-brand-text-primary font-medium"
        }`}>
          {label}
        </span>

        {/* Status Text (Minimal Label) */}
        <div className="shrink-0 font-sans text-[10px] font-bold uppercase tracking-wider">
          {isDone && (
            <span className="text-brand-green">Done</span>
          )}
          {isInProgress && (
            <span className="text-brand-gold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              Active
            </span>
          )}
          {isUpcoming && (
            <span className="text-brand-text-muted">Upcoming</span>
          )}
        </div>
      </div>
    </div>
  );
}
