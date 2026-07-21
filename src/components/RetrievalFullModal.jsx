import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Context } from './Context';

// --- STYLED COMPONENTS ---
const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height:100%;
  width:100%;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 10px;
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  max-height: 60vh;
  overflow-y: auto;
  padding: 10px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  font-family: system-ui, -apple-system, sans-serif;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 8px;
  margin-bottom: 10px;
`;

const ModalTitle = styled.h2`
  font-size: 1.1rem;
  color: #0f172a;
  margin: 0;
  font-weight: 800;
`;

const CloseButton = styled.button`
  background: #f1f5f9;
  color: #334155;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { background: #e2e8f0; }
`;

const SectionSubHeader = styled.h3`
  font-size: 0.9rem;
  color: #2563eb;
  margin: 10px 0 6px 0;
  font-weight: 700;
  border-left: 3px solid #2563eb;
  padding-left: 6px;
`;

const FormGroup = styled.div`
  margin-bottom: 8px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.85rem;
  box-sizing: border-box;
  outline: none;
  &:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.1); }
`;

const FileUploadBox = styled.div`
  border: 1px dashed #cbd5e1;
  padding: 8px;
  border-radius: 8px;
  background: #f8fafc;
  text-align: center;
  margin-bottom: 4px;
`;

const HelpText = styled.span`
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 2px;
`;

const SummaryBox = styled.div`
  background: #f1f5f9;
  border-radius: 8px;
  padding: 8px 10px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
`;

const SummaryItem = styled.div`
  div:first-child {
    font-size: 0.75rem;
    color: #64748b;
  }
  div:last-child {
    font-weight: 800;
    color: ${props => props.$insufficient ? '#dc2626' : '#0f172a'};
  }
`;

const CheckboxGroup = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.8rem;
  color: #334155;
  margin-bottom: 8px;
  cursor: pointer;
  line-height: 1.3;

  input {
    margin-top: 2px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #2563eb;
  color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  margin-top: 6px;
  transition: background 0.15s ease;
  &:hover { background-color: #1d4ed8; }
  &:disabled { background-color: #94a3b8; cursor: not-allowed; }
`;

// --- COMPONENT ---
export default function RetrievalFullModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signatureFile, setSignatureFile] = useState(null);
  const [ninSlipFile, setNinSlipFile] = useState(null);
 const {api_url,user,fetchUserProfileById}=useContext(Context);
  const [formData, setFormData] = useState({
    companyName: '',
    rcNumber: '',
    ninDigits: '',
    confirmAccurate: false,
    authorizeDeduction: false
  });

  const servicePrice = 36000.00;


  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e, setFileState) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        Swal.fire('Format Mismatch', 'Only JPG, PNG or PDF files are allowed.', 'error');
        e.target.value = null;
        setFileState(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire('File Too Large', 'Maximum allowed size limit is 5MB.', 'warning');
        e.target.value = null;
        setFileState(null);
        return;
      }
      setFileState(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!signatureFile || !ninSlipFile) {
      Swal.fire('Files Required', 'Please upload both your Owner Signature and NIN Slip documents.', 'warning');
      return;
    }



    if (!formData.confirmAccurate || !formData.authorizeDeduction) {
      Swal.fire('Declarations Required', 'Please check both confirmation and authorization boxes to proceed.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      Swal.fire({ title: 'Submitting Request...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

      const dataPayload = new FormData();
      dataPayload.append('serviceType', 'retrieval_full');
      dataPayload.append('companyName', formData.companyName);
      dataPayload.append('rcNumber', formData.rcNumber);
      dataPayload.append('ninDigits', formData.ninDigits);
      dataPayload.append('signatureFile', signatureFile);
      dataPayload.append('ninSlipFile', ninSlipFile);

      // Simulate API call processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      Swal.fire({
        icon: 'success',
        title: 'Request Submitted',
        text: 'Your retrieval request has been filed successfully.',
        confirmButtonColor: '#2563eb'
      });
      onClose();
    } catch (err) {
      Swal.fire('System Exception', 'Error processing your request packet.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Retrieval - Certificate, Status Report & MEMART</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <SectionSubHeader>Company / Business Information</SectionSubHeader>
          
          <FormGroup>
            <Label>Company / Business Name *</Label>
            <Input 
              type="text" 
              name="companyName" 
              value={formData.companyName} 
              onChange={handleInputChange} 
              placeholder="Enter registered business name" 
              required 
            />
          </FormGroup>

          <FormGroup>
            <Label>RC / BN Number *</Label>
            <Input 
              type="text" 
              name="rcNumber" 
              value={formData.rcNumber} 
              onChange={handleInputChange} 
              placeholder="e.g., RC123456" 
              required 
            />
          </FormGroup>

          <SectionSubHeader>NIN Information</SectionSubHeader>
          
          <FormGroup>
            <Label>NIN Digits (11 digits) *</Label>
            <Input 
              type="text" 
              name="ninDigits" 
              maxLength={11} 
              value={formData.ninDigits} 
              onChange={handleInputChange} 
              placeholder="Enter 11-digit NIN" 
              required 
            />
          </FormGroup>

          <SectionSubHeader>Required Documents</SectionSubHeader>

          <FormGroup>
            <Label>Owner Signature (on white background) *</Label>
            <FileUploadBox>
              <Input 
                type="file" 
                accept=".jpg,.jpeg,.png,.pdf" 
                onChange={(e) => handleFileChange(e, setSignatureFile)} 
                required 
              />
            </FileUploadBox>
            <HelpText>JPG, PNG or PDF — max 5MB</HelpText>
          </FormGroup>

          <FormGroup>
            <Label>NIN Slip *</Label>
            <FileUploadBox>
              <Input 
                type="file" 
                accept=".jpg,.jpeg,.png,.pdf" 
                onChange={(e) => handleFileChange(e, setNinSlipFile)} 
                required 
              />
            </FileUploadBox>
            <HelpText>JPG, PNG or PDF — max 5MB</HelpText>
          </FormGroup>

          <SummaryBox>
            <SummaryItem>
              <div>Service Fee</div>
              <div>₦{servicePrice.toLocaleString()}.00</div>
            </SummaryItem>
            <SummaryItem>
              <div>Wallet Balance</div>
              <div>₦{user.balance}</div>
            </SummaryItem>
          </SummaryBox>

          <CheckboxGroup>
            <input 
              type="checkbox" 
              name="confirmAccurate" 
              checked={formData.confirmAccurate} 
              onChange={handleInputChange} 
              required 
            />
            <span>I confirm that all information provided is accurate and complete</span>
          </CheckboxGroup>

          <CheckboxGroup>
            <input 
              type="checkbox" 
              name="authorizeDeduction" 
              checked={formData.authorizeDeduction} 
              onChange={handleInputChange} 
              required 
            />
            <span>I authorise the deduction of the service fee from my wallet</span>
          </CheckboxGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            Submit Request
          </SubmitButton>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
}