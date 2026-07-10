import React from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";
import brandImage from '../Images/featureimage.jpeg';

const BrandPartnership = () => {
  return (
    <Section>
      <Fade triggerOnce>
        <Container>
          <ContentArea>
            <Badge>Trusted Network</Badge>
            <h2>Powering Your Daily Essentials</h2>
            <p>
              At <strong>Elexdon Pay Connect</strong>, we believe in bringing your world together. 
              We have integrated with Nigeria's most reliable utility providers, telecom giants, 
              and lifestyle brands to ensure that whatever you need—be it power, data, or entertainment—
              is just a few clicks away.
            </p>
            <p>
              By centralizing these services, we eliminate the need for multiple apps. 
              One login, one secure platform, and total control over your payments and subscriptions.
            </p>
          </ContentArea>
          
          <ImageArea>
            <img src={brandImage} alt="Brands connected to Elexdon Pay" />
          </ImageArea>
        </Container>
      </Fade>
    </Section>
  );
};

/* --- STYLED COMPONENTS --- */
const Section = styled.section`
  padding: 10px;
  background: #ffffff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  h2 { font-size: 2.5rem; margin: 0; color: #0f172a; }
  p { font-size: 1rem; color: #475569; line-height: 1.6; margin: 0; }
`;

const Badge = styled.div`
  width: fit-content;
  padding: 4px 10px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const ImageArea = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export default BrandPartnership;