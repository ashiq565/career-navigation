import type { CareerPathType, AssessmentQuestion, RoadmapStep } from "../types";

export const CAREER_PATHS: Record<CareerPathType, { label: string, description: string }> = {
    'software-dev': {
        label: 'Software Development',
        description: 'Build robust applications and systems using modern frameworks.'
    },
    'data-science': {
        label: 'Data Science',
        description: 'Extract insights from data using statistical and analytical tools.'
    },
    'cybersecurity': {
        label: 'Cybersecurity',
        description: 'Protect systems and networks from digital attacks.'
    },
    'ai-ml': {
        label: 'Artificial Intelligence',
        description: 'Create intelligent systems that learn and adapt.'
    },
    'cloud-computing': {
        label: 'Cloud Computing',
        description: 'Manage and scale infrastructure in the cloud.'
    },
    'product-manager': {
        label: 'Product Manager',
        description: 'Bridges the gap between technical, business, and user needs.'
    }
};

export const QUESTIONS_BY_PATH: Record<CareerPathType, AssessmentQuestion[]> = {
    'software-dev': [
        { id: 1, question: "What is the purpose of 'git merge'?", options: ["Create a new branch", "Combine changes from different branches", "Delete a branch", "Undo recent commits"], correctAnswer: 1, skillMapped: "Git/Tools" },
        { id: 2, question: "Which data structure uses LIFO (Last-In-First-Out)?", options: ["Queue", "Linked List", "Stack", "Tree"], correctAnswer: 2, skillMapped: "Data Structures" },
        { id: 3, question: "What does REST stand for in web services?", options: ["Representational State Transfer", "Relational System Transit", "Responsive State Timing", "Regular State Tracking"], correctAnswer: 0, skillMapped: "Backend API" }
    ],
    'data-science': [
        { id: 1, question: "Which library is most common for data manipulation in Python?", options: ["Flask", "Pandas", "PyQt", "Selenium"], correctAnswer: 1, skillMapped: "Python/Libraries" },
        { id: 2, question: "What is a 'p-value' in statistics?", options: ["Probability of error", "Parameter value", "Percentage of data", "Polynomial value"], correctAnswer: 0, skillMapped: "Statistics" },
        { id: 3, question: "What is supervised learning used for?", options: ["Clustering", "Classification and Regression", "Association rules", "Data cleaning"], correctAnswer: 1, skillMapped: "Machine Learning" }
    ],
    'cybersecurity': [
        { id: 1, question: "What does 'SQL Injection' target?", options: ["User passwords", "Database layer", "Browser cache", "Operating system"], correctAnswer: 1, skillMapped: "Web Security" },
        { id: 2, question: "What is the role of a Firewall?", options: ["Storage", "Processing", "Filtering network traffic", "Encrypting files"], correctAnswer: 2, skillMapped: "Network Security" },
        { id: 3, question: "What is 'Phishing'?", options: ["Data backup", "Social engineering attack", "Hardware failure", "Network expansion"], correctAnswer: 1, skillMapped: "Human Risk" }
    ],
    'ai-ml': [
        { id: 1, question: "What is Backpropagation?", options: ["Data loading", "Optimizing neural network weights", "System backup", "Feature engineering"], correctAnswer: 1, skillMapped: "Neural Networks" },
        { id: 2, question: "What is Overfitting?", options: ["Model matches training data too closely", "Model is too simple", "Dataset is too small", "Training is too fast"], correctAnswer: 0, skillMapped: "Model Performance" },
        { id: 3, question: "What is a 'Tensor'?", options: ["Multi-dimensional array", "Encryption key", "Hardware component", "Code editor"], correctAnswer: 0, skillMapped: "Deep Learning" }
    ],
    'cloud-computing': [
        { id: 1, question: "What is 'SaaS'?", options: ["Software as a Service", "Servers as a Service", "System as a Service", "Security as a Service"], correctAnswer: 0, skillMapped: "Cloud Models" },
        { id: 2, question: "Which service is used for auto-scaling on AWS?", options: ["S3", "EC2 Auto Scaling", "Lambda", "IAM"], correctAnswer: 1, skillMapped: "Infrastructure" },
        { id: 3, question: "What is the primary benefit of Serverless computing?", options: ["Fixed costs", "No hardware management", "Slower performance", "Manual scaling"], correctAnswer: 1, skillMapped: "Modern Architectures" }
    ],
    'product-manager': [
        { id: 1, question: "What defines a 'Minimum Viable Product' (MVP)?", options: ["The final version of a product", "Smallest version with enough features to satisfy customers", "A prototype for testing", "A product with no features"], correctAnswer: 1, skillMapped: "Product Strategy" },
        { id: 2, question: "What is the purpose of a Product Roadmap?", options: ["To track bug reports", "To show the visual design", "To communicate the strategic direction", "To manage daily tasks"], correctAnswer: 2, skillMapped: "Planning" },
        { id: 3, question: "What does KPI stand for?", options: ["Keep People Interested", "Key Performance Indicator", "Key Product Insight", "Knowledge Performance Index"], correctAnswer: 1, skillMapped: "Analytics" }
    ]
};

export const ROADMAPS: Record<CareerPathType, RoadmapStep[]> = {
    'software-dev': [
        { title: "Fundamentals", description: "Algorithm basics and HTML/CSS/JS", status: "completed", technologies: ["Logic", "Basic Frontend"], projects: ["Personal Portfolio", "To-Do App"] },
        { title: "Adv. Programming", description: "Mastering React and Data Structures", status: "current", technologies: ["React", "TypeScript", "DS&A"], projects: ["E-commerce App", "Social Media Clone"] },
        { title: "System Design", description: "Scalability and Architecture", status: "locked", technologies: ["Distributed Systems", "Scaling"], projects: ["Real-time Chatting App", "Video Streaming Platform"] }
    ],
    'data-science': [
        { title: "Math & Stats", description: "Probability and Linear Algebra", status: "completed", technologies: ["Calculus", "Probability"], projects: ["Statistical Data Analysis"] },
        { title: "Analysis Tools", description: "Python for Data Analysis", status: "current", technologies: ["Pandas", "Matplotlib", "SQL"], projects: ["Stock Market Analysis", "Credit Card Fraud Detection"] },
        { title: "Predictive Models", description: "Applied Machine Learning", status: "locked", technologies: ["Scikit-Learn", "Deep Learning"], projects: ["House Price Prediction", "Sentiment Analysis Model"] }
    ],
    'cybersecurity': [
        { title: "Networking", description: "TCP/IP and OS fundamentals", status: "completed", technologies: ["Linux", "Protocols"], projects: ["Network Scanning Project"] },
        { title: "Security Ops", description: "Threat detection and firewalls", status: "current", technologies: ["SIEM", "Pentesting"], projects: ["Vulnerability Assessment", "Malware Analysis Lab"] },
        { title: "Governance", description: "Risk Management and Compliance", status: "locked", technologies: ["ISO 27001", "GDPR"], projects: ["Security Compliance Audit Mockup"] }
    ],
    'ai-ml': [
        { title: "Python/Math", description: "Python and Matrix Algebra", status: "completed", technologies: ["NumPy", "Linear Algebra"], projects: ["Simple Equation Solver"] },
        { title: "Core ML", description: "Regression and SVMs", status: "current", technologies: ["Supervised ML", "Feature Eng."], projects: ["Customer Churn Prediction", "Spam Email Detector"] },
        { title: "Neural Networks", description: "Deep Learning and Transformers", status: "locked", technologies: ["PyTorch", "LLMs"], projects: ["Image Classification with CNNs", "NLP Language Translator"] }
    ],
    'cloud-computing': [
        { title: "IT Foundations", description: "Virtualization and OS basics", status: "completed", technologies: ["Ubuntu", "Docker"], projects: ["Containerized Web App"] },
        { title: "Cloud Platforms", description: "AWS/Azure/GCP Essentials", status: "current", technologies: ["IAM", "VPC", "EC2"], projects: ["Serverless Function Setup", "Auto-scaling Infrastructure"] },
        { title: "DevOps/SRE", description: "CI/CD and Infrastructure as Code", status: "locked", technologies: ["Terraform", "Kubernetes"], projects: ["Full CI/CD Pipeline", "Kubernetes Cluster Management"] }
    ],
    'product-manager': [
        { title: "Product Basics", description: "Lifecycle and Agile fundamentals", status: "completed", technologies: ["Agile/Scrum", "Market Res."], projects: ["Product Breakdown Report"] },
        { title: "User Research", description: "UX and Customer Discovery", status: "current", technologies: ["Jira", "User Interviews", "Metrics"], projects: ["Feature Prioritization Sheet", "UX Improvement Audit"] },
        { title: "Strategy/Vision", description: "Monetization and roadmap scaling", status: "locked", technologies: ["GTM Strategy", "Financial Modeling"], projects: ["Full Product Roadmap Pitch", "Competitive Analysis Report"] }
    ]
};

export const INDUSTRY_TRENDS = [
    { name: 'Generative AI', growth: '+240%', demand: 98 },
    { name: 'Cloud Security', growth: '+85%', demand: 92 },
    { name: 'Full-Stack Dev', growth: '+45%', demand: 88 },
    { name: 'LLM Engineering', growth: '+310%', demand: 95 },
    { name: 'Edge Computing', growth: '+30%', demand: 75 }
];

export const JOBS = [
    { id: 1, title: "Senior AI Engineer", company: "Google", location: "Mountain View, CA", salary: "$180k - $250k", type: "Hybrid", posted: "2d ago" },
    { id: 2, title: "Backend Developer", company: "Stripe", location: "Dublin, Ireland", salary: "€90k - €130k", type: "Remote", posted: "5h ago" },
    { id: 3, title: "Cybersecurity Analyst", company: "CrowdStrike", location: "Austin, TX", salary: "$110k - $160k", type: "On-site", posted: "1d ago" },
    { id: 4, title: "Data Scientist", company: "Meta", location: "London, UK", salary: "£85k - £140k", type: "Hybrid", posted: "3d ago" },
    { id: 5, title: "Cloud Architect", company: "AWS", location: "Seattle, WA", salary: "$165k - $230k", type: "Remote", posted: "12h ago" }
];

export const RESOURCE_LIBRARY = [
    { id: 1, title: "CS50: Introduction to Computer Science", provider: "Harvard / edX", type: "Course", difficulty: "Beginner", matchScore: 95, price: "Free", url: "https://edx.org" },
    { id: 2, title: "Machine Learning Specialization", provider: "DeepLearning.AI", type: "Course", difficulty: "Intermediate", matchScore: 92, price: "Paid", url: "https://coursera.org" },
    { id: 3, title: "AWS Certified Solutions Architect", provider: "Amazon Web Services", type: "Course", difficulty: "Advanced", matchScore: 88, price: "Paid", url: "https://aws.amazon.com" },
    { id: 4, title: "The Pragmatic Programmer", provider: "O'Reilly Media", type: "Docs", difficulty: "Intermediate", matchScore: 90, price: "Paid", url: "https://oreilly.com" },
    { id: 5, title: "React Documentation", provider: "Meta", type: "Docs", difficulty: "Beginner", matchScore: 100, price: "Free", url: "https://react.dev" }
];

export const CAREER_COMPARISONS = [
    { path: 'software-dev', avgSalary: "$120k", difficulty: 6, timeToMaster: "1-2 Years", topCompanies: ["Apple", "Netflix", "Microsoft"] },
    { path: 'data-science', avgSalary: "$135k", difficulty: 8, timeToMaster: "2-3 Years", topCompanies: ["Tesla", "Airbnb", "Spotify"] },
    { path: 'ai-ml', avgSalary: "$160k", difficulty: 9, timeToMaster: "3-4 Years", topCompanies: ["OpenAI", "Deepmind", "NVIDIA"] },
    { path: 'cybersecurity', avgSalary: "$115k", difficulty: 7, timeToMaster: "1-2 Years", topCompanies: ["Cisco", "Palo Alto", "IBM"] },
    { path: 'cloud-computing', avgSalary: "$130k", difficulty: 6, timeToMaster: "1.5 Years", topCompanies: ["GCP", "Azure", "DigitalOcean"] }
];
