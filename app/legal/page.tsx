'use client';

import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Scale,
  Lock,
  Gavel,
  ArrowLeft,
  AlertTriangle,
  EyeOff,
  FileWarning,
  Zap,
  Users,
  MapPin,
  FileText,
  UserX,
} from 'lucide-react';
import Link from 'next/link';

export default function LegalPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      icon: <FileText className="h-5 w-5" />,
      content:
        'These Terms of Service ("Terms") constitute a legally binding agreement between you ("User") and MNDLY Inc. ("Company," "we," "us," or "our") governing your use of the Echo platform ("Service"). By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must immediately cease all use of the Service.',
    },
    {
      title: '2. Eligibility and Account Requirements',
      icon: <Users className="h-5 w-5" />,
      content:
        'You must be at least 18 years of age to use this Service. By using Echo, you represent and warrant that you are of legal age to form a binding contract. You are solely responsible for ensuring that your use of the Service complies with all applicable local, state, national, and international laws and regulations. The Company reserves the right to request verification of age and to terminate accounts that violate this requirement.',
    },
    {
      title: '3. Nature of Service and Content Disclaimer',
      icon: <ShieldAlert className="h-5 w-5" />,
      content:
        'Echo is an anonymous, ephemeral messaging platform. The Company acts as a passive conduit for user-generated content and does not monitor, pre-screen, review, or edit user messages. We do not endorse, support, represent, or guarantee the completeness, truthfulness, accuracy, or reliability of any content transmitted through the Service. You acknowledge that you may be exposed to content that is offensive, harmful, inaccurate, or otherwise objectionable, and you agree that the Company shall have no liability to you for such content.',
    },
    {
      title: '4. User Conduct and Prohibited Activities',
      icon: <AlertTriangle className="h-5 w-5" />,
      content:
        "You agree not to use the Service to: (a) transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable; (b) impersonate any person or entity; (c) transmit any unsolicited advertising or promotional materials; (d) interfere with or disrupt the Service or servers; (e) attempt to gain unauthorized access to the Service; (f) violate any applicable laws or regulations; (g) engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service. Violation of these terms may result in immediate termination of your access to the Service and potential legal action.",
    },
    {
      title: '5. Data Deletion and "Midnight Wipe" Protocol',
      icon: <Lock className="h-5 w-5" />,
      content:
        'All messages and user data are automatically deleted from our servers at midnight UTC each day ("Midnight Wipe"). This deletion occurs at the software and database level. THE COMPANY MAKES NO REPRESENTATION OR WARRANTY REGARDING THE COMPLETE AND IRRECOVERABLE DELETION OF DATA AT THE HARDWARE OR FORENSIC LEVEL. You acknowledge that: (a) advanced forensic techniques or state-level actors may potentially recover deleted data; (b) we do not guarantee "cryptographic shredding" or complete data destruction at the physical storage level; (c) we maintain no backups, logs, or archives of deleted content; and (d) once data is deleted, we cannot recover it for any purpose, including legal proceedings or law enforcement requests.',
    },
    {
      title: '6. Third-Party Data Capture Disclaimer',
      icon: <EyeOff className="h-5 w-5" />,
      content:
        'The Midnight Wipe only applies to data stored on our servers. We cannot and do not control what users do with messages they receive. Other users may screenshot, photograph, record, or otherwise capture content you send before it is deleted from our servers. THE COMPANY HAS NO RESPONSIBILITY OR LIABILITY FOR ANY THIRD-PARTY CAPTURE, STORAGE, OR DISTRIBUTION OF YOUR CONTENT. Once you send a message, it is beyond your control and beyond our control. You use the Service with full understanding of this risk.',
    },
    {
      title: '7. Limitation of Liability',
      icon: <ShieldAlert className="h-5 w-5" />,
      content:
        "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE COMPANY, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM: (A) YOUR USE OR INABILITY TO USE THE SERVICE; (B) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS; (C) ANY INTERRUPTION OR CESSATION OF THE SERVICE; (D) ANY BUGS, VIRUSES, OR THE LIKE THAT MAY BE TRANSMITTED THROUGH THE SERVICE; (E) ANY ERRORS OR OMISSIONS IN ANY CONTENT; OR (F) ANY USER CONTENT OR CONDUCT OF ANY THIRD PARTY ON THE SERVICE. IN NO EVENT SHALL THE COMPANY'S AGGREGATE LIABILITY EXCEED ONE HUNDRED DOLLARS ($100.00 USD) OR THE AMOUNT YOU PAID TO ACCESS THE SERVICE IN THE PAST SIX MONTHS, WHICHEVER IS GREATER.",
    },
    {
      title: '8. Indemnification',
      icon: <FileWarning className="h-5 w-5" />,
      content:
        "You agree to defend, indemnify, and hold harmless the Company, its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, debt, and expenses (including but not limited to attorney's fees) arising from: (a) your use of and access to the Service; (b) your violation of these Terms; (c) your violation of any third-party right, including without limitation any copyright, property, or privacy right; (d) any claim that your content caused damage to a third party; or (e) any content you post or transmit through the Service. This defense and indemnification obligation will survive termination of these Terms and your use of the Service.",
    },
    {
      title: '9. Arbitration Agreement and Class Action Waiver',
      icon: <Gavel className="h-5 w-5" />,
      content:
        'PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS. Any dispute, claim, or controversy arising out of or relating to these Terms or the Service shall be resolved by binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. The arbitration shall be conducted in Delaware, United States, and judgment on the arbitration award may be entered in any court having jurisdiction. YOU HEREBY WAIVE YOUR RIGHT TO PARTICIPATE AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS ACTION LAWSUIT, CLASS-WIDE ARBITRATION, PRIVATE ATTORNEY-GENERAL ACTION, OR ANY OTHER REPRESENTATIVE OR CONSOLIDATED PROCEEDING. This arbitration agreement shall survive the termination of these Terms.',
    },
    {
      title: '10. Force Majeure',
      icon: <Zap className="h-5 w-5" />,
      content:
        'The Company shall not be liable for any failure or delay in performance under these Terms due to causes beyond its reasonable control, including but not limited to: acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials. This includes technical failures such as server crashes, data center outages, network failures, cyber attacks, or any other infrastructure failures that may prevent the Midnight Wipe from occurring as scheduled.',
    },
    {
      title: '11. No Duty to Monitor; Voluntary Reporting',
      icon: <UserX className="h-5 w-5" />,
      content:
        'The Company has no obligation to monitor user content or communications. However, we reserve the right (but have no obligation) to monitor, investigate, and take action regarding content or user behavior that we believe, in our sole discretion, violates these Terms or applicable law. If we become aware of potentially illegal activity, we may, at our sole discretion, report such activity to law enforcement authorities. You waive any claims against the Company for: (a) taking action to report suspected illegal activity; or (b) failing to take action regarding such activity. We do not act as a law enforcement agency or moral arbiter, and any actions we take or fail to take do not create any duty or liability.',
    },
    {
      title: '12. Intellectual Property Rights',
      icon: <FileText className="h-5 w-5" />,
      content:
        'The Service and its original content (excluding user-generated content), features, and functionality are and will remain the exclusive property of MNDLY Inc. and its licensors. The Service is protected by copyright, trademark, and other laws. You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Service solely for personal, non-commercial purposes. You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any content from the Service without our express written permission.',
    },
    {
      title: '13. Privacy and Data Processing',
      icon: <Lock className="h-5 w-5" />,
      content:
        'Our collection and use of personal information is described in our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you consent to our collection and use of personal data in accordance with the Privacy Policy. We implement reasonable security measures to protect data, but we cannot guarantee absolute security. You acknowledge that any data transmission over the Internet involves inherent security risks, and you assume all such risks.',
    },
    {
      title: '14. Modifications to Terms',
      icon: <FileWarning className="h-5 w-5" />,
      content:
        'We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on the Service and updating the "Effective Date" at the top of this page. Your continued use of the Service after such changes constitutes your acceptance of the new Terms. If you do not agree to the modified Terms, you must stop using the Service immediately. It is your responsibility to review these Terms periodically.',
    },
    {
      title: '15. Termination',
      icon: <AlertTriangle className="h-5 w-5" />,
      content:
        'We reserve the right to suspend or terminate your access to the Service at any time, with or without cause, with or without notice, and without liability. Upon termination, your right to use the Service will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including but not limited to: ownership provisions, warranty disclaimers, indemnification obligations, limitations of liability, and arbitration provisions.',
    },
    {
      title: '16. Governing Law and Jurisdiction',
      icon: <MapPin className="h-5 w-5" />,
      content:
        'These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. To the extent that any lawsuit or court proceeding is permitted under these Terms, you and the Company agree to submit to the personal and exclusive jurisdiction of the state and federal courts located in Delaware. The United Nations Convention on Contracts for the International Sale of Goods does not apply to these Terms.',
    },
    {
      title: '17. Severability and Waiver',
      icon: <Scale className="h-5 w-5" />,
      content:
        "If any provision of these Terms is found to be unenforceable or invalid under applicable law, such provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect. No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term, and the Company's failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.",
    },
    {
      title: '18. Entire Agreement',
      icon: <FileText className="h-5 w-5" />,
      content:
        'These Terms, together with the Privacy Policy and any other legal notices published by the Company on the Service, constitute the entire agreement between you and the Company concerning the Service. These Terms supersede all prior or contemporaneous communications and proposals, whether electronic, oral, or written, between you and the Company with respect to the Service. A printed version of these Terms and of any notice given in electronic form shall be admissible in judicial or administrative proceedings to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <header className="space-y-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Return to Echo
          </Link>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Terms of Service
            </h1>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground pt-4 border-t">
              <p>
                <span className="font-semibold">Effective Date:</span> February
                09, 2026
              </p>
              <p>
                <span className="font-semibold">Last Updated:</span> February
                09, 2026
              </p>
              <p>
                <span className="font-semibold">Legal Entity:</span> MNDLY Inc.
              </p>
            </div>
          </div>
        </header>

        {/* IMPORTANT NOTICE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-destructive/10 border-2 border-destructive/20 p-8 rounded-lg space-y-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h2 className="font-bold text-xl text-destructive">
                Important Legal Notice
              </h2>
              <p className="font-medium leading-relaxed">
                THESE TERMS OF SERVICE CONTAIN IMPORTANT LEGAL PROVISIONS,
                INCLUDING AN ARBITRATION AGREEMENT AND CLASS ACTION WAIVER THAT
                AFFECT YOUR LEGAL RIGHTS. BY USING THE ECHO PLATFORM, YOU AGREE
                TO BE BOUND BY THESE TERMS. PLEASE READ THEM CAREFULLY. IF YOU
                DO NOT AGREE TO THESE TERMS, DO NOT USE THE SERVICE.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Legal Sections */}
        <main className="grid gap-12">
          {sections.map((section, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                  {section.icon}
                </div>
                <div className="flex-1 space-y-3">
                  <h2 className="text-xl font-bold">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.section>
          ))}
        </main>

        {/* Additional Disclosures */}
        <section className="pt-12 border-t space-y-8">
          <div className="bg-muted/50 p-8 rounded-lg border space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wide text-muted-foreground">
              Additional Disclosures
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong>Export Control:</strong> You agree to comply with all
                applicable export and re-export control laws and regulations,
                including the Export Administration Regulations maintained by
                the U.S. Department of Commerce and sanctions programs
                administered by the Office of Foreign Assets Control.
              </p>
              <p>
                <strong>Government Use:</strong> If you are a government entity
                or using the Service on behalf of a government entity, you
                acknowledge that the Service is "commercial computer software"
                and "commercial computer software documentation" and that you
                have only the rights granted to all other users under these
                Terms.
              </p>
              <p>
                <strong>California Residents:</strong> Under California Civil
                Code Section 1789.3, California users are entitled to the
                following consumer rights notice: If you have a question or
                complaint regarding the Service, please contact us at
                legal@mndly.com. California residents may also reach the
                Complaint Assistance Unit of the Division of Consumer Services
                of the California Department of Consumer Affairs by mail at 1625
                North Market Blvd., Suite N 112, Sacramento, CA 95834 or by
                telephone at (916) 445-1254 or (800) 952-5210.
              </p>
              <p>
                <strong>Contact Information:</strong> For questions about these
                Terms, please contact us at legal@mndly.com or MNDLY Inc., [Full
                Address], Delaware, United States.
              </p>
            </div>
          </div>

          <div className="bg-card border p-6 rounded-lg">
            <p className="text-xs text-muted-foreground">
              By clicking "I Accept" or by accessing or using the Echo platform,
              you acknowledge that you have read, understood, and agree to be
              bound by these Terms of Service. If you are accepting these Terms
              on behalf of a company or other legal entity, you represent that
              you have the authority to bind such entity to these Terms.
            </p>
          </div>
        </section>

        <footer className="text-center py-12 border-t">
          <div className="space-y-4">
            <p className="text-sm font-semibold">
              Echo by MNDLY · Privacy-First Anonymous Chat
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
