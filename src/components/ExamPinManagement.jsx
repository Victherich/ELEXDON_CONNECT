import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaUserGear, FaCircleInfo, FaCircleCheck, FaWallet, 
  FaFingerprint, FaClock, FaReceipt, FaFileSignature, FaXmark, FaGraduationCap, FaHashtag, FaEnvelope, FaPhone
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Context } from './Context';

const ExamPinManagement = () => {
  const { api_url, user, fetchUserProfileById } = useContext(Context);

  // Interface Control Anchors
  const [activeModal, setActiveModal] = useState(null); // 'waec' | 'neco' | 'nabteb' | 'jamb' | null
  const [confirmedConsent, setConfirmedConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyingJamb, setVerifyingJamb] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // Form Field State Management Matrices
  const [productCode, setProductCode] = useState('1');
  const [quantity, setQuantity] = useState(1);
  const [profileCode, setProfileCode] = useState('');
  const [jambEmail, setJambEmail] = useState('');
  const [jambPhone, setJambPhone] = useState('');
  const [verifiedCandidateName, setVerifiedCandidateName] = useState('');

  const providerMetaData = {
    waec: { name: 'WAEC Nigeria', themeColor: '#0f172a', bgColor: '#e2e8f0', textBrandColor: '#0f172a' },
    neco: { name: 'NECO National', themeColor: '#2563eb', bgColor: '#dbeafe', textBrandColor: '#1e40af' },
    nabteb: { name: 'NABTEB Board', themeColor: '#16a34a', bgColor: '#dcfce7', textBrandColor: '#166534' },
    jamb: { name: 'JAMB Board', themeColor: '#dc2626', bgColor: '#fee2e2', textBrandColor: '#991b1b' }
  };

  // Reset parameters when changing services
  useEffect(() => {
    setProductCode('1');
    setQuantity(1);
    setProfileCode('');
    setJambEmail('');
    setJambPhone('');
    setVerifiedCandidateName('');
  }, [activeModal]);

  const closeModalPipeline = () => {
    setActiveModal(null);
    setConfirmedConsent(false);
    setQuantity(1);
    setProfileCode('');
    setJambEmail('');
    setJambPhone('');
    setVerifiedCandidateName('');
  };

  // JAMB CANDIDATE VALIDATION SWITCH
  const handleVerifyJambCandidate = async () => {
    if (!profileCode) {
      Swal.fire({ icon: 'warning', title: 'Input Required', text: 'Please fill in the Candidate Profile Code field first.', confirmButtonColor: '#2563eb' });
      return;
    }

    setVerifyingJamb(true);
    setVerifiedCandidateName('');

    try {
      const response = await fetch(`${api_url}/verify_jamb.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          profilecode: profileCode,
          product_code: productCode
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setVerifiedCandidateName(data.candidate);
        Swal.fire({ icon: 'success', title: 'Verification Clear', text: `Verified Owner: ${data.candidate}`, confirmButtonColor: '#2563eb' });
      } else {
        Swal.fire({ icon: 'error', title: 'Lookup Core Rejected', text: data.error || 'Verification target could not be found.', confirmButtonColor: '#dc2626' });
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Socket Connection Timeout', text: 'Network layer error checking candidate metadata loops.', confirmButtonColor: '#dc2626' });
    } finally {
      setVerifyingJamb(false);
    }
  };

  // HANDLE ORDER FORM SUBMISSION
  const handleProcessExamPurchaseForm = (e) => {
    e.preventDefault();

    if (!confirmedConsent) {
      Swal.fire({ icon: 'warning', title: 'Authorization Required', text: 'Please check the systemic verification agreement parameters block.', confirmButtonColor: '#2563eb' });
      return;
    }

    if (activeModal === 'jamb' && (productCode === '1' || productCode === '2') && !verifiedCandidateName) {
      Swal.fire({ icon: 'error', title: 'Pre-Verification Needed', text: 'You must successfully verify the JAMB profile code string before purchasing.', confirmButtonColor: '#dc2626' });
      return;
    }

    Swal.fire({
      title: 'Confirm Token Generation',
      text: `Authorize generation processing loops for ${quantity}x allocation nodes of ${providerMetaData[activeModal]?.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Purchase PINs'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        setReceiptData(null);

        const payload = {
          userId: user?.id,
          service: activeModal,
          product_code: productCode,
          quantity: parseInt(quantity),
          profilecode: activeModal === 'jamb' ? profileCode : '',
          sender: activeModal === 'jamb' ? jambEmail : '',
          phone: activeModal === 'jamb' ? jambPhone : ''
        };

        try {
          const response = await fetch(`${api_url}/purchase_exampin.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          const data = await response.json();

          if (response.ok && data.success) {
            setReceiptData(data.data);
            Swal.fire({ icon: 'success', title: 'Tokens Issued Cleanly', text: 'Your Examination access parameters have been generated.', confirmButtonColor: '#2563eb' });
            fetchUserProfileById();
            closeModalPipeline();
          } else {
            Swal.fire({ icon: 'error', title: 'Transaction Voided', text: data.error || 'The distribution gateway rejected allocation constraints configuration settings.', confirmButtonColor: '#dc2626' });
          }
        } catch (error) {
          Swal.fire({ icon: 'error', title: 'Gateway Outage', text: 'Communication handshake timed out. Check local configuration routes.', confirmButtonColor: '#dc2626' });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  // Safe split helper matrix for multi-token responses (<=>)
  const parseGeneratedTokens = (pinsString) => {
    if (!pinsString) return [];
    return pinsString.split('<=>');
  };

  return (
    <ViewShellFrame>
      <HeaderLabelBoundary>
        <IconBoxWrapper><FaGraduationCap size={15} /></IconBoxWrapper>
        <div>
          <ViewMainTitle>Examination Result & Registration PIN Gateway</ViewMainTitle>
          <ViewSubTitle>Select educational assessment switch boards below to securely manufacture instant validation voucher tokens profiles.</ViewSubTitle>
        </div>
      </HeaderLabelBoundary>

      <WarningAdmonitionCallout>
        <FaCircleInfo size={14} style={{marginTop: '2px', flexShrink: '0'}} />
        <p><strong>Processing Node Notice:</strong> For JAMB UTME / Direct Entry operations, ensure profile strings are verified dynamically before running authorization routines to guarantee safe account routing maps.</p>
      </WarningAdmonitionCallout>

      <SplitLowerLayoutGrid>
        {/* BOARDS SELECTION PANELS */}
        <div>
          <SectionGridSubtitleLabel>Select Examination Board Infrastructure</SectionGridSubtitleLabel>
          <ServiceSelectionGridGroup>
            {[
              { id: 'waec', name: 'WAEC Board', desc: 'Generate WAEC Result Checking, GCE Registration, and Verification tokens instantly.' },
              { id: 'neco', name: 'NECO Corporate', desc: 'Secure high-priority NECO tokens and GCE profile scratch keys natively.' },
              { id: 'nabteb', name: 'NABTEB National', desc: 'Disburse direct components parameters access for technical board exam units.' },
              { id: 'jamb', name: 'JAMB Board / UTME', desc: 'Verify candidate profiles and disburse registration scratch PIN loops.' }
            ].map(board => {
              const meta = providerMetaData[board.id];
              return (
                <ServiceCardOptionItem key={board.id} type="button" onClick={() => setActiveModal(board.id)}>
                  <div className="meta-info">
                    <CarrierBadgeLabel style={{background: meta.bgColor, color: meta.textBrandColor}}>{meta.name}</CarrierBadgeLabel>
                    <p style={{marginTop: '6px'}}>{board.desc}</p>
                    <span>Open Terminal</span>
                  </div>
                </ServiceCardOptionItem>
              );
            })}
          </ServiceSelectionGridGroup>
        </div>

        {/* RECEIPTS & LEDGER PREVIEW PANELS */}
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
                <span>EXAMINATION VOUCHER DELIVERY TRACE SLIP</span>
              </CertificateHeaderRow>
              
              <SuccessBadgeLabelBannerRow>
                <FaCircleCheck size={18} />
                <div>
                  <h4>TRANSACTION ARCHITECTURE COMPLETED</h4>
                  <p>Ref ID: {receiptData.reference_id}</p>
                </div>
              </SuccessBadgeLabelBannerRow>

              <HorizontalDashedRuleLine />

              <ExtendedTextMetadataGridRowDetails>
                <div><label>PRODUCT UNIT</label><p>{receiptData.product_name}</p></div>
                <div><label>UNITS PRINTED</label><p>{receiptData.quantity} Copy</p></div>
                <div><label>TOTAL CHARGED</label><p>₦{parseFloat(receiptData.amount_charged).toLocaleString(undefined, {minimumFractionDigits: 2})}</p></div>
                <div><label>SYSTEM CLOCK</label><p style={{fontSize: '11px'}}>{receiptData.date}</p></div>
              </ExtendedTextMetadataGridRowDetails>

              <HorizontalDashedRuleLine />

              <AddressMetadataBoxWrapperBlock>
                <label style={{color: '#2563eb', fontWeight: '800'}}>MANUFACTURED SECURITY VOUCHER PIN(S)</label>
                <PinOutputContainerStackRow>
                  {parseGeneratedTokens(receiptData.pins).map((pin, index) => (
                    <SinglePinBoxToken key={index}>
                      <span className="index">PIN {String(index + 1).padStart(2, '0')}:</span>
                      <span className="token-string">{pin}</span>
                    </SinglePinBoxToken>
                  ))}
                </PinOutputContainerStackRow>
              </AddressMetadataBoxWrapperBlock>
            </ProfileIDCertificateDisplayCard>
          ) : (
            <EmptyStateNoticeFramePlaceholder>
              <FaGraduationCap size={24} />
              <h4>Voucher Manifest Container</h4>
              <p>Generated examination serial codes, clear tracking maps, and print parameters materialize straight inside this widget box context post execution validations.</p>
            </EmptyStateNoticeFramePlaceholder>
          )}
        </RightContextMetaTilePanel>
      </SplitLowerLayoutGrid>

      {/* MODAL CONFIGURATION MODULE CONTAINER */}
      {activeModal && (
        <ModalFixedDimmerOverlay onClick={closeModalPipeline}>
          <ModalContentWindowPane onClick={(e) => e.stopPropagation()} onSubmit={handleProcessExamPurchaseForm}>
            
            <ModalWindowHeaderContainer>
              <div>
                <h3>Access {providerMetaData[activeModal]?.name} Terminal</h3>
                <p>VTU Africa Direct Clearing Pipeline Interface</p>
              </div>
              <ModalDismissWindowCrossButton type="button" onClick={closeModalPipeline}>
                <FaXmark size={14} />
              </ModalDismissWindowCrossButton>
            </ModalWindowHeaderContainer>

            <ModalFormInputScrollContainerBody>
              
              <StepHeaderMarkerBlock>
                <StepIndexBadge>01</StepIndexBadge>
                <span className="title">Select Variation & Quantity</span>
              </StepHeaderMarkerBlock>

              <DynamicInputsWrapperBox>
                <FieldInputsGridTwinLayout>
                  <div>
                    <MicroFieldInlineLabel>Select Voucher Sub-Product Type</MicroFieldInlineLabel>
                    <FieldSelectNode value={productCode} onChange={(e) => setProductCode(e.target.value)} required>
                      {activeModal === 'waec' && (
                        <>
                          <option value="1">WAEC Result Checking PIN</option>
                          <option value="2">WAEC GCE Registration PIN</option>
                          <option value="3">WAEC Verification PIN</option>
                        </>
                      )}
                      {activeModal === 'neco' && (
                        <>
                          <option value="1">NECO Result Checking Token</option>
                          <option value="2">NECO GCE Registration PIN</option>
                        </>
                      )}
                      {activeModal === 'nabteb' && (
                        <>
                          <option value="1">NABTEB Result Checking PIN</option>
                          <option value="2">NABTEB GCE Registration PIN</option>
                        </>
                      )}
                      {activeModal === 'jamb' && (
                        <>
                          <option value="1">JAMB UTME Registration PIN</option>
                          <option value="2">JAMB Direct Entry Registration PIN</option>
                        </>
                      )}
                    </FieldSelectNode>
                  </div>
                  <div>
                    <MicroFieldInlineLabel>Batch Quantity Size</MicroFieldInlineLabel>
                    <FieldInputNode 
                      type="number" 
                      min={1} 
                      max={20} 
                      value={quantity} 
                      onChange={(e) => setQuantity(e.target.value)} 
                      required 
                    />
                  </div>
                </FieldInputsGridTwinLayout>
              </DynamicInputsWrapperBox>

              {/* JAMB CONDITIONAL VARIATION INPUT STRIPS */}
              {activeModal === 'jamb' && (
                <>
                  <HorizontalSectionSplitterLine style={{margin: '4px 0'}} />
                  <StepHeaderMarkerBlock>
                    <StepIndexBadge>02</StepIndexBadge>
                    <span className="title">Candidate Credentials Profile</span>
                  </StepHeaderMarkerBlock>

                  <DynamicInputsWrapperBox>
                    <FieldInputsGridTwinLayout>
                      <div>
                        <MicroFieldInlineLabel>JAMB Profile Code</MicroFieldInlineLabel>
                        <div style={{display: 'flex', gap: '4px'}}>
                          <FieldInputNode 
                            type="text" 
                            placeholder="e.g. 6828826915" 
                            value={profileCode} 
                            onChange={(e) => setProfileCode(e.target.value)}
                            required
                          />
                          <VerificationVerifyButton type="button" disabled={verifyingJamb} onClick={handleVerifyJambCandidate}>
                            {verifyingJamb ? '...' : 'Verify'}
                          </VerificationVerifyButton>
                        </div>
                      </div>
                      <div>
                        <MicroFieldInlineLabel>Delivery Recipient Phone</MicroFieldInlineLabel>
                        <FieldInputNode 
                          type="tel" 
                          placeholder="e.g. 08033333333" 
                          value={jambPhone} 
                          onChange={(e) => setJambPhone(e.target.value)}
                          required
                        />
                      </div>
                    </FieldInputsGridTwinLayout>

                    <div style={{marginTop: '4px'}}>
                      <MicroFieldInlineLabel>Delivery Recipient Email</MicroFieldInlineLabel>
                      <FieldInputNode 
                        type="email" 
                        placeholder="candidate@domain.com" 
                        value={jambEmail} 
                        onChange={(e) => setJambEmail(e.target.value)}
                        required
                      />
                    </div>

                    {verifiedCandidateName && (
                      <VerifiedCandidateNoticeBannerRow>
                        <FaUserGear size={12} />
                        <span><strong>Validated Profile:</strong> {verifiedCandidateName}</span>
                      </VerifiedCandidateNoticeBannerRow>
                    )}
                  </DynamicInputsWrapperBox>
                </>
              )}

              <HorizontalSectionSplitterLine style={{margin: '4px 0'}} />

              <StepHeaderMarkerBlock>
                <StepIndexBadge>{activeModal === 'jamb' ? '03' : '02'}</StepIndexBadge>
                <span className="title">Consent Authorization Clear</span>
              </StepHeaderMarkerBlock>

              <CheckboxSelectionNode>
                <input 
                  type="checkbox" 
                  id="examSystemProcessingConsentModal" 
                  checked={confirmedConsent}
                  onChange={(e) => setConfirmedConsent(e.target.checked)}
                />
                <label htmlFor="examSystemProcessingConsentModal">
                  I certify authorization criteria matches database parameters. I authorize systemic removal of equivalent charges from my balance to write secure PIN allocations out.
                </label>
              </CheckboxSelectionNode>

            </ModalFormInputScrollContainerBody>

            <ModalFooterActionBoundaryRow>
              <CancelUtilityButton type="button" onClick={closeModalPipeline}>Cancel</CancelUtilityButton>
              <ExecutionTriggerBtn style={{margin: '0', width: 'auto', padding: '10px 20px'}} type="submit" disabled={loading}>
                {loading ? "Constructing Request..." : `Generate Examination PIN`}
              </ExecutionTriggerBtn>
            </ModalFooterActionBoundaryRow>

          </ModalContentWindowPane>
        </ModalFixedDimmerOverlay>
      )}
    </ViewShellFrame>
  );
};

export default ExamPinManagement;

/* --- UI COMPONENTS STYLED-COMPONENTS MATRIX GRAPHICS --- */
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
const FieldSelectNode = styled.select` width: 100%; padding: 9px; font-size: 13px; border: 1px solid #cbd5e1; border-radius: 6px; outline: none; box-sizing: border-box; background: #f8fafc; cursor: pointer; &:focus { border-color: #2563eb; background: #ffffff; } `;
const VerificationVerifyButton = styled.button` background: #0f172a; color: #fff; border: none; padding: 0 14px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; &:hover { background: #1e293b; } &:disabled { background: #94a3b8; } `;
const VerifiedCandidateNoticeBannerRow = styled.div` display: flex; align-items: center; gap: 6px; background: #eff6ff; border: 1px solid #bfdbfe; padding: 8px; border-radius: 6px; font-size: 11px; color: #1e40af; `;
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
const AddressMetadataBoxWrapperBlock = styled.div` background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; label { font-size: 9px; font-weight: 600; color: #94a3b8; display: block; margin-bottom: 4px; } `;
const PinOutputContainerStackRow = styled.div` display: flex; flex-direction: column; gap: 4px; max-height: 140px; overflow-y: auto; `;
const SinglePinBoxToken = styled.div` background: #ffffff; border: 1px solid #cbd5e1; padding: 6px 8px; border-radius: 4px; display: flex; justify-content: space-between; font-family: monospace; font-size: 12px; .index { color: #64748b; font-weight: bold; } .token-string { color: #0f172a; font-weight: 800; letter-spacing: 0.05em; } `;
const ModalFixedDimmerOverlay = styled.div` position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box; `;
const ModalContentWindowPane = styled.form` background: #ffffff; border-radius: 12px; width: 100%; max-width: 540px; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04); border: 1px solid #e2e8f0; animation: modalScaleIn 0.18s cubic-bezier(0.34, 1.56, 0.64, 1); @keyframes modalScaleIn { from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } } `;
const ModalWindowHeaderContainer = styled.div` display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #e2e8f0; h3 { margin: 0; font-size: 14px; font-weight: 800; color: #0f172a; } p { margin: 2px 0 0 0; font-size: 11px; font-weight: 700; color: #2563eb; } `;
const ModalDismissWindowCrossButton = styled.button` background: #f1f5f9; border: 1px solid #cbd5e1; color: #475569; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; &:hover { background: #e2e8f0; color: #0f172a; } `;
const ModalFormInputScrollContainerBody = styled.div` padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; flex: 1; `;
const StepHeaderMarkerBlock = styled.div` display: flex; align-items: center; gap: 8px; margin-bottom: 4px; .title { font-size: 11px; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.02em; } `;
const StepIndexBadge = styled.div` background: #0f172a; color: #ffffff; font-size: 10px; font-weight: 800; width: 18px; height: 18px; border-radius: 4px; display: flex; align-items: center; justify-content: center; `;
const ModalFooterActionBoundaryRow = styled.div` padding: 12px 16px; border-top: 1px solid #e2e8f0; background: #f8fafc; border-radius: 0 0 12px 12px; display: flex; justify-content: flex-end; gap: 8px; `;
const CancelUtilityButton = styled.button` background: #ffffff; border: 1px solid #cbd5e1; color: #475569; padding: 10px 16px; font-size: 13px; font-weight: 700; border-radius: 6px; cursor: pointer; &:hover { background: #f1f5f9; color: #0f172a; } `;