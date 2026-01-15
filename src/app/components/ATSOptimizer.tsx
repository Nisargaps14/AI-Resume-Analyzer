import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Lightbulb, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { generateATSSuggestions, ACTION_VERBS } from '../utils/nlp';

interface ATSOptimizerProps {
  resumeText: string;
  jobDescription?: string;
}

export function ATSOptimizer({ resumeText, jobDescription = '' }: ATSOptimizerProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [atsScore, setAtsScore] = useState(0);

  useEffect(() => {
    // Generate suggestions
    const generatedSuggestions = generateATSSuggestions(resumeText, jobDescription);
    setSuggestions(generatedSuggestions);

    // Calculate ATS score based on various factors
    let score = 40; // Base score
    
    const hasActionVerbs = ACTION_VERBS.some(verb => 
      resumeText.toLowerCase().includes(verb)
    );
    if (hasActionVerbs) score += 15;

    const hasQuantifiableResults = /\d+%|\$\d+|increased|decreased|improved by/.test(resumeText);
    if (hasQuantifiableResults) score += 15;

    const wordCount = resumeText.split(/\s+/).length;
    if (wordCount > 300 && wordCount < 1000) score += 15;

    const sections = resumeText.toLowerCase();
    const hasSections = ['experience', 'education', 'skills'].filter(s => 
      sections.includes(s)
    ).length;
    score += hasSections * 5;

    setAtsScore(Math.min(score, 100));
  }, [resumeText, jobDescription]);

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const atsChecks = [
    {
      label: 'Uses action verbs',
      passed: ACTION_VERBS.some(verb => resumeText.toLowerCase().includes(verb)),
      description: 'Strong action verbs make your achievements stand out'
    },
    {
      label: 'Includes quantifiable results',
      passed: /\d+%|\$\d+|increased|decreased|improved by/.test(resumeText),
      description: 'Numbers and metrics demonstrate impact'
    },
    {
      label: 'Appropriate length',
      passed: resumeText.split(/\s+/).length > 300 && resumeText.split(/\s+/).length < 1000,
      description: 'Resume should be comprehensive but concise'
    },
    {
      label: 'Contains standard sections',
      passed: ['experience', 'education', 'skills'].every(s => 
        resumeText.toLowerCase().includes(s)
      ),
      description: 'ATS systems look for standard section headers'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            ATS Optimization Score
          </CardTitle>
          <CardDescription>
            Applicant Tracking System compatibility analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${getScoreColor(atsScore)}`}>
              {atsScore}
            </div>
            <div className="text-sm text-gray-600 mt-2">
              {atsScore >= 70 ? 'Excellent' : atsScore >= 50 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>

          <Alert className="mb-6">
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              {atsScore >= 70 
                ? 'Your resume is well-optimized for ATS systems!' 
                : 'Follow the suggestions below to improve your ATS compatibility'}
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            {atsChecks.map((check, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                {check.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="font-medium text-sm">{check.label}</div>
                  <div className="text-xs text-gray-600">{check.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Optimization Suggestions
          </CardTitle>
          <CardDescription>
            Follow these recommendations to improve your resume
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestions.map((suggestion, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold">
                {idx + 1}
              </div>
              <p className="text-sm text-gray-700 flex-1">{suggestion}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Action Verbs</CardTitle>
          <CardDescription>
            Use these powerful verbs to strengthen your bullet points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {ACTION_VERBS.slice(0, 20).map((verb, idx) => (
              <Badge key={idx} variant="outline">
                {verb}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
