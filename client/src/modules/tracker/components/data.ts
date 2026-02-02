export const groupsList = [
  {
    id: "grp_1",
    name: "Goa Trip",
    membersCount: 5,
    totalSpent: 24500,
    myBalance: 1200,
    lastActivity: "2 days ago",
    createdAt: "2024-12-12",
  },
  {
    id: "grp_2",
    name: "Flat Expenses",
    membersCount: 3,
    totalSpent: 8900,
    myBalance: -450,
    lastActivity: "Yesterday",
    createdAt: "2025-01-02",
  },
  {
    id: "grp_3",
    name: "Office Lunch",
    membersCount: 8,
    totalSpent: 15600,
    myBalance: 0,
    lastActivity: "Today",
    createdAt: "2025-01-10",
  },
];

export const groupDetails = {
  id: "grp_1",
  name: "Goa Trip",
  createdAt: "2026-01-20",
  currency: "INR",
  members: [
    { id: "u1", name: "You" },
    { id: "u2", name: "Rahul" },
    { id: "u3", name: "Anita" },
    { id: "u4", name: "Karthik" },
    { id: "u5", name: "Neha" },
  ],
  summary: {
    totalSpent: 24500,
    youPaid: 8200,
    youOwe: 450,
    youGetBack: 1200,
  },
};

export const expenses = [
  {
    id: "exp_1",
    title: "Hotel Booking",
    amount: 12000,
    paidBy: "Rahul",
    paidById: "u2",
    splitType: "equal",
    participants: ["u1", "u2", "u3", "u4", "u5"],
    date: "2026-01-20",
    createdAt: "2026-01-20T10:30:00",
  },
  {
    id: "exp_2",
    title: "Dinner at Beach",
    amount: 2400,
    paidBy: "You",
    paidById: "u1",
    splitType: "equal",
    participants: ["u1", "u2", "u3", "u4"],
    date: "2026-01-21",
    createdAt: "2026-01-21T21:15:00",
  },
  {
    id: "exp_3",
    title: "Scooter Rental",
    amount: 1800,
    paidBy: "Anita",
    paidById: "u3",
    splitType: "custom",
    participants: ["u1", "u3"],
    date: "2026-01-22",
    createdAt: "2026-01-22T09:00:00",
  },
];

export const balances = [
  {
    fromUser: "You",
    fromUserId: "u1",
    toUser: "Rahul",
    toUserId: "u2",
    amount: 450,
  },
  {
    fromUser: "Anita",
    fromUserId: "u3",
    toUser: "You",
    toUserId: "u1",
    amount: 1200,
  },
];

export const activityLog = [
  {
    id: "act_1",
    message: "You added Hotel Booking",
    timestamp: "2026-01-20T10:30:00",
  },
  {
    id: "act_2",
    message: "Rahul settled ₹1,200",
    timestamp: "2026-01-21T18:00:00",
  },
  {
    id: "act_3",
    message: "Neha joined the group",
    timestamp: "2026-01-22T08:45:00",
  },
];
