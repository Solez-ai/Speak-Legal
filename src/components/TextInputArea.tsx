
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface TextInputAreaProps {
  textInput: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextInputArea: React.FC<TextInputAreaProps> = ({ textInput, onTextChange }) => {
  return (
    <Textarea
      placeholder="Paste your legal text here..."
      className="min-h-[300px] mb-6"
      value={textInput}
      onChange={onTextChange}
    />
  );
};

export default TextInputArea;
