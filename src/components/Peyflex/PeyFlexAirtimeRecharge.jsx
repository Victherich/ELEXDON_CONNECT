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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.section`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
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
  font-size: 1.1rem;
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

const NetworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const NetworkButton = styled.button`
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

const NETWORK_COLORS = {
  mtn: '#eab308',
  glo: '#16a34a',
  airtel: '#dc2626',
  '9mobile': '#0d9488',
};

const DEFAULT_NETWORKS = [
  { id: 'mtn', name: 'MTN' },
  { id: 'glo', name: 'GLO' },
  { id: 'airtel', name: 'AIRTEL' },
];

const QUICK_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];

const formatNaira = (value) =>
  `₦${Number(value || 0).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// --- MAIN COMPONENT ---

export default function PeyflexAirtimeRecharge(
) {
  const [networks, setNetworks] = useState(DEFAULT_NETWORKS);
  const [selectedNetwork, setSelectedNetwork] = useState('mtn');
  const [balance, setBalance] = useState(0);

  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [lastReceipt, setLastReceipt] = useState(null);

  const {api_url, user} = useContext(Context);
   const userId = user?.id
  const apiBaseUrl = `${api_url}/peyflex`

  console.log(networks)

  const loadNetworks = useCallback(async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/get_airtime_networks.php`, {
        cache: 'no-store',
      });
      const data = await res.json();

      // console.log(data)
      if (data.success && Array.isArray(data.networks) && data.networks.length > 0) {
        setNetworks(data.networks);
        setSelectedNetwork((prev) =>
          data.networks.some((n) => n.id === prev) ? prev : data.networks[0].id
        );
      }
    } catch (err) {
      console.error('Failed to load Peyflex networks:', err);
    }
  }, [apiBaseUrl]);

  const loadWalletAndTransactions = useCallback(async () => {
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
      console.error('Failed to load wallet summary:', err);
    } finally {
      setLoadingWallet(false);
    }
  }, [apiBaseUrl, userId]);

  useEffect(() => {
    loadNetworks();
    loadWalletAndTransactions();
  }, [loadNetworks, loadWalletAndTransactions]);

  const numericAmount = Number(amount);
  const cleanPhone = phone.replace(/\D/g, '');

  const validateForm = () => {
    if (!selectedNetwork) {
      return 'Select a mobile network.';
    }
    if (cleanPhone.length !== 11) {
      return 'Enter a valid 11-digit phone number.';
    }
    if (!numericAmount || numericAmount < 50 || numericAmount > 50000) {
      return 'Enter an amount between ₦50 and ₦50,000.';
    }
    if (numericAmount > balance) {
      return 'Insufficient wallet balance for this recharge.';
    }
    return null;
  };

  const handleRecharge = async (e) => {
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
      const response = await fetch(`${apiBaseUrl}/purchase_airtime.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: Number(userId),
          network: selectedNetwork,
          phone: cleanPhone,
          amount: numericAmount,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Airtime recharge failed.');
      }

      const updatedBalance =
        typeof result.new_balance === 'number'
          ? result.new_balance
          : Math.max(0, balance - numericAmount);

      setBalance(updatedBalance);

      const txRecord = result.transaction || {
        id: Date.now().toString(),
        reference: Date.now().toString(),
        service: `${selectedNetwork.toUpperCase()} Airtime VTU`,
        recipient: cleanPhone,
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
        title: 'Recharge Successful',
        text: `${formatNaira(txRecord.amount)} sent to ${txRecord.recipient}`,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Recharge Failed',
        text: err.message || 'Unable to process airtime right now.',
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
            <Title>Airtime Top-Up</Title>
            <BalanceBadge>
              {loadingWallet ? 'Loading...' : `Wallet: ${formatNaira(balance)}`}
            </BalanceBadge>
          </HeaderRow>

          <form onSubmit={handleRecharge}>
            <FieldGroup>
              <Label>Network</Label>
              <NetworkGrid>
                {networks.map((net) => {
                  const id = String(net.id).toLowerCase();
                  return (
                    <NetworkButton
                      key={id}
                      type="button"
                      $active={selectedNetwork === id}
                      $accent={NETWORK_COLORS[id] || '#2563eb'}
                      onClick={() => setSelectedNetwork(id)}
                    >
                      {net.name}
                    </NetworkButton>
                  );
                })}
              </NetworkGrid>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="airtime-phone">Phone Number (11 digits)</Label>
              <Input
                id="airtime-phone"
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
              <Label htmlFor="airtime-amount">Amount (₦50 - ₦50,000)</Label>
              <Input
                id="airtime-amount"
                type="number"
                min={50}
                max={50000}
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

            <SubmitButton type="submit" disabled={submitting}>
              {submitting
                ? 'Processing Recharge...'
                : `Buy Airtime${numericAmount >= 50 ? ` (${formatNaira(numericAmount)})` : ''}`}
            </SubmitButton>
          </form>

          {lastReceipt && (
            <ReceiptBox>
              <ReceiptLine>
                <strong>Service</strong>
                <span>{lastReceipt.service}</span>
              </ReceiptLine>
              <ReceiptLine>
                <strong>Recipient</strong>
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