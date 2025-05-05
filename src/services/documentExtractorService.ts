
import mammoth from 'mammoth';

// Interface for extraction result
export interface TextExtractionResult {
  text: string;
  success: boolean;
  errorMessage?: string;
}

// Extract text from a Word document (.docx)
export const extractTextFromWordDocument = async (file: File): Promise<TextExtractionResult> => {
  try {
    // Convert the File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Use mammoth to convert the Word document to plain text
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    if (!result.value || result.value.trim() === '') {
      return {
        text: '',
        success: false,
        errorMessage: 'Could not extract any text from the document.'
      };
    }

    return {
      text: result.value,
      success: true
    };
  } catch (error) {
    console.error('Error extracting text from Word document:', error);
    return {
      text: '',
      success: false,
      errorMessage: `Failed to extract text: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

// Function to get mimetype-friendly file type description
export const getFileTypeDescription = (fileType: string): string => {
  switch (fileType) {
    case 'text/plain':
      return 'Text';
    case 'application/pdf':
      return 'PDF';
    case 'application/msword':
      return 'Word (.doc)';
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'Word (.docx)';
    default:
      return 'Unknown';
  }
};
