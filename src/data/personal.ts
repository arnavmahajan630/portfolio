export interface PersonalInfo {
  name: string;
  pronouns?: string;
  tagline: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  education: {
    institution: string;
    degree: string;
    expectedGraduation: string;
    cgpa: string;
    location: string;
  };
  socials: {
    github: string;
    linkedin: string;
    email: string;
    blog: string;
  };
  status: {
    available: boolean;
    text: string;
  };
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
}

export const personalData: PersonalInfo = {
  name: "Arnav Mahajan",
  role: "Backend & Distributed Systems Engineer",
  tagline: "Architecting high-throughput distributed systems, concurrent backends, and cloud infrastructure.",
  location: "Mumbai, India",
  email: "arnavmahajan630@gmail.com",
  phone: "+91 98925 32216",
  education: {
    institution: "KJ Somaiya College of Engineering",
    degree: "B.Tech in Computer Engineering",
    expectedGraduation: "2028 Expected",
    cgpa: "8.68 CGPA",
    location: "Vidyavihar, Mumbai",
  },
  socials: {
    github: "https://github.com/arnavmahajan630",
    linkedin: "https://www.linkedin.com/in/arnavmahajan630/",
    email: "mailto:arnavmahajan630@gmail.com",
    blog: "https://arnavlogs.hashnode.dev/",
  },
  status: {
    available: true,
    text: "Open for Systems & Backend Opportunities",
  },
  metrics: [
    {
      label: "Algorithmic Problems",
      value: "1,600+",
      description: "Solved on LeetCode & CodeChef",
    },
    {
      label: "Log Ingestion Benchmark",
      value: "300K/s",
      description: "1B+ events processed with Kafka & ClickHouse",
    },
    {
      label: "Production Throughput",
      value: "2,000+ QPS",
      description: "Sustained with partitioned PostgreSQL & Go",
    },
    {
      label: "Academic Excellence",
      value: "8.68",
      description: "B.Tech CGPA at KJ Somaiya",
    },
  ],
};
