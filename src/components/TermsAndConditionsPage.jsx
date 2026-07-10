import React from 'react';
import styled from 'styled-components';

const TermsPage = () => {
  return (
    <PageWrapper>
      <HeaderSection>
        <h1>Terms of Services</h1>
        <p>Welcome to Elexdon Pay Connect</p>
      </HeaderSection>

      <ContentCard>
        <IntroText>
          Elexdon Pay Connect is an online payment platform that enables you to pay bills quickly and securely. Please read these Terms of Service carefully before using our platform. By accessing or using Elexdon Pay Connect, you agree to be bound by these Terms and by any additional terms that apply to specific features. If you do not agree, you must not use the service.
        </IntroText>

        <TermSection>
          <h3>1. Description of Service</h3>
          <p>Elexdon Pay Connect provides a digital channel for making payments for everyday bills and services, including electricity, education fees, airtime top-ups, cable TV subscriptions, data bundles, and internet services. Payments may be initiated from a computer or mobile device through your Elexdon Pay Connect account.</p>
        </TermSection>

        <TermSection>
          <h3>2. Your Account</h3>
          <p>To use the service, you must create an account and provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must notify Elexdon Pay Connect immediately of any unauthorized use or suspected security breach.</p>
        </TermSection>

        <TermSection>
          <h3>3. Payments</h3>
          <p>Elexdon Pay Connect facilitates payments to independent third-party service providers. By initiating a payment, you agree to the terms of the relevant provider in addition to these Terms. When you authorize a transaction, you instruct us to debit your selected funding source for the transaction amount plus any applicable fees. You are responsible for ensuring sufficient funds are available to complete the payment.</p>
        </TermSection>

        <TermSection>
          <h3>4. Fees</h3>
          <p>We may charge processing fees, convenience fees, or service charges for certain transactions. All applicable fees will be clearly displayed to you before you confirm a payment.</p>
        </TermSection>

        <TermSection>
          <h3>5. Prohibited Activities</h3>
          <p>You agree not to use Elexdon Pay Connect for any unlawful or unauthorized purpose, including fraud, money laundering, or terrorist financing. You will not use the service to harass, defame, threaten, or harm any person or entity, or to transmit any content that is illegal, harmful, or objectionable.</p>
        </TermSection>

        <TermSection>
          <h3>6. Termination</h3>
          <p>Elexdon Pay Connect reserves the right to suspend, restrict, or terminate your account at any time, with or without notice, for any reason, including violation of these Terms. You may close your account at any time by contacting customer support.</p>
        </TermSection>

        <TermSection>
          <h3>7. Intellectual Property</h3>
          <p>The platform, including all text, graphics, logos, images, software, and other materials, is owned by Elexdon Pay Connect or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or use any materials without our prior written consent.</p>
        </TermSection>

        <TermSection>
          <h3>8. Disclaimer of Warranties</h3>
          <p>The service is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. Elexdon Pay Connect does not warrant that the service will be uninterrupted, error-free, secure, or that it will meet your specific requirements.</p>
        </TermSection>

        <TermSection>
          <h3>9. Limitation of Liability</h3>
          <p>To the fullest extent permitted by law, Elexdon Pay Connect, its affiliates, directors, employees, and agents shall not be liable for any indirect, incidental, consequential, special, or punitive damages, or for any loss of profits, data, or goodwill, arising from your use of or inability to use the service, even if advised of the possibility of such damages. Our total liability for any claim relating to the service shall not exceed the amount of fees paid by you to Elexdon Pay Connect in the three months preceding the claim.</p>
        </TermSection>
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
  gap: 10px;
  max-width:900px;
  margin:50px auto;
`;

const HeaderSection = styled.header`
  background: #1e40af;
  color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  h1 { font-size: 1.25rem; margin: 0; }
  p { font-size: 0.9rem; margin: 0; opacity: 0.9; }
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
  line-height: 1.5;
  margin: 0;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 10px;
`;

const TermSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  h3 {
    margin: 0;
    font-size: 1rem;
    color: #1e40af;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: #475569;
    line-height: 1.5;
  }
`;

export default TermsPage;