import React, { useState } from 'react';
import { X, Download, Eye, BookOpen, Video, FileText, Users, Target, Clock, MapPin, Award, Briefcase } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { CompanyData } from '../utils/companyData';

interface CompanyDetailsModalProps {
  company: CompanyData;
  isOpen: boolean;
  onClose: () => void;
}

export function CompanyDetailsModal({ company, isOpen, onClose }: CompanyDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const handleDownloadTemplate = () => {
    // Simulate download
    const link = document.createElement('a');
    link.href = company.resumeFormat.downloadUrl;
    link.download = company.resumeFormat.template;
    link.click();
  };

  const handleViewTemplate = () => {
    // Open preview in new tab
    window.open(company.resumeFormat.previewUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{company.logo}</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{company.name}</h2>
              <p className="text-gray-600">{company.industry}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="interview">Interview</TabsTrigger>
              <TabsTrigger value="culture">Culture</TabsTrigger>
              <TabsTrigger value="application">Application</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{company.description}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Key Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Industry: {company.industry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Work Style: {company.culture.workStyle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Dress Code: {company.culture.dressCode}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Company Values
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {company.culture.values.map((value, index) => (
                        <Badge key={index} variant="secondary">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="resume" className="space-y-6">
              <Alert>
                <FileText className="h-4 w-4" />
                <AlertDescription>
                  Get the perfect resume template optimized for {company.name}'s recruitment system
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle>Resume Template & Guidelines</CardTitle>
                  <CardDescription>
                    Company-specific resume format and best practices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Button onClick={handleDownloadTemplate} className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Template
                    </Button>
                    <Button variant="outline" onClick={handleViewTemplate} className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Preview Template
                    </Button>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Resume Guidelines:</h4>
                    <ul className="space-y-2">
                      {company.resumeFormat.guidelines.map((guideline, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{guideline}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Common Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {company.interviewPrep.questions.map((question, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm">{question}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Technical Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {company.interviewPrep.technicalQuestions.slice(0, 5).map((question, index) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm">{question}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Preparation Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Video Resources:</h4>
                      <ul className="space-y-1">
                        {company.interviewPrep.videoResources.map((resource, index) => (
                          <li key={index} className="text-sm text-blue-600 hover:underline cursor-pointer">
                            {resource}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Study Materials:</h4>
                      <ul className="space-y-1">
                        {company.interviewPrep.studyMaterials.map((material, index) => (
                          <li key={index} className="text-sm text-gray-700">
                            {material}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preparation Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {company.interviewPrep.preparationTips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="culture" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Culture</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Work Style:</h4>
                    <p className="text-gray-700">{company.culture.workStyle}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Dress Code:</h4>
                    <p className="text-gray-700">{company.culture.dressCode}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Interview Format:</h4>
                    <p className="text-gray-700">{company.culture.interviewFormat}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="application" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cover Letter Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {company.applicationTips.coverLetter.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Follow-up Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {company.applicationTips.followUp.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Application Timeline & Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Timeline:</h4>
                    <ul className="space-y-1">
                      {company.applicationTips.timeline.map((timeline, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{timeline}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {company.applicationTips.requirements.map((req, index) => (
                        <Badge key={index} variant="outline">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
