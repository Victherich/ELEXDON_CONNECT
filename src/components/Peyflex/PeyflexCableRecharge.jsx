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

const ProviderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const ProviderButton = styled.button`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${({ $active, $accent }) => ($active ? $accent : '#cbd5e1')};
  background: ${({ $active, $accent }) => ($active ? $accent : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#0f172a')};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: ${({ $accent }) => $accent};
  }
`;

const IucRow = styled.div`
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

const HelperText = styled.span`
  font-size: 11px;
  color: #64748b;
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

const PROVIDERS = [
  { id: 'dstv', name: 'DSTV', accent: '#0284c7' },
  { id: 'gotv', name: 'GOTV', accent: '#16a34a' },
  { id: 'startimes', name: 'STARTIMES', accent: '#ea580c' },
];

const formatNaira = (value) =>
  `₦${Number(value || 0).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// --- MAIN COMPONENT ---

export default function PeyflexCableRecharge() {
  const { api_url, user } = useContext(Context);
  const userId = user?.id;
  const apiBaseUrl = `${api_url}/peyflex`;

  const [identifier, setIdentifier] = useState('startimes');
  const [plans, setPlans] = useState([]);
  const [selectedPlanCode, setSelectedPlanCode] = useState('');
  const [loadingPlans, setLoadingPlans] = useState(false);

  const [iuc, setIuc] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [currentBouquet, setCurrentBouquet] = useState('');
  const [verifying, setVerifying] = useState(false);

  const [phone, setPhone] = useState('');
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

  const loadCablePlans = useCallback(
    async (providerId) => {
      if (!providerId) return;
      setLoadingPlans(true);
      setPlans([]);
      setSelectedPlanCode('');
      try {
        const res = await fetch(
          `${apiBaseUrl}/get_cable_plans.php?identifier=${encodeURIComponent(providerId)}`,
          { cache: 'no-store' }
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.plans) && data.plans.length > 0) {
          setPlans(data.plans);
          setSelectedPlanCode(data.plans[0].code);
        }
      } catch (err) {
        console.error('Failed to load cable plans:', err);
      } finally {
        setLoadingPlans(false);
      }
    },
    [apiBaseUrl]
  );

  useEffect(() => {
    loadWalletBalance();
  }, [loadWalletBalance]);

  useEffect(() => {
    loadCablePlans(identifier);
  }, [identifier, loadCablePlans]);

  const activePlan = plans.find((p) => p.code === selectedPlanCode) || null;
  const planAmount = activePlan ? Number(activePlan.amount || 0) : 0;
  const cleanIuc = iuc.replace(/\s+/g, '');
  const cleanPhone = phone.replace(/\D/g, '');

  const handleProviderChange = (nextProvider) => {
    setIdentifier(nextProvider);
    setCustomerName('');
    setCurrentBouquet('');
  };

  const handleIucChange = (val) => {
    setIuc(val);
    setCustomerName('');
    setCurrentBouquet('');
  };

  const handleVerifyIuc = async () => {
    if (!cleanIuc || cleanIuc.length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'IUC Required',
        text: 'Enter a valid IUC / smartcard number first.',
      });
      return;
    }

    setVerifying(true);
    setCustomerName('');
    setCurrentBouquet('');
    try {
      const params = new URLSearchParams({
        identifier,
        iuc: cleanIuc,
      });

      const res = await fetch(`${apiBaseUrl}/verify_cable_iuc.php?${params.toString()}`, {
        cache: 'no-store',
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'IUC verification failed.');
      }

      const resolvedName = data.customer_name || 'Verified Decoder';
      setCustomerName(resolvedName);
      setCurrentBouquet(data.current_bouquet || '');

      Swal.fire({
        icon: 'success',
        title: 'IUC Verified',
        text: resolvedName,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: err.message || 'Unable to verify IUC number.',
      });
    } finally {
      setVerifying(false);
    }
  };

  const validateForm = () => {
    if (!identifier) {
      return 'Select a cable TV provider.';
    }
    if (!cleanIuc || cleanIuc.length < 6) {
      return 'Enter a valid IUC / smartcard number.';
    }
    if (!customerName) {
      return 'Verify the IUC number before subscribing.';
    }
    if (!activePlan || !activePlan.code) {
      return 'Select a cable subscription plan.';
    }
    if (cleanPhone.length !== 11) {
      return 'Enter a valid 11-digit phone number.';
    }
    if (planAmount <= 0) {
      return 'Invalid subscription amount.';
    }
    if (planAmount > balance) {
      return 'Insufficient wallet balance for this cable subscription.';
    }
    return null;
  };

  const handleCablePurchase = async (e) => {
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
      const response = await fetch(`${apiBaseUrl}/purchase_cable.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: Number(userId),
          identifier,
          plan: activePlan.code,
          plan_label: activePlan.label,
          iuc: cleanIuc,
          phone: cleanPhone,
          amount: planAmount,
          customer_name: customerName,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Cable TV subscription failed.');
      }

      const updatedBalance =
        typeof result.new_balance === 'number'
          ? result.new_balance
          : Math.max(0, balance - planAmount);

      setBalance(updatedBalance);

      const txRecord = result.transaction || {
        id: Date.now().toString(),
        reference: Date.now().toString(),
        service: `${identifier.toUpperCase()} Cable (${activePlan.label})`,
        recipient: cleanIuc,
        customer_name: customerName,
        amount: planAmount,
        initial_balance: balance,
        final_balance: updatedBalance,
        status: 'success',
        created_at: new Date().toISOString(),
      };

      setLastReceipt(txRecord);

      Swal.fire({
        icon: 'success',
        title: 'Subscription Active',
        text: `${activePlan.label} applied to IUC ${cleanIuc}`,
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Subscription Failed',
        text: err.message || 'Unable to process cable recharge right now.',
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
            <Title>Cable TV Subscription</Title>
            <BalanceBadge>
              {loadingWallet ? 'Loading...' : `Wallet: ${formatNaira(balance)}`}
            </BalanceBadge>
          </HeaderRow>

          <form onSubmit={handleCablePurchase}>
            <FieldGroup>
              <Label>Cable Provider</Label>
              <ProviderGrid>
                {PROVIDERS.map((prov) => (
                  <ProviderButton
                    key={prov.id}
                    type="button"
                    $active={identifier === prov.id}
                    $accent={prov.accent}
                    onClick={() => handleProviderChange(prov.id)}
                  >
                    {prov.name}
                  </ProviderButton>
                ))}
              </ProviderGrid>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="cable-iuc">IUC / Smartcard Number</Label>
              <IucRow>
                <Input
                  id="cable-iuc"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter IUC / Smartcard number"
                  value={iuc}
                  onChange={(e) => handleIucChange(e.target.value)}
                  required
                />
                <VerifyButton
                  type="button"
                  disabled={verifying}
                  onClick={handleVerifyIuc}
                >
                  {verifying ? 'Verifying...' : 'Verify IUC'}
                </VerifyButton>
              </IucRow>
              {customerName && (
                <VerifiedBox>
                  Customer: {customerName}
                  {currentBouquet ? ` • Current: ${currentBouquet}` : ''}
                </VerifiedBox>
              )}
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="cable-plan-select">Select Bouquet / Plan</Label>
              {loadingPlans ? (
                <HelperText>Loading bouquets...</HelperText>
              ) : (
                <Select
                  id="cable-plan-select"
                  value={selectedPlanCode}
                  onChange={(e) => setSelectedPlanCode(e.target.value)}
                >
                  {plans.map((plan, idx) => (
                    <option key={`${plan.code}-${idx}`} value={plan.code}>
                      {plan.label} — {formatNaira(plan.amount)}
                    </option>
                  ))}
                </Select>
              )}
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="cable-phone">Phone Number (11 digits)</Label>
              <Input
                id="cable-phone"
                type="tel"
                inputMode="numeric"
                maxLength={11}
                placeholder="08144216361"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                required
              />
            </FieldGroup>

            <SubmitButton type="submit" disabled={submitting || !activePlan || !customerName}>
              {submitting
                ? 'Processing Subscription...'
                : `Subscribe Cable${activePlan ? ` (${formatNaira(planAmount)})` : ''}`}
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
              <ReceiptLine>
                <strong>IUC</strong>
                <span>{lastReceipt.recipient}</span>
              </ReceiptLine>
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