export type CareerPathType = 'software-dev' | 'data-science' | 'cybersecurity' | 'ai-ml' | 'cloud-computing' | 'product-manager';

export interface SkillSet {
    [key: string]: number;
}

export interface UserProfile {
    name: string;
    education: string;
    goal: CareerPathType;
    experienceLevel: 'beginner' | 'intermediate' | 'advanced';
    skills: SkillSet;
    points: number;
    badges: string[];
    level: number;
}

export interface AssessmentQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    skillMapped: string;
}

export interface RoadmapStep {
    title: string;
    description: string;
    status: 'completed' | 'current' | 'locked';
    technologies: string[];
    projects?: string[];
}

export interface LearningResource {
    id: number;
    title: string;
    provider: string;
    type: 'Course' | 'Project' | 'Docs';
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    matchScore: number;
    url?: string;
    price?: 'Free' | 'Paid';
}

export interface JobRole {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: 'Remote' | 'On-site' | 'Hybrid';
    posted: string;
}

export interface CareerComparison {
    path: CareerPathType;
    avgSalary: string;
    difficulty: number; // 1-10
    timeToMaster: string;
    topCompanies: string[];
}


export interface ResumeAnalysis {
    score: number;
    atsCompatibility: number;
    suggestions: string[];
    identifiedSkills: string[];
}

export interface InterviewSession {
    type: 'Technical' | 'Behavioral';
    questions: string[];
    feedback: string;
    score: number;
}
