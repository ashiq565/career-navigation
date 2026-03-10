import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Map,
  Compass,
  TrendingUp,
  Target,
  Award,
  BookOpen,
  ChevronRight,
  Zap,
  CheckCircle2,
  AlertCircle,
  Users,
  Star,
  Globe,
  Rocket,
  BrainCircuit,
  ShieldCheck,
  Cloud,
  ChevronLeft,
  GraduationCap,
  FileSearch,
  MessageSquare,
  Trophy,
  History,
  LayoutDashboard,
  Search,
  ExternalLink,
  Github
} from 'lucide-react';
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell
} from 'recharts';
import type { CareerPathType, UserProfile, ResumeAnalysis, InterviewSession } from './types';
import { CAREER_PATHS, QUESTIONS_BY_PATH, ROADMAPS, INDUSTRY_TRENDS, JOBS, RESOURCE_LIBRARY, CAREER_COMPARISONS } from './data/careerData';
import './index.css';

// --- STYLES & VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

// --- COMPONENTS ---

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [view, setView] = useState<'onboarding' | 'assessment' | 'main'>('onboarding');

  // User State including Gamification
  const [user, setUser] = useState<UserProfile>({
    name: '',
    education: '',
    goal: 'software-dev',
    experienceLevel: 'beginner',
    skills: {
      "Fundamentals": 0,
      "Core Skills": 0,
      "Advanced Concepts": 0,
      "Tools": 0,
      "Industry Prep": 0
    },
    points: 0,
    level: 1,
    badges: ['Early Bird']
  });

  // Assessment & AI Feature States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysis | null>(null);
  const [interviewSession, setInterviewSession] = useState<InterviewSession | null>(null);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // --- Handlers ---

  const handleStartOnboarding = (name: string, education: string, goal: CareerPathType) => {
    setUser(prev => ({ ...prev, name, education, goal }));
    setView('assessment');
  };

  const handleAssessmentComplete = (finalScore: number) => {
    const baseValue = (finalScore / QUESTIONS_BY_PATH[user.goal].length) * 80;
    const newSkills = {
      "Fundamentals": Math.min(100, baseValue + 20),
      "Core Skills": Math.min(100, baseValue + 5),
      "Advanced Concepts": Math.max(5, baseValue - 25),
      "Tools": 45,
      "Industry Prep": 15
    };
    setUser(prev => ({
      ...prev,
      skills: newSkills,
      points: prev.points + (finalScore * 150),
      badges: [...prev.badges, 'Fast Learner']
    }));
    setView('main');
    setActiveTab('dashboard');
  };

  const analyzeResume = () => {
    // Mock AI Analysis
    setResumeAnalysis({
      score: 78,
      atsCompatibility: 85,
      suggestions: [
        "Include more action verbs in your project descriptions.",
        "Add a professional summary at the top.",
        "Quantify your achievements (e.g., 'Improved performance by 20%')."
      ],
      identifiedSkills: ["React", "JavaScript", "Python", "Git"]
    });
    setUser(prev => ({ ...prev, points: prev.points + 50 }));
  };

  // --- Views ---

  const SplashView = () => (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', overflow: 'hidden', position: 'fixed', inset: 0, zIndex: 10000 }}>
      <div className="bg-mesh"></div>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} style={{ textAlign: 'center' }}>
        <motion.div
          animate={{ rotate: 360, boxShadow: ['0 0 20px var(--accent-glow)', '0 0 50px var(--accent-glow)', '0 0 20px var(--accent-glow)'] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, boxShadow: { duration: 3, repeat: Infinity } }}
          style={{ width: '120px', height: '120px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}
        >
          <BrainCircuit size={64} color="white" />
        </motion.div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CareerPath AI</h1>
        <p className="text-muted mt-2" style={{ letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Intelligent Career Navigation</p>
      </motion.div>
    </div>
  );

  const OnboardingView = () => {
    const [name, setName] = useState('');
    const [education, setEducation] = useState('');
    const [goal, setGoal] = useState<CareerPathType>('software-dev');

    return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="container max-w-4xl mt-20">
        <div className="card glass-panel p-10">
          <motion.div variants={itemVariants} className="text-center mb-10">
            <GraduationCap size={48} className="text-accent-primary mx-auto mb-4" />
            <h2 className="text-4xl font-black mb-2">Build Your Career DNA</h2>
            <p className="text-muted">Personalized intelligence tailored to your unique potential.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <motion.div variants={itemVariants} className="input-group">
                <label className="input-label">Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Johnson" className="input-field" />
              </motion.div>

              <motion.div variants={itemVariants} className="input-group">
                <label className="input-label">Education Status</label>
                <input value={education} onChange={(e) => setEducation(e.target.value)} placeholder="e.g. B.Tech CSE Final Year" className="input-field" />
              </motion.div>

              <motion.button
                variants={itemVariants}
                disabled={!name || !education}
                onClick={() => handleStartOnboarding(name, education, goal)}
                className="btn btn-primary w-full py-5 mt-4 disabled:opacity-30 group"
              >
                Analyze My Potential <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            <div className="space-y-4">
              <label className="input-label">Choose Your Target Path</label>
              <div className="grid grid-cols-1 gap-3">
                {(Object.entries(CAREER_PATHS) as [CareerPathType, any][]).map(([key, info]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setGoal(key)}
                    className={`btn text-left justify-start gap-4 p-4 border-2 transition-all duration-300 rounded-2xl relative overflow-hidden group ${goal === key ? 'border-accent-primary bg-accent-primary/20 ring-2 ring-accent-primary/20' : 'border-white/5 bg-white/5 opacity-70 hover:opacity-100'}`}
                  >
                    <div className={`p-2 rounded-xl ${goal === key ? 'bg-accent-primary' : 'bg-white/10'}`}>
                      {key === 'software-dev' && <Rocket size={20} />}
                      {key === 'data-science' && <Briefcase size={20} />}
                      {key === 'cybersecurity' && <ShieldCheck size={20} />}
                      {key === 'ai-ml' && <BrainCircuit size={20} />}
                      {key === 'cloud-computing' && <Cloud size={20} />}
                      {key === 'product-manager' && <Target size={20} />}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{info.label}</div>
                      <div className="text-[10px] opacity-60 line-clamp-1">{info.description}</div>
                    </div>
                    {goal === key && <CheckCircle2 size={24} className="absolute right-4 text-accent-primary" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const AssessmentView = () => {
    const questions = QUESTIONS_BY_PATH[user.goal];
    const question = questions[currentQuestionIndex];

    const handleAnswer = (optionIndex: number) => {
      let newScore = score;
      if (optionIndex === question.correctAnswer) newScore += 1;
      setScore(newScore);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        handleAssessmentComplete(newScore);
      }
    };

    return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="container max-w-2xl mt-20">
        <div className="card glass-panel p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 bg-accent-primary transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>

          <div className="flex justify-between items-center mb-10">
            <span className="badge-primary px-4 py-1 flex items-center gap-2"><Trophy size={14} /> Domain Assessment</span>
            <span className="text-sm font-bold text-muted">{currentQuestionIndex + 1} / {questions.length}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={currentQuestionIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}>
              <h2 className="text-3xl font-bold mb-10 leading-tight">"{question.question}"</h2>
              <div className="grid grid-cols-1 gap-4">
                {question.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="btn btn-secondary w-full text-left justify-start p-6 rounded-2xl hover:border-accent-primary hover:bg-accent-primary/5 group"
                  >
                    <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mr-4 group-hover:bg-accent-primary transition-colors font-bold">{String.fromCharCode(65 + idx)}</span>
                    <span className="text-lg">{option}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  const MainDashboard = () => {
    const roadmap = ROADMAPS[user.goal];
    const radarData = Object.entries(user.skills).map(([key, value]) => ({
      skill: key,
      current: value,
      fullMark: 100
    }));

    return (
      <div className="app-wrapper min-h-screen">
        {/* Navigation */}
        <nav className="glass-panel sticky top-0 z-[100] border-none shadow-2xl" style={{ background: 'rgba(2, 6, 23, 0.9)' }}>
          <div className="container flex items-center justify-between h-24">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveTab('dashboard')}>
              <div className="badge-primary p-3 rounded-2xl group-hover:scale-110 transition-transform"><BrainCircuit size={32} /></div>
              <span className="font-extrabold text-2xl tracking-tighter">CareerPath <span className="text-accent-primary">AI</span></span>
            </div>

            <div className="flex gap-4">
              {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                { id: 'path', icon: Map, label: 'Roadmap' },
                { id: 'tools', icon: Zap, label: 'AI Tools' },
                { id: 'recommendations', icon: BookOpen, label: 'Learning' }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`btn border-none transition-all ${activeTab === tab.id ? 'btn-primary text-white shadow-lg' : 'text-muted hover:text-white hover:bg-white/5'}`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ borderRadius: '16px', padding: '0.75rem 1.5rem' }}
                >
                  <tab.icon size={20} className={activeTab === tab.id ? 'mr-2' : ''} />
                  <span className={activeTab === tab.id ? 'inline font-bold' : 'hidden'}>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <Trophy size={16} className="text-status-warning" />
                  <span className="font-black text-main">{user.points} XP</span>
                </div>
                <div className="text-[10px] text-accent-primary font-bold uppercase tracking-widest">Level {user.level} Navigator</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary p-0.5 shadow-lg overflow-hidden">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-black text-white">AD</div>
              </div>
            </div>
          </div>
        </nav>

        <main className="container py-12">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-12 gap-8">
                {/* Welcome Card */}
                <div className="col-span-12 card glass-panel bg-transparent border-none p-0 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="max-w-3xl">
                    <h2 className="text-5xl font-black mb-4 tracking-tight">Focus on Growth, {user.name.split(' ')[0]}.</h2>
                    <p className="text-xl text-muted leading-relaxed">Your potential match for <span className="text-main font-bold border-b-2 border-accent-primary">{CAREER_PATHS[user.goal].label}</span> is increasing. We've detected new high-priority skills in the market.</p>
                  </div>
                  <div className="badge-primary p-6 rounded-3xl flex items-center gap-4 bg-accent-primary/5 hover:bg-accent-primary/10 transition-colors border-accent-primary/20">
                    <Zap size={32} className="text-accent-primary animate-float" />
                    <div>
                      <div className="text-xs uppercase font-black opacity-60">Insight Mode</div>
                      <div className="text-lg font-bold">Optimal Path Engaged</div>
                    </div>
                  </div>
                </div>

                {/* Skill Radar */}
                <div className="col-span-12 lg:col-span-12 card glass-panel">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h3 className="text-2xl font-black mb-6 flex items-center gap-3"><Target size={28} className="text-accent-primary" /> Skill Architecture</h3>
                      <div className="space-y-6">
                        {Object.entries(user.skills).map(([skill, value]) => (
                          <div key={skill} className="space-y-2">
                            <div className="flex justify-between text-sm font-bold">
                              <span>{skill}</span>
                              <span className="text-accent-primary">{value}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ height: '400px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                          <PolarGrid stroke="rgba(255,255,255,0.05)" />
                          <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--text-muted)', fontSize: 13 }} />
                          <Radar name="Your Profile" dataKey="current" stroke="var(--accent-primary)" fill="var(--accent-primary)" fillOpacity={0.4} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Badges & Gamification */}
                <div className="col-span-12 lg:col-span-4 card glass-panel shadow-none bg-accent-secondary/5 border-accent-secondary/20">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Award size={24} className="text-accent-secondary" /> Achievements</h3>
                  <div className="flex flex-wrap gap-4">
                    {user.badges.map(badge => (
                      <div key={badge} className="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2 hover:bg-white/10 transition-all hover:-translate-y-1">
                        <Trophy size={32} className="text-status-warning" />
                        <span className="text-xs font-black text-center">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trends Bar Chart */}
                <div className="col-span-12 lg:col-span-7 card glass-panel">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2"><TrendingUp size={24} className="text-accent-tertiary" /> Market Intelligence</h3>
                      <p className="text-sm text-muted">Skill demand in {CAREER_PATHS[user.goal].label}</p>
                    </div>
                    <span className="badge-primary px-4 py-1">LIVE DATA</span>
                  </div>
                  <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={INDUSTRY_TRENDS}>
                        <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'var(--bg-card)', border: 'none', borderRadius: '12px' }} />
                        <Bar dataKey="demand" radius={[10, 10, 0, 0]} barSize={40}>
                          {INDUSTRY_TRENDS.map((_, i) => <Cell key={i} fill={i % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)'} fillOpacity={0.8} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Live Jobs Feed */}
                <div className="col-span-12 lg:col-span-5 card glass-panel bg-white/5 border-white/5 shadow-none">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Briefcase size={22} className="text-accent-primary" /> Hiring Now</h3>
                  <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    {JOBS.map(job => (
                      <div key={job.id} className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-accent-primary/30 transition-all flex justify-between items-center group">
                        <div>
                          <div className="font-bold text-sm group-hover:text-accent-primary transition-colors">{job.title}</div>
                          <div className="text-[10px] text-muted">{job.company} • {job.location}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-black text-accent-tertiary">{job.salary}</div>
                          <div className="text-[8px] opacity-40 uppercase">{job.posted}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-secondary w-full mt-6 py-2 text-xs">View All Postings <ExternalLink size={12} /></button>
                </div>

                {/* Career Comparison Tool */}
                <div className="col-span-12 card glass-panel border-t-4 border-accent-secondary">
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-2"><Target size={28} className="text-accent-secondary" /> Opportunity Comparison</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {CAREER_COMPARISONS.map(comp => (
                      <div key={comp.path} className={`p-6 rounded-3xl border transition-all ${user.goal === comp.path ? 'bg-accent-secondary/10 border-accent-secondary shadow-lg' : 'bg-white/5 border-white/5 opacity-80 hover:opacity-100 hover:bg-white/10'}`}>
                        <div className="text-[10px] uppercase font-black opacity-50 mb-4">{CAREER_PATHS[comp.path as CareerPathType].label}</div>
                        <div className="text-2xl font-black mb-1">{comp.avgSalary}</div>
                        <div className="text-[10px] text-muted mb-4">Avg. Global Salary</div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-end">
                            <span className="text-[10px] font-bold text-muted uppercase">Difficulty</span>
                            <span className="text-xs font-black">{comp.difficulty}/10</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full"><div className="h-full bg-accent-secondary" style={{ width: `${comp.difficulty * 10}%` }}></div></div>

                          <div className="pt-4 border-t border-white/5">
                            <div className="text-[10px] font-bold text-muted uppercase mb-2">Top Hiring</div>
                            <div className="flex flex-wrap gap-1">
                              {comp.topCompanies.map(c => <span key={c} className="px-2 py-0.5 rounded-lg bg-white/5 text-[8px] font-bold">{c}</span>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'path' && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <div className="badge-primary px-6 py-2 mb-4 rounded-full">INTELLIGENT SEQUENCING</div>
                  <h2 className="text-5xl font-black mb-4">Your Personalized Roadmap</h2>
                  <p className="text-xl text-muted">Bridging the gap from {user.education} background to {CAREER_PATHS[user.goal].label} Lead.</p>
                </div>

                <div className="relative space-y-16">
                  <div className="absolute left-[39px] top-8 bottom-8 w-1 bg-gradient-to-b from-status-success via-accent-primary to-white/5 rounded-full" />
                  {roadmap.map((step, idx) => (
                    <motion.div key={idx} variants={itemVariants} className="flex gap-10 group">
                      <div className={`w-20 h-20 rounded-[2rem] shrink-0 border-4 flex items-center justify-center transition-all group-hover:scale-110 ${step.status === 'completed' ? 'bg-status-success/20 border-status-success text-status-success' : step.status === 'current' ? 'bg-accent-primary/20 border-accent-primary text-accent-primary shadow-glow' : 'bg-white/5 border-white/10 text-muted opacity-40'}`}>
                        {step.status === 'completed' ? <CheckCircle2 size={40} /> : step.status === 'current' ? <Zap size={40} className="animate-float" /> : <ShieldCheck size={32} />}
                      </div>
                      <div className={`flex-1 card glass-panel p-8 transition-all ${step.status === 'current' ? 'border-accent-primary shadow-[0_30px_60px_-15px_rgba(56,189,248,0.3)] scale-[1.03]' : 'opacity-80'}`}>
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-2xl font-black">{step.title}</h4>
                          <span className={`badge px-4 py-1.5 rounded-full font-black text-[10px] ${step.status === 'completed' ? 'badge-success' : step.status === 'current' ? 'badge-primary' : 'bg-white/5 text-muted'}`}>{step.status.toUpperCase()}</span>
                        </div>
                        <p className="text-muted text-lg leading-relaxed mb-6">{step.description}</p>

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <div className="text-[10px] uppercase font-black text-accent-primary mb-3 tracking-widest">Stack Core</div>
                            <div className="flex flex-wrap gap-2">
                              {step.technologies.map(t => <span key={t} className="px-3 py-1.5 rounded-xl bg-accent-primary/5 border border-accent-primary/20 text-[10px] font-bold text-accent-primary">{t}</span>)}
                            </div>
                          </div>
                          {step.projects && (
                            <div>
                              <div className="text-[10px] uppercase font-black text-status-warning mb-3 tracking-widest">Applied Projects</div>
                              <div className="flex flex-wrap gap-2">
                                {step.projects.map(p => <span key={p} className="px-3 py-1.5 rounded-xl bg-status-warning/5 border border-status-warning/20 text-[10px] font-bold text-status-warning">{p}</span>)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'tools' && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-12 gap-8">
                {/* AI Resume Analyzer */}
                <div className="col-span-12 lg:col-span-6 card glass-panel">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-accent-primary/10 rounded-[2rem]"><FileSearch size={32} className="text-accent-primary" /></div>
                    <h3 className="text-2xl font-black">AI Resume Analyzer</h3>
                  </div>

                  {!resumeAnalysis ? (
                    <div className="p-12 border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 group hover:border-accent-primary transition-all cursor-pointer">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-primary/10"><Search size={32} className="text-muted group-hover:text-accent-primary" /></div>
                      <div className="text-center">
                        <div className="font-bold text-lg">Click to Upload Resume</div>
                        <div className="text-sm text-muted">Supporting PDF, DOCX • Max 5MB</div>
                      </div>
                      <button onClick={analyzeResume} className="btn btn-secondary py-3 px-8 rounded-2xl">Start Mock Analysis</button>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 text-center">
                          <div className="text-4xl font-black text-accent-primary">{resumeAnalysis.score}</div>
                          <div className="text-xs uppercase font-bold text-muted mt-1">Impact Score</div>
                        </div>
                        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 text-center">
                          <div className="text-4xl font-black text-accent-tertiary">{resumeAnalysis.atsCompatibility}%</div>
                          <div className="text-xs uppercase font-bold text-muted mt-1">ATS Optimization</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-bold flex items-center gap-2"><Zap size={18} className="text-status-warning" /> Critical Fixes</h4>
                        {resumeAnalysis.suggestions.map((s, i) => (
                          <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border-l-4 border-status-warning">
                            <div className="p-1"><AlertCircle size={16} className="text-status-warning" /></div>
                            <span className="text-sm">{s}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* AI Interview Prep */}
                <div className="col-span-12 lg:col-span-6 card glass-panel">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-accent-secondary/10 rounded-[2rem]"><MessageSquare size={32} className="text-accent-secondary" /></div>
                    <h3 className="text-2xl font-black">AI Interview Assistant</h3>
                  </div>
                  <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-br from-accent-secondary/10 to-transparent border border-white/5 overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10"><BrainCircuit size={120} /></div>
                    <h4 className="text-lg font-bold mb-4">Simulate Round 1: Technical Diagnostic</h4>
                    <p className="text-muted text-sm leading-relaxed mb-8">Role-specific interaction focusing on {user.goal}. Receive real-time feedback on confidence, articulation, and technical depth.</p>
                    <div className="flex gap-4">
                      <button className="btn btn-primary flex-1 py-4 rounded-2xl">Launch Voice AI</button>
                      <button className="btn btn-secondary p-4 rounded-2xl"><History size={24} /></button>
                    </div>
                  </div>
                </div>

                {/* Mentor Platform Preview */}
                <div className="col-span-12 card glass-panel flex flex-col md:flex-row items-center gap-10 p-12" style={{ borderLeft: '12px solid var(--accent-tertiary)' }}>
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map(i => <div key={i} className="w-20 h-20 rounded-full border-4 border-slate-900 bg-accent-tertiary flex items-center justify-center font-black text-2xl text-slate-900">M{i}</div>)}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-black mb-2">Connect with Global Mentors</h3>
                    <p className="text-muted text-lg">Verified professionals from <span className="text-main font-bold">AWS, OpenAI, and NVIDIA</span> are ready to review your trajectory.</p>
                  </div>
                  <button className="btn btn-primary px-10 py-5 rounded-[2rem] shadow-[0_15px_30px_rgba(45,212,191,0.2)]">Book AI Match Séance</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'recommendations' && (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                  <div className="max-w-2xl">
                    <h2 className="text-5xl font-black mb-2">Resource Library.</h2>
                    <p className="text-xl text-muted">A searchable hub of 100+ curated resources for {CAREER_PATHS[user.goal].label}.</p>
                  </div>
                  <div className="flex gap-2">
                    {['All', 'Courses', 'Projects', 'Documentation'].map(f => (
                      <button key={f} className={`px-6 py-2 rounded-full border border-white/10 text-xs font-bold transition-all ${f === 'All' ? 'bg-accent-primary text-white border-accent-primary' : 'hover:bg-white/5'}`}>{f}</button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {RESOURCE_LIBRARY.map((res) => (
                    <div key={res.id} className={`card glass-panel group hover:-translate-y-2 transition-all p-8 border-t-8 ${res.price === 'Free' ? 'border-status-success' : 'border-accent-primary'}`}>
                      <div className="flex justify-between mb-8">
                        <div className={`p-4 bg-white/5 rounded-2xl transition-colors ${res.price === 'Free' ? 'group-hover:bg-status-success/20' : 'group-hover:bg-accent-primary/20'}`}>
                          {res.type === 'Course' ? <BookOpen size={28} className={res.price === 'Free' ? 'text-status-success' : 'text-accent-primary'} /> : <FileSearch size={28} className="text-accent-secondary" />}
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-black opacity-40 uppercase">{res.difficulty} {res.type}</div>
                          <div className="text-main font-bold">{res.matchScore}% Quality</div>
                        </div>
                      </div>
                      <h4 className="text-xl font-bold mb-2">{res.title}</h4>
                      <div className="text-xs text-muted mb-6">{res.provider}</div>

                      <div className="flex items-center justify-between mt-auto">
                        <span className={`badge text-[10px] px-3 py-1 ${res.price === 'Free' ? 'badge-success' : 'badge-primary'}`}>{res.price}</span>
                        <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-2 text-xs font-bold transition-colors">
                          Access Material <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Reasoner Footer */}
                <div className="card glass-panel overflow-hidden relative p-12 mt-12" style={{ borderLeft: '12px solid var(--accent-primary)', background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.1), transparent)' }}>
                  <div className="absolute -top-10 -right-10 opacity-5"><BrainCircuit size={300} /></div>
                  <div className="flex items-start gap-10">
                    <div className="p-5 bg-accent-primary/20 rounded-3xl shrink-0 animate-float"><Stars size={40} className="text-accent-primary" /></div>
                    <div>
                      <h3 className="text-3xl font-black mb-4">AI Library Logic</h3>
                      <p className="text-xl text-muted leading-relaxed max-w-4xl">
                        Our recommendation engine has prioritized <span className="text-main font-bold">Concept Stability</span>. We've filtered out hype-driven content to ensure you spend your time on resources that provide lasting value in the <span className="text-accent-primary font-black uppercase">{user.goal} ecosystem</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        <footer className="container py-20 border-t border-white/5 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-muted">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="badge-primary p-2 rounded-xl"><BrainCircuit size={24} /></div>
                <span className="font-extrabold text-2xl tracking-tighter text-white">CareerPath AI</span>
              </div>
              <p className="max-w-md leading-relaxed text-lg">Empowering the next generation of industry-ready professionals through personalized AI intelligence and structured skill development.</p>
              <div className="flex gap-4">
                {[Github, Globe, MessageSquare].map((Icon, i) => <button key={i} className="p-4 rounded-2xl bg-white/5 hover:bg-accent-primary/10 transition-colors"><Icon size={24} /></button>)}
              </div>
            </div>
            <div>
              <h4 className="font-black text-white mb-8 uppercase tracking-widest text-sm">Platform</h4>
              <ul className="space-y-4 font-bold">
                <li className="hover:text-accent-primary cursor-pointer transition-colors">Career Radar</li>
                <li className="hover:text-accent-primary cursor-pointer transition-colors">Skill Assessment</li>
                <li className="hover:text-accent-primary cursor-pointer transition-colors">Roadmap Engine</li>
                <li className="hover:text-accent-primary cursor-pointer transition-colors">Industry Trends</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white mb-8 uppercase tracking-widest text-sm">Resources</h4>
              <ul className="space-y-4 font-bold">
                <li className="hover:text-accent-primary cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-accent-primary cursor-pointer transition-colors">AI Mentor Support</li>
                <li className="hover:text-accent-primary cursor-pointer transition-colors">API for Schools</li>
                <li className="hover:text-accent-primary cursor-pointer transition-colors">Partner Dashboard</li>
              </ul>
            </div>
          </div>
          <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-6 text-sm opacity-60 font-bold border-t border-white/5 pt-10">
            <span>© 2026 CareerPath AI Terminal. All rights reserved.</span>
            <div className="flex gap-10">
              <span>Privacy Protocol</span>
              <span>Terms of Intelligence</span>
              <span>Hacker Integrity</span>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  if (showSplash) return <SplashView />;

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="bg-mesh"></div>
      <AnimatePresence mode="wait">
        {view === 'onboarding' && (
          <motion.div key="onboarding" exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.5 }}>
            <OnboardingView />
          </motion.div>
        )}
        {view === 'assessment' && (
          <motion.div key="assessment" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
            <AssessmentView />
          </motion.div>
        )}
        {view === 'main' && (
          <motion.div key="main" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <MainDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Stars = ({ className, size }: { className?: string, size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3l1.91 5.81L21 9l-4.24 3.81L18.09 21 12 17.27 5.91 21 7.24 12.81 3 9l7.09-.19L12 3z" />
    <path d="M5 3l.64 1.94L7 5.5l-1.36.56L5 8l-.64-1.94L3 5.5l1.36-.56L5 3z" />
    <path d="M19 3l.64 1.94L21 5.5l-1.36.56L19 8l-.64-1.94L17 5.5l1.36-.56L19 3z" />
  </svg>
);

export default App;
