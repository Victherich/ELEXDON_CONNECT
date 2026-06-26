import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Context } from './Context';
import Swal from 'sweetalert2';

export default function DataPurchasePage() {

  const navigate = useNavigate();
  
  // Dynamic network context mapping
  const {serviceID} = useParams();

 
  const { api_url, user, fetchUserProfileById } = useContext(Context);

  // State parameters
  const [variations, setVariations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [phone, setPhone] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const activeUserId = user?.id;

  useEffect(() => {
    setLoading(true);
    setFeedback({ type: '', text: '' });

    // FIXED: Appends the context search variable so the backend fetches the correct carrier variations
    fetch(`${api_url}/purchase_data.php?serviceID=${serviceID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVariations(data.variations);
        } else {
          setFeedback({ type: 'error', text: data.error || 'Failed to load variation matrix bundles.' });
        }
        setLoading(false);
      })
      .catch(() => {
        setFeedback({ type: 'error', text: 'Error establishing a baseline interface network link.' });
        setLoading(false);
      });
  }, [serviceID, api_url]);

  const handleSubmit = (e) => {
  e.preventDefault();
  
  // 1. Initial Validation Checks
  if (!activeUserId) {
    setFeedback({ type: 'error', text: 'User session validation error. Please log in again.' });
    return;
  }

  if (!phone || !selectedPlan) {
    setFeedback({ type: 'error', text: 'Please fill in all entry configurations correctly.' });
    return;
  }

  const currentBundle = variations.find(v => v.variation_code === selectedPlan);
  if (!currentBundle) return;

  // 2. Extract and parse data specific attributes for the alert message
  const displayAmount = parseFloat(currentBundle.variation_amount);

  // 3. Trigger SweetAlert2 confirmation
  Swal.fire({
    title: 'Confirm Data Purchase',
    text: `You will be charged ₦${displayAmount.toLocaleString()} to purchase ${serviceID?.toUpperCase()} data (${currentBundle.name}) for the recipient line ${phone}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3182ce',
    cancelButtonColor: '#718096',
    confirmButtonText: 'Yes, Buy Data',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    // Proceed ONLY if user clicks confirm button
    if (result.isConfirmed) {
      setSubmitting(true);
      setFeedback({ type: '', text: '' });

      fetch(`${api_url}/purchase_data.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: activeUserId,
          phone: phone,
          variation_code: currentBundle.variation_code,
          amount: displayAmount,
          serviceID: serviceID 
        })
      })
        .then((res) => res.json())
        .then((data) => {
          setSubmitting(false);
          if (data.success) {
            setFeedback({ type: 'success', text: data.message || 'Data package routed successfully!' });
            setPhone('');
            setSelectedPlan('');

            if (typeof fetchUserProfileById === 'function') {
              fetchUserProfileById(activeUserId);
            }
          } else {
            setFeedback({ type: 'error', text: data.error });
          }
        })
        .catch(() => {
          setSubmitting(false);
          setFeedback({ type: 'error', text: 'Fatal runtime gateway socket drop recorded.' });
        });
    }
  });
};



  if (loading) {
    return <StatusCenter>Synchronizing Bundle Matrix Framework...</StatusCenter>;
  }

  return (
    <PageStructure>
      <FormCard>
        <BackButton onClick={() => navigate('/userdashboard/service/datarecharge')}>← Choose Different Network</BackButton>
        
      <BrandHeading>
  <div className="text-section">
    <h2>{serviceID?.toUpperCase()} Data Top-up</h2>
    <p>Provide validation details to map dynamic recharge parameters directly to recipient hardware.</p>
  </div>
  <BalanceBadge>
    <span className="label">Wallet Balance</span>
    <span className="amount">
      {user?.balance !== undefined && user?.balance !== null
        ? `₦${parseFloat(user.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : '₦0.00'
      }
    </span>
  </BalanceBadge>
</BrandHeading>

        {feedback.text && (
          <FeedbackPanel error={feedback.type === 'error'}>
            {feedback.text}
          </FeedbackPanel>
        )}

        <MainForm onSubmit={handleSubmit}>
          <FormGroup>
            <label>Target Mobile Identity</label>
            <input 
              type="tel" 
              maxLength="11" 
              placeholder="e.g. 08011111111 (Use for Sandbox Success)" 
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Available Subscription Bundles</label>
            <select 
              value={selectedPlan} 
              onChange={(e) => setSelectedPlan(e.target.value)}
              required
            >
              <option value="">-- Choose Data Package Structure --</option>
              {variations.map((v) => (
                <option key={v.variation_code} value={v.variation_code}>
                  {v.name} (₦{parseFloat(v.variation_amount).toLocaleString()})
                </option>
              ))}
            </select>
          </FormGroup>

          <SubmitAction type="submit" disabled={submitting}>
            {submitting ? 'Authorizing Transactions Block...' : 'Initialize Secure Charging Lifecycle'}
          </SubmitAction>
        </MainForm>
      </FormCard>
    </PageStructure>
  );
}

// --- STRUCTURED PRESENTATION RENDERING SCHEMAS ---
const PageStructure = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f6f9;
  padding: 5px;
  box-sizing: border-box;
  font-family: system-ui, sans-serif;
`;

const FormCard = styled.div`
  background: #fff;
  padding: 10px;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  width: 100%;
  max-width: 480px;
  box-sizing: border-box;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #4a5568;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-bottom: 24px;
  transition: color 0.2s;
  &:hover { color: #1a202c; }
`;

const BrandHeading = styled.div`
  margin-bottom: 28px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;

  .text-section {
    flex: 1;
    h2 { margin: 0 0 6px 0; color: #1a202c; font-size: 20px; }
    p { margin: 0; font-size: 13px; color: #718096; line-height: 1.4; }
  }
`;

const MainForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  label { font-size: 13px; font-weight: 600; color: #4a5568; }
  input, select {
    padding: 12px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    background: #fff;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s;
    &:focus { border-color: #3182ce; }
  }
`;

const FeedbackPanel = styled.div`
  padding: 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
  background: ${props => props.error ? '#fff5f5' : '#f0fff4'};
  color: ${props => props.error ? '#e53e3e' : '#38a169'};
  border: 1px solid ${props => props.error ? '#fed7d7' : '#c6f6d5'};
`;

const SubmitAction = styled.button`
  background: #3182ce;
  color: #fff;
  border: none;
  padding: 14px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  transition: background 0.2s;
  &:hover { background: #2b6cb0; }
  &:disabled { background: #cbd5e0; cursor: not-allowed; }
`;

const StatusCenter = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #718096;
  font-weight: 500;
`;

const BalanceBadge = styled.div`
  background: #f0f7ff;
  border: 1px solid #d0e6ff;
  padding: 8px 14px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  white-space: nowrap;

  .label {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 700;
    color: #2b6cb0;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
  }

  .amount {
    font-size: 15px;
    font-weight: 700;
    color: #2b6cb0;
  }
`;