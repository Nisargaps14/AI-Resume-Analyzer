import React, { useState } from 'react';
import { Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { calculateCosineSimilarity, findMissingKeywords, extractKeywords } from '../utils/nlp';

interface JobMatcherProps {
  resumeText: string;
}

export function JobMatcher({ resumeText }: JobMatcherProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);

  const handleMatch = () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description');
      return;
    }

    // Calculate similarity score (0-1, convert to percentage)
    const similarity = calculateCosineSimilarity(resumeText, jobDescription);
    const scorePercentage = Math.round(similarity * 100);
    setMatchScore(scorePercentage);

    // Find missing keywords
    const missing = findMissingKeywords(resumeText, jobDescription);
    setMissingKeywords(missing);

    // Find matched keywords
    const resumeKeys = new Set(extractKeywords(resumeText, 50));
    const jobKeys = extractKeywords(jobDescription, 30);
    const matched = jobKeys.filter(k => resumeKeys.has(k));
    setMatchedKeywords(matched);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Excellent Match';
    if (score >= 50) return 'Good Match';
    if (score >= 30) return 'Moderate Match';
    return 'Low Match';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Job Description Matcher
          </CardTitle>
          <CardDescription>
            Compare your resume with a job description to see how well you match
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Paste Job Description
            </label>
            <Textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={10}
              className="w-full"
            />
          </div>

          <Button onClick={handleMatch} className="w-full">
            Calculate Match Score
          </Button>
        </CardContent>
      </Card>

      {matchScore !== null && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Match Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Match Score */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Match Score</h3>
                  <span className={`text-2xl font-bold ${getScoreColor(matchScore)}`}>
                    {matchScore}%
                  </span>
                </div>
                <Progress value={matchScore} className="h-2" />
                <p className="text-sm text-gray-600 mt-2">
                  {getScoreLabel(matchScore)} - Your resume aligns with the job requirements
                </p>
              </div>

              {/* Matched Keywords */}
              <div>
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  ✅ Matched Keywords ({matchedKeywords.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {matchedKeywords.length > 0 ? (
                    matchedKeywords.map((keyword, idx) => (
                      <Badge key={idx} className="bg-green-100 text-green-800">
                        {keyword}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No matching keywords found</p>
                  )}
                </div>
              </div>

              {/* Missing Keywords */}
              <div>
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Missing Keywords ({missingKeywords.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {missingKeywords.length > 0 ? (
                    missingKeywords.slice(0, 20).map((keyword, idx) => (
                      <Badge key={idx} className="bg-red-100 text-red-800">
                        {keyword}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Great! No critical keywords missing</p>
                  )}
                </div>
                {missingKeywords.length > 0 && (
                  <p className="text-sm text-gray-600 mt-3">
                    💡 Tip: Consider adding these keywords to your resume if you have relevant experience
                  </p>
                )}
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-sm mb-2">Recommendations</h3>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  {matchScore < 50 && (
                    <li>Your match score is low. Consider tailoring your resume to this job description</li>
                  )}
                  {missingKeywords.length > 5 && (
                    <li>Add {Math.min(5, missingKeywords.length)} of the missing keywords if applicable</li>
                  )}
                  <li>Highlight relevant projects and experiences that match the job requirements</li>
                  <li>Quantify your achievements with metrics when possible</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
