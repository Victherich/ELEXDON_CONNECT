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

const NetworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const NetworkButton = styled.button`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${({ $active, $accent }) => ($active ? $accent : '#cbd5e1')};
  background: ${({ $active, $accent }) => ($active ? $accent : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#0f172a')};
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  text-align: center;

  &:hover {
    border-color: ${({ $accent }) => $accent};
  }
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

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  max-height: 220px;
  overflow-y: auto;
  padding: 2px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const PlanCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${({ $selected }) => ($selected ? '#2563eb' : '#cbd5e1')};
  background: ${({ $selected }) => ($selected ? '#eff6ff' : '#ffffff')};
  color: #0f172a;
  text-align: left;
  cursor: pointer;

  &:hover {
    border-color: #2563eb;
  }
`;

const PlanLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #0f172a;
`;

const PlanPrice = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #16a34a;
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

const getAccentByIdentifier = (identifier = '') => {
  const key = String(identifier).toLowerCase();
  if (key.includes('mtn')) return '#ca8a04';
  if (key.includes('glo')) return '#16a34a';
  if (key.includes('airtel')) return '#dc2626';
  if (key.includes('9mobile') || key.includes('etisalat')) return '#0d9488';
  return '#2563eb';
};

const formatNaira = (value) =>
  `₦${Number(value || 0).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

// --- MAIN COMPONENT ---

export default function PeyflexDataBundle() {
  const { api_url, user } = useContext(Context);
  const userId = user?.id;
  const apiBaseUrl = `${api_url}/peyflex`;

  const [networks, setNetworks] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [plans, setPlans] = useState([]);
  const [selectedPlanCode, setSelectedPlanCode] = useState('');
  const [loadingNetworks, setLoadingNetworks] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(false);

  const [balance, setBalance] = useState(0);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [lastReceipt, setLastReceipt] = useState(null);

  const loadDataNetworks = useCallback(async () => {
    setLoadingNetworks(true);
    try {
      const res = await fetch(`${apiBaseUrl}/get_data_networks.php`, {
        cache: 'no-store',
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.networks) && data.networks.length > 0) {
        setNetworks(data.networks);
        setSelectedNetwork((prev) =>
          data.networks.some((n) => n.identifier === prev)
            ? prev
            : data.networks[0].identifier
        );
      }
    } catch (err) {
      console.error('Failed to load Peyflex data networks:', err);
    } finally {
      setLoadingNetworks(false);
    }
  }, [apiBaseUrl]);

  const loadDataPlans = useCallback(
    async (networkId) => {
      if (!networkId) return;
      setLoadingPlans(true);
      setPlans([]);
      setSelectedPlanCode('');
      try {
        const res = await fetch(
          `${apiBaseUrl}/get_data_plans.php?network=${encodeURIComponent(networkId)}`,
          { cache: 'no-store' }
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.plans)) {
          setPlans(data.plans);
          if (data.plans.length > 0) {
            setSelectedPlanCode(data.plans[0].plan_code);
          }
        }
      } catch (err) {
        console.error('Failed to load Peyflex data plans:', err);
      } finally {
        setLoadingPlans(false);
      }
    },
    [apiBaseUrl]
  );

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
    loadDataNetworks();
    loadWalletBalance();
  }, [loadDataNetworks, loadWalletBalance]);

  useEffect(() => {
    if (selectedNetwork) {
      loadDataPlans(selectedNetwork);
    }
  }, [selectedNetwork, loadDataPlans]);

  const activePlan = plans.find((p) => p.plan_code === selectedPlanCode) || null;
  const planAmount = activePlan ? Number(activePlan.amount || 0) : 0;
  const cleanPhone = phone.replace(/\D/g, '');

  const validateForm = () => {
    if (!selectedNetwork) {
      return 'Select a data network.';
    }
    if (!activePlan || !activePlan.plan_code) {
      return 'Select a data plan.';
    }
    if (cleanPhone.length !== 11) {
      return 'Enter a valid 11-digit phone number.';
    }
    if (planAmount <= 0) {
      return 'Invalid data plan price.';
    }
    if (planAmount > balance) {
      return 'Insufficient wallet balance for this data bundle.';
    }
    return null;
  };

  const handleDataPurchase = async (e) => {
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
      const response = await fetch(`${apiBaseUrl}/purchase_data.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: Number(userId),
          network: selectedNetwork,
          mobile_number: cleanPhone,
          plan_code: activePlan.plan_code,
          amount: planAmount,
          plan_label: activePlan.label || activePlan.plan_code,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Data bundle purchase failed.');
      }

      const updatedBalance =
        typeof result.new_balance === 'number'
          ? result.new_balance
          : Math.max(0, balance - planAmount);

      setBalance(updatedBalance);

      const txRecord = result.transaction || {
        id: Date.now().toString(),
        reference: Date.now().toString(),
        service: `${selectedNetwork.toUpperCase()} Data (${activePlan.label || activePlan.plan_code})`,
        recipient: cleanPhone,
        amount: planAmount,
        initial_balance: balance,
        final_balance: updatedBalance,
        status: 'success',
        created_at: new Date().toISOString(),
      };

      setLastReceipt(txRecord);

      Swal.fire({
        icon: 'success',
        title: 'Data Sent',
        text: `${activePlan.label || activePlan.plan_code} sent to ${txRecord.recipient}`,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Purchase Failed',
        text: err.message || 'Unable to process data purchase right now.',
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
            <Title>Data Bundle Top-Up</Title>
            <BalanceBadge>
              {loadingWallet ? 'Loading...' : `Wallet: ${formatNaira(balance)}`}
            </BalanceBadge>
          </HeaderRow>

          <form onSubmit={handleDataPurchase}>
            <FieldGroup>
              <Label>Data Network</Label>
              {loadingNetworks ? (
                <HelperText>Loading networks...</HelperText>
              ) : (
                <NetworkGrid>
                  {networks.map((net) => {
                    const id = net.identifier;
                    return (
                      <NetworkButton
                        key={id}
                        type="button"
                        $active={selectedNetwork === id}
                        $accent={getAccentByIdentifier(id)}
                        onClick={() => setSelectedNetwork(id)}
                      >
                        {net.name}
                      </NetworkButton>
                    );
                  })}
                </NetworkGrid>
              )}
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="data-plan-select">Select Data Plan</Label>
              {loadingPlans ? (
                <HelperText>Loading data plans...</HelperText>
              ) : plans.length === 0 ? (
                <HelperText>No data plans available for this network.</HelperText>
              ) : (
                <>
                  <Select
                    id="data-plan-select"
                    value={selectedPlanCode}
                    onChange={(e) => setSelectedPlanCode(e.target.value)}
                  >
                    {plans.map((plan, idx) => (
                      <option
                        key={`${plan.plan_code}-${plan.amount}-${idx}`}
                        value={plan.plan_code}
                      >
                        {plan.label || plan.plan_code} — {formatNaira(plan.amount)}
                      </option>
                    ))}
                  </Select>

                  <PlansGrid>
                    {plans.map((plan, idx) => {
                      const isSelected = plan.plan_code === selectedPlanCode;
                      return (
                        <PlanCard
                          key={`card-${plan.plan_code}-${plan.amount}-${idx}`}
                          type="button"
                          $selected={isSelected}
                          onClick={() => setSelectedPlanCode(plan.plan_code)}
                        >
                          <PlanLabel>{plan.label || plan.plan_code}</PlanLabel>
                          <PlanPrice>{formatNaira(plan.amount)}</PlanPrice>
                        </PlanCard>
                      );
                    })}
                  </PlansGrid>
                </>
              )}
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="data-phone">Phone Number (11 digits)</Label>
              <Input
                id="data-phone"
                type="tel"
                inputMode="numeric"
                maxLength={11}
                placeholder="08144216361"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                required
              />
            </FieldGroup>

            <SubmitButton type="submit" disabled={submitting || !activePlan}>
              {submitting
                ? 'Processing Data...'
                : `Buy Data${activePlan ? ` (${formatNaira(planAmount)})` : ''}`}
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