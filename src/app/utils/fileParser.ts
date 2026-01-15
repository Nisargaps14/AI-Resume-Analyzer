// File parsing utilities for PDF and DOCX
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface ParseResult {
  text: string;
  error?: string;
}

/**
 * Parse PDF file and extract text
 * Uses PDF.js library for client-side parsing
 */
export async function parsePDF(file: File): Promise<ParseResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    // Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    return { text: fullText.trim() };
  } catch (error) {
    console.error('PDF parsing error:', error);
    return { 
      text: '', 
      error: 'Failed to parse PDF file. Please ensure it is a valid PDF document.' 
    };
  }
}

/**
 * Parse DOCX file and extract text
 * Uses mammoth library for client-side parsing
 */
export async function parseDOCX(file: File): Promise<ParseResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    if (result.messages.length > 0) {
      console.warn('DOCX parsing warnings:', result.messages);
    }
    
    return { text: result.value.trim() };
  } catch (error) {
    console.error('DOCX parsing error:', error);
    return { 
      text: '', 
      error: 'Failed to parse DOCX file. Please ensure it is a valid Word document.' 
    };
  }
}

/**
 * Parse uploaded file based on type
 * Supports PDF and DOCX formats
 */
export async function parseResumeFile(file: File): Promise<ParseResult> {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();
  
  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { 
      text: '', 
      error: 'File size exceeds 10MB limit. Please upload a smaller file.' 
    };
  }
  
  // Parse based on file type
  if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
    return parsePDF(file);
  } else if (
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    fileName.endsWith('.docx')
  ) {
    return parseDOCX(file);
  } else if (fileName.endsWith('.txt')) {
    // Handle plain text files
    try {
      const text = await file.text();
      return { text };
    } catch (error) {
      return { 
        text: '', 
        error: 'Failed to read text file.' 
      };
    }
  } else {
    return { 
      text: '', 
      error: 'Unsupported file type. Please upload PDF, DOCX, or TXT files.' 
    };
  }
}

/**
 * Validate resume content
 * Checks if parsed text contains meaningful content
 */
export function validateResumeContent(text: string): { valid: boolean; message?: string } {
  if (!text || text.trim().length === 0) {
    return { 
      valid: false, 
      message: 'No text content found in the file.' 
    };
  }
  
  if (text.length < 100) {
    return { 
      valid: false, 
      message: 'File content is too short. Please upload a complete resume.' 
    };
  }
  
  // Check for common resume sections
  const hasRelevantContent = /experience|education|skills|work|projects/i.test(text);
  if (!hasRelevantContent) {
    return { 
      valid: false, 
      message: 'File does not appear to contain resume-related content.' 
    };
  }
  
  return { valid: true };
}
