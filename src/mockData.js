export const initialDashboardData = {
  todayStreak: 270, // 4 hours 30 mins, in minutes
  dailyGoal: 480,    // 8 hours, in minutes
  totalUnlocks: 2,
  nudgeMessage: "Device Locked // Stay focused on your goals.",
};

export const analyticsStats = {
  longestStreak: "5 Days",
  avgDailyLockTime: "6.2 Hours",
  totalDaysUsed: 28,
};

export const sevenDaysData = [
  { day: "Mon", hours: 5.5, goal: 8 },
  { day: "Tue", hours: 6.8, goal: 8 },
  { day: "Wed", hours: 4.5, goal: 8 },
  { day: "Thu", hours: 7.2, goal: 8 },
  { day: "Fri", hours: 8.0, goal: 8 },
  { day: "Sat", hours: 9.5, goal: 8 },
  { day: "Sun", hours: 6.2, goal: 8 },
];

export const weeklyTrendData = [
  { week: "Week 1", hours: 32.5 },
  { week: "Week 2", hours: 38.0 },
  { week: "Week 3", hours: 44.5 },
  { week: "Week 4", hours: 47.7 },
];

export const leaderboardUsers = [
  { rank: 1, name: "Rohan Gupta", hostel: "Bhabha Hall (A)", hours: 53.5, avatar: "👨‍💻", isCurrentUser: false },
  { rank: 2, name: "Emily Chen", hostel: "Curie Hall (C)", hours: 49.5, avatar: "👩‍🔬", isCurrentUser: false },
  { rank: 3, name: "Student", hostel: "Ramanujan Hall (B)", hours: 47.7, avatar: "⚡", isCurrentUser: true }, // Current User
  { rank: 4, name: "Kabir Sharma", hostel: "Bhabha Hall (A)", hours: 44.0, avatar: "🎮", isCurrentUser: false },
  { rank: 5, name: "Priya Patel", hostel: "Curie Hall (D)", hours: 41.5, avatar: "🌿", isCurrentUser: false },
  { rank: 6, name: "Jessica Taylor", hostel: "Ramanujan Hall (B)", hours: 39.0, avatar: "🎨", isCurrentUser: false },
  { rank: 7, name: "Marcus Vance", hostel: "Curie Hall (C)", hours: 37.5, avatar: "🏀", isCurrentUser: false },
  { rank: 8, name: "Sarah Jenkins", hostel: "Ramanujan Hall (B)", hours: 35.0, avatar: "📚", isCurrentUser: false },
  { rank: 9, name: "David Kim", hostel: "Bhabha Hall (A)", hours: 32.5, avatar: "🎵", isCurrentUser: false },
  { rank: 10, name: "Aisha Khan", hostel: "Curie Hall (D)", hours: 30.0, avatar: "📷", isCurrentUser: false },
];

export const initialSchedules = [
  {
    id: 1,
    title: "Deep Sleep Lock",
    days: [0, 1, 2, 3, 4, 5, 6], // Sun to Sat
    startHour: 22,
    startMinute: 0,
    endHour: 6,
    endMinute: 0,
    color: "teal",
    active: true,
  },
  {
    id: 2,
    title: "Algorithms Lecture",
    days: [1, 3], // Mon, Wed
    startHour: 10,
    startMinute: 0,
    endHour: 11,
    endMinute: 30,
    color: "blue",
    active: true,
  },
  {
    id: 3,
    title: "Organic Chem Lab",
    days: [2], // Tue
    startHour: 14,
    startMinute: 0,
    endHour: 16,
    endMinute: 30,
    color: "purple",
    active: true,
  },
  {
    id: 4,
    title: "Weekly Physics Seminar",
    days: [5], // Fri
    startHour: 9,
    startMinute: 0,
    endHour: 11,
    endMinute: 0,
    color: "teal",
    active: false,
  },
];

export const initialSecurityLogs = [
  {
    id: 1,
    type: "security",
    title: "Tamper Detected",
    message: "⚠️ Tamper Detected: Box forced open at 11:42 PM",
    time: "2 hours ago",
    badge: "Tamper",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
  },
  {
    id: 2,
    type: "security",
    title: "Emergency Button Pressed",
    message: "🚨 Emergency Button Pressed - lock override accessed",
    time: "5 hours ago",
    badge: "Emergency",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
  {
    id: 3,
    type: "security",
    title: "Unauthorized Access",
    message: "📱 Device accessed without lockbox scheduled release approval",
    time: "2 days ago",
    badge: "Security",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
  },
];

export const initialRewards = [
  {
    id: 101,
    title: "Free Coffee - Campus Canteen",
    condition: "Complete daily streak of 8h",
    status: "unlocked",
    scratched: false,
    code: "CANTEEN-BREW-8H",
    icon: "☕",
  },
  {
    id: 102,
    title: "20% Off - Library Cafe",
    condition: "Complete 5-day streak",
    status: "locked",
    scratched: false,
    code: "LIBCONT-DETOX-20",
    icon: "🥪",
  },
  {
    id: 103,
    title: "₹100 Campus Bookstore Voucher",
    condition: "Accumulate 30 hours locked",
    status: "locked",
    scratched: false,
    code: "BOOKSTORE-STUDY-100",
    icon: "📚",
  },
  {
    id: 104,
    title: "Free Lunch - Hostel Mess",
    condition: "Lock phone for 9.5 hours on Saturday",
    status: "unlocked",
    scratched: false,
    code: "MESS-DETOX-SAT",
    icon: "🍛",
  },
  {
    id: 105,
    title: "Free Fruit Shake - Campus Juices",
    condition: "Rank #1 on Hostel Leaderboard",
    status: "locked",
    scratched: false,
    code: "JUICES-BAR-CHAMP",
    icon: "🥤",
  },
];

export const adminClassStats = [
  {
    id: 1,
    name: "CS-301: Algorithms & Data Structures",
    time: "10:00 AM - 11:30 AM",
    enrolled: 45,
    locked: 41,
    unlocks: 2,
    instructor: "Dr. A. Verma",
    status: "ongoing"
  },
  {
    id: 2,
    name: "EE-201: Network Systems & Analysis",
    time: "12:00 PM - 01:30 PM",
    enrolled: 50,
    locked: 38,
    unlocks: 14,
    instructor: "Prof. S. Sen",
    status: "completed"
  },
  {
    id: 3,
    name: "PH-101: Engineering Physics Lab",
    time: "02:00 PM - 04:30 PM",
    enrolled: 30,
    locked: 29,
    unlocks: 1,
    instructor: "Dr. M. Roy",
    status: "completed"
  },
  {
    id: 4,
    name: "ME-102: Workshop & Design Practice",
    time: "04:30 PM - 06:00 PM",
    enrolled: 40,
    locked: 32,
    unlocks: 9,
    instructor: "Prof. K. Das",
    status: "completed"
  }
];

export const adminHallsStats = [
  { hall: "Bhabha Hall (A)", avgLockHours: 7.2, focusedStudents: 68, distractionRate: 12 },
  { hall: "Ramanujan Hall (B)", avgLockHours: 6.8, focusedStudents: 55, distractionRate: 18 },
  { hall: "Curie Hall (C)", avgLockHours: 8.1, focusedStudents: 84, distractionRate: 8 },
  { hall: "Bose Hall (D)", avgLockHours: 5.9, focusedStudents: 42, distractionRate: 24 }
];

export const adminStudentLockStats = [
  { id: 1001, name: "Rohan Gupta", hostel: "Bhabha Hall (A)", lockTimeToday: "7.5 hrs", status: "Locked Now", activeStreak: "5 Days" },
  { id: 1002, name: "Emily Chen", hostel: "Curie Hall (C)", lockTimeToday: "8.2 hrs", status: "Locked Now", activeStreak: "12 Days" },
  { id: 1003, name: "Student", hostel: "Ramanujan Hall (B)", lockTimeToday: "6.8 hrs", status: "Unlocked (Study Period Over)", activeStreak: "3 Days" },
  { id: 1004, name: "Kabir Sharma", hostel: "Bhabha Hall (A)", lockTimeToday: "5.4 hrs", status: "Locked Now", activeStreak: "0 Days" },
  { id: 1005, name: "Priya Patel", hostel: "Curie Hall (D)", lockTimeToday: "8.0 hrs", status: "Locked Now", activeStreak: "7 Days" },
  { id: 1006, name: "Jessica Taylor", hostel: "Ramanujan Hall (B)", lockTimeToday: "4.2 hrs", status: "Unlocked (Distracted)", activeStreak: "2 Days" }
];

export const classStudentDetails = {
  1: [
    { name: "Student", status: "Locked", unlocks: 0 },
    { name: "Rohan Gupta", status: "Locked", unlocks: 0 },
    { name: "Emily Chen", status: "Locked", unlocks: 0 },
    { name: "Jessica Taylor", status: "Unlocked", unlocks: 1 },
    { name: "Kabir Sharma", status: "Unlocked", unlocks: 1 },
    { name: "Priya Patel", status: "Locked", unlocks: 0 }
  ],
  2: [
    { name: "Student", status: "Unlocked", unlocks: 3 },
    { name: "Rohan Gupta", status: "Unlocked", unlocks: 2 },
    { name: "Emily Chen", status: "Locked", unlocks: 0 },
    { name: "Kabir Sharma", status: "Unlocked", unlocks: 4 },
    { name: "Marcus Vance", status: "Unlocked", unlocks: 5 },
    { name: "David Kim", status: "Locked", unlocks: 0 }
  ],
  3: [
    { name: "Student", status: "Locked", unlocks: 0 },
    { name: "Emily Chen", status: "Locked", unlocks: 0 },
    { name: "Priya Patel", status: "Unlocked", unlocks: 1 },
    { name: "Rohan Gupta", status: "Locked", unlocks: 0 },
    { name: "Jessica Taylor", status: "Locked", unlocks: 0 }
  ],
  4: [
    { name: "Student", status: "Unlocked", unlocks: 2 },
    { name: "Kabir Sharma", status: "Unlocked", unlocks: 3 },
    { name: "David Kim", status: "Unlocked", unlocks: 4 },
    { name: "Rohan Gupta", status: "Locked", unlocks: 0 },
    { name: "Priya Patel", status: "Locked", unlocks: 0 }
  ]
};
