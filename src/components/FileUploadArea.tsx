import React, { useRef } from 'react';
import { extractTextFromWordDocument, getFileTypeDescription } from '@/services/documentExtractorService';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
interface FileUploadAreaProps {
  textInput: string;
  setTextInput: (text: string) => void;
  fileName: string;
  setFileName: (name: string) => void;
  fileProcessing: boolean;
  setFileProcessing: (isProcessing: boolean) => void;
}
const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  textInput,
  setTextInput,
  fileName,
  setFileName,
  fileProcessing,
  setFileProcessing
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    handleFileUpload(file);
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    handleFileUpload(file);
  };
  const handleFileUpload = async (file?: File) => {
    if (!file) return;

    // Check file type (validation)
    const allowedTypes = ['text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only TXT, PDF, DOC, and DOCX files are supported');
      return;
    }
    setFileProcessing(true);
    setFileName(file.name);
    try {
      // Handle different file types
      if (file.type === 'text/plain') {
        // Handle text files
        const reader = new FileReader();
        reader.onload = e => {
          const content = e.target?.result as string;
          setTextInput(content || '');
          setFileProcessing(false);
        };
        reader.onerror = () => {
          toast.error('Error reading the text file');
          setFileProcessing(false);
        };
        reader.readAsText(file);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/msword') {
        // Handle Word documents (.doc and .docx)
        const result = await extractTextFromWordDocument(file);
        if (result.success) {
          setTextInput(result.text);
          toast.success(`Successfully extracted text from ${getFileTypeDescription(file.type)} file`);
        } else {
          toast.error(result.errorMessage || 'Failed to extract text from document');
          // Keep the filename but show error
        }
        setFileProcessing(false);
      } else if (file.type === 'application/pdf') {
        // For PDF files (not fully implemented in this version)
        // Show a placeholder message for now
        setTextInput(`[PDF text extraction is in development. In production, we would extract text from "${file.name}"]`);
        toast.info('PDF extraction is in development. Text shown is a placeholder.');
        setFileProcessing(false);
      }
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error('Error processing file. Please try again.');
      setFileProcessing(false);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return <>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer mb-6" onDrop={handleFileDrop} onDragOver={e => e.preventDefault()} onClick={() => fileInputRef.current?.click()}>
        <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileSelect} accept=".txt,.pdf,.doc,.docx" />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">ONLY Docx. Supported</p>
        
        {fileName && <div className="mt-4 p-2 bg-gray-100 rounded text-left flex items-center">
            <span className="truncate max-w-[250px] text-sm">{fileName}</span>
            <button className="ml-auto text-gray-500 hover:text-red-500" onClick={e => {
          e.stopPropagation();
          setFileName('');
          setTextInput('');
        }}>
              ✕
            </button>
          </div>}
      </div>
      
      {fileProcessing ? <div className="flex justify-center items-center mb-6 p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-legal-primary"></div>
          <span className="ml-2 text-legal-primary">Extracting text...</span>
        </div> : fileName ? <Textarea placeholder="Extracted text will appear here..." className="min-h-[200px] mb-6" value={textInput} onChange={e => setTextInput(e.target.value)} /> : null}
    </>;
};
export default FileUploadArea;