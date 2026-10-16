export interface SkillCategory {
  title: string;
  subtitle: string;
  iconName: string;
  skills: {
    name: string;
    level: string; // e.g. "Advanced", "Proficient", "Production"
    highlight?: boolean;
    description?: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    subtitle: "Core languages for high-performance backends and low-latency systems",
    iconName: "Code2",
    skills: [
      { name: "Golang", level: "Production", highlight: true, description: "Goroutines, channels, microservices, CLI tools" },
      { name: "Python", level: "Production", highlight: true, description: "FastAPI, ML pipelines, log parsing, data processing" },
      { name: "C / C++", level: "Proficient", highlight: true, description: "Memory layout, systems programming, algorithmic rigor" },
      { name: "TypeScript", level: "Proficient", highlight: false, description: "NestJS, type-safe APIs, modern fullstack tooling" },
      { name: "SQL", level: "Production", highlight: true, description: "Complex joins, indexing, table partitioning, query tuning" },
    ],
  },
  {
    title: "Systems & Distributed Architecture",
    subtitle: "Designing resilient, scalable, concurrent backends and data pipelines",
    iconName: "Cpu",
    skills: [
      { name: "Concurrency & Multithreading", level: "Advanced", highlight: true },
      { name: "Distributed Systems", level: "Advanced", highlight: true },
      { name: "Operating Systems Internals", level: "Proficient", highlight: true },
      { name: "Computer Networking & Protocols", level: "Proficient", highlight: false },
      { name: "Apache Kafka", level: "Production", highlight: true, description: "Event streaming & decoupled message queues" },
      { name: "ClickHouse", level: "Production", highlight: true, description: "High-volume columnar OLAP telemetry queries" },
      { name: "PostgreSQL & Table Partitioning", level: "Production", highlight: true },
      { name: "NATS Messaging", level: "Proficient", highlight: false },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    subtitle: "Container orchestration, automated CI/CD, and production AWS",
    iconName: "Cloud",
    skills: [
      { name: "AWS (EC2, RDS, S3, ECR)", level: "Production", highlight: true },
      { name: "Docker & Containerization", level: "Production", highlight: true },
      { name: "Kubernetes & CNCF Tools", level: "Proficient", highlight: true },
      { name: "GitHub Actions & CI/CD", level: "Production", highlight: true },
      { name: "Linux Server Administration", level: "Advanced", highlight: true },
    ],
  },
  {
    title: "Cryptography & Security Architecture",
    subtitle: "Integrity verification, zero-knowledge concepts, and RBAC",
    iconName: "ShieldCheck",
    skills: [
      { name: "Ed25519 Signatures & Hashing", level: "Proficient", highlight: true },
      { name: "Merkle Trees & Evidence Chains", level: "Proficient", highlight: true },
      { name: "OCSF Schema Normalization", level: "Proficient", highlight: true },
      { name: "JWT / OAuth & RBAC Policies", level: "Production", highlight: false },
    ],
  },
];
