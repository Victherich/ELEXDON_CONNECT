import React, { useState, useContext, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';
import { VasBillsContext } from './VasBillsContext';

const QUICK_AMOUNTS = [100, 200, 500, 1000, 2000, 5000, 10000, 20000];

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f8fafc;
`;

const MainGrid = styled.div`
  width: 100%;
  max-width: 1040px;
  display: grid;
  grid-template-columns: 1fr 330px;
  gap: 10px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
  padding: 10px;
  animation: ${fadeIn} 0.2s ease-out;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #2563eb;
`;

const Subtitle = styled.p`
  font-size: 0.85rem;
  color: #475569;
  margin-top: 4px;
`;

const BillerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  gap: 10px;
  margin-bottom: 10px;
`;

const BillerCardButton = styled.button`
  text-align: left;
  padding: 10px;
  border-radius: 8px;
  border: 1.5px solid ${({ $selected }) => ($selected ? '#2563eb' : '#e2e8f0')};
  background: ${({ $selected }) => ($selected ? '#eff6ff' : '#ffffff')};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: #2563eb;
  }

  strong {
    font-size: 0.9rem;
    color: #273d6b;
    line-height: 1.25;
  }

  small {
    font-size: 0.75rem;
    color: #475569;
  }
`;

const FormModalCard = styled(Card)`
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: #2563eb;
    color: #2563eb;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 6px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 0.9rem;
  color: #0f172a;
  background-color: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #2563eb;
  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 0.9rem;
  color: #0f172a;
  background-color: ${({ readOnly }) => (readOnly ? '#f8fafc' : '#ffffff')};
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: #2563eb;
  }
`;

const QuickAmountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 8px;
`;

const QuickAmountChip = styled.button`
  padding: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 6px;
  border: 1px solid ${({ $selected }) => ($selected ? '#2563eb' : '#e2e8f0')};
  background: ${({ $selected }) => ($selected ? '#eff6ff' : '#f8fafc')};
  color: ${({ $selected }) => ($selected ? '#2563eb' : '#475569')};
  cursor: pointer;
`;

const VerifyButton = styled.button`
  padding: 0 10px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #2563eb;
  background: #eff6ff;
  border: 1.5px solid #bfdbfe;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  font-size: 0.92rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #2563eb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Spinner = styled.span`
  width: 15px;
  height: 15px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ${spin} 0.65s linear infinite;
`;

const AlertBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
  font-size: 0.84rem;
  margin-bottom: 10px;

  ${({ $variant }) =>
    $variant === 'success' &&
    css`
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      color: #16a34a;
    `}

  ${({ $variant }) =>
    $variant === 'error' &&
    css`
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
    `}
`;

const SummaryTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #2563eb;
  padding-bottom: 8px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 8px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 0.85rem;

  span:first-child {
    color: #475569;
  }

  span:last-child {
    font-weight: 600;
    color: #0f172a;
    text-align: right;
  }
`;

const TotalDivider = styled.div`
  border-top: 1px dashed #e2e8f0;
  margin: 8px 0;
`;

const TotalRow = styled(SummaryRow)`
  span:first-child {
    font-weight: 700;
    color: #0f172a;
  }

  span:last-child {
    font-size: 1.05rem;
    font-weight: 700;
    color: #2563eb;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  z-index: 50;
`;

const ReceiptCard = styled(Card)`
  width: 100%;
  max-width: 420px;
  text-align: center;
`;

const TokenBox = styled.div`
  background: #eff6ff;
  border: 1.5px dashed #2563eb;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0;

  small {
    display: block;
    font-size: 0.72rem;
    color: #475569;
  }

  strong {
    font-size: 1.05rem;
    color: #2563eb;
  }
`;

export default function CategoryBillCheckout({
  groupKey,
  serviceCode,
  pageTitle,
  pageSubtitle,
  customerLabel,
  customerPlaceholder,
  requiresValidation = false,
  showQuickAmounts = false,
  onBalanceUpdate,
}) {
  const {
    user,
    groupedBillers,
    loadingBillers,
    billersError,
    refreshBillers,
    itemsByBiller,
    loadingBillerId,
    fetchPaymentItems,
    validateCustomer,
    validating,
    payBill,
    submitting,
  } = useContext(VasBillsContext);

  const categoryBillers = useMemo(
    () => groupedBillers[groupKey] || [],
    [groupedBillers, groupKey]
  );

  const [selectedBiller, setSelectedBiller] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [customerInfo, setCustomerInfo] = useState(null);
  const [isValidated, setIsValidated] = useState(false);
  const [alert, setAlert] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [copiedToken, setCopiedToken] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  console.log(itemsByBiller)





const closeFormModal = () => {
  setIsFormModalOpen(false);
  setSelectedItem(null);
  setCustomerId('');
  setAmount('');
  setCustomerInfo(null);
  setIsValidated(false);
  setAlert(null);
};

  const paymentItems = selectedBiller
    ? itemsByBiller[String(selectedBiller.id)] || []
    : [];
  const loadingItems = selectedBiller
    ? loadingBillerId === String(selectedBiller.id)
    : false;

  const surchargeNaira = selectedBiller?.surcharge
    ? Number(selectedBiller.surcharge) / 100
    : 0;
  const totalPayable = Number(((Number(amount) || 0) + surchargeNaira).toFixed(2));

  const applyItem = (item) => {
    setSelectedItem(item);
    setAlert(null);
    if (item && Number(item.amount) > 0) {
      setAmount(String(Number(item.amount) / 100));
    } else {
      setAmount('');
    }
  };

  const handleSelectBillerCard = async (biller) => {
    setSelectedBiller(biller);
    setSelectedItem(null);
    setAmount('');
    setCustomerInfo(null);
    setIsValidated(false);
    setAlert(null);
    setIsFormModalOpen(true);

    const items = await fetchPaymentItems(biller.id);
    if (items.length === 1) {
      applyItem(items[0]);
    }
  };

  const handleValidate = async () => {
    if (!selectedItem || !customerId.trim()) {
      setAlert({ type: 'error', message: `Select a package and enter ${customerLabel}.` });
      return;
    }

    setAlert(null);
    setCustomerInfo(null);
    setIsValidated(false);

    const json = await validateCustomer({
      paymentCode: selectedItem.paymentCode,
      customerId: customerId.trim(),
    });
    const customer = json.data?.customers?.[0];

    if (json.success && customer) {
      setCustomerInfo({
        name: customer.fullName || customer.customerName || 'Verified Customer',
        address: customer.address || '',
      });
      setIsValidated(true);
    } else {
      setAlert({
        type: 'error',
        message: json.message || json.error || 'Verification failed. Check details and retry.',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      setAlert({ type: 'error', message: 'User session missing. Please sign in again.' });
      return;
    }
    if (!selectedBiller || !selectedItem) {
      setAlert({ type: 'error', message: 'Select a provider card and package first.' });
      return;
    }
    if (requiresValidation && !isValidated) {
      setAlert({ type: 'error', message: `Please verify ${customerLabel} before paying.` });
      return;
    }
    if (!customerId.trim() || Number(amount) <= 0 || totalPayable <= 0) {
      setAlert({ type: 'error', message: 'Enter valid customer details and amount.' });
      return;
    }

    setAlert(null);
    const json = await payBill({
      userId: user.id,
      serviceType: serviceCode,
      billerName: selectedBiller.name,
      paymentCode: selectedItem.paymentCode,
      customerId: customerId.trim(),
      customerName: customerInfo?.name || '',
      amount: Number(amount),
      surcharge: surchargeNaira,
      totalAmount: totalPayable,
      phone: user.phone || '',
      email: user.email || '',
    });

    const body = json.body || {};
    if (typeof json.finalBalance === 'number' && typeof onBalanceUpdate === 'function') {
      onBalanceUpdate(json.finalBalance);
    }

    if (json.success || body.success) {
      setReceipt({
        reference: json.requestReference,
        biller: selectedBiller.name,
        packageName: selectedItem.name,
        customerId: customerId.trim(),
        customerName: customerInfo?.name || '',
        amount: totalPayable,
        finalBalance: json.finalBalance,
        token:
          body.data?.AdditionalInfo?.token ||
          body.data?.token ||
          body.data?.pin ||
          body.data?.rechargePin ||
          null,
        date: new Date().toLocaleString(),
      });
    } else {
      setAlert({
        type: 'error',
        message: json.error || body.message || 'Transaction declined.',
      });
    }
  };

  const copyToken = (val) => {
    navigator.clipboard.writeText(val);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <PageWrapper>
      <MainGrid>
        <Card>
          <HeaderRow>
            <div>
              <Title>{pageTitle}</Title>
              <Subtitle>{pageSubtitle}</Subtitle>
            </div>
            <button
              type="button"
              onClick={refreshBillers}
              disabled={loadingBillers}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 10px',
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              <RefreshCw size={14} /> Refresh
            </button>
          </HeaderRow>

          {(alert || billersError) && (
            <AlertBox $variant="error">
              <AlertCircle size={18} />
              <span>{alert?.message || billersError}</span>
            </AlertBox>
          )}

          <FormGroup>
            <Label>Select Provider ({categoryBillers.length})</Label>
            {loadingBillers ? (
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>Loading providers...</p>
            ) : categoryBillers.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>
                No providers available for {pageTitle}.
              </p>
            ) : (
              <BillerGrid>
                {categoryBillers.map((biller) => {
                  const isSelected = String(selectedBiller?.id) === String(biller.id);
                  return (
                    <BillerCardButton
                      key={biller.id}
                      type="button"
                      $selected={isSelected}
                      onClick={() => handleSelectBillerCard(biller)}
                    >
                      <strong>{biller.name}</strong>
                      <small>{biller.shortName || biller.categoryName || pageTitle}</small>
                    </BillerCardButton>
                  );
                })}
              </BillerGrid>
            )}
          </FormGroup>

          {/* {selectedBiller && (
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Select Package / Plan</Label>
                <Select
                  value={selectedItem?.paymentCode || ''}
                  onChange={(e) => {
                    const found = paymentItems.find((i) => i.paymentCode === e.target.value);
                    applyItem(found || null);
                  }}
                  disabled={loadingItems}
                  required
                >
                  <option value="">
                    {loadingItems ? 'Loading items...' : '-- Choose Package --'}
                  </option>
                  {paymentItems.map((item) => {
                    const priceNaira = Number(item.amount) / 100;
                    return (
                      <option key={item.paymentCode} value={item.paymentCode}>
                        {item.name} {priceNaira > 0 ? `- ₦${priceNaira.toLocaleString()}` : ''}
                      </option>
                    );
                  })}
                </Select>
              </FormGroup>

              {selectedItem && (
                <>
                  <FormGroup>
                    <Label>{customerLabel}</Label>
                    <InputRow>
                      <Input
                        type="text"
                        placeholder={customerPlaceholder}
                        value={customerId}
                        onChange={(e) => {
                          setCustomerId(e.target.value);
                          if (isValidated) {
                            setIsValidated(false);
                            setCustomerInfo(null);
                          }
                        }}
                        required
                      />
                      {requiresValidation && (
                        <VerifyButton
                          type="button"
                          onClick={handleValidate}
                          disabled={validating || !customerId.trim()}
                        >
                          {validating ? 'Checking...' : 'Verify'}
                        </VerifyButton>
                      )}
                    </InputRow>
                  </FormGroup>

                  {customerInfo && (
                    <AlertBox $variant="success">
                      <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <strong>{customerInfo.name}</strong>
                        {customerInfo.address && (
                          <div style={{ fontSize: '0.78rem' }}>{customerInfo.address}</div>
                        )}
                      </div>
                    </AlertBox>
                  )}

                  <FormGroup>
                    <Label>Amount (₦)</Label>
                    <Input
                      type="number"
                      min="50"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      readOnly={Boolean(selectedItem.isAmountFixed && Number(selectedItem.amount) > 0)}
                      required
                    />

                    {showQuickAmounts && !selectedItem.isAmountFixed && (
                      <QuickAmountGrid>
                        {QUICK_AMOUNTS.map((val) => (
                          <QuickAmountChip
                            key={val}
                            type="button"
                            $selected={Number(amount) === val}
                            onClick={() => setAmount(String(val))}
                          >
                            ₦{val.toLocaleString()}
                          </QuickAmountChip>
                        ))}
                      </QuickAmountGrid>
                    )}
                  </FormGroup>

                  <PrimaryButton
                    type="submit"
                    disabled={submitting || (requiresValidation && !isValidated)}
                  >
                    {submitting ? (
                      <>
                        <Spinner /> Processing Payment...
                      </>
                    ) : (
                      `Pay ₦${totalPayable.toLocaleString()}`
                    )}
                  </PrimaryButton>
                </>
              )}
            </form>
          )} */}

          {isFormModalOpen && selectedBiller && (
  <ModalOverlay onClick={closeFormModal}>
    <FormModalCard onClick={(e) => e.stopPropagation()}>
      <ModalHeader>
        <div>
          <strong style={{ fontSize: '1rem', color: '#273d6b' }}>
            {selectedBiller.name}
          </strong>
          <div style={{ fontSize: '0.78rem', color: '#475569' }}>
            {pageTitle} — {selectedBiller.shortName || pageTitle}
          </div>
        </div>
        <CloseButton type="button" onClick={closeFormModal}>
          Close
        </CloseButton>
      </ModalHeader>

      {alert && (
        <AlertBox $variant={alert.type || 'error'}>
          <AlertCircle size={18} />
          <span>{alert.message}</span>
        </AlertBox>
      )}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Select Package / Plan</Label>
          <Select
            value={selectedItem?.paymentCode || ''}
            onChange={(e) => {
              const found = paymentItems.find((i) => i.paymentCode === e.target.value);
              applyItem(found || null);
            }}
            disabled={loadingItems}
            required
          >
            <option value="">
              {loadingItems ? 'Loading items...' : '-- Choose Package --'}
            </option>
            {paymentItems.map((item) => {
              const priceNaira = Number(item.amount) / 100;
              return (
                <option key={item.paymentCode} value={item.paymentCode}>
                  {item.name} {priceNaira > 0 ? `- ₦${priceNaira.toLocaleString()}` : ''}
                </option>
              );
            })}
          </Select>
        </FormGroup>

        {selectedItem && (
          <>
            <FormGroup>
              <Label>{customerLabel}</Label>
              <InputRow>
                <Input
                  type="text"
                  placeholder={customerPlaceholder}
                  value={customerId}
                  onChange={(e) => {
                    setCustomerId(e.target.value);
                    if (isValidated) {
                      setIsValidated(false);
                      setCustomerInfo(null);
                    }
                  }}
                  required
                />
                {requiresValidation && (
                  <VerifyButton
                    type="button"
                    onClick={handleValidate}
                    disabled={validating || !customerId.trim()}
                  >
                    {validating ? 'Checking...' : 'Verify'}
                  </VerifyButton>
                )}
              </InputRow>
            </FormGroup>

            {customerInfo && (
              <AlertBox $variant="success">
                <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>{customerInfo.name}</strong>
                  {customerInfo.address && (
                    <div style={{ fontSize: '0.78rem' }}>{customerInfo.address}</div>
                  )}
                </div>
              </AlertBox>
            )}

            <FormGroup>
              <Label>Amount (₦)</Label>
              <Input
                type="number"
                min="50"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                readOnly={Boolean(selectedItem.isAmountFixed && Number(selectedItem.amount) > 0)}
                required
              />

              {showQuickAmounts && !selectedItem.isAmountFixed && (
                <QuickAmountGrid>
                  {QUICK_AMOUNTS.map((val) => (
                    <QuickAmountChip
                      key={val}
                      type="button"
                      $selected={Number(amount) === val}
                      onClick={() => setAmount(String(val))}
                    >
                      ₦{val.toLocaleString()}
                    </QuickAmountChip>
                  ))}
                </QuickAmountGrid>
              )}
            </FormGroup>

            <PrimaryButton
              type="submit"
              disabled={submitting || (requiresValidation && !isValidated)}
            >
              {submitting ? (
                <>
                  <Spinner /> Processing Payment...
                </>
              ) : (
                `Pay ₦${totalPayable.toLocaleString()}`
              )}
            </PrimaryButton>
          </>
        )}
      </form>
    </FormModalCard>
  </ModalOverlay>
)}
        </Card>

        <div>
          <Card>
            <SummaryTitle>{pageTitle} Summary</SummaryTitle>
            <SummaryRow>
              <span>Provider</span>
              <span>{selectedBiller?.name || '—'}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Package</span>
              <span>{selectedItem?.name || '—'}</span>
            </SummaryRow>
            <SummaryRow>
              <span>{customerLabel}</span>
              <span>{customerId || '—'}</span>
            </SummaryRow>
            {customerInfo?.name && (
              <SummaryRow>
                <span>Account Name</span>
                <span>{customerInfo.name}</span>
              </SummaryRow>
            )}
            <SummaryRow>
              <span>Amount</span>
              <span>₦{(Number(amount) || 0).toLocaleString()}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Convenience Fee</span>
              <span>₦{surchargeNaira.toLocaleString()}</span>
            </SummaryRow>

            <TotalDivider />

            <TotalRow>
              <span>Total</span>
              <span>₦{totalPayable.toLocaleString()}</span>
            </TotalRow>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 10,
                fontSize: '0.78rem',
                color: '#64748b',
              }}
            >
              <ShieldCheck size={16} color="#2563eb" />
              <span>Secured by Interswitch VAS</span>
            </div>
          </Card>
        </div>
      </MainGrid>

      {receipt && (
        <ModalOverlay onClick={() => setReceipt(null)}>
          <ReceiptCard onClick={(e) => e.stopPropagation()}>
            <CheckCircle2 size={44} color="#16a34a" style={{ margin: '0 auto 8px' }} />
            <Title>Payment Successful</Title>
            <Subtitle>{receipt.date}</Subtitle>

            {receipt.token && (
              <TokenBox>
                <small>TOKEN / TRANSACTION SLIP</small>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <strong>{receipt.token}</strong>
                  <button
                    type="button"
                    onClick={() => copyToken(receipt.token)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb' }}
                  >
                    {copiedToken ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </TokenBox>
            )}

            <div style={{ textAlign: 'left', marginTop: 10 }}>
              <SummaryRow>
                <span>Reference</span>
                <span>{receipt.reference}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Provider</span>
                <span>{receipt.biller}</span>
              </SummaryRow>
              <SummaryRow>
                <span>{customerLabel}</span>
                <span>{receipt.customerId}</span>
              </SummaryRow>
              {receipt.customerName && (
                <SummaryRow>
                  <span>Customer</span>
                  <span>{receipt.customerName}</span>
                </SummaryRow>
              )}
              {typeof receipt.finalBalance === 'number' && (
                <SummaryRow>
                  <span>Remaining Balance</span>
                  <span>₦{receipt.finalBalance.toLocaleString()}</span>
                </SummaryRow>
              )}
              <TotalDivider />
              <TotalRow>
                <span>Amount Paid</span>
                <span>₦{receipt.amount.toLocaleString()}</span>
              </TotalRow>
            </div>

            <PrimaryButton
              type="button"
              onClick={() => {
                setReceipt(null);
                setCustomerId('');
                setAmount('');
                setCustomerInfo(null);
                setIsValidated(false);
              }}
            >
              Done
            </PrimaryButton>
          </ReceiptCard>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
}