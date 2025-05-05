
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface UploadFormProps {
  onProcessDocument: (text: string, documentName: string) => void;
  isLoading: boolean;
}

const UploadForm: React.FC<UploadFormProps> = ({ onProcessDocument, isLoading }) => {
  const [textInput, setTextInput] = useState('');
  const [fileName, setFileName] = useState('');
  const [activeTab, setActiveTab] = useState('paste');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    handleFileUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    handleFileUpload(file);
  };

  const handleFileUpload = (file?: File) => {
    if (!file) return;

    // Check file type (simplified validation)
    const allowedTypes = ['text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only TXT, PDF, DOC, and DOCX files are supported');
      return;
    }

    // For this prototype, we're just handling text files
    // In a real app, we would need to use libraries to extract text from PDF/DOC
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setTextInput(content || '');
        setFileName(file.name);
      };
      reader.readAsText(file);
    } else {
      // In a real app, this would be where you'd handle PDFs and DOCs
      // For now, we'll just set the filename and show a placeholder message
      setFileName(file.name);
      setTextInput(`[This is where the extracted content from ${file.name} would appear in a production app]`);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (!textInput.trim()) {
      toast.error('Please enter or upload some text first');
      return;
    }

    onProcessDocument(textInput, fileName || 'Untitled Document');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-legal-primary">Simplify Your Legal Document</h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="paste">Paste Text</TabsTrigger>
            <TabsTrigger value="upload">Upload File</TabsTrigger>
          </TabsList>

          <TabsContent value="paste" className="mt-0">
            <Textarea
              placeholder="Paste your legal text here..."
              className="min-h-[300px] mb-6"
              value={textInput}
              onChange={handleTextInputChange}
            />
          </TabsContent>

          <TabsContent value="upload" className="mt-0">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer mb-6"
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".txt,.pdf,.doc,.docx"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 mx-auto mb-4 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">TXT, PDF, DOC, DOCX (Max 10MB)</p>
              
              {fileName && (
                <div className="mt-4 p-2 bg-gray-100 rounded text-left flex items-center">
                  <span className="truncate max-w-[250px] text-sm">{fileName}</span>
                  <button 
                    className="ml-auto text-gray-500 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFileName('');
                      setTextInput('');
                    }}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            {fileName && (
              <Textarea
                placeholder="Extracted text will appear here..."
                className="min-h-[200px] mb-6"
                value={textInput}
                onChange={handleTextInputChange}
              />
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={isLoading || !textInput.trim()}
            className="bg-legal-primary hover:bg-legal-primary/90"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Simplify Document'
            )}
          </Button>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>We respect your privacy. Your document is processed securely and is not stored permanently.</p>
      </div>
    </div>
  );
};

export default UploadForm;
