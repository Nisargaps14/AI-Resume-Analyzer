import React from 'react';
import { Mail, Linkedin, Github, Globe, Heart, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 border-t border-purple-500/20 mt-12 py-12 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold text-white">AI Resume Analyzer</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Transform your resume with AI-powered insights and stand out from the crowd.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-1 text-purple-300">
              <span className="text-sm">Built with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-sm">using React & TypeScript</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-purple-300 transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-300 hover:text-purple-300 transition-colors duration-300 text-sm">
                Terms of Service
              </a>
              <a href="#" className="block text-gray-300 hover:text-purple-300 transition-colors duration-300 text-sm">
                About Us
              </a>
              <a href="#" className="block text-gray-300 hover:text-purple-300 transition-colors duration-300 text-sm">
                Contact
              </a>
            </div>
          </div>

          {/* Connect Section */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
            <div className="space-y-3">
              <a 
                href="mailto:psnisarga1@gmail.com" 
                className="flex items-center justify-center md:justify-end gap-2 text-gray-300 hover:text-purple-300 transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">psnisarga1@gmail.com</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/nisarga-p-s-0a4b5724b" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center md:justify-end gap-2 text-gray-300 hover:text-blue-400 transition-all duration-300 group"
              >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">LinkedIn Profile</span>
              </a>
              <a 
                href="https://github.com/Nisargaps14" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center md:justify-end gap-2 text-gray-300 hover:text-gray-100 transition-all duration-300 group"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">GitHub</span>
              </a>
              <a 
                href="https://my-portfolio-qtk442zhx-nisarga-ps-projects.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center md:justify-end gap-2 text-gray-300 hover:text-purple-300 transition-all duration-300 group"
              >
                <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Portfolio</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-purple-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400 text-center md:text-left">
              © 2024 Nisarga P S. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Status: Online</span>
              </div>
              <div className="text-xs text-gray-400">
                Made with <span className="text-purple-400">❤️</span> in India
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
