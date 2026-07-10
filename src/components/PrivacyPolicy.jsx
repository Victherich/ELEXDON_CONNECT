import React from 'react';
import styled from 'styled-components';

const PrivacyPolicyPage = () => {
  return (
    <PageWrapper>
      <HeaderSection>
        <h1>PRIVACY POLICY</h1>
        <p>Elexdon Pay Connect | <a href="https://elexdonpay.com" target="_blank" rel="noreferrer">https://elexdonpay.com</a></p>
        <p><small>Effective Date: 28 June 2026</small></p>
      </HeaderSection>

      <ContentCard>
        <IntroText>
          <strong>Elexdon Pay Connect</strong>-a subsidiary of Elexdon Digital Technologies Limited ("Elexdon," "we," "us," "our")
        </IntroText>

        <PolicySection>
          <h3>1. Introduction</h3>
          <p>At Elexdon Pay Connect, we are committed to protecting the privacy and security of personal data entrusted to us. This Privacy Policy describes how we collect, use, disclose, retain, and safeguard information when you access our website, mobile application, and payment services (collectively, the "Platform"). By using the Platform, you acknowledge that you have read and understood this, Policy.</p>
        </PolicySection>

        <PolicySection>
          <h3>2. Data Controller</h3>
          <p>Elexdon Pay Connect Limited, with its registered office in Abuja, Federal Capital Territory, Nigeria, is the data controller responsible for the processing of your personal data under the Nigeria Data Protection Regulation, 2019.</p>
        </PolicySection>

        <PolicySection>
          <h3>3. Information We Collect</h3>
          <p>We collect information necessary to provide secure bill payment and financial services:</p>
          <ul>
            <li><strong>a. Information you provide:</strong> full name, phone number, email address, Bank Verification Number (BVN), National Identification Number (NIN), residential address, date of birth, government-issued identification, and payment details.</li>
            <li><strong>b. Transaction information:</strong> beneficiary details, billers, meter numbers, transaction amounts, timestamps, device identifiers, and location data for fraud prevention.</li>
            <li><strong>c. technical information:</strong> IP address, browser type, operating system, log data, and cookies.</li>
            <li><strong>d. Information from third parties:</strong> identity verification providers, credit bureaus, financial institutions, and regulatory agencies as required by law.</li>
          </ul>
        </PolicySection>

        <PolicySection>
          <h3>4. How We Use Your Information</h3>
          <p>We process personal data strictly for defined, legitimate purposes:</p>
          <ul>
            <li>To create, verify, and manage your account</li>
            <li>To process bill payments, airtime, data, and funds transfers</li>
            <li>To comply with Know Your Customer (KYC), Anti-Money Laundering (AML), and Counter-Terrorist Financing (CTF) obligations</li>
            <li>To detect, prevent, and investigate fraud and security incidents</li>
            <li>To provide customer support and service notifications</li>
            <li>To improve our Platform, perform analytics, and develop new products</li>
            <li>To communicate material updates to our terms and policies</li>
          </ul>
        </PolicySection>

        <PolicySection>
          <h3>5. Legal Basis for Processing</h3>
          <p>We rely on contractual necessity, legal obligation, legitimate interest, and consent where required under the NDPR.</p>
        </PolicySection>

        <PolicySection>
          <h3>6. Disclosure of Information</h3>
          <p>We do not sell personal data. We may disclose information only to:</p>
          <ul>
            <li>Licensed payment processors, switching companies, and settlement banks</li>
            <li>Regulatory authorities including the Central Bank of Nigeria, NFIU, and NDPC</li>
            <li>Professional advisers, auditors, and technology service providers bound by confidentiality</li>
            <li>Law enforcement agencies pursuant to a valid legal request</li>
          </ul>
          <p>All third parties are contractually obligated to maintain equivalent data protection standards.</p>
        </PolicySection>

        <PolicySection>
          <h3>7. Data Security</h3>
          <p>We implement administrative, technical, and physical safeguards including encryption in transit and at rest, multi-factor authentication, role-based access controls, and regular security audits. While we employ industry-standard measures, no system can guarantee absolute security.</p>
        </PolicySection>

        <PolicySection>
          <h3>8. Data Retention</h3>
          <p>We retain personal data for as long as necessary to fulfill the purposes outlined herein, and for a minimum period required by CBN and AML regulations, typically seven years after account closure. Data is securely deleted or anonymized thereafter.</p>
        </PolicySection>

        <PolicySection>
          <h3>9. Your Rights</h3>
          <p>Subject to applicable law, you have the right to request access, rectification, erasure, restriction of processing, data portability, and objection to processing. Requests should be submitted in writing to our Data Protection Officer. We will respond within the statutory timeframe.</p>
        </PolicySection>

        <PolicySection>
          <h3>10. Cookies and Tracking Technologies</h3>
          <p>Our Platform uses essential cookies for authentication and security, and analytical cookies to improve performance. You may manage cookie preferences through your browser settings. Disabling essential cookies may impair functionality.</p>
        </PolicySection>

        <PolicySection>
          <h3>11. International Data Transfers</h3>
          <p>Where data is transferred outside Nigeria, we ensure adequate protection through approved transfer mechanisms and data processing agreements consistent with NDPR requirements.</p>
        </PolicySection>

        <PolicySection>
          <h3>12. Children's Privacy</h3>
          <p>Our services are not directed to individuals under 18 years of age. We do not knowingly collect data from minors.</p>
        </PolicySection>

        <PolicySection>
          <h3>13. Changes to This Policy</h3>
          <p>We may update this Privacy Policy periodically to reflect operational, legal, or regulatory changes. The revised version will be published on our Platform with an updated effective date.</p>
        </PolicySection>

        <PolicySection>
          <h3>14. Contact Us</h3>
          <p>For inquiries, complaints, or to exercise your data subject rights, please contact:</p>
          <p><strong>Data Protection Officer</strong><br/>
          Elexdon Pay Connect<br/>
          Email: privacy@elexdonpay.com<br/>
          Phone: +234 7066911338<br/>
          Address: Plot SP 795 First-Gate Mechanic Estate, Apo-Abuja, FCT, Nigeria.</p>
        </PolicySection>
      </ContentCard>
    </PageWrapper>
  );
};

/* --- Styled Components --- */

const PageWrapper = styled.div`
  padding: 10px;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 10px;max-width:900px;
  margin:50px auto;
`;

const HeaderSection = styled.header`
  background: #0f172a;
  color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  h1 { font-size: 1.25rem; margin: 0; }
  p { font-size: 0.85rem; margin: 0; opacity: 0.9; }
  a { color: #60a5fa; text-decoration: none; }
`;

const ContentCard = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const IntroText = styled.p`
  font-size: 0.9rem;
  color: #334155;
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e8f0;
`;

const PolicySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  h3 { margin: 0; font-size: 1rem; color: #0f172a; }
  p, ul { margin: 0; font-size: 0.85rem; color: #475569; line-height: 1.5; }
  ul { padding-left: 20px; }
`;

export default PrivacyPolicyPage;