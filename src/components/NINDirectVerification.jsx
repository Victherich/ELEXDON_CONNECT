import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { 
  FaAddressCard, FaShieldHalved, FaCircleCheck, FaWallet, 
  FaFingerprint, FaClock, FaPassport, FaUserCheck 
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Context } from './Context';

const NINDirectVerification = () => {
  // Extract wallet credentials seamlessly from your global Redux authentication state structure


  // Local Processing Reactive Component State
  const [slipType, setSlipType] = useState('');
  const [ninNumber, setNinNumber] = useState('');
  const [confirmedConsent, setConfirmedConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [returnedResult, setReturnedResult] = useState(null);
  const {api_url,user,fetchUserProfileById}=useContext(Context);

const priceMap = {
  regular: 350.00,
  standard: 500.00,
  premium: 800.00
};

// Calculate service fee on the fly based on current dropdown selection state
const serviceFee = priceMap[slipType] || 0.00;

  // const handleVerificationPipeline = (e) => {
  //   e.preventDefault();

  //   // 1. Client-Side Input Formatting Checks
  //   if (!slipType) {
  //     Swal.fire({ icon: 'error', title: 'Step 1 Incomplete', text: 'Please select a production slip template layout form.', confirmButtonColor: '#2563eb' });
  //     return;
  //   }

  //   if (ninNumber.length !== 11 || !/^\d+$/.test(ninNumber)) {
  //     Swal.fire({ icon: 'error', title: 'Step 2 Formatting Defect', text: 'The National Identity Number must be exactly 11 numeric digits.', confirmButtonColor: '#2563eb' });
  //     return;
  //   }

  //   if (!confirmedConsent) {
  //     Swal.fire({ icon: 'warning', title: 'Step 3 Consent Mandatory', text: 'You must check the confirmation flag to authorize NIMC demographic record pulls.', confirmButtonColor: '#2563eb' });
  //     return;
  //   }

  //   // 2. Double-Check Intercept Layer Before Database Debits Trigger
  //   Swal.fire({
  //     title: 'Deduct Node Credit?',
  //     text: `Confirm utility cost breakdown processing of ₦${serviceFee.toFixed(2)} for tracking query node execution?`,
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonColor: '#2563eb',
  //     cancelButtonColor: '#64748b',
  //     confirmButtonText: 'Verify NIN Now'
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       setLoading(true);
  //       setReturnedResult(null);

  //       try {
  //         // Fire transaction into your secure cPanel PHP environment file location
  //         const response = await fetch(`${api_url}/verify_nin_direct.php`, {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({
  //             nin: ninNumber,
  //             consent: confirmedConsent,
  //             userId: user.id,
  //             cost: serviceFee
  //           })
  //         });

  //         const data = await response.json();

  //         if (response.ok && data.success) {
  //           setReturnedResult(data.profile); // Embed the "data" sub-object into local storage state
  //           Swal.fire({ icon: 'success', title: 'Clearance Granted', text: 'NIMC Registry parsed data correctly.', confirmButtonColor: '#2563eb' });
  //           fetchUserProfileById();
  //           // Clear inputs for processing security
  //           setNinNumber('');
  //           setConfirmedConsent(false);
  //           setSlipType('');
  //         } else {
  //           Swal.fire({ icon: 'error', title: 'Registry Rejection', text: data.error || 'The system was unable to pull documentation records.', confirmButtonColor: '#dc2626' });
  //         }
  //       } catch (error) {
  //         Swal.fire({ icon: 'error', title: ' Interruption', text: 'Unable to build a secure stream channel connection back to your hosting server database.', confirmButtonColor: '#dc2626' });
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   });
  // };



const handleVerificationPipeline = (e) => {
    e.preventDefault();

    // 1. Check if the user filled the form correctly
    if (!slipType) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Missing Selection', 
        text: 'Please select the slip type you want to print.', 
        confirmButtonColor: '#2563eb' 
      });
      return;
    }

    if (ninNumber.length !== 11 || !/^\d+$/.test(ninNumber)) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Invalid NIN', 
        text: 'The National Identity Number must be exactly 11 digits.', 
        confirmButtonColor: '#2563eb' 
      });
      return;
    }

    if (!confirmedConsent) {
      Swal.fire({ 
        icon: 'warning', 
        title: 'Consent Required', 
        text: 'You must check the box to authorize this search.', 
        confirmButtonColor: '#2563eb' 
      });
      return;
    }

    // 2. Pop up a clear payment confirmation before making the request
    Swal.fire({
      title: 'Confirm Payment',
      text: `You will be charged ₦${serviceFee.toFixed(2)} for this NIN verification from your wallet balance. Do you want to proceed?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Verify Now'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setReturnedResult(null);

        try {
          // Send request to your backend file
          const response = await fetch(`${api_url}/verify_nin_direct.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nin: ninNumber,
              consent: confirmedConsent,
              userId: user.id,
              cost: serviceFee
            })
          });

          const data = await response.json();
console.log(data)
          if (response.ok && data.success) {
            // Save search results, show success alert, and reset form inputs
            setReturnedResult(data.profile); 
            Swal.fire({ 
              icon: 'success', 
              title: 'Verification Successful', 
              text: 'NIN details retrieved successfully.', 
              confirmButtonColor: '#2563eb' 
            });
            
            fetchUserProfileById(); // Refresh user wallet balance text on screen
            
            // Clear the form fields
            setNinNumber('');
            setConfirmedConsent(false);
            setSlipType('');
          } else {
            Swal.fire({ 
              icon: 'error', 
              title: 'Verification Failed', 
              text: data.error || 'Could not find details for this NIN.', 
              confirmButtonColor: '#dc2626' 
            });
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
    <ViewShellFrame>
      {/* CARD CONSOLE BAR HEADER */}
      <HeaderLabelBoundary>
        <IconBoxWrapper><FaAddressCard size={14} /></IconBoxWrapper>
        <div>
          <ViewMainTitle>NIN Verification</ViewMainTitle>
          <ViewSubTitle>Verify any National Identity Number instantly</ViewSubTitle>
        </div>
      </HeaderLabelBoundary>

      <SplitLowerLayoutGrid>
        {/* INPUT AND PROCESSING PANELS */}
        <ProcessingCoreCard onSubmit={handleVerificationPipeline}>
          
          {/* STEP 1 SECTION */}
          <InputGroupBlock>
            <StepIndicatorRow>
              <StepIndexBadge>01</StepIndexBadge>
              <FieldInputLabel>Select Slip Type</FieldInputLabel>
              {slipType && <CheckVerifiedTag><FaCircleCheck size={10} /> <span>Selected</span></CheckVerifiedTag>}
            </StepIndicatorRow>
            <FormSelectorDropdown value={slipType} onChange={(e) => setSlipType(e.target.value)}>
              <option value="">-- Select --</option>
              <option value="regular">Regular</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </FormSelectorDropdown>
            <DynamicCostFootnote>Service Fee: ₦{serviceFee.toFixed(2)}</DynamicCostFootnote>
          </InputGroupBlock>

          {/* STEP 2 SECTION */}
          <InputGroupBlock>
            <StepIndicatorRow>
              <StepIndexBadge>02</StepIndexBadge>
              <FieldInputLabel>National Identity Number</FieldInputLabel>
              <FieldInputLengthIndicator active={ninNumber.length === 11}>{ninNumber.length}/11 digits</FieldInputLengthIndicator>
            </StepIndicatorRow>
            <FieldInputNode 
              type="text" 
              maxLength={11} 
              placeholder="Enter NIN" 
              value={ninNumber}
              onChange={(e) => setNinNumber(e.target.value.replace(/\D/g, ''))}
            />
            <PrivacyNoticeBox>
              Privacy Notice: Your NIN is encrypted and securely processed. We never store personal data after verification.
            </PrivacyNoticeBox>
          </InputGroupBlock>

          {/* STEP 3 SECTION */}
          <InputGroupBlock>
            <StepIndicatorRow>
              <StepIndexBadge>03</StepIndexBadge>
              <FieldInputLabel>Confirmation</FieldInputLabel>
              {confirmedConsent && <CheckVerifiedTag variant="success"><FaCircleCheck size={10} /> <span>Confirmed</span></CheckVerifiedTag>}
            </StepIndicatorRow>
            <CheckboxSelectionNode>
              <input 
                type="checkbox" 
                id="consentConfirmationDirect" 
                checked={confirmedConsent}
                onChange={(e) => setConfirmedConsent(e.target.checked)}
              />
              <label htmlFor="consentConfirmationDirect">
                I hereby grant absolute authorization parameters to run validation queries against registry logs.
              </label>
            </CheckboxSelectionNode>
          </InputGroupBlock>

          {/* TRIGGER SUBMIT ACTION ELEMENT ROW */}
          <ExecutionTriggerBtn type="submit" disabled={loading}>
            {loading ? "Decrypting Core NIMC Identity Matrix..." : "Verify NIN Now"}
          </ExecutionTriggerBtn>

          <SecurityAttributeRowUnderButton>
            <div><FaFingerprint size={10} /> <span>256-bit Encrypted</span></div>
            <div><FaClock size={10} /> <span>Instant Result</span></div>
            <div><FaUserCheck size={10} /> <span>NDPR Compliant</span></div>
          </SecurityAttributeRowUnderButton>

        </ProcessingCoreCard>

        {/* ACCOUNT AND REALTIME PROFILE DATA DUMP DISPLAY TILE */}
        <RightContextMetaTilePanel>
          <WalletSummaryWidgetCard>
            <div className="label-cluster">
              <FaWallet size={12} />
              <span>Balance Available</span>
            </div>
            <h3>₦{user?.balance?.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
          </WalletSummaryWidgetCard>

          {/* DYNAMIC METADATA DISCLOSURE PANEL GROUPS */}
          {returnedResult ? (
            <ProfileIDCertificateDisplayCard>
              <CertificateHeaderRow>
                <FaPassport size={14} />
                <span>NIMC VERIFIED PROFILE DETAILED RECORD</span>
              </CertificateHeaderRow>
              
              <ProfileInnerGridAligner>
                {returnedResult.photo && (
                  <ProfilePhotoAvatarBox 
                    src={returnedResult.photo.startsWith('data:') ? returnedResult.photo : `data:image/jpeg;base64,${returnedResult.photo}`} 
                    alt="Identity Clearance Base64 Avatar Source" 
                  />
                )}
                <ProfileSummaryFieldGroupData>
                  <div>
                    <label>SURNAME</label>
                    <p>{returnedResult.surname}</p>
                  </div>
                  <div>
                    <label>FIRST NAME</label>
                    <p>{returnedResult.firstname}</p>
                  </div>
                  {returnedResult.middlename && (
                    <div>
                      <label>MIDDLE NAME</label>
                      <p>{returnedResult.middlename}</p>
                    </div>
                  )}
                </ProfileSummaryFieldGroupData>
              </ProfileInnerGridAligner>

              <HorizontalDashedRuleLine />

              <ExtendedTextMetadataGridRowDetails>
                <div><label>GENDER</label><p>{returnedResult.gender}</p></div>
                <div><label>DATE OF BIRTH</label><p>{returnedResult.birthdate}</p></div>
                <div><label>TELEPHONE</label><p>{returnedResult.telephoneno || 'N/A'}</p></div>
                <div><label>STATE OF ORIGIN</label><p>{returnedResult.birthstate}</p></div>
              </ExtendedTextMetadataGridRowDetails>

              <AddressMetadataBoxWrapperBlock>
                <label>RESIDENCE ADDRESS</label>
                <p>{returnedResult.residence_address}, {returnedResult.residence_town}, {returnedResult.residence_state} State.</p>
              </AddressMetadataBoxWrapperBlock>
            </ProfileIDCertificateDisplayCard>
          ) : (
            <EmptyStateNoticeFramePlaceholder>
              <FaShieldHalved size={24} />
              <h4>Identity Cache Standby</h4>
              <p>Populate execution steps 1 through 3 completely and invoke validation routines to render the live identity profile registry parameters here.</p>
            </EmptyStateNoticeFramePlaceholder>
          )}
        </RightContextMetaTilePanel>
      </SplitLowerLayoutGrid>
    </ViewShellFrame>
  );
};

export default NINDirectVerification;

/* -------------------------------------------------------------------------- */
/* STYLED COMPONENTS CSS ENGINE (STRICT 10PX CEILING GRID RULE ARCHITECTURE)  */
/* -------------------------------------------------------------------------- */

const ViewShellFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Locked at strict 10px limit rule */
  width: 100%;
  box-sizing: border-box;
`;

const HeaderLabelBoundary = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Locked at strict 10px limit rule */
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px; /* Locked at strict 10px limit rule */
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

const SplitLowerLayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1.1fr;
  gap: 10px; /* Locked at strict 10px limit rule */

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessingCoreCard = styled.form`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px; /* Locked at strict 10px limit rule */
  display: flex;
  flex-direction: column;
  gap: 10px; /* Locked at strict 10px limit rule */
`;

const InputGroupBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StepIndicatorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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

const FieldInputLabel = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #1e293b;
`;

const CheckVerifiedTag = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${props => props.variant === 'success' ? '#dcfce7' : '#eff6ff'};
  border: 1px solid ${props => props.variant === 'success' ? '#bbf7d0' : '#bfdbfe'};
  color: ${props => props.variant === 'success' ? '#166534' : '#1d4ed8'};
  font-size: 9px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
`;

const FormSelectorDropdown = styled.select`
  width: 100%;
  padding: 10px; /* Locked at strict 10px limit rule */
  font-size: 13px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #f8fafc;
  color: #0f172a;
  outline: none;

  &:focus { border-color: #2563eb; background: #ffffff; }
`;

const DynamicCostFootnote = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #2563eb;
`;

const FieldInputLengthIndicator = styled.span`
  font-size: 10px;
  font-weight: 600;
  margin-left: auto;
  color: ${props => props.active ? '#16a34a' : '#94a3b8'};
`;

const FieldInputNode = styled.input`
  width: 100%;
  padding: 10px; /* Locked at strict 10px limit rule */
  font-size: 13px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;

  &:focus { border-color: #2563eb; }
`;

const PrivacyNoticeBox = styled.p`
  margin: 0;
  font-size: 11px;
  line-height: 1.4;
  color: #64748b;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 8px 10px;
  border-radius: 6px;
`;

const CheckboxSelectionNode = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px; /* Locked at strict 10px limit rule */
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;

  input { margin-top: 2px; cursor: pointer; }
  label { font-size: 11px; line-height: 1.4; color: #334155; font-weight: 500; cursor: pointer; }
`;

const ExecutionTriggerBtn = styled.button`
  width: 100%;
  background: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 10px; /* Locked at strict 10px limit rule */
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
  gap: 10px; /* Locked at strict 10px limit rule */
  border-top: 1px solid #e2e8f0;
  padding-top: 10px;

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
  gap: 10px; /* Locked at strict 10px limit rule */
`;

const WalletSummaryWidgetCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px; /* Locked at strict 10px limit rule */

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
  padding: 20px 10px; /* Strict spacing guidelines boundary */
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
  padding: 10px; /* Locked at strict 10px limit rule */
  display: flex;
  flex-direction: column;
  gap: 10px; /* Locked at strict 10px limit rule */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01);
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
  letter-spacing: 0.02em;
  svg { color: #2563eb; }
`;

const ProfileInnerGridAligner = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 10px; /* Locked at strict 10px limit rule */
  align-items: center;
`;

const ProfilePhotoAvatarBox = styled.img`
  width: 80px;
  height: 95px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
`;

const ProfileSummaryFieldGroupData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label { font-size: 9px; font-weight: 600; color: #94a3b8; display: block; }
  p { font-size: 13px; font-weight: 800; color: #0f172a; margin: 0; }
`;

const HorizontalDashedRuleLine = styled.div`
  border-top: 1px dashed #e2e8f0;
  width: 100%;
`;

const ExtendedTextMetadataGridRowDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px; /* Locked at strict 10px limit rule */

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