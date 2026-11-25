import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Context } from './Context';

// --- STYLED COMPONENTS ---
const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  background-color: ${props => props.theme.colors?.bgWhite || '#ffffff'};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors?.borderLight || '#e5e7eb'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors?.primary || '#2563eb'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 0;
  &:hover {
    text-decoration: underline;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors?.textDark || '#111827'};
  margin-bottom: 4px;
`;

const FormSubtitle = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors?.textMuted || '#64748b'};
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.colors?.textDark || '#1f2937'};
  margin-top: 24px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${props => props.theme.colors?.borderLight || '#f1f5f9'};
  padding-bottom: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.colors?.textMedium || '#374151'};
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.theme.colors?.borderMedium || '#cbd5e1'};
  border-radius: 8px;
  font-size: 0.95rem;
  color: ${props => props.theme.colors?.textDark || '#111827'};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors?.primary || '#2563eb'};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.theme.colors?.borderMedium || '#cbd5e1'};
  border-radius: 8px;
  font-size: 0.95rem;
  color: ${props => props.theme.colors?.textDark || '#111827'};
  background-color: #ffffff;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors?.primary || '#2563eb'};
  }
`;

const InfoBox = styled.div`
  background-color: ${props => props.theme.colors?.bgInfo || '#f8fafc'};
  border-left: 4px solid ${props => props.theme.colors?.info || '#64748b'};
  padding: 12px;
  border-radius: 0 8px 8px 0;
  font-size: 0.85rem;
  color: ${props => props.theme.colors?.textMuted || '#475569'};
  margin-top: 8px;
  line-height: 1.4;
`;

const UploadBox = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border: 2px dashed ${props => props.theme.colors?.borderMedium || '#cbd5e1'};
  border-radius: 8px;
  background-color: #fafafa;
  cursor: pointer;
  text-align: center;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${props => props.theme.colors?.primary || '#2563eb'};
  }

  input {
    display: none;
  }
`;

const UploadText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.colors?.primary || '#2563eb'};
`;

const UploadSubtext = styled.span`
  font-size: 0.75rem;
  color: #718096;
  margin-top: 4px;
  line-height: 1.4;
`;

const FileBadge = styled.div`
  margin-top: 8px;
  font-size: 0.8rem;
  color: #16a34a;
  background-color: #f0fdf4;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
`;

const PriceBreakdownBox = styled.div`
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  font-size: 0.9rem;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: ${props => props.theme.colors?.textMedium || '#4a5568'};

  &.total {
    border-top: 1px solid #e2e8f0;
    padding-top: 8px;
    margin-top: 8px;
    font-weight: 700;
    color: ${props => props.theme.colors?.textDark || '#111827'};
    font-size: 1.05rem;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  cursor: pointer;

  input {
    margin-top: 3px;
  }

  label {
    font-size: 0.85rem;
    color: ${props => props.theme.colors?.textMedium || '#4a5568'};
    line-height: 1.4;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: ${props => props.theme.colors?.primary || '#2563eb'};
  color: #ffffff;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors?.primaryHover || '#1d4ed8'};
  }

  &:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
  }
`;

// --- MAIN COMPONENT ---
const CompanyAnnualReturnsForm = ({ userWalletBalance, onFilingSuccess }) => {
  // Pricing configuration rules for Companies


  const {user,fetchUserProfileById,api_url, prices}=useContext(Context)

  // Form states
  const [companyName, setCompanyName] = useState('');
  const [rcNumber, setRcNumber] = useState('');
  const [nin, setNin] = useState('');
  const [turnover, setTurnover] = useState('');
  const [startingYear, setStartingYear] = useState('');
  const [includeAudit, setIncludeAudit] = useState(false);
  const navigate = useNavigate();
  
  // File state (Single merged package)
  const [mergedDocument, setMergedDocument] = useState(null);

  // Agreement states
  const [infoConfirmed, setInfoConfirmed] = useState(false);
  const [walletAuthorized, setWalletAuthorized] = useState(false);


  const companyPriceItem = prices.find(p => p.id === "23");
const companyPenaltyPriceItem = prices.find(p => p.id === "24");
const companyAuditPriceItem = prices.find(p => p.id === "25");


    const BASE_PRICE_PER_YEAR = companyPriceItem?.price; 
  const PENALTY_PER_YEAR = companyPenaltyPriceItem?.price;     
  const AUDIT_PRICE = companyAuditPriceItem?.price;
  const CURRENT_COMPLETED_YEAR = 2025;

  // Pricing calculations
  const [pricing, setPricing] = useState({ totalYears: 0, baseTotal: 0, penaltyTotal: 0, auditFee: 0, grandTotal: 0 });

  // Year options list 
  const yearOptions = [];
  for (let y = CURRENT_COMPLETED_YEAR; y >= 2000; y--) {
    yearOptions.push(y);
  }

  // Real-time calculation loop
  useEffect(() => {
    if (!startingYear) {
      setPricing({ totalYears: 0, baseTotal: 0, penaltyTotal: 0, auditFee: 0, grandTotal: 0 });
      return;
    }

    const start = parseInt(startingYear);
    const totalYears = (CURRENT_COMPLETED_YEAR - start) + 1;
    const penaltyYears = totalYears > 1 ? totalYears - 1 : 0;

    const baseTotal = totalYears * BASE_PRICE_PER_YEAR;
    const penaltyTotal = penaltyYears * PENALTY_PER_YEAR;
    const auditFee = includeAudit ? AUDIT_PRICE : 0;
    const grandTotal = baseTotal + penaltyTotal + auditFee;

    setPricing({ totalYears, baseTotal, penaltyTotal, auditFee, grandTotal });
  }, [startingYear, includeAudit]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      Swal.fire({ icon: 'error', title: 'Invalid Format', text: 'Please upload documents combined inside a single PDF file.' });
      setMergedDocument(null);
      e.target.value = '';
      return;
    }

    const maxSizeBytes = 25 * 1024 * 1024; // 25MB
    if (file.size > maxSizeBytes) {
      Swal.fire({ icon: 'error', title: 'File Too Large', text: 'The document file size must be less than 25MB.' });
      setMergedDocument(null);
      e.target.value = '';
      return;
    }

    setMergedDocument(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName.trim() || !rcNumber.trim() || !turnover.trim()) {
      Swal.fire({ icon: 'error', title: 'Missing Details', text: 'Please complete all business parameters fields.' });
      return;
    }

    if (nin.length !== 11 || !/^\d+$/.test(nin)) {
      Swal.fire({ icon: 'error', title: 'Invalid NIN', text: 'The NIN must contain exactly 11 numeric digits.' });
      return;
    }

    if (!startingYear) {
      Swal.fire({ icon: 'error', title: 'Select Year', text: 'Please select a starting year boundary.' });
      return;
    }

    if (!mergedDocument) {
      Swal.fire({ icon: 'error', title: 'Upload Pack Missing', text: 'Please select your merged PDF containing your CAC certificate and NIN slip.' });
      return;
    }

    if (!infoConfirmed || !walletAuthorized) {
      Swal.fire({ icon: 'warning', title: 'Agreement Required', text: 'Please acknowledge the agreement conditions checkboxes.' });
      return;
    }

    // if (userWalletBalance && userWalletBalance < pricing.grandTotal) {
    //   Swal.fire({ icon: 'error', title: 'Insufficient Wallet Funds', text: `You require ₦${pricing.grandTotal.toLocaleString()}.00 to complete this company filing.` });
    //   return;
    // }

    Swal.fire({
      title: 'Confirm Company Payment',
      text: `You will be charged ₦${pricing.grandTotal.toLocaleString()}.00 from your wallet account. Proceed with registration data processing?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Deduct & File'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({ title: 'Uploading Data...', text: 'Processing your filing records securely.', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

          const formData = new FormData();
          formData.append('userId', user?.id || 0);
          formData.append('companyName', companyName.trim());
          formData.append('rcNumber', rcNumber.trim());
          formData.append('nin', nin);
          formData.append('turnover', turnover.trim());
          formData.append('startingYear', startingYear);
          formData.append('includeAudit', includeAudit ? 1 : 0);
          formData.append('merged_document', mergedDocument);

          const response = await fetch(`${api_url}/file_company_annual_return.php`, {
            method: 'POST',
            body: formData
          });

          if (!response.ok) throw new Error(`HTTP network error code: ${response.status}`);
          const data = await response.json();

          if (data.success) {
            Swal.fire({ icon: 'success', title: 'Company Filing Processed', text: data.message || 'Filing complete.', confirmButtonColor: '#2563eb' });
            // if (onFilingSuccess) onFilingSuccess();
            navigate('/userdashboard/service/annualreturns')
          } else {
            Swal.fire({ icon: 'error', title: 'Transaction Terminated', text: data.error || 'Backend process halted.' });
          }
        } catch (err) {
          console.error(err);
          Swal.fire({ icon: 'error', title: 'Network Connection Timeout', text: 'An communication channel anomaly occurred. Retry shortly.' });
        }
      }
    });
  };

  return (
    <FormContainer>
      <BackButton onClick={() => navigate('/userdashboard/service/annualreturns')}>← Back to Select Return Type</BackButton>
      
      <FormTitle>Company Annual Returns</FormTitle>
      <FormSubtitle>Filing application interface for Private and Public Limited Liability Companies</FormSubtitle>

      <form onSubmit={handleSubmit}>
        
        <SectionTitle>Business Details</SectionTitle>
        
        <FormGroup>
          <Label>Business / Company Name *</Label>
          <Input 
            type="text" 
            placeholder="Enter company name as registered with CAC" 
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required 
          />
        </FormGroup>

        <FormGroup>
          <Label>RC / BN Number *</Label>
          <Input 
            type="text" 
            placeholder="Enter RC Company Number" 
            value={rcNumber}
            onChange={(e) => setRcNumber(e.target.value)}
            required 
          />
        </FormGroup>

        <FormGroup>
          <Label>NIN (11 digits) *</Label>
          <Input 
            type="text" 
            maxLength={11}
            placeholder="Enter Managing Director's 11-digit NIN" 
            value={nin}
            onChange={(e) => setNin(e.target.value)}
            required 
          />
        </FormGroup>

        <FormGroup>
          <Label>Total Turnover Per Year (₦) *</Label>
          <Input 
            type="number" 
            placeholder="e.g. 2500000" 
            value={turnover}
            onChange={(e) => setTurnover(e.target.value)}
            required 
          />
        </FormGroup>

        <SectionTitle>Select Starting Year</SectionTitle>
        <FormGroup>
          <Label>From which year do you want to start filing?</Label>
          <Select 
            value={startingYear} 
            onChange={(e) => setStartingYear(e.target.value)}
            required
          >
            <option value="">-- Select Starting Year --</option>
            {yearOptions.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
          
          <InfoBox>
            <strong>How it works:</strong> Select the earliest year you need to file. The system will automatically calculate all years from your selected year up to 2025.
            <br /><br />
            <strong>Pricing:</strong> 2025 (Base Year) costs base price only with no penalty. Earlier years add the base price plus a penalty fee per year.
          </InfoBox>
        </FormGroup>

        <SectionTitle>Audit Option</SectionTitle>
        <FormGroup>
          <CheckboxGroup>
            <input 
              type="checkbox" 
              id="auditOpt" 
              checked={includeAudit} 
              onChange={(e) => setIncludeAudit(e.target.checked)} 
            />
            <label htmlFor="auditOpt"><strong>Include Audit (+₦5,000.00 flat)</strong></label>
          </CheckboxGroup>
        </FormGroup>

        <SectionTitle>Upload Documents</SectionTitle>
        <FormGroup style={{ marginBottom: '24px' }}>
          <Label>Combined Application Package (CAC Certificate & NIN Slip) *</Label>
          <UploadBox>
            <UploadText>Click to upload merged documents</UploadText>
            <UploadSubtext>
              Please merge your <strong>CAC Certificate</strong> and <strong>NIN Slip</strong> together into a single file.
              <br />
              Accepts: <strong>PDF files only</strong> (Max 25MB)
            </UploadSubtext>
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange}
              required
            />
          </UploadBox>
          {mergedDocument && <FileBadge>✓ {mergedDocument.name} ({(mergedDocument.size / (1024 * 1024)).toFixed(2)} MB)</FileBadge>}
        </FormGroup>

        <SectionTitle>Price Breakdown</SectionTitle>
        <FormGroup>
          {!startingYear ? (
            <PriceBreakdownBox style={{ color: '#718096', textAlign: 'center' }}>
              Select a starting year to see price breakdown
            </PriceBreakdownBox>
          ) : (
            <PriceBreakdownBox>
              <PriceRow>
                <span>Filing Interval:</span>
                <span>{startingYear} — {CURRENT_COMPLETED_YEAR} ({pricing.totalYears} Year{pricing.totalYears > 1 ? 's' : ''})</span>
              </PriceRow>
              <PriceRow>
                <span>Base Filing Fees (₦19,000 × {pricing.totalYears}):</span>
                <span>₦{pricing.baseTotal.toLocaleString()}.00</span>
              </PriceRow>
              <PriceRow>
                <span>Accumulated Penalties (₦8,000 × {pricing.totalYears > 1 ? pricing.totalYears - 1 : 0}):</span>
                <span>₦{pricing.penaltyTotal.toLocaleString()}.00</span>
              </PriceRow>
              {includeAudit && (
                <PriceRow>
                  <span>Audit Document Processing Fee:</span>
                  <span>₦{pricing.auditFee.toLocaleString()}.00</span>
                </PriceRow>
              )}
              <PriceRow className="total">
                <span>Total Calculated Amount:</span>
                <span>₦{pricing.grandTotal.toLocaleString()}.00</span>
              </PriceRow>
            </PriceBreakdownBox>
          )}
        </FormGroup>

        <FormGroup style={{ marginTop: '24px' }}>
          <CheckboxGroup>
            <input 
              type="checkbox" 
              id="confirmInfo" 
              checked={infoConfirmed} 
              onChange={(e) => setInfoConfirmed(e.target.checked)} 
            />
            <label htmlFor="confirmInfo">I confirm that all information provided is accurate and complete</label>
          </CheckboxGroup>

          <CheckboxGroup>
            <input 
              type="checkbox" 
              id="authorizeWallet" 
              checked={walletAuthorized} 
              onChange={(e) => setWalletAuthorized(e.target.checked)} 
            />
            <label htmlFor="authorizeWallet">I authorize the deduction of the total amount from my wallet</label>
          </CheckboxGroup>
        </FormGroup>

        <SubmitButton type="submit" disabled={!infoConfirmed || !walletAuthorized || !startingYear || !mergedDocument}>
          Submit Application
        </SubmitButton>

      </form>
    </FormContainer>
  );
};

export default CompanyAnnualReturnsForm;