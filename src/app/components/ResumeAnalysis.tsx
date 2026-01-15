import React from 'react';
import { Briefcase, GraduationCap, Code, Mail, Phone, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ExtractedData } from '../utils/nlp';

interface ResumeAnalysisProps {
  data: ExtractedData;
}

export function ResumeAnalysis({ data }: ResumeAnalysisProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Extracted Information
          </CardTitle>
          <CardDescription>
            Structured data extracted from your resume using NLP
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contact Information */}
          {(data.emails.length > 0 || data.phones.length > 0) && (
            <div>
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact Information
              </h3>
              <div className="space-y-2">
                {data.emails.map((email, idx) => (
                  <div key={idx} className="text-sm text-gray-600">
                    <Mail className="w-3 h-3 inline mr-2" />
                    {email}
                  </div>
                ))}
                {data.phones.map((phone, idx) => (
                  <div key={idx} className="text-sm text-gray-600">
                    <Phone className="w-3 h-3 inline mr-2" />
                    {phone}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Skills */}
          <div>
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Detected Skills ({data.skills.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.length > 0 ? (
                data.skills.slice(0, 30).map((skill, idx) => (
                  <Badge key={idx} variant="secondary">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500">No skills detected. Try adding more technical skills to your resume.</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Education */}
          <div>
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Education
            </h3>
            <div className="space-y-2">
              {data.education.length > 0 ? (
                data.education.map((edu, idx) => (
                  <div key={idx} className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                    {edu}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No education information detected.</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Experience */}
          <div>
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Work Experience
            </h3>
            <div className="space-y-2">
              {data.experience.length > 0 ? (
                data.experience.map((exp, idx) => (
                  <div key={idx} className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                    {exp}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No work experience detected.</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Top Keywords */}
          <div>
            <h3 className="font-semibold text-sm mb-3">
              Top Keywords (used for matching)
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.keywords.slice(0, 20).map((keyword, idx) => (
                <Badge key={idx} variant="outline">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
