import React from 'react';
import styled from 'styled-components';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const DownloadCTA = () => {
  return (
    <CTAContainer>
      <CTAText>
        <h2>Try Elexdon PAY Connect for free on iOS and Android</h2>
      </CTAText>
      
      <ButtonRow>
        <StoreButton>
          <FaApple size={24} />
          <ButtonLabel>
            <span>Download on the</span>
            <strong>App Store</strong>
          </ButtonLabel>
        </StoreButton>
        
        <StoreButton>
          <FaGooglePlay size={20} />
          <ButtonLabel>
            <span>GET IT ON</span>
            <strong>Google Play</strong>
          </ButtonLabel>
        </StoreButton>
      </ButtonRow>
    </CTAContainer>
  );
};

/* --- Styled Components --- */

const CTAContainer = styled.section`
  padding: 10px;
//   background: #0f172a;
background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  color: #ffffff;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
`;

const CTAText = styled.div`
  h2 {
    font-size: 1.25rem;
    margin: 0;
    font-weight: 600;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const StoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #ffffff;
//   color: #0f172a;
color:#2563eb;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    transform: translateY(-2px);
    background: #e2e8f0;
  }
`;

const ButtonLabel = styled.div`
  display: flex;
  flex-direction: column;
  span { font-size: 0.6rem; text-transform: uppercase; }
  strong { font-size: 0.9rem; }
`;

export default DownloadCTA;