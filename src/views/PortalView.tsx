import { useEffect, useState, useMemo } from "react";
import { EventData, Task, TaskStatus } from "../types";
import ProgressRing from "../components/ProgressRing";
import CountdownTimer from "../components/CountdownTimer";
import DepartmentCard from "../components/DepartmentCard";
import MilestoneItem from "../components/MilestoneItem";
import RSVPSummary from "../components/RSVPSummary";
import PhotoGallery from "../components/PhotoGallery";

interface PortalViewProps {
  initialEvent: EventData;
  onEventComplete: (event: EventData) => void;
  onBack: () => void;
}

interface Toast {
  message: string;
  type: "success" | "info" | "warning";
}

export default function PortalView({ initialEvent, onEventComplete, onBack }: PortalViewProps) {
  const [event, setEvent] = useState<EventData>({ ...initialEvent });
  const [updatedJustNow, setUpdatedJustNow] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "timeline">("overview");
  
  // Tasks Filtering & Search state
  const [taskSearch, setTaskSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | TaskStatus>("ALL");
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [nudgeStates, setNudgeStates] = useState<Record<string, "idle" | "loading" | "done">>({});

  // Toast State
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  useEffect(() => {
    // Sync state when initialEvent changes
    setEvent({ ...initialEvent });
    setActiveTab("overview");
    setTaskSearch("");
    setStatusFilter("ALL");
    setExpandedTaskId(null);
  }, [initialEvent]);

  useEffect(() => {
    // 30 seconds interval to simulate a task completing
    const interval = setInterval(() => {
      setEvent((prevEvent) => {
        if (prevEvent.status !== "LIVE") {
          setUpdatedJustNow(true);
          setTimeout(() => setUpdatedJustNow(false), 3000);
          return { ...prevEvent };
        }

        const totalTasks = prevEvent.progress.total;
        const currentCompleted = prevEvent.progress.completed;

        if (currentCompleted >= totalTasks) {
          const completedEvent: EventData = {
            ...prevEvent,
            status: "COMPLETED",
            progress: {
              ...prevEvent.progress,
              completed: totalTasks,
              onTrack: totalTasks,
              delayed: 0,
              blocked: 0,
            },
          };
          
          setTimeout(() => {
            onEventComplete(completedEvent);
          }, 1500);

          return completedEvent;
        }

        const nextCompleted = currentCompleted + 1;

        const updatedDepartments = prevEvent.departments.map((dept) => {
          if (dept.done < dept.total) {
            return { ...dept, done: dept.done + 1 };
          }
          return dept;
        });

        const updatedPhotos = [...prevEvent.photos];
        if (nextCompleted === 15) {
          updatedPhotos.push({
            url: "https://picsum.photos/300/300?random=11",
            caption: "Dining tables final setup",
          });
        } else if (nextCompleted === 16) {
          updatedPhotos.push({
            url: "https://picsum.photos/300/300?random=12",
            caption: "Buffet presentation styling",
          });
        }

        setUpdatedJustNow(true);
        setTimeout(() => setUpdatedJustNow(false), 3000);
        showToast(`Progress update: ${Math.round((nextCompleted / totalTasks) * 100)}% complete.`, "success");

        return {
          ...prevEvent,
          progress: {
            ...prevEvent.progress,
            completed: nextCompleted,
            onTrack: Math.min(prevEvent.progress.onTrack + 1, totalTasks),
            delayed: Math.max(prevEvent.progress.delayed - (nextCompleted % 2 === 0 ? 1 : 0), 0),
            blocked: Math.max(prevEvent.progress.blocked - (nextCompleted % 3 === 0 ? 1 : 0), 0),
          },
          departments: updatedDepartments,
          photos: updatedPhotos,
        };
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [onEventComplete]);

  const syncedTasks = useMemo(() => {
    if (!event.tasks) return [];
    const tasks = [...event.tasks];
    const targetCompletedCount = event.progress.completed;
    const currentCompletedInList = tasks.filter((t) => t.status === "COMPLETED").length;

    if (currentCompletedInList === targetCompletedCount) {
      return tasks;
    }

    if (targetCompletedCount > currentCompletedInList) {
      let diff = targetCompletedCount - currentCompletedInList;
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].status !== "COMPLETED" && diff > 0) {
          tasks[i] = {
            ...tasks[i],
            status: "COMPLETED",
            progressPct: 100,
            lastUpdated: "Just now"
          };
          diff--;
        }
      }
    }

    return tasks;
  }, [event.tasks, event.progress.completed]);

  const filteredTasks = useMemo(() => {
    return syncedTasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
        task.department.toLowerCase().includes(taskSearch.toLowerCase()) ||
        task.zone.toLowerCase().includes(taskSearch.toLowerCase());
      const matchesFilter = statusFilter === "ALL" ? true : task.status === statusFilter;
      return matchesSearch && matchesFilter;
    });
  }, [syncedTasks, taskSearch, statusFilter]);

  const handleNudge = (taskId: string, taskTitle: string) => {
    setNudgeStates((prev) => ({ ...prev, [taskId]: "loading" }));
    setTimeout(() => {
      setNudgeStates((prev) => ({ ...prev, [taskId]: "done" }));
      showToast(`Requested status update for: "${taskTitle}"`, "info");
      setTimeout(() => {
        setNudgeStates((prev) => ({ ...prev, [taskId]: "idle" }));
      }, 5000);
    }, 1000);
  };

  return (
    <div id="live-portal-view" className="min-h-screen bg-[#FAF9F6] px-4 py-0 flex flex-col justify-between animate-fade-in relative text-brand-text-primary">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm bg-black text-white p-3.5 rounded-lg shadow-xl flex items-center gap-2.5 animate-fade-in">
          <span className="text-[12px] font-mono tracking-wider flex-1">
            {toast.message}
          </span>
        </div>
      )}

      <div className="w-full max-w-[480px] md:max-w-[720px] mx-auto pb-10 px-2 md:px-0 space-y-6">
        
        {/* Sticky Header */}
        <header id="sticky-header" className="sticky top-0 z-50 flex items-center justify-between h-[52px] bg-[#FAF9F6]/90 backdrop-blur-md border-b border-neutral-200/50 px-1">
          <button
            onClick={onBack}
            className="text-brand-text-secondary hover:text-brand-accent transition-colors text-[13px] font-bold flex items-center gap-1 cursor-pointer"
          >
            ← Exit
          </button>

          <div className="flex items-center gap-0.5 font-sans text-[13px] tracking-wider uppercase font-extrabold">
            <span>Event</span>
            <span className="text-brand-accent">OS</span>
          </div>

          <div>
            {event.status === "LIVE" && (
              <span className="inline-flex items-center gap-1 text-brand-green text-[10px] font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
                Live
              </span>
            )}
            {event.status === "UPCOMING" && (
              <span className="inline-flex items-center text-brand-gold text-[10px] font-bold tracking-widest uppercase">
                Upcoming
              </span>
            )}
            {event.status === "COMPLETED" && (
              <span className="inline-flex items-center text-brand-text-muted text-[10px] font-bold tracking-widest uppercase">
                Completed
              </span>
            )}
          </div>
        </header>

        {/* Minimal Underlined Navigation Tabs Bar */}
        <div id="portal-nav-tabs" className="sticky top-[52px] z-40 bg-[#FAF9F6]/90 backdrop-blur-md flex border-b border-neutral-200/40">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-3 text-center font-sans text-[12px] font-bold tracking-wider uppercase transition-all cursor-pointer border-b-2 ${
              activeTab === "overview"
                ? "border-brand-text-primary text-brand-text-primary"
                : "border-transparent text-brand-text-muted hover:text-brand-text-secondary"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`flex-1 py-3 text-center font-sans text-[12px] font-bold tracking-wider uppercase transition-all cursor-pointer border-b-2 ${
              activeTab === "tasks"
                ? "border-brand-text-primary text-brand-text-primary"
                : "border-transparent text-brand-text-muted hover:text-brand-text-secondary"
            }`}
          >
            Tasks ({syncedTasks.length})
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`flex-1 py-3 text-center font-sans text-[12px] font-bold tracking-wider uppercase transition-all cursor-pointer border-b-2 ${
              activeTab === "timeline"
                ? "border-brand-text-primary text-brand-text-primary"
                : "border-transparent text-brand-text-muted hover:text-brand-text-secondary"
            }`}
          >
            Timeline
          </button>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in divide-y divide-neutral-200/40">
            {/* Event Hero Info */}
            <div id="hero-card" className="pt-2 pb-4">
              <span className="font-mono text-[10px] text-brand-text-muted tracking-widest uppercase">
                {event.type}
              </span>
              <h1 className="font-serif text-[26px] italic text-brand-text-primary font-medium mt-1 leading-tight">
                {event.name}
              </h1>
              <div className="mt-3 font-sans text-[13px] text-brand-text-secondary">
                <p className="font-medium">{event.date} · {event.startTime}</p>
                <p className="text-brand-text-muted">{event.venue}</p>
              </div>

              <div className="mt-4 font-sans text-[12px] text-brand-text-muted">
                <span>Coordinated by: {event.coordinator.company} ({event.coordinator.name})</span>
              </div>
            </div>

            {/* Status & Progress Row */}
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <CountdownTimer event={event} />
              <ProgressRing progress={event.progress} updatedJustNow={updatedJustNow} />
            </div>

            {/* Dynamic Dual-Column: Active Tasks & Guest Attendance */}
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {event.status === "LIVE" && (
                <div className="space-y-3">
                  <h3 className="font-sans text-[14px] font-bold text-brand-text-primary">
                    Active setup progress
                  </h3>
                  
                  {event.currentTasks && event.currentTasks.length > 0 ? (
                    <div className="space-y-2.5">
                      {event.currentTasks.slice(0, 2).map((task, i) => (
                        <div 
                          key={i} 
                          className="p-3.5 border border-[#EDE8DF]/60 bg-white/50 rounded-xl"
                        >
                          <div className="font-sans text-[9px] font-bold text-brand-text-muted tracking-widest uppercase">
                            {task.department}
                          </div>
                          <div className="mt-1 font-sans text-[13px] font-bold text-brand-text-primary leading-tight">
                            {task.title}
                          </div>
                          <div className="mt-0.5 font-sans text-[11px] text-brand-text-muted">
                            {task.zone} · {task.progressPct}% done
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3.5 border border-[#EDE8DF]/40 bg-[#2D6A2D]/5 rounded-xl">
                      <p className="font-sans text-[13px] font-bold text-brand-green">
                        ✓ All active setups ready
                      </p>
                    </div>
                  )}
                </div>
              )}

              {event.rsvp && <RSVPSummary rsvp={event.rsvp} />}
            </div>

            {/* Captures / Photos */}
            <div className="pt-4 space-y-3">
              <h3 className="font-sans text-[14px] font-bold text-brand-text-primary">
                Latest captures
              </h3>
              <PhotoGallery photos={event.photos} layout="scroll" />
            </div>
          </div>
        )}

        {/* 2. TASKS TAB */}
        {activeTab === "tasks" && (
          <div className="space-y-5 animate-fade-in">
            {/* Minimal Search and Filter bar */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Search wedding tasks..."
                value={taskSearch}
                onChange={(e) => setTaskSearch(e.target.value)}
                className="w-full bg-transparent border-b border-neutral-200/70 py-2 text-[13px] font-medium text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:border-brand-text-primary transition-all"
              />

              {/* Status pills list */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {(["ALL", "ON_GOING", "COMPLETED", "DELAYED", "BLOCKED"] as const).map((filter) => {
                  const count = filter === "ALL" 
                    ? syncedTasks.length 
                    : syncedTasks.filter(t => t.status === filter).length;
                  
                  let label = filter.replace("_", " ");
                  if (filter === "ALL") label = "All";

                  const isActive = statusFilter === filter;

                  return (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold tracking-wider uppercase shrink-0 transition-all cursor-pointer border ${
                        isActive 
                          ? "bg-brand-text-primary border-brand-text-primary text-white" 
                          : "bg-transparent border-neutral-200/50 text-brand-text-muted hover:text-brand-text-secondary"
                      }`}
                    >
                      {label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* List of Tasks */}
            <div className="space-y-2 border-t border-neutral-200/30 pt-2">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => {
                  const isExpanded = expandedTaskId === task.id;
                  const nudgeState = nudgeStates[task.id] || "idle";

                  let statusLabel = "Pending";
                  let statusColor = "text-brand-text-muted";
                  if (task.status === "COMPLETED") {
                    statusLabel = "Completed";
                    statusColor = "text-brand-green";
                  } else if (task.status === "ON_GOING") {
                    statusLabel = "In Progress";
                    statusColor = "text-brand-accent";
                  } else if (task.status === "DELAYED") {
                    statusLabel = "Delayed";
                    statusColor = "text-brand-gold";
                  } else if (task.status === "BLOCKED") {
                    statusLabel = "Blocked";
                    statusColor = "text-brand-muted-red";
                  }

                  return (
                    <div
                      key={task.id}
                      className="py-3 border-b border-neutral-200/30 transition-all"
                    >
                      <div 
                        className="flex items-start justify-between gap-4 cursor-pointer"
                        onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                      >
                        <div className="space-y-0.5">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-brand-text-muted">
                            {task.department} · {task.zone}
                          </span>
                          <h4 className="font-sans text-[13px] font-bold text-brand-text-primary hover:text-brand-accent transition-colors">
                            {task.title}
                          </h4>
                        </div>

                        <div className="text-right shrink-0">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>
                            {statusLabel}
                          </span>
                          <span className="block font-mono text-[10px] text-brand-text-muted mt-0.5">
                            {task.progressPct}%
                          </span>
                        </div>
                      </div>

                      {/* Expandable Coordination Details */}
                      {isExpanded && (
                        <div className="mt-3 pl-3 border-l border-brand-accent/40 space-y-2.5 animate-fade-in text-[12px]">
                          <div className="grid grid-cols-2 gap-2 text-brand-text-secondary">
                            <div>
                              <span className="text-[10px] text-brand-text-muted block uppercase font-bold">Assigned Vendor</span>
                              <span className="font-bold text-brand-text-primary">{task.assignedTo || "Coordinating Team"}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-brand-text-muted block uppercase font-bold">Updated</span>
                              <span className="font-medium">{task.lastUpdated || "Just now"}</span>
                            </div>
                          </div>

                          {/* Mini progress bar */}
                          <div className="w-full h-1 bg-[#EDE8DF]/30 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-brand-accent rounded-full transition-all duration-300" 
                              style={{ width: `${task.progressPct}%` }}
                            />
                          </div>

                          <div className="flex gap-2">
                            {task.status !== "COMPLETED" && (
                              <button
                                disabled={nudgeState !== "idle"}
                                onClick={() => handleNudge(task.id, task.title)}
                                className="text-brand-accent hover:underline text-[11px] font-bold cursor-pointer"
                              >
                                {nudgeState === "loading" ? "Contacting vendor..." : nudgeState === "done" ? "✓ Notified" : "⚡ Nudge planner for update"}
                              </button>
                            )}
                            <button
                              onClick={() => setExpandedTaskId(null)}
                              className="text-brand-text-muted text-[11px] font-bold"
                            >
                              Dismiss
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-brand-text-muted font-sans text-[12px]">
                  No tasks matching the selected filters.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. TIMELINE TAB */}
        {activeTab === "timeline" && (
          <div className="space-y-4 animate-fade-in">
            <div className="divide-y divide-neutral-200/30">
              {event.milestones.map((milestone, i) => (
                <MilestoneItem 
                  key={i} 
                  milestone={milestone} 
                  isLast={i === event.milestones.length - 1} 
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Ultra-minimal Footer */}
      <footer id="portal-footer" className="text-center py-6 mt-10 border-t border-neutral-200/20">
        <p className="font-sans text-[11px] text-brand-text-muted uppercase tracking-widest font-bold">
          Coordinated by {event.coordinator.company} · EventOS
        </p>
      </footer>
    </div>
  );
}
