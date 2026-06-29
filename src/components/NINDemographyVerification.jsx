import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { 
  FaAddressCard, FaShieldHalved, FaCircleCheck, FaWallet, 
  FaFingerprint, FaClock, FaPassport, FaUserCheck 
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Context } from './Context';

const NINDemographyVerification = () => {
  // Local Form Parameters State
  const [slipType, setSlipType] = useState('');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    dob: ''
  });
  const [confirmedConsent, setConfirmedConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [returnedResult, setReturnedResult] = useState(null);

  // App Global Context Config Metrics & Methods
  const { api_url, user, fetchUserProfileById } = useContext(Context);

  // Dynamic pricing for demographic output rules matrix
  const priceMap = {
    slip: 350.00,
    card: 500.00
  };

  const serviceFee = priceMap[slipType] || 0.00;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleVerificationPipeline = (e) => {
  //   e.preventDefault();

  //   // 1. Structural Field Entry Requirements Check
  //   if (!slipType) {
  //     Swal.fire({ icon: 'error', title: 'Choose Slip Type', text: 'Please select a slip type format to continue.', confirmButtonColor: '#2563eb' });
  //     return;
  //   }

  //   if (!formData.firstname.trim() || !formData.lastname.trim()) {
  //     Swal.fire({ icon: 'error', title: 'Missing Identity Parameters', text: 'Please input both first name and surname fields.', confirmButtonColor: '#2563eb' });
  //     return;
  //   }

  //   if (!formData.gender) {
  //     Swal.fire({ icon: 'error', title: 'Select Gender', text: 'Please identify the subject gender attribute profile.', confirmButtonColor: '#2563eb' });
  //     return;
  //   }

  //   if (!formData.dob) {
  //     Swal.fire({ icon: 'error', title: 'Missing Date of Birth', text: 'Please specify the exact date of birth as recorded on records.', confirmButtonColor: '#2563eb' });
  //     return;
  //   }

  //   if (!confirmedConsent) {
  //     Swal.fire({ icon: 'warning', title: 'Consent Required', text: 'Please confirm that you have explicit permission from the owner of this profile.', confirmButtonColor: '#2563eb' });
  //     return;
  //   }

  //   if (!user || user.balance < serviceFee) {
  //     Swal.fire({ icon: 'error', title: 'Insufficient Balance', text: 'Your wallet balance is too low to cover the cost of this check.', confirmButtonColor: '#dc2626' });
  //     return;
  //   }

  //   // 2. Clear Prompt Warnings Prior to Wallet Reductions
  //   Swal.fire({
  //     title: 'Confirm Payment',
  //     text: `We will deduct ₦${serviceFee.toFixed(2)} from your wallet to execute this Demographic identity search. Do you want to continue?`,
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
  //         const response = await fetch(`${api_url}/verify_nin_demography.php`, {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({
  //             firstname: formData.firstname,
  //             lastname: formData.lastname,
  //             gender: formData.gender,
  //             dob: formData.dob,
  //             consent: confirmedConsent,
  //             userId: user.id,
  //             slipType: slipType
  //           })
  //         });

  //         const data = await response.json();

  //         if (response.ok && data.success) {
  //           setReturnedResult(data.data); 
  //           Swal.fire({ icon: 'success', title: 'Successful', text: 'Demographic identity details mapped successfully.', confirmButtonColor: '#2563eb' });
            
  //           // Sync global wallet profile metrics balances
  //           fetchUserProfileById();

  //           // Clear configuration parameters fields safely
  //           setFormData({ firstname: '', lastname: '', gender: '', dob: '' });
  //           setConfirmedConsent(false);
  //           setSlipType('');
  //         } else {
  //           Swal.fire({ icon: 'error', title: 'Search Failed', text: data.error || 'NIMC directory verification node could not match these criteria details.', confirmButtonColor: '#dc2626' });
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

    if (!formData.firstname.trim() || !formData.lastname.trim()) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Missing Names', 
        text: 'Please enter both the first name and last name.', 
        confirmButtonColor: '#2563eb' 
      });
      return;
    }

    if (!formData.gender) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Select Gender', 
        text: 'Please select a gender.', 
        confirmButtonColor: '#2563eb' 
      });
      return;
    }

    if (!formData.dob) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Missing Date of Birth', 
        text: 'Please select the correct date of birth.', 
        confirmButtonColor: '#2563eb' 
      });
      return;
    }

    if (!confirmedConsent) {
      Swal.fire({ 
        icon: 'warning', 
        title: 'Consent Required', 
        text: 'Please check the box to confirm you have permission to search this person\'s details.', 
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
      text: `You will be charged ₦${serviceFee.toFixed(2)} from your wallet to run this search. Do you want to proceed?`,
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
          const response = await fetch(`${api_url}/verify_nin_demography.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firstname: formData.firstname,
              lastname: formData.lastname,
              gender: formData.gender,
              dob: formData.dob,
              consent: confirmedConsent,
              userId: user.id,
              slipType: slipType
            })
          });

          const data = await response.json();

          if (response.ok && data.success) {
            // Save results, show success message, and reset form inputs
            setReturnedResult(data.data); 
            Swal.fire({ 
              icon: 'success', 
              title: 'Verification Successful', 
              text: 'NIN details found successfully.', 
              confirmButtonColor: '#2563eb' 
            });
            
            fetchUserProfileById(); // Refresh user wallet balance text on screen

            // Clear the form fields safely
            setFormData({ firstname: '', lastname: '', gender: '', dob: '' });
            setConfirmedConsent(false);
            setSlipType('');
          } else {
            Swal.fire({ 
              icon: 'error', 
              title: 'Verification Failed', 
              text: data.error || 'Could not find details matching these parameters.', 
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
          <ViewMainTitle>NIN Demography Search </ViewMainTitle>
          <ViewSubTitle>Lookup identification parameters using official first names, surnames, and dates of birth</ViewSubTitle>
        </div>
      </HeaderLabelBoundary>

      <SplitLowerLayoutGrid>
        <ProcessingCoreCard onSubmit={handleVerificationPipeline}>
          
          {/* STEP 1 SECTION */}
          <InputGroupBlock>
            <StepIndicatorRow>
              <StepIndexBadge>01</StepIndexBadge>
              <FieldInputLabel>Select Slip Output Type</FieldInputLabel>
              {slipType && <CheckVerifiedTag><FaCircleCheck size={10} /> <span>Selected</span></CheckVerifiedTag>}
            </StepIndicatorRow>
            <FormSelectorDropdown value={slipType} onChange={(e) => setSlipType(e.target.value)}>
              <option value="">-- Choose between traditional slip format or modern ID card design --</option>
              <option value="slip">NIN Demographic Slip - ₦350.00</option>
              <option value="card">NIN Demographic Smart Card Layout - ₦500.00</option>
            </FormSelectorDropdown>
            <DynamicCostFootnote>Cost: ₦{serviceFee.toFixed(2)}</DynamicCostFootnote>
          </InputGroupBlock>

          {/* STEP 2 SECTION */}
          <InputGroupBlock>
            <StepIndicatorRow>
              <StepIndexBadge>02</StepIndexBadge>
              <FieldInputLabel>Demographic Profile Details</FieldInputLabel>
            </StepIndicatorRow>
            
            <DemographicGridInputsBlock>
              <div>
                <MicroInlineFieldLabelText>First Name (As written on ID)</MicroInlineFieldLabelText>
                <FieldInputNode 
                  type="text" 
                  name="firstname" 
                  placeholder="e.g. JOHN" 
                  value={formData.firstname} 
                  onChange={handleInputChange} 
                />
              </div>
              <div>
                <MicroInlineFieldLabelText>Last Name / Surname</MicroInlineFieldLabelText>
                <FieldInputNode 
                  type="text" 
                  name="lastname" 
                  placeholder="e.g. ADEBAYO" 
                  value={formData.lastname} 
                  onChange={handleInputChange} 
                />
              </div>
              <div>
                <MicroInlineFieldLabelText>Gender Attribute</MicroInlineFieldLabelText>
                <FormSelectorDropdown name="gender" value={formData.gender} onChange={handleInputChange}>
                  <option value="">-- Select --</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </FormSelectorDropdown>
              </div>
              <div>
                <MicroInlineFieldLabelText>Date of Birth</MicroInlineFieldLabelText>
                <FieldInputNode 
                  type="date" 
                  name="dob" 
                  value={formData.dob} 
                  onChange={handleInputChange} 
                />
              </div>
            </DemographicGridInputsBlock>

            <PrivacyNoticeBox>
              Privacy Notice: Verification parameter details process encrypted. System core drops parameters from database volatile memory nodes straight after resolution.
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
                I confirm that I have obtained explicit, clear consent from the legal identity owner to perform this lookup check.
              </label>
            </CheckboxSelectionNode>
          </InputGroupBlock>

          <ExecutionTriggerBtn type="submit" disabled={loading}>
            {loading ? "Searching directories, please wait..." : "Execute Demography Search"}
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
                <span>VERIFIED NATIONAL NIN DEMOGRAPHY RECORD</span>
              </CertificateHeaderRow>
              
              <ProfileInnerGridAligner>
                {returnedResult.photo && (
                  <ProfilePhotoAvatarBox 
                    src={returnedResult.photo.startsWith('data:') ? returnedResult.photo : `data:image/jpeg;base64,${returnedResult.photo}`} 
                    alt="NIMC Avatar" 
                  />
                )}
                <ProfileSummaryFieldGroupData>
                  <div>
                    <label>SURNAME (LAST NAME)</label>
                    <p>{returnedResult.lastname || returnedResult.lastName || 'N/A'}</p>
                  </div>
                  <div>
                    <label>FIRST NAME</label>
                    <p>{returnedResult.firstname || returnedResult.firstName || 'N/A'}</p>
                  </div>
                  {(returnedResult.middlename || returnedResult.middleName) && (
                    <div>
                      <label>MIDDLE NAME</label>
                      <p>{returnedResult.middlename || returnedResult.middleName}</p>
                    </div>
                  )}
                </ProfileSummaryFieldGroupData>
              </ProfileInnerGridAligner>

              <HorizontalDashedRuleLine />

              <ExtendedTextMetadataGridRowDetails>
                <div><label>GENDER</label><p>{returnedResult.gender || 'N/A'}</p></div>
                <div><label>DATE OF BIRTH</label><p>{returnedResult.dob || returnedResult.birthdate || 'N/A'}</p></div>
                <div><label>NATIONAL IDENTITY NUMBER (NIN)</label><p style={{color: '#2563eb'}}>{returnedResult.nin || 'N/A'}</p></div>
                <div><label>MOBILE PARAMETER</label><p>{returnedResult.phone || 'N/A'}</p></div>
              </ExtendedTextMetadataGridRowDetails>

              <AddressMetadataBoxWrapperBlock>
                <label>RESIDENTIAL LOCATION DATA</label>
                <p>{returnedResult.address || 'No verifiable physical address information returned from database grids.'}</p>
              </AddressMetadataBoxWrapperBlock>
            </ProfileIDCertificateDisplayCard>
          ) : (
            <EmptyStateNoticeFramePlaceholder>
              <FaShieldHalved size={24} />
              <h4>Preview Area</h4>
              <p>Preview will appear here when you select a slip type, complete the demographic criteria layout, and run verification.</p>
            </EmptyStateNoticeFramePlaceholder>
          )}
        </RightContextMetaTilePanel>
      </SplitLowerLayoutGrid>
    </ViewShellFrame>
  );
};

export default NINDemographyVerification;

/* --- STYLED COMPONENTS CSS ENGINE (Strict High-Density Hierarchy Architecture) --- */
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
  @media (max-width: 850px) { grid-template-columns: 1fr; }
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
  box-sizing: border-box;
  &:focus { border-color: #2563eb; background: #ffffff; }
`;

const DynamicCostFootnote = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #2563eb;
`;

const DemographicGridInputsBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  background: #ffffff;
  border: 1px solid #f1f5f9;
  padding: 4px 0;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const MicroInlineFieldLabelText = styled.span`
  display: block;
  font-size: 10px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 3px;
`;

const FieldInputNode = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 13px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
  background: #f8fafc;
  &:focus { border-color: #2563eb; background: #ffffff; }
`;

const PrivacyNoticeBox = styled.p`
  margin: 6px 0 0 0;
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