import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaPhone, FaWallet, FaUserShield, FaPenToSquare, FaCheck, FaXmark } from "react-icons/fa6";
import { Context } from "./Context";

const UserProfilePage = () => {
  const { user, setUser , api_url, fetchUserProfileById } = useContext(Context); // Assumes setUser updates global user state
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Local edit states initialized with user data context
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });

  // Sync state data whenever context user details load
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || ""
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      Swal.fire("Validation Error", "Name and Phone fields cannot be left empty.", "warning");
      return;
    }

    setLoading(true);

    try {
      const cacheBuster = Date.now();
      const response = await fetch(`${api_url}/update_profile.php?_=${cacheBuster}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || 0,
          name: formData.name,
          phone: formData.phone
        }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire("Profile Updated", "Your changes have been saved successfully.", "success");
        // Update local state engine context safely
        if (setUser) {
          setUser({ ...user, name: formData.name, phone: formData.phone });
        }
        fetchUserProfileById();
        setIsEditing(false);
      } else {
        Swal.fire("Update Failed", data.error || "An error occurred on the ledger engine.", "error");
      }
    } catch (err) {
      Swal.fire("Network Error", "Unable to establish synchronization with the backend server.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ProfileCard>
        {/* Profile Card Header Segment */}
        <HeaderRow>
          <div>
            <Title>Account Profile</Title>
            <Subtitle>Manage your ELEXDON CONNECT profile records security parameters.</Subtitle>
          </div>
          {!isEditing ? (
            <EditToggleButton onClick={() => setIsEditing(true)}>
              <FaPenToSquare size={12} /> Edit Profile
            </EditToggleButton>
          ) : (
            <CancelButton onClick={() => { setIsEditing(false); setFormData({ name: user?.name, phone: user?.phone }); }}>
              <FaXmark size={12} /> Cancel
            </CancelButton>
          )}
        </HeaderRow>

        <hr style={{ border: "0", borderTop: "1px solid #e2e8f0", margin: "15px 0" }} />

        {/* Dynamic Interactive Processing Form */}
        <form onSubmit={handleUpdateProfile}>
          <GridFieldsStructure>
            
            {/* Field item: Full Name */}
            <FieldBox>
              <Label>Full Name</Label>
              <InputGroup>
                <IconShell><FaUser size={13} color="#64748b" /></IconShell>
                <InputField
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing || loading}
                  placeholder="Enter full name"
                />
              </InputGroup>
            </FieldBox>

            {/* Field item: Phone Number */}
            <FieldBox>
              <Label>Phone Number</Label>
              <InputGroup>
                <IconShell><FaPhone size={13} color="#64748b" /></IconShell>
                <InputField
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing || loading}
                  placeholder="Enter phone number"
                />
              </InputGroup>
            </FieldBox>

            {/* Read-Only Field item: Email Address */}
            <FieldBox>
              <Label>Email Address (Immutable)</Label>
              <InputGroup $disabled>
                <IconShell><FaEnvelope size={13} color="#94a3b8" /></IconShell>
                <InputField type="email" value={user?.email || ""} disabled placeholder="N/A" />
              </InputGroup>
            </FieldBox>

            {/* Read-Only Field item: Core Account Role */}
            <FieldBox>
              <Label>System Authorization Role</Label>
              <InputGroup $disabled>
                <IconShell><FaUserShield size={13} color="#94a3b8" /></IconShell>
                <InputField type="text" value={(user?.role || "user").toUpperCase()} disabled placeholder="USER" />
              </InputGroup>
            </FieldBox>

          </GridFieldsStructure>

          {/* Wallet Balance Metrics Panel Box Display */}
          <BalanceDisplayBox>
            <BalanceLabelGroup>
              <FaWallet size={15} color="#2563eb" />
              <span>Available Wallet Balance</span>
            </BalanceLabelGroup>
            <BalanceAmount>
              NGN {parseFloat(user?.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </BalanceAmount>
          </BalanceDisplayBox>

          {/* Action Trigger Save Changes Button Grid Element */}
          {isEditing && (
            <SaveButton type="submit" disabled={loading}>
              <FaCheck size={13} /> {loading ? "Saving Records Updates..." : "Save Profile Changes"}
            </SaveButton>
          )}
        </form>
      </ProfileCard>
    </Container>
  );
};

export default UserProfilePage;

/* ===================== STYLED COMPONENT SYSTEM ===================== */
const Container = styled.div`
  min-height: 85vh;
  background: #f6f9ff;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
`;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 750px;
  background: #ffffff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #0f172a;
  margin: 0 0 2px 0;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: #64748b;
  margin: 0;
`;

const EditToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #2563eb;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #2563eb;
    color: #ffffff;
    border-color: #2563eb;
  }
`;

const CancelButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #e2e8f0;
    color: #0f172a;
  }
`;

const GridFieldsStructure = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FieldBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: #475569;
  letter-spacing: 0.04em;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.$disabled ? "#f8fafc" : "#ffffff"};
  border: 1px solid ${props => props.$disabled ? "#e2e8f0" : "#cbd5e1"};
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.15s ease;

  &:focus-within {
    border-color: #2563eb;
  }
`;

const IconShell = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-right: 1px solid #e2e8f0;
  flex-shrink: 0;
`;

const InputField = styled.input`
  width: 100%;
  border: none;
  padding: 8px 10px;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  outline: none;
  background: transparent;

  &:disabled {
    color: #64748b;
    cursor: not-allowed;
  }
`;

const BalanceDisplayBox = styled.div`
  margin-top: 15px;
  background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BalanceLabelGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #334155;
`;

const BalanceAmount = styled.span`
  font-size: 16px;
  font-weight: 800;
  color: #1e3a8a;
  font-family: monospace;
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  background: #16a34a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #15803d;
  }
  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;