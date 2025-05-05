
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

// Simple legal glossary data
const glossaryTerms = [
  {
    term: "Arbitration",
    definition: "A process where disputes are resolved by an impartial third party instead of going to court."
  },
  {
    term: "Breach of Contract",
    definition: "When a party fails to fulfill their obligations under a contract without a lawful excuse."
  },
  {
    term: "Consideration",
    definition: "Something of value exchanged between parties to make a contract valid."
  },
  {
    term: "Defendant",
    definition: "The person against whom a lawsuit is filed or a criminal charge is brought."
  },
  {
    term: "Estoppel",
    definition: "A legal principle that prevents someone from asserting something contrary to what is implied by their previous actions or statements."
  },
  {
    term: "Force Majeure",
    definition: "A clause that frees parties from obligation when extraordinary events occur that are beyond their control."
  },
  {
    term: "Indemnification",
    definition: "Compensation for harm or loss; protection against legal liability."
  },
  {
    term: "Jurisdiction",
    definition: "The official power to make legal decisions and judgments in a particular area or matter."
  },
  {
    term: "Liability",
    definition: "Legal responsibility for something, especially costs or damages."
  },
  {
    term: "Negligence",
    definition: "Failure to exercise the care that a reasonably prudent person would exercise in similar circumstances."
  },
  {
    term: "Plaintiff",
    definition: "A person who brings a case against another in a court of law."
  },
  {
    term: "Quid Pro Quo",
    definition: "Something given or received for something else; a favor or advantage granted in return for something."
  },
  {
    term: "Rescission",
    definition: "The cancellation of a contract, returning the parties to their positions before the contract was made."
  },
  {
    term: "Statute of Limitations",
    definition: "A law that sets the maximum time after an event within which legal proceedings may be initiated."
  },
  {
    term: "Tort",
    definition: "A wrongful act that results in injury to another's person, property, reputation, and leads to civil liability."
  }
];

const LegalGlossary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTerms = searchTerm 
    ? glossaryTerms.filter(item => 
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : glossaryTerms;
    
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center text-legal-primary text-sm hover:text-legal-accent transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Legal Glossary
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Legal Terms Glossary</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            type="text"
            placeholder="Search terms or definitions..."
            className="mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ScrollArea className="h-[60vh]">
            <div className="space-y-4">
              {filteredTerms.length > 0 ? (
                filteredTerms.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
                    <h4 className="font-medium text-legal-primary">{item.term}</h4>
                    <p className="text-sm text-foreground dark:text-foreground mt-1">{item.definition}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-foreground/70 dark:text-foreground">No terms found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LegalGlossary;
