// NLP Utility Functions for Resume Analysis
import { removeStopwords } from 'stopword';

export interface ExtractedData {
  skills: string[];
  education: string[];
  experience: string[];
  keywords: string[];
  emails: string[];
  phones: string[];
  summary: string;
  keywordAnalysis?: {
    found: string[];
    missing: string[];
  };
}

// Common tech skills database
const TECH_SKILLS = [
  // Programming Languages
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'ruby', 'go', 'rust', 'php', 'swift', 'kotlin', 'scala',
  // Frameworks & Libraries
  'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask', 'spring', 'asp.net', 'laravel',
  // Databases
  'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'cassandra', 'oracle',
  // Cloud & DevOps
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git', 'ci/cd', 'terraform', 'ansible',
  // Data & ML
  'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'pandas', 'numpy', 'scikit-learn', 'nlp',
  // Other
  'agile', 'scrum', 'rest api', 'graphql', 'microservices', 'testing', 'jest', 'junit', 'selenium'
];

// Extract email addresses
export function extractEmails(text: string): string[] {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/gi;
  return text.match(emailRegex) || [];
}

// Extract phone numbers
export function extractPhones(text: string): string[] {
  const phoneRegex = /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  return text.match(phoneRegex) || [];
}

// Extract skills using pattern matching and predefined skill list
export function extractSkills(text: string): string[] {
  const lowerText = text.toLowerCase();
  const foundSkills = new Set<string>();

  // Match against known skills
  TECH_SKILLS.forEach(skill => {
    const skillRegex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    if (skillRegex.test(lowerText)) {
      foundSkills.add(skill.toLowerCase());
    }
  });

  // Extract capitalized words (potential skills/technologies)
  const capitalizedWords = text.match(/\b[A-Z][a-zA-Z+#.]{2,}\b/g) || [];
  capitalizedWords.forEach(word => {
    if (word.length > 2 && !['The', 'And', 'For', 'With', 'From', 'That', 'This'].includes(word)) {
      foundSkills.add(word);
    }
  });

  return Array.from(foundSkills);
}

// Extract education information
export function extractEducation(text: string): string[] {
  const education: string[] = [];
  const degrees = ['bachelor', 'master', 'phd', 'mba', 'bsc', 'msc', 'ba', 'ma', 'mca', 'bca', 'b.tech', 'm.tech'];
  const universities = text.match(/university|institute|college|school/gi);
  
  const lines = text.split('\n');
  lines.forEach(line => {
    const lowerLine = line.toLowerCase();
    if (degrees.some(deg => lowerLine.includes(deg)) || (universities && line.length < 200)) {
      if (line.trim().length > 10) {
        education.push(line.trim());
      }
    }
  });

  return education.slice(0, 5); // Return max 5 education entries
}

// Extract work experience
export function extractExperience(text: string): string[] {
  const experience: string[] = [];
  const jobTitles = ['developer', 'engineer', 'manager', 'analyst', 'designer', 'architect', 'lead', 'senior', 'junior', 'intern'];
  
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    const lowerLine = line.toLowerCase();
    if (jobTitles.some(title => lowerLine.includes(title)) && line.length < 200) {
      // Include the line and potentially the next few lines
      const experienceBlock = lines.slice(index, Math.min(index + 3, lines.length)).join(' ').trim();
      if (experienceBlock.length > 20) {
        experience.push(experienceBlock);
      }
    }
  });

  return experience.slice(0, 10); // Return max 10 experience entries
}

// Extract keywords using stopword removal
export function extractKeywords(text: string, topN: number = 20): string[] {
  // Tokenize and clean
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);

  // Remove stopwords
  const filteredWords = removeStopwords(words);

  // Count frequency
  const wordFreq: { [key: string]: number } = {};
  filteredWords.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });

  // Sort by frequency and return top N
  return Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(entry => entry[0]);
}

// Main extraction function
export function extractResumeData(text: string): ExtractedData {
  return {
    skills: extractSkills(text),
    education: extractEducation(text),
    experience: extractExperience(text),
    keywords: extractKeywords(text),
    emails: extractEmails(text),
    phones: extractPhones(text),
    summary: text.substring(0, 500) // First 500 chars as summary
  };
}

// Calculate TF-IDF for a set of documents
export function calculateTFIDF(documents: string[]): Map<string, number[]> {
  const tfidf = new Map<string, number[]>();
  
  // Tokenize all documents
  const tokenizedDocs = documents.map(doc => {
    const words = doc.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);
    return removeStopwords(words);
  });

  // Calculate document frequency
  const df = new Map<string, number>();
  tokenizedDocs.forEach(words => {
    const uniqueWords = new Set(words);
    uniqueWords.forEach(word => {
      df.set(word, (df.get(word) || 0) + 1);
    });
  });

  const numDocs = documents.length;

  // Calculate TF-IDF for each word in each document
  tokenizedDocs.forEach((words, docIndex) => {
    // Calculate term frequency
    const tf = new Map<string, number>();
    words.forEach(word => {
      tf.set(word, (tf.get(word) || 0) + 1);
    });

    // Normalize TF and calculate TF-IDF
    const docLength = words.length;
    tf.forEach((count, word) => {
      const termFreq = count / docLength;
      const inverseDocFreq = Math.log(numDocs / (df.get(word) || 1));
      const tfidfScore = termFreq * inverseDocFreq;

      if (!tfidf.has(word)) {
        tfidf.set(word, new Array(numDocs).fill(0));
      }
      tfidf.get(word)![docIndex] = tfidfScore;
    });
  });

  return tfidf;
}

// Calculate cosine similarity between two text documents
export function calculateCosineSimilarity(text1: string, text2: string): number {
  const docs = [text1, text2];
  const tfidf = calculateTFIDF(docs);

  // Get vectors
  const words = Array.from(tfidf.keys());
  const vector1 = words.map(word => tfidf.get(word)![0]);
  const vector2 = words.map(word => tfidf.get(word)![1]);

  // Calculate dot product
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  for (let i = 0; i < vector1.length; i++) {
    dotProduct += vector1[i] * vector2[i];
    magnitude1 += vector1[i] * vector1[i];
    magnitude2 += vector2[i] * vector2[i];
  }

  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }

  return dotProduct / (magnitude1 * magnitude2);
}

// Find missing keywords between resume and job description
export function findMissingKeywords(resumeText: string, jobDescText: string): string[] {
  const resumeKeywords = new Set(extractKeywords(resumeText, 50));
  const jobKeywords = extractKeywords(jobDescText, 30);

  return jobKeywords.filter(keyword => !resumeKeywords.has(keyword));
}

// Action verbs for ATS optimization
export const ACTION_VERBS = [
  'achieved', 'improved', 'developed', 'created', 'designed', 'implemented', 
  'led', 'managed', 'optimized', 'increased', 'reduced', 'built', 'launched',
  'delivered', 'collaborated', 'streamlined', 'automated', 'analyzed', 'coordinated',
  'executed', 'initiated', 'resolved', 'transformed', 'pioneered'
];

// ATS optimization suggestions
export function generateATSSuggestions(resumeText: string, jobDescText: string): string[] {
  const suggestions: string[] = [];
  const missingKeywords = findMissingKeywords(resumeText, jobDescText);

  if (missingKeywords.length > 0) {
    suggestions.push(`Add these important keywords: ${missingKeywords.slice(0, 10).join(', ')}`);
  }

  const lowerResume = resumeText.toLowerCase();
  const hasActionVerbs = ACTION_VERBS.some(verb => lowerResume.includes(verb));
  
  if (!hasActionVerbs) {
    suggestions.push('Use strong action verbs like: ' + ACTION_VERBS.slice(0, 5).join(', '));
  }

  if (resumeText.length < 500) {
    suggestions.push('Resume seems too short. Add more details about your experience and achievements.');
  }

  if (extractSkills(resumeText).length < 5) {
    suggestions.push('Add more technical skills relevant to the job description.');
  }

  const hasQuantifiableResults = /\d+%|\$\d+|increased|decreased|improved by/.test(resumeText);
  if (!hasQuantifiableResults) {
    suggestions.push('Include quantifiable achievements (e.g., "Increased efficiency by 40%")');
  }

  suggestions.push('Use consistent formatting throughout the document');
  suggestions.push('Keep bullet points concise and focused on achievements');
  suggestions.push('Include relevant certifications if applicable');

  return suggestions;
}
