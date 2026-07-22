// import React, { useState, useContext } from 'react';
// import styled from 'styled-components';
// import Swal from 'sweetalert2';
// import { Context } from './Context'; // Assuming path matches your setup

// export default function ScumlRegistrationPage() {
//   const { api_url, user , fetchUserProfileById} = useContext(Context);

//   // Multi-step pointer state
//   const [currentStep, setCurrentStep] = useState(1);

//   // Integrated Form State Configuration Ledger
//   const [formData, setFormData] = useState({
//     // Step 1: Director & Business Info
//     directorName: '',
//     tinNumber: '',
//     dob: '',
//     nin: '',
//     bvn: '',
//     email: '',
//     phone: '',
//     companyAddress: '',
//     businessCategory: 'regular', // default: regular or oil_gas
//     natureOfBusiness: '',

//     // Step 2: Bank Account Configurations
//     bankName: '',
//     accountNumber: '',
//     accountName: '',

//     // Step 3: Document Reference Pointers
//     cacCertificate: null,
//     statusReport: null,
//     memart: null,
//     tinSlip: null,
//     ninSlip: null
//   });

//   // Calculate pricing matrices dynamically
//   const BASE_PRICE_REGULAR = 45000;
//   const BASE_PRICE_OIL_GAS = 60000;
//   const currentPrice = formData.businessCategory === 'oil_gas' ? BASE_PRICE_OIL_GAS : BASE_PRICE_REGULAR;

//   // Track text updates dynamically
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Limit numeric strings (NIN, BVN, Account Number)
//   const handleNumericChange = (e, maxLength) => {
//     const { name, value } = e.target;
//     const cleanValue = value.replace(/\D/g, '').slice(0, maxLength);
//     setFormData((prev) => ({ ...prev, [name]: cleanValue }));
//   };

//   // Track raw files safely
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (files && files[0]) {
//       setFormData((prev) => ({ ...prev, [name]: files[0] }));
//     }
//   };

//   // Handle step jumping safely with minimal validations
//   const handleNextStep = (e) => {
//     e.preventDefault();
//     if (currentStep < 4) {
//       setCurrentStep((prev) => prev + 1);
//       window.scrollTo(0, 0);
//     }
//   };

//   const handlePrevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//       window.scrollTo(0, 0);
//     }
//   };

//  // Final submission function to process SCUML registration
// const handleFinalSubmit = (e) => {
//   e.preventDefault();

//   // 1. Ask the user for final confirmation
//   Swal.fire({
//     title: 'Confirm Registration',
//     text: `You are about to submit your application. A fee of ₦${currentPrice.toLocaleString()} will be deducted from your wallet balance.`,
//     icon: 'question',
//     showCancelButton: true,
//     confirmButtonColor: '#2563eb',
//     cancelButtonColor: '#64748b',
//     confirmButtonText: 'Yes, Submit & Pay',
//     cancelButtonText: 'Cancel'
//   }).then((result) => {
    
//     // 2. If user clicks confirm, start the submission process
//     if (result.isConfirmed) {
      
//       // Show loading spinner while files upload and database updates
//       Swal.fire({
//         title: 'Submitting Your Application...',
//         text: 'Please wait while we upload your documents and process your payment. Do not close this page.',
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         }
//       });

//       // 3. Prepare the form data (including text fields and file uploads)
//       const uploadData = new FormData();
      
//       // Append user identification and text fields
//       uploadData.append('userId', user?.id); // Uses whichever user ID variable is active in your context
//       uploadData.append('directorName', formData.directorName);
//       uploadData.append('tinNumber', formData.tinNumber);
//       uploadData.append('dob', formData.dob);
//       uploadData.append('email', formData.email);
//       uploadData.append('phone', formData.phone);
//       uploadData.append('nin', formData.nin);
//       uploadData.append('bvn', formData.bvn);
//       uploadData.append('businessCategory', formData.businessCategory);
//       uploadData.append('companyAddress', formData.companyAddress);
//       uploadData.append('natureOfBusiness', formData.natureOfBusiness);
//       uploadData.append('bankName', formData.bankName);
//       uploadData.append('accountNumber', formData.accountNumber);
//       uploadData.append('accountName', formData.accountName);

//       // Append files securely
//       if (formData.cacCertificate) uploadData.append('cacCertificate', formData.cacCertificate);
//       if (formData.statusReport) uploadData.append('statusReport', formData.statusReport);
//       if (formData.memart) uploadData.append('memart', formData.memart);
//       if (formData.tinSlip) uploadData.append('tinSlip', formData.tinSlip);
//       if (formData.ninSlip) uploadData.append('ninSlip', formData.ninSlip);

//       // 4. Send the data to your backend script
//       fetch(`${api_url}/register_scuml.php`, {
//         method: 'POST',
//         body: uploadData // Send the compiled form data directly without JSON stringifying
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) {
//             // Success Alert
//             Swal.fire({
//               title: 'Submission Successful!',
//               text: data.message || 'Your application has been received. Our team will review it and get back to you via email.',
//               icon: 'success',
//               confirmButtonColor: '#2563eb'
//             });

//             // Clean up files and inputs after a successful registration
//             setFormData({
//               directorName: '', tinNumber: '', dob: '', nin: '', bvn: '',
//               email: '', phone: '', companyAddress: '', businessCategory: 'regular',
//               natureOfBusiness: '', bankName: '', accountNumber: '', accountName: '',
//               cacCertificate: null, statusReport: null, memart: null, tinSlip: null, ninSlip: null
//             });

//             // Refresh the user's dashboard profile to update their new wallet balance balance instantly
//             if (typeof fetchUserProfileById === 'function') {
//               fetchUserProfileById();
//             }

//             // Go back to the first step of the page
//             setCurrentStep(1);

//           } else {
//             // Error alert returned by the server backend logic
//             Swal.fire({
//               title: 'Submission Failed',
//               text: data.error || 'Something went wrong while processing your request. Please try again.',
//               icon: 'error',
//               confirmButtonColor: '#2563eb'
//             });
//           }
//         })
//         .catch(() => {
//           // Network failure fallback safety alert
//           Swal.fire({
//             title: 'Connection Error',
//             text: 'Could not connect to the server. Please check your internet connection and try again.',
//             icon: 'error',
//             confirmButtonColor: '#2563eb'
//           });
//         });
//     }
//   });
// };



//   return (
//     <PageLayoutContainer>
//       <MainCardWrapper>
//         {/* Header Metadata Section */}
//         <BrandHeadingBlock>
//           <h2>SCUML Registration</h2>
//           <p>Special Control Unit against Money Laundering Secure Validation Portal</p>
//           <PriceTagContainer>
//             <span className="badge regular">Regular: ₦{BASE_PRICE_REGULAR.toLocaleString()}</span>
//             <span className="badge oil">Oil & Gas: ₦{BASE_PRICE_OIL_GAS.toLocaleString()}</span>
//           </PriceTagContainer>
//         </BrandHeadingBlock>

//         {/* Step-by-Step Status Indicator Track */}
//         <StepIndicatorBar>
//           <StepNode active={currentStep >= 1} complete={currentStep > 1}>
//             <div className="circle">1</div>
//             <span>Director Info</span>
//           </StepNode>
//           <StepLine active={currentStep > 1} />
//           <StepNode active={currentStep >= 2} complete={currentStep > 2}>
//             <div className="circle">2</div>
//             <span>Bank Details</span>
//           </StepNode>
//           <StepLine active={currentStep > 2} />
//           <StepNode active={currentStep >= 3} complete={currentStep > 3}>
//             <div className="circle">3</div>
//             <span>Documents</span>
//           </StepNode>
//           <StepLine active={currentStep > 3} />
//           <StepNode active={currentStep === 4}>
//             <div className="circle">4</div>
//             <span>Review</span>
//           </StepNode>
//         </StepIndicatorBar>

//         {/* Dynamic Multi-Step Form Context */}
//         <form onSubmit={currentStep === 4 ? handleFinalSubmit : handleNextStep}>
          
//           {/* STEP 1: DIRECTOR INFO */}
//           {currentStep === 1 && (
//             <FormSectionBlock>
//               <SectionTitle>Director & Corporate Information</SectionTitle>
//               <GridRowContainer>
//                 <FormGroup>
//                   <label>Director Full Name *</label>
//                   <input type="text" name="directorName" value={formData.directorName} onChange={handleInputChange} required placeholder="John Doe" />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>TIN Number *</label>
//                   <input type="text" name="tinNumber" value={formData.tinNumber} onChange={handleInputChange} required placeholder="Corporate TIN Number" />
//                 </FormGroup>
//               </GridRowContainer>

//               <GridRowContainer>
//                 <FormGroup>
//                   <label>Date of Birth *</label>
//                   <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Email Address *</label>
//                   <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="director@company.com" />
//                 </FormGroup>
//               </GridRowContainer>

//               <GridRowContainer>
//                 <FormGroup>
//                   <label>NIN (11 digits) *</label>
//                   <input type="text" name="nin" value={formData.nin} onChange={(e) => handleNumericChange(e, 11)} required placeholder="National Identity Number" />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>BVN (11 digits) *</label>
//                   <input type="text" name="bvn" value={formData.bvn} onChange={(e) => handleNumericChange(e, 11)} required placeholder="Bank Verification Number" />
//                 </FormGroup>
//               </GridRowContainer>

//               <GridRowContainer>
//                 <FormGroup>
//                   <label>Phone Number *</label>
//                   <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="080XXXXXXXX" />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Business Category *</label>
//                   <select name="businessCategory" value={formData.businessCategory} onChange={handleInputChange} required>
//                     <option value="regular">Regular Business (₦{BASE_PRICE_REGULAR.toLocaleString()})</option>
//                     <option value="oil_gas">Oil & Gas (₦{BASE_PRICE_OIL_GAS.toLocaleString()})</option>
//                   </select>
//                   <span className="input-hint">Oil & Gas businesses are subject to different regulatory tariffs.</span>
//                 </FormGroup>
//               </GridRowContainer>

//               <FormGroup>
//                 <label>Company Address *</label>
//                 <input type="text" name="companyAddress" value={formData.companyAddress} onChange={handleInputChange} required placeholder="Full physical operating corporate base address" />
//               </FormGroup>

//               <FormGroup>
//                 <label>Nature of Business *</label>
//                 <textarea name="natureOfBusiness" rows="3" value={formData.natureOfBusiness} onChange={handleInputChange} required placeholder="Describe specific operating parameters of corporate activities..."></textarea>
//               </FormGroup>
//             </FormSectionBlock>
//           )}

//           {/* STEP 2: BANK DETAILS */}
//           {currentStep === 2 && (
//             <FormSectionBlock>
//               <SectionTitle>Director Bank Account Details</SectionTitle>
//               <InfoAlertBlock>Note: Please ensure the bank details provided belong to a director of the company.</InfoAlertBlock>
              
//               <FormGroup>
//                 <label>Bank Name *</label>
//                 <input type="text" name="bankName" value={formData.bankName} onChange={handleInputChange} required placeholder="e.g. Zenith Bank, GTBank" />
//               </FormGroup>

//               <GridRowContainer>
//                 <FormGroup>
//                   <label>Account Number (10 digits) *</label>
//                   <input type="text" name="accountNumber" value={formData.accountNumber} onChange={(e) => handleNumericChange(e, 10)} required placeholder="0123456789" />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Account Name *</label>
//                   <input type="text" name="accountName" value={formData.accountName} onChange={handleInputChange} required placeholder="Must match Director Profile Name" />
//                 </FormGroup>
//               </GridRowContainer>
//             </FormSectionBlock>
//           )}

//           {/* STEP 3: UPLOAD REQUIRED DOCUMENTS */}
//           {currentStep === 3 && (
//             <FormSectionBlock>
//               <SectionTitle>Upload Required Documents</SectionTitle>
//               <InfoAlertBlock>Supported Files: PDF, JPG, PNG (Max size: 5MB per file)</InfoAlertBlock>

//               <GridRowContainer>
//                 <FormGroup>
//                   <label>CAC Certificate *</label>
//                   <FileInputLabel>
//                     <input type="file" name="cacCertificate" accept=".pdf,.jpg,.png" onChange={handleFileChange} required={!formData.cacCertificate} />
//                     <span>{formData.cacCertificate ? formData.cacCertificate.name : 'Click to upload CAC Certificate'}</span>
//                   </FileInputLabel>
//                 </FormGroup>

//                 <FormGroup>
//                   <label>Status Report *</label>
//                   <FileInputLabel>
//                     <input type="file" name="statusReport" accept=".pdf,.jpg,.png" onChange={handleFileChange}  />
//                     <span>{formData.statusReport ? formData.statusReport.name : 'Click to upload Status Report'}</span>
//                   </FileInputLabel>
//                 </FormGroup>
//               </GridRowContainer>

//               <GridRowContainer>
//                 <FormGroup>
//                   <label>MEMART *</label>
//                   <FileInputLabel>
//                     <input type="file" name="memart" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
//                     <span>{formData.memart ? formData.memart.name : 'Click to upload MEMART'}</span>
//                   </FileInputLabel>
//                 </FormGroup>

//                 <FormGroup>
//                   <label>TIN Slip *</label>
//                   <FileInputLabel>
//                     <input type="file" name="tinSlip" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
//                     <span>{formData.tinSlip ? formData.tinSlip.name : 'Click to upload TIN Slip'}</span>
//                   </FileInputLabel>
//                 </FormGroup>
//               </GridRowContainer>

//               <FormGroup style={{ maxWidth: '49%' }}>
//                 <label>NIN Slip (Means of ID) *</label>
//                 <FileInputLabel>
//                   <input type="file" name="ninSlip" accept=".pdf,.jpg,.png" onChange={handleFileChange}  />
//                   <span>{formData.ninSlip ? formData.ninSlip.name : 'Click to upload NIN Slip'}</span>
//                   </FileInputLabel>
//               </FormGroup>
//             </FormSectionBlock>
//           )}

//           {/* STEP 4: REVIEW LOGISTICS STATEMENT MAP */}
//           {currentStep === 4 && (
//             <FormSectionBlock>
//               <SectionTitle>Review Application Architecture</SectionTitle>
//               <InfoAlertBlock style={{ background: '#f0fdf4', borderColor: '#bbf7d0', color: '#166534' }}>
//                 Please review all parameters carefully before authorization. Total charge: <strong>₦{currentPrice.toLocaleString()}</strong>
//               </InfoAlertBlock>

//               <ReviewTable>
//                 <tbody>
//                   <tr className="table-section"><td colSpan="2">Director & Business Profile Summary</td></tr>
//                   <tr><td>Director Name</td><td>{formData.directorName}</td></tr>
//                   <tr><td>TIN Number</td><td>{formData.tinNumber}</td></tr>
//                   <tr><td>Date of Birth</td><td>{formData.dob}</td></tr>
//                   <tr><td>NIN / BVN</td><td>{formData.nin} / {formData.bvn}</td></tr>
//                   <tr><td>Email / Phone</td><td>{formData.email} / {formData.phone}</td></tr>
//                   <tr><td>Business Classification</td><td style={{ textTransform: 'uppercase', fontWeight: 700 }}>{formData.businessCategory.replace('_', ' ')}</td></tr>
//                   <tr><td>Nature of Business</td><td>{formData.natureOfBusiness}</td></tr>
                  
//                   <tr className="table-section"><td colSpan="2">Director Financial Settlement Context</td></tr>
//                   <tr><td>Bank & Account</td><td>{formData.bankName} - {formData.accountNumber}</td></tr>
//                   <tr><td>Account Holder Mapping</td><td>{formData.accountName}</td></tr>

//                   <tr className="table-section"><td colSpan="2">Document Verification Status</td></tr>
//                   <tr><td>CAC / Status Report</td><td>✅ Loaded ({formData.cacCertificate?.name}) / ✅ Loaded ({formData.statusReport?.name})</td></tr>
//                   <tr><td>MEMART / TIN / NIN</td><td>✅ Loaded ({formData.memart?.name}) / ✅ Loaded ({formData.tinSlip?.name}) / ✅ Loaded ({formData.ninSlip?.name})</td></tr>
//                 </tbody>
//               </ReviewTable>
//             </FormSectionBlock>
//           )}

//           {/* Control Triggers Navigation Strip */}
//           <ActionNavigationLayout>
//             {currentStep > 1 && (
//               <ButtonControl type="button" variant="secondary" onClick={handlePrevStep}>
//                 ← Previous Step
//               </ButtonControl>
//             )}
//             <ButtonControl type="submit" variant="primary" style={{ marginLeft: 'auto' }}>
//               {currentStep === 4 ? `Authorize Payment & Submit` : `Proceed Next →`}
//             </ButtonControl>
//           </ActionNavigationLayout>
//         </form>
//       </MainCardWrapper>
//     </PageLayoutContainer>
//   );
// }

// // --- STRUCTURED COMPONENT VISUAL SHEMAS ---
// const PageLayoutContainer = styled.div`
//   min-height: 100vh;
//   background: #f8fafc;
//   padding: 40px 20px;
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
//   font-family: system-ui, -apple-system, sans-serif;
// `;

// const MainCardWrapper = styled.div`
//   background: #ffffff;
//   width: 100%;
//   max-width: 850px;
//   border-radius: 16px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
//   padding: 40px;
//   box-sizing: border-box;
// `;

// const BrandHeadingBlock = styled.div`
//   margin-bottom: 35px;
//   h2 { margin: 0 0 6px 0; color: #0f172a; font-size: 26px; font-weight: 800; }
//   p { margin: 0 0 16px 0; color: #64748b; font-size: 14px; }
// `;

// const PriceTagContainer = styled.div`
//   display: flex;
//   gap: 12px;
//   .badge {
//     padding: 6px 12px;
//     border-radius: 6px;
//     font-size: 12px;
//     font-weight: 700;
//     &.regular { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
//     &.oil { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
//   }
// `;

// const StepIndicatorBar = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 40px;
//   background: #f8fafc;
//   padding: 16px;
//   border-radius: 12px;
//   border: 1px solid #e2e8f0;
// `;

// const StepNode = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   opacity: ${props => props.active || props.complete ? 1 : 0.4};

//   .circle {
//     width: 28px;
//     height: 28px;
//     border-radius: 50%;
//     background: ${props => props.complete ? '#16a34a' : props.active ? '#2563eb' : '#64748b'};
//     color: #fff;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 13px;
//     font-weight: 700;
//   }

//   span {
//     font-size: 13px;
//     font-weight: 600;
//     color: #334155;
//     white-space: nowrap;
//   }
// `;

// const StepLine = styled.div`
//   flex: 1;
//   height: 2px;
//   background: ${props => props.active ? '#2563eb' : '#e2e8f0'};
//   margin: 0 16px;
// `;

// const FormSectionBlock = styled.div`
//   animation: fadeIn 0.3s ease-in-out;
//   @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
// `;

// const SectionTitle = styled.h3`
//   font-size: 16px;
//   font-weight: 700;
//   color: #1e293b;
//   margin: 0 0 20px 0;
//   padding-bottom: 8px;
//   border-bottom: 2px solid #f1f5f9;
// `;

// const InfoAlertBlock = styled.div`
//   padding: 12px 16px;
//   background: #f8fafc;
//   border-left: 4px solid #38bdf8;
//   color: #0369a1;
//   font-size: 13px;
//   font-weight: 500;
//   border-radius: 0 8px 8px 0;
//   margin-bottom: 24px;
// `;

// const GridRowContainer = styled.div`
//   display: flex;
//   gap: 20px;
//   @media (max-width: 600px) { flex-direction: column; gap: 0; }
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 20px;
//   flex: 1;
  
//   label { font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px; }
  
//   input, select, textarea {
//     padding: 12px;
//     border: 1px solid #cbd5e1;
//     border-radius: 8px;
//     font-size: 14px;
//     background: #fff;
//     outline: none;
//     font-family: inherit;
//     transition: border-color 0.15s;
//     &:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.08); }
//   }

//   .input-hint { font-size: 11px; color: #94a3b8; margin-top: 4px; }
// `;

// const FileInputLabel = styled.label`
//   border: 2px dashed #cbd5e1;
//   border-radius: 8px;
//   padding: 16px;
//   text-align: center;
//   cursor: pointer;
//   background: #f8fafc;
//   transition: background 0.15s, border-color 0.15s;
//   display: flex !important;
//   align-items: center;
//   justify-content: center;
  
//   &:hover { background: #f1f5f9; border-color: #94a3b8; }
  
//   input { display: none; }
//   span { font-size: 13px; font-weight: 500; color: #475569; overflow: hidden; text-overflow: ellipsis; }
// `;

// const ReviewTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin-bottom: 24px;

//   tr { border-bottom: 1px solid #f1f5f9; }
//   td { padding: 12px 8px; font-size: 13.5px; color: #334155; vertical-align: top; }
//   td:first-child { font-weight: 600; color: #64748b; width: 30%; }

//   .table-section {
//     background: #f8fafc;
//     border-bottom: 1px solid #e2e8f0;
//     td { font-weight: 700; color: #0f172a; padding: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
//   }
// `;

// const ActionNavigationLayout = styled.div`
//   display: flex;
//   margin-top: 35px;
//   padding-top: 20px;
//   border-top: 1px solid #e2e8f0;
// `;

// const ButtonControl = styled.button`
//   padding: 12px 24px;
//   font-size: 14px;
//   font-weight: 600;
//   border-radius: 8px;
//   cursor: pointer;
//   border: none;
//   transition: opacity 0.15s, background 0.15s;

//   background: ${props => props.variant === 'primary' ? '#2563eb' : '#e2e8f0'};
//   color: ${props => props.variant === 'primary' ? '#ffffff' : '#334155'};

//   &:hover { opacity: 0.9; }
// `;






import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Context } from './Context'; // Assuming path matches your setup

export default function ScumlRegistrationPage() {
  const { api_url, user, fetchUserProfileById } = useContext(Context);

  // Multi-step pointer state
  const [currentStep, setCurrentStep] = useState(1);

  // Integrated Form State Configuration Ledger
  const [formData, setFormData] = useState({
    // Step 1: Director & Business Info
    directorName: '',
    tinNumber: '',
    dob: '',
    nin: '',
    bvn: '',
    email: '',
    phone: '',
    companyAddress: '',
    businessCategory: 'regular', // default: regular or oil_gas
    natureOfBusiness: '',

    // Step 2: Bank Account Configurations
    bankName: '',
    accountNumber: '',
    accountName: '',

    // Step 3: Single Combined Document Pointer
    mergedPdf: null
  });

  // Calculate pricing matrices dynamically
  const BASE_PRICE_REGULAR = 50000;
  const BASE_PRICE_OIL_GAS = 65000;
  const currentPrice = formData.businessCategory === 'oil_gas' ? BASE_PRICE_OIL_GAS : BASE_PRICE_REGULAR;

  // Track text updates dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Limit numeric strings (NIN, BVN, Account Number)
  const handleNumericChange = (e, maxLength) => {
    const { name, value } = e.target;
    const cleanValue = value.replace(/\D/g, '').slice(0, maxLength);
    setFormData((prev) => ({ ...prev, [name]: cleanValue }));
  };

  // Track raw single file safely
  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   if (files && files[0]) {
  //     setFormData((prev) => ({ ...prev, [name]: files[0] }));
  //   }
  // };

  
const handleFileChange = (e) => {
  const { name, files } = e.target;
  if (files && files[0]) {
    const file = files[0];
    const maxAllowedSize = 30 * 1024 * 1024; // 25MB in bytes
    
    if (file.size > maxAllowedSize) {
      Swal.fire({
        title: 'File Too Large',
        text: 'This PDF exceeds the 25MB limit. Please compress it before uploading.',
        icon: 'error',
        confirmButtonColor: '#2563eb'
      });
      e.target.value = null; // Clear the input
      return;
    }
    
    setFormData((prev) => ({ ...prev, [name]: file }));
  }
};



  // Handle step jumping safely with minimal validations
  const handleNextStep = (e) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  // Final submission function to process SCUML registration
  const handleFinalSubmit = (e) => {
    e.preventDefault();

    // 1. Ask the user for final confirmation
    Swal.fire({
      title: 'Confirm Registration',
      text: `You are about to submit your application. A fee of ₦${currentPrice.toLocaleString()} will be deducted from your wallet balance.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Submit & Pay',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      
      // 2. If user clicks confirm, start the submission process
      if (result.isConfirmed) {
        
        // Show loading spinner while file uploads and database updates
        Swal.fire({
          title: 'Submitting Your Application...',
          text: 'Please wait while we upload your document and process your payment. Do not close this page.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // 3. Prepare the form data (including text fields and the single file upload)
        const uploadData = new FormData();
        
        // Append user identification and text fields
        uploadData.append('userId', user?.id); 
        uploadData.append('directorName', formData.directorName);
        uploadData.append('tinNumber', formData.tinNumber);
        uploadData.append('dob', formData.dob);
        uploadData.append('email', formData.email);
        uploadData.append('phone', formData.phone);
        uploadData.append('nin', formData.nin);
        uploadData.append('bvn', formData.bvn);
        uploadData.append('businessCategory', formData.businessCategory);
        uploadData.append('companyAddress', formData.companyAddress);
        uploadData.append('natureOfBusiness', formData.natureOfBusiness);
        uploadData.append('bankName', formData.bankName);
        uploadData.append('accountNumber', formData.accountNumber);
        uploadData.append('accountName', formData.accountName);

        // Append the single merged PDF file pointer
        if (formData.mergedPdf) {
          uploadData.append('scuml_document', formData.mergedPdf);
        }

        // 4. Send the data to your backend script
        fetch(`${api_url}/register_scuml.php`, {
          method: 'POST',
          body: uploadData 
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              // Success Alert
              Swal.fire({
                title: 'Submission Successful!',
                text: data.message || 'Your application has been received. You can check the progress in your service history.',
                icon: 'success',
                confirmButtonColor: '#2563eb'
              });

              // Clean up files and inputs after a successful registration
              setFormData({
                directorName: '', tinNumber: '', dob: '', nin: '', bvn: '',
                email: '', phone: '', companyAddress: '', businessCategory: 'regular',
                natureOfBusiness: '', bankName: '', accountNumber: '', accountName: '',
                mergedPdf: null
              });

              // Refresh the user's dashboard profile instantly
              if (typeof fetchUserProfileById === 'function') {
                fetchUserProfileById();
              }

              // Go back to the first step of the page
              setCurrentStep(1);

            } else {
              // Error alert returned by the server backend logic
              Swal.fire({
                title: 'Submission Failed',
                text: data.error || 'Something went wrong while processing your request. Please try again.',
                icon: 'error',
                confirmButtonColor: '#2563eb'
              });
            }
          })
          .catch(() => {
            // Network failure fallback safety alert
            Swal.fire({
              title: 'Connection Error',
              text: 'Could not connect to the server. Please check your internet connection and try again.',
              icon: 'error',
              confirmButtonColor: '#2563eb'
            });
          });
      }
    });
  };

  return (
    <PageLayoutContainer>
      <MainCardWrapper>
        {/* Header Metadata Section */}
        <BrandHeadingBlock>
          <h2>SCUML Registration</h2>
          <p>Special Control Unit against Money Laundering Secure Validation Portal</p>
          <PriceTagContainer>
            <span className="badge regular">Regular: ₦{BASE_PRICE_REGULAR.toLocaleString()}</span>
            <span className="badge oil">Oil & Gas: ₦{BASE_PRICE_OIL_GAS.toLocaleString()}</span>
          </PriceTagContainer>
        </BrandHeadingBlock>

        {/* Step-by-Step Status Indicator Track */}
        <StepIndicatorBar>
          <StepNode active={currentStep >= 1} complete={currentStep > 1}>
            <div className="circle">1</div>
            <span>Director Info</span>
          </StepNode>
          <StepLine active={currentStep > 1} />
          <StepNode active={currentStep >= 2} complete={currentStep > 2}>
            <div className="circle">2</div>
            <span>Bank Details</span>
          </StepNode>
          <StepLine active={currentStep > 2} />
          <StepNode active={currentStep >= 3} complete={currentStep > 3}>
            <div className="circle">3</div>
            <span>Documents</span>
          </StepNode>
          <StepLine active={currentStep > 3} />
          <StepNode active={currentStep === 4}>
            <div className="circle">4</div>
            <span>Review</span>
          </StepNode>
        </StepIndicatorBar>

        {/* Dynamic Multi-Step Form Context */}
        <form onSubmit={currentStep === 4 ? handleFinalSubmit : handleNextStep}>
          
          {/* STEP 1: DIRECTOR INFO */}
          {currentStep === 1 && (
            <FormSectionBlock>
              <SectionTitle>Director & Corporate Information</SectionTitle>
              <GridRowContainer>
                <FormGroup>
                  <label>Director Full Name *</label>
                  <input type="text" name="directorName" value={formData.directorName} onChange={handleInputChange} required placeholder="John Doe" />
                </FormGroup>
                <FormGroup>
                  <label>TIN Number *</label>
                  <input type="text" name="tinNumber" value={formData.tinNumber} onChange={handleInputChange} required placeholder="Corporate TIN Number" />
                </FormGroup>
              </GridRowContainer>

              <GridRowContainer>
                <FormGroup>
                  <label>Date of Birth *</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
                </FormGroup>
                <FormGroup>
                  <label>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="director@company.com" />
                </FormGroup>
              </GridRowContainer>

              <GridRowContainer>
                <FormGroup>
                  <label>NIN (11 digits) *</label>
                  <input type="text" name="nin" value={formData.nin} onChange={(e) => handleNumericChange(e, 11)} required placeholder="National Identity Number" />
                </FormGroup>
                <FormGroup>
                  <label>BVN (11 digits) *</label>
                  <input type="text" name="bvn" value={formData.bvn} onChange={(e) => handleNumericChange(e, 11)} required placeholder="Bank Verification Number" />
                </FormGroup>
              </GridRowContainer>

              <GridRowContainer>
                <FormGroup>
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="080XXXXXXXX" />
                </FormGroup>
                <FormGroup>
                  <label>Business Category *</label>
                  <select name="businessCategory" value={formData.businessCategory} onChange={handleInputChange} required>
                    <option value="regular">Regular Business (₦{BASE_PRICE_REGULAR.toLocaleString()})</option>
                    <option value="oil_gas">Oil & Gas (₦{BASE_PRICE_OIL_GAS.toLocaleString()})</option>
                  </select>
                  <span className="input-hint">Oil & Gas businesses are subject to different regulatory tariffs.</span>
                </FormGroup>
              </GridRowContainer>

              <FormGroup>
                <ThemeNoticeBlock>
                  <strong>⚠️ Important Notice for NIN & BVN:</strong> Ensure that the details provided match the official identity records of the managing director.
                </ThemeNoticeBlock>
                <label>Company Address *</label>
                <input type="text" name="companyAddress" value={formData.companyAddress} onChange={handleInputChange} required placeholder="Full physical operating corporate base address" />
              </FormGroup>

              <FormGroup>
                <label>Nature of Business *</label>
                <textarea name="natureOfBusiness" rows="3" value={formData.natureOfBusiness} onChange={handleInputChange} required placeholder="Describe specific operating parameters of corporate activities..."></textarea>
              </FormGroup>
            </FormSectionBlock>
          )}

          {/* STEP 2: BANK DETAILS */}
          {currentStep === 2 && (
            <FormSectionBlock>
              <SectionTitle>Director Bank Account Details</SectionTitle>
              <InfoAlertBlock>Note: Please ensure the bank details provided belong to a director of the company.</InfoAlertBlock>
              
              <FormGroup>
                <label>Bank Name *</label>
                <input type="text" name="bankName" value={formData.bankName} onChange={handleInputChange} required placeholder="e.g. Zenith Bank, GTBank" />
              </FormGroup>

              <GridRowContainer>
                <FormGroup>
                  <label>Account Number (10 digits) *</label>
                  <input type="text" name="accountNumber" value={formData.accountNumber} onChange={(e) => handleNumericChange(e, 10)} required placeholder="0123456789" />
                </FormGroup>
                <FormGroup>
                  <label>Account Name *</label>
                  <input type="text" name="accountName" value={formData.accountName} onChange={handleInputChange} required placeholder="Must match Director Profile Name" />
                </FormGroup>
              </GridRowContainer>
            </FormSectionBlock>
          )}

          {/* STEP 3: UPLOAD REQUIRED DOCUMENTS */}
          {currentStep === 3 && (
            <FormSectionBlock>
              <SectionTitle>Upload Registration Documents</SectionTitle>
              
              <InstructionNoticeCard>
                <h4>📋 Instructions for Document Upload:</h4>
                <p>To avoid server errors and secure your upload, please merge all required documents into <strong>ONE single PDF file</strong> before uploading.</p>
               
                <ul>
                  <li>CAC Certificate</li>
                  <li>Status Report / Particulars of Directors</li>
                  <li>MEMART (Memorandum and Articles of Association)</li>
                  <li>TIN Slip</li>
                  <li>NIN Slip (Managing Director's ID Card)</li>
                </ul>
                 <p>Maximum file size is <strong>25MB</strong>.</p>
                <p className="footer-hint">💡 Tip: You can use free websites like <em>ilovepdf.com</em> or <em>smallpdf.com</em> to merge your files together easily.</p>
              </InstructionNoticeCard>

              <FormGroup>
                <label>Combined Application PDF File *</label>
                <FileInputLabel className={formData.mergedPdf ? 'has-file' : ''}>
                  <input type="file" name="mergedPdf" accept=".pdf" onChange={handleFileChange} required={!formData.mergedPdf} />
                  <div className="upload-wrapper">
                    <span className="upload-icon">{formData.mergedPdf ? '📄' : '📁'}</span>
                    <span className="file-text">
                      {formData.mergedPdf ? formData.mergedPdf.name : 'Click here to choose or drop your combined PDF file'}
                    </span>
                    <span className="file-size-hint">
                      {formData.mergedPdf ? `${(formData.mergedPdf.size / (1024 * 1024)).toFixed(2)} MB` : 'Supported Format: PDF only (Max size: 25MB)'}
                    </span>
                  </div>
                </FileInputLabel>
              </FormGroup>
            </FormSectionBlock>
          )}

          {/* STEP 4: REVIEW DETAILS */}
          {currentStep === 4 && (
            <FormSectionBlock>
              <SectionTitle>Review Application Details</SectionTitle>
              <InfoAlertBlock style={{ background: '#f0fdf4', borderColor: '#bbf7d0', color: '#166534' }}>
                Please review all information carefully before authorization. Total charge: <strong>₦{currentPrice.toLocaleString()}</strong>
              </InfoAlertBlock>

              <ReviewTable>
                <tbody>
                  <tr className="table-section"><td colSpan="2">Director & Business Profile Summary</td></tr>
                  <tr><td>Director Name</td><td>{formData.directorName}</td></tr>
                  <tr><td>TIN Number</td><td>{formData.tinNumber}</td></tr>
                  <tr><td>Date of Birth</td><td>{formData.dob}</td></tr>
                  <tr><td>NIN / BVN</td><td>{formData.nin} / {formData.bvn}</td></tr>
                  <tr><td>Email / Phone</td><td>{formData.email} / {formData.phone}</td></tr>
                  <tr><td>Business Classification</td><td style={{ textTransform: 'uppercase', fontWeight: 700 }}>{formData.businessCategory.replace('_', ' ')}</td></tr>
                  <tr><td>Nature of Business</td><td>{formData.natureOfBusiness}</td></tr>
                  
                  <tr className="table-section"><td colSpan="2">Director Settlement Accounts</td></tr>
                  <tr><td>Bank & Account</td><td>{formData.bankName} - {formData.accountNumber}</td></tr>
                  <tr><td>Account Holder Mapping</td><td>{formData.accountName}</td></tr>

                  <tr className="table-section"><td colSpan="2">Document Verification Status</td></tr>
                  <tr><td>Merged File Package</td><td>{formData.mergedPdf ? `✅ Package Loaded (${formData.mergedPdf.name})` : '❌ Missing File'}</td></tr>
                </tbody>
              </ReviewTable>
            </FormSectionBlock>
          )}

          {/* Control Triggers Navigation Strip */}
          <ActionNavigationLayout>
            {currentStep > 1 && (
              <ButtonControl type="button" variant="secondary" onClick={handlePrevStep}>
                ← Previous Step
              </ButtonControl>
            )}
            <ButtonControl type="submit" variant="primary" style={{ marginLeft: 'auto' }}>
              {currentStep === 4 ? `Authorize Payment & Submit` : `Proceed Next →`}
            </ButtonControl>
          </ActionNavigationLayout>
        </form>
      </MainCardWrapper>
    </PageLayoutContainer>
  );
}

// --- STRUCTURED COMPONENT VISUAL SCHMAS ---
const PageLayoutContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  // padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: system-ui, -apple-system, sans-serif;
`;

const MainCardWrapper = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 850px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  padding: 10px;
  box-sizing: border-box;
`;

const BrandHeadingBlock = styled.div`
  margin-bottom: 35px;
  h2 { margin: 0 0 6px 0; color: #0f172a; font-size: 26px; font-weight: 800; }
  p { margin: 0 0 16px 0; color: #64748b; font-size: 14px; }
`;

const PriceTagContainer = styled.div`
  display: flex;
  gap: 12px;
  .badge {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 700;
    &.regular { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
    &.oil { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
  }
`;

const StepIndicatorBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  background: #f8fafc;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  flex-wrap:wrap;
  justify-content:center;
`;

const StepNode = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${props => props.active || props.complete ? 1 : 0.4};

  @media(max-width:768px){
  gap: 1px;
  flex-direction:column;
  margin-top:5px;
  }

  .circle {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: ${props => props.complete ? '#16a34a' : props.active ? '#2563eb' : '#64748b'};
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
  }

  span {
    font-size: 13px;
    font-weight: 600;
    color: #334155;
    white-space: nowrap;
  }
`;

const StepLine = styled.div`
  flex: 1;
  height: 2px;
  background: ${props => props.active ? '#2563eb' : '#e2e8f0'};
  margin: 0 16px;
`;

const FormSectionBlock = styled.div`
  animation: fadeIn 0.3s ease-in-out;
  @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 20px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #f1f5f9;
`;

const InfoAlertBlock = styled.div`
  padding: 12px 16px;
  background: #f8fafc;
  border-left: 4px solid #38bdf8;
  color: #0369a1;
  font-size: 13px;
  font-weight: 500;
  border-radius: 0 8px 8px 0;
  margin-bottom: 24px;
`;

const ThemeNoticeBlock = styled.div`
  padding: 10px 14px;
  background: #fffbeb;
  border: 1px solid #fef3c7;
  color: #b45309;
  font-size: 12.5px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const InstructionNoticeCard = styled.div`
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  
  h4 { margin: 0 0 8px 0; color: #1e293b; font-size: 14px; font-weight: 700; }
  p { margin: 0 0 12px 0; color: #475569; font-size: 13px; line-height: 1.5; }
  
  ul { margin: 0 0 14px 0; padding-left: 20px; }
  li { color: #334155; font-size: 13px; margin-bottom: 5px; font-weight: 600; }
  
  .footer-hint { margin: 0; color: #64748b; font-size: 12px; font-style: italic; }
`;

const GridRowContainer = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 600px) { flex-direction: column; gap: 0; }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  flex: 1;
  
  label { font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px; }
  
  input, select, textarea {
    padding: 12px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-size: 14px;
    background: #fff;
    outline: none;
    font-family: inherit;
    transition: border-color 0.15s;
    &:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.08); }
  }

  .input-hint { font-size: 11px; color: #94a3b8; margin-top: 4px; }
`;

const FileInputLabel = styled.label`
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  background: #f8fafc;
  transition: all 0.2s ease-in-out;
  display: flex !important;
  align-items: center;
  justify-content: center;
  
  &:hover, &.has-file { 
    background: #f1f5f9; 
    border-color: #2563eb; 
  }
  
  &.has-file {
    background: #f0fdf4;
    border-color: #16a34a;
    border-style: solid;
  }
  
  input { display: none; }
  
  .upload-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .upload-icon {
    font-size: 32px;
    margin-bottom: 4px;
  }

  .file-text { 
    font-size: 14px; 
    font-weight: 600; 
    color: #1e293b; 
    max-width: 400px;
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap;
  }

  .file-size-hint {
    font-size: 12px;
    color: #64748b;
  }
`;

const ReviewTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;

  tr { border-bottom: 1px solid #f1f5f9; }
  td { padding: 12px 8px; font-size: 13.5px; color: #334155; vertical-align: top; }
  td:first-child { font-weight: 600; color: #64748b; width: 30%; }

  .table-section {
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    td { font-weight: 700; color: #0f172a; padding: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
  }
`;

const ActionNavigationLayout = styled.div`
  display: flex;
  margin-top: 35px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
`;

const ButtonControl = styled.button`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: opacity 0.15s, background 0.15s;

  background: ${props => props.variant === 'primary' ? '#2563eb' : '#e2e8f0'};
  color: ${props => props.variant === 'primary' ? '#ffffff' : '#334155'};

  &:hover { opacity: 0.9; }
`;