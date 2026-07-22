import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Context } from './Context';

// --- STYLED COMPONENTS ---
const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
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
  padding: 12px;
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
  margin: 12px 0 6px 0;
  font-weight: 700;
  border-left: 3px solid #2563eb;
  padding-left: 6px;
`;

const FormGroup = styled.div`
  margin-bottom: 8px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  @media(max-width: 480px) {
    grid-template-columns: 1fr;
  }
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

const Select = styled.select`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.85rem;
  box-sizing: border-box;
  background: #fff;
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
    color: #0f172a;
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

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", 
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", 
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", 
  "Taraba", "Yobe", "Zamfara"
];

// --- COMPONENT ---
export default function ChangeCompanySecretaryModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cacCertFile, setCacCertFile] = useState(null);
  const [directorSignatureFile, setDirectorSignatureFile] = useState(null);
  const { api_url, user, fetchUserProfileById } = useContext(Context);

  const [formData, setFormData] = useState({
    rcNumber: '',
    biodataType: 'Correction of Existing Details',
    fullName: '',
    email: '',
    phone: '',
    houseNo: '',
    street: '',
    city: '',
    lga: '',
    state: '',
    stateOfOrigin: '',
    homeTown: '',
    occupation: '',
    dob: '',
    gender: 'Male',
    religion: 'Christianity',
    ninDigits: '',
    confirmAccurate: false,
    authorizeDeduction: false
  });

   const {services}=useContext(Context);
  
  // Find the specific service by its id
  const targetService = services.find(service => service.id === 'change_sec');
  
  // Extract and assign the price to a variable
  const servicePrice = targetService ? targetService.price : null;

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

    if (!cacCertFile || !directorSignatureFile) {
      Swal.fire('Files Required', 'Please upload both CAC Certificate and Director Signature documents.', 'warning');
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
      dataPayload.append('serviceType', 'change_company_secretary');
      
      Object.keys(formData).forEach(key => {
        dataPayload.append(key, formData[key]);
      });

      dataPayload.append('cacCertFile', cacCertFile);
      dataPayload.append('directorSignatureFile', directorSignatureFile);

      // Simulate API call processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      Swal.fire({
        icon: 'success',
        title: 'Request Submitted',
        text: 'Your company secretary change/addition request has been filed successfully.',
        confirmButtonColor: '#2563eb'
      });

      if (user?.id && fetchUserProfileById) {
        fetchUserProfileById(user.id);
      }

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
          <ModalTitle>Addition / Change of Company Secretary</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <SectionSubHeader>Company / Business Information</SectionSubHeader>
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

          <SectionSubHeader>Secretary Details / Biodata</SectionSubHeader>
          <FormGroup>
            <Label>This biodata is for *</Label>
            <Select name="biodataType" value={formData.biodataType} onChange={handleInputChange}>
              <option value="Correction of Existing Details">Correction of Existing Details</option>
              <option value="Replacement / New Individual">Replacement / New Individual</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Full Name *</Label>
            <Input 
              type="text" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleInputChange} 
              placeholder="Enter full name" 
              required 
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label>Email Address</Label>
              <Input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                placeholder="Email address" 
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone Number (11 digits)</Label>
              <Input 
                type="text" 
                name="phone" 
                maxLength={11} 
                value={formData.phone} 
                onChange={handleInputChange} 
                placeholder="Phone number" 
              />
            </FormGroup>
          </FormRow>

          <SectionSubHeader>HOME ADDRESS</SectionSubHeader>
          <FormRow>
            <FormGroup>
              <Label>No.</Label>
              <Input 
                type="text" 
                name="houseNo" 
                value={formData.houseNo} 
                onChange={handleInputChange} 
                placeholder="House No." 
              />
            </FormGroup>
            <FormGroup>
              <Label>Street</Label>
              <Input 
                type="text" 
                name="street" 
                value={formData.street} 
                onChange={handleInputChange} 
                placeholder="Street name" 
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>City</Label>
              <Input 
                type="text" 
                name="city" 
                value={formData.city} 
                onChange={handleInputChange} 
                placeholder="City" 
              />
            </FormGroup>
            <FormGroup>
              <Label>LGA</Label>
              <Input 
                type="text" 
                name="lga" 
                value={formData.lga} 
                onChange={handleInputChange} 
                placeholder="LGA" 
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label>State</Label>
            <Select name="state" value={formData.state} onChange={handleInputChange}>
              <option value="">Select State</option>
              {NIGERIAN_STATES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </Select>
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label>State of Origin</Label>
              <Select name="stateOfOrigin" value={formData.stateOfOrigin} onChange={handleInputChange}>
                <option value="">Select State of Origin</option>
                {NIGERIAN_STATES.map(st => (
                  <option key={`origin-${st}`} value={st}>{st}</option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Home Town</Label>
              <Input 
                type="text" 
                name="homeTown" 
                value={formData.homeTown} 
                onChange={handleInputChange} 
                placeholder="Home town" 
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>Occupation</Label>
              <Input 
                type="text" 
                name="occupation" 
                value={formData.occupation} 
                onChange={handleInputChange} 
                placeholder="Occupation" 
              />
            </FormGroup>
            <FormGroup>
              <Label>Date of Birth</Label>
              <Input 
                type="date" 
                name="dob" 
                value={formData.dob} 
                onChange={handleInputChange} 
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>Gender</Label>
              <Select name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Religion</Label>
              <Select name="religion" value={formData.religion} onChange={handleInputChange}>
                <option value="Christianity">Christianity</option>
                <option value="Islam">Islam</option>
                <option value="Traditional">Traditional</option>
                <option value="Others">Others</option>
              </Select>
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label>NIN Digits (11 digits)</Label>
            <Input 
              type="text" 
              name="ninDigits" 
              maxLength={11} 
              value={formData.ninDigits} 
              onChange={handleInputChange} 
              placeholder="Enter 11-digit NIN" 
            />
          </FormGroup>

          <SectionSubHeader>Required Documents</SectionSubHeader>
          <FormGroup>
            <Label>CAC Certificate *</Label>
            <FileUploadBox>
              <Input 
                type="file" 
                accept=".jpg,.jpeg,.png,.pdf" 
                onChange={(e) => handleFileChange(e, setCacCertFile)} 
                required 
              />
            </FileUploadBox>
            <HelpText>JPG, PNG or PDF — max 5MB</HelpText>
          </FormGroup>

          <FormGroup>
            <Label>Director's Signature *</Label>
            <FileUploadBox>
              <Input 
                type="file" 
                accept=".jpg,.jpeg,.png,.pdf" 
                onChange={(e) => handleFileChange(e, setDirectorSignatureFile)} 
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
              <div>₦{user?.balance ?? '0.00'}</div>
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