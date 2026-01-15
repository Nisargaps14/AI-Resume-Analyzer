import React, { useState, useEffect } from 'react';
import { FileText, Target, Shield, MessageSquare, Brain, Github, LogOut, Home, Briefcase } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ResumeUploader } from './components/ResumeUploader';
import { ResumeAnalysis } from './components/ResumeAnalysis';
import { JobMatcher } from './components/JobMatcher';
import { JobHiringPortal } from './components/JobHiringPortal';
import { ATSOptimizer } from './components/ATSOptimizer';
import { InterviewCoach } from './components/InterviewCoach';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Auth } from './components/Auth';
import { ProfileDropdown } from './components/ProfileDropdown';
import { Footer } from './components/Footer';
import { Button } from './components/ui/button';
import { ExtractedData } from './utils/nlp';

interface User {
  email: string;
  name?: string;
}

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated (e.g., from localStorage)
    const savedUser = localStorage.getItem('user');
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      setShowWelcome(false);
    } else if (hasSeenWelcome) {
      setShowWelcome(false);
    }
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    sessionStorage.setItem('hasSeenWelcome', 'true');
  };

  const handleShowSignup = () => {
    setShowWelcome(false);
    setShowSignup(true);
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowSignup(false);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const handleGoHome = () => {
    setShowWelcome(true);
    setShowSignup(false);
    sessionStorage.removeItem('hasSeenWelcome');
  };

  const handleResumeProcessed = (text: string, data: ExtractedData, role: string) => {
    setResumeText(text);
    setExtractedData(data);
    setActiveTab('analysis');
  };

  // Show welcome screen first
  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} onShowSignup={handleShowSignup} />;
  }

  // Show signup screen if requested
  if (showSignup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Auth Component */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <Auth onAuthSuccess={handleAuthSuccess} signupMode={true} />
        </div>
      </div>
    );
  }

  // Show auth screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Auth Component */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <Auth onAuthSuccess={handleAuthSuccess} signupMode={false} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={handleGoHome}
                variant="ghost"
                className="p-2 hover:bg-white/10"
                title="Go to Home"
              >
                <Home className="w-5 h-5 text-gray-600" />
              </Button>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  AI Resume Analyzer
                </h1>
                <p className="text-sm text-gray-600">
                  Powered by NLP & Machine Learning
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* User Profile Dropdown */}
              {user && (
                <ProfileDropdown 
                  user={user} 
                  onLogout={handleLogout} 
                />
              )}
              
              {/* GitHub Link */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <FileText className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-sm">Resume Parsing</h3>
            <p className="text-xs text-gray-600">PDF & DOCX support</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <Target className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="font-semibold text-sm">Job Matching</h3>
            <p className="text-xs text-gray-600">TF-IDF similarity</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <Briefcase className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-semibold text-sm">Job Portal</h3>
            <p className="text-xs text-gray-600">Real-time hiring data</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <Shield className="w-8 h-8 text-pink-600 mb-2" />
            <h3 className="font-semibold text-sm">ATS Optimization</h3>
            <p className="text-xs text-gray-600">Beat applicant tracking systems</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <MessageSquare className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-semibold text-sm">Interview Coach</h3>
            <p className="text-xs text-gray-600">AI-powered feedback</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Upload</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" disabled={!resumeText} className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="matcher" disabled={!resumeText} className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Job Match</span>
            </TabsTrigger>
            <TabsTrigger value="hiring" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Hiring</span>
            </TabsTrigger>
            <TabsTrigger value="ats" disabled={!resumeText} className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">ATS</span>
            </TabsTrigger>
            <TabsTrigger value="interview" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Interview</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <ResumeUploader onResumeProcessed={handleResumeProcessed} />
            
            {/* Instructions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">How It Works</h2>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">1</span>
                  <span><strong>Upload Resume:</strong> Upload your resume in PDF, DOCX, or TXT format (max 10MB)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                  <span><strong>NLP Analysis:</strong> Our system extracts skills, education, and experience using Natural Language Processing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                  <span><strong>Job Matching:</strong> Compare your resume against job descriptions using TF-IDF and cosine similarity</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">4</span>
                  <span><strong>ATS Optimization:</strong> Get suggestions to improve your resume for Applicant Tracking Systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">5</span>
                  <span><strong>Interview Practice:</strong> Practice with AI-generated questions and receive feedback</span>
                </li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="analysis">
            {extractedData && <ResumeAnalysis data={extractedData} />}
          </TabsContent>

          <TabsContent value="matcher">
            {resumeText && <JobMatcher resumeText={resumeText} />}
          </TabsContent>

          <TabsContent value="hiring">
            <JobHiringPortal resumeText={resumeText} extractedData={extractedData} />
          </TabsContent>

          <TabsContent value="ats">
            {resumeText && <ATSOptimizer resumeText={resumeText} />}
          </TabsContent>

          <TabsContent value="interview">
            <InterviewCoach />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
