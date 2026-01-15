import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Briefcase, Code, BarChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { parseResumeFile, validateResumeContent } from '../utils/fileParser';
import { extractResumeData, ExtractedData } from '../utils/nlp';

interface ResumeUploaderProps {
  onResumeProcessed: (text: string, data: ExtractedData, role: string) => void;
}

const roleKeywords = {
  'Software Developer': [
    'javascript', 'react', 'node.js', 'python', 'java', 'git', 'api', 'database', 'sql',
    'html', 'css', 'typescript', 'aws', 'docker', 'kubernetes', 'microservices',
    'agile', 'scrum', 'testing', 'debugging', 'algorithms', 'data structures'
  ],
  'Data Analyst': [
    'sql', 'python', 'r', 'excel', 'tableau', 'power bi', 'statistics', 'data analysis',
    'data visualization', 'pandas', 'numpy', 'matplotlib', 'seaborn', 'machine learning',
    'data mining', 'etl', 'business intelligence', 'reporting', 'dashboards'
  ],
  'ML Engineer': [
    'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn',
    'python', 'numpy', 'pandas', 'keras', 'nlp', 'computer vision', 'algorithms',
    'statistics', 'data science', 'mlops', 'docker', 'kubernetes', 'aws', 'azure',
    'model deployment', 'feature engineering', 'neural networks'
  ]
};

export function ResumeUploader({ onResumeProcessed }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [selectedRole, setSelectedRole] = useState('Software Developer');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resumeText, setResumeText] = useState<string>('');
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Software Developer':
        return <Code className="w-4 h-4" />;
      case 'Data Analyst':
        return <BarChart className="w-4 h-4" />;
      case 'ML Engineer':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const analyzeKeywords = (text: string, role: string) => {
    const keywords = roleKeywords[role as keyof typeof roleKeywords] || [];
    const textLower = text.toLowerCase();
    const found = keywords.filter(keyword => textLower.includes(keyword.toLowerCase()));
    const missing = keywords.filter(keyword => !textLower.includes(keyword.toLowerCase()));
    setMissingKeywords(missing);
    return { found, missing };
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setSuccess(false);
      setMissingKeywords([]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Parse file
      const parseResult = await parseResumeFile(file);
      
      if (parseResult.error) {
        setError(parseResult.error);
        setProcessing(false);
        return;
      }

      // Validate content
      const validation = validateResumeContent(parseResult.text);
      if (!validation.valid) {
        setError(validation.message || 'Invalid resume content');
        setProcessing(false);
        return;
      }

      // Analyze keywords based on selected role
      const keywordAnalysis = analyzeKeywords(parseResult.text, selectedRole);

      // Extract structured data
      const extractedData = extractResumeData(parseResult.text);
      extractedData.keywordAnalysis = keywordAnalysis;

      // Store resume text for display
      setResumeText(parseResult.text);

      // Success!
      setSuccess(true);
      onResumeProcessed(parseResult.text, extractedData, selectedRole);

    } catch (err) {
      setError('An unexpected error occurred while processing your resume');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Resume
          </CardTitle>
          <CardDescription>
            Upload your resume in PDF or DOCX format for AI-powered analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Your Target Role
            </label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Software Developer">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Software Developer
                  </div>
                </SelectItem>
                <SelectItem value="Data Analyst">
                  <div className="flex items-center gap-2">
                    <BarChart className="w-4 h-4" />
                    Data Analyst
                  </div>
                </SelectItem>
                <SelectItem value="ML Engineer">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    ML Engineer
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            <label 
              htmlFor="resume-upload" 
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <FileText className="w-12 h-12 text-gray-400" />
              <span className="text-sm text-gray-600">
                {file ? file.name : 'Click to select or drag and drop'}
              </span>
              <span className="text-xs text-gray-500">
                Supported formats: PDF, DOCX, TXT (Max 10MB)
              </span>
            </label>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 text-green-900 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>
                Resume processed successfully! Check analysis results below.
              </AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleUpload} 
            disabled={!file || processing}
            className="w-full"
          >
            {processing ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Processing...
              </>
            ) : (
              'Analyze Resume'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Resume Text Display */}
      {resumeText && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Resume Content
            </CardTitle>
            <CardDescription>
              Extracted text from your resume with keyword highlighting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg">
              <div className="text-sm leading-relaxed">
                {resumeText.split('\n').map((line, index) => (
                  <div key={index} className="mb-2">
                    {line.split(' ').map((word, wordIndex) => {
                      const isMissingKeyword = missingKeywords.some(keyword => 
                        word.toLowerCase().includes(keyword.toLowerCase())
                      );
                      return (
                        <span
                          key={wordIndex}
                          className={isMissingKeyword ? 'bg-red-100 text-red-700 px-1 rounded' : ''}
                        >
                          {word}{' '}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
              
              {missingKeywords.length > 0 && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    Missing Keywords for {selectedRole}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {missingKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </CardContent>
          </Card>
      )}
    </div>
  );
}
