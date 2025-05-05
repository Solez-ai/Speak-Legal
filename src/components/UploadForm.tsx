import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { setGeminiApiKey, getGeminiApiKey, isGeminiApiKeySet } from '@/services/geminiService';
import { extractTextFromWordDocument, getFileTypeDescription } from '@/services/documentExtractorService';

interface UploadFormProps {
  onProcessDocument: (text: string, documentName: string) => void;
  isLoading: boolean;
}

const UploadForm: React.FC<UploadFormProps> = ({ onProcessDocument, isLoading }) => {
  const [textInput, setTextInput] = useState('');
  const [fileName, setFileName] = useState('');
  const [activeTab, setActiveTab] = useState('paste');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [fileProcessing, setFileProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if API key is already set on component mount
  useEffect(() => {
    const existingKey = getGeminiApiKey();
    if (existingKey) {
      setApiKey(existingKey);
      // Since we now have a default API key, let's not show the input by default
      setShowApiKeyInput(false);
    } else {
      // Check if API key is saved in localStorage
      const savedKey = localStorage.getItem('gemini_api_key');
      if (savedKey) {
        setApiKey(savedKey);
        setGeminiApiKey(savedKey);
      } else {
        setShowApiKeyInput(true);
      }
    }
  }, []);

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleApiKeySubmit = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    // Save API key to service and localStorage
    setGeminiApiKey(apiKey);
    localStorage.setItem('gemini_api_key', apiKey);
    setShowApiKeyInput(false);
    toast.success("API key saved successfully");
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

  const handleFileUpload = async (file?: File) => {
    if (!file) return;

    // Check file type (validation)
    const allowedTypes = [
      'text/plain', 
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
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
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setTextInput(content || '');
          setFileProcessing(false);
        };
        reader.onerror = () => {
          toast.error('Error reading the text file');
          setFileProcessing(false);
        };
        reader.readAsText(file);
      } 
      else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
               file.type === 'application/msword') {
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
      } 
      else if (file.type === 'application/pdf') {
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

  const handleSubmit = () => {
    if (!isGeminiApiKeySet()) {
      setShowApiKeyInput(true);
      toast.error('Please enter your Gemini API key first');
      return;
    }

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
        
        {showApiKeyInput ? (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-medium mb-2">API Key Required</h3>
            <p className="text-gray-600 mb-4">Enter your Gemini API key to process documents. You can get one from <a href="https://ai.google.dev/" target="_blank" rel="noreferrer" className="text-blue-500 underline">Google AI Studio</a>.</p>
            <div className="flex flex-col space-y-4">
              <div>
                <Label htmlFor="api-key">Gemini API Key</Label>
                <Input 
                  id="api-key" 
                  type="password" 
                  value={apiKey} 
                  onChange={handleApiKeyChange} 
                  placeholder="Enter your Gemini API key"
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleApiKeySubmit}>Save API Key</Button>
              </div>
            </div>
          </div>
        ) : (
          <>
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
                
                {fileProcessing ? (
                  <div className="flex justify-center items-center mb-6 p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-legal-primary"></div>
                    <span className="ml-2 text-legal-primary">Extracting text...</span>
                  </div>
                ) : fileName ? (
                  <Textarea
                    placeholder="Extracted text will appear here..."
                    className="min-h-[200px] mb-6"
                    value={textInput}
                    onChange={handleTextInputChange}
                  />
                ) : null}
              </TabsContent>
            </Tabs>

            <div className="flex flex-col md:flex-row justify-between items-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowApiKeyInput(true)}
                className="mb-4 md:mb-0"
              >
                Change API Key
              </Button>
              
              <Button 
                onClick={handleSubmit}
                disabled={isLoading || fileProcessing || !textInput.trim()}
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
          </>
        )}
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>We respect your privacy. Your document is processed securely and is not stored permanently.</p>
      </div>
    </div>
  );
};

export default UploadForm;
