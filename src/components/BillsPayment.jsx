// import React, { useState, useEffect, useMemo, useContext } from 'react';
// import styled, { keyframes, css } from 'styled-components';
// import {
//   Smartphone,
//   Wifi,
//   Zap,
//   Tv,
//   CheckCircle2,
//   AlertCircle,
//   ShieldCheck,
//   Copy,
//   Check,
// } from 'lucide-react';
// import { Context } from './Context';


// const SERVICE_TABS = [
//   { id: 'airtime', label: 'Airtime', icon: Smartphone, keywords: ['airtime', 'mobile', 'telecom'] },
//   { id: 'data', label: 'Data Bundle', icon: Wifi, keywords: ['data', 'internet', 'mobile', 'telecom'] },
//   { id: 'electricity', label: 'Electricity', icon: Zap, keywords: ['utility', 'electricity', 'power', 'disco'] },
//   { id: 'cable', label: 'Cable TV', icon: Tv, keywords: ['cable', 'tv', 'television'] },
// ];

// const QUICK_AMOUNTS = [100, 200, 500, 1000, 2000, 5000, 10000, 20000];

// // ==================== STYLED COMPONENTS ====================

// const spin = keyframes`
//   to { transform: rotate(360deg); }
// `;

// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(6px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const PageWrapper = styled.div`
//   min-height: 100vh;
//   padding: 2rem 1rem;
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
//   background-color: #f8fafc;
// `;

// const MainGrid = styled.div`
//   width: 100%;
//   max-width: 960px;
//   display: grid;
//   grid-template-columns: 1fr 340px;
//   gap: 1.5rem;

//   @media (max-width: 820px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const Card = styled.div`
//   background: #ffffff;
//   border-radius: 16px;
//   border: 1px solid #e2e8f0;
//   box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05);
//   padding: 1.75rem;
//   animation: ${fadeIn} 0.25s ease-out;
// `;

// const Header = styled.div`
//   margin-bottom: 1.5rem;
// `;

// const Title = styled.h1`
//   font-size: 1.375rem;
//   font-weight: 700;
//   color: #0f172a;
//   letter-spacing: -0.02em;
// `;

// const Subtitle = styled.p`
//   font-size: 0.875rem;
//   color: #475569;
//   margin-top: 0.25rem;
// `;

// const ServiceTabs = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 0.625rem;
//   margin-bottom: 1.75rem;

//   @media (max-width: 480px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
// `;

// const ServiceTab = styled.button`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 0.45rem;
//   padding: 0.875rem 0.5rem;
//   border-radius: 10px;
//   border: 1.5px solid ${({ $active }) => ($active ? '#2563eb' : '#e2e8f0')};
//   background: ${({ $active }) => ($active ? '#eff6ff' : '#ffffff')};
//   color: ${({ $active }) => ($active ? '#2563eb' : '#475569')};
//   font-weight: 600;
//   font-size: 0.8125rem;
//   cursor: pointer;
//   transition: all 0.18s ease;

//   &:hover {
//     border-color: #2563eb;
//     color: #2563eb;
//   }
// `;

// const FormGroup = styled.div`
//   margin-bottom: 1.25rem;
// `;

// const Label = styled.label`
//   display: block;
//   font-size: 0.8125rem;
//   font-weight: 600;
//   color: #0f172a;
//   margin-bottom: 0.45rem;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 0.75rem 0.875rem;
//   font-size: 0.9375rem;
//   color: #0f172a;
//   background-color: #ffffff;
//   border: 1.5px solid #e2e8f0;
//   border-radius: 10px;
//   outline: none;
//   transition: border-color 0.15s ease, box-shadow 0.15s ease;

//   &:focus {
//     border-color: #2563eb;
//     box-shadow: 0 0 0 3px #eff6ff;
//   }

//   &:disabled {
//     background-color: #f8fafc;
//     cursor: not-allowed;
//     opacity: 0.7;
//   }
// `;

// const InputRow = styled.div`
//   display: flex;
//   gap: 0.5rem;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem 0.875rem;
//   font-size: 0.9375rem;
//   color: #0f172a;
//   background-color: ${({ readOnly }) => (readOnly ? '#f8fafc' : '#ffffff')};
//   border: 1.5px solid #e2e8f0;
//   border-radius: 10px;
//   outline: none;
//   transition: border-color 0.15s ease, box-shadow 0.15s ease;

//   &:focus {
//     border-color: #2563eb;
//     box-shadow: 0 0 0 3px #eff6ff;
//   }
// `;

// const QuickAmountGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 0.5rem;
//   margin-top: 0.625rem;
// `;

// const QuickAmountChip = styled.button`
//   padding: 0.45rem;
//   font-size: 0.8125rem;
//   font-weight: 600;
//   border-radius: 6px;
//   border: 1px solid ${({ $selected }) => ($selected ? '#2563eb' : '#e2e8f0')};
//   background: ${({ $selected }) => ($selected ? '#eff6ff' : '#f8fafc')};
//   color: ${({ $selected }) => ($selected ? '#2563eb' : '#475569')};
//   cursor: pointer;
//   transition: all 0.15s ease;

//   &:hover {
//     border-color: #2563eb;
//     color: #2563eb;
//   }
// `;

// const VerifyButton = styled.button`
//   padding: 0 1.125rem;
//   font-size: 0.875rem;
//   font-weight: 600;
//   color: #2563eb;
//   background: #eff6ff;
//   border: 1.5px solid #bfdbfe;
//   border-radius: 10px;
//   cursor: pointer;
//   white-space: nowrap;
//   transition: all 0.15s ease;

//   &:hover:not(:disabled) {
//     background: #2563eb;
//     color: #ffffff;
//   }

//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// const PrimaryButton = styled.button`
//   width: 100%;
//   padding: 0.875rem 1.25rem;
//   margin-top: 0.5rem;
//   font-size: 0.9375rem;
//   font-weight: 600;
//   color: #ffffff;
//   background-color: #2563eb;
//   border: none;
//   border-radius: 10px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
//   transition: background-color 0.15s ease, transform 0.1s ease;

//   &:hover:not(:disabled) {
//     background-color: #1d4ed8;
//   }

//   &:active:not(:disabled) {
//     transform: scale(0.99);
//   }

//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }
// `;

// const Spinner = styled.span`
//   width: 16px;
//   height: 16px;
//   border: 2px solid rgba(255, 255, 255, 0.35);
//   border-top-color: #ffffff;
//   border-radius: 50%;
//   animation: ${spin} 0.65s linear infinite;
// `;

// const AlertBox = styled.div`
//   display: flex;
//   align-items: flex-start;
//   gap: 0.625rem;
//   padding: 0.875rem;
//   border-radius: 10px;
//   font-size: 0.84375rem;
//   margin-bottom: 1.25rem;
//   animation: ${fadeIn} 0.2s ease;

//   ${({ $variant }) =>
//     $variant === 'success' &&
//     css`
//       background: #f0fdf4;
//       border: 1px solid #bbf7d0;
//       color: #16a34a;
//     `}

//   ${({ $variant }) =>
//     $variant === 'error' &&
//     css`
//       background: #fef2f2;
//       border: 1px solid #fecaca;
//       color: #dc2626;
//     `}

//   ${({ $variant }) =>
//     $variant === 'info' &&
//     css`
//       background: #eff6ff;
//       border: 1px solid #bfdbfe;
//       color: #2563eb;
//     `}
// `;

// const SummaryTitle = styled.h3`
//   font-size: 1rem;
//   font-weight: 700;
//   color: #0f172a;
//   padding-bottom: 0.875rem;
//   border-bottom: 1px solid #e2e8f0;
//   margin-bottom: 1rem;
// `;

// const SummaryRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0.5rem 0;
//   font-size: 0.875rem;

//   span:first-child {
//     color: #475569;
//   }

//   span:last-child {
//     font-weight: 600;
//     color: #0f172a;
//     text-align: right;
//   }
// `;

// const TotalDivider = styled.div`
//   border-top: 1px dashed #e2e8f0;
//   margin: 0.875rem 0;
// `;

// const TotalRow = styled(SummaryRow)`
//   span:first-child {
//     font-weight: 700;
//     color: #0f172a;
//   }

//   span:last-child {
//     font-size: 1.125rem;
//     font-weight: 700;
//     color: #2563eb;
//   }
// `;

// const ReceiptModalOverlay = styled.div`
//   position: fixed;
//   inset: 0;
//   background: rgba(15, 23, 42, 0.55);
//   backdrop-filter: blur(3px);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 1rem;
//   z-index: 50;
// `;

// const ReceiptCard = styled(Card)`
//   width: 100%;
//   max-width: 420px;
//   text-align: center;
// `;

// const TokenBox = styled.div`
//   background: #eff6ff;
//   border: 1.5px dashed #2563eb;
//   border-radius: 10px;
//   padding: 0.875rem;
//   margin: 1rem 0;

//   small {
//     display: block;
//     font-size: 0.75rem;
//     color: #475569;
//     margin-bottom: 0.25rem;
//   }

//   strong {
//     font-size: 1.125rem;
//     letter-spacing: 0.08em;
//     color: #2563eb;
//   }
// `;



// // ==================== COMPONENT ====================

// export default function BillsPayment({ onBalanceUpdate }) {
//   const { user, api_url } = useContext(Context);

//   const [activeService, setActiveService] = useState('airtime');
//   const [allCategories, setAllCategories] = useState([]);
//   const [selectedBillerId, setSelectedBillerId] = useState('');
//   const [paymentItems, setPaymentItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const [customerId, setCustomerId] = useState('');
//   const [amount, setAmount] = useState('');
//   const [customerInfo, setCustomerInfo] = useState(null);
//   const [isValidated, setIsValidated] = useState(false);

//   const [loadingBillers, setLoadingBillers] = useState(false);
//   const [loadingItems, setLoadingItems] = useState(false);
//   const [validating, setValidating] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   const [alert, setAlert] = useState(null);
//   const [receipt, setReceipt] = useState(null);
//   const [copiedToken, setCopiedToken] = useState(false);

//   const API_BASE = `${(api_url || '').replace(/\/+$/, '')}/vas_bills.php`;
//   const requiresValidation = activeService === 'electricity' || activeService === 'cable';

//   useEffect(() => {
//     if (!api_url) return;

//     const fetchBillers = async () => {
//       setLoadingBillers(true);
//       try {
//         const res = await fetch(`${API_BASE}?action=billers`);
//         const json = await res.json();
//         if (json.success && Array.isArray(json.data)) {
//           setAllCategories(json.data);
//         } else {
//           setAlert({ type: 'error', message: json.error || 'Unable to load service providers.' });
//         }
//       } catch {
//         setAlert({ type: 'error', message: 'Network error connecting to payment server.' });
//       } finally {
//         setLoadingBillers(false);
//       }
//     };
//     fetchBillers();
//   }, [API_BASE, api_url]);

//   const filteredBillers = useMemo(() => {
//     const tabConfig = SERVICE_TABS.find((t) => t.id === activeService);
//     if (!tabConfig || allCategories.length === 0) return [];

//     const matchedCats = allCategories.filter((cat) =>
//       tabConfig.keywords.some((kw) => cat.name?.toLowerCase().includes(kw))
//     );

//     const list = matchedCats.length > 0 ? matchedCats : allCategories;
//     return list.flatMap((cat) =>
//       (cat.billers || []).map((b) => ({ ...b, categoryName: cat.name }))
//     );
//   }, [activeService, allCategories]);

//   const currentBiller = useMemo(
//     () => filteredBillers.find((b) => String(b.id) === String(selectedBillerId)),
//     [filteredBillers, selectedBillerId]
//   );

//   // Price determined on the frontend
//   const surchargeNaira = currentBiller?.surcharge ? Number(currentBiller.surcharge) / 100 : 0;
//   const totalPayable = Number(((Number(amount) || 0) + surchargeNaira).toFixed(2));

//   const handleServiceChange = (serviceId) => {
//     setActiveService(serviceId);
//     setSelectedBillerId('');
//     setPaymentItems([]);
//     setSelectedItem(null);
//     setCustomerId('');
//     setAmount('');
//     setCustomerInfo(null);
//     setIsValidated(false);
//     setAlert(null);
//   };

//   const handleBillerChange = async (billerId) => {
//     setSelectedBillerId(billerId);
//     setPaymentItems([]);
//     setSelectedItem(null);
//     setCustomerInfo(null);
//     setIsValidated(false);
//     setAlert(null);

//     if (!billerId) return;

//     setLoadingItems(true);
//     try {
//       const res = await fetch(`${API_BASE}?action=items&billerId=${billerId}`);
//       const json = await res.json();
//       const items = json.data || [];
//       setPaymentItems(items);

//       if (items.length === 1) {
//         handleItemSelect(items[0]);
//       }
//     } catch {
//       setAlert({ type: 'error', message: 'Failed to load packages for this provider.' });
//     } finally {
//       setLoadingItems(false);
//     }
//   };

//   const handleItemSelect = (item) => {
//     setSelectedItem(item);
//     setAlert(null);
//     if (item && Number(item.amount) > 0) {
//       setAmount(String(Number(item.amount) / 100));
//     } else {
//       setAmount('');
//     }
//   };

//   const handleValidateCustomer = async () => {
//     if (!selectedItem || !customerId.trim()) {
//       setAlert({ type: 'error', message: 'Select a package and enter your number first.' });
//       return;
//     }

//     setValidating(true);
//     setAlert(null);
//     setCustomerInfo(null);
//     setIsValidated(false);

//     try {
//       const res = await fetch(`${API_BASE}?action=validate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           paymentCode: selectedItem.paymentCode,
//           customerId: customerId.trim(),
//         }),
//       });
//       const json = await res.json();
//       const customer = json.data?.customers?.[0];

//       if (customer && (customer.fullName || customer.customerName)) {
//         setCustomerInfo({
//           name: customer.fullName || customer.customerName,
//           address: customer.address || '',
//         });
//         setIsValidated(true);
//       } else {
//         setAlert({
//           type: 'error',
//           message: json.message || json.error || 'Verification failed. Check the number and try again.',
//         });
//       }
//     } catch {
//       setAlert({ type: 'error', message: 'Validation request failed. Please try again.' });
//     } finally {
//       setValidating(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user?.id) {
//       setAlert({ type: 'error', message: 'User session missing. Please log in again.' });
//       return;
//     }

//     if (requiresValidation && !isValidated) {
//       setAlert({ type: 'error', message: 'Please verify your meter/smartcard number before paying.' });
//       return;
//     }

//     if (!selectedItem || !customerId || Number(amount) <= 0 || totalPayable <= 0) {
//       setAlert({ type: 'error', message: 'Please complete all required fields.' });
//       return;
//     }

//     setSubmitting(true);
//     setAlert(null);

//     try {
//       const res = await fetch(`${API_BASE}?action=pay`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: user.id,
//           serviceType: activeService,
//           billerName: currentBiller?.name || '',
//           paymentCode: selectedItem.paymentCode,
//           customerId: customerId.trim(),
//           customerName: customerInfo?.name || '',
//           amount: Number(amount),
//           surcharge: surchargeNaira,
//           totalAmount: totalPayable,
//           phone: user.phone || '',
//           email: user.email || '',
//         }),
//       });

//       const json = await res.json();
//       const body = json.body || {};

//       if (typeof json.finalBalance === 'number' && typeof onBalanceUpdate === 'function') {
//         onBalanceUpdate(json.finalBalance);
//       }

//       if (json.success || body.success) {
//         setReceipt({
//           reference: json.requestReference,
//           service: SERVICE_TABS.find((t) => t.id === activeService)?.label,
//           biller: currentBiller?.name,
//           package: selectedItem.name,
//           customerId: customerId.trim(),
//           customerName: customerInfo?.name || '',
//           amount: totalPayable,
//           finalBalance: json.finalBalance,
//           token: body.data?.token || body.data?.pin || body.data?.rechargePin || null,
//           date: new Date().toLocaleString(),
//         });
//       } else {
//         setAlert({
//           type: 'error',
//           message: json.error || body.message || 'Transaction declined. Please try again.',
//         });
//       }
//     } catch {
//       setAlert({ type: 'error', message: 'Network error while processing payment.' });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getCustomerLabel = () => {
//     if (activeService === 'electricity') return 'Meter Number';
//     if (activeService === 'cable') return 'Smartcard / IUC Number';
//     return 'Phone Number';
//   };

//   const copyToken = (tokenText) => {
//     navigator.clipboard.writeText(tokenText);
//     setCopiedToken(true);
//     setTimeout(() => setCopiedToken(false), 2000);
//   };

//   return (
//     <PageWrapper>
//       <MainGrid>
//         <Card>
//           <Header>
//             <Title>Bills & Utility Payment</Title>
//             <Subtitle>Instant airtime, data, electricity tokens & TV subscriptions</Subtitle>
//           </Header>

//           <ServiceTabs>
//             {SERVICE_TABS.map(({ id, label, icon: Icon }) => (
//               <ServiceTab
//                 key={id}
//                 type="button"
//                 $active={activeService === id}
//                 onClick={() => handleServiceChange(id)}
//               >
//                 <Icon size={20} />
//                 {label}
//               </ServiceTab>
//             ))}
//           </ServiceTabs>

//           {alert && (
//             <AlertBox $variant={alert.type}>
//               {alert.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
//               <span>{alert.message}</span>
//             </AlertBox>
//           )}

//           <form onSubmit={handleSubmit}>
//             <FormGroup>
//               <Label>Select Provider</Label>
//               <Select
//                 value={selectedBillerId}
//                 onChange={(e) => handleBillerChange(e.target.value)}
//                 disabled={loadingBillers}
//                 required
//               >
//                 <option value="">
//                   {loadingBillers ? 'Loading providers...' : '-- Choose Provider --'}
//                 </option>
//                 {filteredBillers.map((biller) => (
//                   <option key={biller.id} value={biller.id}>
//                     {biller.name}
//                   </option>
//                 ))}
//               </Select>
//             </FormGroup>

//             {selectedBillerId && (
//               <FormGroup>
//                 <Label>
//                   {activeService === 'electricity' ? 'Meter Type' : 'Select Package / Plan'}
//                 </Label>
//                 <Select
//                   value={selectedItem?.paymentCode || ''}
//                   onChange={(e) => {
//                     const found = paymentItems.find((i) => i.paymentCode === e.target.value);
//                     handleItemSelect(found || null);
//                   }}
//                   disabled={loadingItems}
//                   required
//                 >
//                   <option value="">
//                     {loadingItems ? 'Loading plans...' : '-- Choose Option --'}
//                   </option>
//                   {paymentItems.map((item) => {
//                     const itemPrice = Number(item.amount) / 100;
//                     return (
//                       <option key={item.paymentCode} value={item.paymentCode}>
//                         {item.name} {itemPrice > 0 ? `- ₦${itemPrice.toLocaleString()}` : ''}
//                       </option>
//                     );
//                   })}
//                 </Select>
//               </FormGroup>
//             )}

//             {selectedItem && (
//               <>
//                 <FormGroup>
//                   <Label>{getCustomerLabel()}</Label>
//                   <InputRow>
//                     <Input
//                       type="text"
//                       placeholder={
//                         requiresValidation ? `Enter ${getCustomerLabel()}` : 'e.g. 08012345678'
//                       }
//                       value={customerId}
//                       onChange={(e) => {
//                         setCustomerId(e.target.value);
//                         if (isValidated) {
//                           setIsValidated(false);
//                           setCustomerInfo(null);
//                         }
//                       }}
//                       required
//                     />
//                     {requiresValidation && (
//                       <VerifyButton
//                         type="button"
//                         onClick={handleValidateCustomer}
//                         disabled={validating || !customerId.trim()}
//                       >
//                         {validating ? 'Checking...' : 'Verify'}
//                       </VerifyButton>
//                     )}
//                   </InputRow>
//                 </FormGroup>

//                 {customerInfo && (
//                   <AlertBox $variant="success">
//                     <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 2 }} />
//                     <div>
//                       <strong>{customerInfo.name}</strong>
//                       {customerInfo.address && (
//                         <div style={{ fontSize: '0.78rem', opacity: 0.9 }}>
//                           {customerInfo.address}
//                         </div>
//                       )}
//                     </div>
//                   </AlertBox>
//                 )}

//                 <FormGroup>
//                   <Label>Amount (₦)</Label>
//                   <Input
//                     type="number"
//                     min="50"
//                     placeholder="Enter amount"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     readOnly={Boolean(selectedItem.isAmountFixed && Number(selectedItem.amount) > 0)}
//                     required
//                   />

//                   {(activeService === 'airtime' || activeService === 'electricity') &&
//                     !selectedItem.isAmountFixed && (
//                       <QuickAmountGrid>
//                         {QUICK_AMOUNTS.map((val) => (
//                           <QuickAmountChip
//                             key={val}
//                             type="button"
//                             $selected={Number(amount) === val}
//                             onClick={() => setAmount(String(val))}
//                           >
//                             ₦{val.toLocaleString()}
//                           </QuickAmountChip>
//                         ))}
//                       </QuickAmountGrid>
//                     )}
//                 </FormGroup>

//                 <PrimaryButton
//                   type="submit"
//                   disabled={submitting || (requiresValidation && !isValidated)}
//                 >
//                   {submitting ? (
//                     <>
//                       <Spinner /> Processing Payment...
//                     </>
//                   ) : (
//                     `Pay ₦${totalPayable.toLocaleString()}`
//                   )}
//                 </PrimaryButton>
//               </>
//             )}
//           </form>
//         </Card>

//         <div>
//           <Card>
//             <SummaryTitle>Transaction Summary</SummaryTitle>
//             <SummaryRow>
//               <span>Service</span>
//               <span style={{ textTransform: 'capitalize' }}>{activeService}</span>
//             </SummaryRow>
//             <SummaryRow>
//               <span>Provider</span>
//               <span>{currentBiller?.name || '—'}</span>
//             </SummaryRow>
//             <SummaryRow>
//               <span>Package</span>
//               <span>{selectedItem?.name || '—'}</span>
//             </SummaryRow>
//             <SummaryRow>
//               <span>{getCustomerLabel()}</span>
//               <span>{customerId || '—'}</span>
//             </SummaryRow>
//             {customerInfo?.name && (
//               <SummaryRow>
//                 <span>Account Name</span>
//                 <span>{customerInfo.name}</span>
//               </SummaryRow>
//             )}
//             <SummaryRow>
//               <span>Amount</span>
//               <span>₦{(Number(amount) || 0).toLocaleString()}</span>
//             </SummaryRow>
//             <SummaryRow>
//               <span>Convenience Fee</span>
//               <span>₦{surchargeNaira.toLocaleString()}</span>
//             </SummaryRow>

//             <TotalDivider />

//             <TotalRow>
//               <span>Total</span>
//               <span>₦{totalPayable.toLocaleString()}</span>
//             </TotalRow>

//             <div
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.5rem',
//                 marginTop: '1.25rem',
//                 fontSize: '0.78rem',
//                 color: '#64748b',
//               }}
//             >
//               <ShieldCheck size={16} color="#2563eb" />
//               <span>Secured by Interswitch Marketplace API</span>
//             </div>
//           </Card>
//         </div>
//       </MainGrid>

//       {receipt && (
//         <ReceiptModalOverlay onClick={() => setReceipt(null)}>
//           <ReceiptCard onClick={(e) => e.stopPropagation()}>
//             <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 0.75rem' }} />
//             <Title>Payment Successful</Title>
//             <Subtitle>{receipt.date}</Subtitle>

//             {receipt.token && (
//               <TokenBox>
//                 <small>ELECTRICITY METER TOKEN</small>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
//                   <strong>{receipt.token}</strong>
//                   <button
//                     type="button"
//                     onClick={() => copyToken(receipt.token)}
//                     style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb' }}
//                     title="Copy Token"
//                   >
//                     {copiedToken ? <Check size={16} /> : <Copy size={16} />}
//                   </button>
//                 </div>
//               </TokenBox>
//             )}

//             <div style={{ textAlign: 'left', marginTop: '1.25rem' }}>
//               <SummaryRow>
//                 <span>Reference</span>
//                 <span>{receipt.reference}</span>
//               </SummaryRow>
//               <SummaryRow>
//                 <span>Provider</span>
//                 <span>{receipt.biller}</span>
//               </SummaryRow>
//               <SummaryRow>
//                 <span>{getCustomerLabel()}</span>
//                 <span>{receipt.customerId}</span>
//               </SummaryRow>
//               {receipt.customerName && (
//                 <SummaryRow>
//                   <span>Customer</span>
//                   <span>{receipt.customerName}</span>
//                 </SummaryRow>
//               )}
//               {typeof receipt.finalBalance === 'number' && (
//                 <SummaryRow>
//                   <span>Remaining Balance</span>
//                   <span>₦{receipt.finalBalance.toLocaleString()}</span>
//                 </SummaryRow>
//               )}
//               <TotalDivider />
//               <TotalRow>
//                 <span>Amount Paid</span>
//                 <span>₦{receipt.amount.toLocaleString()}</span>
//               </TotalRow>
//             </div>

//             <PrimaryButton
//               type="button"
//               style={{ marginTop: '1.5rem' }}
//               onClick={() => {
//                 setReceipt(null);
//                 setCustomerId('');
//                 setAmount('');
//                 setCustomerInfo(null);
//                 setIsValidated(false);
//               }}
//             >
//               Done
//             </PrimaryButton>
//           </ReceiptCard>
//         </ReceiptModalOverlay>
//       )}
//     </PageWrapper>
//   );
// }



import React, { useState, useEffect, useMemo, useContext } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Smartphone,
  Wifi,
  Zap,
  Tv,
  Trophy,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Copy,
  Check,
} from 'lucide-react';
import { Context } from './Context';

const SERVICE_TABS = [
  { id: 'airtime', label: 'Airtime', icon: Smartphone },
  { id: 'data', label: 'Data Bundle', icon: Wifi },
  { id: 'electricity', label: 'Electricity', icon: Zap },
  { id: 'cable', label: 'Cable TV', icon: Tv },
  { id: 'betting', label: 'Betting', icon: Trophy },
];

const QUICK_AMOUNTS = [100, 200, 500, 1000, 2000, 5000, 10000, 20000];

// ==================== STYLED COMPONENTS ====================

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #f8fafc;
`;

const MainGrid = styled.div`
  width: 100%;
  max-width: 980px;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.5rem;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05);
  padding: 1.75rem;
  animation: ${fadeIn} 0.25s ease-out;
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.375rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #475569;
  margin-top: 0.25rem;
`;

const ServiceTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.625rem;
  margin-bottom: 1.75rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 420px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ServiceTab = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.875rem 0.5rem;
  border-radius: 10px;
  border: 1.5px solid ${({ $active }) => ($active ? '#2563eb' : '#e2e8f0')};
  background: ${({ $active }) => ($active ? '#eff6ff' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#2563eb' : '#475569')};
  font-weight: 600;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.18s ease;

  &:hover {
    border-color: #2563eb;
    color: #2563eb;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.45rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 0.875rem;
  font-size: 0.9375rem;
  color: #0f172a;
  background-color: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px #eff6ff;
  }

  &:disabled {
    background-color: #f8fafc;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.875rem;
  font-size: 0.9375rem;
  color: #0f172a;
  background-color: ${({ readOnly }) => (readOnly ? '#f8fafc' : '#ffffff')};
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px #eff6ff;
  }
`;

const QuickAmountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-top: 0.625rem;
`;

const QuickAmountChip = styled.button`
  padding: 0.45rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border-radius: 6px;
  border: 1px solid ${({ $selected }) => ($selected ? '#2563eb' : '#e2e8f0')};
  background: ${({ $selected }) => ($selected ? '#eff6ff' : '#f8fafc')};
  color: ${({ $selected }) => ($selected ? '#2563eb' : '#475569')};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #2563eb;
    color: #2563eb;
  }
`;

const VerifyButton = styled.button`
  padding: 0 1.125rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #2563eb;
  background: #eff6ff;
  border: 1.5px solid #bfdbfe;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background: #2563eb;
    color: #ffffff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 0.875rem 1.25rem;
  margin-top: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #2563eb;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.15s ease, transform 0.1s ease;

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }

  &:active:not(:disabled) {
    transform: scale(0.99);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ${spin} 0.65s linear infinite;
`;

const AlertBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.875rem;
  border-radius: 10px;
  font-size: 0.84375rem;
  margin-bottom: 1.25rem;
  animation: ${fadeIn} 0.2s ease;

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

  ${({ $variant }) =>
    $variant === 'info' &&
    css`
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      color: #2563eb;
    `}
`;

const SummaryTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  padding-bottom: 0.875rem;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-size: 0.875rem;

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
  margin: 0.875rem 0;
`;

const TotalRow = styled(SummaryRow)`
  span:first-child {
    font-weight: 700;
    color: #0f172a;
  }

  span:last-child {
    font-size: 1.125rem;
    font-weight: 700;
    color: #2563eb;
  }
`;

const ReceiptModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
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
  border-radius: 10px;
  padding: 0.875rem;
  margin: 1rem 0;

  small {
    display: block;
    font-size: 0.75rem;
    color: #475569;
    margin-bottom: 0.25rem;
  }

  strong {
    font-size: 1.125rem;
    letter-spacing: 0.08em;
    color: #2563eb;
  }
`;

// ==================== COMPONENT ====================

export default function BillsPayment({ onBalanceUpdate }) {
  const { user, api_url } = useContext(Context);

  const [activeService, setActiveService] = useState('airtime');
  const [allCategories, setAllCategories] = useState([]);
  const [selectedBillerId, setSelectedBillerId] = useState('');
  const [paymentItems, setPaymentItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [customerInfo, setCustomerInfo] = useState(null);
  const [isValidated, setIsValidated] = useState(false);

  const [loadingBillers, setLoadingBillers] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [validating, setValidating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [alert, setAlert] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [copiedToken, setCopiedToken] = useState(false);

  const API_BASE = `${(api_url || '').replace(/\/+$/, '')}/vas_bills.php`;
  const requiresValidation =
    activeService === 'electricity' || activeService === 'cable' || activeService === 'betting';

//   useEffect(() => {
//     if (!api_url) return;

//     const fetchBillers = async () => {
//       setLoadingBillers(true);
//       try {
//         const res = await fetch(`${API_BASE}?action=billers`);
//         const json = await res.json();
//         if (json.success && Array.isArray(json.data)) {
//           setAllCategories(json.data);
//         } else {
//           setAlert({ type: 'error', message: json.error || 'Unable to load service providers.' });
//         }
//       } catch {
//         setAlert({ type: 'error', message: 'Network error connecting to payment server.' });
//       } finally {
//         setLoadingBillers(false);
//       }
//     };
//     fetchBillers();
//   }, [API_BASE, api_url]);

//   const filteredBillers = useMemo(() => {
//     const matchedCat = allCategories.find((cat) => cat.id === activeService);
//     return (matchedCat?.billers || []).map((b) => ({
//       ...b,
//       categoryName: matchedCat?.name || activeService,
//     }));
//   }, [activeService, allCategories]);



const SERVICE_TO_GROUP_KEY = {
  airtime: 'AIRTIME',
  data: 'DATA_BUNDLE',
  electricity: 'ELECTRICITY',
  cable: 'CABLE_TV',
  betting: 'BETTING',
};

const [groupedBillers, setGroupedBillers] = useState({
  AIRTIME: [],
  DATA_BUNDLE: [],
  ELECTRICITY: [],
  CABLE_TV: [],
  BETTING: [],
});


useEffect(() => {
  if (!api_url) return;

  const baseApi = api_url.replace(/\/+$/, '');
  const fetchGroupedBillers = async () => {
    setLoadingBillers(true);
    try {
      const url = `${baseApi}/interswitch/get_billers.php?_t=${Date.now()}`;
      const res = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
        },
      });
      const json = await res.json();

      if (json.success && json.groups) {
        setGroupedBillers({
          AIRTIME: json.groups.AIRTIME || [],
          DATA_BUNDLE: json.groups.DATA_BUNDLE || [],
          ELECTRICITY: json.groups.ELECTRICITY || [],
          CABLE_TV: json.groups.CABLE_TV || [],
          BETTING: json.groups.BETTING || [],
        });
      } else {
        setAlert({ type: 'error', message: json.error || 'Unable to load service providers.' });
      }
    } catch {
      setAlert({ type: 'error', message: 'Network error loading billers.' });
    } finally {
      setLoadingBillers(false);
    }
  };

  fetchGroupedBillers();
}, [api_url]);

const filteredBillers = useMemo(() => {
  const groupKey = SERVICE_TO_GROUP_KEY[activeService] || 'AIRTIME';
  return groupedBillers[groupKey] || [];
}, [activeService, groupedBillers]);


  const currentBiller = useMemo(
    () => filteredBillers.find((b) => String(b.id) === String(selectedBillerId)),
    [filteredBillers, selectedBillerId]
  );

  // Price determined on the frontend
  const surchargeNaira = currentBiller?.surcharge ? Number(currentBiller.surcharge) / 100 : 0;
  const totalPayable = Number(((Number(amount) || 0) + surchargeNaira).toFixed(2));

  const handleServiceChange = (serviceId) => {
    setActiveService(serviceId);
    setSelectedBillerId('');
    setPaymentItems([]);
    setSelectedItem(null);
    setCustomerId('');
    setAmount('');
    setCustomerInfo(null);
    setIsValidated(false);
    setAlert(null);
  };

  const handleBillerChange = async (billerId) => {
    setSelectedBillerId(billerId);
    setPaymentItems([]);
    setSelectedItem(null);
    setCustomerInfo(null);
    setIsValidated(false);
    setAlert(null);

    if (!billerId) return;

    setLoadingItems(true);
    try {
      const res = await fetch(`${API_BASE}?action=items&billerId=${billerId}`);
      const json = await res.json();
      const items = json.data || [];
      setPaymentItems(items);

      if (items.length === 1) {
        handleItemSelect(items[0]);
      }
    } catch {
      setAlert({ type: 'error', message: 'Failed to load packages for this provider.' });
    } finally {
      setLoadingItems(false);
    }
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setAlert(null);
    if (item && Number(item.amount) > 0) {
      setAmount(String(Number(item.amount) / 100));
    } else {
      setAmount('');
    }
  };

  const handleValidateCustomer = async () => {
    if (!selectedItem || !customerId.trim()) {
      setAlert({ type: 'error', message: 'Select a package and enter your account/meter number first.' });
      return;
    }

    setValidating(true);
    setAlert(null);
    setCustomerInfo(null);
    setIsValidated(false);

    try {
      const res = await fetch(`${API_BASE}?action=validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentCode: selectedItem.paymentCode,
          customerId: customerId.trim(),
        }),
      });
      const json = await res.json();
      const customer = json.data?.customers?.[0];

      if (json.success && customer) {
        setCustomerInfo({
          name: customer.fullName || customer.customerName || 'Verified Account',
          address: customer.address || '',
        });
        setIsValidated(true);
      } else {
        setAlert({
          type: 'error',
          message: json.message || json.error || 'Verification failed. Check the number and try again.',
        });
      }
    } catch {
      setAlert({ type: 'error', message: 'Validation request failed. Please try again.' });
    } finally {
      setValidating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      setAlert({ type: 'error', message: 'User session missing. Please log in again.' });
      return;
    }

    if (requiresValidation && !isValidated) {
      setAlert({ type: 'error', message: 'Please verify your account/meter number before paying.' });
      return;
    }

    if (!selectedItem || !customerId || Number(amount) <= 0 || totalPayable <= 0) {
      setAlert({ type: 'error', message: 'Please complete all required fields.' });
      return;
    }

    setSubmitting(true);
    setAlert(null);

    try {
      const res = await fetch(`${API_BASE}?action=pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          serviceType: activeService,
          billerName: currentBiller?.name || '',
          paymentCode: selectedItem.paymentCode,
          customerId: customerId.trim(),
          customerName: customerInfo?.name || '',
          amount: Number(amount),
          surcharge: surchargeNaira,
          totalAmount: totalPayable,
          phone: user.phone || '',
          email: user.email || '',
        }),
      });

      const json = await res.json();
      const body = json.body || {};

      if (typeof json.finalBalance === 'number' && typeof onBalanceUpdate === 'function') {
        onBalanceUpdate(json.finalBalance);
      }

      if (json.success || body.success) {
        setReceipt({
          reference: json.requestReference,
          service: SERVICE_TABS.find((t) => t.id === activeService)?.label,
          biller: currentBiller?.name,
          package: selectedItem.name,
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
          message: json.error || body.message || 'Transaction declined. Please try again.',
        });
      }
    } catch {
      setAlert({ type: 'error', message: 'Network error while processing payment.' });
    } finally {
      setSubmitting(false);
    }
  };

  const getCustomerLabel = () => {
    if (activeService === 'electricity') return 'Meter Number';
    if (activeService === 'cable') return 'Smartcard / IUC Number';
    if (activeService === 'betting') return 'Betting User ID / Account';
    return 'Phone Number';
  };

  const copyToken = (tokenText) => {
    navigator.clipboard.writeText(tokenText);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <PageWrapper>
      <MainGrid>
        <Card>
          <Header>
            <Title>Bills & Utility Payment</Title>
            <Subtitle>Instant airtime, data, electricity tokens, TV & betting top-ups</Subtitle>
          </Header>

          <ServiceTabs>
            {SERVICE_TABS.map(({ id, label, icon: Icon }) => (
              <ServiceTab
                key={id}
                type="button"
                $active={activeService === id}
                onClick={() => handleServiceChange(id)}
              >
                <Icon size={20} />
                {label}
              </ServiceTab>
            ))}
          </ServiceTabs>

          {alert && (
            <AlertBox $variant={alert.type}>
              {alert.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
              <span>{alert.message}</span>
            </AlertBox>
          )}

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Select Provider</Label>
              <Select
                value={selectedBillerId}
                onChange={(e) => handleBillerChange(e.target.value)}
                disabled={loadingBillers}
                required
              >
                <option value="">
                  {loadingBillers ? 'Loading providers...' : '-- Choose Provider --'}
                </option>
                {filteredBillers.map((biller) => (
                  <option key={biller.id} value={biller.id}>
                    {biller.name}
                  </option>
                ))}
              </Select>
            </FormGroup>

            {selectedBillerId && (
              <FormGroup>
                <Label>
                  {activeService === 'electricity' ? 'Meter Type' : 'Select Package / Plan'}
                </Label>
                <Select
                  value={selectedItem?.paymentCode || ''}
                  onChange={(e) => {
                    const found = paymentItems.find((i) => i.paymentCode === e.target.value);
                    handleItemSelect(found || null);
                  }}
                  disabled={loadingItems}
                  required
                >
                  <option value="">
                    {loadingItems ? 'Loading plans...' : '-- Choose Option --'}
                  </option>
                  {paymentItems.map((item) => {
                    const itemPrice = Number(item.amount) / 100;
                    return (
                      <option key={item.paymentCode} value={item.paymentCode}>
                        {item.name} {itemPrice > 0 ? `- ₦${itemPrice.toLocaleString()}` : ''}
                      </option>
                    );
                  })}
                </Select>
              </FormGroup>
            )}

            {selectedItem && (
              <>
                <FormGroup>
                  <Label>{getCustomerLabel()}</Label>
                  <InputRow>
                    <Input
                      type="text"
                      placeholder={
                        requiresValidation ? `Enter ${getCustomerLabel()}` : 'e.g. 08012345678'
                      }
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
                        onClick={handleValidateCustomer}
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
                        <div style={{ fontSize: '0.78rem', opacity: 0.9 }}>
                          {customerInfo.address}
                        </div>
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

                  {(activeService === 'airtime' ||
                    activeService === 'electricity' ||
                    activeService === 'betting') &&
                    !selectedItem.isAmountFixed && (
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
        </Card>

        <div>
          <Card>
            <SummaryTitle>Transaction Summary</SummaryTitle>
            <SummaryRow>
              <span>Service</span>
              <span style={{ textTransform: 'capitalize' }}>{activeService}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Provider</span>
              <span>{currentBiller?.name || '—'}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Package</span>
              <span>{selectedItem?.name || '—'}</span>
            </SummaryRow>
            <SummaryRow>
              <span>{getCustomerLabel()}</span>
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
                gap: '0.5rem',
                marginTop: '1.25rem',
                fontSize: '0.78rem',
                color: '#64748b',
              }}
            >
              <ShieldCheck size={16} color="#2563eb" />
              <span>Secured by Interswitch Marketplace API</span>
            </div>
          </Card>
        </div>
      </MainGrid>

      {receipt && (
        <ReceiptModalOverlay onClick={() => setReceipt(null)}>
          <ReceiptCard onClick={(e) => e.stopPropagation()}>
            <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 0.75rem' }} />
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
                    title="Copy Token"
                  >
                    {copiedToken ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </TokenBox>
            )}

            <div style={{ textAlign: 'left', marginTop: '1.25rem' }}>
              <SummaryRow>
                <span>Reference</span>
                <span>{receipt.reference}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Provider</span>
                <span>{receipt.biller}</span>
              </SummaryRow>
              <SummaryRow>
                <span>{getCustomerLabel()}</span>
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
              style={{ marginTop: '1.5rem' }}
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
        </ReceiptModalOverlay>
      )}
    </PageWrapper>
  );
}