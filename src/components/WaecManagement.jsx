import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaGraduationCap, FaCircleInfo, FaCircleCheck, FaWallet, 
  FaReceipt, FaXmark, FaMobileScreenButton, FaCopy 
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Context } from './Context';

const WaecManagement = () => {
  const { api_url, user, fetchUserProfileById } = useContext(Context);

  // Interface Control Anchors
  const [activeModal, setActiveModal] = useState(null); // 'waec-registration' | 'waec' | null
  const [confirmedConsent, setConfirmedConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Core Execution Fields
  const [phone, setPhone] = useState('');
  const [variations, setVariations] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState('');
  const [fetchingVariations, setFetchingVariations] = useState(false);

  const serviceMetaData = {
    'waec-registration': { name: 'WAEC Registration PIN', themeColor: '#00524d', bgColor: '#ccfbf1', textBrandColor: '#115e59', desc: 'Purchase official WAEC registration token keys for Private/School candidate streams.' },
    'waec': { name: 'WAEC Result Checker PIN', themeColor: '#2563eb', bgColor: '#eff6ff', textBrandColor: '#1e40af', desc: 'Generate instant WAEC directly accessible PIN tokens to view exam results.' }
  };

  // Fetch product variations dynamically whenever a category is selected
  useEffect(() => {
    if (!activeModal) return;

    console.log(activeModal)
    
    const loadVariations = async () => {
      setFetchingVariations(true);
      setVariations([]);
      setSelectedVariation('');
      try {
        const response = await fetch(`${api_url}/get_waec_variations.php?serviceID=${activeModal}`);
        const data = await response.json();
        if (data.success && data.variations) {
          setVariations(data.variations);
        } else {
          Swal.fire({ icon: 'error', title: 'Variation Error', text: 'Could not resolve product package indexes.' });
        }
      } catch (err) {
        console.error("Failed to query package variations matrix:", err);
      } finally {
        setFetchingVariations(false);
      }
    };

    loadVariations();
  }, [activeModal, api_url]);

  const closeModalPipeline = () => {
    setActiveModal(null);
    setConfirmedConsent(false);
    setPhone('');
    setSelectedVariation('');
  };

  const handleCopyToken = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Copied to clipboard', showConfirmButton: false, timer: 1500 });
  };

  const handleProcessPurchaseForm = (e) => {
    e.preventDefault();

    if (!confirmedConsent) {
      Swal.fire({ icon: 'warning', title: 'Authorization Required', text: 'Please check the verification checkbox block to proceed.', confirmButtonColor: '#2563eb' });
      return;
    }

    const targetPackage = variations.find(v => v.variation_code === selectedVariation);
    if (!targetPackage) {
      Swal.fire({ icon: 'error', title: 'Selection Missing', text: 'Please select a valid exam pin distribution option.', confirmButtonColor: '#dc2626' });
      return;
    }

    const targetAmount = parseFloat(targetPackage.variation_amount);

    Swal.fire({
      title: 'Confirm Pin Generation',
      text: `You will be charged ₦${targetAmount.toLocaleString()} to generate "${targetPackage.name}" sent to ${phone}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Purchase PIN'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setReceiptData(null);

        const payload = {
          userId: user.id,
          serviceID: activeModal,
          variation_code: targetPackage.variation_code,
          amount: targetAmount,
          phone: phone,
          consent: confirmedConsent
        };

        try {
          const response = await fetch(`${api_url}/purchase_waec.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          const data = await response.json();

          if (response.ok && data.success) {
            setReceiptData(data.data);
            Swal.fire({ icon: 'success', title: 'Token Dispatched', text: 'Your WAEC validation access pin has been created successfully.', confirmButtonColor: '#2563eb' });
            fetchUserProfileById(); 
            closeModalPipeline();
          } else {
            Swal.fire({ icon: 'error', title: 'Gateway Error', text: data.error || 'Transaction rejected by distribution infrastructure.', confirmButtonColor: '#dc2626' });
          }
        } catch (error) {
          Swal.fire({ icon: 'error', title: 'Connection Fault', text: 'Network connection handshake timed out.', confirmButtonColor: '#dc2626' });
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
          <ViewMainTitle>WAEC Examination Utilities Portal</ViewMainTitle>
          <ViewSubTitle>Generate official instant valid educational registration vouchers and checking code tokens parameters natively.</ViewSubTitle>
        </div>
      </HeaderLabelBoundary>

      <WarningAdmonitionCallout>
        <FaCircleInfo size={14} style={{marginTop: '2px', flexShrink: '0'}} />
        <p><strong>Token Security Parameter Note:</strong> Generated codes register instantly beneath the secure ledger database array system view dashboard below for permanent trace access logs mapping safely.</p>
      </WarningAdmonitionCallout>

      <SplitLowerLayoutGrid>
        {/* SELECT SYSTEM OPTION CARD MATRIX */}
        <div>
          <SectionGridSubtitleLabel>Select Voucher Subsystem</SectionGridSubtitleLabel>
          <ServiceSelectionGridGroup>
            {[
              { id: 'waec-registration' },
              { id: 'waec' }
            ].map(item => {
              const meta = serviceMetaData[item.id];
              return (
                <ServiceCardOptionItem key={item.id} type="button" onClick={() => setActiveModal(item.id)}>
                  <div className="meta-info">
                    <CarrierBadgeLabel style={{background: meta.bgColor, color: meta.textBrandColor}}>{meta.name}</CarrierBadgeLabel>
                    <p style={{marginTop: '6px'}}>{meta.desc}</p>
                    <span>Launch Provision Unit</span>
                  </div>
                </ServiceCardOptionItem>
              );
            })}
          </ServiceSelectionGridGroup>
        </div>

        {/* RIGHT METADATA TRANSIENT SLOTS VIEW */}
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
                <span>WAEC PIN ISSUANCE RECEIPT SLIP</span>
              </CertificateHeaderRow>
              
              <SuccessBadgeLabelBannerRow>
                <FaCircleCheck size={18} />
                <div>
                  <h4>VOUCHER DELIVERED SUCCESSFUL</h4>
                  <p>Ref ID: {receiptData.transaction_id}</p>
                </div>
              </SuccessBadgeLabelBannerRow>

              <HorizontalDashedRuleLine />

              <ExtendedTextMetadataGridRowDetails>
                <div><label>REQUEST SYSTEM ID</label><p style={{fontSize: '11px', fontFamily: 'monospace'}}>{receiptData.request_id}</p></div>
                <div><label>PRODUCT TYPE</label><p>{receiptData.service_name}</p></div>
                <div><label>LEDGER DEBIT VALUE</label><p>₦{parseFloat(receiptData.amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</p></div>
                <div><label>DISPATCH TARGET PHONE</label><p>{receiptData.recipient}</p></div>
              </ExtendedTextMetadataGridRowDetails>

              <TokenOutputCalloutContainerBlock>
                <div className="token-header-wrapper">
                  <label>GENERATED SECURITY CODE / TOKEN PIN</label>
                  <button type="button" onClick={() => handleCopyToken(receiptData.purchased_code)}><FaCopy size={11}/> Copy Pin</button>
                </div>
                <p className="token-string-field">{receiptData.purchased_code}</p>
              </TokenOutputCalloutContainerBlock>
            </ProfileIDCertificateDisplayCard>
          ) : (
            <EmptyStateNoticeFramePlaceholder>
              <FaGraduationCap size={24} />
              <h4>Receipt & Voucher Window</h4>
              <p>Generated security checker strings keys, serials parameters tracking records data render automatically within this block location pane following transaction successes.</p>
            </EmptyStateNoticeFramePlaceholder>
          )}
        </RightContextMetaTilePanel>
      </SplitLowerLayoutGrid>

      {/* --- REUSABLE MODAL CONFIGURATION STRINGS WINDOW MODULE --- */}
      {activeModal && (
        <ModalFixedDimmerOverlay onClick={closeModalPipeline}>
          <ModalContentWindowPane onClick={(e) => e.stopPropagation()} onSubmit={handleProcessPurchaseForm}>
            
            <ModalWindowHeaderContainer>
              <div>
                <h3>Generate {serviceMetaData[activeModal]?.name}</h3>
                <p>Education Voucher Infrastructure Route</p>
              </div>
              <ModalDismissWindowCrossButton type="button" onClick={closeModalPipeline}>
                <FaXmark size={14} />
              </ModalDismissWindowCrossButton>
            </ModalWindowHeaderContainer>

            <ModalFormInputScrollContainerBody>
              <StepHeaderMarkerBlock>
                <StepIndexBadge>01</StepIndexBadge>
                <span className="title">Select Plan & Target Destination</span>
              </StepHeaderMarkerBlock>

              <DynamicInputsWrapperBox>
                <FieldInputsGridTwinLayout>
                  <div>
                    <MicroFieldInlineLabel>Voucher Target Delivery Phone</MicroFieldInlineLabel>
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
                    <MicroFieldInlineLabel>Available Exam Packages Matrix</MicroFieldInlineLabel>
                    <select 
                      style={{width: '100%', padding: '9px', borderRadius: '6px', fontSize:'12px', background: '#f8fafc', border: '1px solid #cbd5e1', outline:'none'}}
                      value={selectedVariation}
                      onChange={(e) => setSelectedVariation(e.target.value)}
                      disabled={fetchingVariations}
                      required
                    >
                      <option value="">{fetchingVariations ? "-- Synchronizing options... --" : "-- Choose Variation --"}</option>
                      {variations.map(v => (
                        <option key={v.variation_code} value={v.variation_code}>
                          {v.name} (₦{parseFloat(v.variation_amount).toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>
                </FieldInputsGridTwinLayout>
              </DynamicInputsWrapperBox>

              <HorizontalSectionSplitterLine style={{margin: '8px 0'}} />

              <StepHeaderMarkerBlock>
                <StepIndexBadge>02</StepIndexBadge>
                <span className="title">System Processing Confirmation Accord</span>
              </StepHeaderMarkerBlock>

              <CheckboxSelectionNode>
                <input 
                  type="checkbox" 
                  id="waecVoucherAuthorizeConsentCheckBlock" 
                  checked={confirmedConsent}
                  onChange={(e) => setConfirmedConsent(e.target.checked)}
                />
                <label htmlFor="waecVoucherAuthorizeConsentCheckBlock">
                  I signify immediate validation system intent context authorization. I accept instant automatic ledger balance deduction based on the selected card voucher profile limits.
                </label>
              </CheckboxSelectionNode>
            </ModalFormInputScrollContainerBody>

            <ModalFooterActionBoundaryRow>
              <CancelUtilityButton type="button" onClick={closeModalPipeline}>Abort Generation</CancelUtilityButton>
              <ExecutionTriggerBtn style={{margin: '0', width: 'auto', padding: '10px 20px'}} type="submit" disabled={loading || fetchingVariations}>
                {loading ? "Authorizing switch..." : `Generate Examination PIN`}
              </ExecutionTriggerBtn>
            </ModalFooterActionBoundaryRow>

          </ModalContentWindowPane>
        </ModalFixedDimmerOverlay>
      )}
    </ViewShellFrame>
  );
};

export default WaecManagement;

/* --- UI STYLING ARCHITECTURE DESIGN RULES MATRICES --- */
const ViewShellFrame = styled.div` display: flex; flex-direction: column; gap: 10px; width: 100%; box-sizing: border-box; `;
const HeaderLabelBoundary = styled.div` display: flex; align-items: center; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; `;
const IconBoxWrapper = styled.div` width: 32px; height: 32px; background: #eef2f6; border: 1px solid #cbd5e1; color: #0f172a; border-radius: 6px; display: flex; align-items: center; justify-content: center; `;
const ViewMainTitle = styled.h2` font-size: 15px; font-weight: 800; color: #0f172a; margin: 0; `;
const ViewSubTitle = styled.p` font-size: 11px; color: #64748b; margin: 0; `;
const WarningAdmonitionCallout = styled.div` background: #fffbeb; border: 1px solid #fde68a; color: #b45309; border-radius: 8px; padding: 10px; display: flex; gap: 8px; align-items: flex-start; p { margin: 0; font-size: 11px; line-height: 1.4; } `;
const SplitLowerLayoutGrid = styled.div` display: grid; grid-template-columns: 1.4fr 1.1fr; gap: 10px; @media (max-width: 850px) { grid-template-columns: 1fr; } `;
const SectionGridSubtitleLabel = styled.h3` font-size: 12px; font-weight: 700; color: #475569; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.03em; `;
const ServiceSelectionGridGroup = styled.div` display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; @media (max-width: 550px) { grid-template-columns: 1fr; } `;
const ServiceCardOptionItem = styled.button` text-align: left; background: #ffffff; border: 1px solid #e2e8f0; padding: 14px; border-radius: 8px; display: flex; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); &:hover { border-color: #2563eb; transform: translateY(-1px); box-shadow: 0 4px 12px -3px rgba(37, 99, 235, 0.08); } .meta-info { width: 100%; p { margin: 6px 0 10px 0; font-size: 11px; line-height: 1.4; color: #64748b; min-height: 32px; } span { display: inline-block; font-size: 11px; font-weight: 700; color: #2563eb; background: #eff6ff; padding: 2px 6px; border-radius: 4px; } } `;
const CarrierBadgeLabel = styled.span` font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.02em; `;
const DynamicInputsWrapperBox = styled.div` background: #ffffff; display: flex; flex-direction: column; gap: 8px; `;
const FieldInputsGridTwinLayout = styled.div` display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; @media (max-width: 480px) { grid-template-columns: 1fr; } `;
const MicroFieldInlineLabel = styled.span` display: block; font-size: 10px; font-weight: 600; color: #64748b; margin-bottom: 3px; `;
const FieldInputNode = styled.input` width: 100%; padding: 9px; font-size: 13px; border: 1px solid #cbd5e1; border-radius: 6px; outline: none; box-sizing: border-box; background: #f8fafc; &:focus { border-color: #2563eb; background: #ffffff; } `;
const HorizontalSectionSplitterLine = styled.div` border-top: 1px dashed #e2e8f0; width: 100%; `;
const CheckboxSelectionNode = styled.div` display: flex; align-items: flex-start; gap: 8px; padding: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; input { margin-top: 2px; cursor: pointer; } label { font-size: 11px; line-height: 1.4; color: #334155; font-weight: 500; cursor: pointer; } `;
const ExecutionTriggerBtn = styled.button` background: #2563eb; color: #ffffff; border: none; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; transition: background 0.15s ease; &:hover { background: #1d4ed8; } &:disabled { background: #94a3b8; cursor: not-allowed; } `;
const RightContextMetaTilePanel = styled.div` display: flex; flex-direction: column; gap: 10px; `;
const WalletSummaryWidgetCard = styled.div` background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px; .label-cluster { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #64748b; font-weight: 600; } h3 { font-size: 18px; font-weight: 800; color: #0f172a; margin: 4px 0 0 0; } `;
const EmptyStateNoticeFramePlaceholder = styled.div` background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 20px 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; flex: 1; svg { color: #94a3b8; margin-bottom: 6px; } h4 { font-size: 12px; font-weight: 700; color: #475569; margin: 0; text-transform: uppercase; } p { font-size: 11px; line-height: 1.4; color: #64748b; margin: 4px 0 0 0; max-width: 250px; } `;
const ProfileIDCertificateDisplayCard = styled.div` background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 10px; `;
const CertificateHeaderRow = styled.div` display: flex; align-items: center; gap: 6px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; font-size: 10px; font-weight: 700; color: #475569; svg { color: #2563eb; } `;
const SuccessBadgeLabelBannerRow = styled.div` display: flex; align-items: center; gap: 10px; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 8px; border-radius: 6px; svg { color: #059669; } h4 { margin: 0; font-size: 11px; font-weight: 800; color: #065f46; } p { margin: 0; font-size: 11px; font-weight: 600; color: #047857; } `;
const HorizontalDashedRuleLine = styled.div` border-top: 1px dashed #e2e8f0; width: 100%; `;
const ExtendedTextMetadataGridRowDetails = styled.div` display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; label { font-size: 9px; font-weight: 600; color: #94a3b8; display: block; } p { font-size: 12px; font-weight: 700; color: #1e293b; margin: 0; } `;
const TokenOutputCalloutContainerBlock = styled.div` background: #f8fafc; border: 1px solid #2563eb; border-radius: 6px; padding: 10px; .token-header-wrapper { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; label { font-size: 9px; font-weight: 700; color: #2563eb; } button { background: #2563eb; border: none; color: white; padding: 2px 6px; font-size: 10px; font-weight:700; border-radius:4px; cursor: pointer; &:hover { background:#1d4ed8; } } } .token-string-field { font-size: 14px; font-family: monospace; font-weight: 800; color: #0f172a; margin: 4px 0 0 0; background: #ffffff; padding: 6px; border: 1px dashed #cbd5e1; border-radius: 4px; word-break: break-all; } `;
const ModalFixedDimmerOverlay = styled.div` position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box; `;
const ModalContentWindowPane = styled.form` background: #ffffff; border-radius: 12px; width: 100%; max-width: 540px; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04); border: 1px solid #e2e8f0; animation: modalScaleIn 0.18s cubic-bezier(0.34, 1.56, 0.64, 1); @keyframes modalScaleIn { from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } } `;
const ModalWindowHeaderContainer = styled.div` display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #e2e8f0; h3 { margin: 0; font-size: 14px; font-weight: 800; color: #0f172a; } p { margin: 2px 0 0 0; font-size: 11px; font-weight: 700; color: #2563eb; } `;
const ModalDismissWindowCrossButton = styled.button` background: #f1f5f9; border: 1px solid #cbd5e1; color: #475569; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; &:hover { background: #e2e8f0; color: #0f172a; } `;
const ModalFormInputScrollContainerBody = styled.div` padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; flex: 1; `;
const StepHeaderMarkerBlock = styled.div` display: flex; align-items: center; gap: 8px; margin-bottom: 4px; .title { font-size: 11px; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.02em; } `;
const StepIndexBadge = styled.div` background: #0f172a; color: #ffffff; font-size: 10px; font-weight: 800; width: 18px; height: 18px; border-radius: 4px; display: flex; align-items: center; justify-content: center; `;
const ModalFooterActionBoundaryRow = styled.div` padding: 12px 16px; border-top: 1px solid #e2e8f0; background: #f8fafc; border-radius: 0 0 12px 12px; display: flex; justify-content: flex-end; gap: 8px; `;
const CancelUtilityButton = styled.button` background: #ffffff; border: 1px solid #cbd5e1; color: #475569; padding: 10px 16px; font-size: 13px; font-weight: 700; border-radius: 6px; cursor: pointer; &:hover { background: #f1f5f9; color: #0f172a; } `;