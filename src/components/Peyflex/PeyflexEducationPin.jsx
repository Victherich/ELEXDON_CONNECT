

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

const QuickQtyRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const QtyChip = styled.button`
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid ${({ $selected }) => ($selected ? '#2563eb' : '#cbd5e1')};
  background: ${({ $selected }) => ($selected ? '#dbeafe' : '#f8fafc')};
  color: ${({ $selected }) => ($selected ? '#1e40af' : '#334155')};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
`;

const HelperText = styled.span`
  font-size: 11px;
  color: #64748b;
`;

const SummaryBox = styled.div`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  font-size: 12px;
  color: #0f172a;
  margin-bottom: 10px;
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

const PinDetailBox = styled.div`
  margin-top: 4px;
  padding: 10px;
  border-radius: 4px;
  background: #ffffff;
  border: 1px dashed #16a34a;
  font-size: 12px;
  word-break: break-word;
`;

// --- CONSTANTS & HELPERS ---

const QUICK_QUANTITIES = [1, 2, 3, 5, 10];

const formatNaira = (value) =>
  `₦${Number(value || 0).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const resolvePinDisplayName = (plan) => {
  const cleanLabel = String(plan?.label || '').trim();
  if (cleanLabel) return cleanLabel;
  return String(plan?.plan_id || '').trim().toUpperCase();
};

// --- MAIN COMPONENT ---

export default function PeyflexEducationPin() {
  const { api_url, user } = useContext(Context);
  const userId = user?.id;
  const apiBaseUrl = `${api_url}/peyflex`;

  const [plans, setPlans] = useState([]);
  const [selectedPlanKey, setSelectedPlanKey] = useState('');
  const [loadingPlans, setLoadingPlans] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState('');
  const [balance, setBalance] = useState(0);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lastReceipt, setLastReceipt] = useState(null);

  const loadPlans = useCallback(async () => {
    setLoadingPlans(true);
    try {
      const res = await fetch(`${apiBaseUrl}/get_education_plans.php`, {
        cache: 'no-store',
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.plans) && data.plans.length > 0) {
        const mapped = data.plans.map((item, idx) => ({
          ...item,
          key: `${item.provider_id || 'edu'}_${item.plan_id}_${idx}`,
          unitPrice: Number(item.unitPrice || 0),
        }));
        setPlans(mapped);
        setSelectedPlanKey((prev) =>
          mapped.some((p) => p.key === prev) ? prev : mapped[0].key
        );
      }
    } catch (err) {
      console.error('Failed to load education providers/plans:', err);
    } finally {
      setLoadingPlans(false);
    }
  }, [apiBaseUrl]);

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
    loadPlans();
    loadWalletBalance();
  }, [loadPlans, loadWalletBalance]);

  const activePlan =
    plans.find((p) => p.key === selectedPlanKey) ||
    plans[0] || {
      plan_id: '',
      label: '',
      provider_id: '',
      provider_name: '',
      unitPrice: 0,
      product: '',
    };

  const activePinName = resolvePinDisplayName(activePlan);
  const cleanPhone = phone.replace(/\D/g, '').trim();
  const parsedQty = Math.max(1, Math.min(20, Number(quantity) || 1));
  const totalAmount = Number(activePlan.unitPrice || 0) * parsedQty;

  const validateForm = () => {
    if (!activePlan.plan_id) {
      return 'Select an Education PIN type.';
    }
    if (!cleanPhone || cleanPhone.length !== 11) {
      return 'Enter a valid 11-digit mobile phone number.';
    }
    if (!parsedQty || parsedQty < 1 || parsedQty > 20) {
      return 'Quantity must be between 1 and 20.';
    }
    if (totalAmount > balance) {
      return 'Insufficient wallet balance for this Education PIN order.';
    }
    return null;
  };

  const handlePurchasePin = async (e) => {
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
      const response = await fetch(`${apiBaseUrl}/purchase_education.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: Number(userId),
          identifier: activePlan.provider_id || 'education',
          plan_id: activePlan.plan_id,
          plan_label: activePinName,
          product: activePlan.product || '',
          unit_price: activePlan.unitPrice,
          quantity: parsedQty,
          phone: cleanPhone,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Education PIN purchase failed.');
      }

      const updatedBalance =
        typeof result.new_balance === 'number'
          ? result.new_balance
          : Math.max(0, balance - totalAmount);

      setBalance(updatedBalance);

      const returnedPinName = result.pin_name || result.plan_id || activePlan.plan_id;

      const txRecord = result.transaction || {
        id: Date.now().toString(),
        reference: Date.now().toString(),
        service: `${returnedPinName.toUpperCase()} x${parsedQty}`,
        recipient: cleanPhone,
        plan_id: returnedPinName,
        pin_name: returnedPinName,
        plan: result.plan || activePinName,
        quantity: parsedQty,
        pin: result.pin || '',
        card_serial: result.card_serial || '',
        card_pin: result.card_pin || '',
        amount: totalAmount,
        initial_balance: balance,
        final_balance: updatedBalance,
        status: 'success',
        created_at: new Date().toISOString(),
      };

      setLastReceipt(txRecord);
      setPhone('');

      Swal.fire({
        icon: 'success',
        title: `${returnedPinName.toUpperCase()} PIN Purchased`,
        text: `${returnedPinName.toUpperCase()} x${parsedQty} delivered for ${cleanPhone}`,
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Purchase Failed',
        text: err.message || 'Unable to complete Education PIN order.',
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
            <Title>Education Result Checker PIN Purchase</Title>
            <BalanceBadge>
              {loadingWallet ? 'Loading...' : `Wallet: ${formatNaira(balance)}`}
            </BalanceBadge>
          </HeaderRow>

          <form onSubmit={handlePurchasePin}>
            <FieldGroup>
              <Label htmlFor="edu-plan-select">PIN Type</Label>
              {loadingPlans ? (
                <HelperText>Loading education PINs...</HelperText>
              ) : (
                <Select
                  id="edu-plan-select"
                  value={selectedPlanKey}
                  onChange={(e) => setSelectedPlanKey(e.target.value)}
                >
                  {plans.map((plan) => {
                    const pinLabel = resolvePinDisplayName(plan);
                    return (
                      <option key={plan.key} value={plan.key}>
                        {pinLabel}
                        {plan.unitPrice > 0 ? ` (${formatNaira(plan.unitPrice)})` : ''}
                      </option>
                    );
                  })}
                </Select>
              )}
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="edu-qty-input">Quantity (1 - 20)</Label>
              <Input
                id="edu-qty-input"
                type="number"
                min={1}
                max={20}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <QuickQtyRow>
                {QUICK_QUANTITIES.map((qty) => (
                  <QtyChip
                    key={qty}
                    type="button"
                    $selected={parsedQty === qty}
                    onClick={() => setQuantity(qty)}
                  >
                    {qty} {qty === 1 ? 'PIN' : 'PINs'}
                  </QtyChip>
                ))}
              </QuickQtyRow>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="edu-phone-input">Recipient Phone Number (11 Digits)</Label>
              <Input
                id="edu-phone-input"
                type="tel"
                maxLength={11}
                placeholder="08144216361"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </FieldGroup>

            <SummaryBox>
              Total Charge: <strong>{formatNaira(totalAmount)}</strong> ({parsedQty} x{' '}
              {formatNaira(activePlan.unitPrice)})
            </SummaryBox>

            <SubmitButton type="submit" disabled={submitting || loadingPlans || !activePlan.plan_id}>
              {submitting
                ? 'Purchasing PIN...'
                : `Buy ${activePinName || 'PIN'} (${formatNaira(totalAmount)})`}
            </SubmitButton>
          </form>

          {lastReceipt && (
            <ReceiptBox>
              <ReceiptLine>
                <strong>PIN Name</strong>
                <span>{lastReceipt.pin_name || lastReceipt.plan_id}</span>
              </ReceiptLine>
              <ReceiptLine>
                <strong>Service</strong>
                <span>{lastReceipt.service}</span>
              </ReceiptLine>
              <ReceiptLine>
                <strong>Phone</strong>
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
              {(lastReceipt.card_serial || lastReceipt.card_pin || lastReceipt.pin) && (
                <PinDetailBox>
                  {lastReceipt.card_serial && (
                    <div>
                      <strong>Serial:</strong> {lastReceipt.card_serial}
                    </div>
                  )}
                  {lastReceipt.card_pin && (
                    <div>
                      <strong>PIN:</strong> {lastReceipt.card_pin}
                    </div>
                  )}
                  {lastReceipt.pin && (
                    <div>
                      <strong>All PINs:</strong> {lastReceipt.pin}
                    </div>
                  )}
                </PinDetailBox>
              )}
            </ReceiptBox>
          )}
        </Card>
      </GridLayout>
    </PageWrapper>
  );
}