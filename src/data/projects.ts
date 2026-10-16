export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: "Distributed Systems" | "AI Systems" | "Web3 & Security" | "Developer Tools";
  year: string;
  featured: boolean;
  tech: string[];
  metrics: { label: string; value: string }[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  architectureDetails?: string;
}

export const projects: ProjectItem[] = [
  {
    id: "veyra-ulpf",
    title: "Veyra - ULPF",
    tagline: "Air-gapped, vendor-agnostic log processing platform with Merkle tree evidence provenance",
    category: "Distributed Systems",
    year: "2026",
    featured: true,
    tech: ["Go", "Python", "Kafka", "ClickHouse", "Docker", "Wazuh", "Ed25519", "Merkle Trees", "OCSF"],
    metrics: [
      { label: "Throughput", value: "300K+ events/s" },
      { label: "Volume Tested", value: "1B+ events" },
      { label: "Microservices", value: "10-service pipeline" },
      { label: "Integrity", value: "Ed25519 Signatures" },
    ],
    highlights: [
      "Engineered an air-gapped, vendor-agnostic log processing platform that ingests heterogeneous Syslog/HTTP telemetry through edge collectors and Kafka, deterministically normalizes events to OCSF while preserving raw evidence and never silently dropping malformed logs.",
      "Designed a 10-service event-driven pipeline spanning ingestion, normalization, routing, archival, lineage indexing, integrity verification, and SIEM delivery, using Kafka for decoupled processing and ClickHouse for high-volume lineage/evidence queries.",
      "Built a tamper-evident evidence layer using hash-chained sealed segments, Merkle trees, and Ed25519 signatures, enabling byte-level traceability and verification of log integrity across forensic workflows.",
      "Benchmarked 1B+ events at 300K+ events/sec on a local workstation, with automated load testing, smoke checks, integration checkpoints, and hardware-aware deployment profiles for reproducible performance evaluation.",
    ],
    architectureDetails: "Decoupled Kafka ingestion buffer -> OCSF Normalization Workers -> Tamper-evident Merkle segment sealer -> ClickHouse columnar store for petabyte-scale lineage queries.",
    githubUrl: "https://github.com/arnavmahajan630",
  },
  {
    id: "re-learn",
    title: "Re:Learn",
    tagline: "Multimodal adaptive learning backend diagnosing programming misconceptions via knowledge graphs",
    category: "AI Systems",
    year: "2026",
    featured: true,
    tech: ["Python", "LightGBM", "Bayesian Inference", "Knowledge Graph", "FastAPI"],
    metrics: [
      { label: "Engine", value: "Bayesian Knowledge Graph" },
      { label: "Model", value: "LightGBM + Telemetry" },
      { label: "Feedback", value: "Real-time Diagnostics" },
    ],
    highlights: [
      "Engineered a multimodal learning backend that analyzes learner code and test responses to diagnose underlying programming misconceptions, combining model inference, rule-based analysis, and learner telemetry into targeted remediation workflows.",
      "Built a knowledge-graph-driven learner state system that tracks competency, misconceptions, and remediation progress, enabling adaptive reassessment and personalized learning paths across interactive coding missions.",
    ],
    architectureDetails: "Telemetry Ingestion -> AST & Error Pattern Parser -> LightGBM Classification -> Bayesian Knowledge Graph State Updater -> Dynamic Remediation Engine.",
    githubUrl: "https://github.com/arnavmahajan630",
  },
  {
    id: "certiproof",
    title: "CertiProof (v1 & v2)",
    tagline: "Zero-knowledge verifiable AI exam evaluation & cryptographic certificate anchoring",
    category: "Web3 & Security",
    year: "2026",
    featured: true,
    tech: ["Python", "JavaScript", "Zero-Knowledge Proofs", "Cryptographic Hashing", "Smart Contracts"],
    metrics: [
      { label: "Security", value: "Zero-Knowledge Verifiable" },
      { label: "Provenance", value: "Tamper-Evident" },
      { label: "Verification", value: "Instant On-Chain / Offline" },
    ],
    highlights: [
      "Proves that a certified model produced an exact score for a specific student answer and grading rubric without disclosing proprietary model weights or private rubrics.",
      "Engineered tamper-proof digital certificate issuance and instant verification engine backed by cryptographic hashing and immutable proof anchoring.",
    ],
    githubUrl: "https://github.com/arnavmahajan630/certiproof",
  },
  {
    id: "auctra",
    title: "Auctra",
    tagline: "Decentralized hybrid auction platform with zero-gas bidding and soulbound NFT badges",
    category: "Web3 & Security",
    year: "2026",
    featured: false,
    tech: ["TypeScript", "Solidity", "Ethers.js", "Meta-Transactions", "Next.js"],
    metrics: [
      { label: "Bidding Gas", value: "0 Gas (Off-chain Signatures)" },
      { label: "Settlement", value: "Trustless On-chain" },
      { label: "Proof-of-Win", value: "Soulbound NFTs" },
    ],
    highlights: [
      "Engineered a decentralized hybrid auction platform allowing zero-gas off-chain bidding via cryptographic signatures and trustless smart contract settlements.",
      "Integrated gasless claims and automated minting of soulbound NFT proof-of-win badges for verified winning bidders.",
    ],
    githubUrl: "https://github.com/arnavmahajan630/auctra",
  },
  {
    id: "shade",
    title: "Shade",
    tagline: "Private settlement rail for autonomous agent commerce with ERC-5564 stealth addresses on Monad",
    category: "Web3 & Security",
    year: "2026",
    featured: true,
    tech: ["Solidity", "Foundry", "TypeScript", "Monad Testnet", "ERC-5564", "EIP-712", "Vercel AI SDK"],
    metrics: [
      { label: "Settlement Latency", value: "364–873ms" },
      { label: "Decoy Bursts", value: "53/53 in 4-7s" },
      { label: "Privacy Protocol", value: "ERC-5564 + EIP-712" },
      { label: "Injection Defense", value: "0 Secret Leaks" },
    ],
    highlights: [
      "Engineered an autonomous agent-to-agent confidential settlement protocol on Monad testnet featuring ERC-5564 stealth addresses and gasless EIP-712 intent execution.",
      "Architected strict isolation between LLM agents (negotiating with curve-enforced bounds) and plain wallet cryptographic key managers, completely preventing prompt injection exfiltration.",
      "Implemented concurrent decoy burst generation to camouflage payment graphs, achieving sub-second single payment finality (median 873ms) and 53-tx burst confirmations across ~10 Monad blocks.",
    ],
    architectureDetails: "LLM Agent Negotiation -> Rule-bounded Tool Call -> Plain Wallet Stealth Derivation -> EIP-712 Intent -> Monad Relayer (single tx.from) -> Settlement Vault -> StealthAnnouncer (ERC-5564 event).",
    githubUrl: "https://github.com/kronzter/ah-monad",
    liveUrl: "https://mon.lightberryapi.com/",
  },
];
