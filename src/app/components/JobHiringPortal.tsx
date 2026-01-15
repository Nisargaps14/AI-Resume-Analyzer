import React, { useState, useEffect } from 'react';
import { Building2, MapPin, DollarSign, Clock, Users, Briefcase, TrendingUp, Filter, Search, ExternalLink, Star, CheckCircle, AlertCircle, Target, RefreshCw, Bell, Sparkles, Download, Eye, FileText, BookOpen, Video, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { calculateCosineSimilarity, extractKeywords, findMissingKeywords } from '../utils/nlp';
import { fetchRealTimeJobs, JobAPI } from '../utils/jobAPI';
import { RealTimeStatus } from './RealTimeStatus';
import { CompanyDetailsModal } from './CompanyDetailsModal';
import { ResumePreview } from './ResumePreview';
import { getCompanyData } from '../utils/companyData';

interface JobAnalysis {
  atsScore: number;
  matchScore: number;
  missingKeywords: string[];
  matchedKeywords: string[];
  interviewQuestions: string[];
  strengths: string[];
  improvements: string[];
}

interface JobHiringPortalProps {
  resumeText?: string;
  extractedData?: any;
}

export function JobHiringPortal({ resumeText, extractedData }: JobHiringPortalProps) {
  const [jobs, setJobs] = useState<JobAPI[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobAPI[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobAPI | null>(null);
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [jobAnalysis, setJobAnalysis] = useState<JobAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState('browse');
  const [newJobsCount, setNewJobsCount] = useState(0);
  const [showNewJobsBadge, setShowNewJobsBadge] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showResumePreview, setShowResumePreview] = useState(false);
  const [selectedCompanyForResume, setSelectedCompanyForResume] = useState<string>('');

  // Fetch real-time jobs on component mount
  useEffect(() => {
    loadRealTimeJobs();
    
    // Set up auto-refresh every 2 minutes for more frequent updates
    const interval = setInterval(loadRealTimeJobs, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Load real-time jobs
  const loadRealTimeJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const filters = {
        location: locationFilter !== 'all' ? locationFilter : undefined,
        experience: experienceFilter !== 'all' ? experienceFilter : undefined,
        keywords: searchTerm || undefined
      };
      
      const realJobs = await fetchRealTimeJobs(filters);
      
      // Check for new jobs and show notification
      if (jobs.length > 0 && realJobs.length > jobs.length) {
        const newJobsCount = realJobs.length - jobs.length;
        setNewJobsCount(newJobsCount);
        setShowNewJobsBadge(true);
        
        // Hide badge after 5 seconds
        setTimeout(() => {
          setShowNewJobsBadge(false);
          setNewJobsCount(0);
        }, 5000);
        
        console.log(`🎉 ${newJobsCount} new jobs found!`);
      }
      
      setJobs(realJobs);
      setFilteredJobs(realJobs);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading real-time jobs:', error);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  // Filter jobs based on criteria
  useEffect(() => {
    let filtered = jobs;

    // Experience filter
    if (experienceFilter !== 'all') {
      filtered = filtered.filter(job => 
        job.experience === experienceFilter || job.experience === 'both'
      );
    }

    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, experienceFilter, locationFilter, searchTerm]);

  // Company-specific functions
  const handleCompanyDetails = (companyName: string) => {
    const companyData = getCompanyData(companyName);
    if (companyData) {
      setSelectedCompany(companyData);
      setShowCompanyModal(true);
    }
  };

  const handleDownloadResume = (companyName: string) => {
    const companyData = getCompanyData(companyName);
    if (companyData) {
      // Simulate download
      const link = document.createElement('a');
      link.href = companyData.resumeFormat.downloadUrl;
      link.download = companyData.resumeFormat.template;
      link.click();
    }
  };

  const handleViewResume = (companyName: string) => {
    setSelectedCompanyForResume(companyName);
    setShowResumePreview(true);
  };

  const handleDownloadResumeFromPreview = () => {
    const companyData = getCompanyData(selectedCompanyForResume);
    if (companyData) {
      // Simulate download
      const link = document.createElement('a');
      link.href = companyData.resumeFormat.downloadUrl;
      link.download = companyData.resumeFormat.template;
      link.click();
    }
  };

  const analyzeJobMatch = async (job: JobAPI) => {
    if (!resumeText) {
      alert('Please upload your resume first to get analysis');
      return;
    }

    setIsAnalyzing(true);
    setSelectedJob(job);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Calculate match score
    const matchScore = Math.round(calculateCosineSimilarity(resumeText, job.description) * 100);
    
    // Calculate ATS score (mock calculation)
    const atsScore = Math.min(95, Math.max(40, matchScore + Math.floor(Math.random() * 15)));

    // Extract keywords
    const resumeKeywords = extractKeywords(resumeText, 50);
    const jobKeywords = extractKeywords(job.description, 30);
    const missingKeywords = findMissingKeywords(resumeText, job.description);
    const matchedKeywords = jobKeywords.filter(k => resumeKeywords.includes(k));

    // Generate interview questions based on job requirements
    const interviewQuestions = job.requirements.slice(0, 5).map((req: string) => {
      const questions = [
        `Can you explain your experience with ${req}?`,
        `How have you used ${req} in your previous projects?`,
        `What challenges have you faced while working with ${req}?`,
        `Describe a project where you implemented ${req}.`
      ];
      return questions[Math.floor(Math.random() * questions.length)];
    });

    // Generate strengths and improvements
    const strengths = matchedKeywords.slice(0, 3).map(keyword => 
      `Strong match found for ${keyword} in your resume`
    );

    const improvements = missingKeywords.slice(0, 3).map(keyword => 
      `Consider adding experience with ${keyword} to improve your match`
    );

    setJobAnalysis({
      atsScore,
      matchScore,
      missingKeywords: missingKeywords.slice(0, 10),
      matchedKeywords: matchedKeywords.slice(0, 10),
      interviewQuestions,
      strengths,
      improvements
    });

    setIsAnalyzing(false);
    setActiveTab('analysis');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Job Hiring Portal
              {showNewJobsBadge && (
                <Badge className="bg-green-500 text-white animate-pulse">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {newJobsCount} new jobs!
                </Badge>
              )}
            </h2>
            <p className="text-gray-600">Discover real-time job opportunities and get personalized analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
              {filteredJobs.filter(j => j.isActive).length} Active Jobs
            </Badge>
            <p className="text-xs text-gray-500 mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
            <RealTimeStatus 
              isUpdating={isLoadingJobs}
              lastUpdate={lastUpdated}
              updateInterval={120}
            />
          </div>
          <Button 
            onClick={loadRealTimeJobs} 
            disabled={isLoadingJobs}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingJobs ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
          <TabsTrigger value="analysis" disabled={!jobAnalysis}>
            Job Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search jobs, skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Experience Level</label>
                  <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="fresher">Fresher</SelectItem>
                      <SelectItem value="experienced">Experienced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setExperienceFilter('all');
                      setLocationFilter('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Listings */}
          {isLoadingJobs ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Fetching real-time jobs...</p>
                <p className="text-sm text-gray-500">Checking multiple job sources</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{job.logo}</div>
                        <div>
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          <CardDescription className="font-medium text-gray-700">
                            {job.company}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{job.rating}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {job.source}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        job.experience === 'fresher' ? 'secondary' :
                        job.experience === 'experienced' ? 'default' : 'outline'
                      }>
                        {job.experience === 'both' ? 'Any Experience' : job.experience}
                      </Badge>
                      <Badge variant="outline" className="text-green-600">
                        {job.applicants} applicants
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {job.postedDate}
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Company-specific actions */}
                    {getCompanyData(job.company) && (
                      <div className="border-t pt-3 mt-3">
                        <p className="text-xs font-medium text-gray-700 mb-2">Company Resources:</p>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCompanyDetails(job.company)}
                            className="flex items-center gap-1 text-xs"
                          >
                            <BookOpen className="w-3 h-3" />
                            Details
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadResume(job.company)}
                            className="flex items-center gap-1 text-xs"
                          >
                            <Download className="w-3 h-3" />
                            Resume
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewResume(job.company)}
                            className="flex items-center gap-1 text-xs"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 mt-3">
                      <Button 
                        onClick={() => analyzeJobMatch(job)}
                        disabled={isAnalyzing}
                        className="flex-1"
                      >
                        {isAnalyzing && selectedJob?.id === job.id ? 'Analyzing...' : 'Analyze Match'}
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href={job.jobUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {selectedJob && jobAnalysis ? (
            <>
              {/* Job Details */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{selectedJob.logo}</div>
                    <div>
                      <CardTitle className="text-xl">{selectedJob.title}</CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-700">
                        {selectedJob.company}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{selectedJob.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{selectedJob.applicants} applicants</span>
                    </div>
                  </div>
                  <p className="text-gray-600">{selectedJob.description}</p>
                </CardContent>
              </Card>

              {/* Analysis Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Scores */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Match Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Resume Match Score</span>
                        <span className={`font-bold ${getScoreColor(jobAnalysis.matchScore)}`}>
                          {jobAnalysis.matchScore}%
                        </span>
                      </div>
                      <Progress value={jobAnalysis.matchScore} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">ATS Compatibility Score</span>
                        <span className={`font-bold ${getScoreColor(jobAnalysis.atsScore)}`}>
                          {jobAnalysis.atsScore}%
                        </span>
                      </div>
                      <Progress value={jobAnalysis.atsScore} className="h-2" />
                    </div>

                    <div className={`p-3 rounded-lg ${getScoreBgColor(Math.max(jobAnalysis.matchScore, jobAnalysis.atsScore))}`}>
                      <div className="flex items-center gap-2">
                        {Math.max(jobAnalysis.matchScore, jobAnalysis.atsScore) >= 70 ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <AlertCircle className="w-5 h-5" />
                        )}
                        <span className="font-medium">
                          {Math.max(jobAnalysis.matchScore, jobAnalysis.atsScore) >= 70 
                            ? 'Strong Candidate' 
                            : 'Needs Improvement'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Keywords */}
                <Card>
                  <CardHeader>
                    <CardTitle>Keyword Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-green-600 mb-2">
                        Matched Keywords ({jobAnalysis.matchedKeywords.length})
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {jobAnalysis.matchedKeywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-red-600 mb-2">
                        Missing Keywords ({jobAnalysis.missingKeywords.length})
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {jobAnalysis.missingKeywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Interview Questions */}
              <Card>
                <CardHeader>
                  <CardTitle>Expected Interview Questions</CardTitle>
                  <CardDescription>
                    Based on job requirements and your resume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {jobAnalysis.interviewQuestions.map((question, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-sm">{question}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Your Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {jobAnalysis.strengths.map((strength, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-600">Improvement Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {jobAnalysis.improvements.map((improvement, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  No Job Analysis Available
                </h3>
                <p className="text-gray-500">
                  Select a job from the browse tab to see detailed analysis
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Company Details Modal */}
      {selectedCompany && (
        <CompanyDetailsModal
          company={selectedCompany}
          isOpen={showCompanyModal}
          onClose={() => setShowCompanyModal(false)}
        />
      )}

      {/* Resume Preview Modal */}
      <ResumePreview
        company={selectedCompanyForResume}
        templateName={`${selectedCompanyForResume} Resume Template`}
        isOpen={showResumePreview}
        onClose={() => setShowResumePreview(false)}
        onDownload={handleDownloadResumeFromPreview}
        previewUrl={getCompanyData(selectedCompanyForResume)?.resumeFormat.previewUrl}
      />
    </div>
  );
}
