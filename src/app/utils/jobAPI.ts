// Real-time job API integration
// Using multiple job APIs to get current hiring data

interface JobAPI {
  id: string;
  company: string;
  title: string;
  location: string;
  salary: string;
  experience: 'fresher' | 'experienced' | 'both';
  description: string;
  requirements: string[];
  postedDate: string;
  logo: string;
  rating: number;
  applicants: number;
  isActive: boolean;
  source: string;
  jobUrl: string;
}

// API configurations
const API_CONFIGS = {
  // RapidAPI - Job Search API
  rapidAPI: {
    host: 'jsearch.p.rapidapi.com',
    key: (globalThis as any).VITE_RAPIDAPI_KEY || 'your-api-key-here'
  },
  
  // Adzuna Job API
  adzuna: {
    appId: (globalThis as any).VITE_ADZUNA_APP_ID || 'your-app-id',
    appKey: (globalThis as any).VITE_ADZUNA_APP_KEY || 'your-app-key'
  },
  
  // GitHub Jobs API (free)
  github: {
    url: 'https://jobs.github.com/positions.json'
  }
};

// Fetch jobs from multiple APIs
export async function fetchRealTimeJobs(filters: {
  location?: string;
  experience?: string;
  keywords?: string;
} = {}): Promise<JobAPI[]> {
  try {
    // Try to fetch real data from GitHub Jobs API (free and reliable)
    const githubJobs = await fetchGitHubJobs(filters);
    
    if (githubJobs.length > 0) {
      console.log('Using real GitHub Jobs data');
      return githubJobs;
    }
    
    // Fallback to mock data if GitHub fails
    console.log('GitHub Jobs failed, using mock data');
    return getMockJobs();
    
  } catch (error) {
    console.error('Error fetching real-time jobs:', error);
    // Fallback to mock data if APIs fail
    return getMockJobs();
  }
}

// RapidAPI JSearch integration
async function fetchRapidAPIJobs(filters: any): Promise<JobAPI[]> {
  try {
    const url = new URL('https://jsearch.p.rapidapi.com/search');
    
    // Add query parameters
    if (filters.location) url.searchParams.append('location', filters.location);
    if (filters.keywords) url.searchParams.append('query', filters.keywords);
    url.searchParams.append('page', '1');
    url.searchParams.append('num_pages', '10');
    url.searchParams.append('date_posted', 'all');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_CONFIGS.rapidAPI.key,
        'X-RapidAPI-Host': API_CONFIGS.rapidAPI.host
      }
    });

    if (!response.ok) throw new Error('RapidAPI request failed');
    
    const data = await response.json();
    return transformRapidAPIData(data.data || []);
    
  } catch (error) {
    console.error('RapidAPI error:', error);
    return [];
  }
}

// Adzuna API integration
async function fetchAdzunaJobs(filters: any): Promise<JobAPI[]> {
  try {
    const { location, keywords } = filters;
    const country = location?.toLowerCase().includes('india') ? 'in' : 'us';
    const searchTerm = keywords || 'developer';
    
    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${API_CONFIGS.adzuna.appId}&app_key=${API_CONFIGS.adzuna.appKey}&results_per_page=20&what=${searchTerm}&content-type=application/json`;

    const response = await fetch(url);
    
    if (!response.ok) throw new Error('Adzuna request failed');
    
    const data = await response.json();
    return transformAdzunaData(data.results || []);
    
  } catch (error) {
    console.error('Adzuna error:', error);
    return [];
  }
}

// GitHub Jobs API (free)
async function fetchGitHubJobs(filters: any): Promise<JobAPI[]> {
  try {
    // Using Remotive API with mixed job categories
    let url = 'https://remotive.com/api/remote-jobs?limit=30';
    
    // Search for various job types if no specific keywords
    if (filters.keywords) {
      url += `&search=${encodeURIComponent(filters.keywords)}`;
    }

    const response = await fetch(url);
    
    if (!response.ok) throw new Error('GitHub Jobs request failed');
    
    const data = await response.json();
    const jobs = transformGitHubJobsData(data.jobs || []);
    
    // Return all jobs (both IT and non-IT) for variety
    return jobs;
    
  } catch (error) {
    console.error('GitHub Jobs error:', error);
    return [];
  }
}

// Transform RapidAPI data to our format
function transformRapidAPIData(jobs: any[]): JobAPI[] {
  return jobs.map(job => ({
    id: `rapid-${job.id}`,
    company: job.employer_name || 'Unknown Company',
    title: job.job_title || 'Unknown Position',
    location: job.job_city || 'Remote',
    salary: job.job_min_salary || job.job_max_salary 
      ? `${job.job_min_salary || ''}-${job.job_max_salary || ''}` 
      : 'Competitive',
    experience: determineExperienceLevel(job.job_description, job.job_title),
    description: job.job_description || '',
    requirements: extractRequirements(job.job_description),
    postedDate: job.job_posted_datetime || new Date().toISOString(),
    logo: getCompanyLogo(job.employer_name),
    rating: 4.0 + Math.random() * 0.9, // Mock rating
    applicants: Math.floor(Math.random() * 1000) + 50,
    isActive: true,
    source: 'RapidAPI',
    jobUrl: job.job_apply_link || '#'
  }));
}

// Transform Adzuna data to our format
function transformAdzunaData(jobs: any[]): JobAPI[] {
  return jobs.map(job => ({
    id: `adzuna-${job.id}`,
    company: job.company.display_name || 'Unknown Company',
    title: job.title || 'Unknown Position',
    location: `${job.location.area?.[0] || 'Remote'}, ${job.location.area?.[2] || ''}`,
    salary: job.salary_min || job.salary_max 
      ? `${job.salary_min || ''}-${job.salary_max || ''}` 
      : 'Competitive',
    experience: determineExperienceLevel(job.description, job.title),
    description: job.description || '',
    requirements: extractRequirements(job.description),
    postedDate: job.created || new Date().toISOString(),
    logo: getCompanyLogo(job.company.display_name),
    rating: 4.0 + Math.random() * 0.9,
    applicants: Math.floor(Math.random() * 1000) + 50,
    isActive: true,
    source: 'Adzuna',
    jobUrl: job.redirect_url || '#'
  }));
}

// Transform GitHub Jobs data to our format
function transformGitHubJobsData(jobs: any[]): JobAPI[] {
  return jobs.map(job => ({
    id: `github-${job.id}`,
    company: job.company || 'Unknown Company',
    title: job.title || 'Unknown Position',
    location: job.location || 'Remote',
    salary: 'Competitive',
    experience: determineExperienceLevel(job.description, job.title),
    description: job.description || '',
    requirements: extractRequirements(job.description),
    postedDate: job.created_at || new Date().toISOString(),
    logo: getCompanyLogo(job.company),
    rating: 4.0 + Math.random() * 0.9,
    applicants: Math.floor(Math.random() * 500) + 20,
    isActive: true,
    source: 'GitHub Jobs',
    jobUrl: job.url || '#'
  }));
}

// Helper functions
function determineExperienceLevel(description: string, title: string): 'fresher' | 'experienced' | 'both' {
  const text = (description + ' ' + title).toLowerCase();
  
  const fresherKeywords = ['junior', 'entry', 'fresher', 'intern', 'trainee', 'graduate'];
  const experiencedKeywords = ['senior', 'lead', 'principal', 'expert', 'manager', 'head'];
  
  const hasFresher = fresherKeywords.some(keyword => text.includes(keyword));
  const hasExperienced = experiencedKeywords.some(keyword => text.includes(keyword));
  
  if (hasFresher && !hasExperienced) return 'fresher';
  if (hasExperienced && !hasFresher) return 'experienced';
  return 'both';
}

function extractRequirements(description: string): string[] {
  const requirements: string[] = [];
  
  // Common tech skills patterns
  const techPatterns = [
    /react|reactjs/gi,
    /javascript|js/gi,
    /typescript|ts/gi,
    /python/gi,
    /java/gi,
    /node\.?js/gi,
    /html|css/gi,
    /sql/gi,
    /aws|azure|gcp/gi,
    /docker|kubernetes/gi,
    /git/gi,
    /api/gi,
    /mongodb|postgresql|mysql/gi
  ];
  
  techPatterns.forEach(pattern => {
    const matches = description.match(pattern);
    if (matches) {
      requirements.push(...matches.map(m => m.toLowerCase()));
    }
  });
  
  // Remove duplicates and return
  return [...new Set(requirements)].slice(0, 10);
}

function getCompanyLogo(companyName: string): string {
  const logos: { [key: string]: string } = {
    'microsoft': '🔷',
    'google': '🔍',
    'amazon': '📦',
    'apple': '🍎',
    'facebook': '📘',
    'meta': '📘',
    'netflix': '🎬',
    'linkedin': '💼',
    'tcs': '💼',
    'infosys': '🏢',
    'wipro': '🌐',
    'hcl': '🔷',
    'accenture': '🎯',
    'deloitte': '💎',
    'ibm': '🔵',
    'oracle': '🟠',
    'salesforce': '☁️',
    'adobe': '🔴',
    'spotify': '🎵',
    'uber': '🚗',
    'airbnb': '🏠'
  };
  
  const name = companyName?.toLowerCase() || '';
  return logos[name] || '🏢';
}

function removeDuplicates(jobs: JobAPI[]): JobAPI[] {
  const seen = new Set();
  return jobs.filter(job => {
    const key = `${job.company}-${job.title}-${job.location}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Mock jobs for demonstration
function getMockJobs(): JobAPI[] {
  return [
    // IT/Technology Jobs
    {
      id: 'microsoft-1',
      company: 'Microsoft',
      title: 'Frontend Developer',
      location: 'Bangalore, India',
      salary: '₹15-25 LPA',
      experience: 'experienced',
      description: 'We are looking for a skilled Frontend Developer with expertise in React, TypeScript, and modern web technologies to join our Azure team.',
      requirements: ['React', 'TypeScript', 'CSS3', 'JavaScript', 'Git', 'REST APIs', 'Azure'],
      postedDate: '2 hours ago',
      logo: '🔷',
      rating: 4.5,
      applicants: 234,
      isActive: true,
      source: 'Mock Data',
      jobUrl: 'https://careers.microsoft.com'
    },
    {
      id: 'google-1',
      company: 'Google',
      title: 'Software Engineer',
      location: 'Hyderabad, India',
      salary: '₹20-35 LPA',
      experience: 'experienced',
      description: 'Join our team to build innovative solutions that impact billions of users worldwide. Work on cutting-edge search and AI technologies.',
      requirements: ['Python', 'Java', 'Data Structures', 'Algorithms', 'System Design', 'Cloud', 'Machine Learning'],
      postedDate: '5 hours ago',
      logo: '🔍',
      rating: 4.7,
      applicants: 567,
      isActive: true,
      source: 'Mock Data',
      jobUrl: 'https://careers.google.com'
    },
    {
      id: 'amazon-1',
      company: 'Amazon',
      title: 'Full Stack Developer',
      location: 'Pune, India',
      salary: '₹12-20 LPA',
      experience: 'both',
      description: 'Looking for talented developers to work on cutting-edge e-commerce solutions and AWS services. Customer-obsessed mindset required.',
      requirements: ['React', 'Node.js', 'AWS', 'MongoDB', 'JavaScript', 'TypeScript', 'Distributed Systems'],
      postedDate: '1 day ago',
      logo: '📦',
      rating: 4.3,
      applicants: 189,
      isActive: true,
      source: 'Mock Data',
      jobUrl: 'https://www.amazon.jobs'
    },

    // Non-IT Jobs
    {
      id: 'salesforce-1',
      company: 'Salesforce',
      title: 'Sales Manager',
      location: 'Mumbai, India',
      salary: '₹8-15 LPA',
      experience: 'experienced',
      description: 'Seeking experienced Sales Manager to lead our enterprise sales team and drive business growth in the CRM sector.',
      requirements: ['Sales', 'CRM', 'Communication', 'Leadership', 'Negotiation', 'Business Development'],
      postedDate: '3 hours ago',
      logo: '☁️',
      rating: 4.2,
      applicants: 156,
      isActive: true,
      source: 'Mock Data',
      jobUrl: 'https://careers.salesforce.com'
    },
    {
      id: 'hdfc-1',
      company: 'HDFC Bank',
      title: 'Relationship Manager',
      location: 'Delhi, India',
      salary: '₹6-10 LPA',
      experience: 'both',
      description: 'Looking for Relationship Managers to handle client relationships and promote banking products.',
      requirements: ['Banking', 'Customer Service', 'Sales', 'Communication', 'Financial Products'],
      postedDate: '4 hours ago',
      logo: '🏦',
      rating: 3.9,
      applicants: 892,
      isActive: true,
      source: 'Mock Data',
      jobUrl: 'https://careers.hdfcbank.com'
    },
    {
      id: 'unilever-1',
      company: 'Unilever',
      title: 'Marketing Manager',
      location: 'Bangalore, India',
      salary: '₹10-18 LPA',
      experience: 'experienced',
      description: 'Join our marketing team to develop and execute brand strategies for consumer products.',
      requirements: ['Marketing', 'Brand Management', 'Digital Marketing', 'Analytics', 'Campaign Management'],
      postedDate: '6 hours ago',
      logo: '🧴',
      rating: 4.1,
      applicants: 234,
      isActive: true,
      source: 'Mock Data',
      jobUrl: 'https://careers.unilever.com'
    },
    {
      id: 'taj-1',
      company: 'Taj Hotels',
      title: 'Guest Relations Executive',
      location: 'Mumbai, India',
      salary: '₹4-7 LPA',
      experience: 'fresher',
      description: 'Looking for fresh graduates to join our hospitality team and provide excellent guest experiences.',
      requirements: ['Hospitality', 'Customer Service', 'Communication', 'Problem Solving', 'Languages'],
      postedDate: '1 day ago',
      logo: '🏨',
      rating: 4.0,
      applicants: 567,
      isActive: true,
      source: 'Mock Data',
      jobUrl: 'https://careers.tajhotels.com'
    },
    {
      id: 'byjus-1',
      company: 'BYJU\'S',
      title: 'Content Developer',
      location: 'Bangalore, India',
      salary: '₹5-9 LPA',
      experience: 'both',
      description: 'Seeking content developers to create educational content for K-12 students.',
      requirements: ['Content Writing', 'Education', 'Subject Matter Expertise', 'Creative Writing', 'Research'],
      postedDate: '2 days ago',
      logo: '📚',
      rating: 3.8,
      applicants: 445,
      isActive: true,
      source: 'Mock Data',
      jobUrl: 'https://careers.byjus.com'
    },
    {
      id: 'reliance-1',
      company: 'Reliance Retail',
      title: 'Store Manager',
      location: 'Hyderabad, India',
      salary: '₹7-12 LPA',
      experience: 'experienced',
      description: 'Looking for experienced Store Managers to oversee retail operations and team management.',
      requirements: ['Retail Management', 'Team Leadership', 'Inventory', 'Customer Service', 'Sales'],
      postedDate: '5 hours ago',
      logo: '🏪',
      rating: 3.7,
      applicants: 678,
      isActive: true,
      source: 'Mock Data',
      jobUrl: 'https://careers.relianceretail.com'
    },
    {
      id: 'apollo-1',
      company: 'Apollo Hospitals',
      title: 'Healthcare Administrator',
      location: 'Chennai, India',
      salary: '₹8-14 LPA',
      experience: 'experienced',
      description: 'Seeking healthcare administrators to manage hospital operations and patient services.',
      requirements: ['Healthcare Management', 'Administration', 'Patient Care', 'Operations', 'Medical Knowledge'],
      postedDate: '3 days ago',
      logo: '🏥',
      rating: 4.2,
      applicants: 289,
      isActive: true,
      source: 'Mock Data',
      jobUrl: 'https://careers.apollohospitals.com'
    },
    {
      id: 'zomato-1',
      company: 'Zomato',
      title: 'Business Development Executive',
      location: 'Delhi, India',
      salary: '₹6-10 LPA',
      experience: 'both',
      description: 'Looking for BDE executives to expand restaurant partnerships and drive business growth.',
      requirements: ['Business Development', 'Sales', 'Partnership', 'Negotiation', 'Market Research'],
      postedDate: '4 hours ago',
      logo: '🍽️',
      rating: 3.9,
      applicants: 734,
      isActive: true,
      source: 'Mock Data',
      jobUrl: 'https://careers.zomato.com'
    }
  ];
}

// Fallback jobs when APIs fail
function getFallbackJobs(): JobAPI[] {
  return [
    {
      id: 'fallback-1',
      company: 'Tech Startup',
      title: 'Full Stack Developer',
      location: 'Bangalore, India',
      salary: '₹12-20 LPA',
      experience: 'both',
      description: 'Looking for talented developers to join our growing team...',
      requirements: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
      postedDate: new Date().toISOString(),
      logo: '🚀',
      rating: 4.2,
      applicants: 156,
      isActive: true,
      source: 'Fallback',
      jobUrl: '#'
    }
  ];
}

// Export utility functions
export { JobAPI };
