


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

const VerifyRow = styled.div`
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

const DEFAULT_COMPANIES = [
  { label: 'SportyBet', code: 'sportybet' },
  { label: 'Bet9ja', code: 'bet9ja' },
  { label: '1xBet', code: '1xbet' },
  { label: 'BetKing', code: 'betking' },
  { label: 'MSport', code: 'msport' },
  { label: 'BetWay', code: 'betway' },
];

const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 10000, 20000];

const formatNaira = (value) =>
  `₦${Number(value || 0).toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const resolveVerifiedLabel = (rawName, fallbackId) => {
  const cleaned = String(rawName || '').trim();
  if (!cleaned || cleaned.toLowerCase() === 'unknown') {
    return `Verified ID (${fallbackId})`;
  }
  return cleaned;
};

// --- MAIN COMPONENT ---

export default function PeyflexBettingRecharge() {
  const { api_url, user } = useContext(Context);
  const userId = user?.id;
  const apiBaseUrl = `${api_url}/peyflex`;

  const [companies, setCompanies] = useState(DEFAULT_COMPANIES);
  const [selectedCompany, setSelectedCompany] = useState('sportybet');
  const [loadingCompanies, setLoadingCompanies] = useState(false);

  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lastReceipt, setLastReceipt] = useState(null);

  const loadCompanies = useCallback(async () => {
    setLoadingCompanies(true);
    try {
      const res = await fetch(`${apiBaseUrl}/get_bet_companies.php`, {
        cache: 'no-store',
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.companies) && data.companies.length > 0) {
        setCompanies(data.companies);
        setSelectedCompany((prev) =>
          data.companies.some((c) => c.code === prev) ? prev : data.companies[0].code
        );
      }
    } catch (err) {
      console.error('Failed to load betting companies:', err);
    } finally {
      setLoadingCompanies(false);
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
    loadCompanies();
    loadWalletBalance();
  }, [loadCompanies, loadWalletBalance]);

  const activeCompanyObj =
    companies.find((c) => c.code === selectedCompany) || {
      code: selectedCompany,
      label: selectedCompany.toUpperCase(),
    };
  const cleanCustomerId = customerId.trim();
  const numericAmount = Number(amount);

  const handleCompanyChange = (val) => {
    setSelectedCompany(val);
    setCustomerName('');
    setIsVerified(false);
  };

  const handleCustomerIdChange = (val) => {
    setCustomerId(val);
    setCustomerName('');
    setIsVerified(false);
  };

  const handleVerifyAccount = async () => {
    if (!cleanCustomerId) {
      Swal.fire({
        icon: 'warning',
        title: 'Customer ID Required',
        text: 'Enter a betting customer ID / phone number first.',
      });
      return;
    }

    setVerifying(true);
    setCustomerName('');
    setIsVerified(false);
    try {
      const res = await fetch(`${apiBaseUrl}/verify_bet_account.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          betting_company: activeCompanyObj.label || activeCompanyObj.code,
          customer_id: cleanCustomerId,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Bet account verification failed.');
      }

      const resolvedName = resolveVerifiedLabel(
        data.customer_name || data.data?.name,
        cleanCustomerId
      );
      setCustomerName(resolvedName);
      setIsVerified(true);

      Swal.fire({
        icon: 'success',
        title: 'Account Verified',
        text: `${activeCompanyObj.label}: ${resolvedName}`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: err.message || 'Unable to verify betting account.',
      });
    } finally {
      setVerifying(false);
    }
  };

  const validateForm = () => {
    if (!selectedCompany) {
      return 'Select a betting platform.';
    }
    if (!cleanCustomerId) {
      return 'Enter a valid betting customer ID.';
    }
    if (!isVerified) {
      return 'Verify the betting customer ID before funding.';
    }
    if (!numericAmount || numericAmount < 100 || numericAmount > 500000) {
      return 'Enter an amount between ₦100 and ₦500,000.';
    }
    if (numericAmount > balance) {
      return 'Insufficient wallet balance for this bet funding.';
    }
    return null;
  };

  const handleBetFunding = async (e) => {
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
      const response = await fetch(`${apiBaseUrl}/purchase_bet.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: Number(userId),
          betting_company: selectedCompany,
          company_label: activeCompanyObj.label || selectedCompany.toUpperCase(),
          customer_id: cleanCustomerId,
          customer_name: customerName,
          amount: numericAmount,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Bet funding failed.');
      }

      const updatedBalance =
        typeof result.new_balance === 'number'
          ? result.new_balance
          : Math.max(0, balance - numericAmount);

      setBalance(updatedBalance);

      const txRecord = result.transaction || {
        id: Date.now().toString(),
        reference: Date.now().toString(),
        service: `${activeCompanyObj.label} Bet Funding (${cleanCustomerId})`,
        recipient: cleanCustomerId,
        customer_name: customerName,
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
        title: 'Bet Wallet Funded',
        text: `${formatNaira(txRecord.amount)} sent to ${activeCompanyObj.label} (${cleanCustomerId})`,
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Funding Failed',
        text: err.message || 'Unable to fund betting wallet right now.',
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
            <Title>Betting Wallet Top-Up</Title>
            <BalanceBadge>
              {loadingWallet ? 'Loading...' : `Wallet: ${formatNaira(balance)}`}
            </BalanceBadge>
          </HeaderRow>

          <form onSubmit={handleBetFunding}>
            <FieldGroup>
              <Label htmlFor="bet-company-select">Betting Company</Label>
              {loadingCompanies ? (
                <HelperText>Loading betting companies...</HelperText>
              ) : (
                <Select
                  id="bet-company-select"
                  value={selectedCompany}
                  onChange={(e) => handleCompanyChange(e.target.value)}
                >
                  {companies.map((comp) => (
                    <option key={comp.code} value={comp.code}>
                      {comp.label}
                    </option>
                  ))}
                </Select>
              )}
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="bet-customer-id">Customer ID / User ID</Label>
              <VerifyRow>
                <Input
                  id="bet-customer-id"
                  type="text"
                  placeholder="Enter customer ID (e.g. 08105867169)"
                  value={customerId}
                  onChange={(e) => handleCustomerIdChange(e.target.value)}
                  required
                />
                <VerifyButton
                  type="button"
                  disabled={verifying}
                  onClick={handleVerifyAccount}
                >
                  {verifying ? 'Verifying...' : 'Verify ID'}
                </VerifyButton>
              </VerifyRow>
              {isVerified && (
                <VerifiedBox>
                  {customerName} • {activeCompanyObj.label}
                </VerifiedBox>
              )}
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="bet-amount">Amount (₦100 - ₦500,000)</Label>
              <Input
                id="bet-amount"
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

            <SubmitButton type="submit" disabled={submitting || !isVerified}>
              {submitting
                ? 'Funding Bet Account...'
                : `Fund Bet Wallet${numericAmount >= 100 ? ` (${formatNaira(numericAmount)})` : ''}`}
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
                  <strong>Account Status</strong>
                  <span>{lastReceipt.customer_name}</span>
                </ReceiptLine>
              )}
              <ReceiptLine>
                <strong>Customer ID</strong>
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