import { useEffect, useState } from "react";
import { EventData } from "../types";

interface CountdownTimerProps {
  event: EventData;
}

export default function CountdownTimer({ event }: CountdownTimerProps) {
  const [timeText, setTimeText] = useState("");
  const [percentTimeProgress, setPercentTimeProgress] = useState(0);

  useEffect(() => {
    // Parse times relative to June 28, 2026 (the event date)
    const eventYear = 2026;
    const eventMonth = 5; // June is index 5
    const eventDay = 28;

    const startDateTime = new Date(eventYear, eventMonth, eventDay, 18, 0, 0); // 6:00 PM
    const endDateTime = new Date(eventYear, eventMonth, eventDay, 23, 30, 0); // 11:30 PM
    
    // We can assume an early anchor point of 10:00 AM for the "total countdown" scale
    const anchorDateTime = new Date(eventYear, eventMonth, eventDay, 10, 0, 0);

    const updateTimer = () => {
      const now = new Date();
      
      // Override year/month/day to make sure we're on the same day for simulation/testing
      // if current date is completely different, but keep the current hour and minute.
      const simulatedNow = new Date(eventYear, eventMonth, eventDay, now.getHours(), now.getMinutes(), now.getSeconds());

      if (event.status === "UPCOMING" || simulatedNow < startDateTime) {
        // Upcoming calculations
        const diffMs = startDateTime.getTime() - simulatedNow.getTime();
        if (diffMs > 0) {
          const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
          const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
          
          setTimeText(`${diffHrs}h ${diffMins}m`);
          
          // Progress bar of countdown (from 10:00 AM to 6:00 PM)
          const totalDuration = startDateTime.getTime() - anchorDateTime.getTime();
          const elapsed = simulatedNow.getTime() - anchorDateTime.getTime();
          const pct = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
          setPercentTimeProgress(pct);
        } else {
          setTimeText("0h 0m");
          setPercentTimeProgress(100);
        }
      } else if (event.status === "LIVE" || (simulatedNow >= startDateTime && simulatedNow < endDateTime)) {
        // Live calculations
        const elapsedMs = simulatedNow.getTime() - startDateTime.getTime();
        const diffHrs = Math.floor(elapsedMs / (1000 * 60 * 60));
        const diffMins = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeText(`Started ${diffHrs}h ${diffMins}m ago`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // update every minute
    return () => clearInterval(interval);
  }, [event.status]);

  if (event.status === "UPCOMING") {
    return (
      <div id="countdown-card" className="py-4 border-b border-[#EDE8DF]/40">
        <span className="font-sans text-[10px] font-bold text-brand-text-muted tracking-widest uppercase">
          COUNTDOWN
        </span>
        <div className="mt-1 font-serif text-[32px] italic font-medium text-brand-text-primary leading-none">
          {timeText || "7h 57m"}
        </div>
        
        {/* Progress bar of time leading up to the event */}
        <div className="w-full h-1 bg-[#EDE8DF]/30 rounded-full mt-3 overflow-hidden">
          <div 
            className="h-full bg-brand-gold rounded-full transition-all duration-1000"
            style={{ width: `${percentTimeProgress || 20}%` }}
          />
        </div>
      </div>
    );
  }

  if (event.status === "LIVE") {
    return (
      <div id="countdown-card" className="py-4 border-b border-[#EDE8DF]/40">
        <span className="font-sans text-[10px] font-bold text-brand-text-muted tracking-widest uppercase">
          LIVE STATUS
        </span>
        <div className="mt-1 font-sans text-[15px] font-bold text-brand-text-primary">
          {timeText || "Started 2h 15m ago"}
        </div>
        <div className="mt-0.5 font-sans text-[13px] text-brand-text-secondary">
          Ends approx. {event.endTime}
        </div>
      </div>
    );
  }

  return null;
}
