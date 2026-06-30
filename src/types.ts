export interface Coordinator {
  company: string;
  name: string;
  mobile: string;
}

export interface ProgressSummary {
  total: number;
  completed: number;
  onTrack: number;
  delayed: number;
  blocked: number;
}

export interface CurrentTask {
  title: string;
  department: string;
  zone: string;
  progressPct: number;
}

export type DepartmentStatus = "ON_TRACK" | "DELAYED" | "BLOCKED";

export interface Department {
  name: string;
  icon: string;
  status: DepartmentStatus;
  done: number;
  total: number;
}

export type MilestoneStatus = "DONE" | "IN_PROGRESS" | "UPCOMING";

export interface Milestone {
  time: string;
  label: string;
  status: MilestoneStatus;
}

export interface RSVP {
  total: number;
  confirmed: number;
  declined: number;
  maybe: number;
  pending: number;
}

export interface PhotoMoment {
  url: string;
  caption: string;
}

export type TaskStatus = "COMPLETED" | "ON_GOING" | "PENDING" | "DELAYED" | "BLOCKED";

export interface Task {
  id: string;
  title: string;
  department: string;
  zone: string;
  status: TaskStatus;
  progressPct: number;
  assignedTo?: string;
  lastUpdated?: string;
}

export interface EventData {
  token: string;
  name: string;
  subEvent: string;
  type: string;
  status: "UPCOMING" | "LIVE" | "COMPLETED";
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  coordinator: Coordinator;
  progress: ProgressSummary;
  currentTasks: CurrentTask[];
  departments: Department[];
  milestones: Milestone[];
  rsvp: RSVP;
  photos: PhotoMoment[];
  tasks: Task[];
}
