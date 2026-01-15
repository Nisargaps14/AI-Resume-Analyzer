import React, { useState } from 'react';
import { X, Download, Eye, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ResumePreviewProps {
  company: string;
  templateName: string;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  previewUrl?: string;
}

export function ResumePreview({ company, templateName, isOpen, onClose, onDownload, previewUrl }: ResumePreviewProps) {
  const [showFullPreview, setShowFullPreview] = useState(false);

  if (!isOpen) return null;

  const handleOpenFullPreview = () => {
    if (previewUrl) {
      setShowFullPreview(true);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{company} Resume Template</h2>
              <p className="text-gray-600">{templateName}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleOpenFullPreview} className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Full Preview
              </Button>
              <Button onClick={onDownload} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Template Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                      <Eye className="w-8 h-8 text-gray-400" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-700">Resume Template Preview</h3>
                    <p className="text-gray-600">
                      This is a preview of the {company} optimized resume template.
                      The actual template includes:
                    </p>
                    
                    <div className="text-left max-w-md mx-auto space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Professional ATS-friendly format</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Company-specific keywords</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Optimized layout and structure</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Industry-specific sections</span>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button onClick={handleOpenFullPreview} className="w-full mb-2">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Preview
                      </Button>
                      <Button onClick={onDownload} className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download Template
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template Features */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Template Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-700">Design Elements</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Clean, professional layout
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        ATS-friendly formatting
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Consistent typography
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Proper section hierarchy
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-700">Content Sections</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Professional summary
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Skills & technologies
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Work experience
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Education & certifications
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Guidelines */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>How to Use This Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                    <div>
                      <p className="font-medium">Download the template</p>
                      <p className="text-gray-600">Click the download button to get the .docx file</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                    <div>
                      <p className="font-medium">Customize with your information</p>
                      <p className="text-gray-600">Replace placeholder text with your personal details</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                    <div>
                      <p className="font-medium">Follow company guidelines</p>
                      <p className="text-gray-600">Use the company-specific tips in the details modal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                    <div>
                      <p className="font-medium">Apply with confidence</p>
                      <p className="text-gray-600">Submit your optimized resume to {company}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Full Preview Modal */}
      {showFullPreview && previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Full Preview - {company} Resume</h3>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowFullPreview(false)}>
                  Close Preview
                </Button>
              </div>
            </div>
            <div className="overflow-auto h-full">
              <iframe 
                src={previewUrl} 
                className="w-full h-full min-h-[600px]"
                title={`${company} Resume Preview`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
