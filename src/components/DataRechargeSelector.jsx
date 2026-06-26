import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

// 1. Semantic SVG Branding Icons Assets Layout
const NetworkLogos = {
  mtn: () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#FFCC00"/>
      <ellipse cx="50" cy="50" rx="32" ry="22" stroke="#0066CC" strokeWidth="3" fill="none"/>
      <text x="50" y="56" fontSize="18" fontWeight="900" fill="#000" textAnchor="middle" fontFamily="sans-serif">MTN</text>
    </svg>
  ),
  glo: () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#008751"/>
      <circle cx="50" cy="50" r="30" stroke="#FFF" strokeWidth="4" fill="none"/>
      <text x="50" y="56" fontSize="18" fontWeight="900" fill="#FFF" textAnchor="middle" fontFamily="sans-serif">glo</text>
    </svg>
  ),
  airtel: () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#FF0000"/>
      <path d="M35 65 L50 30 L65 65 M40 55 L60 55" stroke="#FFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <text x="50" y="80" fontSize="12" fontWeight="700" fill="#FFF" textAnchor="middle" fontFamily="sans-serif">airtel</text>
    </svg>
  ),
//   9mobile: () => (
//     <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <circle cx="50" cy="50" r="48" fill="#005A36"/>
//       <text x="50" y="58" fontSize="24" fontWeight="900" fill="#B3D47B" textAnchor="middle" fontFamily="sans-serif">9m</text>
//     </svg>
//   )
};

const providers = [
  { id: 'mtn', name: 'MTN Data Bundle', color: '#FFCC00', textLight: false },
  { id: 'glo', name: 'Glo Data Bundle', color: '#008751', textLight: true },
  { id: 'airtel', name: 'Airtel Data Bundle', color: '#FF0000', textLight: true },
//   { id: '9mobile', name: '9mobile Data Bundle', color: '#005A36', textLight: true },
];

export default function DataRechargeSelector() {
  const navigate = useNavigate();

  const handleProviderSelect = (providerId) => {
    // Navigates down to the dynamic workspace form page passing the selected carrier configuration
    navigate(`/userdashboard/service/datarecharge/${providerId}`)
  };

  return (
    <PageContainer>
      <ContentCard>
        <HeaderSection>
          <MainTitle>Select Network Provider</MainTitle>
          <SubTitle>Choose your carrier platform to browse available data subscription bundles</SubTitle>
        </HeaderSection>

        <GridSystem>
          {providers.map((network) => {
            const LogoComponent = NetworkLogos[network.id];
            return (
              <ProviderCard 
                key={network.id} 
                onClick={() => handleProviderSelect(network.id)}
                brandColor={network.color}
              >
                <IconWrapper>
                  <LogoComponent />
                </IconWrapper>
                <CardInfo>
                  <ProviderName>{network.name}</ProviderName>
                  <ActionTag textLight={network.textLight} brandColor={network.color}>
                    Select Plan
                  </ActionTag>
                </CardInfo>
              </ProviderCard>
            );
          })}
        </GridSystem>

        <NoticeFooter>
          <p>Secure VTpass Hub Telecommunication Gateway Handshake Active</p>
        </NoticeFooter>
      </ContentCard>
    </PageContainer>
  );
}

// --- STYLED COMPONENTS ARCHITECTURE LAYER ---
const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f6f9;
  padding: 10px;
  font-family: system-ui, -apple-system, sans-serif;
`;

const ContentCard = styled.main`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 680px;
  padding: 40px;
  box-sizing: border-box;

  @media (max-width: 576px) {
    padding: 24px;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 36px;
`;

const MainTitle = styled.h1`
  font-size: 24px;
  color: #1a202c;
  font-weight: 700;
  margin: 0 0 8px 0;
`;

const SubTitle = styled.p`
  font-size: 14px;
  color: #718096;
  margin: 0;
  line-height: 1.5;
`;

const GridSystem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const ProviderCard = styled.div`
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background: #ffffff;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${props => props.brandColor};
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s ease;

  ${ProviderCard}:hover & {
    transform: scale(1.08);
  }
`;

const CardInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProviderName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

const ActionTag = styled.span`
  display: inline-block;
  width: 100%;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  background: #f7fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  box-sizing: border-box;
  transition: all 0.2s ease;

  ${ProviderCard}:hover & {
    background: ${props => props.brandColor};
    border-color: ${props => props.brandColor};
    color: ${props => (props.textLight ? '#ffffff' : '#1a202c')};
  }
`;

const NoticeFooter = styled.footer`
  margin-top: 36px;
  text-align: center;
  border-top: 1px solid #edf2f7;
  padding-top: 20px;

  p {
    font-size: 11px;
    color: #a0aec0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
  }
`;