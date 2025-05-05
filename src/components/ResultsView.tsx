
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

interface ResultsViewProps {
  documentName: string;
  originalText: string;
  simplifiedText: string;
  confusingClauses: Array<{
    text: string;
    reason: string;
    index: number;
  }>;
  suggestedQuestions: string[];
  onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({
  documentName,
  originalText,
  simplifiedText,
  confusingClauses,
  suggestedQuestions,
  onReset
}) => {
  const [activeTab, setActiveTab] = useState('simplified');

  const handleExport = () => {
    const element = document.createElement('a');
    
    let content = '';
    if (activeTab === 'simplified') {
      content = `# Simplified Version of: ${documentName}\n\n${simplifiedText}`;
    } else if (activeTab === 'confusing') {
      content = `# Confusing Clauses in: ${documentName}\n\n${confusingClauses.map(clause => 
        `CLAUSE: ${clause.text}\nREASON: ${clause.reason}\n\n`).join('')}`;
    } else {
      content = `# Suggested Questions for: ${documentName}\n\n${suggestedQuestions.map(q => `- ${q}\n`).join('')}`;
    }
    
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${activeTab}_${documentName.replace(/\.[^/.]+$/, '')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="bg-card rounded-lg shadow-md border border-border transition-colors slide-in card-hover">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            <div className="fade-in">
              <h2 className="text-2xl font-semibold text-legal-primary">{documentName}</h2>
              <p className="text-muted-foreground text-sm">Simplified document results</p>
            </div>
            <div className="flex space-x-2 self-end md:self-start fade-in stagger-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExport}
                className="rounded-full btn-modern"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onReset}
                className="rounded-full btn-modern"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                New Document
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="fade-in stagger-2">
            <TabsList className="grid grid-cols-3 rounded-full">
              <TabsTrigger value="simplified" className="rounded-l-full">Simplified Text</TabsTrigger>
              <TabsTrigger value="confusing" className="border-x border-border/30">
                Confusing Clauses
                {confusingClauses.length > 0 && (
                  <span className="ml-2 bg-legal-accent/20 text-accent-foreground text-xs py-0.5 px-2 rounded-full">
                    {confusingClauses.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="questions" className="rounded-r-full">
                Questions
                {suggestedQuestions.length > 0 && (
                  <span className="ml-2 bg-legal-accent/20 text-accent-foreground text-xs py-0.5 px-2 rounded-full">
                    {suggestedQuestions.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="simplified" className="mt-6 fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-hover">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Original Text</h3>
                  <div className="bg-muted/30 p-4 rounded-lg border border-border h-[400px] overflow-y-auto shadow-sm">
                    <pre className="whitespace-pre-wrap text-sm">{originalText}</pre>
                  </div>
                </div>
                <div className="card-hover">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Simplified Text</h3>
                  <div className="bg-card p-4 rounded-lg border border-border h-[400px] overflow-y-auto shadow-sm">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{simplifiedText}</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="confusing" className="mt-6 fade-in">
              {confusingClauses.length > 0 ? (
                <div className="space-y-4">
                  {confusingClauses.map((clause, index) => (
                    <div key={index} className="confusing-clause card-hover">
                      <p className="font-medium mb-2">{clause.text}</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="inline-flex items-center text-xs bg-accent/10 px-2 py-1 rounded-full text-accent-foreground transition-all hover:bg-accent/20">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Why this is confusing
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{clause.reason}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 fade-in">
                  <p className="text-muted-foreground">No confusing clauses identified</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="questions" className="mt-6 fade-in">
              {suggestedQuestions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestedQuestions.map((question, index) => (
                    <div key={index} className="question-item card-hover">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5 text-legal-accent">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-foreground">{question}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 fade-in">
                  <p className="text-muted-foreground">No suggested questions available</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
