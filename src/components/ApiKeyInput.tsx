
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { setGeminiApiKey } from '@/services/geminiService';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  onSave: () => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, setApiKey, onSave }) => {
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
    onSave();
    toast.success("API key saved successfully");
  };

  return (
    <div className="mb-6 p-4 border rounded-lg dark:border-border bg-gray-50 dark:bg-card shadow-sm dark:shadow-md">
      <h3 className="text-lg font-medium mb-2 text-foreground">API Key Required</h3>
      <p className="text-foreground/80 dark:text-foreground/90 mb-4">
        Enter your Gemini API key to process documents. You can get one from{' '}
        <a 
          href="https://ai.google.dev/" 
          target="_blank" 
          rel="noreferrer" 
          className="text-legal-primary hover:underline transition-all duration-300"
        >
          Google AI Studio
        </a>
        .
      </p>
      <div className="flex flex-col space-y-4">
        <div>
          <Label htmlFor="api-key" className="text-foreground">Gemini API Key</Label>
          <Input 
            id="api-key" 
            type="password" 
            value={apiKey} 
            onChange={handleApiKeyChange} 
            placeholder="Enter your Gemini API key"
            className="mt-1 border-input dark:border-input/80 text-foreground bg-background dark:bg-background/80"
          />
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={handleApiKeySubmit}
            className="bg-legal-primary hover:bg-legal-primary/90 text-white dark:text-white rounded-full btn-modern"
          >
            Save API Key
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyInput;
