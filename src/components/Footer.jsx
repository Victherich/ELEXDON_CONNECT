// import React from 'react';
// import { FaPaperPlane, FaShieldAlt, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
// import styled from 'styled-components';
// import logo from '../Images/logo.png'
// import { useNavigate } from 'react-router-dom';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();
//   const navigate = useNavigate();

//   return (
//     <FooterElement>
//       <FooterContainer>
        
//         {/* BRAND & NEWSLETTER SUB-GRID */}
//         <BrandBlock>
//           <FooterLogo href="/">
//             <img src={logo} alt="logo" style={{ width: "40px" }} />
//             ELEXDON PAY <span>CONNECT</span>
//           </FooterLogo>
//           <BrandDesc>
//             Your quick, reliable platform for identity verification, business registrations, utility payments, and instant mobile top-ups.
//           </BrandDesc>
//           <NewsletterForm onSubmit={(e) => e.preventDefault()}>
//             <NewsletterInput 
//               type="email" 
//               placeholder="Subscribe for updates" 
//               required 
//               // Changed placeholder text to be clear and simple
//             />
//             <SubmitIconBtn type="submit" aria-label="Subscribe">
//               <FaPaperPlane size={12} />
//             </SubmitIconBtn>
//           </NewsletterForm>
//         </BrandBlock>

  

//         {/* ECOSYSTEM / BRAND REPLICATED LINKS */}
//         <LinkColumn>
//           <ColumnTitle>Company</ColumnTitle>
//           <ColumnLink href="#home" onClick={()=>navigate('/')}>Home</ColumnLink>
//           <ColumnLink href="/about">About Us</ColumnLink>
//           <ColumnLink href="#services" onClick={()=>navigate('/')}>Services</ColumnLink>
   
//           <ColumnLink href="/contact">Contact Us</ColumnLink>
//         </LinkColumn>

//         {/* COMPLIANCE & LEGAL LINKS */}
//         <LinkColumn>
//           <ColumnTitle>Legal</ColumnTitle>
//           <ColumnLink href="/privacypolicy">Privacy Policy</ColumnLink>
//           <ColumnLink href="/termsofservice">Terms of Service</ColumnLink>
//           <ColumnLink href="/termsofuse">Terms of Use</ColumnLink>
//           {/* <ColumnLink href="/">Security Info</ColumnLink> */}
//         </LinkColumn>

//       </FooterContainer>

//       {/* FOOTER BASELINE CLOSURE */}
//       <FooterBaselineGrid>
//         <CopyrightText>
//           &copy; {currentYear} Elexdon Pay Connect. All rights reserved.
//         </CopyrightText>
        
//         <SocialAndSecurityGroup>
//           <SecurityBadge>
//             <FaShieldAlt size={11} /> Secure Payments
//           </SecurityBadge>
//           <SocialLinkStack>
//             <SocialIcon href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter size={12} /></SocialIcon>
//             <SocialIcon href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn size={12} /></SocialIcon>
//             <SocialIcon href="https://github.com" target="_blank" rel="noreferrer"><FaGithub size={12} /></SocialIcon>
//           </SocialLinkStack>
//         </SocialAndSecurityGroup>
//       </FooterBaselineGrid>
//     </FooterElement>
//   );
// };

// export default Footer;

// /* -------------------------------------------------------------------------- */
// /* STYLED COMPONENTS SCHEMES (PREMIUM CRISP LIGHT THEME)                     */
// /* (CRITICAL CONSTRAINT: MAX 10PX APPLIED TO ALL GAPS, MARGINS, PADDINGS)  */
// /* -------------------------------------------------------------------------- */

// const FooterElement = styled.footer`
//   background: #ffffff; /* Crisp Light Background */
//   border-top: 1px solid #e2e8f0;
//   padding: 10px; /* Rigid constraint limit */
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: column;
//   gap: 10px; /* Rigid constraint limit */
// `;

// const FooterContainer = styled.div`
//   max-width: 1400px;
//   width: 100%;
//   margin: 0 auto;
//   display: grid;
//   grid-template-columns: 2fr repeat(3, 1fr);
//   gap: 10px; /* Rigid constraint limit */

//   @media (max-width: 860px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   @media (max-width: 480px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const BrandBlock = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px; /* Rigid constraint limit */
// `;

// const FooterLogo = styled.a`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   font-size: 1rem;
//   font-weight: 900;
//   letter-spacing: -0.03em;
//   color: #0f172a;
//   text-decoration: none;

//   svg {
//     color: #2563eb; /* Cohesive Light Mode Accent */
//   }

//   span {
//     background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//   }
// `;

// const BrandDesc = styled.p`
//   margin: 0;
//   font-size: 1rem;
//   line-height: 1.4;
//   color: #64748b;
//   max-width: 320px;
// `;

// const NewsletterForm = styled.form`
//   display: flex;
//   background: #f8fafc;
//   border: 1px solid #e2e8f0;
//   border-radius: 6px;
//   padding: 4px 10px; /* Strictly bounded internal system */
//   gap: 6px;
//   max-width: 320px;
//   align-items: center;
// `;

// const NewsletterInput = styled.input`
//   flex: 1;
//   background: transparent;
//   border: none;
//   outline: none;
//   color: #0f172a;
//   font-size: 1rem;

//   &::placeholder {
//     color: #94a3b8;
//   }
// `;

// const SubmitIconBtn = styled.button`
//   background: #e2e8f0;
//   border: 1px solid #cbd5e1;
//   color: #334155;
//   border-radius: 4px;
//   padding: 6px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

//   &:hover {
//     background: #2563eb;
//     border-color: #1d4ed8;
//     color: #ffffff;
//   }
// `;

// const LinkColumn = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px; /* Safe space margin mapping under 10px */
// `;

// const ColumnTitle = styled.h4`
//   margin: 0;
//   font-size: 1rem;
//   font-weight: 700;
//   color: #0f172a;
//   letter-spacing: 0.02em;
// `;

// const ColumnLink = styled.a`
//   font-size: 1rem;
//   color: #475569;
//   text-decoration: none;
//   transition: color 0.15s ease;

//   &:hover {
//     color: #2563eb;
//   }
// `;

// const FooterBaselineGrid = styled.div`
//   max-width: 1400px;
//   width: 100%;
//   margin: 0 auto;
//   border-top: 1px solid #e2e8f0;
//   padding-top: 10px; /* Rigid constraint limit */
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 10px; /* Rigid constraint limit */
//   flex-wrap: wrap;
// `;

// const CopyrightText = styled.p`
//   margin: 0;
//   font-size: 1rem;
//   color: #64748b;
// `;

// const SocialAndSecurityGroup = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px; /* Rigid constraint limit */
//   flex-wrap: wrap;
// `;

// const SecurityBadge = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 4px;
//   background: rgba(16, 185, 129, 0.08);
//   color: #059669;
//   font-size: 1rem;
//   font-weight: 600;
//   padding: 4px 8px;
//   border-radius: 4px;
//   border: 1px solid rgba(16, 185, 129, 0.15);
// `;

// const SocialLinkStack = styled.div`
//   display: flex;
//   gap: 8px; /* Bounds safe keeping below 10px grid */
// `;

// const SocialIcon = styled.a`
//   background: #f8fafc;
//   border: 1px solid #e2e8f0;
//   color: #475569;
//   width: 26px;
//   height: 26px;
//   border-radius: 5px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-decoration: none;
//   transition: border-color 0.15s, color 0.15s, background-color 0.15s;

//   &:hover {
//     background: #e2e8f0;
//     border-color: #cbd5e1;
//     color: #0f172a;
//   }
// `;



import React from 'react';
import { FaPaperPlane, FaShieldAlt, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import styled from 'styled-components';
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <FooterElement>
      <FooterContainer>
        {/* BRAND & NEWSLETTER SUB-GRID */}
        <BrandBlock>
          <FooterLogo href="/">
            <img src={logo} alt="logo" style={{ width: "40px" }} />
            ELEXDON PAY <span>CONNECT</span>
          </FooterLogo>
          <BrandDesc>
            Your quick, reliable platform for identity verification, business registrations, utility payments, and instant mobile top-ups.
          </BrandDesc>
          <NewsletterForm onSubmit={(e) => e.preventDefault()}>
            <NewsletterInput 
              type="email" 
              placeholder="Subscribe for updates" 
              required 
            />
            <SubmitIconBtn type="submit" aria-label="Subscribe">
              <FaPaperPlane size={12} />
            </SubmitIconBtn>
          </NewsletterForm>
        </BrandBlock>

        {/* ECOSYSTEM / BRAND REPLICATED LINKS */}
        <LinkColumn>
          <ColumnTitle>Company</ColumnTitle>
          <ColumnLink href="#home" onClick={()=>navigate('/')}>Home</ColumnLink>
          <ColumnLink href="/about">About Us</ColumnLink>
          <ColumnLink href="#services" onClick={()=>navigate('/')}>Services</ColumnLink>
          <ColumnLink href="/contact">Contact Us</ColumnLink>
        </LinkColumn>

        {/* COMPLIANCE & LEGAL LINKS */}
        <LinkColumn>
          <ColumnTitle>Legal</ColumnTitle>
          <ColumnLink href="/privacypolicy">Privacy Policy</ColumnLink>
          <ColumnLink href="/termsofservice">Terms of Service</ColumnLink>
          <ColumnLink href="/termsofuse">Terms of Use</ColumnLink>
        </LinkColumn>

      </FooterContainer>

      {/* FOOTER BASELINE CLOSURE */}
      <FooterBaselineGrid>
        <CopyrightText>
          &copy; {currentYear} Elexdon Pay Connect. All rights reserved.
        </CopyrightText>
        
        <SocialAndSecurityGroup>
          <SecurityBadge>
            <FaShieldAlt size={11} /> Secure Payments
          </SecurityBadge>

          {/* ADDED PAYMENT LOGOS */}
          <PaymentMethods>
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" /> */}
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
          </PaymentMethods>

          <SocialLinkStack>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter size={12} /></SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn size={12} /></SocialIcon>
            <SocialIcon href="https://github.com" target="_blank" rel="noreferrer"><FaGithub size={12} /></SocialIcon>
          </SocialLinkStack>
        </SocialAndSecurityGroup>
      </FooterBaselineGrid>
    </FooterElement>
  );
};

/* --- ADDED/UPDATED STYLED COMPONENTS --- */

const PaymentMethods = styled.div`
  display: flex;
  gap: 8px;
  img {
    height: 20px;
    object-fit: contain;
  }
`;

// ... (Rest of your original styled components remain unchanged)

const FooterElement = styled.footer`
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr repeat(2, 1fr);
  gap: 10px;

  @media (max-width: 860px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const BrandBlock = styled.div` display: flex; flex-direction: column; gap: 10px; `;
const FooterLogo = styled.a` display: flex; align-items: center; gap: 8px; font-size: 1rem; font-weight: 900; letter-spacing: -0.03em; color: #0f172a; text-decoration: none; svg { color: #2563eb; } span { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; } `;
const BrandDesc = styled.p` margin: 0; font-size: 1rem; line-height: 1.4; color: #64748b; max-width: 320px; `;
const NewsletterForm = styled.form` display: flex; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 4px 10px; gap: 6px; max-width: 320px; align-items: center; `;
const NewsletterInput = styled.input` flex: 1; background: transparent; border: none; outline: none; color: #0f172a; font-size: 1rem; &::placeholder { color: #94a3b8; } `;
const SubmitIconBtn = styled.button` background: #e2e8f0; border: 1px solid #cbd5e1; color: #334155; border-radius: 4px; padding: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease; &:hover { background: #2563eb; border-color: #1d4ed8; color: #ffffff; } `;
const LinkColumn = styled.div` display: flex; flex-direction: column; gap: 8px; `;
const ColumnTitle = styled.h4` margin: 0; font-size: 1rem; font-weight: 700; color: #0f172a; letter-spacing: 0.02em; `;
const ColumnLink = styled.a` font-size: 1rem; color: #475569; text-decoration: none; transition: color 0.15s ease; &:hover { color: #2563eb; } `;
const FooterBaselineGrid = styled.div` max-width: 1400px; width: 100%; margin: 0 auto; border-top: 1px solid #e2e8f0; padding-top: 10px; display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; `;
const CopyrightText = styled.p` margin: 0; font-size: 1rem; color: #64748b; `;
const SocialAndSecurityGroup = styled.div` display: flex; align-items: center; gap: 10px; flex-wrap: wrap; `;
const SecurityBadge = styled.div` display: flex; align-items: center; gap: 4px; background: rgba(16, 185, 129, 0.08); color: #059669; font-size: 1rem; font-weight: 600; padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(16, 185, 129, 0.15); `;
const SocialLinkStack = styled.div` display: flex; gap: 8px; `;
const SocialIcon = styled.a` background: #f8fafc; border: 1px solid #e2e8f0; color: #475569; width: 26px; height: 26px; border-radius: 5px; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: border-color 0.15s, color 0.15s, background-color 0.15s; &:hover { background: #e2e8f0; border-color: #cbd5e1; color: #0f172a; } `;

export default Footer;