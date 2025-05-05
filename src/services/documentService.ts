
// This is a mock service that simulates the processing of a legal document

export interface ProcessedDocument {
  simplifiedText: string;
  confusingClauses: Array<{
    text: string;
    reason: string;
    index: number;
  }>;
  suggestedQuestions: string[];
}

// Mock API function to process document
export const processDocument = async (text: string): Promise<ProcessedDocument> => {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // This is where in a real app we'd call an actual API
  // For now, we'll return mock data based on the input text
  
  // For demo purposes, let's create a simplified version
  const simplifiedText = simplifyText(text);
  
  // Find some "confusing" clauses (in a real app, this would be done by an NLP model)
  const confusingClauses = identifyConfusingClauses(text);
  
  // Generate some suggested questions
  const suggestedQuestions = generateQuestions(text);
  
  return {
    simplifiedText,
    confusingClauses,
    suggestedQuestions
  };
};

// Simplified mock functions
const simplifyText = (text: string): string => {
  // For demo, we'll just make some simple replacements to simulate simplification
  // In a real app, this would use an AI language model
  
  if (text.length < 50) {
    return "The provided text is too short to be processed effectively. Please provide a longer legal document.";
  }
  
  let simplified = text;
  
  // Replace some legal jargon with simpler alternatives
  const replacements: Record<string, string> = {
    "hereinafter": "from now on",
    "aforementioned": "previously mentioned",
    "pursuant to": "according to",
    "notwithstanding": "despite",
    "in accordance with": "following",
    "prior to": "before",
    "subsequent to": "after",
    "in the event that": "if",
    "for the purpose of": "to",
    "in excess of": "more than",
    "in the amount of": "for",
    "at the time of": "when",
    "in connection with": "related to",
    "with respect to": "about",
    "to the extent that": "if",
    "in lieu of": "instead of",
    "in addition to": "besides",
    "the undersigned": "I or we",
    "shall be": "will be",
    "shall not": "will not"
  };
  
  // Apply replacements
  Object.entries(replacements).forEach(([legalTerm, simpleTerm]) => {
    const regex = new RegExp(`\\b${legalTerm}\\b`, 'gi');
    simplified = simplified.replace(regex, simpleTerm);
  });
  
  // Break up long sentences
  simplified = simplified.replace(/([.!?])\s*(\w)/g, '$1\n\n$2');
  
  // Add a summary at the beginning for demo purposes
  const summary = "This is a legal document that has been simplified to make it easier to understand. The original language has been replaced with simpler terms, and complex sentences have been broken up into smaller parts.\n\n";
  
  return summary + simplified;
};

const identifyConfusingClauses = (text: string): Array<{text: string, reason: string, index: number}> => {
  // Mock function to identify "confusing" clauses
  // In a real app, this would be done by an NLP model
  
  const confusingPhrases = [
    "shall indemnify and hold harmless",
    "subject to the foregoing",
    "without limitation",
    "to the fullest extent permitted by law",
    "time is of the essence",
    "force majeure",
    "material breach",
    "liquidated damages",
    "waiver of subrogation",
    "severability clause",
  ];
  
  const results = [];
  
  // Simple search for phrases that might be confusing
  confusingPhrases.forEach(phrase => {
    const lowerText = text.toLowerCase();
    const lowerPhrase = phrase.toLowerCase();
    
    // Find the index of the phrase
    const index = lowerText.indexOf(lowerPhrase);
    if (index !== -1) {
      // Extract a bit of context around the phrase
      const start = Math.max(0, index - 40);
      const end = Math.min(text.length, index + phrase.length + 40);
      const extractedText = text.substring(start, end).trim();
      
      // Generate a "reason" for why it's confusing
      let reason;
      switch (phrase) {
        case "shall indemnify and hold harmless":
          reason = "This legal phrase means one party must protect the other from legal liability, but the extent of protection can be unclear.";
          break;
        case "subject to the foregoing":
          reason = "This refers to conditions mentioned earlier in the document, but doesn't explicitly state which ones apply.";
          break;
        case "without limitation":
          reason = "This phrase can make the scope of an agreement or obligation unclear by removing specific boundaries.";
          break;
        case "to the fullest extent permitted by law":
          reason = "This creates uncertainty because it depends on legal interpretations that may change over time.";
          break;
        case "time is of the essence":
          reason = "This makes deadlines critically important, but doesn't always specify the consequences of missing them.";
          break;
        case "force majeure":
          reason = "This excuses parties from obligations due to extraordinary events, but what qualifies can be ambiguous.";
          break;
        case "material breach":
          reason = "What qualifies as 'material' is subjective and can lead to disagreements about when the contract is violated.";
          break;
        case "liquidated damages":
          reason = "This sets predetermined compensation for specific breaches, but may be unclear or potentially unenforceable.";
          break;
        case "waiver of subrogation":
          reason = "This prevents insurance companies from seeking compensation from third parties, which can affect your rights.";
          break;
        case "severability clause":
          reason = "This states that if part of the contract is invalid, the rest remains enforceable, but the implications can be complex.";
          break;
        default:
          reason = "This legal terminology can be difficult to understand without specialized knowledge.";
      }
      
      results.push({
        text: extractedText,
        reason,
        index
      });
    }
  });
  
  return results;
};

const generateQuestions = (text: string): string[] => {
  // Mock function to generate questions
  // In a real app, this would be done by an AI model
  
  // Let's generate some generic questions that would be relevant for most legal documents
  const genericQuestions = [
    "What are my obligations under this agreement?",
    "What happens if I want to terminate this agreement early?",
    "Are there any penalties for late payments?",
    "How long is the term of this agreement?",
    "What law governs this agreement in case of disputes?"
  ];
  
  // Add some specific questions based on keywords in the text
  const specificQuestions = [];
  
  if (text.match(/\brent\b|\blease\b|\btenant\b|\blandlord\b/i)) {
    specificQuestions.push(
      "What is the exact amount I need to pay each month?",
      "Are utilities included in the rent amount?",
      "What is the policy for maintenance and repairs?",
      "Is subletting allowed under this agreement?"
    );
  }
  
  if (text.match(/\bemployment\b|\bemployee\b|\bemployer\b|\bsalary\b|\bwage\b/i)) {
    specificQuestions.push(
      "What are the exact terms of my compensation package?",
      "What are the conditions for termination of employment?",
      "Are there any non-compete or non-disclosure clauses?",
      "What benefits am I entitled to under this agreement?"
    );
  }
  
  if (text.match(/\bwarranty\b|\bguarantee\b|\bproduct\b|\bservice\b/i)) {
    specificQuestions.push(
      "How long does the warranty last?",
      "What exactly is covered under the warranty?",
      "What is the process for making a warranty claim?",
      "Are there any conditions that would void the warranty?"
    );
  }
  
  if (text.match(/\binsurance\b|\bpolicy\b|\bcoverage\b|\bpremium\b/i)) {
    specificQuestions.push(
      "What exactly is covered under this insurance policy?",
      "What is the claims process?",
      "Are there any situations where claims would be denied?",
      "How and when can the insurance company change the premium?"
    );
  }
  
  // Combine generic and specific questions, but limit the total to avoid overwhelming the user
  const combinedQuestions = [...specificQuestions, ...genericQuestions];
  return combinedQuestions.slice(0, 8); // Limit to 8 questions
};
