import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Footer } from './Footer';
import '../../styles/auth-animations.css';

interface AuthProps {
  onAuthSuccess: (user: { email: string; name?: string }) => void;
  signupMode?: boolean;
}

export function Auth({ onAuthSuccess, signupMode = false }: AuthProps) {
  const [isLogin, setIsLogin] = useState(!signupMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [preservedSignupData, setPreservedSignupData] = useState<{
    email: string;
    name: string;
  } | null>(null);
  
  // Store registered users in localStorage for demo purposes
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('registeredUsers');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Name validation (signup only)
    if (!isLogin && !formData.name) {
      newErrors.name = 'Name is required';
    } else if (!isLogin && formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Confirm password validation (signup only)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear success message when user starts typing
    if (showSuccess) {
      setShowSuccess(false);
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication logic with user storage
      if (isLogin) {
        // Check if user exists in registered users
        const existingUser = registeredUsers.find((u: { email: string; password: string; name: string }) => u.email === formData.email);
        
        if (existingUser) {
          // User exists - check password
          if (existingUser.password === formData.password) {
            const userData = {
              email: existingUser.email,
              name: existingUser.name
            };
            onAuthSuccess(userData);
          } else {
            // Wrong password
            setErrors({ 
              general: 'Incorrect password. Please try again.' 
            });
          }
        } else {
          // User not found - suggest signup
          setErrors({ 
            general: 'Account not found. Please sign up first to create an account.' 
          });
        }
      } else {
        // Signup - check if email already exists
        const emailExists = registeredUsers.find((u: { email: string; password: string; name: string }) => u.email === formData.email);
        
        if (emailExists) {
          // Email already exists - show notification
          setErrors({ 
            general: 'This email is already registered. Please sign in with your existing account.' 
          });
        } else {
          // New user - successful signup
          const newUser = {
            email: formData.email,
            name: formData.name,
            password: formData.password
          };
          
          // Save new user to registered users
          const updatedUsers = [...registeredUsers, newUser];
          setRegisteredUsers(updatedUsers);
          localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
          
          // Preserve signup data for login form
          setPreservedSignupData({
            email: formData.email,
            name: formData.name
          });
          
          // Show success message
          setSuccessMessage('Account created successfully! Redirecting to login...');
          setShowSuccess(true);
          setTimeout(() => {
            setIsLogin(true);
            // Pre-fill login form with signup data
            setFormData({
              name: '',
              email: formData.email,
              password: formData.password,
              confirmPassword: ''
            });
            resetForm();
            setShowSuccess(false);
          }, 2000);
        }
      }
    } catch (error) {
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowSuccess(false);
    setSuccessMessage('');
  };

  const toggleMode = () => {
    if (!isLogin && preservedSignupData) {
      // Switching from signup to login - preserve signup data
      setFormData({
        name: '',
        email: preservedSignupData.email,
        password: '',
        confirmPassword: ''
      });
    } else {
      // Normal toggle - reset form
      resetForm();
    }
    
    setIsLogin(!isLogin);
    setShowSuccess(false);
    setSuccessMessage('');
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-3xl shadow-2xl mb-6 border border-white/20">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-lg text-white/80 drop-shadow">
              {isLogin 
                ? 'Sign in to access your AI Resume Analyzer' 
                : 'Join us to transform your resume with AI-powered insights'
              }
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <Alert className="mb-6 bg-green-500/20 backdrop-blur-lg text-green-100 border-green-400/30">
              <CheckCircle className="h-4 w-4 text-green-300" />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          {/* Auth Card */}
          <Card className="shadow-2xl border-0 bg-white/10 backdrop-blur-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-center text-white text-xl">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </CardTitle>
              <CardDescription className="text-center text-white/70">
                {isLogin 
                  ? 'Enter your credentials to access your account' 
                  : 'Fill in your information to create a new account'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field - Signup Only */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-white/90 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:ring-white/20"
                      disabled={isLoading || showSuccess}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-300 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/90 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:ring-white/20"
                    disabled={isLoading || showSuccess}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-300 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-white/90 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:ring-white/20 pr-10"
                      disabled={isLoading || showSuccess}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 focus:outline-none"
                      disabled={isLoading || showSuccess}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-300 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field - Signup Only */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-white/90 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:ring-white/20 pr-10"
                        disabled={isLoading || showSuccess}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 focus:outline-none"
                        disabled={isLoading || showSuccess}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-300 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                {/* General Error */}
                {errors.general && (
                  <Alert className="bg-red-500/20 backdrop-blur-lg text-red-100 border-red-400/30">
                    <AlertCircle className="h-4 w-4 text-red-300" />
                    <AlertDescription>{errors.general}</AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg"
                  disabled={isLoading || showSuccess}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {isLogin ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : showSuccess ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Redirecting...
                    </div>
                  ) : (
                    isLogin ? 'Sign In' : 'Sign Up'
                  )}
                </Button>
              </form>

              {/* Toggle Between Login/Signup */}
              <div className="mt-6 text-center">
                <p className="text-sm text-white/70">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="ml-1 text-purple-300 hover:text-purple-200 font-medium focus:outline-none"
                    disabled={isLoading || showSuccess}
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
