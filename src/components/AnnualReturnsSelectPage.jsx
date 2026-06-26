import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 1. Create the styled layout containers
const PageContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 24px;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const MainTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${props => props.theme.colors?.textDark || '#111827'};
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors?.textMuted || '#4b5563'};
  margin-top: 8px;
`;

const SectionHeading = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors?.textMedium || '#1f2937'};
  margin-bottom: 16px;
  text-align: center;
`;

const GridContainer = styled.div`
  display: grid;
  gap: 24px;
  max-width: 672px;
  margin: 0 auto;

  /* Switch to 2 columns on medium screens and up */
  @media (min-width: ${props => props.theme.breakpoints?.md || '768px'}) {
    grid-template-cols: repeat(2, minmax(0, 1fr));
  }
`;

const SelectionCard = styled.div`
  border: 2px solid ${props => props.theme.colors?.borderLight || '#e5e7eb'};
  border-radius: 12px;
  padding: 24px;
  background-color: ${props => props.theme.colors?.bgWhite || '#ffffff'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${props => props.theme.colors?.primary || '#2563eb'};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

const CardTop = styled.div`
  /* Wraps title and text description group */
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors?.textDark || '#111827'};
  margin-bottom: 8px;
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors?.textMuted || '#4b5563'};
  font-size: 0.875rem;
  margin-bottom: 16px;
`;

const CardBottom = styled.div`
  border-top: 1px solid ${props => props.theme.colors?.borderLight || '#e5e7eb'};
  padding-top: 16px;
  margin-top: 16px;
`;

const BasePriceText = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.colors?.primary || '#2563eb'};
`;

const PenaltyPriceText = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors?.danger || '#ef4444'};
  font-weight: 500;
  margin-top: 4px;
`;

const ActionButton = styled.button`
  width: 100%;
  margin-top: 24px;
  background-color: ${props => props.theme.colors?.primary || '#2563eb'};
  color: #ffffff;
  padding: 10px 0;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  /* Use template interaction state styling */
  ${SelectionCard}:hover & {
    background-color: ${props => props.theme.colors?.primaryHover || '#1d4ed8'};
  }
`;

// 2. Component Implementation
const AnnualReturnsSelectPage = () => {

    const navigate = useNavigate();
  const returnOptions = [
    {
      id: 'business_name',
      title: 'Business Name',
      description: 'Annual returns for sole proprietors',
      basePrice: 14000,
      penaltyPrice: 5000,
      route: "/userdashboard/service/annualreturns/businessname"
    },
    {
      id: 'registered_company',
      title: 'Registered Company',
      description: 'Annual returns for limited companies',
      basePrice: 15000,
      penaltyPrice: 6000,
      route: "/userdashboard/service/annualreturns/company"
    }
  ];

  return (
    <PageContainer>
      <HeaderSection>
        <MainTitle>Annual Returns</MainTitle>
        <Subtitle>
          File your Business Name or Registered Company Annual Returns easily.
        </Subtitle>
      </HeaderSection>

      <SectionHeading>Select Return Type</SectionHeading>

      <GridContainer>
        {returnOptions.map((option) => (
          <SelectionCard 
            key={option.id} 
            onClick={() => navigate(`${option.route}`)}
          >
            <CardTop>
              <CardTitle>{option.title}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardTop>

            <CardBottom>
              <BasePriceText>
                From ₦{option.basePrice.toLocaleString()}.00 / year
              </BasePriceText>
              <PenaltyPriceText>
                With penalty: ₦{option.penaltyPrice.toLocaleString()}.00 / year
              </PenaltyPriceText>
            </CardBottom>

            <ActionButton>
              Select & Continue
            </ActionButton>
          </SelectionCard>
        ))}
      </GridContainer>
    </PageContainer>
  );
};

export default AnnualReturnsSelectPage;