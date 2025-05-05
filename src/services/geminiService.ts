import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
// In a production app, this would come from environment variables
// For demo purposes, we're using a temporary input approach
let apiKey = 'AIzaSyB96FFOY6Q_huj-jcii0eH6CQf7Ni9RhTE'; // Pre-filled API key

export const setGeminiApiKey = (key: string) => {
  apiKey = key;
};

export const getGeminiApiKey = () => {
  return apiKey;
};

export const isGeminiApiKeySet = () => {
  return apiKey.trim().length > 0;
};

// Initialize the Gemini API client
export const getGeminiClient = () => {
  if (!apiKey) {
    throw new Error("Gemini API key not set");
  }
  
  return new GoogleGenerativeAI(apiKey);
};

// Function to simplify legal text
export const simplifyLegalText = async (text: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("Gemini API key not set");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  You are a legal document simplifier. Your task is to translate the following legal document into plain, easy-to-understand English.
  Make sure to:
  - Replace legal jargon with everyday language
  - Break down complex sentences into simpler ones
  - Keep the meaning intact
  - Organize the text with proper paragraphs for readability
  
  Here's the legal text to simplify:
  ${text}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const simplifiedText = response.text();
    return simplifiedText;
  } catch (error) {
    console.error("Error simplifying text with Gemini:", error);
    throw new Error("Failed to simplify text with Gemini API");
  }
};

// Function to identify confusing clauses
export const identifyConfusingClauses = async (text: string): Promise<Array<{text: string, reason: string, index: number}>> => {
  if (!apiKey) {
    throw new Error("Gemini API key not set");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  You are a legal expert helping to identify confusing or complex clauses in legal documents.
  
  Analyze the following legal text and identify 3-7 of the most confusing clauses or sections. 
  For each confusing clause:
  1. Extract the exact text of the clause
  2. Explain why it might be confusing to a non-lawyer
  3. Provide the approximate character position where this clause appears in the original text
  
  Format your response exactly as follows (in valid JSON format):
  [
    {
      "text": "the exact text of the confusing clause",
      "reason": "explanation of why this clause is confusing",
      "index": 1234
    },
    {
      "text": "another confusing clause",
      "reason": "explanation for this clause",
      "index": 5678
    }
  ]
  
  Here's the legal text to analyze:
  ${text}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const clausesText = response.text();
    
    try {
      const parsedClauses = JSON.parse(clausesText);
      return parsedClauses;
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      return [];
    }
  } catch (error) {
    console.error("Error identifying confusing clauses with Gemini:", error);
    return [];
  }
};

// Function to generate suggested questions
export const generateSuggestedQuestions = async (text: string): Promise<string[]> => {
  if (!apiKey) {
    throw new Error("Gemini API key not set");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  You are a helpful legal assistant. Based on the following legal document, generate 5-8 important questions that someone might want to ask about this document.
  
  These questions should:
  - Address key provisions, obligations, or rights
  - Focus on areas that may need clarification
  - Be phrased in plain language that non-lawyers can understand
  - Be specific to the content of this particular document
  
  Format your response as a JSON array of strings with just the questions:
  ["Question 1", "Question 2", "Question 3", ...]
  
  Here's the legal document:
  ${text}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const questionsText = response.text();
    
    try {
      const parsedQuestions = JSON.parse(questionsText);
      return parsedQuestions;
    } catch (parseError) {
      console.error("Error parsing Gemini response for questions:", parseError);
      return [];
    }
  } catch (error) {
    console.error("Error generating questions with Gemini:", error);
    return [];
  }
};
