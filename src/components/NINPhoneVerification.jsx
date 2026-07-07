// import React, { useContext, useState } from 'react';
// import styled from 'styled-components';
// import { useSelector } from 'react-redux';
// import { FaMobileScreenButton, FaCircleInfo, FaShield, FaWallet } from 'react-icons/fa6';
// import Swal from 'sweetalert2';
// import { Context } from './Context';

// const NINPhoneVerification = () => {
//   // Pull balance from Redux to check funding constraints before processing 
 
// const {api_url,user,fetchUserProfileById}=useContext(Context)
//   // Component Form State Parameters
//   const [slipType, setSlipType] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [consentChecked, setConsentChecked] = useState(false);
//   const [loading, setLoading] = useState(false);

//  const userWallet = user?.balance

//   // Dynamic Base Rate Logic Engine
//   const getServiceFee = () => {
//     if (slipType === 'nin_regular') return 380;
//     if (slipType === 'nin_standard') return 450;
//     if (slipType === 'nin_premium') return 500;
//     return 0;
//   };

//   const serviceFee = getServiceFee();


// const handleVerificationSubmit = (e) => {
//   e.preventDefault();

//   // 1. Check if the form fields are filled correctly
//   if (!slipType) {
//     Swal.fire({ 
//       icon: 'error', 
//       title: 'Missing Selection', 
//       text: 'Please select a slip type to continue.', 
//       confirmButtonColor: '#2563eb' 
//     });
//     return;
//   }

//   if (phoneNumber.length !== 11 || !/^\d+$/.test(phoneNumber)) {
//     Swal.fire({ 
//       icon: 'error', 
//       title: 'Invalid Phone Number', 
//       text: 'The phone number must be exactly 11 digits.', 
//       confirmButtonColor: '#2563eb' 
//     });
//     return;
//   }

//   if (!consentChecked) {
//     Swal.fire({ 
//       icon: 'warning', 
//       title: 'Consent Required', 
//       text: 'Please check the box to confirm you have permission to look up this number.', 
//       confirmButtonColor: '#2563eb' 
//     });
//     return;
//   }



//   // 3. Show a payment confirmation box before charging the user
//   Swal.fire({
//     title: 'Confirm Payment',
//     text: `You will be charged ₦${serviceFee.toFixed(2)} from your wallet to look up this phone number. Do you want to proceed?`,
//     icon: 'question',
//     showCancelButton: true,
//     confirmButtonColor: '#2563eb',
//     cancelButtonColor: '#64748b',
//     confirmButtonText: 'Yes, Verify Now',
//   }).then(async (result) => { 
//     if (result.isConfirmed) {
//       setLoading(true);
      
//       try {
//         // Send request to your backend file
//         const response = await fetch(`${api_url}/verify_nin_phone.php`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             phone: phoneNumber,
//             consent: consentChecked,
//             userId: user.id,
//             cost: serviceFee,
//             slip:slipType
//           })
//         });

//         const data = await response.json();

//         if (response.ok && data.success) {
//           Swal.fire({
//             icon: 'success',
//             title: 'Verification Successful',
//             text: 'Go to your TRANSACTION HISTORY and DOWNLOAD your slip.',
//             confirmButtonColor: '#2563eb',
//             allowOutsideClick:false
//           });

//           fetchUserProfileById(); // Refresh user wallet balance text on screen
          
//           // Clear form fields
//           setPhoneNumber('');
//           setConsentChecked(false);
//           setSlipType('');
//         } else {
//           Swal.fire({
//             icon: 'error',
//             title: 'Verification Failed',
//             text: data.error || 'Could not find details for this phone number.',
//             confirmButtonColor: '#dc2626'
//           });
//           console.log(data);
//         }
//       } catch (error) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Connection Error',
//           text: 'Could not connect to the server. Please check your internet connection.',
//           confirmButtonColor: '#dc2626'
//         });
//       } finally {
//         setLoading(false);
//       }
//     }
//   });
// };



// return (
//     <ModuleWorkspaceFrame>
      
//       {/* SECTION HEADER PANEL */}
//       <HeaderLabelBoundary>
//         <IconBoxWrapper>
//           <FaMobileScreenButton size={14} />
//         </IconBoxWrapper>
//         <div>
//           <ViewMainTitle>NIN Phone Verification</ViewMainTitle>
//           <ViewSubTitle>Resolve corporate identity credentials using localized SIM records</ViewSubTitle>
//         </div>
//       </HeaderLabelBoundary>

//       <DualSplitGridPipeline>
        
//         {/* INPUT SUBMISSION FIELD ARTIFACTS */}
//         <ProcessingCoreCard onSubmit={handleVerificationSubmit}>
          
//           <InputGroupBlock>
//             <FieldInputLabel>Select Slip Type</FieldInputLabel>
//             <FieldHelperAnnotation>Choose the type of NIN slip you need for your verification</FieldHelperAnnotation>
//             <FormSelectorDropdown 
//               value={slipType} 
//               onChange={(e) => setSlipType(e.target.value)}
//             >
//               <option value="">-- Select a slip type --</option>
//               <option value="nin_regular">Regular Slip - ₦380.00</option>
//               <option value="nin_standard">Standard Slip - ₦450.00</option>
//               <option value="nin_premium">Premium Slip - ₦500.00</option>
//             </FormSelectorDropdown>
//           </InputGroupBlock>

//           <InputGroupBlock>
//             <FieldInputLabel>Enter Phone Number</FieldInputLabel>
//             <FieldInputNode 
//               type="text" 
//               maxLength={11}
//               placeholder="08030000000" 
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))} 
//             />
            
//             {/* COMPLIANCE INFORMATION STACK */}
//             <AlertNotificationBox status="info">
//               <FaCircleInfo size={14} />
//               <p>Enter the phone number that was used to register the NIN. The number should be 11 digits without the country code (+234).</p>
//             </AlertNotificationBox>

//             <AlertNotificationBox status="danger">
//               <FaCircleInfo size={14} />
//               <p>Enter a correct Phone number linked to the NIN. You will not be refunded if the number is not linked after carrying out the transaction.</p>
//             </AlertNotificationBox>
//           </InputGroupBlock>

//           {/* PRIVACY ACKNOWLEDGEMENT SELECTION BOUNDARY */}
//           <CheckboxSelectionNode>
//             <input 
//               type="checkbox" 
//               id="consentAgreementCheckbox"
//               checked={consentChecked}
//               onChange={(e) => setConsentChecked(e.target.checked)}
//             />
//             <label htmlFor="consentAgreementCheckbox">
//               I have obtained proper consent from the phone number owner for this verification, and I am sure the number is linked to NIN
//             </label>
//           </CheckboxSelectionNode>

//           <ExecutionTriggerBtn type="submit" disabled={loading}>
//             {loading ? "Running Registry Lookup..." : `Process Request (₦${serviceFee}.00)`}
//           </ExecutionTriggerBtn>

//         </ProcessingCoreCard>

//         {/* METRIC INFRASTRUCTURE BALANCE DISPLAY TILE */}
//         <FinancialSideSummaryCard>
//           <SummaryWidgetHeading>Transaction Summary</SummaryWidgetHeading>
          
//           <SummaryDataRow>
//             <span>Target Protocol:</span>
//             <strong>NIN Data Recovery</strong>
//           </SummaryDataRow>
          
//           <SummaryDataRow>
//             <span>Service Fee Charge:</span>
//             <span className="charge-amount">₦{serviceFee?.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
//           </SummaryDataRow>

//           <HorizontalSectionRule />

//           <WalletStandingBalanceBlock>
//             <div className="label-group">
//               <FaWallet size={12} />
//               <span>Available Wallet Balance</span>
//             </div>
//             <h3>₦{user?.balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
//           </WalletStandingBalanceBlock>

//           <SecureFootnoteLine>
//             <FaShield size={11} />
//             <span>Encrypted Ledger Validation Route</span>
//           </SecureFootnoteLine>
//         </FinancialSideSummaryCard>

//       </DualSplitGridPipeline>

//     </ModuleWorkspaceFrame>
//   );
// };

// export default NINPhoneVerification;

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FaMobileScreenButton, FaCircleInfo, FaShield, FaWallet } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Context } from './Context';

const NINPhoneVerification = () => {
  const { api_url, user, fetchUserProfileById } = useContext(Context);
  
  // Component Form State Parameters
  const [slipType, setSlipType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const userWallet = user?.balance ? parseFloat(user.balance) : 0;

  // Dynamic Base Rate Logic Engine
  const getServiceFee = () => {
    if (slipType === 'nin_regular') return 380;
    if (slipType === 'nin_standard') return 450;
    if (slipType === 'nin_premium') return 500;
    return 0;
  };

  const serviceFee = getServiceFee();

  const handleVerificationSubmit = (e) => {
    e.preventDefault();

    // 1. Structural Field Validations
    if (!slipType) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Missing Selection', 
        text: 'Please select a slip type to continue.', 
        confirmButtonColor: '#2563eb' 
      });
      return;
    }

    if (phoneNumber.length !== 11 || !/^\d+$/.test(phoneNumber)) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Invalid Phone Number', 
        text: 'The phone number must be exactly 11 digits.', 
        confirmButtonColor: '#2563eb' 
      });
      return;
    }

    if (!consentChecked) {
      Swal.fire({ 
        icon: 'warning', 
        title: 'Consent Required', 
        text: 'Please check the box to confirm you have permission to look up this number.', 
        confirmButtonColor: '#2563eb' 
      });
      return;
    }

    // 2. FIXED: Client-Side Balance Check (Stops execution immediately if funding is low)
    if (userWallet < serviceFee) {
      Swal.fire({
        icon: 'error',
        title: 'Insufficient Balance',
        text: `Your wallet balance (₦${userWallet.toLocaleString(undefined, {minimumFractionDigits: 2})}) is too low for this slip format. Please fund your account to continue.`,
        confirmButtonColor: '#dc2626'
      });
      return;
    }

    // 3. Prompt Transaction Confirmation Modal
    Swal.fire({
      title: 'Confirm Payment',
      text: `You will be charged ₦${serviceFee.toFixed(2)} from your wallet to look up this phone number. Do you want to proceed?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Verify Now',
    }).then(async (result) => { 
      if (result.isConfirmed) {
        setLoading(true);
        
        try {
          // Send payload mapping directly onto the backend controller pipeline
          const response = await fetch(`${api_url}/verify_nin_phone.php`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              phone: phoneNumber,
              consent: consentChecked,
              userId: user?.id,
              cost: serviceFee,
              slip: slipType
            })
          });

          const data = await response.json();

          if (response.ok && data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Verification Successful',
              text: 'Go to your TRANSACTION HISTORY and DOWNLOAD your slip.',
              confirmButtonColor: '#2563eb',
              allowOutsideClick: false
            });

            fetchUserProfileById(); // Refresh user wallet balance text component on screen
            
            // Clear form inputs cleanly
            setPhoneNumber('');
            setConsentChecked(false);
            setSlipType('');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Verification Failed',
              text: data.error || 'Could not find details for this phone number.',
              confirmButtonColor: '#dc2626'
            });
            console.log(data);
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Connection Error',
            text: 'Could not connect to the server. Please check your internet connection.',
            confirmButtonColor: '#dc2626'
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <ModuleWorkspaceFrame>
      
      {/* SECTION HEADER PANEL */}
      <HeaderLabelBoundary>
        <IconBoxWrapper>
          <FaMobileScreenButton size={14} />
        </IconBoxWrapper>
        <div>
          <ViewMainTitle>NIN Phone Verification</ViewMainTitle>
          <ViewSubTitle>Resolve corporate identity credentials using localized SIM records</ViewSubTitle>
        </div>
      </HeaderLabelBoundary>

      <DualSplitGridPipeline>
        
        {/* INPUT SUBMISSION FIELD ARTIFACTS */}
        <ProcessingCoreCard onSubmit={handleVerificationSubmit}>
          
          <InputGroupBlock>
            <FieldInputLabel>Select Slip Type</FieldInputLabel>
            <FieldHelperAnnotation>Choose the type of NIN slip you need for your verification</FieldHelperAnnotation>
            <FormSelectorDropdown 
              value={slipType} 
              onChange={(e) => setSlipType(e.target.value)}
            >
              <option value="">-- Select a slip type --</option>
              <option value="nin_regular">Regular Slip - ₦380.00</option>
              <option value="nin_standard">Standard Slip - ₦450.00</option>
              <option value="nin_premium">Premium Slip - ₦500.00</option>
            </FormSelectorDropdown>
          </InputGroupBlock>

          <InputGroupBlock>
            <FieldInputLabel>Enter Phone Number</FieldInputLabel>
            <FieldInputNode 
              type="text" 
              maxLength={11}
              placeholder="08030000000" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))} 
            />
            
            {/* COMPLIANCE INFORMATION STACK */}
            <AlertNotificationBox status="info">
              <FaCircleInfo size={14} />
              <p>Enter the phone number that was used to register the NIN. The number should be 11 digits without the country code (+234).</p>
            </AlertNotificationBox>

            <AlertNotificationBox status="danger">
              <FaCircleInfo size={14} />
              <p>Enter a correct Phone number linked to the NIN. You will not be refunded if the number is not linked after carrying out the transaction.</p>
            </AlertNotificationBox>
          </InputGroupBlock>

          {/* PRIVACY ACKNOWLEDGEMENT SELECTION BOUNDARY */}
          <CheckboxSelectionNode>
            <input 
              type="checkbox" 
              id="consentAgreementCheckbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
            />
            <label htmlFor="consentAgreementCheckbox">
              I have obtained proper consent from the phone number owner for this verification, and I am sure the number is linked to NIN
            </label>
          </CheckboxSelectionNode>

          <ExecutionTriggerBtn type="submit" disabled={loading}>
            {loading ? "Running Registry Lookup..." : `Process Request (₦${serviceFee}.00)`}
          </ExecutionTriggerBtn>

        </ProcessingCoreCard>

        {/* METRIC INFRASTRUCTURE BALANCE DISPLAY TILE */}
        <FinancialSideSummaryCard>
          <SummaryWidgetHeading>Transaction Summary</SummaryWidgetHeading>
          
          <SummaryDataRow>
            <span>Target Protocol:</span>
            <strong>NIN Data Recovery</strong>
          </SummaryDataRow>
          
          <SummaryDataRow>
            <span>Service Fee Charge:</span>
            <span className="charge-amount">₦{serviceFee?.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
          </SummaryDataRow>

          <HorizontalSectionRule />

          <WalletStandingBalanceBlock>
            <div className="label-group">
              <FaWallet size={12} />
              <span>Available Wallet Balance</span>
            </div>
            <h3>₦{user?.balance ? parseFloat(user.balance).toLocaleString(undefined, {minimumFractionDigits: 2}) : "0.00"}</h3>
          </WalletStandingBalanceBlock>

          <SecureFootnoteLine>
            <FaShield size={11} />
            <span>Encrypted Ledger Validation Route</span>
          </SecureFootnoteLine>
        </FinancialSideSummaryCard>

      </DualSplitGridPipeline>

    </ModuleWorkspaceFrame>
  );
};

export default NINPhoneVerification;

/* -------------------------------------------------------------------------- */
/* STYLED HOOK COMPONENTS SPECIFICATIONS (10PX GRID ARCHITECTURE CEILINGS)   */
/* -------------------------------------------------------------------------- */

const ModuleWorkspaceFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Locked at strict layout limit rule */
  width: 100%;
  box-sizing: border-box;
`;

const HeaderLabelBoundary = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Locked at strict layout limit rule */
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px; /* Locked at strict layout limit rule */
`;

const IconBoxWrapper = styled.div`
  width: 32px;
  height: 32px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #2563eb;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewMainTitle = styled.h2`
  font-size: 1rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
`;

const ViewSubTitle = styled.p`
  font-size: 1rem;
  color: #64748b;
  margin: 0;
`;

const DualSplitGridPipeline = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 10px; /* Locked at strict layout limit rule */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessingCoreCard = styled.form`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px; /* Locked at strict layout limit rule */
  display: flex;
  flex-direction: column;
  gap: 10px; /* Locked at strict layout limit rule */
`;

const InputGroupBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FieldInputLabel = styled.label`
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
`;

const FieldHelperAnnotation = styled.p`
  font-size: 11px;
  color: #64748b;
  margin: 0 0 2px 0;
`;

const FormSelectorDropdown = styled.select`
  width: 100%;
  padding: 10px; /* Locked at strict layout limit rule */
  font-size: 13px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #f8fafc;
  color: #0f172a;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #2563eb;
    background: #ffffff;
  }
`;

const FieldInputNode = styled.input`
  width: 100%;
  padding: 10px; /* Locked at strict layout limit rule */
  font-size: 13px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  color: #0f172a;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #2563eb;
  }
`;

const AlertNotificationBox = styled.div`
  display: flex;
  gap: 8px;
  padding: 10px; /* Locked at strict layout limit rule */
  border-radius: 6px;
  align-items: flex-start;
  
  background: ${props => props.status === 'danger' ? '#fef2f2' : '#f0fdf4'};
  border: 1px solid ${props => props.status === 'danger' ? '#fee2e2' : '#dcfce7'};
  
  svg {
    color: ${props => props.status === 'danger' ? '#ef4444' : '#16a34a'};
    flex-shrink: 0;
    margin-top: 2px;
  }

  p {
    font-size: 1rem;
    line-height: 1.4;
    color: ${props => props.status === 'danger' ? '#991b1b' : '#14532d'};
    margin: 0;
  }
`;

const CheckboxSelectionNode = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px; /* Locked at strict layout limit rule */
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;

  input {
    margin-top: 2px;
    cursor: pointer;
  }

  label {
    font-size: 1rem;
    line-height: 1.4;
    color: #334155;
    font-weight: 500;
    cursor: pointer;
  }
`;

const ExecutionTriggerBtn = styled.button`
  width: 100%;
  background: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 10px; /* Locked at strict layout limit rule */
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #1d4ed8;
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

const FinancialSideSummaryCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px; /* Locked at strict layout limit rule */
  display: flex;
  flex-direction: column;
  gap: 10px; /* Locked at strict layout limit rule */
  align-self: flex-start;
`;

const SummaryWidgetHeading = styled.h4`
  font-size: 12px;
  font-weight: 800;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
`;

const SummaryDataRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #475569;

  strong { color: #0f172a; }
  .charge-amount {
    font-weight: 700;
    color: #2563eb;
  }
`;

const HorizontalSectionRule = styled.hr`
  border: none;
  border-top: 1px dashed #cbd5e1;
  margin: 0;
`;

const WalletStandingBalanceBlock = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 10px; /* Locked at strict layout limit rule */

  .label-group {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    color: #64748b;
    font-weight: 600;
  }

  h3 {
    font-size: 18px;
    font-weight: 800;
    color: #0f172a;
    margin: 4px 0 0 0;
  }
`;

const SecureFootnoteLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 9px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
`;