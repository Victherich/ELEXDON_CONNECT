import React from 'react';
import styled from 'styled-components';
import { Fade, Slide } from 'react-awesome-reveal';

// --- Styled Components ---
const Wrapper = styled.section`
  padding: 10px;
  background: #f8fafc;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #0f172a;
  margin: 10px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 10px;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  text-align: left;
`;

const Icon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 1rem;
  color: #1e293b;
  margin: 0 0 5px 0;
`;

const Description = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
`;

const FeatureSection = () => {
  const steps = [
    { icon: "👤", title: "1. Create Account", desc: "Sign up in seconds and get your secure dashboard ready." },
    { icon: "⚡", title: "2. Select Service", desc: "Choose from Airtime, Data, Electricity, or Cable TV." },
    { icon: "💳", title: "3. Pay & Get Value", desc: "Complete payment securely and receive your value instantly." }
  ];

  const benefits = [
    { icon: "🚀", title: "Instant Delivery", desc: "Automated systems ensure you get value within seconds." },
    { icon: "🛡️", title: "Bank-Grade Security", desc: "Your transactions are encrypted with state-of-the-art protocols." },
    { icon: "💰", title: "Best Market Rates", desc: "We provide the most competitive prices for all your utilities." }
  ];

  return (
    <Wrapper>
      <Fade triggerOnce>
        <SectionTitle>How Elexdon Pay Connect Works</SectionTitle>
        <Grid>
          {steps.map((item, i) => (
            <Card key={i}>
              <Icon>{item.icon}</Icon>
              <Title>{item.title}</Title>
              <Description>{item.desc}</Description>
            </Card>
          ))}
        </Grid>

        <div style={{ marginTop: '10px' }}>
          <SectionTitle>Why Choose Us?</SectionTitle>
          <Grid>
            {benefits.map((item, i) => (
              <Slide direction="up" triggerOnce delay={i * 50} key={i}>
                <Card>
                  <Icon>{item.icon}</Icon>
                  <Title>{item.title}</Title>
                  <Description>{item.desc}</Description>
                </Card>
              </Slide>
            ))}
          </Grid>
        </div>
      </Fade>
    </Wrapper>
  );
};

export default FeatureSection;