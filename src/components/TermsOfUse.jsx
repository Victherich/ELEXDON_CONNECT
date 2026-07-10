import React from 'react';
import styled from 'styled-components';

const TermsOfUsePage = () => {
  return (
    <PageWrapper>
      <HeaderSection>
        <h1>Our Commitment to Excellence</h1>
        <p>Building the future of financial inclusion with Elexdon Pay Connect</p>
      </HeaderSection>

      <ContentCard>
        <BodyText>
          At <strong>Elexdon Pay Connect</strong>, our leadership team comprises seasoned and visionary professionals united by a commitment to advancing financial inclusion and delivering innovative, customer-centric payment solutions.
        </BodyText>

        <BodyText>
          Our executives bring extensive, cross-functional expertise spanning technology, financial services, and enterprise operations. We are guided by a shared mission and a disciplined focus on execution. We are intentionally building a culture defined by excellence, accountability, and collaboration, where talent is empowered to drive sustainable growth.
        </BodyText>

        <BodyText>
          Our strategic objective is to develop a secure, scalable platform that addresses the evolving needs of our customers and partners. We pursue continuous improvement and product innovation as core operating principles. We take pride in our team’s capability and in the measurable impact we are delivering across Africa and in emerging markets beyond.
        </BodyText>
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
//   background: #064e3b;
background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  h1 { font-size: 1.25rem; margin: 0; }
  p { font-size: 0.85rem; margin: 0; opacity: 0.9; }
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

const BodyText = styled.p`
  font-size: 0.9rem;
  color: #334155;
  line-height: 1.6;
  margin: 0;
  
  strong { color: #064e3b; }
`;

export default TermsOfUsePage;