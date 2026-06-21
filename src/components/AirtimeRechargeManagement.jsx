import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { 
  FaUserGear, FaCircleInfo, FaCircleCheck, FaWallet, 
  FaFingerprint, FaClock, FaReceipt, FaFileSignature, FaXmark, FaMobileScreenButton 
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Context } from './Context';

const AirtimeRechargeManagement = () => {
  const { api_url, user, fetchUserProfileById } = useContext(Context);

  // Interface Control Anchors
  const [activeModal, setActiveModal] = useState(null); // 'mtn' | 'glo' | 'airtel' | 'etisalat' | null
  const [confirmedConsent, setConfirmedConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Field Array Matrices Definition State
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const providerMetaData = {
    mtn: { name: 'MTN Nigeria', themeColor: '#ecc94b', bgColor: '#fef08a', textBrandColor: '#715a00' },
    glo: { name: 'Glo World', themeColor: '#38a169', bgColor: '#bbf7d0', textBrandColor: '#14532d' },
    airtel: { name: 'Airtel Africa', themeColor: '#e53e3e', bgColor: '#fecaca', textBrandColor: '#7f1d1d' },
    etisalat: { name: '9mobile', themeColor: '#00524d', bgColor: '#ccfbf1', textBrandColor: '#115e59' }
  };

  const closeModalPipeline = () => {
    setActiveModal(null);
    setConfirmedConsent(false);
    setPhone('');
    setAmount('');
  };

  const handleProcessRechargeForm = (e) => {
    e.preventDefault();

    if (!confirmedConsent) {
      Swal.fire({ icon: 'warning', title: 'Authorization Required', text: 'Please check the verification checkbox block to signify systemic authorization context.', confirmButtonColor: '#2563eb' });
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount < 50) {
      Swal.fire({ icon: 'error', title: 'Invalid Distribution Fee', text: 'Minimum airtime allocation unit must match or exceed ₦50.00 limits.', confirmButtonColor: '#dc2626' });
      return;
    }

    // if (!user || user.balance < numericAmount) {
    //   Swal.fire({ icon: 'error', title: 'Insufficient Account Balance', text: 'Your wallet ledger balance asset profile lacks structural financing for this allocation.', confirmButtonColor: '#dc2626' });
    //   return;
    // }

    Swal.fire({
      title: 'Confirm Airtime Purchase',
      text: `You will be charged ₦${numericAmount.toLocaleString()} to recharge ${activeModal?.toUpperCase()} airtime for the recipient target line ${phone}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Buy Airtime'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setReceiptData(null);

        const payload = {
          userId: user.id,
          serviceID: activeModal,
          phone: phone,
          amount: numericAmount,
          consent: confirmedConsent
        };

        try {
          const response = await fetch(`${api_url}/purchase_airtime.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          const data = await response.json();

          if (response.ok && data.success) {
            setReceiptData(data.data);
            Swal.fire({ icon: 'success', title: 'Airtime Sent Cleanly', text: 'The airtime value has been credited.', confirmButtonColor: '#2563eb' });
            
            fetchUserProfileById(); // Refresh local account context metrics profile instantly
            closeModalPipeline();
          } else {
            Swal.fire({ icon: 'error', title: 'Transaction Terminated', text: data.error || 'The distribution gateway rejected allocation parameters context settings.', confirmButtonColor: '#dc2626' });
        console.log(data)  
        }
        } catch (error) {
          Swal.fire({ icon: 'error', title: 'Socket Communication Outage', text: 'Network layer handshake timed out. Check local configuration loops.', confirmButtonColor: '#dc2626' });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <ViewShellFrame>
      <HeaderLabelBoundary>
        <IconBoxWrapper><FaMobileScreenButton size={14} /></IconBoxWrapper>
        <div>
          <ViewMainTitle>Instant VTU Airtime Recharge Hub</ViewMainTitle>
          <ViewSubTitle>Select your target carrier directory block array parameters to reveal pop-out execution forms modules windows.</ViewSubTitle>
        </div>
      </HeaderLabelBoundary>

      <WarningAdmonitionCallout>
        <FaCircleInfo size={14} style={{marginTop: '2px', flexShrink: '0'}} />
        <p><strong>Sandbox Simulator Trace Array notice:</strong> Use <code>08011111111</code> as input to test successful VTpass network loop simulations. Any unmapped random values trigger direct validation failures natively.</p>
      </WarningAdmonitionCallout>

      <SplitLowerLayoutGrid>
        {/* NETWORK OPERATOR DIRECTORY PLATFORM */}
        <div>
          <SectionGridSubtitleLabel>Select Network Infrastructure</SectionGridSubtitleLabel>
          <ServiceSelectionGridGroup>
            {[
              { id: 'mtn', name: 'MTN Nigeria', desc: 'Top up MTN lines instantly using direct high-priority pipeline switches.' },
              { id: 'glo', name: 'Glo World', desc: 'Send Globacom value parameters straight to target recipient endpoints.' },
              { id: 'airtel', name: 'Airtel Africa', desc: 'Access Airtel routing networks to disburse VTU accounts properties.' },
            //   { id: 'etisalat', name: '9mobile', desc: 'Dispatch EMTS data/airtime components stream profiles to devices.' }
            ].map(network => {
              const meta = providerMetaData[network.id];
              return (
                <ServiceCardOptionItem key={network.id} type="button" onClick={() => setActiveModal(network.id)}>
                  <div className="meta-info">
                    <CarrierBadgeLabel style={{background: meta.bgColor, color: meta.textBrandColor}}>{meta.name}</CarrierBadgeLabel>
                    <p style={{marginTop: '6px'}}>{network.desc}</p>
                    <span>Launch Top-up Window</span>
                  </div>
                </ServiceCardOptionItem>
              );
            })}
          </ServiceSelectionGridGroup>
        </div>

        {/* RIGHT TRANSIENT BALANCE CONTEXT PANELS */}
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
                <span>VTU RECHARGE TRANSACTION SLIP</span>
              </CertificateHeaderRow>
              
              <SuccessBadgeLabelBannerRow>
                <FaCircleCheck size={18} />
                <div>
                  <h4>RECHARGE DELIVERED SUCCESSFUL</h4>
                  <p>Ref ID: {receiptData.transaction_id}</p>
                </div>
              </SuccessBadgeLabelBannerRow>

              <HorizontalDashedRuleLine />

              <ExtendedTextMetadataGridRowDetails>
                <div><label>REQUEST SYSTEM ID</label><p style={{fontSize: '11px', fontFamily: 'monospace'}}>{receiptData.request_id}</p></div>
                <div><label>CARRIER NET NODE</label><p>{receiptData.service_name}</p></div>
                <div><label>DISBURSED VALUE</label><p>₦{parseFloat(receiptData.amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</p></div>
                <div><label>RECIPIENT LINE</label><p>{receiptData.recipient}</p></div>
              </ExtendedTextMetadataGridRowDetails>

              <AddressMetadataBoxWrapperBlock>
                <label>NETWORK ADVISORY TRACE REMARK</label>
                <p>Value metrics have written onto target memory cards cleanly over secure API validation switches.</p>
              </AddressMetadataBoxWrapperBlock>
            </ProfileIDCertificateDisplayCard>
          ) : (
            <EmptyStateNoticeFramePlaceholder>
              <FaMobileScreenButton size={24} />
              <h4>Receipt Preview Area</h4>
              <p>Recharge confirmation data records and tracking parameters manifest instantly inside this slot container panel following API returns validations updates.</p>
            </EmptyStateNoticeFramePlaceholder>
          )}
        </RightContextMetaTilePanel>
      </SplitLowerLayoutGrid>

      {/* --- DYNAMIC AIRTIME MODAL WINDOW FORM WINDOW --- */}
      {activeModal && (
        <ModalFixedDimmerOverlay onClick={closeModalPipeline}>
          <ModalContentWindowPane onClick={(e) => e.stopPropagation()} onSubmit={handleProcessRechargeForm}>
            
            <ModalWindowHeaderContainer>
              <div>
                <h3>Recharge {providerMetaData[activeModal]?.name} Pipeline</h3>
                <p>Direct Gateway Account Interface</p>
              </div>
              <ModalDismissWindowCrossButton type="button" onClick={closeModalPipeline}>
                <FaXmark size={14} />
              </ModalDismissWindowCrossButton>
            </ModalWindowHeaderContainer>

            <ModalFormInputScrollContainerBody>
              
              <StepHeaderMarkerBlock>
                <StepIndexBadge>01</StepIndexBadge>
                <span className="title">Distribution Core Parameters</span>
              </StepHeaderMarkerBlock>

              <DynamicInputsWrapperBox>
                <FieldInputsGridTwinLayout>
                  <div>
                    <MicroFieldInlineLabel>Destination Phone Number</MicroFieldInlineLabel>
                    <FieldInputNode 
                      type="text" 
                      maxLength={11} 
                      placeholder="e.g. 08011111111" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      required 
                    />
                  </div>
                  <div>
                    <MicroFieldInlineLabel>Recharge Value Amount (₦)</MicroFieldInlineLabel>
                    <FieldInputNode 
                      type="number" 
                      min={50} 
                      max={50000} 
                      placeholder="Amount (e.g. 200)" 
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)} 
                      required 
                    />
                  </div>
                </FieldInputsGridTwinLayout>
              </DynamicInputsWrapperBox>

              <HorizontalSectionSplitterLine style={{margin: '8px 0'}} />

              <StepHeaderMarkerBlock>
                <StepIndexBadge>02</StepIndexBadge>
                <span className="title">Confirm Processing Allocation</span>
              </StepHeaderMarkerBlock>

              <CheckboxSelectionNode>
                <input 
                  type="checkbox" 
                  id="vtuSystemProcessingAccordConsentModal" 
                  checked={confirmedConsent}
                  onChange={(e) => setConfirmedConsent(e.target.checked)}
                />
                <label htmlFor="vtuSystemProcessingAccordConsentModal">
                  I confirm target configuration strings match the destination phone model. I authorize instant removal of ₦{parseFloat(amount || 0).toLocaleString()} from my wallet assets to finalize initialization logic routines.
                </label>
              </CheckboxSelectionNode>

            </ModalFormInputScrollContainerBody>

            <ModalFooterActionBoundaryRow>
              <CancelUtilityButton type="button" onClick={closeModalPipeline}>Abort Transaction</CancelUtilityButton>
              <ExecutionTriggerBtn style={{margin: '0', width: 'auto', padding: '10px 20px'}} type="submit" disabled={loading}>
                {loading ? "Transmitting payload..." : `Purchase Airtime Asset`}
              </ExecutionTriggerBtn>
            </ModalFooterActionBoundaryRow>

          </ModalContentWindowPane>
        </ModalFixedDimmerOverlay>
      )}
    </ViewShellFrame>
  );
};

export default AirtimeRechargeManagement;

/* --- UI RULES STYLING DESIGN PATTERNS --- */
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
  padding: 14px;
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
    width: 100%;
    p { margin: 6px 0 10px 0; font-size: 11px; line-height: 1.4; color: #64748b; min-height: 32px; }
    span { display: inline-block; font-size: 11px; font-weight: 700; color: #2563eb; background: #eff6ff; padding: 2px 6px; border-radius: 4px; }
  }
`;

const CarrierBadgeLabel = styled.span`
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
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
  width: 100%;
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

/* --- POP-OUT MODAL SYSTEM OVERLAYS ARCHITECTURE --- */
const ModalFixedDimmerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9999;
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
  max-width: 540px;
  max-height: 90vh;
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