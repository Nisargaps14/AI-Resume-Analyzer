// Company-specific data including resume formats, interview prep, and guidelines

export interface CompanyData {
  name: string;
  logo: string;
  industry: string;
  description: string;
  resumeFormat: {
    template: string;
    downloadUrl: string;
    previewUrl: string;
    guidelines: string[];
  };
  interviewPrep: {
    questions: string[];
    technicalQuestions: string[];
    behavioralQuestions: string[];
    preparationTips: string[];
    videoResources: string[];
    studyMaterials: string[];
  };
  culture: {
    values: string[];
    workStyle: string;
    dressCode: string;
    interviewFormat: string;
  };
  applicationTips: {
    coverLetter: string[];
    followUp: string[];
    timeline: string[];
    requirements: string[];
  };
}

// Company-specific data for major tech companies
export const COMPANY_DATA: Record<string, CompanyData> = {
  'Microsoft': {
    name: 'Microsoft',
    logo: '🔷',
    industry: 'Technology',
    description: 'Leading technology company focused on software, cloud services, and devices',
    resumeFormat: {
      template: 'microsoft-resume-template.docx',
      downloadUrl: '/templates/microsoft-resume-template.docx',
      previewUrl: '/templates/microsoft-resume-preview.html',
      guidelines: [
        'Keep resume to 1-2 pages maximum',
        'Use Microsoft-specific keywords (Azure, Office 365, etc.)',
        'Highlight cloud computing and AI experience',
        'Include quantifiable achievements',
        'Use clean, professional format',
        'Add GitHub and LinkedIn profiles'
      ]
    },
    interviewPrep: {
      questions: [
        'Why do you want to work at Microsoft?',
        'Describe a challenging technical problem you solved',
        'How do you stay current with technology?',
        'Tell me about a time you had to learn a new technology quickly'
      ],
      technicalQuestions: [
        'Design a distributed system for Microsoft Teams',
        'Implement a function to detect circular dependencies',
        'Explain the difference between REST and GraphQL',
        'How would you optimize database queries?',
        'Describe microservices architecture',
        'Explain cloud design patterns'
      ],
      behavioralQuestions: [
        'Describe a time you had a conflict with a team member',
        'Tell me about a project that failed',
        'How do you handle tight deadlines?',
        'Describe your leadership style'
      ],
      preparationTips: [
        'Practice coding on whiteboard',
        'Study system design fundamentals',
        'Prepare examples using STAR method',
        'Research recent Microsoft products',
        'Understand Azure services',
        'Practice behavioral questions'
      ],
      videoResources: [
        'Microsoft Interview Preparation - Official Channel',
        'System Design Interview - Microsoft Engineer',
        'Coding Interview at Microsoft - Experiences'
      ],
      studyMaterials: [
        'Microsoft Documentation',
        'Azure Architecture Center',
        'Microsoft Engineering Blog',
        'Cracking the Coding Interview',
        'System Design Interview Guide'
      ]
    },
    culture: {
      values: ['Innovation', 'Customer Focus', 'Growth Mindset', 'Inclusion'],
      workStyle: 'Collaborative, fast-paced, results-driven',
      dressCode: 'Business casual',
      interviewFormat: 'Multiple rounds: Phone screen, Technical interview, Behavioral interview, Final interview'
    },
    applicationTips: {
      coverLetter: ['Address specific Microsoft products and values'],
      followUp: ['Send thank-you email within 24 hours'],
      timeline: ['2-4 weeks for complete process'],
      requirements: ['Bachelor\'s degree in CS or related', 'Strong coding skills', 'Cloud experience preferred']
    }
  },

  'Google': {
    name: 'Google',
    logo: '🔍',
    industry: 'Technology',
    description: 'Global technology company specializing in Internet-related services and products',
    resumeFormat: {
      template: 'google-resume-template.docx',
      downloadUrl: '/templates/google-resume-template.docx',
      previewUrl: '/templates/google-resume-preview.html',
      guidelines: [
        'Maximum 2 pages, ideally 1 page',
        'Focus on impact and scale of projects',
        'Include metrics and quantifiable results',
        'Highlight machine learning and AI experience',
        'Show open source contributions',
        'List publications and patents if any'
      ]
    },
    interviewPrep: {
      questions: [
        'Why Google?',
        'What\'s your favorite Google product and how would you improve it?',
        'Describe a time you took initiative',
        'How do you handle ambiguity?'
      ],
      technicalQuestions: [
        'Design Google Search autocomplete',
        'Implement a URL shortener',
        'Explain MapReduce architecture',
        'How does Google\'s search ranking work?',
        'Design a distributed cache system',
        'Implement a thread-safe singleton'
      ],
      behavioralQuestions: [
        'Tell me about a time you influenced someone',
        'Describe a complex problem you solved',
        'How do you handle failure?',
        'What\'s your biggest professional achievement?'
      ],
      preparationTips: [
        'Master data structures and algorithms',
        'Practice system design at scale',
        'Study Google\'s products and technologies',
        'Prepare for Googliness assessment',
        'Practice coding without IDE',
        'Research Google\'s engineering practices'
      ],
      videoResources: [
        'Google Engineering Practices',
        'Google Interview Experience - Channel',
        'System Design at Google Scale'
      ],
      studyMaterials: [
        'Google Research Papers',
        'Google Testing Blog',
        'Site Reliability Engineering Book',
        'Programming Interviews Exposed'
      ]
    },
    culture: {
      values: ['Focus on the user', 'Technical excellence', 'Innovation', 'Collaboration'],
      workStyle: 'Data-driven, innovative, collaborative',
      dressCode: 'Casual',
      interviewFormat: 'Phone screen, On-site interviews (4-6), Hiring committee review'
    },
    applicationTips: {
      coverLetter: ['Focus on impact and innovation'],
      followUp: ['Patience is key due to high volume'],
      timeline: ['4-8 weeks typical'],
      requirements: ['Strong CS fundamentals', 'Exceptional problem-solving skills']
    }
  },

  'Amazon': {
    name: 'Amazon',
    logo: '📦',
    industry: 'E-commerce & Cloud',
    description: 'Global e-commerce and cloud computing company',
    resumeFormat: {
      template: 'amazon-resume-template.docx',
      downloadUrl: '/templates/amazon-resume-template.docx',
      previewUrl: '/templates/amazon-resume-preview.html',
      guidelines: [
        'Highlight AWS experience prominently',
        'Use customer-obsessed language',
        'Include scalability and performance metrics',
        'Show leadership principles examples',
        'Focus on business impact',
        'Keep it concise and data-driven'
      ]
    },
    interviewPrep: {
      questions: [
        'Tell me about a time you disagreed with your manager',
        'Describe a time you had to make a quick decision',
        'How do you ensure customer obsession?',
        'Tell me about your most complex project'
      ],
      technicalQuestions: [
        'Design Amazon\'s shopping cart',
        'Implement a rate limiter',
        'Explain AWS services architecture',
        'How would you handle system failures?',
        'Design a distributed inventory system',
        'Implement a load balancer'
      ],
      behavioralQuestions: [
        'Tell me about a time you invented something',
        'Describe a time you took a calculated risk',
        'How do you handle competing priorities?',
        'Tell me about a time you had to work with difficult people'
      ],
      preparationTips: [
        'Master Amazon Leadership Principles',
        'Practice STAR method for behavioral questions',
        'Study AWS services thoroughly',
        'Prepare system design questions',
        'Practice coding under pressure',
        'Research Amazon\'s business model'
      ],
      videoResources: [
        'Amazon Leadership Principles Explained',
        'AWS Architecture Best Practices',
        'Amazon Interview Preparation Guide'
      ],
      studyMaterials: [
        'AWS Documentation',
        'Amazon Leadership Principles',
        'The Amazon Way book',
        'Designing Data-Intensive Applications'
      ]
    },
    culture: {
      values: ['Customer Obsession', 'Ownership', 'Invent and Simplify', 'Learn and Be Curious'],
      workStyle: 'Fast-paced, customer-focused, data-driven',
      dressCode: 'Business casual',
      interviewFormat: 'Phone screen, On-site loop (5-6 interviews), Bar raiser interview'
    },
    applicationTips: {
      coverLetter: ['Emphasize customer impact and leadership principles'],
      followUp: ['Professional and concise follow-up'],
      timeline: ['3-6 weeks typical'],
      requirements: ['Strong problem-solving', 'Customer focus', 'AWS knowledge']
    }
  },

  'TCS': {
    name: 'TCS',
    logo: '💼',
    industry: 'IT Services',
    description: 'Leading global IT services, consulting and business solutions organization',
    resumeFormat: {
      template: 'tcs-resume-template.docx',
      downloadUrl: '/templates/tcs-resume.docx',
      previewUrl: '/templates/tcs-resume-preview.png',
      guidelines: [
        'Include academic achievements prominently',
        'Highlight certifications and trainings',
        'Show project experience with technologies',
        'Add internship details',
        'Include extracurricular activities',
        'Keep format professional and traditional'
      ]
    },
    interviewPrep: {
      questions: [
        'Why do you want to join TCS?',
        'What do you know about TCS?',
        'Describe your final year project',
        'Where do you see yourself in 5 years?'
      ],
      technicalQuestions: [
        'Explain OOP concepts',
        'What is the difference between SQL and NoSQL?',
        'Describe software development lifecycle',
        'What is REST API?',
        'Explain database normalization',
        'What is cloud computing?'
      ],
      behavioralQuestions: [
        'Describe a team project experience',
        'How do you handle pressure?',
        'Tell me about your strengths and weaknesses',
        'Why should we hire you?'
      ],
      preparationTips: [
        'Study basic computer science concepts',
        'Practice programming fundamentals',
        'Research TCS services and clients',
        'Prepare for aptitude test',
        'Practice communication skills',
        'Review academic projects'
      ],
      videoResources: [
        'TCS Interview Experience',
        'TCS Campus Recruitment Process',
        'TCS Technical Interview Questions'
      ],
      studyMaterials: [
        'TCS Official Website',
        'TCS Ion Learning Platform',
        'Programming Fundamentals',
        'Aptitude Preparation Materials'
      ]
    },
    culture: {
      values: ['Integrity', 'Excellence', 'Purpose-led', 'Agility'],
      workStyle: 'Structured, process-oriented, collaborative',
      dressCode: 'Formal',
      interviewFormat: 'Aptitude test, Technical interview, HR interview'
    },
    applicationTips: {
      coverLetter: ['Professional and formal tone'],
      followUp: ['Polite follow-up after 1 week'],
      timeline: ['2-4 weeks for campus, 4-8 weeks for lateral'],
      requirements: ['Good academic record', 'Basic programming skills']
    }
  },

  'Infosys': {
    name: 'Infosys',
    logo: '🏢',
    industry: 'IT Services',
    description: 'Global leader in consulting, technology, and next-generation services',
    resumeFormat: {
      template: 'infosys-resume-template.docx',
      downloadUrl: '/templates/infosys-resume.docx',
      previewUrl: '/templates/infosys-resume-preview.png',
      guidelines: [
        'Include technical skills section',
        'Highlight certifications and training',
        'Show project lifecycle experience',
        'Add academic achievements',
        'Include communication skills',
        'Format should be clean and readable'
      ]
    },
    interviewPrep: {
      questions: [
        'Why Infosys?',
        'What do you know about Infosys?',
        'Describe your technical skills',
        'Are you willing to relocate?'
      ],
      technicalQuestions: [
        'What is programming?',
        'Explain database concepts',
        'What is software testing?',
        'Describe web technologies',
        'What are SDLC phases?',
        'Explain networking basics'
      ],
      behavioralQuestions: [
        'Tell me about yourself',
        'Why should we hire you?',
        'Describe your strengths',
        'How do you handle deadlines?'
      ],
      preparationTips: [
        'Study basic programming concepts',
        'Practice aptitude questions',
        'Research Infosys business areas',
        'Prepare for HR questions',
        'Practice English communication',
        'Review academic subjects'
      ],
      videoResources: [
        'Infosys Interview Process',
        'Infosys Campus Recruitment',
        'Infosys Technical Interview'
      ],
      studyMaterials: [
        'Infosys Learning Platform',
        'Technical Fundamentals',
        'Aptitude Test Preparation',
        'Communication Skills Guide'
      ]
    },
    culture: {
      values: ['Client Value', 'Leadership by Example', 'Integrity', 'Teamwork'],
      workStyle: 'Professional, structured, client-focused',
      dressCode: 'Business formal',
      interviewFormat: 'Aptitude test, Technical interview, HR interview'
    },
    applicationTips: {
      coverLetter: ['Professional and client-focused'],
      followUp: ['Formal follow-up after interview'],
      timeline: ['3-6 weeks typical'],
      requirements: ['Strong academic background', 'Communication skills']
    }
  }
};

// Get company data by name
export function getCompanyData(companyName: string): CompanyData | null {
  return COMPANY_DATA[companyName] || null;
}

// Get all available companies
export function getAllCompanies(): CompanyData[] {
  return Object.values(COMPANY_DATA);
}

// Search companies by industry or keywords
export function searchCompanies(query: string): CompanyData[] {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(COMPANY_DATA).filter(company => 
    company.name.toLowerCase().includes(lowercaseQuery) ||
    company.industry.toLowerCase().includes(lowercaseQuery) ||
    company.description.toLowerCase().includes(lowercaseQuery)
  );
}
