// import React, { useState } from 'react';
// import styled from 'styled-components';
// import Swal from 'sweetalert2';

// // --- STYLED COMPONENTS ---
// const PortalContainer = styled.div`
//   max-width: 800px;
//   margin: 40px auto;
//   padding: 24px;
//   font-family: system-ui, -apple-system, sans-serif;
// `;

// const MainHeader = styled.div`
//   text-align: center;
//   margin-bottom: 40px;
// `;

// const Title = styled.h1`
//   font-size: 2rem;
//   color: #0f172a;
//   margin: 0 0 8px 0;
//   font-weight: 800;
// `;

// const Subtitle = styled.p`
//   color: #64748b;
//   font-size: 1rem;
//   margin: 0;
// `;

// const CardGrid = styled.div`
//   display: grid;
//   grid-template-columns: 100%;
//   gap: 24px;
//   @media (min-width: 640px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
// `;

// const OptionCard = styled.div`
//   background: #ffffff;
//   border: 2px solid #e2e8f0;
//   border-radius: 16px;
//   padding: 32px 24px;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
  
//   &:hover {
//     border-color: #2563eb;
//     transform: translateY(-2px);
//     box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.05);
//   }
// `;

// const CardHeader = styled.div`
//   h3 {
//     margin: 0 0 8px 0;
//     font-size: 1.35rem;
//     color: #1e293b;
//     font-weight: 700;
//   }
//   p {
//     margin: 0 0 24px 0;
//     color: #64748b;
//     font-size: 0.925rem;
//     line-height: 1.5;
//   }
// `;

// const PriceTag = styled.div`
//   font-size: 1.75rem;
//   font-weight: 800;
//   color: #2563eb;
//   margin-bottom: 4px;
// `;

// const MetaInfo = styled.div`
//   font-size: 0.85rem;
//   color: #475569;
//   background: #f1f5f9;
//   padding: 6px 12px;
//   border-radius: 6px;
//   display: inline-block;
//   font-weight: 500;
// `;

// // Form Specific Styles
// const FormContainer = styled.div`
//   background: #ffffff;
//   border: 1px solid #e2e8f0;
//   border-radius: 16px;
//   padding: 32px;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
// `;

// const FormHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-bottom: 1px solid #e2e8f0;
//   padding-bottom: 16px;
//   margin-bottom: 24px;
// `;

// const BackButton = styled.button`
//   background: #f1f5f9;
//   color: #334155;
//   border: none;
//   padding: 8px 14px;
//   border-radius: 8px;
//   font-weight: 600;
//   font-size: 0.875rem;
//   cursor: pointer;
//   &:hover { background: #e2e8f0; }
// `;

// const FormGroup = styled.div`
//   margin-bottom: 20px;
// `;

// const Label = styled.label`
//   display: block;
//   font-size: 0.875rem;
//   font-weight: 600;
//   color: #374151;
//   margin-bottom: 6px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 11px 14px;
//   border: 1px solid #cbd5e1;
//   border-radius: 8px;
//   font-size: 0.95rem;
//   box-sizing: border-box;
//   outline: none;
//   &:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.1); }
// `;

// const HelpText = styled.span`
//   display: block;
//   font-size: 0.8rem;
//   color: #64748b;
//   margin-top: 4px;
// `;

// const SubmitButton = styled.button`
//   width: 100%;
//   background-color: #2563eb;
//   color: #ffffff;
//   padding: 14px;
//   border-radius: 8px;
//   font-weight: 600;
//   font-size: 1rem;
//   border: none;
//   cursor: pointer;
//   margin-top: 10px;
//   &:hover { background-color: #1d4ed8; }
// `;

// // --- PORTAL COMPONENT ---
// export default function CacRegistrationPortal({ userId, userBalance, onUpdateBalance }) {
//   const [selectedType, setSelectedType] = useState(null); // 'business_name' or 'company'
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Form Field State Values
//   const [formData, setFormData] = useState({
//     proposedName1: '',
//     proposedName2: '',
//     natureOfBusiness: '',
//     proprietorName: '',
//     proprietorPhone: '',
//     proprietorEmail: '',
//     businessAddress: ''
//   });

//   const registrationOptions = {
//     business_name: {
//       title: 'Business Name Registration',
//       description: 'Ideal for sole proprietors, direct partnerships, and small business vendors.',
//       price: 35000,
//       time: '3-5 business days'
//     },
//     company: {
//       title: 'Company Registration',
//       description: 'Private Limited Liability Company (Ltd) offering explicit corporate shielding and shares allocations.',
//       price: 60000,
//       time: '5-7 business days'
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const activePackage = registrationOptions[selectedType];

//     if (userBalance !== undefined && userBalance < activePackage.price) {
//       Swal.fire('Insufficient Balance', 'Your wallet balance is lower than the required portal registration fee.', 'error');
//       return;
//     }

//     Swal.fire({
//       title: 'Confirm Registration Request',
//       text: `Authorize payment of ₦${activePackage.price.toLocaleString()} for your ${activePackage.title}?`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#2563eb',
//       cancelButtonColor: '#64748b',
//       confirmButtonText: 'Pay & Submit Application'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         setIsSubmitting(true);
//         try {
//           Swal.fire({ title: 'Processing Application Order...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//           const response = await fetch('api/process_cac_registration.php', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               userId,
//               registrationType: selectedType,
//               amount: activePackage.price,
//               ...formData
//             })
//           });

//           const data = await response.json();

//           if (data.success) {
//             Swal.fire({
//               icon: 'success',
//               title: 'Application Received',
//               text: 'Your corporate filing has been queued successfully. Our documentation agents will review it shortly.',
//               confirmButtonColor: '#2563eb'
//             });

//             // Reset States
//             setSelectedType(null);
//             setFormData({
//               proposedName1: '', proposedName2: '', natureOfBusiness: '',
//               proprietorName: '', proprietorPhone: '', proprietorEmail: '', businessAddress: ''
//             });

//             if (onUpdateBalance && data.balance !== undefined) {
//               onUpdateBalance(data.balance);
//             }
//           } else {
//             Swal.fire('Filing Registration Failed', data.error || 'Server error processing request.', 'error');
//           }
//         } catch (err) {
//           Swal.fire('System Exception', 'Communication network pipeline error.', 'error');
//         } finally {
//           setIsSubmitting(false);
//         }
//       }
//     });
//   };

//   // --- RENDERING VIEWS ---
//   if (!selectedType) {
//     return (
//       <PortalContainer>
//         <MainHeader>
//           <Title>CAC Corporate Filing Gate</Title>
//           <Subtitle>Register your legal entity structural profiles with the Corporate Affairs Commission</Subtitle>
//         </MainHeader>

//         <CardGrid>
//           <OptionCard onClick={() => setSelectedType('business_name')}>
//             <CardHeader>
//               <h3>{registrationOptions.business_name.title}</h3>
//               <p>{registrationOptions.business_name.description}</p>
//             </CardHeader>
//             <div>
//               <PriceTag>₦{registrationOptions.business_name.price.toLocaleString()}.00</PriceTag>
//               <MetaInfo>Processing Window: {registrationOptions.business_name.time}</MetaInfo>
//             </div>
//           </OptionCard>

//           <OptionCard onClick={() => setSelectedType('company')}>
//             <CardHeader>
//               <h3>{registrationOptions.company.title}</h3>
//               <p>{registrationOptions.company.description}</p>
//             </CardHeader>
//             <div>
//               <PriceTag>₦{registrationOptions.company.price.toLocaleString()}.00</PriceTag>
//               <MetaInfo>Processing Window: {registrationOptions.company.time}</MetaInfo>
//             </div>
//           </OptionCard>
//         </CardGrid>
//       </PortalContainer>
//     );
//   }

//   const currentPackage = registrationOptions[selectedType];

//   return (
//     <PortalContainer>
//       <FormContainer>
//         <FormHeader>
//           <div>
//             <h2 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', color: '#0f172a' }}>{currentPackage.title} Filing</h2>
//             <span style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 'bold' }}>Cost: ₦{currentPackage.price.toLocaleString()}</span>
//           </div>
//           <BackButton onClick={() => setSelectedType(null)}>Change Type</BackButton>
//         </FormHeader>

//         <form onSubmit={handleFormSubmit}>
//           <FormGroup>
//             <Label>Proposed Business Name Option 1 *</Label>
//             <Input type="text" name="proposedName1" value={formData.proposedName1} onChange={handleInputChange} placeholder="First Choice Name Preference" required />
//           </FormGroup>

//           <FormGroup>
//             <Label>Proposed Business Name Option 2 *</Label>
//             <Input type="text" name="proposedName2" value={formData.proposedName2} onChange={handleInputChange} placeholder="Alternative Name Preference if Option 1 is denied" required />
//           </FormGroup>

//           <FormGroup>
//             <Label>Core Business Scope/Nature *</Label>
//             <Input type="text" name="natureOfBusiness" value={formData.natureOfBusiness} onChange={handleInputChange} placeholder="e.g., Software Development, Farming, Retail Logistics" required />
//           </FormGroup>

//           <FormGroup>
//             <Label>Primary Applicant/Proprietor Legal Name *</Label>
//             <Input type="text" name="proprietorName" value={formData.proprietorName} onChange={handleInputChange} placeholder="Full legal spelling name" required />
//           </FormGroup>

//           <FormGroup>
//             <Label>Contact Mobile Line Phone Number *</Label>
//             <Input type="tel" name="proprietorPhone" value={formData.proprietorPhone} onChange={handleInputChange} placeholder="Active Phone Line" required />
//           </FormGroup>

//           <FormGroup>
//             <Label>Contact Email Address *</Label>
//             <Input type="email" name="proprietorEmail" value={formData.proprietorEmail} onChange={handleInputChange} placeholder="To receive certificate updates" required />
//           </FormGroup>

//           <FormGroup>
//             <Label>Principal Registered Office Place Address *</Label>
//             <Input type="text" name="businessAddress" value={formData.businessAddress} onChange={handleInputChange} placeholder="Physical business operation street address" required />
//             <HelpText>Must be a verifiable address location context inside Nigeria boundaries.</HelpText>
//           </FormGroup>

//           <SubmitButton type="submit" disabled={isSubmitting}>
//             Submit Secure Corporate Filing Order
//           </SubmitButton>
//         </form>
//       </FormContainer>
//     </PortalContainer>
//   );
// }



import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Context } from './Context';

// --- STYLED COMPONENTS ---
const PortalContainer = styled.div`
  max-width: 800px;
  margin: 10px auto;
//   padding: 24px;
  font-family: system-ui, -apple-system, sans-serif;
`;

const MainHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #0f172a;
  margin: 0 0 8px 0;
  font-weight: 800;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1rem;
  margin: 0;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 100%;
  gap: 24px;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const OptionCard = styled.div`
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px 24px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:hover {
    border-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.05);
  }
`;

const CardHeader = styled.div`
  h3 {
    margin: 0 0 8px 0;
    font-size: 1.35rem;
    color: #1e293b;
    font-weight: 700;
  }
  p {
    margin: 0 0 24px 0;
    color: #64748b;
    font-size: 0.925rem;
    line-height: 1.5;
  }
`;

const PriceTag = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 4px;
`;

const MetaInfo = styled.div`
  font-size: 0.85rem;
  color: #475569;
  background: #f1f5f9;
  padding: 6px 12px;
  border-radius: 6px;
  display: inline-block;
  font-weight: 500;
`;

const FormContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 16px;
  margin-bottom: 24px;
`;

const BackButton = styled.button`
  background: #f1f5f9;
  color: #334155;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover { background: #e2e8f0; }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 11px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
  box-sizing: border-box;
  outline: none;
  &:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.1); }
`;

const InstructionsBox = styled.div`
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  padding: 14px;
  border-radius: 8px;
  margin-bottom: 12px;
  
  h5 {
    margin: 0 0 6px 0;
    color: #334155;
    font-size: 0.875rem;
    font-weight: 700;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
    font-size: 0.825rem;
    color: #475569;
    line-height: 1.6;
  }
`;

const HelpText = styled.span`
  display: block;
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #2563eb;
  color: #ffffff;
  padding: 14px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  &:hover { background-color: #1d4ed8; }
`;

// --- PORTAL COMPONENT ---
export default function CacRegistrationPortal() {
  const [selectedType, setSelectedType] = useState(null); // 'business_name' or 'company'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const {user,fetchUserProfileById,api_url}=useContext(Context)

  const [formData, setFormData] = useState({
    proposedName1: '',
    proposedName2: '',
    natureOfBusiness: '',
    proprietorName: '',
    proprietorPhone: '',
    proprietorEmail: '',
    businessAddress: ''
  });

  const registrationOptions = {
    business_name: {
      title: 'Business Name Registration',
      description: 'Ideal for sole proprietors, direct partnerships, and small business vendors.',
      price: 35000,
      time: '3-5 business days',
      requirements: [
        'Valid Means of Identification (NIN, Voter Card, International Passport or Driver License)',
        'Passport Photograph with crisp background structural visibility',
        'Signature of Proprietor signed clearly on plain white sheets paper'
      ]
    },
    company: {
      title: 'Company Registration',
      description: 'Private Limited Liability Company (Ltd) offering explicit corporate shielding and shares allocations.',
      price: 60000,
      time: '5-7 business days',
      requirements: [
        'Valid Means of Identification for all Directors & Shareholders (NIN / International Passport)',
        'Passport Photographs for all key designated corporate officers',
        'Signatures of all Directors & Witnesses signed clearly on white background sheets',
        'Statement of Share Capital & Allocation Distribution Structure breakdown note'
      ]
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      Swal.fire('Format Mismatch', 'System rules configuration criteria only accepts single PDF files.', 'error');
      e.target.value = null;
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const activePackage = registrationOptions[selectedType];

    if (!selectedFile) {
      Swal.fire('File Required', 'Please merge and upload the required documentation attachments packet.', 'warning');
      return;
    }

    // if (userBalance !== undefined && userBalance < activePackage.price) {
    //   Swal.fire('Insufficient Balance', 'Your wallet balance is lower than the required portal registration fee.', 'error');
    //   return;
    // }

    Swal.fire({
      title: 'Confirm Registration Request',
      text: `Authorize payment of ₦${activePackage.price.toLocaleString()} for your ${activePackage.title}? This will be deducted from your wallet balance.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Pay & Submit Application'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsSubmitting(true);
        try {
          Swal.fire({ title: 'Uploading Info Packages...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

          // Establish clean multipart upload stream object wrapper
          const dataPayload = new FormData();
          dataPayload.append('userId', user?.id);
          dataPayload.append('registrationType', selectedType);
          dataPayload.append('amount', activePackage.price);
          dataPayload.append('merged_document', selectedFile);
          
          // Append regular form fields
          Object.keys(formData).forEach(key => {
            dataPayload.append(key, formData[key]);
          });

          const response = await fetch(`${api_url}/process_cac_registration.php`, {
            method: 'POST',
            body: dataPayload // Browser natively injects correct multipart/form-data boundaries headers
          });

          const data = await response.json();

          if (data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Application Received',
              text: 'Your corporate filing and documentation package have been queued successfully.',
              confirmButtonColor: '#2563eb'
            });

            // Wipe states cleaner
            setSelectedType(null);
            setSelectedFile(null);
            setFormData({
              proposedName1: '', proposedName2: '', natureOfBusiness: '',
              proprietorName: '', proprietorPhone: '', proprietorEmail: '', businessAddress: ''
            });

           fetchUserProfileById();

          } else {
            Swal.fire('Filing Registration Failed', data.error || 'Server error processing request.', 'error');
          }
        } catch (err) {
          Swal.fire('System Exception', 'Communication network pipeline upload tracking error.', 'error');
        } finally {
          setIsSubmitting(false);
        }
      }
    });
  };

  if (!selectedType) {
    return (
      <PortalContainer>
        <MainHeader>
          <Title>CAC Registration</Title>
          <Subtitle>Register your legal entity structural profiles with the Corporate Affairs Commission</Subtitle>
        </MainHeader>

        <CardGrid>
          <OptionCard onClick={() => setSelectedType('business_name')}>
            <CardHeader>
              <h3>{registrationOptions.business_name.title}</h3>
              <p>{registrationOptions.business_name.description}</p>
            </CardHeader>
            <div>
              <PriceTag>₦{registrationOptions.business_name.price.toLocaleString()}.00</PriceTag>
              <MetaInfo>Processing Window: {registrationOptions.business_name.time}</MetaInfo>
            </div>
          </OptionCard>

          <OptionCard onClick={() => setSelectedType('company')}>
            <CardHeader>
              <h3>{registrationOptions.company.title}</h3>
              <p>{registrationOptions.company.description}</p>
            </CardHeader>
            <div>
              <PriceTag>₦{registrationOptions.company.price.toLocaleString()}.00</PriceTag>
              <MetaInfo>Processing Window: {registrationOptions.company.time}</MetaInfo>
            </div>
          </OptionCard>
        </CardGrid>
      </PortalContainer>
    );
  }

  const currentPackage = registrationOptions[selectedType];

  return (
    <PortalContainer>
      <FormContainer>
        <FormHeader>
          <div>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', color: '#0f172a' }}>{currentPackage.title} Filing</h2>
            <span style={{ fontSize: '0.85rem', color: '#2563eb', fontWeight: 'bold' }}>Cost: ₦{currentPackage.price.toLocaleString()}</span>
          </div>
          <BackButton onClick={() => { setSelectedType(null); setSelectedFile(null); }}>Change Type</BackButton>
        </FormHeader>

        <form onSubmit={handleFormSubmit}>
          <FormGroup>
            <Label>Proposed Business Name Option 1 *</Label>
            <Input type="text" name="proposedName1" value={formData.proposedName1} onChange={handleInputChange} placeholder="First Choice Name Preference" required />
          </FormGroup>

          <FormGroup>
            <Label>Proposed Business Name Option 2 *</Label>
            <Input type="text" name="proposedName2" value={formData.proposedName2} onChange={handleInputChange} placeholder="Alternative Name Preference if Option 1 is denied" required />
          </FormGroup>

          <FormGroup>
            <Label>Core Business Scope/Nature *</Label>
            <Input type="text" name="natureOfBusiness" value={formData.natureOfBusiness} onChange={handleInputChange} placeholder="e.g., Software Development, Farming, Retail Logistics" required />
          </FormGroup>

          <FormGroup>
            <Label>Primary Applicant/Proprietor Legal Name *</Label>
            <Input type="text" name="proprietorName" value={formData.proprietorName} onChange={handleInputChange} placeholder="Full legal spelling name" required />
          </FormGroup>

          <FormGroup>
            <Label>Contact Mobile Line Phone Number *</Label>
            <Input type="tel" name="proprietorPhone" value={formData.proprietorPhone} onChange={handleInputChange} placeholder="Active Phone Line" required />
          </FormGroup>

          <FormGroup>
            <Label>Contact Email Address *</Label>
            <Input type="email" name="proprietorEmail" value={formData.proprietorEmail} onChange={handleInputChange} placeholder="To receive certificate updates" required />
          </FormGroup>

          <FormGroup>
            <Label>Principal Registered Office Place Address *</Label>
            <Input type="text" name="businessAddress" value={formData.businessAddress} onChange={handleInputChange} placeholder="Physical business operation street address" required />
            <HelpText>Must be a verifiable address location context inside Nigeria boundaries.</HelpText>
          </FormGroup>

          <FormGroup>
            <Label>Required Package Attachments PDF File *</Label>
            <InstructionsBox>
              <h5>Merge all the following documents into ONE single PDF file before uploading:</h5>
              <ul>
                {currentPackage.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </InstructionsBox>
            <Input type="file" accept="application/pdf" onChange={handleFileChange} required />
            <HelpText>Accepts only standard .pdf documents file structures (Max size limit: 25MB).</HelpText>
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            Submit Secure Corporate Filing Order
          </SubmitButton>
        </form>
      </FormContainer>
    </PortalContainer>
  );
}