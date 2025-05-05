
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { getGeminiApiKey, isGeminiApiKeySet, setGeminiApiKey } from '@/services/geminiService';
import ApiKeyInput from '@/components/ApiKeyInput';
import FileUploadArea from '@/components/FileUploadArea';
import TextInputArea from '@/components/TextInputArea';

interface UploadFormProps {
  onProcessDocument: (text: string, documentName: string) => void;
  isLoading: boolean;
}

const UploadForm: React.FC<UploadFormProps> = ({
  onProcessDocument,
  isLoading
}) => {
  const [textInput, setTextInput] = useState('');
  const [fileName, setFileName] = useState('');
  const [activeTab, setActiveTab] = useState('paste');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [fileProcessing, setFileProcessing] = useState(false);

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

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="bg-card rounded-lg shadow-md p-6 border border-border transition-colors">
        <h2 className="text-2xl font-semibold mb-6 text-legal-primary">Simplify Your Legal Document</h2>
        
        {showApiKeyInput ? (
          <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} onSave={() => setShowApiKeyInput(false)} />
        ) : (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="paste">Paste Text</TabsTrigger>
                <TabsTrigger value="upload">Upload File</TabsTrigger>
              </TabsList>

              <TabsContent value="paste" className="mt-0">
                <TextInputArea textInput={textInput} onTextChange={handleTextInputChange} />
              </TabsContent>

              <TabsContent value="upload" className="mt-0">
                <FileUploadArea textInput={textInput} setTextInput={setTextInput} fileName={fileName} setFileName={setFileName} fileProcessing={fileProcessing} setFileProcessing={setFileProcessing} />
              </TabsContent>
            </Tabs>

            <div className="flex flex-col md:flex-row justify-between items-center">
              <Button variant="outline" size="sm" onClick={() => setShowApiKeyInput(true)} className="mb-4 md:mb-0 text-destructive-foreground bg-destructive/40 hover:bg-destructive/50 border-destructive/20">!</Button>
              
              <Button onClick={handleSubmit} disabled={isLoading || fileProcessing || !textInput.trim()} className="bg-legal-primary hover:bg-legal-primary/90">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Simplify Document'}
              </Button>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-8 text-center text-muted-foreground text-sm">
        <p>We respect your privacy. Your document is processed securely and is not stored permanently.</p>
      </div>
    </div>
  );
};

export default UploadForm;
