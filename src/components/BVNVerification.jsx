import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { 
  FaAddressCard, FaShieldHalved, FaCircleCheck, FaWallet, 
  FaFingerprint, FaClock, FaPassport, FaUserCheck 
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Context } from './Context';

const BVNVerification = () => {
  // Local Component State
  const [slipType, setSlipType] = useState('');
  const [bvnNumber, setBvnNumber] = useState('');
  const [confirmedConsent, setConfirmedConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [returnedResult, setReturnedResult] = useState(null);
  
  // App Global Context Config Strings & Methods
  const { api_url, user, fetchUserProfileById } = useContext(Context);

  // Dynamic pricing for BVN items
  const priceMap = {
    slip: 350.00,
    card: 450.00
  };

  const serviceFee = priceMap[slipType] || 0.00;

  // const handleVerificationPipeline = (e) => {
  //   e.preventDefault();

  //   // 1. Inputs Verification Checks
  //   if (!slipType) {
  //     Swal.fire({ icon: 'error', title: 'Choose Slip Type', text: 'Please select a slip type format to continue.', confirmButtonColor: '#2563eb' });
  //     return;
  //   }

  //   if (bvnNumber.length !== 11 || !/^\d+$/.test(bvnNumber)) {
  //     Swal.fire({ icon: 'error', title: 'Wrong BVN Format', text: 'The Bank Verification Number must be exactly 11 digits.', confirmButtonColor: '#2563eb' });
  //     return;
  //   }

  //   if (!confirmedConsent) {
  //     Swal.fire({ icon: 'warning', title: 'Consent Required', text: 'Please confirm that you have permission from the owner of this BVN.', confirmButtonColor: '#2563eb' });
  //     return;
  //   }

  //   if (!user || user.balance < serviceFee) {
  //     Swal.fire({ icon: 'error', title: 'Insufficient Balance', text: 'Your wallet balance is too low to cover the cost of this check.', confirmButtonColor: '#dc2626' });
  //     return;
  //   }

  //   // 2. Alert Box Confirmation Prior to Deduction Actions
  //   Swal.fire({
  //     title: 'Confirm Payment',
  //     text: `We will deduct ₦${serviceFee.toFixed(2)} from your wallet to verify this BVN. Do you want to continue?`,
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonColor: '#2563eb',
  //     cancelButtonColor: '#64748b',
  //     confirmButtonText: 'Yes, Verify Now'
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       setLoading(true);
  //       setReturnedResult(null);

  //       try {
  //         const response = await fetch(`${api_url}/verify_bvn.php`, {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({
  //             bvn: bvnNumber,
  //             consent: confirmedConsent,
  //             userId: user.id,
  //             cost: serviceFee
  //           })
  //         });

  //         const data = await response.json();

  //         if (response.ok && data.success) {
  //           setReturnedResult(data.profile); 
  //           Swal.fire({ icon: 'success', title: 'Successful', text: 'BVN details retrieved successfully.', confirmButtonColor: '#2563eb' });
            
  //           // Instantly sync the global application balance tracker state
         
  //             fetchUserProfileById();
            

  //           // Reset operational form field conditions safely
  //           setBvnNumber('');
  //           setConfirmedConsent(false);
  //           setSlipType('');
  //         } else {
  //           Swal.fire({ icon: 'error', title: 'Verification Failed', text: data.error || 'Could not verify this BVN. Please check the number and try again.', confirmButtonColor: '#dc2626' });
  //         }
  //       } catch (error) {
  //         Swal.fire({ icon: 'error', title: 'Network Error', text: 'Could not connect to the server. Please check your internet connection.', confirmButtonColor: '#dc2626' });
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   });
  // };

  
  
  const handleVerificationPipeline = (e) => {
  e.preventDefault();

  // 1. Check if the form fields are filled correctly
  if (!slipType) {
    Swal.fire({ 
      icon: 'error', 
      title: 'Missing Selection', 
      text: 'Please select a slip type to continue.', 
      confirmButtonColor: '#2563eb' 
    });
    return;
  }

  if (bvnNumber.length !== 11 || !/^\d+$/.test(bvnNumber)) {
    Swal.fire({ 
      icon: 'error', 
      title: 'Invalid BVN', 
      text: 'The Bank Verification Number must be exactly 11 digits.', 
      confirmButtonColor: '#2563eb' 
    });
    return;
  }

  if (!confirmedConsent) {
    Swal.fire({ 
      icon: 'warning', 
      title: 'Consent Required', 
      text: 'Please check the box to confirm you have permission to verify this BVN.', 
      confirmButtonColor: '#2563eb' 
    });
    return;
  }

  // if (!user || user.balance < serviceFee) {
  //   Swal.fire({ 
  //     icon: 'error', 
  //     title: 'Insufficient Balance', 
  //     text: 'Your wallet balance is too low to pay for this search.', 
  //     confirmButtonColor: '#dc2626' 
  //   });
  //   return;
  // }

  // 2. Show a payment confirmation box before charging the user
  Swal.fire({
    title: 'Confirm Payment',
    text: `You will be charged ₦${serviceFee.toFixed(2)} from your wallet to verify this BVN. Do you want to proceed?`,
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
        const response = await fetch(`${api_url}/verify_bvn.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bvn: bvnNumber,
            consent: confirmedConsent,
            userId: user.id,
            cost: serviceFee
          })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Save results, show success message, and refresh balance
          setReturnedResult(data.profile); 
          Swal.fire({ 
            icon: 'success', 
            title: 'Verification Successful', 
            text: 'BVN details retrieved successfully.', 
            confirmButtonColor: '#2563eb' 
          });
          
          fetchUserProfileById(); // Refresh user wallet balance text on screen
          
          // Clear form fields
          setBvnNumber('');
          setConfirmedConsent(false);
          setSlipType('');
        } else {
          Swal.fire({ 
            icon: 'error', 
            title: 'Verification Failed', 
            text: data.error || 'Could not verify this BVN. Please check the number and try again.', 
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
      <HeaderLabelBoundary>
        <IconBoxWrapper><FaAddressCard size={14} /></IconBoxWrapper>
        <div>
          <ViewMainTitle>BVN Verification </ViewMainTitle>
          <ViewSubTitle>Choose your preferred slip format and verify BVN details</ViewSubTitle>
        </div>
      </HeaderLabelBoundary>

      <SplitLowerLayoutGrid>
        <ProcessingCoreCard onSubmit={handleVerificationPipeline}>
          
          {/* STEP 1 SECTION */}
          <InputGroupBlock>
            <StepIndicatorRow>
              <StepIndexBadge>01</StepIndexBadge>
              <FieldInputLabel>Select Slip Type</FieldInputLabel>
              {slipType && <CheckVerifiedTag><FaCircleCheck size={10} /> <span>Selected</span></CheckVerifiedTag>}
            </StepIndicatorRow>
            <FormSelectorDropdown value={slipType} onChange={(e) => setSlipType(e.target.value)}>
              <option value="">-- Choose between traditional slip format or modern ID card design --</option>
              <option value="slip">BVN Slip - ₦350.00</option>
              <option value="card">BVN Card - ₦450.00</option>
            </FormSelectorDropdown>
            <DynamicCostFootnote>Cost: ₦{serviceFee.toFixed(2)}</DynamicCostFootnote>
          </InputGroupBlock>

          {/* STEP 2 SECTION */}
          <InputGroupBlock>
            <StepIndicatorRow>
              <StepIndexBadge>02</StepIndexBadge>
              <FieldInputLabel>Bank Verification Number (BVN)</FieldInputLabel>
              <FieldInputLengthIndicator active={bvnNumber.length === 11}>{bvnNumber.length}/11 digits</FieldInputLengthIndicator>
            </StepIndicatorRow>
            <FieldInputNode 
              type="text" 
              maxLength={11} 
              placeholder="Enter 11-digit BVN" 
              value={bvnNumber}
              onChange={(e) => setBvnNumber(e.target.value.replace(/\D/g, ''))}
            />
            <PrivacyNoticeBox>
              Privacy Notice: Your BVN information is encrypted and securely processed. We never store your personal data after verification.
            </PrivacyNoticeBox>
          </InputGroupBlock>

          {/* STEP 3 SECTION */}
          <InputGroupBlock>
            <StepIndicatorRow>
              <StepIndexBadge>03</StepIndexBadge>
              <FieldInputLabel>Confirmation Consent</FieldInputLabel>
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
                I confirm that I have obtained proper consent from the BVN owner for this verification.
              </label>
            </CheckboxSelectionNode>
          </InputGroupBlock>

          <ExecutionTriggerBtn type="submit" disabled={loading}>
            {loading ? "Checking details, please wait..." : "Verify BVN Now"}
          </ExecutionTriggerBtn>

          <SecurityAttributeRowUnderButton>
            <div><FaFingerprint size={10} /> <span>Secure Encryption</span></div>
            <div><FaClock size={10} /> <span>Instant Output</span></div>
            <div><FaUserCheck size={10} /> <span>Compliant Process</span></div>
          </SecurityAttributeRowUnderButton>

        </ProcessingCoreCard>

        <RightContextMetaTilePanel>
          <WalletSummaryWidgetCard>
            <div className="label-cluster">
              <FaWallet size={12} />
              <span>Balance Available</span>
            </div>
            <h3>₦{user?.balance?.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
          </WalletSummaryWidgetCard>

          {returnedResult ? (
            <ProfileIDCertificateDisplayCard>
              <CertificateHeaderRow>
                <FaPassport size={14} />
                <span>VERIFIED BVN PROFILE RECORD</span>
              </CertificateHeaderRow>
              
              <ProfileInnerGridAligner>
                {returnedResult.photo && (
                  <ProfilePhotoAvatarBox 
                    src={returnedResult.photo.startsWith('data:') ? returnedResult.photo : `data:image/jpeg;base64,${returnedResult.photo}`} 
                    alt="BVN Avatar" 
                  />
                )}
                <ProfileSummaryFieldGroupData>
                  <div>
                    <label>LAST NAME (SURNAME)</label>
                    <p>{returnedResult.lastname}</p>
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
                <div><label>GENDER</label><p>{returnedResult.gender || 'N/A'}</p></div>
                <div><label>DATE OF BIRTH</label><p>{returnedResult.dob || 'N/A'}</p></div>
                <div><label>TELEPHONE</label><p>{returnedResult.phone || 'N/A'}</p></div>
                <div><label>NATIONALITY</label><p>{returnedResult.nationality || 'N/A'}</p></div>
              </ExtendedTextMetadataGridRowDetails>

              <AddressMetadataBoxWrapperBlock>
                <label>STATE INFO</label>
                <p>State of Origin: {returnedResult.state_of_origin || 'N/A'} | State of Residence: {returnedResult.state_of_residence || 'N/A'}</p>
              </AddressMetadataBoxWrapperBlock>
            </ProfileIDCertificateDisplayCard>
          ) : (
            <EmptyStateNoticeFramePlaceholder>
              <FaShieldHalved size={24} />
              <h4>Preview Area</h4>
              <p>Preview will appear here when you select a slip type, complete the form, and run verification.</p>
            </EmptyStateNoticeFramePlaceholder>
          )}
        </RightContextMetaTilePanel>
      </SplitLowerLayoutGrid>
    </ViewShellFrame>
  );
};

export default BVNVerification;

/* -------------------------------------------------------------------------- */
/* STYLED COMPONENTS CSS ENGINE (STRICT 10PX CEILING GRID RULE ARCHITECTURE)  */
/* -------------------------------------------------------------------------- */

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

const SplitLowerLayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1.1fr;
  gap: 10px;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessingCoreCard = styled.form`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  padding: 10px;
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
  padding: 10px;
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
  padding: 10px;
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
  padding: 10px;
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
  gap: 10px;
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
  `

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