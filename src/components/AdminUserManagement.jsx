import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FaUsers, FaUserCheck, FaUserShield, FaMagnifyingGlass, FaRotate } from "react-icons/fa6";
import { Context } from "./Context";

const AdminUserManagement = () => {
  const { user, api_url } = useContext(Context);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch users with full anti-caching query hooks
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const cacheBuster = Date.now();
      const response = await fetch(`${api_url}/admin_fetch_users.php?userId=${user?.id || 0}&_=${cacheBuster}`);
      const data = await response.json();

      if (data.success) {
        setUsersList(data.users);
      } else {
        Swal.fire("Access Denied", data.error || "Failed to parse admin listings data.", "error");
      }
    } catch (err) {
      Swal.fire("Network Error", "Unable to establish communication tracking system logs.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAllUsers();
    }
  }, [user]);

  // Handle role alterations immediately
  const handleRoleToggle = async (targetUserId, currentRole) => {
    const nextRole = currentRole === "admin" ? "user" : "admin";
    
    const confirmation = await Swal.fire({
      title: "Alter Privilege Level?",
      text: `Are you sure you want to change this user's structural authorization permissions to ${nextRole.toUpperCase()}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Update Role"
    });

    if (!confirmation.isConfirmed) return;

    try {
      const response = await fetch(`${api_url}/admin_update_role.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminId: user?.id || 0,
          targetUserId,
          newRole: nextRole
        })
      });
      
      const data = await response.json();

      if (data.success) {
        Swal.fire("Role Updated", `Account permissions updated to ${nextRole}.`, "success");
        // Hot-reload status array mappings on the fly
        setUsersList(prev => 
          prev.map(item => item.id === targetUserId ? { ...item, role: nextRole } : item)
        );
      } else {
        Swal.fire("Operation Faulted", data.error || "Unable to save target permissions matrix.", "error");
      }
    } catch (err) {
      Swal.fire("Communication Error", "The tracking endpoint failed to process transaction fields.", "error");
    }
  };

  // Filter implementation
  const filteredUsers = usersList.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.phone.includes(searchQuery)
  );

  return (
    <Container>
      <AdminCard>
        <HeaderRow>
          <div>
            <Title><FaUsers style={{ marginRight: "8px", verticalAlign: "middle" }} /> User Directory Directory</Title>
            <Subtitle>Manage platform membership privileges, modify global administrative access, and view client balances.</Subtitle>
          </div>
          <RefreshButton onClick={fetchAllUsers} disabled={loading}>
            <FaRotate className={loading ? "spin" : ""} /> Reload
          </RefreshButton>
        </HeaderRow>

        <hr style={{ border: "0", borderTop: "1px solid #e2e8f0", margin: "15px 0" }} />

        {/* Filter Toolbar Segment Block */}
        <SearchContainer>
          <SearchIcon><FaMagnifyingGlass size={13} color="#94a3b8" /></SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search directory records by name, email, or telephone values..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
<ScrollIndicatorBlock>
  <span>←</span>
  <span className="scroll-text">Scroll horizontally to view more columns</span>
  <span>→</span>
</ScrollIndicatorBlock>
        {/* Data Matrix Workspace View */}
        <TableWrapper>
          <UserTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>User Details</th>
                <th>Contact Phone</th>
                <th>Wallet Balance</th>
                <th>System Role</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                    Fetching updated structural platform datasets...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                    No matching user profile directory indexes located.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td><strong>#{u.id}</strong></td>
                    <td>
                      <NameText>{u.name}</NameText>
                      <EmailText>{u.email}</EmailText>
                    </td>
                    <td><PhoneText>{u.phone || "—"}</PhoneText></td>
                    <td>
                      <BalanceBadge>
                        ₦{parseFloat(u.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </BalanceBadge>
                    </td>
                    <td>
                      <RoleBadge $isAdmin={u.role === "admin"}>
                        {u.role === "admin" ? <FaUserShield size={10} /> : <FaUserCheck size={10} />}
                        {u.role.toUpperCase()}
                      </RoleBadge>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <ActionButton 
                        $isAdmin={u.role === "admin"}
                        onClick={() => handleRoleToggle(u.id, u.role)}
                        disabled={u.id === user?.id}
                      >
                        {u.role === "admin" ? "Demote User" : "Make Admin"}
                      </ActionButton>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </UserTable>
        </TableWrapper>
      </AdminCard>
    </Container>
  );
};

export default AdminUserManagement;

/* ===================== STYLED INTERFACE METRICS ARCHITECTURE ===================== */
const Container = styled.div`
  min-height: 85vh;
//   background: #f6f9ff;
//   padding: 15px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
`;

const AdminCard = styled.div`
  width: 100%;
  max-width: 1100px;
  background: #ffffff;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  color: #0f172a;
  margin: 0 0 4px 0;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: #64748b;
  margin: 0;
`;

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #334155;
  cursor: pointer;
  
  &:hover { background: #f8fafc; }
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { 100% { transform: rotate(360deg); } }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 2px 10px;
  margin-bottom: 15px;
  &:focus-within { border-color: #2563eb; background: #ffffff; }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  padding: 10px 0;
  font-size: 14px;
  outline: none;
  background: transparent;
  color: #0f172a;
  font-weight: 600;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;

  thead {
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    th { padding: 12px; font-weight: 700; color: #475569; text-transform: uppercase; font-size: 11px; letter-spacing: 0.03em; }
  }

  tbody tr {
    border-bottom: 1px solid #f1f5f9;
    &:hover { background: #fdfdfd; }
    td { padding: 12px; vertical-align: middle; color: #334155; }
  }
`;

const NameText = styled.div` font-weight: 700; color: #0f172a; font-size: 14px; `;
const EmailText = styled.div` color: #64748b; font-size: 12px; `;
const PhoneText = styled.span` font-family: monospace; font-weight: 600; `;
const BalanceBadge = styled.span` font-family: monospace; font-weight: 700; color: #0f172a; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; `;

const RoleBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 800;
  background: ${props => props.$isAdmin ? "#fef2f2" : "#f0fdf4"};
  color: ${props => props.$isAdmin ? "#ef4444" : "#22c55e"};
  border: 1px solid ${props => props.$isAdmin ? "#fee2e2" : "#dcfce7"};
`;

const ActionButton = styled.button`
  background: ${props => props.$isAdmin ? "#f1f5f9" : "#2563eb"};
  color: ${props => props.$isAdmin ? "#334155" : "#ffffff"};
  border: 1px solid ${props => props.$isAdmin ? "#cbd5e1" : "transparent"};
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover { background: ${props => props.$isAdmin ? "#cbd5e1" : "#1d4ed8"}; }
  &:disabled { background: #e2e8f0; color: #94a3b8; border-color: transparent; cursor: not-allowed; }
`;

const ScrollIndicatorBlock = styled.p`
  display: none; /* Hidden on desktop by default */
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 8px 0;
  animation: pulseArrows 2s infinite ease-in-out;

  @media (max-width: 768px) {
    display: flex; /* Appears only on mobile tablets and phones */
  }

  .scroll-text {
    color: #64748b;
  }

  /* Optional: Adds a tiny visual bounce to catch their eye */
  @keyframes pulseArrows {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.03); opacity: 1; }
  }
`;