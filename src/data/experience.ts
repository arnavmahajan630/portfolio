export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  badge?: string;
  location: string;
  period: string;
  current?: boolean;
  tech: string[];
  description: string[];
  metrics?: { label: string; value: string }[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "meshery",
    role: "Open Source Contributor",
    company: "Meshery (Cloud Native Computing Foundation - CNCF)",
    badge: "CNCF Project",
    location: "Remote, Flexible",
    period: "October 2026 – Present",
    current: true,
    tech: ["Go", "Kubernetes", "GraphQL", "PostgreSQL", "NATS"],
    description: [
      "Resolved a critical 'mesheryctl' context-creation issue involving missing component-reference validation, enhancing CLI correctness and robustness for cloud-native operators.",
      "Actively contributing to its Go/Kubernetes cloud-native codebase through systematic issue investigation, cloud-native debugging, and ecosystem tooling enhancements.",
    ],
    metrics: [
      { label: "Ecosystem", value: "CNCF" },
      { label: "Core Lang", value: "Go / K8s" },
    ],
  },
  {
    id: "queuefree",
    role: "Backend Engineering Intern",
    company: "QueueFree",
    badge: "Scale & Concurrency",
    location: "Remote, Flexible",
    period: "February 2026 – July 2026",
    tech: ["Golang", "PostgreSQL", "AWS EC2/RDS/S3/ECR", "Docker", "CI/CD"],
    description: [
      "Architected and scaled a multi-tenant, real-time queue management platform in Go, coordinating order and operational workflows for 10,000+ active users.",
      "Engineered concurrent, event-driven backend services for queue scheduling, order lifecycle management, and real-time state propagation under high concurrent workloads.",
      "Designed and deployed production AWS infrastructure across EC2, RDS, S3, and ECR, building CI/CD pipelines and operational observability workflows for reliable zero-downtime deployments.",
      "Migrated PostgreSQL workloads to AWS RDS and introduced table partitioning, reducing query latency by 35% and sustaining 2,000+ queries/sec under benchmark workloads.",
    ],
    metrics: [
      { label: "Active Users", value: "10,000+" },
      { label: "Benchmark Throughput", value: "2,000+ QPS" },
      { label: "Query Latency Reduction", value: "-35%" },
    ],
  },
  {
    id: "pearlthoughts",
    role: "Backend Developer Intern",
    company: "PearlThoughts",
    badge: "Modular APIs",
    location: "Remote, Fulltime",
    period: "July 2025 – August 2025",
    tech: ["NestJS", "TypeScript", "TypeORM", "PostgreSQL", "JWT/OAuth", "RBAC"],
    description: [
      "Engineered a modular NestJS medical scheduling backend with JWT/OAuth authentication and granular Role-Based Access Control (RBAC).",
      "Built timezone-safe appointment and doctor availability services with concurrent booking conflict validation, time-slot constraint checking, and soft-delete workflows to ensure transactional consistency.",
    ],
    metrics: [
      { label: "Architecture", value: "Modular NestJS" },
      { label: "Security", value: "JWT + RBAC" },
    ],
  },
];
