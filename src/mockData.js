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
  { rank: 3, name: "Alex Carter", hostel: "Ramanujan Hall (B)", hours: 47.7, avatar: "⚡", isCurrentUser: true }, // Current User
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
    title: "Amazon ₹50 Voucher",
    condition: "Complete daily streak of 8h",
    status: "unlocked",
    scratched: false,
    code: "AMZ-DETOX-50A",
    icon: "🛒",
  },
  {
    id: 102,
    title: "Zomato 20% Off",
    condition: "Complete 5-day streak",
    status: "locked",
    scratched: false,
    code: "ZOMATO-DETOX-20",
    icon: "🍔",
  },
  {
    id: 103,
    title: "Spotify 1 Month Premium",
    condition: "Accumulate 30 hours locked",
    status: "locked",
    scratched: false,
    code: "SPOT-FREE-DETOX",
    icon: "🎵",
  },
  {
    id: 104,
    title: "₹100 BookMyShow Gift Card",
    condition: "Lock phone for 9.5 hours on Saturday",
    status: "unlocked",
    scratched: false,
    code: "BMS-DETOX-WEEKEND",
    icon: "🎬",
  },
  {
    id: 105,
    title: "Starbucks Free Brew",
    condition: "Rank #1 on Hostel Leaderboard",
    status: "locked",
    scratched: false,
    code: "STARBUCKS-CHAMP",
    icon: "☕",
  },
];
