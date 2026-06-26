// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import Swal from 'sweetalert2';

// // --- STYLED COMPONENTS ---
// const FormContainer = styled.div`
//   max-width: 600px;
//   margin: 0 auto;
//   padding: 24px;
//   background-color: ${props => props.theme.colors?.bgWhite || '#ffffff'};
//   border-radius: 12px;
//   border: 1px solid ${props => props.theme.colors?.borderLight || '#e5e7eb'};
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
// `;

// const BackButton = styled.button`
//   background: none;
//   border: none;
//   color: ${props => props.theme.colors?.primary || '#2563eb'};
//   font-size: 0.875rem;
//   font-weight: 500;
//   cursor: pointer;
//   margin-bottom: 20px;
//   padding: 0;
//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const FormTitle = styled.h2`
//   font-size: 1.5rem;
//   font-weight: 700;
//   color: ${props => props.theme.colors?.textDark || '#111827'};
//   margin-bottom: 4px;
// `;

// const FormSubtitle = styled.p`
//   font-size: 0.875rem;
//   color: ${props => props.theme.colors?.textMuted || '#64748b'};
//   margin-bottom: 24px;
// `;

// const SectionTitle = styled.h3`
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: ${props => props.theme.colors?.textDark || '#1f2937'};
//   margin-top: 24px;
//   margin-bottom: 16px;
//   border-bottom: 1px solid ${props => props.theme.colors?.borderLight || '#f1f5f9'};
//   padding-bottom: 8px;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 16px;
// `;

// const Label = styled.label`
//   display: block;
//   font-size: 0.875rem;
//   font-weight: 500;
//   color: ${props => props.theme.colors?.textMedium || '#374151'};
//   margin-bottom: 6px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px 12px;
//   border: 1px solid ${props => props.theme.colors?.borderMedium || '#cbd5e1'};
//   border-radius: 8px;
//   font-size: 0.95rem;
//   color: ${props => props.theme.colors?.textDark || '#111827'};
//   box-sizing: border-box;

//   &:focus {
//     outline: none;
//     border-color: ${props => props.theme.colors?.primary || '#2563eb'};
//   }
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px 12px;
//   border: 1px solid ${props => props.theme.colors?.borderMedium || '#cbd5e1'};
//   border-radius: 8px;
//   font-size: 0.95rem;
//   color: ${props => props.theme.colors?.textDark || '#111827'};
//   background-color: #ffffff;
//   box-sizing: border-box;

//   &:focus {
//     outline: none;
//     border-color: ${props => props.theme.colors?.primary || '#2563eb'};
//   }
// `;

// const InfoBox = styled.div`
//   background-color: ${props => props.theme.colors?.bgInfo || '#f8fafc'};
//   border-left: 4px solid ${props => props.theme.colors?.info || '#64748b'};
//   padding: 12px;
//   border-radius: 0 8px 8px 0;
//   font-size: 0.85rem;
//   color: ${props => props.theme.colors?.textMuted || '#475569'};
//   margin-top: 8px;
//   line-height: 1.4;
// `;

// const UploadBox = styled.label`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 20px;
//   border: 2px dashed ${props => props.theme.colors?.borderMedium || '#cbd5e1'};
//   border-radius: 8px;
//   background-color: #fafafa;
//   cursor: pointer;
//   text-align: center;
//   transition: border-color 0.2s;

//   &:hover {
//     border-color: ${props => props.theme.colors?.primary || '#2563eb'};
//   }

//   input {
//     display: none;
//   }
// `;

// const UploadText = styled.span`
//   font-size: 0.9rem;
//   font-weight: 500;
//   color: ${props => props.theme.colors?.primary || '#2563eb'};
// `;

// const UploadSubtext = styled.span`
//   font-size: 0.75rem;
//   color: #718096;
//   margin-top: 4px;
// `;

// const FileBadge = styled.div`
//   margin-top: 8px;
//   font-size: 0.8rem;
//   color: #16a34a;
//   background-color: #f0fdf4;
//   padding: 4px 8px;
//   border-radius: 4px;
//   display: inline-block;
// `;

// const PriceBreakdownBox = styled.div`
//   background-color: #f8fafc;
//   border: 1px solid #e2e8f0;
//   border-radius: 8px;
//   padding: 16px;
//   font-size: 0.9rem;
// `;

// const PriceRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 8px;
//   color: ${props => props.theme.colors?.textMedium || '#4a5568'};

//   &.total {
//     border-top: 1px solid #e2e8f0;
//     padding-top: 8px;
//     margin-top: 8px;
//     font-weight: 700;
//     color: ${props => props.theme.colors?.textDark || '#111827'};
//     font-size: 1.05rem;
//   }
// `;

// const CheckboxGroup = styled.div`
//   display: flex;
//   align-items: flex-start;
//   gap: 10px;
//   margin-bottom: 12px;
//   cursor: pointer;

//   input {
//     margin-top: 3px;
//   }

//   label {
//     font-size: 0.85rem;
//     color: ${props => props.theme.colors?.textMedium || '#4a5568'};
//     line-height: 1.4;
//   }
// `;

// const SubmitButton = styled.button`
//   width: 100%;
//   background-color: ${props => props.theme.colors?.primary || '#2563eb'};
//   color: #ffffff;
//   padding: 12px;
//   border-radius: 8px;
//   font-weight: 600;
//   font-size: 1rem;
//   border: none;
//   cursor: pointer;
//   margin-top: 20px;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: ${props => props.theme.colors?.primaryHover || '#1d4ed8'};
//   }

//   &:disabled {
//     background-color: #cbd5e1;
//     cursor: not-allowed;
//   }
// `;

// // --- MAIN COMPONENT ---
// const BusinessNameAnnualReturnsForm = ({ userWalletBalance, onFilingSuccess }) => {
//   // Pricing configuration rules
//   const BASE_PRICE_PER_YEAR = 14000;
//   const PENALTY_PER_YEAR = 5000;
//   const CURRENT_COMPLETED_YEAR = 2025;

//   // Form states
//   const [businessName, setBusinessName] = useState('');
//   const [bnNumber, setBnNumber] = useState('');
//   const [nin, setNin] = useState('');
//   const [startingYear, setStartingYear] = useState('');
//   const navigate = useNavigate();
  
//   // File states
//   const [cacCertificate, setCacCertificate] = useState(null);
//   const [ninSlip, setNinSlip] = useState(null);

//   // Checkbox states
//   const [infoConfirmed, setInfoConfirmed] = useState(false);
//   const [walletAuthorized, setWalletAuthorized] = useState(false);

//   // Price calculation states
//   const [pricing, setPricing] = useState({ totalYears: 0, baseTotal: 0, penaltyTotal: 0, grandTotal: 0 });

//   // Generate years from 2000 to 2025 for selection dropdown
//   const yearOptions = [];
//   for (let y = CURRENT_COMPLETED_YEAR; y >= 2000; y--) {
//     yearOptions.push(y);
//   }

//   // Calculate pricing breakdown in real-time when the starting year changes
//   useEffect(() => {
//     if (!startingYear) {
//       setPricing({ totalYears: 0, baseTotal: 0, penaltyTotal: 0, grandTotal: 0 });
//       return;
//     }

//     const start = parseInt(startingYear);
//     const totalYears = (CURRENT_COMPLETED_YEAR - start) + 1;
    
//     // 2025 is the base year (no penalty). Earlier years incur a penalty.
//     const penaltyYears = totalYears > 1 ? totalYears - 1 : 0;

//     const baseTotal = totalYears * BASE_PRICE_PER_YEAR;
//     const penaltyTotal = penaltyYears * PENALTY_PER_YEAR;
//     const grandTotal = baseTotal + penaltyTotal;

//     setPricing({ totalYears, baseTotal, penaltyTotal, grandTotal });
//   }, [startingYear]);

//   // Form submission handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 1. Inputs validation check
//     if (!businessName.trim() || !bnNumber.trim()) {
//       Swal.fire({ icon: 'error', title: 'Missing Details', text: 'Please fill in the Business Name and RC/BN Number.' });
//       return;
//     }

//     if (nin.length !== 11 || !/^\d+$/.test(nin)) {
//       Swal.fire({ icon: 'error', title: 'Invalid NIN', text: 'The NIN must be exactly 11 numeric digits.' });
//       return;
//     }

//     if (!startingYear) {
//       Swal.fire({ icon: 'error', title: 'Select Year', text: 'Please choose a starting year for the filing.' });
//       return;
//     }

//     if (!cacCertificate || !ninSlip) {
//       Swal.fire({ icon: 'error', title: 'Missing Documents', text: 'Please upload both your CAC Certificate and NIN Slip.' });
//       return;
//     }

//     if (!infoConfirmed || !walletAuthorized) {
//       Swal.fire({ icon: 'warning', title: 'Confirmation Required', text: 'Please review and check both agreement boxes below.' });
//       return;
//     }

//     // // 2. Check user's balance
//     // if (userWalletBalance < pricing.grandTotal) {
//     //   Swal.fire({ 
//     //     icon: 'error', 
//     //     title: 'Insufficient Funds', 
//     //     text: `Your wallet balance is too low. Total required is ₦${pricing.grandTotal.toLocaleString()}.00` 
//     //   });
//     //   return;
//     // }

//     // 3. Confirm deduction before final processing
//     Swal.fire({
//       title: 'Confirm Filing Payment',
//       text: `You will be charged ₦${pricing.grandTotal.toLocaleString()}.00 from your wallet to file for ${pricing.totalYears} year(s). Do you want to submit?`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#2563eb',
//       cancelButtonColor: '#64748b',
//       confirmButtonText: 'Yes, Pay & Submit'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         // Here you would bundle your form entries and local files into a FormData object and append to your fetch backend
//         try {
//           Swal.fire({ title: 'Processing Order...', text: 'Uploading files and saving application data.', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
          
//           // Simulated success callback logic 
//           setTimeout(() => {
//             Swal.fire({ icon: 'success', title: 'Filing Order Logged', text: 'Your business name annual returns order was successfully submitted.' });
//             if (onFilingSuccess) onFilingSuccess();
//           }, 2000);

//         } catch (err) {
//           Swal.fire({ icon: 'error', title: 'Error Encountered', text: 'Could not complete your request. Please try again.' });
//         }
//       }
//     });
//   };

//   return (
//     <FormContainer>
//       <BackButton onClick={()=>navigate('/userdashboard/service/annualreturns')}>← Back to Select Return Type</BackButton>
      
//       <FormTitle>Business Name Returns</FormTitle>
//       <FormSubtitle>Filing application for sole proprietors and partnerships</FormSubtitle>

//       <form onSubmit={handleSubmit}>
        
//         <SectionTitle>Business Details</SectionTitle>
        
//         <FormGroup>
//           <Label>Business / Company Name *</Label>
//           <Input 
//             type="text" 
//             placeholder="Enter business name as registered with CAC" 
//             value={businessName}
//             onChange={(e) => setBusinessName(e.target.value)}
//             required 
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label>RC / BN Number *</Label>
//           <Input 
//             type="text" 
//             placeholder="Enter BN number or RC number" 
//             value={bnNumber}
//             onChange={(e) => setBnNumber(e.target.value)}
//             required 
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label>NIN (11 digits) *</Label>
//           <Input 
//             type="text" 
//             maxLength={11}
//             placeholder="Enter the proprietor's 11-digit NIN" 
//             value={nin}
//             onChange={(e) => setNin(e.target.value)}
//             required 
//           />
//         </FormGroup>

//         <SectionTitle>Select Starting Year</SectionTitle>
//         <FormGroup>
//           <Label>From which year do you want to start filing?</Label>
//           <Select 
//             value={startingYear} 
//             onChange={(e) => setStartingYear(e.target.value)}
//             required
//           >
//             <option value="">-- Select Starting Year --</option>
//             {yearOptions.map(year => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </Select>
          
//           <InfoBox>
//             <strong>How it works:</strong> Select the earliest year you need to file. The system will automatically calculate all years from your selected year up to 2025 (last completed year).
//             <br /><br />
//             <strong>Pricing:</strong> 2025 (Base Year) costs base price only with no penalty. Earlier years add the base price plus a penalty fee per year.
//           </InfoBox>
//         </FormGroup>

//         <SectionTitle>Upload Documents</SectionTitle>
        
//         <FormGroup style={{ marginBottom: '20px' }}>
//           <Label>CAC Certificate *</Label>
//           <UploadBox>
//             <UploadText>Click to upload CAC Certificate</UploadText>
//             <UploadSubtext>PDF, JPG, PNG (Max 5MB)</UploadSubtext>
//             <input 
//               type="file" 
//               accept=".pdf,.jpg,.jpeg,.png" 
//               onChange={(e) => setCacCertificate(e.target.files[0] || null)}
//               required
//             />
//           </UploadBox>
//           {cacCertificate && <FileBadge>✓ {cacCertificate.name}</FileBadge>}
//         </FormGroup>

//         <FormGroup style={{ marginBottom: '24px' }}>
//           <Label>NIN Slip *</Label>
//           <UploadBox>
//             <UploadText>Click to upload NIN Slip</UploadText>
//             <UploadSubtext>PDF, JPG, PNG (Max 5MB)</UploadSubtext>
//             <input 
//               type="file" 
//               accept=".pdf,.jpg,.jpeg,.png" 
//               onChange={(e) => setNinSlip(e.target.files[0] || null)}
//               required
//             />
//           </UploadBox>
//           {ninSlip && <FileBadge>✓ {ninSlip.name}</FileBadge>}
//         </FormGroup>

//         <SectionTitle>Price Breakdown</SectionTitle>
//         <FormGroup>
//           {!startingYear ? (
//             <PriceBreakdownBox style={{ color: '#718096', textAlign: 'center' }}>
//               Select a starting year to see price breakdown
//             </PriceBreakdownBox>
//           ) : (
//             <PriceBreakdownBox>
//               <PriceRow>
//                 <span>Filing Interval:</span>
//                 <span>{startingYear} — {CURRENT_COMPLETED_YEAR} ({pricing.totalYears} Year{pricing.totalYears > 1 ? 's' : ''})</span>
//               </PriceRow>
//               <PriceRow>
//                 <span>Base Filing Fees (₦14,000 × {pricing.totalYears}):</span>
//                 <span>₦{pricing.baseTotal.toLocaleString()}.00</span>
//               </PriceRow>
//               <PriceRow>
//                 <span>Accumulated Penalties (₦5,000 × {pricing.totalYears > 1 ? pricing.totalYears - 1 : 0}):</span>
//                 <span>₦{pricing.penaltyTotal.toLocaleString()}.00</span>
//               </PriceRow>
//               <PriceRow className="total">
//                 <span>Total Calculated Amount:</span>
//                 <span>₦{pricing.grandTotal.toLocaleString()}.00</span>
//               </PriceRow>
//             </PriceBreakdownBox>
//           )}
//         </FormGroup>

//         <FormGroup style={{ marginTop: '24px' }}>
//           <CheckboxGroup>
//             <input 
//               type="checkbox" 
//               id="confirmInfo" 
//               checked={infoConfirmed} 
//               onChange={(e) => setInfoConfirmed(e.target.checked)} 
//             />
//             <label htmlFor="confirmInfo">I confirm that all information provided is accurate and complete</label>
//           </CheckboxGroup>

//           <CheckboxGroup>
//             <input 
//               type="checkbox" 
//               id="authorizeWallet" 
//               checked={walletAuthorized} 
//               onChange={(e) => setWalletAuthorized(e.target.checked)} 
//             />
//             <label htmlFor="authorizeWallet">I authorize the deduction of the total amount from my wallet</label>
//           </CheckboxGroup>
//         </FormGroup>

//         <SubmitButton type="submit" disabled={!infoConfirmed || !walletAuthorized || !startingYear}>
//           Submit Application
//         </SubmitButton>

//       </form>
//     </FormContainer>
//   );
// };

// export default BusinessNameAnnualReturnsForm;




import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Context } from './Context';

// --- STYLED COMPONENTS ---
const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  background-color: ${props => props.theme.colors?.bgWhite || '#ffffff'};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors?.borderLight || '#e5e7eb'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors?.primary || '#2563eb'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 0;
  &:hover {
    text-decoration: underline;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors?.textDark || '#111827'};
  margin-bottom: 4px;
`;

const FormSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors?.textMuted || '#64748b'};
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.colors?.textDark || '#1f2937'};
  margin-top: 24px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${props => props.theme.colors?.borderLight || '#f1f5f9'};
  padding-bottom: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.colors?.textMedium || '#374151'};
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.theme.colors?.borderMedium || '#cbd5e1'};
  border-radius: 8px;
  font-size: 0.95rem;
  color: ${props => props.theme.colors?.textDark || '#111827'};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors?.primary || '#2563eb'};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.theme.colors?.borderMedium || '#cbd5e1'};
  border-radius: 8px;
  font-size: 0.95rem;
  color: ${props => props.theme.colors?.textDark || '#111827'};
  background-color: #ffffff;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors?.primary || '#2563eb'};
  }
`;

const InfoBox = styled.div`
  background-color: ${props => props.theme.colors?.bgInfo || '#f8fafc'};
  border-left: 4px solid ${props => props.theme.colors?.info || '#64748b'};
  padding: 12px;
  border-radius: 0 8px 8px 0;
  font-size: 0.85rem;
  color: ${props => props.theme.colors?.textMuted || '#475569'};
  margin-top: 8px;
  line-height: 1.4;
`;

const UploadBox = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border: 2px dashed ${props => props.theme.colors?.borderMedium || '#cbd5e1'};
  border-radius: 8px;
  background-color: #fafafa;
  cursor: pointer;
  text-align: center;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${props => props.theme.colors?.primary || '#2563eb'};
  }

  input {
    display: none;
  }
`;

const UploadText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.colors?.primary || '#2563eb'};
`;

const UploadSubtext = styled.span`
  font-size: 0.75rem;
  color: #718096;
  margin-top: 4px;
  line-height: 1.4;
`;

const FileBadge = styled.div`
  margin-top: 8px;
  font-size: 0.8rem;
  color: #16a34a;
  background-color: #f0fdf4;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
`;

const PriceBreakdownBox = styled.div`
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  font-size: 0.9rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: ${props => props.theme.colors?.textMedium || '#4a5568'};

  &.total {
    border-top: 1px solid #e2e8f0;
    padding-top: 8px;
    margin-top: 8px;
    font-weight: 700;
    color: ${props => props.theme.colors?.textDark || '#111827'};
    font-size: 1.05rem;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  cursor: pointer;

  input {
    margin-top: 3px;
  }

  label {
    font-size: 0.85rem;
    color: ${props => props.theme.colors?.textMedium || '#4a5568'};
    line-height: 1.4;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: ${props => props.theme.colors?.primary || '#2563eb'};
  color: #ffffff;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors?.primaryHover || '#1d4ed8'};
  }

  &:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
  }
`;

// --- MAIN COMPONENT ---
const BusinessNameAnnualReturnsForm = ({ userWalletBalance, onFilingSuccess }) => {
  const BASE_PRICE_PER_YEAR = 14000;
  const PENALTY_PER_YEAR = 5000;
  const CURRENT_COMPLETED_YEAR = 2025;

  // Form states
  const [businessName, setBusinessName] = useState('');
  const [bnNumber, setBnNumber] = useState('');
  const [nin, setNin] = useState('');
  const [startingYear, setStartingYear] = useState('');
  const navigate = useNavigate();
  const {user,fetchUserProfileById,api_url}=useContext(Context)
  
  // Single merged document file state
  const [mergedDocument, setMergedDocument] = useState(null);

  // Checkbox states
  const [infoConfirmed, setInfoConfirmed] = useState(false);
  const [walletAuthorized, setWalletAuthorized] = useState(false);

  // Price calculation states
  const [pricing, setPricing] = useState({ totalYears: 0, baseTotal: 0, penaltyTotal: 0, grandTotal: 0 });

  // Generate years from 2000 to 2025
  const yearOptions = [];
  for (let y = CURRENT_COMPLETED_YEAR; y >= 2000; y--) {
    yearOptions.push(y);
  }

  // Calculate prices
  useEffect(() => {
    if (!startingYear) {
      setPricing({ totalYears: 0, baseTotal: 0, penaltyTotal: 0, grandTotal: 0 });
      return;
    }

    const start = parseInt(startingYear);
    const totalYears = (CURRENT_COMPLETED_YEAR - start) + 1;
    const penaltyYears = totalYears > 1 ? totalYears - 1 : 0;

    const baseTotal = totalYears * BASE_PRICE_PER_YEAR;
    const penaltyTotal = penaltyYears * PENALTY_PER_YEAR;
    const grandTotal = baseTotal + penaltyTotal;

    setPricing({ totalYears, baseTotal, penaltyTotal, grandTotal });
  }, [startingYear]);

  // Handle file selection and enforce rules
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Verify file format is strictly a PDF
    if (file.type !== 'application/pdf') {
      Swal.fire({ icon: 'error', title: 'Invalid File Format', text: 'Please upload your merged documents as a single PDF file.' });
      setMergedDocument(null);
      e.target.value = ''; // Reset input element
      return;
    }

    // Verify file size limit (25MB = 25 * 1024 * 1024 bytes)
    const maxSizeBytes = 25 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      Swal.fire({ icon: 'error', title: 'File Too Large', text: 'The selected PDF file exceeds the 25MB maximum size limit.' });
      setMergedDocument(null);
      e.target.value = ''; // Reset input element
      return;
    }

    setMergedDocument(file);
  };

// Form submission handler connected to file_business_returns.php
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Structural inputs validation check
    if (!businessName.trim() || !bnNumber.trim()) {
      Swal.fire({ icon: 'error', title: 'Missing Details', text: 'Please fill in the Business Name and RC/BN Number.' });
      return;
    }

    if (nin.length !== 11 || !/^\d+$/.test(nin)) {
      Swal.fire({ icon: 'error', title: 'Invalid NIN', text: 'The NIN must be exactly 11 numeric digits.' });
      return;
    }

    if (!startingYear) {
      Swal.fire({ icon: 'error', title: 'Select Year', text: 'Please choose a starting year for the filing.' });
      return;
    }

    if (!mergedDocument) {
      Swal.fire({ icon: 'error', title: 'Missing Documents', text: 'Please merge your CAC Certificate and NIN Slip into one PDF and upload it.' });
      return;
    }

    if (!infoConfirmed || !walletAuthorized) {
      Swal.fire({ icon: 'warning', title: 'Confirmation Required', text: 'Please review and check both agreement boxes below.' });
      return;
    }

    // // 2. Optional front-end wallet balance protection safeguard
    // if (typeof userWalletBalance !== 'undefined' && userWalletBalance < pricing.grandTotal) {
    //   Swal.fire({ 
    //     icon: 'error', 
    //     title: 'Insufficient Funds', 
    //     text: `Your wallet balance is too low. Total required is ₦${pricing.grandTotal.toLocaleString()}.00` 
    //   });
    //   return;
    // }

    // 3. Confirm deduction before initiating the asynchronous API pipeline
    Swal.fire({
      title: 'Confirm Filing Payment',
      text: `You will be charged ₦${pricing.grandTotal.toLocaleString()}.00 from your wallet to file for ${pricing.totalYears} year(s). Do you want to submit?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Pay & Submit'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Initialize processing loading UI state
          Swal.fire({ 
            title: 'Processing Order...', 
            text: 'Uploading merged document packet and recording filing data.', 
            allowOutsideClick: false, 
            didOpen: () => { Swal.showLoading(); } 
          });

          // Compile Multipart Data matching backend expectations
          const formData = new FormData();
          formData.append('userId', user?.id); // Ensure userId is captured from application context or state
          formData.append('businessName', businessName.trim());
          formData.append('bnNumber', bnNumber.trim());
          formData.append('nin', nin);
          formData.append('startingYear', startingYear);
          formData.append('merged_document', mergedDocument); // Target file key configuration

          // Execute actual backend request via network fetch pipeline
          const response = await fetch(`${api_url}/file_business_name_annual_return.php`, {
            method: 'POST',
            body: formData,
            // Note: Don't set 'Content-Type' header explicitly when sending FormData; 
            // the browser will auto-assign it with the correct boundary parameters.
          });

          if (!response.ok) {
            throw new Error(`Server returned status code: ${response.status}`);
          }

          const data = await response.json();

          if (data.success) {
            Swal.fire({ 
              icon: 'success', 
              title: 'Filing Order Logged', 
              text: data.message || 'Your business name annual returns order was successfully submitted. You can check the progress in your service history.',
              confirmButtonColor: '#2563eb'
            });

            fetchUserProfileById();
            navigate('/userdashboard/service/annualreturns')
            // Execute parent context lifecycle success actions if present
            // if (onFilingSuccess) onFilingSuccess();
          } else {
            // Display clean server-side runtime error messages (e.g., Insufficient funds or invalid file types)
            Swal.fire({ 
              icon: 'error', 
              title: 'Submission Failed', 
              text: data.error || 'The system could not process your returns application.' 
            });
          }

        } catch (err) {
          console.error("Filing request execution failure:", err);
          Swal.fire({ 
            icon: 'error', 
            title: 'Network Error', 
            text: 'Could not connect to the processing server. Please verify your connection and try again.' 
          });
        }
      }
    });
  };




  return (
    <FormContainer>
      <BackButton onClick={() => navigate('/userdashboard/service/annualreturns')}>← Back to Select Return Type</BackButton>
      
      <FormTitle>Business Name Returns</FormTitle>
      <FormSubtitle>Filing application for sole proprietors and partnerships</FormSubtitle>

      <form onSubmit={handleSubmit}>
        
        <SectionTitle>Business Details</SectionTitle>
        
        <FormGroup>
          <Label>Business / Company Name *</Label>
          <Input 
            type="text" 
            placeholder="Enter business name as registered with CAC" 
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required 
          />
        </FormGroup>

        <FormGroup>
          <Label>RC / BN Number *</Label>
          <Input 
            type="text" 
            placeholder="Enter BN number or RC number" 
            value={bnNumber}
            onChange={(e) => setBnNumber(e.target.value)}
            required 
          />
        </FormGroup>

        <FormGroup>
          <Label>NIN (11 digits) *</Label>
          <Input 
            type="text" 
            maxLength={11}
            placeholder="Enter the proprietor's 11-digit NIN" 
            value={nin}
            onChange={(e) => setNin(e.target.value)}
            required 
          />
        </FormGroup>

        <SectionTitle>Select Starting Year</SectionTitle>
        <FormGroup>
          <Label>From which year do you want to start filing?</Label>
          <Select 
            value={startingYear} 
            onChange={(e) => setStartingYear(e.target.value)}
            required
          >
            <option value="">-- Select Starting Year --</option>
            {yearOptions.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
          
          <InfoBox>
            <strong>How it works:</strong> Select the earliest year you need to file. The system will automatically calculate all years from your selected year up to 2025 (last completed year).
            <br /><br />
            <strong>Pricing:</strong> 2025 (Base Year) costs base price only with no penalty. Earlier years add the base price plus a penalty fee per year.
          </InfoBox>
        </FormGroup>

        <SectionTitle>Upload Documents</SectionTitle>
        <FormGroup style={{ marginBottom: '24px' }}>
          <Label>Merged Documents (CAC Certificate & NIN Slip) *</Label>
          <UploadBox>
            <UploadText>Click to upload merged documents</UploadText>
            <UploadSubtext>
              Please merge your <strong>CAC Certificate</strong> and <strong>NIN Slip</strong> together into a single file.
              <br />
              Accepts: <strong>PDF files only</strong> (Max 25MB)
            </UploadSubtext>
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange}
              required
            />
          </UploadBox>
          {mergedDocument && <FileBadge>✓ {mergedDocument.name} ({(mergedDocument.size / (1024 * 1024)).toFixed(2)} MB)</FileBadge>}
        </FormGroup>

        <SectionTitle>Price Breakdown</SectionTitle>
        <FormGroup>
          {!startingYear ? (
            <PriceBreakdownBox style={{ color: '#718096', textAlign: 'center' }}>
              Select a starting year to see price breakdown
            </PriceBreakdownBox>
          ) : (
            <PriceBreakdownBox>
              <PriceRow>
                <span>Filing Interval:</span>
                <span>{startingYear} — {CURRENT_COMPLETED_YEAR} ({pricing.totalYears} Year{pricing.totalYears > 1 ? 's' : ''})</span>
              </PriceRow>
              <PriceRow>
                <span>Base Filing Fees (₦14,000 × {pricing.totalYears}):</span>
                <span>₦{pricing.baseTotal.toLocaleString()}.00</span>
              </PriceRow>
              <PriceRow>
                <span>Accumulated Penalties (₦5,000 × {pricing.totalYears > 1 ? pricing.totalYears - 1 : 0}):</span>
                <span>₦{pricing.penaltyTotal.toLocaleString()}.00</span>
              </PriceRow>
              <PriceRow className="total">
                <span>Total Calculated Amount:</span>
                <span>₦{pricing.grandTotal.toLocaleString()}.00</span>
              </PriceRow>
            </PriceBreakdownBox>
          )}
        </FormGroup>

        <FormGroup style={{ marginTop: '24px' }}>
          <CheckboxGroup>
            <input 
              type="checkbox" 
              id="confirmInfo" 
              checked={infoConfirmed} 
              onChange={(e) => setInfoConfirmed(e.target.checked)} 
            />
            <label htmlFor="confirmInfo">I confirm that all information provided is accurate and complete</label>
          </CheckboxGroup>

          <CheckboxGroup>
            <input 
              type="checkbox" 
              id="authorizeWallet" 
              checked={walletAuthorized} 
              onChange={(e) => setWalletAuthorized(e.target.checked)} 
            />
            <label htmlFor="authorizeWallet">I authorize the deduction of the total amount from my wallet</label>
          </CheckboxGroup>
        </FormGroup>

        <SubmitButton type="submit" disabled={!infoConfirmed || !walletAuthorized || !startingYear || !mergedDocument}>
          Submit Application
        </SubmitButton>

      </form>
    </FormContainer>
  );
};

export default BusinessNameAnnualReturnsForm;