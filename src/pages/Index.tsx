
import React, { useState } from 'react';
import Header from '@/components/Header';
import UploadForm from '@/components/UploadForm';
import ResultsView from '@/components/ResultsView';
import LegalGlossary from '@/components/LegalGlossary';
import PrivacyPolicyDialog from '@/components/PrivacyPolicyDialog';
import TermsOfUseDialog from '@/components/TermsOfUseDialog';
import { processDocument, ProcessedDocument } from '@/services/documentService';
import { toast } from 'sonner';

const Index = () => {
  const [activeView, setActiveView] = useState<string>('upload');
  const [isLoading, setIsLoading] = useState(false);
  const [documentName, setDocumentName] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [processedResult, setProcessedResult] = useState<ProcessedDocument | null>(null);

  const handleProcessDocument = async (text: string, name: string) => {
    try {
      setIsLoading(true);
      setOriginalText(text);
      setDocumentName(name);
      
      // Call the service to process the document
      const result = await processDocument(text);
      setProcessedResult(result);
      
      // Switch to results view
      setActiveView('results');
      toast.success('Document successfully processed');
    } catch (error) {
      console.error('Error processing document:', error);
      toast.error('Failed to process document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setActiveView('upload');
    setOriginalText('');
    setDocumentName('');
    setProcessedResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors">
      <Header activeView={activeView} setActiveView={setActiveView} />
      
      <main className="flex-grow">
        {activeView === 'upload' ? (
          <UploadForm 
            onProcessDocument={handleProcessDocument}
            isLoading={isLoading}
          />
        ) : (
          processedResult && (
            <ResultsView
              documentName={documentName}
              originalText={originalText}
              simplifiedText={processedResult.simplifiedText}
              confusingClauses={processedResult.confusingClauses}
              suggestedQuestions={processedResult.suggestedQuestions}
              onReset={handleReset}
            />
          )
        )}
      </main>
      
      <footer className="bg-card border-t border-border py-4 transition-colors">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-2 md:mb-0">
            <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} SpeakLegal</span>
          </div>
          <div className="flex items-center space-x-4">
            <LegalGlossary />
            <PrivacyPolicyDialog />
            <TermsOfUseDialog />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
