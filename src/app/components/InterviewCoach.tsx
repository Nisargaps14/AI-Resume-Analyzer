import React, { useState } from 'react';
import { MessageSquare, Send, Award, TrendingUp, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  generateInterviewQuestions, 
  evaluateAnswer, 
  InterviewQuestion,
  AnswerEvaluation 
} from '../utils/mockAI';

export function InterviewCoach() {
  const [role, setRole] = useState('software engineer');
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<AnswerEvaluation | null>(null);
  const [showBetterAnswer, setShowBetterAnswer] = useState(false);

  const handleGenerateQuestions = () => {
    const newQuestions = generateInterviewQuestions(role, 5);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setAnswer('');
    setEvaluation(null);
    setShowBetterAnswer(false);
  };

  const handleSubmitAnswer = () => {
    if (!answer.trim()) {
      alert('Please type your answer first');
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const result = evaluateAnswer(currentQuestion.question, answer);
    setEvaluation(result);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAnswer('');
      setEvaluation(null);
      setShowBetterAnswer(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            AI Interview Coach
          </CardTitle>
          <CardDescription>
            Practice interview questions and get AI-powered feedback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Job Role
            </label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="software engineer">Software Engineer</SelectItem>
                <SelectItem value="data scientist">Data Scientist</SelectItem>
                <SelectItem value="product manager">Product Manager</SelectItem>
                <SelectItem value="general">General / Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleGenerateQuestions} className="w-full">
            Generate Interview Questions
          </Button>
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Question {currentQuestionIndex + 1} of {questions.length}
                </CardTitle>
                <Badge className={getDifficultyColor(questions[currentQuestionIndex].difficulty)}>
                  {questions[currentQuestionIndex].difficulty}
                </Badge>
              </div>
              <CardDescription>
                Category: {questions[currentQuestionIndex].category}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-lg font-medium text-gray-900">
                  {questions[currentQuestionIndex].question}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Answer
                </label>
                <Textarea
                  placeholder="Type your answer here..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={8}
                  className="w-full"
                  disabled={evaluation !== null}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {answer.split(/\s+/).filter(w => w.length > 0).length} words
                </div>
              </div>

              {!evaluation ? (
                <Button onClick={handleSubmitAnswer} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion} 
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="w-full"
                >
                  Next Question
                </Button>
              )}
            </CardContent>
          </Card>

          {evaluation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Answer Evaluation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Overall Score</h3>
                    <span className={`text-3xl font-bold ${getScoreColor(evaluation.score)}`}>
                      {evaluation.score}/100
                    </span>
                  </div>
                  <Progress value={evaluation.score} className="h-2" />
                  <p className="text-sm text-gray-600 mt-2">{evaluation.feedback}</p>
                </div>

                {/* Strengths */}
                {evaluation.strengths.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-green-700">
                      <TrendingUp className="w-4 h-4" />
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {evaluation.strengths.map((strength, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Improvements */}
                {evaluation.improvements.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-orange-700">
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {evaluation.improvements.map((improvement, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-orange-600">→</span>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Better Answer */}
                <div>
                  <Button
                    variant="outline"
                    onClick={() => setShowBetterAnswer(!showBetterAnswer)}
                    className="w-full"
                  >
                    {showBetterAnswer ? 'Hide' : 'Show'} Suggested Answer
                  </Button>
                  {showBetterAnswer && (
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-sm mb-2">Suggested Approach:</h3>
                      <p className="text-sm text-gray-700 whitespace-pre-line">
                        {evaluation.betterAnswer}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {questions.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>Select a role and generate questions to start practicing!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
