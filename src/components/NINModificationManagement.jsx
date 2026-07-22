// import React, { useContext, useState } from 'react';
// import styled from 'styled-components';
// import { 
//   FaUserGear, FaCircleInfo, FaCircleCheck, FaWallet, 
//   FaFingerprint, FaClock, FaReceipt, FaFileSignature 
// } from 'react-icons/fa6';
// import Swal from 'sweetalert2';
// import { Context } from './Context';

// const NINModificationManagement = () => {
//   const { api_url, user, fetchUserProfileById } = useContext(Context);

//   // Core Service Options Configurations
//   const [selectedService, setSelectedService] = useState('nin_name_modification');
//   const [confirmedConsent, setConfirmedConsent] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [receiptData, setReceiptData] = useState(null);

//   // Form Field Matrix Structures
//   const [fields, setFields] = useState({
//     nin: '', nin_digits: '', surname: '', firstname: '', middlename: '',
//     phone_number: '', new_surname: '', new_firstname: '', new_middlename: '',
//     new_phone_number: '', new_address: '', date_of_birth: ''
//   });

//   const baseRates = {
//     nin_name_modification: 16000,
//     nin_phone_modification: 16000,
//     nin_address_modification: 16000,
//     nin_validation: 6000
//   };

//   const currentFee = baseRates[selectedService] || 0;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFields(prev => ({ ...prev, [name]: value }));
//   };

//   const executeOrderSubmission = (e) => {
//     e.preventDefault();

//     if (!confirmedConsent) {
//       Swal.fire({ icon: 'warning', title: 'Consent Verification', text: 'You must check the confirmation toggle box declaration statement.', confirmButtonColor: '#2563eb' });
//       return;
//     }

//     if (!user || user.balance < currentFee) {
//       Swal.fire({ icon: 'error', title: 'Insufficient Ledger Balance', text: 'Please add money to your account to request this service.', confirmButtonColor: '#dc2626' });
//       return;
//     }

//     Swal.fire({
//       title: 'Confirm Processing Payment',
//       text: `Authorize immediate deduction of ₦${currentFee.toLocaleString()} for this request? Proceeding pushes order straight to validation queues.`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#2563eb',
//       cancelButtonColor: '#64748b',
//       confirmButtonText: 'Yes, Submit Order'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         setLoading(true);
//         setReceiptData(null);

//         // Package dynamic criteria map directly
//         const payload = {
//           userId: user.id,
//           service_type: selectedService,
//           consent: confirmedConsent
//         };

//         if (selectedService === 'nin_validation') {
//           payload.nin_digits = fields.nin_digits;
//           payload.date_of_birth = fields.date_of_birth;
//         } else {
//           payload.nin = fields.nin;
//           payload.surname = fields.surname;
//           payload.firstname = fields.firstname;
//           payload.middlename = fields.middlename;

//           if (selectedService === 'nin_name_modification') {
//             payload.phone_number = fields.phone_number;
//             payload.new_surname = fields.new_surname;
//             payload.new_firstname = fields.new_firstname;
//             payload.new_middlename = fields.new_middlename;
//           } else if (selectedService === 'nin_phone_modification') {
//             payload.new_phone_number = fields.new_phone_number;
//           } else if (selectedService === 'nin_address_modification') {
//             payload.phone_number = fields.phone_number;
//             payload.new_address = fields.new_address;
//           }
//         }

//         try {
//           const response = await fetch(`${api_url}/submit_nin_modification.php`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload)
//           });

//           const data = await response.json();

//           if (response.ok && data.success) {
//             setReceiptData(data.data);
//             Swal.fire({ icon: 'success', title: 'Submission Logged', text: 'Your request has been saved and is pending verification review.', confirmButtonColor: '#2563eb' });
            
//             fetchUserProfileById(); // Sync app balance state
//             setConfirmedConsent(false);
//           } else {
//             Swal.fire({ icon: 'error', title: 'Submission Rejected', text: data.error || 'Server rejected order arguments profile context parameters.', confirmButtonColor: '#dc2626' });
//           }
//         } catch (error) {
//           Swal.fire({ icon: 'error', title: 'Network Disruption', text: 'Could not connect securely to server portals. Try again.', confirmButtonColor: '#dc2626' });
//         } finally {
//           setLoading(false);
//         }
//       }
//     });
//   };

//   return (
//     <ViewShellFrame>
//       <HeaderLabelBoundary>
//         <IconBoxWrapper><FaUserGear size={14} /></IconBoxWrapper>
//         <div>
//           <ViewMainTitle>NIN Modification & Validation Node</ViewMainTitle>
//           <ViewSubTitle>Submit identity adjustments. Verification and status synchronization process changes resolve in 24–48 hours.</ViewSubTitle>
//         </div>
//       </HeaderLabelBoundary>

//       <WarningAdmonitionCallout>
//         <FaCircleInfo size={14} style={{marginTop: '2px', flexShrink: '0'}} />
//         <p><strong>Crucial Rule Checklist:</strong> By logging this request frame, you verify this change process has <strong>NOT</strong> been queued or initialized on any alternative mobile software apps or devices. Double requests trigger absolute automated portal rejections without refund windows.</p>
//       </WarningAdmonitionCallout>

//       <SplitLowerLayoutGrid>
//         <ProcessingCoreCard onSubmit={executeOrderSubmission}>
          
//           {/* STEP 1: SERVICE TYPE SELECTOR SECTION */}
//           <InputGroupBlock>
//             <StepIndicatorRow>
//               <StepIndexBadge>01</StepIndexBadge>
//               <FieldInputLabel>Choose Service Pipeline</FieldInputLabel>
//             </StepIndicatorRow>
            
//             <ServiceSelectionGridGroup>
//             {[
//   { id: 'nin_name_modification', label: 'NIN Name Modification', desc: 'Update registered Surnames, First names, or Middle strings.', rate: 16000 },
//   { id: 'nin_phone_modification', label: 'NIN Phone Modification', desc: 'Update primary telephony routing parameters.', rate: 16000 },
//   { id: 'nin_address_modification', label: 'NIN Address Modification', desc: 'Modify official residential localization context lines.', rate: 16000 },
//   { id: 'nin_validation', label: 'NIN Digit Validation', desc: 'Re-validate operational structural numbers and date mappings.', rate: 6000 }
// ].map(opt => (
//   <ServiceCardOptionItem 
//     key={opt.id} 
//     type="button"
//     active={selectedService === opt.id}
//     onClick={() => { setSelectedService(opt.id); setReceiptData(null); }}
//   >
//     <div className="radio-dot" />
//     <div className="meta-info">
//       <h4>{opt.label}</h4>
//       <p>{opt.desc}</p>
//       {/* Fixed: Standard locale parameter config option structure */}
//       <span>Cost: ₦{opt.rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
//     </div>
//   </ServiceCardOptionItem>
// ))}
//             </ServiceSelectionGridGroup>
//           </InputGroupBlock>

//           {/* STEP 2: VARIABLE PARAMETERS MATRIX FIELDS SECTION */}
//           <InputGroupBlock>
//             <StepIndicatorRow>
//               <StepIndexBadge>02</StepIndexBadge>
//               <FieldInputLabel>Provide Registration Information</FieldInputLabel>
//             </StepIndicatorRow>

//             <DynamicInputsWrapperBox>
//               {selectedService === 'nin_validation' ? (
//                 <FieldInputsGridTwinLayout>
//                   <div>
//                     <MicroFieldInlineLabel>11-Digit NIN Number</MicroFieldInlineLabel>
//                     <FieldInputNode type="text" maxLength={11} name="nin_digits" placeholder="e.g. 12345678901" value={fields.nin_digits} onChange={handleInputChange} required />
//                   </div>
//                   <div>
//                     <MicroFieldInlineLabel>Date of Birth</MicroFieldInlineLabel>
//                     <FieldInputNode type="date" name="date_of_birth" value={fields.date_of_birth} onChange={handleInputChange} required />
//                   </div>
//                 </FieldInputsGridTwinLayout>
//               ) : (
//                 <>
//                   <FieldInputsGridTwinLayout>
//                     <div>
//                       <MicroFieldInlineLabel>Current 11-Digit NIN</MicroFieldInlineLabel>
//                       <FieldInputNode type="text" maxLength={11} name="nin" placeholder="Enter current NIN" value={fields.nin} onChange={handleInputChange} required />
//                     </div>
//                     <div>
//                       <MicroFieldInlineLabel>Current Surname</MicroFieldInlineLabel>
//                       <FieldInputNode type="text" name="surname" placeholder="Current Surname" value={fields.surname} onChange={handleInputChange} required />
//                     </div>
//                     <div>
//                       <MicroFieldInlineLabel>Current First Name</MicroFieldInlineLabel>
//                       <FieldInputNode type="text" name="firstname" placeholder="Current First Name" value={fields.firstname} onChange={handleInputChange} required />
//                     </div>
//                     <div>
//                       <MicroFieldInlineLabel>Current Middle Name</MicroFieldInlineLabel>
//                       <FieldInputNode type="text" name="middlename" placeholder="Optional Middle Name" value={fields.middlename} onChange={handleInputChange} />
//                     </div>
//                   </FieldInputsGridTwinLayout>

//                   <HorizontalSectionSplitterLine />

//                   {/* SUB-BRANCH DEPENDENCY UI LOGIC SCENARIOS */}
//                   {selectedService === 'nin_name_modification' && (
//                     <FieldInputsGridTwinLayout style={{background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
//                       <div style={{gridColumn: '1 / -1'}}><h5 style={{margin: '0', fontSize: '11px', fontWeight: '800', color: '#2563eb'}}>NEW REPLACEMENT NAME ATTRIBUTES</h5></div>
//                       <div>
//                         <MicroFieldInlineLabel>Registered Telephone</MicroFieldInlineLabel>
//                         <FieldInputNode type="text" name="phone_number" placeholder="Current Phone" value={fields.phone_number} onChange={handleInputChange} required />
//                       </div>
//                       <div>
//                         <MicroFieldInlineLabel>New Target Surname</MicroFieldInlineLabel>
//                         <FieldInputNode type="text" name="new_surname" placeholder="New Surname" value={fields.new_surname} onChange={handleInputChange} required />
//                       </div>
//                       <div>
//                         <MicroFieldInlineLabel>New Target First Name</MicroFieldInlineLabel>
//                         <FieldInputNode type="text" name="new_firstname" placeholder="New First Name" value={fields.new_firstname} onChange={handleInputChange} required />
//                       </div>
//                       <div>
//                         <MicroFieldInlineLabel>New Target Middle Name</MicroFieldInlineLabel>
//                         <FieldInputNode type="text" name="new_middlename" placeholder="New Middle Name" value={fields.new_middlename} onChange={handleInputChange} />
//                       </div>
//                     </FieldInputsGridTwinLayout>
//                   )}

//                   {selectedService === 'nin_phone_modification' && (
//                     <div style={{background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
//                       <MicroFieldInlineLabel>New Mobile Phone Number Configuration</MicroFieldInlineLabel>
//                       <FieldInputNode type="text" maxLength={11} name="new_phone_number" placeholder="Enter new mobile number" value={fields.new_phone_number} onChange={handleInputChange} required />
//                     </div>
//                   )}

//                   {selectedService === 'nin_address_modification' && (
//                     <FieldInputsGridTwinLayout style={{background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
//                       <div>
//                         <MicroFieldInlineLabel>Registered Telephone</MicroFieldInlineLabel>
//                         <FieldInputNode type="text" name="phone_number" placeholder="Current phone link" value={fields.phone_number} onChange={handleInputChange} required />
//                       </div>
//                       <div style={{gridColumn: '1 / -1'}}>
//                         <MicroFieldInlineLabel>Complete New Physical Residential Address String</MicroFieldInlineLabel>
//                         <FieldInputNode type="text" name="new_address" placeholder="e.g. 15 Allen Avenue, Ikeja, Lagos" value={fields.new_address} onChange={handleInputChange} required />
//                       </div>
//                     </FieldInputsGridTwinLayout>
//                   )}
//                 </>
//               )}
//             </DynamicInputsWrapperBox>
//           </InputGroupBlock>

//           {/* STEP 3: REGULATORY DECLARATION CONSENT ACCORDION */}
//           <InputGroupBlock>
//             <StepIndicatorRow>
//               <StepIndexBadge>03</StepIndexBadge>
//               <FieldInputLabel>Legality Acknowledgement</FieldInputLabel>
//               {confirmedConsent && <CheckVerifiedTag variant="success"><FaCircleCheck size={10} /> <span>Verified</span></CheckVerifiedTag>}
//             </StepIndicatorRow>
//             <CheckboxSelectionNode>
//               <input 
//                 type="checkbox" 
//                 id="regulatoryProcessingAccordConsent" 
//                 checked={confirmedConsent}
//                 onChange={(e) => setConfirmedConsent(e.target.checked)}
//               />
//               <label htmlFor="regulatoryProcessingAccordConsent">
//                 I clarify all parameters provided are accurate. I authorize immediate subtraction of ₦{currentFee.toLocaleString()} from my operational ledger assets. I explicitly reaffirm this verification operation has not been loaded into separate platforms.
//               </label>
//             </CheckboxSelectionNode>
//           </InputGroupBlock>

//           <ExecutionTriggerBtn type="submit" disabled={loading}>
//             {loading ? "Processing order pipeline parameters..." : `Submit Modification Order (₦${currentFee.toLocaleString()})`}
//           </ExecutionTriggerBtn>

//           <SecurityAttributeRowUnderButton>
//             <div><FaFingerprint size={10} /> <span>Secured Processing</span></div>
//             <div><FaClock size={10} /> <span>24-48 Hours Sync</span></div>
//             <div><FaFileSignature size={10} /> <span>Audited Action</span></div>
//           </SecurityAttributeRowUnderButton>

//         </ProcessingCoreCard>

//         <RightContextMetaTilePanel>
//           <WalletSummaryWidgetCard>
//             <div className="label-cluster">
//               <FaWallet size={12} />
//               <span>Balance Available</span>
//             </div>
//             <h3>₦{user?.balance?.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
//           </WalletSummaryWidgetCard>

//           {receiptData ? (
//             <ProfileIDCertificateDisplayCard>
//               <CertificateHeaderRow>
//                 <FaReceipt size={14} />
//                 <span>ORDER PROCESSING STATUS SLIP</span>
//               </CertificateHeaderRow>
              
//               <SuccessBadgeLabelBannerRow>
//                 <FaCircleCheck size={18} />
//                 <div>
//                   <h4>SUBMITTED SUCCESSFULLY</h4>
//                   <p>Reference: {receiptData.reference_id || receiptData.reportID}</p>
//                 </div>
//               </SuccessBadgeLabelBannerRow>

//               <HorizontalDashedRuleLine />

//               <ExtendedTextMetadataGridRowDetails>
//                 <div><label>ORDER ID</label><p>#{receiptData.order_id || 'N/A'}</p></div>
//                 <div><label>SERVICE MODEL</label><p style={{fontSize: '11px'}}>{receiptData.service_name || 'NIL Modification'}</p></div>
//                 <div><label>AMOUNT FINALIZED</label><p>₦{parseFloat(receiptData.amount_charged || currentFee).toLocaleString()}</p></div>
//                 <div><label>QUEUE STATUS</label><p style={{color: '#d97706', textTransform: 'uppercase'}}>{receiptData.status || 'pending'}</p></div>
//               </ExtendedTextMetadataGridRowDetails>

//               <AddressMetadataBoxWrapperBlock>
//                 <label>SYSTEM PROCESSING ADVISORY REMARK</label>
//                 <p>{receiptData.note || 'Your order modifications arguments have entered the verification pipeline context cleanly. Use tracking parameters to review lifecycle transitions.'}</p>
//               </AddressMetadataBoxWrapperBlock>
//             </ProfileIDCertificateDisplayCard>
//           ) : (
//             <EmptyStateNoticeFramePlaceholder>
//               <FaUserGear size={24} />
//               <h4>Receipt Area</h4>
//               <p>Your processing transaction slip summary elements render instantly inside this container viewport upon submission execution confirmation.</p>
//             </EmptyStateNoticeFramePlaceholder>
//           )}
//         </RightContextMetaTilePanel>
//       </SplitLowerLayoutGrid>
//     </ViewShellFrame>
//   );
// };

// export default NINModificationManagement;

// /* --- HIGH DENSITY SCANNABILITY UI RULES ENGINE CSS MODULE --- */
// const ViewShellFrame = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   width: 100%;
//   box-sizing: border-box;
// `;

// const HeaderLabelBoundary = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   background: #f8fafc;
//   border: 1px solid #e2e8f0;
//   border-radius: 8px;
//   padding: 10px;
// `;

// const IconBoxWrapper = styled.div`
//   width: 32px;
//   height: 32px;
//   background: #eef2f6;
//   border: 1px solid #cbd5e1;
//   color: #0f172a;
//   border-radius: 6px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const ViewMainTitle = styled.h2`
//   font-size: 15px;
//   font-weight: 800;
//   color: #0f172a;
//   margin: 0;
// `;

// const ViewSubTitle = styled.p`
//   font-size: 11px;
//   color: #64748b;
//   margin: 0;
// `;

// const WarningAdmonitionCallout = styled.div`
//   background: #fffbeb;
//   border: 1px solid #fde68a;
//   color: #b45309;
//   border-radius: 8px;
//   padding: 10px;
//   display: flex;
//   gap: 8px;
//   align-items: flex-start;
//   p { margin: 0; font-size: 11px; line-height: 1.4; }
// `;

// const SplitLowerLayoutGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1.4fr 1.1fr;
//   gap: 10px;
//   @media (max-width: 850px) { grid-template-columns: 1fr; }
// `;

// const ProcessingCoreCard = styled.form`
//   background: #ffffff;
//   border: 1px solid #e2e8f0;
//   border-radius: 10px;
//   padding: 10px;
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
// `;

// const InputGroupBlock = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 6px;
// `;

// const StepIndicatorRow = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   margin-bottom: 2px;
// `;

// const StepIndexBadge = styled.div`
//   background: #0f172a;
//   color: #ffffff;
//   font-size: 10px;
//   font-weight: 800;
//   width: 18px;
//   height: 18px;
//   border-radius: 4px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const FieldInputLabel = styled.label`
//   font-size: 12px;
//   font-weight: 700;
//   color: #1e293b;
// `;

// const CheckVerifiedTag = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 4px;
//   background: #dcfce7;
//   border: 1px solid #bbf7d0;
//   color: #166534;
//   font-size: 9px;
//   font-weight: 700;
//   padding: 2px 6px;
//   border-radius: 4px;
//   text-transform: uppercase;
// `;

// const ServiceSelectionGridGroup = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 8px;
//   @media (max-width: 550px) { grid-template-columns: 1fr; }
// `;

// const ServiceCardOptionItem = styled.button`
//   text-align: left;
//   background: ${props => props.active ? '#eff6ff' : '#f8fafc'};
//   border: 1px solid ${props => props.active ? '#2563eb' : '#e2e8f0'};
//   padding: 10px;
//   border-radius: 8px;
//   display: flex;
//   gap: 10px;
//   cursor: pointer;
//   transition: all 0.15s ease;
  
//   &:hover { border-color: #cbd5e1; }

//   .radio-dot {
//     width: 12px;
//     height: 12px;
//     border-radius: 50%;
//     border: 2px solid ${props => props.active ? '#2563eb' : '#94a3b8'};
//     background: ${props => props.active ? '#2563eb' : 'transparent'};
//     margin-top: 2px;
//     flex-shrink: 0;
//     box-shadow: inset 0 0 0 2px #ffffff;
//   }

//   .meta-info {
//     h4 { margin: 0; font-size: 12px; font-weight: 800; color: #0f172a; }
//     p { margin: 3px 0; font-size: 11px; line-height: 1.3; color: #64748b; }
//     span { display: block; font-size: 11px; font-weight: 700; color: #2563eb; }
//   }
// `;

// const DynamicInputsWrapperBox = styled.div`
//   background: #ffffff;
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// const FieldInputsGridTwinLayout = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 8px;
//   @media (max-width: 480px) { grid-template-columns: 1fr; }
// `;

// const MicroFieldInlineLabel = styled.span`
//   display: block;
//   font-size: 10px;
//   font-weight: 600;
//   color: #64748b;
//   margin-bottom: 3px;
// `;

// const FieldInputNode = styled.input`
//   width: 100%;
//   padding: 9px;
//   font-size: 13px;
//   border: 1px solid #cbd5e1;
//   border-radius: 6px;
//   outline: none;
//   box-sizing: border-box;
//   background: #f8fafc;
//   &:focus { border-color: #2563eb; background: #ffffff; }
// `;

// const HorizontalSectionSplitterLine = styled.div`
//   border-top: 1px dashed #f1f5f9;
//   margin: 2px 0;
// `;

// const CheckboxSelectionNode = styled.div`
//   display: flex;
//   align-items: flex-start;
//   gap: 8px;
//   padding: 10px;
//   background: #f8fafc;
//   border: 1px solid #e2e8f0;
//   border-radius: 6px;
//   input { margin-top: 2px; cursor: pointer; }
//   label { font-size: 11px; line-height: 1.4; color: #334155; font-weight: 500; cursor: pointer; }
// `;

// const ExecutionTriggerBtn = styled.button`
//   width: 100%;
//   background: #2563eb;
//   color: #ffffff;
//   border: none;
//   border-radius: 6px;
//   padding: 11px;
//   font-size: 13px;
//   font-weight: 700;
//   cursor: pointer;
//   margin-top: 4px;
//   &:hover { background: #1d4ed8; }
//   &:disabled { background: #94a3b8; cursor: not-allowed; }
// `;

// const SecurityAttributeRowUnderButton = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 10px;
//   border-top: 1px solid #e2e8f0;
//   padding-top: 10px;
//   div {
//     display: flex;
//     align-items: center;
//     gap: 4px;
//     font-size: 10px;
//     font-weight: 600;
//     color: #94a3b8;
//     text-transform: uppercase;
//   }
// `;

// const RightContextMetaTilePanel = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const WalletSummaryWidgetCard = styled.div`
//   background: #ffffff;
//   border: 1px solid #e2e8f0;
//   border-radius: 10px;
//   padding: 10px;
//   .label-cluster {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     font-size: 10px;
//     color: #64748b;
//     font-weight: 600;
//   }
//   h3 { font-size: 18px; font-weight: 800; color: #0f172a; margin: 4px 0 0 0; }
// `;

// const EmptyStateNoticeFramePlaceholder = styled.div`
//   background: #f8fafc;
//   border: 1px dashed #cbd5e1;
//   border-radius: 10px;
//   padding: 20px 10px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   flex: 1;
//   svg { color: #94a3b8; margin-bottom: 6px; }
//   h4 { font-size: 12px; font-weight: 700; color: #475569; margin: 0; text-transform: uppercase; }
//   p { font-size: 11px; line-height: 1.4; color: #64748b; margin: 4px 0 0 0; max-width: 250px; }
// `;

// const ProfileIDCertificateDisplayCard = styled.div`
//   background: #ffffff;
//   border: 1px solid #e2e8f0;
//   border-radius: 10px;
//   padding: 10px;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const CertificateHeaderRow = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   border-bottom: 1px solid #f1f5f9;
//   padding-bottom: 8px;
//   font-size: 10px;
//   font-weight: 700;
//   color: #475569;
//   svg { color: #2563eb; }
// `;

// const SuccessBadgeLabelBannerRow = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   background: #ecfdf5;
//   border: 1px solid #a7f3d0;
//   padding: 8px;
//   border-radius: 6px;
//   svg { color: #059669; }
//   h4 { margin: 0; font-size: 11px; font-weight: 800; color: #065f46; }
//   p { margin: 0; font-size: 11px; font-weight: 600; color: #047857; }
// `;

// const HorizontalDashedRuleLine = styled.div`
//   border-top: 1px dashed #e2e8f0;
//   width: 100%;
// `;

// const ExtendedTextMetadataGridRowDetails = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 10px;
//   label { font-size: 9px; font-weight: 600; color: #94a3b8; display: block; }
//   p { font-size: 12px; font-weight: 700; color: #1e293b; margin: 0; }
// `;

// const AddressMetadataBoxWrapperBlock = styled.div`
//   background: #f8fafc;
//   border: 1px solid #e2e8f0;
//   border-radius: 6px;
//   padding: 8px;
//   label { font-size: 9px; font-weight: 600; color: #94a3b8; display: block; margin-bottom: 2px; }
//   p { font-size: 11px; line-height: 1.4; color: #334155; font-weight: 600; margin: 0; }
// `;








import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { 
  FaUserGear, FaCircleInfo, FaCircleCheck, FaWallet, 
  FaFingerprint, FaClock, FaReceipt, FaFileSignature, FaXmark 
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Context } from './Context';

const NINModificationManagement = () => {
  const { api_url, user, fetchUserProfileById } = useContext(Context);

  console.log(user?.balance)

  // Modal Control States
  const [activeModal, setActiveModal] = useState(null); // 'nin_name_modification' | 'nin_phone_modification' | 'nin_address_modification' | 'nin_validation' | null
  const [confirmedConsent, setConfirmedConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Form Fields Collection Struct
  const [fields, setFields] = useState({
    nin: '', nin_digits: '', surname: '', firstname: '', middlename: '',
    phone_number: '', new_surname: '', new_firstname: '', new_middlename: '',
    new_phone_number: '', new_address: '', date_of_birth: ''
  });

  const baseRates = {
    nin_name_modification: 16000,
    nin_phone_modification: 16000,
    nin_address_modification: 16000,
    nin_validation: 6000
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  };

  const closeModalPipeline = () => {
    setActiveModal(null);
    setConfirmedConsent(false);
  };

  const executeOrderSubmission = (e) => {
    e.preventDefault();
    const currentFee = baseRates[activeModal];

    if (!confirmedConsent) {
      Swal.fire({ icon: 'warning', title: 'Consent Verification', text: 'You must check the confirmation toggle box declaration statement.', confirmButtonColor: '#2563eb' });
      return;
    }

    // if (!user || user.balance < currentFee) {
    //   Swal.fire({ icon: 'error', title: 'Insufficient Ledger Balance', text: 'Please add money to your account to request this service.', confirmButtonColor: '#dc2626' });
    //   return;
    // }

    Swal.fire({
      title: 'Confirm Processing Payment',
      text: `Authorize immediate deduction of ₦${currentFee.toLocaleString()} for this request? Proceeding pushes order straight to validation queues.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Submit Order'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setReceiptData(null);

        // Package dynamic criteria parameters
        const payload = {
          userId: user.id,
          service_type: activeModal,
          consent: confirmedConsent
        };

        if (activeModal === 'nin_validation') {
          payload.nin_digits = fields.nin_digits;
          payload.date_of_birth = fields.date_of_birth;
        } else {
          payload.nin = fields.nin;
          payload.surname = fields.surname;
          payload.firstname = fields.firstname;
          payload.middlename = fields.middlename;

          if (activeModal === 'nin_name_modification') {
            payload.phone_number = fields.phone_number;
            payload.new_surname = fields.new_surname;
            payload.new_firstname = fields.new_firstname;
            payload.new_middlename = fields.new_middlename;
          } else if (activeModal === 'nin_phone_modification') {
            payload.new_phone_number = fields.new_phone_number;
          } else if (activeModal === 'nin_address_modification') {
            payload.phone_number = fields.phone_number;
            payload.new_address = fields.new_address;
          }
        }

        try {
          const response = await fetch(`${api_url}/submit_nin_modification.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          const data = await response.json();

          if (response.ok && data.success) {
            setReceiptData(data.data);
            Swal.fire({ icon: 'success', title: 'Submission Logged', text: 'Your request has been saved and is pending verification review.', confirmButtonColor: '#2563eb' });
            
            fetchUserProfileById(); // Sync app balance state
            closeModalPipeline();   // Shut down the dynamic interactive wrapper
          } else {
            Swal.fire({ icon: 'error', title: 'Submission Rejected', text: data.error || 'Server rejected order arguments profile context parameters.', confirmButtonColor: '#dc2626' });
          }
        } catch (error) {
          Swal.fire({ icon: 'error', title: 'Network Disruption', text: 'Could not connect securely to server portals. Try again.', confirmButtonColor: '#dc2626' });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const serviceOptions = [
    { id: 'nin_name_modification', label: 'NIN Name Modification', desc: 'Update registered Surnames, First names, or Middle strings.', rate: 17000 },
    { id: 'nin_phone_modification', label: 'NIN Phone Modification', desc: 'Update primary telephony routing parameters.', rate: 17000 },
    { id: 'nin_address_modification', label: 'NIN Address Modification', desc: 'Modify official residential localization context lines.', rate: 17000 },
    { id: 'nin_validation', label: 'NIN Digit Validation', desc: 'Re-validate operational structural numbers and date mappings.', rate: 7500 }
  ];

  return (
    <ViewShellFrame>
      <HeaderLabelBoundary>
        <IconBoxWrapper><FaUserGear size={14} /></IconBoxWrapper>
        <div>
          <ViewMainTitle>NIN Modification & Validation Portal</ViewMainTitle>
          <ViewSubTitle>Select a package configuration layer below to launch its customized parameters submission form.</ViewSubTitle>
        </div>
      </HeaderLabelBoundary>

      <WarningAdmonitionCallout>
        <FaCircleInfo size={14} style={{marginTop: '2px', flexShrink: '0'}} />
        <p><strong>Crucial Rule Checklist:</strong> Double entries across applications trigger absolute portal rejections without refund windows. Ensure this process has not been queued anywhere else.</p>
      </WarningAdmonitionCallout>

      <SplitLowerLayoutGrid>
        {/* INTERACTIVE SERVICES HUB CATALOG GRID */}
        <div>
          <SectionGridSubtitleLabel>Available Modification Directories</SectionGridSubtitleLabel>
          <ServiceSelectionGridGroup>
            {serviceOptions.map(opt => (
              <ServiceCardOptionItem 
                key={opt.id} 
                type="button"
                onClick={() => { setActiveModal(opt.id); }}
              >
                <div className="meta-info">
                  <h4>{opt.label}</h4>
                  <p>{opt.desc}</p>
                  <span>Launch Order Form • ₦{opt.rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </ServiceCardOptionItem>
            ))}
          </ServiceSelectionGridGroup>
        </div>

        {/* RIGHT PANEL: BALANCES & REAL-TIME INTERACTIVE SLIPS */}
        <RightContextMetaTilePanel>
          <WalletSummaryWidgetCard>
            <div className="label-cluster">
              <FaWallet size={12} />
              <span>Balance Available</span>
            </div>
            <h3>₦{user?.balance?.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
          </WalletSummaryWidgetCard>

          {receiptData ? (
            <ProfileIDCertificateDisplayCard>
              <CertificateHeaderRow>
                <FaReceipt size={14} />
                <span>ORDER PROCESSING STATUS SLIP</span>
              </CertificateHeaderRow>
              
              <SuccessBadgeLabelBannerRow>
                <FaCircleCheck size={18} />
                <div>
                  <h4>SUBMITTED SUCCESSFULLY</h4>
                  <p>Reference: {receiptData.reference_id || receiptData.reportID}</p>
                </div>
              </SuccessBadgeLabelBannerRow>

              <HorizontalDashedRuleLine />

              <ExtendedTextMetadataGridRowDetails>
                <div><label>ORDER ID</label><p>#{receiptData.order_id || 'N/A'}</p></div>
                <div><label>SERVICE MODEL</label><p style={{fontSize: '11px'}}>{receiptData.service_name || 'NIL Modification'}</p></div>
                <div><label>AMOUNT CHARGED</label><p>₦{parseFloat(receiptData.amount_charged || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}</p></div>
                <div><label>QUEUE STATUS</label><p style={{color: '#d97706', textTransform: 'uppercase'}}>{receiptData.status || 'pending'}</p></div>
              </ExtendedTextMetadataGridRowDetails>

              <AddressMetadataBoxWrapperBlock>
                <label>SYSTEM PROCESSING ADVISORY REMARK</label>
                <p>{receiptData.note || 'Your order modifications arguments have entered the verification pipeline context cleanly.'}</p>
              </AddressMetadataBoxWrapperBlock>
            </ProfileIDCertificateDisplayCard>
          ) : (
            <EmptyStateNoticeFramePlaceholder>
              <FaUserGear size={24} />
              <h4>Receipt Preview Area</h4>
              <p>Your processing transaction slip summary elements render instantly inside this container viewport upon submission execution confirmation.</p>
            </EmptyStateNoticeFramePlaceholder>
          )}
        </RightContextMetaTilePanel>
      </SplitLowerLayoutGrid>

      {/* --- DYNAMIC ABSOLUTE POP-OUT MODAL OVERLAY PORTAL --- */}
      {activeModal && (
        <ModalFixedDimmerOverlay onClick={closeModalPipeline}>
          <ModalContentWindowPane onClick={(e) => e.stopPropagation()} onSubmit={executeOrderSubmission}>
            
            <ModalWindowHeaderContainer>
              <div>
                <h3>{serviceOptions.find(o => o.id === activeModal)?.label}</h3>
                <p>Order Fee: ₦{baseRates[activeModal]?.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
              </div>
              <ModalDismissWindowCrossButton type="button" onClick={closeModalPipeline}>
                <FaXmark size={14} />
              </ModalDismissWindowCrossButton>
            </ModalWindowHeaderContainer>

            <ModalFormInputScrollContainerBody>
              
              {/* STEP indicators within the Modal structure */}
              <StepHeaderMarkerBlock>
                <StepIndexBadge>01</StepIndexBadge>
                <span className="title">Complete Input Parameter Grid</span>
              </StepHeaderMarkerBlock>

              <DynamicInputsWrapperBox>
                {activeModal === 'nin_validation' ? (
                  <FieldInputsGridTwinLayout>
                    <div>
                      <MicroFieldInlineLabel>11-Digit NIN Number</MicroFieldInlineLabel>
                      <FieldInputNode type="text" maxLength={11} name="nin_digits" placeholder="e.g. 12345678901" value={fields.nin_digits} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <MicroFieldInlineLabel>Date of Birth</MicroFieldInlineLabel>
                      <FieldInputNode type="date" name="date_of_birth" value={fields.date_of_birth} onChange={handleInputChange} required />
                    </div>
                  </FieldInputsGridTwinLayout>
                ) : (
                  <>
                    <FieldInputsGridTwinLayout>
                      <div>
                        <MicroFieldInlineLabel>Current 11-Digit NIN</MicroFieldInlineLabel>
                        <FieldInputNode type="text" maxLength={11} name="nin" placeholder="Enter current NIN" value={fields.nin} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <MicroFieldInlineLabel>Current Surname</MicroFieldInlineLabel>
                        <FieldInputNode type="text" name="surname" placeholder="Current Surname" value={fields.surname} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <MicroFieldInlineLabel>Current First Name</MicroFieldInlineLabel>
                        <FieldInputNode type="text" name="firstname" placeholder="Current First Name" value={fields.firstname} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <MicroFieldInlineLabel>Current Middle Name</MicroFieldInlineLabel>
                        <FieldInputNode type="text" name="middlename" placeholder="Optional Middle Name" value={fields.middlename} onChange={handleInputChange} />
                      </div>
                    </FieldInputsGridTwinLayout>

                    <HorizontalSectionSplitterLine />

                    {/* MODAL CONFIGURATION SUB-BRANCH SPECIFIC FORMS */}
                    {activeModal === 'nin_name_modification' && (
                      <FieldInputsGridTwinLayout style={{background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
                        <div style={{gridColumn: '1 / -1'}}><h5 style={{margin: '0', fontSize: '11px', fontWeight: '800', color: '#2563eb'}}>NEW TARGET PROFILE ATTRIBUTES</h5></div>
                        <div>
                          <MicroFieldInlineLabel>Registered Telephone</MicroFieldInlineLabel>
                          <FieldInputNode type="text" name="phone_number" placeholder="Current Phone" value={fields.phone_number} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <MicroFieldInlineLabel>New Target Surname</MicroFieldInlineLabel>
                          <FieldInputNode type="text" name="new_surname" placeholder="New Surname" value={fields.new_surname} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <MicroFieldInlineLabel>New Target First Name</MicroFieldInlineLabel>
                          <FieldInputNode type="text" name="new_firstname" placeholder="New First Name" value={fields.new_firstname} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <MicroFieldInlineLabel>New Target Middle Name</MicroFieldInlineLabel>
                          <FieldInputNode type="text" name="new_middlename" placeholder="New Middle Name" value={fields.new_middlename} onChange={handleInputChange} />
                        </div>
                      </FieldInputsGridTwinLayout>
                    )}

                    {activeModal === 'nin_phone_modification' && (
                      <div style={{background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
                        <MicroFieldInlineLabel>New Mobile Phone Number Configuration</MicroFieldInlineLabel>
                        <FieldInputNode type="text" maxLength={11} name="new_phone_number" placeholder="Enter new mobile number" value={fields.new_phone_number} onChange={handleInputChange} required />
                      </div>
                    )}

                    {activeModal === 'nin_address_modification' && (
                      <FieldInputsGridTwinLayout style={{background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0'}}>
                        <div>
                          <MicroFieldInlineLabel>Registered Telephone</MicroFieldInlineLabel>
                          <FieldInputNode type="text" name="phone_number" placeholder="Current phone link" value={fields.phone_number} onChange={handleInputChange} required />
                        </div>
                        <div style={{gridColumn: '1 / -1'}}>
                          <MicroFieldInlineLabel>Complete New Physical Residential Address String</MicroFieldInlineLabel>
                          <FieldInputNode type="text" name="new_address" placeholder="e.g. 15 Allen Avenue, Ikeja, Lagos" value={fields.new_address} onChange={handleInputChange} required />
                        </div>
                      </FieldInputsGridTwinLayout>
                    )}
                  </>
                )}
              </DynamicInputsWrapperBox>

              <HorizontalSectionSplitterLine style={{margin: '10px 0'}} />

              <StepHeaderMarkerBlock>
                <StepIndexBadge>02</StepIndexBadge>
                <span className="title">Authorize Ledger Charges</span>
              </StepHeaderMarkerBlock>

              <CheckboxSelectionNode>
                <input 
                  type="checkbox" 
                  id="regulatoryProcessingAccordConsentModal" 
                  checked={confirmedConsent}
                  onChange={(e) => setConfirmedConsent(e.target.checked)}
                />
                <label htmlFor="regulatoryProcessingAccordConsentModal">
                  I clarify all parameters provided are accurate. I authorize immediate subtraction of ₦{baseRates[activeModal]?.toLocaleString()} from my wallet assets.
                </label>
              </CheckboxSelectionNode>

            </ModalFormInputScrollContainerBody>

            <ModalFooterActionBoundaryRow>
              <CancelUtilityButton type="button" onClick={closeModalPipeline}>Cancel</CancelUtilityButton>
              <ExecutionTriggerBtn style={{margin: '0', width: 'auto', padding: '10px 20px'}} type="submit" disabled={loading}>
                {loading ? "Processing..." : "Submit Secure Order"}
              </ExecutionTriggerBtn>
            </ModalFooterActionBoundaryRow>

          </ModalContentWindowPane>
        </ModalFixedDimmerOverlay>
      )}
    </ViewShellFrame>
  );
};

export default NINModificationManagement;

/* --- COMPREHENSIVE EXPERT LAYOUT ARCHITECTURE MODULE --- */
const ViewShellFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const HeaderLabelBoundary = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px;
`;

const IconBoxWrapper = styled.div`
  width: 32px;
  height: 32px;
  background: #eef2f6;
  border: 1px solid #cbd5e1;
  color: #0f172a;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewMainTitle = styled.h2`
  font-size: 15px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
`;

const ViewSubTitle = styled.p`
  font-size: 11px;
  color: #64748b;
  margin: 0;
`;

const WarningAdmonitionCallout = styled.div`
  background: #fffbeb;
  border: 1px solid #fde68a;
  color: #b45309;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  gap: 8px;
  align-items: flex-start;
  p { margin: 0; font-size: 11px; line-height: 1.4; }
`;

const SplitLowerLayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1.1fr;
  gap: 10px;
  @media (max-width: 850px) { grid-template-columns: 1fr; }
`;

const SectionGridSubtitleLabel = styled.h3`
  font-size: 12px;
  font-weight: 700;
  color: #475569;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const ServiceSelectionGridGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  @media (max-width: 550px) { grid-template-columns: 1fr; }
`;

const ServiceCardOptionItem = styled.button`
  text-align: left;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover { 
    border-color: #2563eb; 
    transform: translateY(-1px);
    box-shadow: 0 4px 12px -3px rgba(37, 99, 235, 0.08);
  }

  .meta-info {
    h4 { margin: 0; font-size: 13px; font-weight: 800; color: #0f172a; }
    p { margin: 4px 0 8px 0; font-size: 11px; line-height: 1.3; color: #64748b; min-height: 28px; }
    span { display: inline-block; font-size: 11px; font-weight: 700; color: #2563eb; background: #eff6ff; padding: 2px 6px; border-radius: 4px; }
  }
`;

const DynamicInputsWrapperBox = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FieldInputsGridTwinLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const MicroFieldInlineLabel = styled.span`
  display: block;
  font-size: 10px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 3px;
`;

const FieldInputNode = styled.input`
  width: 100%;
  padding: 9px;
  font-size: 13px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
  background: #f8fafc;
  &:focus { border-color: #2563eb; background: #ffffff; }
`;

const HorizontalSectionSplitterLine = styled.div`
  border-top: 1px dashed #e2e8f0;
  margin: 2px 0;
`;

const CheckboxSelectionNode = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  input { margin-top: 2px; cursor: pointer; }
  label { font-size: 11px; line-height: 1.4; color: #334155; font-weight: 500; cursor: pointer; }
`;

const ExecutionTriggerBtn = styled.button`
  background: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;
  &:hover { background: #1d4ed8; }
  &:disabled { background: #94a3b8; cursor: not-allowed; }
`;

const SecurityAttributeRowUnderButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-top: 1px solid #e2e8f0;
  padding-top: 10px;
  margin-top: 6px;
  div {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
  }
`;

const RightContextMetaTilePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const WalletSummaryWidgetCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px;
  .label-cluster {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    color: #64748b;
    font-weight: 600;
  }
  h3 { font-size: 18px; font-weight: 800; color: #0f172a; margin: 4px 0 0 0; }
`;

const EmptyStateNoticeFramePlaceholder = styled.div`
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 10px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
  svg { color: #94a3b8; margin-bottom: 6px; }
  h4 { font-size: 12px; font-weight: 700; color: #475569; margin: 0; text-transform: uppercase; }
  p { font-size: 11px; line-height: 1.4; color: #64748b; margin: 4px 0 0 0; max-width: 250px; }
`;

const ProfileIDCertificateDisplayCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CertificateHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 8px;
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  svg { color: #2563eb; }
`;

const SuccessBadgeLabelBannerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 8px;
  border-radius: 6px;
  svg { color: #059669; }
  h4 { margin: 0; font-size: 11px; font-weight: 800; color: #065f46; }
  p { margin: 0; font-size: 11px; font-weight: 600; color: #047857; }
`;

const HorizontalDashedRuleLine = styled.div`
  border-top: 1px dashed #e2e8f0;
  width: 100%;
`;

const ExtendedTextMetadataGridRowDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  label { font-size: 9px; font-weight: 600; color: #94a3b8; display: block; }
  p { font-size: 12px; font-weight: 700; color: #1e293b; margin: 0; }
`;

const AddressMetadataBoxWrapperBlock = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 8px;
  label { font-size: 9px; font-weight: 600; color: #94a3b8; display: block; margin-bottom: 2px; }
  p { font-size: 11px; line-height: 1.4; color: #334155; font-weight: 600; margin: 0; }
`;

/* --- MODAL SURFACE ARCHITECTURE STYLES --- */
const ModalFixedDimmerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

const ModalContentWindowPane = styled.form`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 580px;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
  animation: modalScaleIn 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);

  @keyframes modalScaleIn {
    from { transform: scale(0.96); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

const ModalWindowHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  h3 { margin: 0; font-size: 14px; font-weight: 800; color: #0f172a; }
  p { margin: 2px 0 0 0; font-size: 11px; font-weight: 700; color: #2563eb; }
`;

const ModalDismissWindowCrossButton = styled.button`
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #475569;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover { background: #e2e8f0; color: #0f172a; }
`;

const ModalFormInputScrollContainerBody = styled.div`
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const StepHeaderMarkerBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  .title { font-size: 11px; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.02em; }
`;

const StepIndexBadge = styled.div`
  background: #0f172a;
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckVerifiedTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #dcfce7;
  border: 1px solid #bbf7d0;
  color: #166534;
  font-size: 9px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 4px;
  text-transform: uppercase;
  margin-left: auto;
`;

const ModalFooterActionBoundaryRow = styled.div`
  padding: 12px 16px;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  border-radius: 0 0 12px 12px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const CancelUtilityButton = styled.button`
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;
  &:hover { background: #f1f5f9; color: #0f172a; }
`;