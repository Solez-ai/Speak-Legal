
import React from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden rounded-full transition-all duration-500 hover:bg-accent/30 hover:scale-105"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative flex h-[1.2rem] w-[1.2rem] items-center justify-center">
        <Palette 
          className={`h-5 w-5 transition-all duration-700 ${
            theme === 'dark' 
              ? 'rotate-90 text-primary animate-pulse-opacity' 
              : 'rotate-0 text-primary'
          }`} 
        />
      </div>
      <span className="sr-only">Toggle theme</span>
      
      {/* Enhanced color palette dots animation */}
      <span className={`absolute -right-1 -top-1 h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-legal-primary'} animate-pulse-opacity`} />
      <span className={`absolute -bottom-1 -left-1 h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-red-400' : 'bg-destructive'} animate-pulse-opacity delay-100`} />
      <span className={`absolute top-1 -left-1 h-1.5 w-1.5 rounded-full ${theme === 'dark' ? 'bg-green-400' : 'bg-accent'} animate-pulse-opacity delay-200`} />
    </Button>
  );
};

export default ThemeSwitcher;
