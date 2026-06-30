import { useEffect, useState } from "react";
import { getMockEventByToken, mockEvents } from "./data/mockEventData";
import { EventData } from "./types";
import PortalView from "./views/PortalView";
import CompletedView from "./views/CompletedView";
import ExpiredView from "./views/ExpiredView";

export default function App() {
  const [token, setToken] = useState<string>("");
  const [activeEvent, setActiveEvent] = useState<EventData | null>(null);

  // Parse token from URL path or Hash
  const parseTokenFromUrl = () => {
    const path = window.location.pathname;
    const hash = window.location.hash;

    // Check pathname: e.g., /portal/a3f9-12bc-demo
    if (path.startsWith("/portal/")) {
      return path.substring("/portal/".length);
    }

    // Check hash: e.g., #/portal/a3f9-12bc-demo
    if (hash.startsWith("#/portal/")) {
      return hash.substring("#/portal/".length);
    }

    // Secondary fallback: #a3f9-12bc-demo
    if (hash && hash !== "#" && !hash.includes("/")) {
      return hash.substring(1);
    }

    return "";
  };

  useEffect(() => {
    const initialToken = parseTokenFromUrl();
    setToken(initialToken);

    // Listen for hash/URL changes
    const handleUrlChange = () => {
      const updatedToken = parseTokenFromUrl();
      setToken(updatedToken);
    };

    window.addEventListener("hashchange", handleUrlChange);
    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener("hashchange", handleUrlChange);
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  // Sync event data when token changes
  useEffect(() => {
    if (token) {
      const foundEvent = getMockEventByToken(token);
      if (foundEvent) {
        // Deep copy to prevent mutating base mock data across loads
        setActiveEvent(JSON.parse(JSON.stringify(foundEvent)));
      } else {
        setActiveEvent(null);
      }
    } else {
      setActiveEvent(null);
    }
  }, [token]);

  // Navigate helper
  const navigateToToken = (targetToken: string) => {
    if (targetToken) {
      window.location.hash = `#/portal/${targetToken}`;
    } else {
      window.location.hash = "";
    }
  };

  // Triggered when simulated LIVE event reaches 100% completion
  const handleEventComplete = (completedEvent: EventData) => {
    setActiveEvent(completedEvent);
  };

  return (
    <div className="min-h-screen bg-[#F5F0EA] text-[#1A1714] flex justify-center">
      {/* Centered Mobile & Tablet Viewport */}
      <div 
        id="viewport-frame" 
        className="w-full max-w-[480px] md:max-w-[768px] min-h-screen bg-[#FDFAF6] border-x border-[#EDE8DF] flex flex-col shadow-xl overflow-x-hidden relative"
      >
        {/* Glow Blobs for Frosted Glass Theme */}
        <div className="absolute top-[8%] -left-16 w-60 h-60 rounded-full bg-[#B8860B]/12 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-[18%] -right-20 w-72 h-72 rounded-full bg-[#C4380A]/10 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute top-[45%] left-10 w-44 h-44 rounded-full bg-[#2D6A2D]/8 blur-3xl pointer-events-none" />

        {token ? (
          /* Render Active Route views - wrapping inside z-10 for layering */
          <div className="z-10 relative flex-1 flex flex-col">
            {activeEvent ? (
              activeEvent.status === "COMPLETED" ? (
                <CompletedView event={activeEvent} onBack={() => navigateToToken("")} />
              ) : (
                <PortalView 
                  initialEvent={activeEvent} 
                  onEventComplete={handleEventComplete} 
                  onBack={() => navigateToToken("")}
                />
              )
            ) : (
              <ExpiredView />
            )}
          </div>
        ) : (
          /* Onboarding Sandbox Hub for / direct path */
          <div className="z-10 relative flex-1 flex flex-col justify-between p-6 animate-fade-in text-brand-text-primary">
            <div className="space-y-6 my-auto py-8">
              {/* Luxury Styled Invitation Header */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-0.5 font-sans text-[13px] tracking-widest uppercase font-extrabold text-brand-text-muted">
                  <span>Event</span>
                  <span className="text-brand-accent">OS</span>
                </div>
                
                <h1 className="font-serif text-[28px] italic font-medium leading-tight">
                  Client Portal
                </h1>
              </div>

              {/* Demo State Switcher Cards */}
              <div className="max-w-md mx-auto space-y-3">
                {/* State 1: Live */}
                <button
                  id="btn-demo-live"
                  onClick={() => navigateToToken("a3f9-12bc-demo")}
                  className="w-full text-left bg-transparent border border-neutral-200/60 p-4 rounded-xl hover:border-brand-text-primary transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-brand-green font-bold tracking-wider uppercase">
                      Live Portal
                    </span>
                    <h3 className="font-sans text-[14px] font-bold">
                      Sharma–Patel Wedding
                    </h3>
                  </div>
                  <span className="text-brand-accent group-hover:translate-x-1 transition-transform font-serif text-[18px]">
                    →
                  </span>
                </button>

                {/* State 2: Upcoming */}
                <button
                  id="btn-demo-upcoming"
                  onClick={() => navigateToToken("upcoming-demo")}
                  className="w-full text-left bg-transparent border border-neutral-200/60 p-4 rounded-xl hover:border-brand-text-primary transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-brand-gold font-bold tracking-wider uppercase">
                      Upcoming
                    </span>
                    <h3 className="font-sans text-[14px] font-bold">
                      Pre-Event Countdown
                    </h3>
                  </div>
                  <span className="text-brand-accent group-hover:translate-x-1 transition-transform font-serif text-[18px]">
                    →
                  </span>
                </button>

                {/* State 3: Completed */}
                <button
                  id="btn-demo-completed"
                  onClick={() => navigateToToken("completed-demo")}
                  className="w-full text-left bg-transparent border border-neutral-200/60 p-4 rounded-xl hover:border-brand-text-primary transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-brand-text-secondary font-bold tracking-wider uppercase">
                      Completed Summary
                    </span>
                    <h3 className="font-sans text-[14px] font-bold">
                      Post-Event Recap
                    </h3>
                  </div>
                  <span className="text-brand-accent group-hover:translate-x-1 transition-transform font-serif text-[18px]">
                    →
                  </span>
                </button>

                {/* State 4: Expired */}
                <button
                  id="btn-demo-expired"
                  onClick={() => navigateToToken("invalid-token-code")}
                  className="w-full text-left bg-transparent border border-neutral-200/40 p-4 rounded-xl hover:border-brand-text-primary transition-all flex items-center justify-between group cursor-pointer opacity-70"
                >
                  <div className="space-y-0.5">
                    <h3 className="font-sans text-[13px] font-medium text-brand-text-secondary">
                      Invalid / Expired Link
                    </h3>
                  </div>
                  <span className="text-brand-text-muted group-hover:translate-x-1 transition-transform font-serif text-[16px]">
                    →
                  </span>
                </button>
              </div>
            </div>

            {/* Sandbox Footer */}
            <footer className="text-center py-4 border-t border-neutral-200/20">
              <p className="font-sans text-[11px] text-brand-text-muted font-bold tracking-widest uppercase">
                EventOS Client Portal
              </p>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}
