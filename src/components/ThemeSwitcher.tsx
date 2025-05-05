
import React, { useEffect, useState } from 'react';
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
      className="relative overflow-hidden rounded-full transition-colors"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative flex h-[1.2rem] w-[1.2rem] items-center justify-center">
        <Palette className="h-5 w-5 rotate-0 scale-100 transition-all text-primary" />
      </div>
      <span className="sr-only">Toggle theme</span>
      
      {/* Color palette dots animation */}
      <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary animate-pulse-opacity" />
      <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-destructive animate-pulse-opacity delay-100" />
    </Button>
  );
};

export default ThemeSwitcher;
