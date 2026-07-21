
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import RetrievalFullModal from './RetrievalFullModal'; // Adjust path as needed
// import RetrievalCertModal from './RetrievalCertModal';

// // --- STYLED COMPONENTS ---
// const PortalContainer = styled.div`
//   max-width: 1000px;
// //   margin: 10px auto;
//   padding: 10px;
//   font-family: system-ui, -apple-system, sans-serif;
// `;

// const MainHeader = styled.div`
//   background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
//   color: #ffffff;
//   padding: 14px 16px;
//   border-radius: 10px;
//   margin-bottom: 10px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.15);
  
//   @media (max-width: 640px) {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 10px;
//   }
// `;

// const HeaderTextContent = styled.div``;

// const Title = styled.h1`
//   font-size: 1.25rem;
//   margin: 0 0 2px 0;
//   font-weight: 800;
//   display: flex;
//   align-items: center;
//   gap: 6px;
// `;

// const Subtitle = styled.p`
//   color: #93c5fd;
//   font-size: 0.85rem;
//   margin: 0;
// `;

// const StatusButton = styled.button`
//   background: #ffffff;
//   color: #2563eb;
//   border: none;
//   padding: 8px 12px;
//   border-radius: 8px;
//   font-weight: 700;
//   font-size: 0.8rem;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//   transition: all 0.2s ease;
  
//   &:hover { 
//     background: #f8fafc;
//     transform: translateY(-1px);
//   }
// `;

// const SectionHeaderBox = styled.div`
//   background: #ffffff;
//   border: 1px solid #e2e8f0;
//   border-radius: 10px;
//   padding: 8px 12px;
//   margin-bottom: 10px;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
// `;

// const StepBadge = styled.div`
//   background: #eff6ff;
//   color: #2563eb;
//   border: 1px solid #bfdbfe;
//   width: 24px;
//   height: 24px;
//   border-radius: 6px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: 800;
//   font-size: 0.8rem;
// `;

// const StepTitle = styled.h2`
//   font-size: 1rem;
//   color: #0f172a;
//   margin: 0;
//   font-weight: 700;
// `;

// const CardGrid = styled.div`
//   display: grid;
//   grid-template-columns: 100%;
//   gap: 10px;
//   @media (min-width: 640px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
//   @media (min-width: 900px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `;

// const ServiceCard = styled.div`
//   background: #ffffff;
//   border: 1px solid #e2e8f0;
//   border-radius: 10px;
//   padding: 12px;
//   cursor: pointer;
//   transition: all 0.15s ease-in-out;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   gap: 10px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  
//   &:hover {
//     border-color: #2563eb;
//     transform: translateY(-1px);
//     box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.1);
//     background: #f8fafc;
//   }
// `;

// const ServiceTitleText = styled.h3`
//   margin: 0;
//   font-size: 0.9rem;
//   color: #1e293b;
//   font-weight: 700;
//   line-height: 1.35;
// `;

// const CardFooter = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   border-top: 1px solid #f1f5f9;
//   padding-top: 8px;
//   margin-top: auto;
// `;

// const PriceBadge = styled.div`
//   font-size: 0.85rem;
//   font-weight: 800;
//   color: #2563eb;
//   background: #eff6ff;
//   border: 1px solid #dbeafe;
//   padding: 4px 8px;
//   border-radius: 6px;
// `;

// const ActionHint = styled.span`
//   font-size: 0.75rem;
//   color: #64748b;
//   font-weight: 600;
// `;

// // --- COMPONENT ---
// export default function CacModificationsPortal() {
//   const [activeModal, setActiveModal] = useState(null);
  

//   const services = [
//     {
//       id: 'retrieval_full',
//       title: 'Retrieval - Certificate, Status Report & MEMART',
//       price: 36000
//     },
//     {
//       id: 'retrieval_cert',
//       title: 'Retrieval - Certificate Only',
//       price: 17000
//     },
//     {
//       id: 'retrieval_status',
//       title: 'Retrieval - Status Report Only',
//       price: 10000
//     },
//     {
//       id: 'retrieval_memart',
//       title: 'Retrieval - MEMART Only',
//       price: 17000
//     },
//     {
//       id: 'change_sec',
//       title: 'Addition / Change of Company Secretary',
//       price: 18000
//     },
//     {
//       id: 'change_dir',
//       title: 'Addition / Change of Company Director',
//       price: 18000
//     },
//     {
//       id: 'edit_dir_share',
//       title: "Edit / Change of Director's or Shareholder's Details",
//       price: 18000
//     },
//     {
//       id: 'change_address',
//       title: 'Change of Company Address',
//       price: 18000
//     },
//     {
//       id: 'shareholder',
//       title: 'Addition or Removal of Shareholder',
//       price: 18000
//     }
//   ];

//   const handleCardClick = (serviceId) => {
//     setActiveModal(serviceId);
//   };

//   return (
//     <PortalContainer>
//       <MainHeader>
//         <HeaderTextContent>
//           <Title>
//             <span>🛡️</span> CAC Modifications & Retrieval
//           </Title>
//           <Subtitle>Select your required corporate service option below</Subtitle>
//         </HeaderTextContent>
//         {/* <StatusButton onClick={() => alert('Check Order Status clicked')}>
//           <span>🔍</span> Check Status
//         </StatusButton> */}
//       </MainHeader>

//       <SectionHeaderBox>
//         {/* <StepBadge>1</StepBadge> */}
//         <StepTitle>Available Filing Services</StepTitle>
//       </SectionHeaderBox>

//       <CardGrid>
//         {services.map((item) => (
//           <ServiceCard 
//             key={item.id} 
//             onClick={() => handleCardClick(item.id)}
//           >
//             <ServiceTitleText>{item.title}</ServiceTitleText>
//             <CardFooter>
//               <PriceBadge>₦{item.price.toLocaleString()}.00</PriceBadge>
//               <ActionHint>Select ➔</ActionHint>
//             </CardFooter>
//           </ServiceCard>
//         ))}
//       </CardGrid>

//       {/* Render the modal when 'retrieval_full' is active */}
//       <RetrievalFullModal 
//         isOpen={activeModal === 'retrieval_full'} 
//         onClose={() => setActiveModal(null)} 
//       />
//       <RetrievalCertModal
//         isOpen={activeModal === 'retrieval_cert'}
//         onClose={() => setActiveModal(null)}
//       />
//     </PortalContainer>
//   );
// }



import React, { useState } from 'react';
import styled from 'styled-components';
import RetrievalFullModal from './RetrievalFullModal';
import RetrievalCertModal from './RetrievalCertModal';
import RetrievalStatusModal from './RetrievalStatusModal';
import RetrievalMemartModal from './RetrievalMemartModal';
import ChangeCompanySecretaryModal from './ChangeCompanySecretaryModal';
import ChangeCompanyDirectorModal from './ChangeCompanyDirectorModal';
import EditDirectorShareholderModal from './EditDirectorShareholderModal';
import ChangeCompanyAddressModal from './ChangeCompanyAddressModal';

// --- STYLED COMPONENTS ---
const PortalContainer = styled.div`
  max-width: 1000px;
  padding: 10px;
  font-family: system-ui, -apple-system, sans-serif;
`;

const MainHeader = styled.div`
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  padding: 14px 16px;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.15);
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const HeaderTextContent = styled.div``;

const Title = styled.h1`
  font-size: 1.25rem;
  margin: 0 0 2px 0;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Subtitle = styled.p`
  color: #93c5fd;
  font-size: 0.85rem;
  margin: 0;
`;

const SectionHeaderBox = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 8px 12px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
`;

const StepTitle = styled.h2`
  font-size: 1rem;
  color: #0f172a;
  margin: 0;
  font-weight: 700;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 100%;
  gap: 10px;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  
  &:hover {
    border-color: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.1);
    background: #f8fafc;
  }
`;

const ServiceTitleText = styled.h3`
  margin: 0;
  font-size: 0.9rem;
  color: #1e293b;
  font-weight: 700;
  line-height: 1.35;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f1f5f9;
  padding-top: 8px;
  margin-top: auto;
`;

const PriceBadge = styled.div`
  font-size: 0.85rem;
  font-weight: 800;
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #dbeafe;
  padding: 4px 8px;
  border-radius: 6px;
`;

const ActionHint = styled.span`
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
`;

// --- COMPONENT ---
export default function CacModificationsPortal() {
  const [activeModal, setActiveModal] = useState(null);

  const services = [
    {
      id: 'retrieval_full',
      title: 'Retrieval - Certificate, Status Report & MEMART',
      price: 36000
    },
    {
      id: 'retrieval_cert',
      title: 'Retrieval - Certificate Only',
      price: 17000
    },
    {
      id: 'retrieval_status',
      title: 'Retrieval - Status Report Only',
      price: 10000
    },
    {
      id: 'retrieval_memart',
      title: 'Retrieval - MEMART Only',
      price: 17000
    },
    {
      id: 'change_sec',
      title: 'Addition / Change of Company Secretary',
      price: 18000
    },
    {
      id: 'change_dir',
      title: 'Addition / Change of Company Director',
      price: 18000
    },
    {
      id: 'edit_dir_share',
      title: "Edit / Change of Director's or Shareholder's Details",
      price: 18000
    },
    {
      id: 'change_address',
      title: 'Change of Company Address',
      price: 18000
    },
    {
      id: 'shareholder',
      title: 'Addition or Removal of Shareholder',
      price: 18000
    }
  ];

  const handleCardClick = (serviceId) => {
    setActiveModal(serviceId);
    console.log(`Service selected: ${serviceId}`); // Debugging log
  };

  return (
    <PortalContainer>
      <MainHeader>
        <HeaderTextContent>
          <Title>
            <span>🛡️</span> CAC Modifications & Retrieval
          </Title>
          <Subtitle>Select your required corporate service option below</Subtitle>
        </HeaderTextContent>
      </MainHeader>

      <SectionHeaderBox>
        <StepTitle>Available Filing Services</StepTitle>
      </SectionHeaderBox>

      <CardGrid>
        {services.map((item) => (
          <ServiceCard 
            key={item.id} 
            onClick={() => handleCardClick(item.id)}
          >
            <ServiceTitleText>{item.title}</ServiceTitleText>
            <CardFooter>
              <PriceBadge>₦{item.price.toLocaleString()}.00</PriceBadge>
              <ActionHint>Select ➔</ActionHint>
            </CardFooter>
          </ServiceCard>
        ))}
      </CardGrid>

      {/* Render both modal handlers */}
      <RetrievalFullModal 
        isOpen={activeModal === 'retrieval_full'} 
        onClose={() => setActiveModal(null)} 
      />
      <RetrievalCertModal 
        isOpen={activeModal === 'retrieval_cert'} 
        onClose={() => setActiveModal(null)} 
      />
      <RetrievalStatusModal
      isOpen={activeModal === 'retrieval_status'}
        onClose={() => setActiveModal(null)}
      />
      <RetrievalMemartModal
        isOpen={activeModal === 'retrieval_memart'}
        onClose={() => setActiveModal(null)}
      />
      <ChangeCompanySecretaryModal
      isOpen={activeModal==='change_sec'}
        onClose={()=>setActiveModal(null)}
      />

      <ChangeCompanyDirectorModal
        isOpen={activeModal === 'change_dir'}
        onClose={() => setActiveModal(null)}
      />
      <EditDirectorShareholderModal
      isOpen={activeModal==='edit_dir_share'}
        onClose={()=>setActiveModal(null)}
      />
      <ChangeCompanyAddressModal
      isOpen={activeModal==='change_address'}
        onClose={()=>setActiveModal(null)}
      />
      <EditDirectorShareholderModal
      isOpen={activeModal==='shareholder'}
        onClose={()=>setActiveModal(null)}
      />
    </PortalContainer>
  );
}