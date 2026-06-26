import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Context } from './Context';

const Card = styled.div`
  max-width: 550px;
  margin: 30px auto;
  padding: 28px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  font-family: system-ui, -apple-system, sans-serif;
`;

const Title = styled.h2`
  margin: 0 0 4px 0;
  color: #1e293b;
  font-size: 1.4rem;
  font-weight: 700;
`;

const Sub = styled.p`
  margin: 0 0 24px 0;
  color: #64748b;
  font-size: 0.875rem;
`;

const FieldBlock = styled.div`
  margin-bottom: 18px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SelectField = styled.select`
  width: 100%;
  padding: 11px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
  background: #ffffff;
  outline: none;
  &:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.1); }
`;

const InputField = styled.input`
  width: 100%;
  padding: 11px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
  box-sizing: border-box;
  outline: none;
  &:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.1); }
`;

const FlexAction = styled.div`
  display: flex;
  gap: 10px;
`;

const VerifyBtn = styled.button`
  background: #0f172a;
  color: #ffffff;
  border: none;
  padding: 0 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: #1e293b; }
  &:disabled { background: #94a3b8; }
`;

const ResponseBox = styled.div`
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  h4 { margin: 0 0 6px 0; color: #166534; font-size: 0.95rem; }
  p { margin: 3px 0; color: #1f2937; font-size: 0.875rem; }
`;

const PayBtn = styled.button`
  width: 100%;
  background: #2563eb;
  color: #ffffff;
  padding: 13px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #1d4ed8; }
  &:disabled { background: #cbd5e1; cursor: not-allowed; }
`;

export default function ElectricityForm() {
  const [serviceID, setServiceID] = useState('ikeja-electric');
  const [meterType, setMeterType] = useState('prepaid');
  const [meterNumber, setMeterNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
   const {user,fetchUserProfileById,api_url}=useContext(Context)

  // Account State Checks
  const [validatedProfile, setValidatedProfile] = useState(null);
  const [checkingMeter, setCheckingMeter] = useState(false);

  const resetVerification = () => setValidatedProfile(null);

  // 1. Remote API Verification Routine
  const runMeterVerification = async () => {
    if (!meterNumber.trim()) {
      Swal.fire('Input Error', 'Please supply your meter number context.', 'warning');
      return;
    }
    setCheckingMeter(true);
    setValidatedProfile(null);

    try {
      const url = `${api_url}/electricity_payment.php?meterNumber=${encodeURIComponent(meterNumber.trim())}&meterType=${meterType}&serviceID=${serviceID}`;
      const res = await fetch(url, { method: 'GET' });
      const data = await res.json();

      if (data.success) {
        setValidatedProfile(data);
        Swal.fire({ icon: 'success', title: 'Meter Confirmed', text: data.customerName, timer: 1800, showConfirmButton: false });
      } else {
        Swal.fire('Verification Denied', data.error || 'Check details and try again.', 'error');
      }
    } catch (err) {
      Swal.fire('Connection Error', 'Could not run pipeline validation queries.', 'error');
    } finally {
      setCheckingMeter(false);
    }
  };

  // 2. Vending Execution Handler
const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!validatedProfile) {
      Swal.fire('Validation Missing', 'Please execute meter parameters confirmation checks first.', 'info');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Swal.fire('Formatting Error', 'Please set a valid monetary sum.', 'error');
      return;
    }

    // if (userBalance !== undefined && userBalance < numericAmount) {
    //   Swal.fire('Deficit Balance', 'Your local wallet store balance is insufficient.', 'error');
    //   return;
    // }

    const confirmationText = `Authorize ₦${numericAmount.toLocaleString()} utility token generation for account entry registered to: ${validatedProfile.customerName}?`;

    Swal.fire({
      title: 'Confirm Token Purchase',
      text: confirmationText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Authorize & Deduct Wallet'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({ title: 'Processing Utility Vending...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

          const response = await fetch(`${api_url}/electricity_payment.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // CHANGED HERE: capital JSON object
            body: JSON.stringify({
              userId:user?.id,
              meterNumber: meterNumber.trim(),
              meterType,
              serviceID,
              amount: numericAmount,
              phone: phone.trim()
            })
          });

          const data = await response.json();

          if (data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Purchase Successful',
              html: `<p>${data.message}</p>${data.token ? `<div style="background:#f1f5f9; padding:12px; font-weight:bold; letter-spacing:1px; font-size:1.3rem; margin-top:10px; border-radius:6px; color:#0f172a;">${data.token}</div>` : ''}`,
              confirmButtonColor: '#2563eb'
            });

            // Reset form configurations on success execution loops
            setMeterNumber('');
            setAmount('');
            setPhone('');
            setValidatedProfile(null);

          fetchUserProfileById();

          } else {
            Swal.fire('Vending Refused', data.error || 'Processing logic error.', 'error');
          }
        } catch (err) {
          Swal.fire('Process Crash', 'Critical system communication tracking fault.', 'error');
        }
      }
    });
  };

  return (
    <Card>
      <Title>Electricity Utility Hub</Title>
      <Sub>Dynamic cross-network token generation portal interfaces.</Sub>

      <form onSubmit={handlePaymentSubmit}>
        <FieldBlock>
          <Label>Select DisCo Network Provider</Label>
          <SelectField value={serviceID} onChange={(e) => { setServiceID(e.target.value); resetVerification(); }}>
            <option value="ikeja-electric">Ikeja Electric (IKEDC)</option>
            <option value="eko-electric">Eko Electric (EKEDC)</option>
            <option value="kano-electric">Kano Electric (KEDCO)</option>
            <option value="portharcourt-electric">Port Harcourt Electric (PHED)</option>
            <option value="jos-electric">Jos Electric (JED)</option>

             <option value="ibadan-electric">Ibadan Electric (IBEDC)</option>
            <option value="kaduna-electric">Kaduna Electric (KAEDCO)</option>
            <option value="abuja-electric">Abuja Electric (AEDC)</option>
            <option value="enugu-electric">Enugu Electric (EEDC)</option>
            <option value="benin-electric">Benin Electric (BEDC)</option>
            <option value="aba-electric">Aba Electric (ABA)</option>
 <option value="yola-electric">Yola Electric (YEDC)</option>
          </SelectField>
        </FieldBlock>

        <FieldBlock>
          <Label>Meter Operating Class</Label>
          <SelectField value={meterType} onChange={(e) => { setMeterType(e.target.value); resetVerification(); }}>
            <option value="prepaid">Prepaid (Token Mode)</option>
            <option value="postpaid">Postpaid (Bill Invoice Mode)</option>
          </SelectField>
        </FieldBlock>

        <FieldBlock>
          <Label>Meter Identification Code</Label>
          <FlexAction>
            <InputField type="text" placeholder="Enter meter account code number" value={meterNumber} onChange={(e) => { setMeterNumber(e.target.value); resetVerification(); }} required />
            <VerifyBtn type="button" onClick={runMeterVerification} disabled={checkingMeter}>
              {checkingMeter ? 'Validating...' : 'Verify'}
            </VerifyBtn>
          </FlexAction>
        </FieldBlock>

        {validatedProfile && (
          <ResponseBox>
            <h4>Profile Verification Authenticated</h4>
            <p><strong>Name:</strong> {validatedProfile.customerName}</p>
            <p><strong>Address:</strong> {validatedProfile.address}</p>
          </ResponseBox>
        )}

        <FieldBlock>
          <Label>Vending Cost Amount (₦)</Label>
          <InputField type="number" step="0.01" placeholder="Minimum amount allowed" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </FieldBlock>

        <FieldBlock>
          <Label>Recipient Mobile Notification Line</Label>
          <InputField type="tel" placeholder="e.g., 08031234567" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </FieldBlock>

        <PayBtn type="submit" disabled={!validatedProfile}>
          Execute Vending Action Order
        </PayBtn>
      </form>
    </Card>
  );
}