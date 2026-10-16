/**
 * ACHIEVEMENTS DATA CONFIGURATION
 * 
 * To add new achievements, simply duplicate one of the objects below and add it to the `achievements` array.
 * Categories available: 'all' | 'cp' (Competitive Programming) | 'hackathon' | 'systems' | 'academic'
 */

export interface AchievementItem {
  id: string;
  title: string;
  category: "cp" | "hackathon" | "systems" | "academic";
  categoryLabel: string;
  highlightMetric?: string;
  organization?: string;
  date: string;
  description: string;
  badge: string;
  verifiedLink?: string;
  featured?: boolean;
}

export const achievements: AchievementItem[] = [
  {
    id: "dsa-1600",
    title: "1,600+ Algorithmic Problems Solved",
    category: "cp",
    categoryLabel: "Competitive Programming",
    highlightMetric: "1,600+ Solved",
    organization: "LeetCode & CodeChef",
    date: "2024 – Present",
    badge: "Problem Solver",
    description: "Consistent problem solver across LeetCode, CodeChef, and Codeforces, mastering advanced data structures, dynamic programming, graph algorithms, and system-level time/space optimizations.",
    verifiedLink: "https://github.com/arnavmahajan630",
    featured: true,
  },
  {
    id: "cf-pupil",
    title: "Codeforces Pupil",
    category: "cp",
    categoryLabel: "Competitive Programming",
    highlightMetric: "Active Ranked",
    organization: "Codeforces",
    date: "2025 – 2026",
    badge: "Codeforces",
    description: "Actively competes in Division 2 & Division 3 global rated rounds, demonstrating speed, mathematical reasoning, and high-accuracy algorithmic implementation under strict time pressure.",
    verifiedLink: "https://codeforces.com",
    featured: true,
  },
  {
    id: "cp-contest-winner",
    title: "Multiple Competitive Programming Winner",
    category: "cp",
    categoryLabel: "Competitive Programming",
    highlightMetric: "Multiple Wins",
    organization: "Inter-Collegiate & Platform Contests",
    date: "2024 – 2026",
    badge: "Champion",
    description: "Winner and top podium finisher at multiple university-wide and inter-collegiate competitive programming contests and coding showdowns.",
    featured: true,
  },
  {
    id: "hackathon-2x",
    title: "2x Hackathon Winner",
    category: "hackathon",
    categoryLabel: "Hackathons",
    highlightMetric: "2x 1st Place",
    organization: "Collegiate & Tech Hackathons",
    date: "2024 – 2026",
    badge: "Hackathon Winner",
    description: "Won 1st prize at two major tech hackathons by conceptualizing, prototyping, and shipping end-to-end backend architectures and systems solutions within 24-48 hour sprints.",
    featured: true,
  },
  {
    id: "cncf-meshery",
    title: "CNCF Meshery Contributor",
    category: "systems",
    categoryLabel: "Systems & Open Source",
    highlightMetric: "CNCF Recognition",
    organization: "Cloud Native Computing Foundation",
    date: "2026",
    badge: "Open Source",
    description: "Contributed fixes and CLI validation improvements to Meshery, the CNCF cloud-native management platform, collaborating with global maintainers.",
    verifiedLink: "https://github.com/arnavmahajan630/meshery",
    featured: true,
  },
  {
    id: "academic-merit",
    title: "8.68 CGPA in Computer Engineering",
    category: "academic",
    categoryLabel: "Academic & Research",
    highlightMetric: "8.68 CGPA",
    organization: "KJ Somaiya College of Engineering",
    date: "Expected 2028",
    badge: "Distinction",
    description: "Maintaining top academic ranking with rigorous coursework in Concurrency, Operating Systems, Distributed Systems, Computer Networks, and Database Management Systems.",
    featured: false,
  },
];
