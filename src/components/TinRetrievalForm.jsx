import React, { useContext, useState } from 'react';
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

const InfoBox = styled.div`
  background-color: #f0fdf4;
  border-left: 4px solid #16a34a;
  padding: 12px 16px;
  border-radius: 0 8px 8px 0;
  font-size: 0.875rem;
  color: #14532d;
  margin-bottom: 24px;
  line-height: 1.5;
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

const SelectionCard = styled.div`
  border: 2px solid ${props => props.theme.colors?.primary || '#2563eb'};
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardMeta = styled.div`
  h4 {
    margin: 0 0 4px 0;
    font-size: 1rem;
    font-weight: 600;
    color: #0f172a;
  }
  p {
    margin: 0;
    font-size: 0.85rem;
    color: #64748b;
  }
`;

const CardPrice = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
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

const FieldNote = styled.p`
  margin: 4px 0 0 0;
  font-size: 0.775rem;
  color: #64748b;
`;

const TotalSummaryBox = styled.div`
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 0.95rem;
  margin-top: 24px;
  color: #0f172a;
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
`;

// --- MAIN COMPONENT ---
const TinRetrievalForm = () => {
  const SERVICE_FEE = 1500;
  const navigate = useNavigate();
  const {user,fetchUserProfileById,api_url}=useContext(Context)

  // Component States
  const [corporateType, setCorporateType] = useState('');
  const [regNumber, setRegNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!corporateType) {
      Swal.fire({ icon: 'error', title: 'Selection Missing', text: 'Please select a corporate type structure.' });
      return;
    }

    if (!regNumber.trim()) {
      Swal.fire({ icon: 'error', title: 'Input Empty', text: 'Please enter your CAC Registration Number or Corporate ID.' });
      return;
    }

    Swal.fire({
      title: 'Confirm TIN Processing',
      text: `A sum of ₦${SERVICE_FEE.toLocaleString()}.00 will be deducted from your wallet balance. Proceed?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Process Order'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({ title: 'Submitting Request...', text: 'Logging your TIN management query metrics.', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

          const formData = new FormData();
          formData.append('userId', user?.id || 0);
          formData.append('corporateType', corporateType);
          formData.append('regNumber', regNumber.trim());

          const response = await fetch(`${api_url}/process_tin_retrieval.php`, {
            method: 'POST',
            body: formData
          });

          if (!response.ok) throw new Error(`HTTP code failure: ${response.status}`);
          const data = await response.json();

          if (data.success) {
            Swal.fire({ icon: 'success', title: 'Order Submitted Successfully', text: data.message || 'TIN processing setup successfully completed.', confirmButtonColor: '#2563eb' });
            setCorporateType('');
            setRegNumber('');
           fetchUserProfileById();
           navigate('/userdashboard/overview')
          } else {
            Swal.fire({ icon: 'error', title: 'Processing Halt', text: data.error || 'Server rejected submission execution blocks.' });
          }
        } catch (err) {
          console.error(err);
          Swal.fire({ icon: 'error', title: 'Network Outage', text: 'Could not contact the backend servers. Verify your connection rules.' });
        }
      }
    });
  };

  return (
    <FormContainer>
      <BackButton onClick={() => navigate('/userdashboard/overview')}>← Back to Services Portal</BackButton>
      
      <FormTitle>TIN Registration/Retrieval</FormTitle>
      <FormSubtitle>Register or Retrieve your Tax Identification Number</FormSubtitle>

      {/* <InfoBox>
        <strong>Note:</strong> TIN registration and retrieval takes within 24 hours. Kindly check your dashboard status parameters after filing execution logs complete.
      </InfoBox> */}

      <form onSubmit={handleSubmit}>
        
        {/* <SectionTitle>Select Retrieval Type</SectionTitle> */}
        <SelectionCard>
          <CardMeta>
            <h4>Corporate</h4>
            <p>For business/company TIN registration/retrieval management</p>
          </CardMeta>
          <CardPrice>₦{SERVICE_FEE.toLocaleString()}.00</CardPrice>
        </SelectionCard>

        <SectionTitle>Corporate TIN Retrieval</SectionTitle>
        
        <FormGroup>
          <Label>Corporate Type *</Label>
          <Select 
            value={corporateType} 
            onChange={(e) => setCorporateType(e.target.value)}
            required
          >
            <option value="">-- Select Corporate Type --</option>
            <option value="Business Name">Business Name</option>
            <option value="Company">Company</option>
            <option value="Incorporated Trustee">Incorporated Trustee</option>
            <option value="Limited Partnership">Limited Partnership</option>
            <option value="Limited Liability Partnership">Limited Liability Partnership</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Registration/ID Number *</Label>
          <Input 
            type="text" 
            placeholder="Enter your registration code numbers" 
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
            required 
          />
          <FieldNote>Note: Enter your CAC registration number or corporate ID as applicable.</FieldNote>
        </FormGroup>

        <TotalSummaryBox>
          <span>Service Fee:</span>
          <span>₦{SERVICE_FEE.toLocaleString()}.00</span>
        </TotalSummaryBox>

        <SubmitButton type="submit">Pay & Submit Request</SubmitButton>

      </form>
    </FormContainer>
  );
};

export default TinRetrievalForm;