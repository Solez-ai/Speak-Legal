import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

// Updated legal glossary data with all terms
const glossaryTerms = [{
  term: "Agreement",
  definition: "A mutual understanding between parties about their rights and responsibilities. Often forms the basis of a contract."
}, {
  term: "Arbitration",
  definition: "A private method of resolving disputes outside court. An arbitrator makes a binding or non-binding decision."
}, {
  term: "Breach of Contract",
  definition: "When one party fails to fulfill their side of a legal agreement. This can lead to legal consequences or damages."
}, {
  term: "Case Law",
  definition: "Law developed from past judicial decisions. It guides future rulings on similar issues."
}, {
  term: "Civil Law",
  definition: "Deals with disputes between individuals or organizations. Common in areas like contracts, property, and family law."
}, {
  term: "Clause",
  definition: "A specific section within a legal document. Each clause addresses a different point or obligation."
}, {
  term: "Complaint",
  definition: "The initial document filed by a plaintiff to start a lawsuit. It outlines claims and legal reasons for the case."
}, {
  term: "Confidentiality Agreement",
  definition: "A contract requiring parties to keep certain info private. Common in business and employment deals."
}, {
  term: "Consideration",
  definition: "Something of value exchanged in a contract. It makes the agreement legally binding."
}, {
  term: "Contract",
  definition: "A written or spoken agreement that is enforceable by law. All parties must agree to its terms."
}, {
  term: "Court Order",
  definition: "A legal direction issued by a judge. Must be followed or legal penalties may apply."
}, {
  term: "Damages",
  definition: "Monetary compensation for loss or injury caused by another party. Can be actual or punitive."
}, {
  term: "Defendant",
  definition: "The person or entity being sued or accused in court. Opposite of the plaintiff."
}, {
  term: "Dispute",
  definition: "A legal disagreement between parties. It can lead to mediation, arbitration, or court."
}, {
  term: "Due Diligence",
  definition: "A thorough review before finalizing a deal. Often used in business or property transactions."
}, {
  term: "Enforceable",
  definition: "Means the agreement can be upheld by a court. It meets all legal requirements."
}, {
  term: "Fraud",
  definition: "Deliberate deception to gain unfair benefit. It is both a civil and criminal offense."
}, {
  term: "Indemnify",
  definition: "To compensate someone for a loss or damage. Often used in insurance and contracts."
}, {
  term: "Injunction",
  definition: "A court order that requires someone to stop doing something. Violating it can result in penalties."
}, {
  term: "Intellectual Property (IP)",
  definition: "Legal rights over creations like inventions, art, or brand names. Includes patents, copyrights, and trademarks."
}, {
  term: "Jurisdiction",
  definition: "A court's legal authority to hear a case. Depends on location and case type."
}, {
  term: "Lease",
  definition: "A contract granting temporary use of property in exchange for rent. Common for apartments or offices."
}, {
  term: "Liability",
  definition: "Legal responsibility for something, often involving damages or obligations. Can be personal or business-related."
}, {
  term: "Litigation",
  definition: "The process of resolving disputes through the court system. It includes filing lawsuits and going to trial."
}, {
  term: "Mediation",
  definition: "A voluntary dispute resolution method. A neutral mediator helps parties reach an agreement."
}, {
  term: "Minor",
  definition: "Someone under the age of legal adulthood. Minors usually cannot enter binding contracts."
}, {
  term: "Negligence",
  definition: "Failure to take reasonable care, causing harm. Common in personal injury and malpractice cases."
}, {
  term: "Non-Disclosure Agreement (NDA)",
  definition: "A contract that restricts sharing confidential info. Common in employment or partnerships."
}, {
  term: "Party",
  definition: "A person or group involved in a legal agreement or case. Includes plaintiffs, defendants, and signatories."
}, {
  term: "Patent",
  definition: "A legal right granted for an invention. It gives exclusive use to the inventor for a certain time."
}, {
  term: "Plaintiff",
  definition: "The person or entity who starts a lawsuit. They claim to have been wronged by the defendant."
}, {
  term: "Power of Attorney",
  definition: "A legal document giving someone authority to act for another. Useful in financial or health matters."
}, {
  term: "Premises",
  definition: "The land or property referred to in a legal agreement. Often used in leases or liability cases."
}, {
  term: "Pro Bono",
  definition: "Legal work done for free, often for the public good. Lawyers may offer this to low-income clients."
}, {
  term: "Remedy",
  definition: "The legal means of enforcing a right or fixing a wrong. Can be compensation or specific performance."
}, {
  term: "Rescission",
  definition: "Cancelling a contract and restoring all parties to their original state. Happens when there's a legal flaw."
}, {
  term: "Settlement",
  definition: "An agreement to resolve a dispute without a trial. Usually involves a compromise by both sides."
}, {
  term: "Statute",
  definition: "A written law passed by a legislative body. It must be followed by all within the jurisdiction."
}, {
  term: "Subpoena",
  definition: "A legal order requiring someone to appear in court or provide evidence. Ignoring it can lead to penalties."
}, {
  term: "Terms and Conditions",
  definition: "The rules and clauses in a contract. They define each party's rights and responsibilities."
}, {
  term: "Testimony",
  definition: "A statement made under oath, often in court. It can be verbal or written (affidavit)."
}, {
  term: "Tort",
  definition: "A civil wrong causing harm or loss. Includes negligence, defamation, and more."
}, {
  term: "Trademark",
  definition: "A symbol, name, or logo that represents a brand. Protects against unauthorized use."
}, {
  term: "Unilateral Contract",
  definition: "A contract where only one party makes a promise. Often seen in offers or rewards."
}, {
  term: "Venue",
  definition: "The location where a legal case is heard. Chosen based on convenience or law."
}, {
  term: "Verdict",
  definition: "The final decision by a judge or jury. It determines the outcome of a case."
}, {
  term: "Waiver",
  definition: "Giving up a legal right voluntarily. Must be done knowingly and clearly."
}, {
  term: "Warranty",
  definition: "A legal promise about the quality or durability of a product or service. Can be limited or full."
}, {
  term: "Will",
  definition: "A legal document stating how a person's property should be distributed after death. Must meet legal standards to be valid."
}, {
  term: "Witness",
  definition: "A person who saw an event or has relevant information. May testify in court under oath."
}, {
  term: "Addendum",
  definition: "An additional document added to a contract to include new terms or corrections. It's legally binding just like the original contract."
}, {
  term: "Adjudication",
  definition: "The legal process of resolving a dispute or deciding a case. A judge or arbitrator usually makes the final decision."
}, {
  term: "Affidavit",
  definition: "A written statement made under oath. It's often used as evidence in court."
}, {
  term: "Annulment",
  definition: "A legal declaration that a marriage was never valid. It's different from divorce because it erases the marriage entirely."
}, {
  term: "Appeal",
  definition: "A request to a higher court to review a lower court's decision. Used when one party believes there was a legal error."
}, {
  term: "Arraignment",
  definition: "The first court appearance where a criminal defendant hears their charges. They also enter a plea (guilty, not guilty, etc.)."
}, {
  term: "Asset Forfeiture",
  definition: "The legal process of seizing property connected to a crime. Common in drug and fraud cases."
}, {
  term: "Beneficiary",
  definition: "Someone who receives money or property from a will, trust, or insurance policy. They are the named recipient."
}, {
  term: "Bequest",
  definition: "A gift of personal property left in a will. Commonly used to describe inheritance of items or money."
}, {
  term: "Class Action",
  definition: "A lawsuit filed by a group of people with similar claims. Often used for product defects or large-scale harm."
}, {
  term: "Clemency",
  definition: "When a government official reduces a criminal sentence. It can involve pardons, commutations, or reprieves."
}, {
  term: "Collateral",
  definition: "Property pledged to secure a loan. If the borrower defaults, the lender can seize the collateral."
}, {
  term: "Common Law",
  definition: "Law based on customs, traditions, and previous court decisions. It evolves over time through rulings."
}, {
  term: "Compensatory Damages",
  definition: "Money awarded to make up for actual loss or injury. It restores the victim to their original position."
}, {
  term: "Contempt of Court",
  definition: "Disrespecting or disobeying a court order. It can lead to fines or jail time."
}, {
  term: "De Facto",
  definition: "Latin for \"in fact\" — describes something that exists in reality, even if not legally recognized."
}, {
  term: "De Jure",
  definition: "Latin for \"by law\" — something that is legally recognized, even if it doesn't exist in practice."
}, {
  term: "Deposition",
  definition: "Sworn, out-of-court testimony from a witness. It's recorded and used later in court."
}, {
  term: "Discovery",
  definition: "The pre-trial process of exchanging evidence and information. It ensures both sides are prepared."
}, {
  term: "Due Process",
  definition: "Legal procedures that protect individual rights. Everyone is entitled to fair treatment under the law."
}, {
  term: "Duress",
  definition: "Forcing someone to act against their will using threats or pressure. Contracts signed under duress may be void."
}, {
  term: "Emancipation",
  definition: "When a minor is legally declared independent from their parents. It gives them adult rights and responsibilities."
}, {
  term: "Encumbrance",
  definition: "A legal claim or restriction on property, like a mortgage or lien. It affects ownership rights."
}, {
  term: "Equity",
  definition: "Justice applied according to fairness, not strict law. Often used in family or property cases."
}, {
  term: "Escrow",
  definition: "Money or property held by a third party until a deal is completed. Common in real estate transactions."
}, {
  term: "Estoppel",
  definition: "A legal rule preventing someone from going back on a promise if it caused another person harm."
}, {
  term: "Ex Parte",
  definition: "A court proceeding with only one party present. Usually urgent and temporary."
}, {
  term: "Executor",
  definition: "A person appointed to carry out the terms of a will. They manage the deceased's estate."
}, {
  term: "Force Majeure",
  definition: "A clause that frees both parties from liability due to unforeseeable events (like natural disasters)."
}, {
  term: "Frivolous Lawsuit",
  definition: "A case with no legal merit, often meant to harass or delay. Courts can penalize such claims."
}, {
  term: "Garnishment",
  definition: "A legal process of taking money from wages to pay a debt. Usually ordered by a court."
}, {
  term: "Guardian ad Litem",
  definition: "A court-appointed person who represents a child or incapacitated person's best interests during legal cases."
}, {
  term: "Habeas Corpus",
  definition: "A legal action demanding someone in custody be brought to court. It prevents unlawful detention."
}, {
  term: "Heir",
  definition: "A person entitled to receive a deceased person's property under law or a will."
}, {
  term: "Immunity",
  definition: "Protection from legal action, often granted to witnesses in exchange for testimony."
}, {
  term: "Indemnity",
  definition: "An agreement to compensate someone for loss or damage. Common in insurance and contracts."
}, {
  term: "Intestate",
  definition: "Dying without a valid will. The state decides how your property is distributed."
}, {
  term: "Joinder",
  definition: "Combining multiple parties or claims into one lawsuit. It saves time and court resources."
}, {
  term: "Laches",
  definition: "Failure to assert a legal right in a timely manner. It can weaken or invalidate your claim."
}, {
  term: "Levy",
  definition: "A legal seizure of property to satisfy a tax debt or court judgment."
}, {
  term: "Libel",
  definition: "A false written statement that harms someone's reputation. It's a form of defamation."
}, {
  term: "Mitigation",
  definition: "Taking steps to reduce harm or loss. In law, victims must try to limit damages."
}, {
  term: "Notary Public",
  definition: "An official who witnesses document signing and verifies identity. Adds legal credibility to signatures."
}, {
  term: "Parole",
  definition: "Early release from prison under certain conditions. Violating parole can lead to re-incarceration."
}];
const LegalGlossary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTerms = searchTerm ? glossaryTerms.filter(item => item.term.toLowerCase().includes(searchTerm.toLowerCase()) || item.definition.toLowerCase().includes(searchTerm.toLowerCase())) : glossaryTerms;
  return <Dialog>
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
          <DialogTitle>Legal Terms Glossary </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input type="text" placeholder="Search terms or definitions..." className="mb-4" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <ScrollArea className="h-[60vh]">
            <div className="space-y-4">
              {filteredTerms.length > 0 ? filteredTerms.map((item, index) => <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
                    <h4 className="font-medium text-legal-primary">{item.term}</h4>
                    <p className="text-sm text-foreground dark:text-foreground mt-1">{item.definition}</p>
                  </div>) : <div className="text-center py-10">
                  <p className="text-foreground/70 dark:text-foreground">No terms found matching "{searchTerm}"</p>
                </div>}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>;
};
export default LegalGlossary;