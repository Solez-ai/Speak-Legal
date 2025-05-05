
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
const AboutDialog = () => {
  return <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto">About</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-legal-primary">About SpeakLegal</DialogTitle>
          <DialogDescription className="text-sm text-foreground/70 dark:text-foreground">
            Simplifying legal language for everyone
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <p className="text-foreground dark:text-foreground">
              Legal documents are made to protect — but too often, they confuse. Long paragraphs, cryptic phrases, and buried clauses can make it hard to know exactly what you're agreeing to. That's where SpeakLegal comes in.
            </p>
            
            <p className="text-foreground dark:text-foreground">
              SpeakLegal is an AI-powered tool designed to simplify complex legal documents into clear, understandable language — no law degree required. Just upload or paste your document, and SpeakLegal will instantly break it down into plain English, helping you grasp the meaning behind the jargon.
            </p>
            
            <p className="text-foreground dark:text-foreground">
              But we didn't stop at just simplifying text.
            </p>
            
            <p className="text-foreground dark:text-foreground">
              SpeakLegal also highlights confusing or suspicious clauses, flags important conditions, and even suggests smart questions you might want to ask before signing. Whether you're dealing with a rental agreement, freelance contract, NDA, or terms & conditions, SpeakLegal ensures you don't miss what matters.
            </p>
            
            <div className="bg-legal-secondary/20 dark:bg-legal-primary/10 p-4 rounded-md border-l-4 border-legal-primary my-6">
              <h3 className="font-bold text-legal-primary mb-2">Our mission is simple:</h3>
              <p className="text-foreground dark:text-foreground italic">
                To empower everyday people with clarity, confidence, and control over the legal language that affects their lives.
              </p>
            </div>
            
            <p className="text-foreground dark:text-foreground">
              No more blindly accepting terms. No more legal headaches.
              With SpeakLegal, you can finally understand what you're signing — and why it matters.
            </p>
            
            <p className="font-medium text-legal-primary text-center mt-6">
              SpeakLegal – Because legal shouldn't be a mystery.
            </p>
          </div>
          
          <div className="pt-6">
            <h3 className="text-xl font-bold text-legal-primary mb-4">Meet The Developers</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Samin Yeasar</CardTitle>
                  <CardDescription className="dark:text-foreground/80">Class 7 | BMARPC</CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center text-sm text-foreground/70 dark:text-foreground/80">
                    <Mail className="h-4 w-4 mr-2" />
                    sheditzofficial918@gmail.com
                  </div>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Md Adil Al Alim Cishti</CardTitle>
                  <CardDescription className="dark:text-foreground/80">Class 10 | GLAB</CardDescription>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center text-sm text-foreground/70 dark:text-foreground/80">
                    <Mail className="h-4 w-4 mr-2" />
                    sheditzofficial918@gmail.com
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default AboutDialog;
