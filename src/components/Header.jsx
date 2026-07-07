import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FaBars, FaTimes, FaGlobeAfrica, FaAppStore, FaUser, FaHome } from "react-icons/fa";
import logo from '../Images/logo.png'
import { Context } from "./Context";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate =useNavigate();
  const userToken = useSelector((state)=>state.userToken)
  const location = useLocation();


  return (
    <NavElement>
      <MainGrid>
        {/* BRAND IDENTITY / LOGO */}
        <BrandLogo href="/">
          {/* <FaGlobeAfrica size={20} /> */}
          <img src={logo} alt="logo" style={{width:"30px"}}/>
          ELEXDON PAY<span>CONNECT</span>
        </BrandLogo>

        {/* DESKTOP NAV LINKS */}
        
       <DesktopNavLinks>
        <MenuLink href="#home" onClick={()=>navigate('/')}>Home</MenuLink>
          {location.pathname==='/'&& <MenuLink href="#services">Services</MenuLink>}
          {location.pathname==='/'&& <MenuLink href="#motivation">Our Mission</MenuLink>}
          {location.pathname==='/'&& <MenuLink href="#why-us">Infrastructure</MenuLink>}
          {location.pathname==='/'&& <MenuLink href="#faqs">Support</MenuLink>}
        </DesktopNavLinks>

        {/* DESKTOP ACTION BUTTONS */}
        <DesktopActionGroup>
           {userToken?    <ActionBtnPrimary onClick={()=>navigate('/userdashboard/overview')}>
            <FaUser /> Dashboard
          </ActionBtnPrimary>
:
          <>
          <ActionBtnSecondary onClick={()=>navigate('/userlogin')}>Login</ActionBtnSecondary>
          <ActionBtnPrimary onClick={()=>navigate('/usersignup')}>
            <FaAppStore /> Sign Up
          </ActionBtnPrimary> 
          </>}
         
        </DesktopActionGroup>

        {/* MOBILE MENU TOGGLE ICON */}
        <MobileMenuToggle onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation">
          {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </MobileMenuToggle>
      </MainGrid>

      {/* LIGHT EMBEDDED MOBILE DRAWER OVERLAY */}
      <MobileDrawerOverlay menuActive={isOpen}>
         <MobileMenuLink href="/" onClick={() => setIsOpen(false)}>
          <FaHome/> Home
        </MobileMenuLink> 
     { location.pathname==='/'&&  <>
        <MobileMenuLink href="#services" onClick={() => setIsOpen(false)}>
          Services
        </MobileMenuLink>
        <MobileMenuLink href="#motivation" onClick={() => setIsOpen(false)}>
          Our Mission
        </MobileMenuLink>
        <MobileMenuLink href="#why-us" onClick={() => setIsOpen(false)}>
          Infrastructure
        </MobileMenuLink>
        <MobileMenuLink href="#faqs" onClick={() => setIsOpen(false)}>
          Support
        </MobileMenuLink>  
        </>}
       
      

        <MobileButtonStack>

           {userToken?  <ActionBtnPrimary onClick={()=>{navigate('/userdashboard/overview');setIsOpen(false)}} style={{justifyContent:"center", width:"100%"}}>
            <FaUser /> Dashboard
          </ActionBtnPrimary>:
            <>
          <ActionBtnSecondary onClick={()=>{navigate('/userlogin');setIsOpen(false)}} style={{justifyContent:"center", width:"100%"}}>Login</ActionBtnSecondary>
          <ActionBtnPrimary onClick={()=>{navigate('/usersignup');setIsOpen(false)}} style={{justifyContent:"center", width:"100%"}}>
            <FaAppStore /> Sign Up
          </ActionBtnPrimary>   
            </>}
         
           
        </MobileButtonStack>
      </MobileDrawerOverlay>
    </NavElement>
  );
};

export default Header;

/* -------------------------------------------------------------------------- */
/* STYLED COMPONENTS SCHEMES (CRISP LIGHT THEME)                             */
/* (CRITICAL CONSTRAINT: MAX 10PX APPLIED TO ALL GAPS, MARGINS, PADDINGS)  */
/* -------------------------------------------------------------------------- */

const NavElement = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2000;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.85); /* Crisp Light Matte */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
`;

const MainGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px; /* Rigid constraint limit */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px; /* Rigid constraint limit */
`;

const BrandLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 8px; /* Strict padding guardrail */
  font-size: 18px;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #0f172a;
  text-decoration: none;

  svg {
    color: #2563eb;
  }

  span {
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const DesktopNavLinks = styled.nav`
  display: flex;
  gap: 10px; /* Rigid constraint limit */

  @media (max-width: 820px) {
    display: none;
  }
`;

const MenuLink = styled.a`
  color: #475569;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  padding: 6px 10px; /* Strict padding guardrail */
  border-radius: 6px;
  transition: color 0.15s ease, background 0.15s ease;

  &:hover {
    color: #0f172a;
    background: #f1f5f9;
  }
`;

const DesktopActionGroup = styled.div`
  display: flex;
  gap: 10px; /* Rigid constraint limit */
  align-items: center;

  @media (max-width: 820px) {
    display: none;
  }
`;

const ActionBtnPrimary = styled.button`
  border: none;
  padding: 8px 10px; /* Strict padding guardrail */
  border-radius: 6px;
  background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.95;
  }
`;

const ActionBtnSecondary = styled.button`
  border: 1px solid #cbd5e1;
  padding: 8px 10px; /* Strict padding guardrail */
  border-radius: 6px;
  background: #ffffff;
  color: #334155;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease;

  &:hover {
    border-color: #94a3b8;
    background: #f8fafc;
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: #334155;
  cursor: pointer;
  padding: 8px 10px; /* Strict padding guardrail */
  border-radius: 6px;
  transition: background 0.15s ease;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }

  @media (max-width: 820px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileDrawerOverlay = styled.div`
  display: none;

  @media (max-width: 820px) {
    display: ${(props) => (props.menuActive ? "flex" : "none")};
    flex-direction: column;
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px; /* Rigid constraint limit */
    gap: 10px; /* Rigid constraint limit */
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  }
`;

const MobileMenuLink = styled.a`
  color: #475569;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  padding: 10px; /* Rigid constraint limit */
  border-radius: 6px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: color 0.15s, background-color 0.15s;

  &:hover {
    color: #0f172a;
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

const MobileButtonStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Rigid constraint limit */
`;