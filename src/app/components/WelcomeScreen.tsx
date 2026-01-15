import React from 'react';
import { FileText, Brain, Sparkles, ArrowRight, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Footer } from './Footer';
import '../../styles/auth-animations.css';

interface WelcomeScreenProps {
  onComplete?: () => void;
  onShowSignup?: () => void;
}

export function WelcomeScreen({ onComplete, onShowSignup }: WelcomeScreenProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleEnterNow = () => {
    if (onComplete) {
      onComplete();
    } else {
      window.location.href = '/main';
    }
  };

  const handleSignUp = () => {
    if (onShowSignup) {
      onShowSignup();
    } else {
      window.location.href = '/auth?mode=signup';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg p-2 rounded-xl border border-white/20">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  AI Resume Analyzer
                </h1>
                <p className="text-xs text-white/70">
                  Transform Your Career
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-white/80 p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <a href="#features" className="block text-white/80 hover:text-white transition-colors py-2">Features</a>
              <a href="#how-it-works" className="block text-white/80 hover:text-white transition-colors py-2">How It Works</a>
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-6xl mx-auto">
          {/* Animated Logo */}
          <div className="mb-12 relative">
            <div className="inline-flex items-center justify-center w-40 h-40 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20">
              <FileText className="w-20 h-20 text-white" />
            </div>
            <div className="absolute -top-4 -right-4">
              <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
            </div>
            <div className="absolute -bottom-4 -left-4">
              <Brain className="w-12 h-12 text-purple-400 animate-pulse" />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-6 mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white animate-fade-in">
              WELCOME TO
            </h1>
            <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-slide-up">
              AI Resume Analyzer
            </h2>
            <p className="text-xl md:text-2xl text-white/80 animate-slide-up-delay max-w-3xl mx-auto">
              Transform your resume into an interview-winning document with AI-powered insights and advanced NLP technology
            </p>
          </div>

          {/* Loading Animation */}
          <div className="flex items-center justify-center space-x-3 mb-12">
            <div className="w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-4 h-4 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              onClick={handleSignUp}
              size="lg"
              className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3"
            >
              Sign Up
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={handleSignUp}
              size="lg"
              variant="outline"
              className="px-12 py-4 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white hover:bg-white/20 font-semibold text-lg rounded-2xl"
            >
              Get Started
            </Button>
          </div>

          {/* Features Preview */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">Smart Analysis</h3>
              <p className="text-white/70 text-sm">Advanced NLP extracts key skills and experience</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-pink-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">Job Matching</h3>
              <p className="text-white/70 text-sm">TF-IDF similarity matches you to perfect jobs</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">ATS Optimization</h3>
              <p className="text-white/70 text-sm">Beat applicant tracking systems with AI</p>
            </div>
          </div>

          {/* How It Works Section */}
          <section id="how-it-works" className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-300">1</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Upload Resume</h3>
                <p className="text-white/70 text-sm">Upload your resume in PDF, DOCX, or TXT format</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-pink-300">2</span>
                </div>
                <h3 className="text-white font-semibold mb-2">AI Analysis</h3>
                <p className="text-white/70 text-sm">Our AI extracts skills, experience, and education</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-300">3</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Get Insights</h3>
                <p className="text-white/70 text-sm">Receive detailed analysis and improvement tips</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-300">4</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Land Dream Job</h3>
                <p className="text-white/70 text-sm">Apply with confidence using your optimized resume</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
