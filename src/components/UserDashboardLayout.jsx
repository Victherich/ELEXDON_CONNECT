import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../Features/Slice';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  FaGlobe, 
  FaGrip,             // <-- Fixed icon name here
  FaCreditCard, 
  FaFileInvoiceDollar, 
  FaUserGear, 
  FaArrowRightFromBracket, 
  FaBars, 
//   FaTimes, 
  FaCircleUser 
} from 'react-icons/fa6';
import { Fade } from 'react-awesome-reveal';
import { FaUser } from 'react-icons/fa';

const UserDashboardLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Securely retrieve state values from the general user sub-object
  const userInfo = useSelector((state) => state.auth?.userInfo) || { name: "Client Node Account" };

  const userNavItems = [
    { path: "/userdashboard/overview", label: "Dashboard", icon: <FaGrip size={14} /> },
    { path: "/userdashboard/payments", label: "My Profile", icon: <FaUser size={14} /> },
    { path: "/userdashboard/statements", label: "Top-up History", icon: <FaFileInvoiceDollar size={14} /> },
    { path: "/userdashboard/profile", label: "Service History", icon: <FaUserGear size={14} /> },
  ];

  return (
    <PortalContainer>
      
      {/* GLOBAL TOP INFRASTRUCTURE HEADER */}
      <PortalTopHeader>
        <BrandLogoGroup to="/dashboard/overview">
          <FaGlobe size={18} />
          ELEXDON<span>CONNECT</span>
        </BrandLogoGroup>
        
        <RightMetaCluster>
          <ClientBadge>
            <FaCircleUser size={13} />
            <span>{userInfo.name}</span>
          </ClientBadge>
          
          <MenuToggleBtn onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? "" : <FaBars size={16} />}
          </MenuToggleBtn>
        </RightMetaCluster>
      </PortalTopHeader>

      <SplitLowerLayoutGrid>
        {/* PERSISTENT SIDEBAR NAVIGATION TREE */}
        <PortalSidebar active={mobileMenuOpen}>
          <SidebarNavStack>
            {userNavItems.map((item) => (
              <PortalNavLink 
                key={item.path} 
                to={item.path}
                active={location.pathname === item.path ? 1 : 0}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </PortalNavLink>
            ))}
          </SidebarNavStack>

       <SessionTerminationBtn 
  onClick={() => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb', // Matches your Elexdon Blue primary button
      cancelButtonColor: '#64748b',  // Clean neutral slate cancel button
      confirmButtonText: 'Yes, Disconnect',
      cancelButtonText: 'Cancel',
      background: '#ffffff',         // Fits your crisp light theme specification
      color: '#0f172a',
      customClass: {
        popup: 'swal2-rigid-max-10'  // Custom hook for UI alignment if needed
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userLogout());
      }
    });
  }}
>
  <FaArrowRightFromBracket size={14} />
  <span>Logout</span>
</SessionTerminationBtn>
        </PortalSidebar>

        {/* COMPONENT STAGE WORKPLACE VIEWPORT */}
        <PortalStageWorkingArea>
          <Fade duration={450} triggerOnce>
            {/* Dynamic nested view routers embed directly right here */}
            <Outlet />
          </Fade>
        </PortalStageWorkingArea>
      </SplitLowerLayoutGrid>

    </PortalContainer>
  );
};

export default UserDashboardLayout;

/* -------------------------------------------------------------------------- */
/* STYLED COMPONENTS SCHEMES (PREMIUM CLIENT LIGHT ARCHITECTURE)           */
/* (CRITICAL CONSTRAINT: MAX 10PX APPLIED TO ALL GAPS, MARGINS, PADDINGS)  */
/* -------------------------------------------------------------------------- */

const PortalContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #f8fafc; /* Dynamic crisp light aesthetic background color */
  color: #0f172a;
  display: flex;
  flex-direction: column;
  font-family: system-ui, -apple-system, sans-serif;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const PortalTopHeader = styled.header`
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 10px; /* Locked at strict layout limit rule */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px; /* Locked at strict layout limit rule */
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const BrandLogoGroup = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 900;
  color: #0f172a;
  text-decoration: none;
  letter-spacing: -0.02em;

  svg { color: #2563eb; }
  span {
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const RightMetaCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Locked at strict layout limit rule */
`;

const ClientBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 6px 10px; /* Bounded padding design engine */
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #334155;

  svg { color: #2563eb; }
`;

const MenuToggleBtn = styled.button`
  display: none;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SplitLowerLayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 10px; /* Locked at strict layout limit rule */
  flex: 1;
  padding: 10px; /* Locked at strict layout limit rule */
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PortalSidebar = styled.nav`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px; /* Locked at strict layout limit rule */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px; /* Locked at strict layout limit rule */

  @media (max-width: 768px) {
    display: ${(props) => (props.active ? "flex" : "none")};
    position: fixed;
    top: 60px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    z-index: 999;
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
  }
`;

const SidebarNavStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px; /* Spacers strictly bounded beneath 10px standard limits */
`;

const PortalNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  padding: 10px; /* Locked at strict layout limit rule */
  border-radius: 6px;
  color: ${(props) => (props.active ? "#2563eb" : "#475569")};
  background: ${(props) => (props.active ? "#eff6ff" : "transparent")};
  border: 1px solid ${(props) => (props.active ? "#bfdbfe" : "transparent")};
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: ${(props) => (props.active ? "#eff6ff" : "#f8fafc")};
    color: ${(props) => (props.active ? "#2563eb" : "#0f172a")};
  }
`;

const SessionTerminationBtn = styled.button`
  width: 100%;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #64748b;
  font-weight: 600;
  font-size: 12px;
  padding: 10px; /* Locked at strict layout limit rule */
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: #fef2f2;
    border-color: #fca5a5;
    color: #991b1b;
  }
`;

const PortalStageWorkingArea = styled.main`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px; /* Locked at strict layout limit rule */
  min-height: 75vh;
  box-sizing: border-box;
`;