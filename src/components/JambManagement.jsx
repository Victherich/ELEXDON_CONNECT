import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaGraduationCap, FaCircleInfo, FaCircleCheck, FaWallet, 
  FaReceipt, FaXmark, FaUserCheck, FaCopy, FaIdCard 
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Context } from './Context';

const JambManagement = () => {
  const { api_url, user, fetchUserProfileById } = useContext(Context);

  // Modal & Processing Controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyingProfile, setVerifyingProfile] = useState(false);
  const [confirmedConsent, setConfirmedConsent] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Form Inputs State
  const [phone, setPhone] = useState('');
  const [profileId, setProfileId] = useState('');
  const [verifiedCandidateName, setVerifiedCandidateName] = useState('');
  const [variations, setVariations] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState('');
  const [fetchingVariations, setFetchingVariations] = useState(false);


// Synchronize product variation codes on init
useEffect(() => {
  const loadJambVariations = async () => {
    setFetchingVariations(true);
    try {
      const response = await fetch(`${api_url}/get_jamb_variations.php?serviceID=jamb`);
      
      // Ensure the HTTP channel itself returned a 200 OK before executing parser
      if (!response.ok) {
        throw new Error(`Server returned HTTP Status Code Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Variations Synced Matrix:", data);
      
      if (data.success && data.variations) {
        setVariations(data.variations);
      } else {
        console.error("Vending variations flag evaluated to false:", data.error);
      }
    } catch (err) {
      console.error("Network synchronization exception loading variations:", err);
    } finally {
      setFetchingVariations(false);
    }
  };

  loadJambVariations();
}, [api_url]);



//   // Hook to handle verification of the Profile ID before enabling purchase
//   const handleVerifyProfileID = async () => {
//     if (!profileId.trim()) {
//       Swal.fire({ icon: 'warning', title: 'Input Required', text: 'Please input a valid JAMB Profile ID parameter.' });
//       return;
//     }
//     if (!selectedVariation) {
//       Swal.fire({ icon: 'warning', title: 'Plan Missing', text: 'Please select your target JAMB PIN variation option first.' });
//       return;
//     }

//     setVerifyingProfile(true);
//     setVerifiedCandidateName('');
//     try {
//       const response = await fetch(`${api_url}/verify_jamb_profile.php`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           billersCode: profileId.trim(),
//           variation_code: selectedVariation
//         })
//       });
//       const data = await response.json();

//       if (response.ok && data.success) {
//         setVerifiedCandidateName(data.customer_name);
//         Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Profile ID Verified', showConfirmButton: false, timer: 2000 });
//       } else {
//         Swal.fire({ icon: 'error', title: 'Verification Failed', text: data.error || 'The profile ID specified could not be resolved.', confirmButtonColor: '#dc2626' });
//       }
//     } catch (err) {
//       Swal.fire({ icon: 'error', title: 'Network Fault', text: 'Handshake timeout validating target customer profile map.' });
//     } finally {
//       setVerifyingProfile(false);
//     }
//   };

// Hook to handle verification of the Profile ID before enabling purchase
  const handleVerifyProfileID = async () => {
    if (!profileId.trim()) {
      Swal.fire({ icon: 'warning', title: 'Input Required', text: 'Please input a valid JAMB Profile ID parameter.' });
      return;
    }
    if (!selectedVariation) {
      Swal.fire({ icon: 'warning', title: 'Plan Missing', text: 'Please select your target JAMB PIN variation option first.' });
      return;
    }

    setVerifyingProfile(true);
    setVerifiedCandidateName('');
    
    try {
      // Appending a time seed query token ensures browser networking stacks completely bypass local memory caches
      const response = await fetch(`${api_url}/verify_jamb_profile.php?_t=${Date.now()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billersCode: profileId.trim(),
          type: selectedVariation // FIX: Changed from variation_code to type to match backend maps
        })
      });
      const data = await response.json();

      console.log(data)

      if (response.ok && data.success) {
        setVerifiedCandidateName(
    data.vtpass_response.content.Customer_Name
);
        Swal.fire({ toast: true, icon: 'success', title: 'Profile ID Verified', showConfirmButton: false, timer: 2000 });
      } else {
        Swal.fire({ icon: 'error', title: 'Verification Failed', text: data.error || 'The profile ID specified could not be resolved.', confirmButtonColor: '#dc2626' });
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Network Fault', text: 'Handshake timeout validating target customer profile map.' });
    } finally {
      setVerifyingProfile(false);
    }
  };



  const closeModalPipeline = () => {
    setIsModalOpen(false);
    setConfirmedConsent(false);
    setPhone('');
    setProfileId('');
    setVerifiedCandidateName('');
    setSelectedVariation('');
  };

  const handleCopyPinToken = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'PIN copied to clipboard', showConfirmButton: false, timer: 1500 });
  };

  const handleProcessJambPurchase = (e) => {
    e.preventDefault();

    if (!verifiedCandidateName) {
      Swal.fire({ icon: 'warning', title: 'Verification Demanded', text: 'You must verify the candidate profile ID successfully before payment generation.', confirmButtonColor: '#b45309' });
      return;
    }

    if (!confirmedConsent) {
      Swal.fire({ icon: 'warning', title: 'Authorization Required', text: 'Please acknowledge the transaction authorization checkbox block.', confirmButtonColor: '#2563eb' });
      return;
    }

    const targetPackage = variations.find(v => v.variation_code === selectedVariation);
    const targetAmount = parseFloat(targetPackage?.variation_amount || 0);

    Swal.fire({
      title: 'Confirm Pin Dispense',
      text: `Charge ₦${targetAmount.toLocaleString()} to generate "${targetPackage?.name}" for candidate: ${verifiedCandidateName}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Confirm Payment'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setReceiptData(null);

        const payload = {
          userId: user.id,
          serviceID: 'jamb',
          variation_code: selectedVariation,
          billersCode: profileId.trim(),
          amount: targetAmount,
          phone: phone.trim()
        };

        try {
          const response = await fetch(`${api_url}/purchase_jamb.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          const data = await response.json();

          if (response.ok && data.success) {
            setReceiptData(data.data);
            Swal.fire({ icon: 'success', title: 'JAMB PIN Created', text: 'The structural examination registration code has been generated.', confirmButtonColor: '#2563eb' });
            fetchUserProfileById();
            closeModalPipeline();
          } else {
            Swal.fire({ icon: 'error', title: 'Vending Error', text: data.error || 'Transaction rejected by payment infrastructure rules.', confirmButtonColor: '#dc2626' });
          }
        } catch (error) {
          Swal.fire({ icon: 'error', title: 'Connection Failed', text: 'System communications line interrupted.', confirmButtonColor: '#dc2626' });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <ViewShellFrame>
      <HeaderLabelBoundary>
        <IconBoxWrapper><FaGraduationCap size={16} /></IconBoxWrapper>
        <div>
          <ViewMainTitle>JAMB PIN Vending Terminal</ViewMainTitle>
          <ViewSubTitle>Generate official instant UTME and Direct Entry confirmation validation vouchers access strings safely.</ViewSubTitle>
        </div>
      </HeaderLabelBoundary>

      <WarningAdmonitionCallout>
        <FaCircleInfo size={14} style={{marginTop: '2px', flexShrink: '0'}} />
        <p><strong>Pricing Rule Compliance Check:</strong> All generated voucher PIN arrays execute natively matching approved processing frameworks benchmarks. Ensure Profile ID keys matches registration name metrics carefully.</p>
      </WarningAdmonitionCallout>

      <SplitLowerLayoutGrid>
        {/* INGESTION & INITIATION DASHBOARD PANEL */}
        <div>
          <SectionGridSubtitleLabel>Select Subsystem Module</SectionGridSubtitleLabel>
          <ServiceSelectionGridGroup>
            <ServiceCardOptionItem type="button" onClick={() => setIsModalOpen(true)}>
              <div className="meta-info">
                <CarrierBadgeLabel style={{background: '#eff6ff', color: '#1e40af'}}>JAMB VOUCHER GATEWAY</CarrierBadgeLabel>
                <p style={{marginTop: '6px'}}>Dispense structural UTME keys (with or without mock configurations) & Direct Entry validation tokens.</p>
                <span>Launch Vending Screen</span>
              </div>
            </ServiceCardOptionItem>
          </ServiceSelectionGridGroup>
        </div>

        {/* RECEIPT / VIEW ENGINE DISPLAY TILES */}
        <RightContextMetaTilePanel>
          <WalletSummaryWidgetCard>
            <div className="label-cluster">
              <FaWallet size={12} />
              <span>Available Running Liquidity</span>
            </div>
            <h3>₦{user?.balance?.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
          </WalletSummaryWidgetCard>

          {receiptData ? (
            <ProfileIDCertificateDisplayCard>
              <CertificateHeaderRow>
                <FaReceipt size={14} />
                <span>OFFICIAL UTME/DE ACCESS CERTIFICATE SLIP</span>
              </CertificateHeaderRow>
              
              <SuccessBadgeLabelBannerRow>
                <FaCircleCheck size={18} />
                <div>
                  <h4>TRANSACTION VENDED DELIVERED</h4>
                  <p>System Ref: {receiptData.transaction_id}</p>
                </div>
              </SuccessBadgeLabelBannerRow>

              <HorizontalDashedRuleLine />

              <ExtendedTextMetadataGridRowDetails>
                <div><label>REQUEST UNIQUE ID</label><p style={{fontSize: '11px', fontFamily: 'monospace'}}>{receiptData.request_id}</p></div>
                <div><label>REGISTRATION TYPE</label><p>{receiptData.service_name}</p></div>
                <div><label>DEBITED ASSET AMOUNT</label><p>₦{parseFloat(receiptData.amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</p></div>
                <div><label>TARGET ACCOUNT PHONE</label><p>{receiptData.recipient}</p></div>
              </ExtendedTextMetadataGridRowDetails>

              <TokenOutputCalloutContainerBlock>
                <div className="token-header-wrapper">
                  <label>GENERATED UTME REGISTRATION PIN / SERIAL CODE</label>
                  <button type="button" onClick={() => handleCopyPinToken(receiptData.purchased_code)}><FaCopy size={11}/> Copy PIN</button>
                </div>
                <p className="token-string-field">{receiptData.purchased_code}</p>
              </TokenOutputCalloutContainerBlock>
            </ProfileIDCertificateDisplayCard>
          ) : (
            <EmptyStateNoticeFramePlaceholder>
              <FaIdCard size={24} />
              <h4>Vending Records Sandbox</h4>
              <p>Following verification pipelines, issued access strings parameters logs display here instantly in real-time mode scopes loop maps.</p>
            </EmptyStateNoticeFramePlaceholder>
          )}
        </RightContextMetaTilePanel>
      </SplitLowerLayoutGrid>

      {/* --- INLINE FORM INGESTION MODAL SCREEN --- */}
      {isModalOpen && (
        <ModalFixedDimmerOverlay onClick={closeModalPipeline}>
          <ModalContentWindowPane onClick={(e) => e.stopPropagation()} onSubmit={handleProcessJambPurchase}>
            
            <ModalWindowHeaderContainer>
              <div>
                <h3>JAMB Validation Token Wizard</h3>
                <p>E-Education Utility Distribution Point</p>
              </div>
              <ModalDismissWindowCrossButton type="button" onClick={closeModalPipeline}>
                <FaXmark size={14} />
              </ModalDismissWindowCrossButton>
            </ModalWindowHeaderContainer>

            <ModalFormInputScrollContainerBody>
              <StepHeaderMarkerBlock>
                <StepIndexBadge>01</StepIndexBadge>
                <span className="title">Select Plan & Verify Candidate Metadata</span>
              </StepHeaderMarkerBlock>

              <DynamicInputsWrapperBox>
                <FieldInputsGridTwinLayout>
                  <div style={{gridColumn: 'span 2'}}>
                    <MicroFieldInlineLabel>Available JAMB Variations Array Matrix</MicroFieldInlineLabel>
                    <select 
                      style={{width: '100%', padding: '9px', borderRadius: '6px', fontSize:'12px', background: '#f8fafc', border: '1px solid #cbd5e1', outline:'none'}}
                      value={selectedVariation}
                      onChange={(e) => { setSelectedVariation(e.target.value); setVerifiedCandidateName(''); }}
                      disabled={fetchingVariations}
                      required
                    >
                      <option value="">{fetchingVariations ? "-- Synchronizing catalog profiles... --" : "-- Choose Package Variation --"}</option>
                      {variations.map(v => (
                        <option key={v.variation_code} value={v.variation_code}>
                          {v.name} (₦{parseFloat(v.variation_amount).toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <MicroFieldInlineLabel>Candidate Profile ID Code</MicroFieldInlineLabel>
                    <div style={{display: 'flex', gap: '4px'}}>
                      <FieldInputNode 
                        type="text" 
                        placeholder="e.g. 0123456789" 
                        value={profileId} 
                        onChange={(e) => { setProfileId(e.target.value); setVerifiedCandidateName(''); }} 
                        required 
                      />
                      <VerifyPayloadInlineBtn type="button" onClick={handleVerifyProfileID} disabled={verifyingProfile || !selectedVariation}>
                        {verifyingProfile ? "..." : <FaUserCheck size={12}/>}
                        Click to Verify
                      </VerifyPayloadInlineBtn>
                    </div>
                  </div>

                  <div>
                    <MicroFieldInlineLabel>Notification Delivery Phone Line</MicroFieldInlineLabel>
                    <FieldInputNode 
                      type="text" 
                      maxLength={11} 
                      placeholder="e.g. 08011111111" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      required 
                    />
                  </div>
                </FieldInputsGridTwinLayout>

                {verifiedCandidateName && (
                  <IdentityConfirmedNotificationBanner>
                    <FaUserCheck size={14} />
                    <p><strong>Candidate Name Verified:</strong> {verifiedCandidateName}</p>
                  </IdentityConfirmedNotificationBanner>
                )}
              </DynamicInputsWrapperBox>

              <HorizontalSectionSplitterLine style={{margin: '4px 0'}} />

              <StepHeaderMarkerBlock>
                <StepIndexBadge>02</StepIndexBadge>
                <span className="title">Authorizations Parameters Confirmation</span>
              </StepHeaderMarkerBlock>

              <CheckboxSelectionNode>
                <input 
                  type="checkbox" 
                  id="jambAuthorizeConsentCheckboxNodeBlock" 
                  checked={confirmedConsent}
                  onChange={(e) => setConfirmedConsent(e.target.checked)}
                />
                <label htmlFor="jambAuthorizeConsentCheckboxNodeBlock">
                  I authenticate profile checking parameters logs. I authorize my wallet balance to be directly debited to execute the selected service variation plan instantly.
                </label>
              </CheckboxSelectionNode>
            </ModalFormInputScrollContainerBody>

            <ModalFooterActionBoundaryRow>
              <CancelUtilityButton type="button" onClick={closeModalPipeline}>Abort</CancelUtilityButton>
              <ExecutionTriggerBtn style={{margin: '0', width: 'auto', padding: '10px 20px'}} type="submit" disabled={loading || !verifiedCandidateName}>
                {loading ? "Vending PIN..." : `Purchase Voucher PIN`}
              </ExecutionTriggerBtn>
            </ModalFooterActionBoundaryRow>

          </ModalContentWindowPane>
        </ModalFixedDimmerOverlay>
      )}
    </ViewShellFrame>
  );
};

export default JambManagement;

/* --- THEMATIC STYLED-COMPONENTS ARCHITECTURAL CODES MATRICES --- */
const ViewShellFrame = styled.div` display: flex; flex-direction: column; gap: 10px; width: 100%; box-sizing: border-box; `;
const HeaderLabelBoundary = styled.div` display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; `;
const IconBoxWrapper = styled.div` width: 32px; height: 32px; background: #eef2f6; border: 1px solid #cbd5e1; color: #0f172a; border-radius: 6px; display: flex; align-items: center; justify-content: center; `;
const ViewMainTitle = styled.h2` font-size: 15px; font-weight: 800; color: #0f172a; margin: 0; `;
const ViewSubTitle = styled.p` font-size: 11px; color: #64748b; margin: 0; `;
const WarningAdmonitionCallout = styled.div` background: #fffbeb; border: 1px solid #fde68a; color: #b45309; border-radius: 8px; padding: 10px; display: flex; gap: 8px; align-items: flex-start; p { margin: 0; font-size: 11px; line-height: 1.4; } `;
const SplitLowerLayoutGrid = styled.div` display: grid; grid-template-columns: 1.3fr 1.2fr; gap: 10px; @media (max-width: 850px) { grid-template-columns: 1fr; } `;
const SectionGridSubtitleLabel = styled.h3` font-size: 12px; font-weight: 700; color: #475569; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.03em; `;
const ServiceSelectionGridGroup = styled.div` display: grid; grid-template-columns: 1fr; gap: 8px; `;
const ServiceCardOptionItem = styled.button` text-align: left; background: #ffffff; border: 1px solid #e2e8f0; padding: 14px; border-radius: 8px; display: flex; cursor: pointer; transition: all 0.2s ease; &:hover { border-color: #2563eb; transform: translateY(-1px); } .meta-info { width: 100%; p { margin: 6px 0 10px 0; font-size: 11px; line-height: 1.4; color: #64748b; } span { display: inline-block; font-size: 11px; font-weight: 700; color: #2563eb; background: #eff6ff; padding: 2px 6px; border-radius: 4px; } } `;
const CarrierBadgeLabel = styled.span` font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; `;
const DynamicInputsWrapperBox = styled.div` background: #ffffff; display: flex; flex-direction: column; gap: 8px; `;
const FieldInputsGridTwinLayout = styled.div` display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; @media (max-width: 480px) { grid-template-columns: 1fr; } `;
const MicroFieldInlineLabel = styled.span` display: block; font-size: 10px; font-weight: 600; color: #64748b; margin-bottom: 3px; `;
const FieldInputNode = styled.input` width: 100%; padding: 9px; font-size: 12px; border: 1px solid #cbd5e1; border-radius: 6px; outline: none; box-sizing: border-box; background: #f8fafc; &:focus { border-color: #2563eb; background: #ffffff; } `;
const VerifyPayloadInlineBtn = styled.button` background: #0f172a; color: white; border: none; padding: 0 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; &:hover { background: #1e293b; } &:disabled { background: #cbd5e1; cursor: not-allowed; } `;
const IdentityConfirmedNotificationBanner = styled.div` background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; padding: 8px; border-radius: 6px; display: flex; align-items: center; gap: 6px; p { margin: 0; font-size: 11px; } `;
const HorizontalSectionSplitterLine = styled.div` border-top: 1px dashed #e2e8f0; width: 100%; `;
const CheckboxSelectionNode = styled.div` display: flex; align-items: flex-start; gap: 8px; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; input { margin-top: 2px; } label { font-size: 11px; line-height: 1.4; color: #334155; font-weight: 500; } `;
const ExecutionTriggerBtn = styled.button` background: #2563eb; color: #ffffff; border: none; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; &:disabled { background: #94a3b8; cursor: not-allowed; } `;
const RightContextMetaTilePanel = styled.div` display: flex; flex-direction: column; gap: 10px; `;
const WalletSummaryWidgetCard = styled.div` background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px; .label-cluster { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #64748b; font-weight: 600; } h3 { font-size: 18px; font-weight: 800; color: #0f172a; margin: 4px 0 0 0; } `;
const EmptyStateNoticeFramePlaceholder = styled.div` background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 25px 10px; display: flex; flex-direction: column; align-items: center; text-align: center; justify-content: center; svg { color: #94a3b8; margin-bottom: 6px; } h4 { font-size: 12px; font-weight: 700; color: #475569; margin: 0; text-transform: uppercase; } p { font-size: 11px; color: #64748b; margin: 4px 0 0 0; max-width: 240px; line-height:1.4; } `;
const ProfileIDCertificateDisplayCard = styled.div` background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 10px; `;
const CertificateHeaderRow = styled.div` display: flex; align-items: center; gap: 6px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; font-size: 10px; font-weight: 700; color: #475569; `;
const SuccessBadgeLabelBannerRow = styled.div` display: flex; align-items: center; gap: 10px; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 8px; border-radius: 6px; h4 { margin: 0; font-size: 11px; font-weight: 800; color: #065f46; } p { margin: 0; font-size: 11px; color: #047857; } `;
const HorizontalDashedRuleLine = styled.div` border-top: 1px dashed #e2e8f0; width: 100%; `;
const ExtendedTextMetadataGridRowDetails = styled.div` display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; label { font-size: 9px; font-weight: 600; color: #94a3b8; display: block; } p { font-size: 12px; font-weight: 700; color: #1e293b; margin: 0; } `;
const TokenOutputCalloutContainerBlock = styled.div` background: #f8fafc; border: 1px solid #2563eb; border-radius: 6px; padding: 10px; .token-header-wrapper { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; label { font-size: 9px; font-weight: 700; color: #2563eb; } button { background: #2563eb; border: none; color: white; padding: 2px 6px; font-size: 10px; font-weight: 700; border-radius: 4px; cursor: pointer; } } .token-string-field { font-size: 14px; font-family: monospace; font-weight: 800; color: #0f172a; margin: 4px 0 0 0; background: #ffffff; padding: 6px; border: 1px dashed #cbd5e1; border-radius: 4px; word-break: break-all; } `;
const ModalFixedDimmerOverlay = styled.div` position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box; `;
const ModalContentWindowPane = styled.form` background: #ffffff; border-radius: 12px; width: 100%; max-width: 520px; display: flex; flex-direction: column; border: 1px solid #e2e8f0; `;
const ModalWindowHeaderContainer = styled.div` display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #e2e8f0; h3 { margin: 0; font-size: 14px; font-weight: 800; color: #0f172a; } p { margin: 2px 0 0 0; font-size: 11px; font-weight: 700; color: #2563eb; } `;
const ModalDismissWindowCrossButton = styled.button` background: #f1f5f9; border: 1px solid #cbd5e1; color: #475569; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; `;
const ModalFormInputScrollContainerBody = styled.div` padding: 16px; display: flex; flex-direction: column; gap: 12px; `;
const StepHeaderMarkerBlock = styled.div` display: flex; align-items: center; gap: 8px; .title { font-size: 11px; font-weight: 800; color: #1e293b; text-transform: uppercase; } `;
const StepIndexBadge = styled.div` background: #0f172a; color: #ffffff; font-size: 10px; font-weight: 800; width: 18px; height: 18px; border-radius: 4px; display: flex; align-items: center; justify-content: center; `;
const ModalFooterActionBoundaryRow = styled.div` padding: 12px 16px; border-top: 1px solid #e2e8f0; background: #f8fafc; border-radius: 0 0 12px 12px; display: flex; justify-content: flex-end; gap: 8px; `;
const CancelUtilityButton = styled.button` background: #ffffff; border: 1px solid #cbd5e1; color: #475569; padding: 8px 14px; font-size: 12px; font-weight: 700; border-radius: 6px; cursor: pointer; `;

