
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const PrivacyPolicyDialog = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button 
          className="text-sm text-legal-primary hover:text-legal-accent"
          onClick={() => setOpen(true)}
        >
          Privacy Policy
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-legal-primary">SpeakLegal – Privacy Policy</DialogTitle>
          <DialogDescription className="text-sm text-foreground/70 dark:text-foreground">
            Effective Date: May 5, 2025
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-4 py-4">
            <p className="text-foreground dark:text-foreground">
              At SpeakLegal, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our App.
            </p>
            
            <div>
              <h3 className="font-bold text-legal-primary">1. Information We Collect</h3>
              <p className="text-foreground dark:text-foreground mt-2">
                When you use SpeakLegal, we may collect the following types of information:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li className="text-foreground dark:text-foreground">
                  <span className="font-medium">Non-personal Information:</span> This includes basic technical data like your device type, operating system, usage statistics, and crash reports, which help us improve the App's performance.
                </li>
                <li className="text-foreground dark:text-foreground">
                  <span className="font-medium">User-Provided Data:</span> When you upload documents to the App, we process and analyze them to provide you with legal document summaries and suggestions. We do not retain, sell, or share your documents with third parties.
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-legal-primary">2. How We Use Your Information</h3>
              <p className="text-foreground dark:text-foreground mt-2">
                We use the collected data to:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li className="text-foreground dark:text-foreground">Provide and improve the functionality of the App.</li>
                <li className="text-foreground dark:text-foreground">Analyze app usage to enhance user experience.</li>
                <li className="text-foreground dark:text-foreground">Respond to technical issues and provide support when needed.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-legal-primary">3. Data Storage & Security</h3>
              <p className="text-foreground dark:text-foreground mt-2">
                We take reasonable measures to protect the information you provide to us. Your documents are processed temporarily and are not stored on our servers beyond the time necessary to generate summaries. While we use industry-standard encryption to secure your data, no system is entirely immune from security risks.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-legal-primary">4. Third-Party Services</h3>
              <p className="text-foreground dark:text-foreground mt-2">
                SpeakLegal does not share or sell your personal data to third parties. However, we may use third-party service providers to help us operate and improve the App (e.g., analytics services). These third-party services may have access to certain data but will be obligated to protect it according to applicable privacy laws.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-legal-primary">5. Changes to This Privacy Policy</h3>
              <p className="text-foreground dark:text-foreground mt-2">
                We may update this Privacy Policy periodically. Any changes will be reflected with an updated "Effective Date." We recommend reviewing this policy regularly to stay informed about how your data is protected.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-legal-primary">6. Contact Us</h3>
              <p className="text-foreground dark:text-foreground mt-2">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us at:
                <br />
                <span className="font-medium">sheditzofficial918@gmail.com | adilalalim2008@gmail.com</span>
              </p>
            </div>
            
            <p className="text-foreground dark:text-foreground italic">
              By using SpeakLegal, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyDialog;
