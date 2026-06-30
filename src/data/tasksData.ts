import { Task } from "../types";

export const liveTasks: Task[] = [
  // 14 Completed Tasks
  {
    id: "task-01",
    title: "Guest invitation cards dispatch & digital RSVP links",
    department: "Guest Management",
    zone: "HQ Office",
    status: "COMPLETED",
    progressPct: 100,
    assignedTo: "Pooja Mehta (RSVP Desk)",
    lastUpdated: "Yesterday"
  },
  {
    id: "task-02",
    title: "Sangeet catering menu selection & food tasting",
    department: "Catering",
    zone: "Main Kitchen",
    status: "COMPLETED",
    progressPct: 100,
    assignedTo: "Chef Sanjay & team",
    lastUpdated: "2 days ago"
  },
  {
    id: "task-03",
    title: "Sound console & central lighting truss rigging",
    department: "Sound & Lighting",
    zone: "Zone B — Main Stage",
    status: "COMPLETED",
    progressPct: 100,
    assignedTo: "Rajeev (A/V Lead)",
    lastUpdated: "3 hours ago"
  },
  {
    id: "task-04",
    title: "Main entrance floral archway setup",
    department: "Decoration",
    zone: "Zone A — Entrance Hall",
    status: "COMPLETED",
    progressPct: 100,
    assignedTo: "Kamlesh Florists",
    lastUpdated: "2 hours ago"
  },
  {
    id: "task-05",
    title: "Photobooth setup with custom neon signs",
    department: "Decoration",
    zone: "Zone E — Foyer",
    status: "COMPLETED",
    progressPct: 100,
    assignedTo: "Kamlesh Florists",
    lastUpdated: "1 hour ago"
  },
  {
    id: "task-06",
    title: "Valet parking zone setup & signage",
    department: "Logistics",
    zone: "Zone F — Outer Gates",
    status: "COMPLETED",
    progressPct: 100,
    assignedTo: "SecureValet Team",
    lastUpdated: "4 hours ago"
  },
  {
    id: "task-07",
    title: "Primary power generator load test",
    department: "Logistics",
    zone: "Zone H — Utility Area",
    status: "COMPLETED",
    progressPct: 100,
    assignedTo: "PowerMech Engineers",
    lastUpdated: "5 hours ago"
  },
  {
    id: "task-08",
    title: "Bridal suite welcome snacks & fresh towels",
    department: "Guest Management",
    zone: "Room 102 — Bridal Suite",
    status: "COMPLETED",
    progressPct: 100,
    assignedTo: "Sonia Patel",
    lastUpdated: "3 hours ago"
  },
  {
    id: "task-09",
    title: "Digital seating chart displays at foyer",
    department: "Guest Management",
    zone: "Zone E — Foyer",
    status: "COMPLETED",
    progressPct: 100,
    assignedTo: "Raj Mehta (Coordinator)",
    lastUpdated: "1 hour ago"
  },
  {
    id: "task-10",
    title: "Family traditional entry props & umbrellas delivery",
    department: "Logistics",
    zone: "Zone A — Entrance Hall",
    status: "COMPLETED",
    progressPct: 100,
    assignedTo: "Sharma Family Rep",
    lastUpdated: "2 hours ago"
  },
  {
    id: "task-11",
    title: "Wireless hand-mic frequency testing for anchors",
    department: "Sound & Lighting",
    zone: "Zone B — Main Stage",
    status: "COMPLETED",
    progressPct: 100,
    assignedTo: "Rajeev (A/V Lead)",
    lastUpdated: "30 mins ago"
  },
  {
    id: "task-12",
    title: "VIP roundtables seating arrangement & menu cards",
    department: "Decoration",
    zone: "Zone C — Banquet Hall",
    status: "COMPLETED",
    progressPct: 100,
    assignedTo: "Kamlesh Florists",
    lastUpdated: "1 hour ago"
  },
  {
    id: "task-13",
    title: "Host family welcome flower garlands (Mala) delivery",
    department: "Guest Management",
    zone: "Zone A — Entrance Hall",
    status: "COMPLETED",
    progressPct: 100,
    assignedTo: "Raj Mehta (Coordinator)",
    lastUpdated: "45 mins ago"
  },
  {
    id: "task-14",
    title: "Pre-wedding candid photo shoot setup in gardens",
    department: "Photography",
    zone: "Zone G — Garden Lawn",
    status: "COMPLETED",
    progressPct: 100,
    assignedTo: "Studio 9 Crew",
    lastUpdated: "15 mins ago"
  },

  // 5 On Going (Active & On-track)
  {
    id: "task-15",
    title: "Stage backdrop floral & LED screen integration",
    department: "Decoration",
    zone: "Zone B — Main Stage",
    status: "ON_GOING",
    progressPct: 75,
    assignedTo: "Kamlesh Florists & A/V Team",
    lastUpdated: "5 mins ago"
  },
  {
    id: "task-16",
    title: "Live performance audio-mixing level testing",
    department: "Sound & Lighting",
    zone: "Zone B — Main Stage",
    status: "ON_GOING",
    progressPct: 60,
    assignedTo: "Rajeev (A/V Lead)",
    lastUpdated: "10 mins ago"
  },
  {
    id: "task-17",
    title: "Groom entry music & family dance playlist walkthrough",
    department: "Sound & Lighting",
    zone: "Zone B — Main Stage",
    status: "ON_GOING",
    progressPct: 50,
    assignedTo: "DJ Amit",
    lastUpdated: "15 mins ago"
  },
  {
    id: "task-18",
    title: "Family candid photography on arrival",
    department: "Photography",
    zone: "Zone A — Entrance Hall",
    status: "ON_GOING",
    progressPct: 20,
    assignedTo: "Studio 9 Crew",
    lastUpdated: "Just now"
  },
  {
    id: "task-19",
    title: "Welcome drinks distribution & tray refills",
    department: "Catering",
    zone: "Zone E — Foyer",
    status: "ON_GOING",
    progressPct: 35,
    assignedTo: "Chef Sanjay & Waiters",
    lastUpdated: "Just now"
  },

  // 2 Delayed Tasks
  {
    id: "task-20",
    title: "Main buffet line chafing dish setup & pre-heating",
    department: "Catering",
    zone: "Zone C — Banquet Hall",
    status: "DELAYED",
    progressPct: 20,
    assignedTo: "Chef Sanjay & Catering Team",
    lastUpdated: "15 mins ago"
  },
  {
    id: "task-21",
    title: "Live counters ingredients arrangement & burner firing",
    department: "Catering",
    zone: "Zone D — Live Counter Patio",
    status: "DELAYED",
    progressPct: 40,
    assignedTo: "Chef Sanjay & Catering Team",
    lastUpdated: "10 mins ago"
  },

  // 1 Blocked Task
  {
    id: "task-22",
    title: "Gift & cash counter lockable drawer installation",
    department: "Logistics",
    zone: "Zone E — Foyer",
    status: "BLOCKED",
    progressPct: 10,
    assignedTo: "SecureValet Team",
    lastUpdated: "30 mins ago"
  }
];

export const upcomingTasks: Task[] = liveTasks.map((t, index) => {
  // Let's make an upcoming variation
  if (index < 4) {
    return { ...t, status: "COMPLETED", progressPct: 100 };
  } else if (index < 6) {
    return { ...t, status: "ON_GOING", progressPct: 40 };
  } else if (index < 8) {
    return { ...t, status: "DELAYED", progressPct: 15 };
  } else {
    return { ...t, status: "PENDING", progressPct: 0 };
  }
});

export const completedTasks: Task[] = liveTasks.map(t => ({
  ...t,
  status: "COMPLETED",
  progressPct: 100,
  lastUpdated: "Completed"
}));
