import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Context } from '../Context';

// --- STYLED COMPONENTS (MAX 5PX MARGIN, PADDING & GAPS) ---

const PageWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 10px;
  background: #f8fafc;
  color: #0f172a;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

const Card = styled.section`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  padding: 10px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
`;

const BalanceBadge = styled.div`
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1d4ed8;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #334155;
`;

const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const TypeButton = styled.button`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${({ $active }) => ($active ? '#2563eb' : '#cbd5e1')};
  background: ${({ $active }) => ($active ? '#2563eb' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#0f172a')};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 12px;
  color: #0f172a;
  background: #ffffff;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const MeterRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: stretch;
`;

const VerifyButton = styled.button`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #0284c7;
  background: #0284c7;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #0369a1;
  }

  &:disabled {
    background: #94a3b8;
    border-color: #94a3b8;
    cursor: not-allowed;
  }
`;

const VerifiedBox = styled.div`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #bae6fd;
  background: #f0f9ff;
  color: #0369a1;
  font-size: 12px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 13px;
  color: #0f172a;
  background: #ffffff;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const QuickAmountRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const AmountChip = styled.button`
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid ${({ $selected }) => ($selected ? '#2563eb' : '#cbd5e1')};
  background: ${({ $selected }) => ($selected ? '#dbeafe' : '#f8fafc')};
  color: ${({ $selected }) => ($selected ? '#1e40af' : '#334155')};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background: #16a34a;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #15803d;
  }

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

const ReceiptBox = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #86efac;
  background: #f0fdf4;
  font-size: 12px;
  color: #14532d;
`;

const ReceiptLine = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 2px 0;
`;

// --- HELPERS & CONSTANTS ---

const DISCO_PLANS = [
  { code: 'ikeja-electric', name: 'Ikeja Electric (IKEDC)' },
  { code: 'eko-electric', name: 'Eko Electric (EKEDC)' },
  { code: 'abuja-electric', name: 'Abuja Electric (AEDC)' },
  { code: 'ibadan-electric', name: 'Ibadan Electric (IBEDC)' },
  { code: 'enugu-electric', name: 'Enugu Electric (EEDC)' },
  { code: 'portharcourt-electric', name: 'Port Harcourt Electric (PHED)' },
  { code: 'kano-electric', name: 'Kano Electric (KEDCO)' },
  { code: 'kaduna-electric', name: 'Kaduna Electric (KAEDCO)' },
  { code: 'benin-electric', name: 'Benin Electric (BEDC)' },
  { code: 'jos-electric', name: 'Jos Electric (JED)' },
  { code: 'yola-electric', name: 'Yola Electric (YEDC)' },
];

const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 10000, 20000];

const formatNaira = (value) =>
  `₦${Number(value || 0).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// --- MAIN COMPONENT ---

export default function PeyflexElectricityRecharge() {
  const { api_url, user } = useContext(Context);
  const userId = user?.id;
  const apiBaseUrl = `${api_url}/peyflex`;

  const [plan, setPlan] = useState('ikeja-electric');
  const [meterType, setMeterType] = useState('prepaid');
  const [meter, setMeter] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [verifying, setVerifying] = useState(false);

  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lastReceipt, setLastReceipt] = useState(null);

  const loadWalletBalance = useCallback(async () => {
    if (!userId) return;
    setLoadingWallet(true);
    try {
      const res = await fetch(
        `${apiBaseUrl}/get_wallet_summary.php?userId=${encodeURIComponent(userId)}`,
        { cache: 'no-store' }
      );
      const data = await res.json();
      if (data.success) {
        setBalance(Number(data.balance ?? 0));
      }
    } catch (err) {
      console.error('Failed to load wallet balance:', err);
    } finally {
      setLoadingWallet(false);
    }
  }, [apiBaseUrl, userId]);

  useEffect(() => {
    loadWalletBalance();
  }, [loadWalletBalance]);

  const cleanMeter = meter.replace(/\s+/g, '');
  const cleanPhone = phone.replace(/\D/g, '');
  const numericAmount = Number(amount);

  const handleMeterChange = (value) => {
    setMeter(value);
    setCustomerName('');
  };

  const handlePlanOrTypeChange = (nextPlan, nextType) => {
    if (nextPlan !== undefined) setPlan(nextPlan);
    if (nextType !== undefined) setMeterType(nextType);
    setCustomerName('');
  };

  const handleVerifyMeter = async () => {
    if (!cleanMeter || cleanMeter.length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Meter Required',
        text: 'Enter a valid meter number before verifying.',
      });
      return;
    }

    setVerifying(true);
    setCustomerName('');
    try {
      const params = new URLSearchParams({
        identifier: 'electricity',
        meter: cleanMeter,
        plan,
        type: meterType,
      });

      const res = await fetch(`${apiBaseUrl}/verify_meter.php?${params.toString()}`, {
        cache: 'no-store',
      });
      const data = await res.json();

      console.log(data)

      if (!res.ok || !data.success || !data.customer_name) {
        throw new Error(data.error || 'Meter verification failed.');
      }

      setCustomerName(data.customer_name);
      Swal.fire({
        icon: 'success',
        title: 'Meter Verified',
        text: data.customer_name,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: err.message || 'Unable to verify meter number.',
      });
    } finally {
      setVerifying(false);
    }
  };

  const validateForm = () => {
    if (!plan) {
      return 'Select an electricity DISCO.';
    }
    if (!cleanMeter || cleanMeter.length < 6) {
      return 'Enter a valid meter number.';
    }
    if (!customerName) {
      return 'Verify the meter number first to confirm customer name.';
    }
    if (cleanPhone.length !== 11) {
      return 'Enter a valid 11-digit phone number.';
    }
    if (!numericAmount || numericAmount < 100 || numericAmount > 500000) {
      return 'Enter an amount between ₦100 and ₦500,000.';
    }
    if (numericAmount > balance) {
      return 'Insufficient wallet balance for this meter recharge.';
    }
    return null;
  };

  const handleElectricityPurchase = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      Swal.fire({
        icon: 'warning',
        title: 'Check Details',
        text: validationError,
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${apiBaseUrl}/purchase_electricity.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: Number(userId),
          identifier: 'electricity',
          meter: cleanMeter,
          plan,
          amount: numericAmount,
          type: meterType,
          phone: cleanPhone,
          customer_name: customerName,
        }),
      });

      const result = await response.json();

      console.log(result)

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Electricity recharge failed.');
      }

      const updatedBalance =
        typeof result.new_balance === 'number'
          ? result.new_balance
          : Math.max(0, balance - numericAmount);

      setBalance(updatedBalance);

      const txRecord = result.transaction || {
        id: Date.now().toString(),
        reference: Date.now().toString(),
        service: `${plan.toUpperCase()} (${meterType.toUpperCase()}) Meter ${cleanMeter}`,
        recipient: cleanMeter,
        customer_name: customerName,
        token: result.token || '',
        amount: numericAmount,
        initial_balance: balance,
        final_balance: updatedBalance,
        status: 'success',
        created_at: new Date().toISOString(),
      };

      setLastReceipt(txRecord);
      setAmount('');

      Swal.fire({
        icon: 'success',
        title: 'Electricity Recharged',
        text: txRecord.token
          ? `Token: ${txRecord.token}`
          : `${formatNaira(txRecord.amount)} applied to meter ${cleanMeter}`,
        confirmButtonText: 'OK',
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Recharge Failed',
        text: err.message || 'Unable to process electricity recharge right now.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <GridLayout>
        <Card>
          <HeaderRow>
            <Title>Electricity Meter Top-Up</Title>
            <BalanceBadge>
              {loadingWallet ? 'Loading...' : `Wallet: ${formatNaira(balance)}`}
            </BalanceBadge>
          </HeaderRow>

          <form onSubmit={handleElectricityPurchase}>
            <FieldGroup>
              <Label htmlFor="disco-select">Electricity Provider (DISCO)</Label>
              <Select
                id="disco-select"
                value={plan}
                onChange={(e) => handlePlanOrTypeChange(e.target.value, undefined)}
              >
                {DISCO_PLANS.map((disco) => (
                  <option key={disco.code} value={disco.code}>
                    {disco.name}
                  </option>
                ))}
              </Select>
            </FieldGroup>

            <FieldGroup>
              <Label>Meter Type</Label>
              <TypeGrid>
                <TypeButton
                  type="button"
                  $active={meterType === 'prepaid'}
                  onClick={() => handlePlanOrTypeChange(undefined, 'prepaid')}
                >
                  PREPAID
                </TypeButton>
                <TypeButton
                  type="button"
                  $active={meterType === 'postpaid'}
                  onClick={() => handlePlanOrTypeChange(undefined, 'postpaid')}
                >
                  POSTPAID
                </TypeButton>
              </TypeGrid>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="meter-number">Meter Number</Label>
              <MeterRow>
                <Input
                  id="meter-number"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter meter number"
                  value={meter}
                  onChange={(e) => handleMeterChange(e.target.value)}
                  required
                />
                <VerifyButton
                  type="button"
                  disabled={verifying}
                  onClick={handleVerifyMeter}
                >
                  {verifying ? 'Verifying...' : 'Verify Meter'}
                </VerifyButton>
              </MeterRow>
              {customerName && (
                <VerifiedBox>Customer: {customerName}</VerifiedBox>
              )}
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="customer-phone">Customer Phone Number (11 digits)</Label>
              <Input
                id="customer-phone"
                type="tel"
                inputMode="numeric"
                maxLength={11}
                placeholder="08012345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                required
              />
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="electricity-amount">Amount (₦100 - ₦500,000)</Label>
              <Input
                id="electricity-amount"
                type="number"
                min={100}
                max={500000}
                step="any"
                placeholder="Enter amount in NGN"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <QuickAmountRow>
                {QUICK_AMOUNTS.map((preset) => (
                  <AmountChip
                    key={preset}
                    type="button"
                    $selected={numericAmount === preset}
                    onClick={() => setAmount(String(preset))}
                  >
                    ₦{preset.toLocaleString('en-NG')}
                  </AmountChip>
                ))}
              </QuickAmountRow>
            </FieldGroup>

            <SubmitButton type="submit" disabled={submitting || !customerName}>
              {submitting
                ? 'Processing Recharge...'
                : `Pay Electricity${numericAmount >= 100 ? ` (${formatNaira(numericAmount)})` : ''}`}
            </SubmitButton>
          </form>

          {lastReceipt && (
            <ReceiptBox>
              <ReceiptLine>
                <strong>Service</strong>
                <span>{lastReceipt.service}</span>
              </ReceiptLine>
              {lastReceipt.customer_name && (
                <ReceiptLine>
                  <strong>Customer</strong>
                  <span>{lastReceipt.customer_name}</span>
                </ReceiptLine>
              )}
              {lastReceipt.token && (
                <ReceiptLine>
                  <strong>Token</strong>
                  <span>{lastReceipt.token}</span>
                </ReceiptLine>
              )}
              <ReceiptLine>
                <strong>Amount</strong>
                <span>{formatNaira(lastReceipt.amount)}</span>
              </ReceiptLine>
              <ReceiptLine>
                <strong>New Balance</strong>
                <span>{formatNaira(lastReceipt.final_balance)}</span>
              </ReceiptLine>
              <ReceiptLine>
                <strong>Reference</strong>
                <span>{lastReceipt.reference}</span>
              </ReceiptLine>
            </ReceiptBox>
          )}
        </Card>
      </GridLayout>
    </PageWrapper>
  );
}