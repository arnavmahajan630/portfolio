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
      { name: "C / C++", level: "Advanced", highlight: true, description: "Memory layout, systems programming, algorithmic rigor" },
      { name: "Solidity", level: "Production", highlight: true, description: "Smart contracts, EVM internals, ERC standards, gas optimization" },
      { name: "TypeScript", level: "Production", highlight: true, description: "NestJS, type-safe APIs, modern fullstack tooling" },
      { name: "JavaScript", level: "Proficient", highlight: true, description: "Event loop, asynchronous I/O, modern ES6+, Node.js" },
      { name: "SQL", level: "Production", highlight: true, description: "Complex joins, indexing, table partitioning, query tuning" },
      { name: "Bash / Shell", level: "Proficient", highlight: true, description: "Automation scripts, Linux CLI pipelines, CI/CD orchestration" },
    ],
  },
  {
    title: "Systems & Distributed Architecture",
    subtitle: "Designing resilient, scalable, concurrent backends and data pipelines",
    iconName: "Cpu",
    skills: [
      { name: "Concurrency & Multithreading", level: "Advanced", highlight: true, description: "Thread pools, atomic ops, channel synchronization" },
      { name: "Distributed Systems", level: "Advanced", highlight: true, description: "Consensus, replication, fault-tolerant topologies" },
      { name: "Operating Systems Internals", level: "Proficient", highlight: true, description: "Process scheduling, memory paging, I/O multiplexing" },
      { name: "Computer Networking & Protocols", level: "Proficient", highlight: false, description: "TCP/IP, HTTP/2, gRPC, WebSocket architecture" },
      { name: "Apache Kafka", level: "Production", highlight: true, description: "Event streaming & decoupled message queues" },
      { name: "ClickHouse", level: "Production", highlight: true, description: "High-volume columnar OLAP telemetry queries" },
      { name: "PostgreSQL & Table Partitioning", level: "Production", highlight: true, description: "Range sharding, index tuning, ACID guarantees" },
      { name: "NATS Messaging", level: "Proficient", highlight: false, description: "Lightweight pub/sub & subject-based routing" },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    subtitle: "Container orchestration, automated CI/CD, and production AWS",
    iconName: "Cloud",
    skills: [
      { name: "AWS (EC2, RDS, S3, ECR)", level: "Production", highlight: true, description: "Production compute, managed databases, asset storage" },
      { name: "Docker & Containerization", level: "Production", highlight: true, description: "Multi-stage builds, slim images, container isolation" },
      { name: "Kubernetes & CNCF Tools", level: "Proficient", highlight: true, description: "Pods, services, manifests, cloud-native ecosystem" },
      { name: "ClickHouse Deployment", level: "Production", highlight: true, description: "OLAP" },
      { name: "GitHub Actions & CI/CD", level: "Production", highlight: true, description: "Automated testing, container builds, zero-downtime deploys" },
      { name: "Linux Server Administration", level: "Advanced", highlight: true, description: "Systemd, kernel tuning, networking, process monitoring" },
      { name: "Prometheus & Observability", level: "Proficient", highlight: false, description: "System metrics, alert pipelines, performance monitoring" },
    ],
  },
  {
    title: "Cryptography & Security Architecture",
    subtitle: "Integrity verification, zero-knowledge concepts, and RBAC",
    iconName: "ShieldCheck",
    skills: [
      { name: "Ed25519 Signatures & Hashing", level: "Proficient", highlight: true, description: "Public-key cryptography & deterministic signatures" },
      { name: "SHA-256 Hash Chains & Sealed Segments", level: "Production", highlight: true, description: "Immutable forensic log structures & segment sealing" },
      { name: "Merkle Trees & Evidence Chains", level: "Proficient", highlight: true, description: "Tamper-evident log verification & audit proofs" },
      { name: "Zero-Knowledge Proofs (ZKP)", level: "Proficient", highlight: true, description: "Privacy-preserving verification & verifiable compute" },
      { name: "ERC-5564 & Stealth Protocols", level: "Proficient", highlight: false, description: "Private settlement rails & ephemeral key derivation" },
      { name: "OCSF Schema Normalization", level: "Proficient", highlight: true, description: "Open Cybersecurity Schema Framework standards" },
      { name: "JWT / OAuth & RBAC Policies", level: "Production", highlight: false, description: "Fine-grained role access control & token lifecycle" },
    ],
  },
];
