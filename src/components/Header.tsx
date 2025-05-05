
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import AboutDialog from './AboutDialog';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView
}) => {
  return (
    <header className="w-full bg-card border-b border-border shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0 fade-in">
          <div className="text-legal-primary mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-pulse-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-legal-primary">SpeakLegal</h1>
              <span className="ml-2 text-sm text-accent-foreground bg-accent/20 px-2 py-0.5 rounded-full transition-all">AI</span>
            </div>
            <span className="text-xs text-muted-foreground">Powered by Typescript</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 fade-in stagger-1">
          <ThemeSwitcher />
          <ToggleGroup type="single" value={activeView} onValueChange={value => value && setActiveView(value)} className="rounded-full overflow-hidden shadow-sm">
            <ToggleGroupItem value="upload" className="px-3 py-1.5 rounded-l-full transition-all duration-300">
              <span className="mr-1">📄</span> 
              <span className="hidden sm:inline">Upload</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="results" className="px-3 py-1.5 rounded-r-full transition-all duration-300" disabled={activeView === 'upload'}>
              <span className="mr-1">🔎</span> 
              <span className="hidden sm:inline">Results</span>
            </ToggleGroupItem>
          </ToggleGroup>
          
          <AboutDialog />
        </div>
      </div>
    </header>
  );
};

export default Header;
