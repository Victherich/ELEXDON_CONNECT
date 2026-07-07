


import React, { useState } from "react";
import styled from "styled-components";
import {
  FaBolt,
  FaIdCard,
  FaUniversity,
  FaGlobeAfrica,
  FaFileAlt,
  FaMobileAlt,
  FaShieldAlt,
  FaPassport,
  FaArrowRight,
  FaCheckCircle,
  FaQuoteLeft,
  FaQuestionCircle,
  FaLightbulb,
  FaRocket,
  FaLock,
  FaHeart,
  FaBars,
  FaTimes,
  FaShieldCheck,FaBuilding
} from "react-icons/fa";
import { Fade, Zoom, Slide } from "react-awesome-reveal";
import p1 from '../Images/p1.jpeg'
import p2 from '../Images/p2.jpeg'
import p3 from '../Images/p3.jpeg'
import p4 from '../Images/p4.jpeg'
import p5 from '../Images/p5.jpeg'
import { useNavigate } from "react-router-dom";

// const LandingPage = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const services = [
//     { icon: <FaBolt />, title: "Electricity Bills", desc: "Pay AEDC, IKEDC, EKEDC, IBEDC, PHED instantly." },
//     { icon: <FaIdCard />, title: "NIN Services", desc: "NIN verification, retrieval, updates and official validations." },
//     { icon: <FaUniversity />, title: "BVN Services", desc: "Secure BVN validation, deep linking and verification." },
//     { icon: <FaPassport />, title: "Government Registrations", desc: "Sleek CAC, Immigration, Tax and corporate compliance frameworks." },
//     { icon: <FaMobileAlt />, title: "Airtime & Data", desc: "Instant automated top-up algorithms for all major global networks." },
//     { icon: <FaFileAlt />, title: "Exam Services", desc: "WAEC, NECO, JAMB scratch card generation & instant result checkers." },
//     { icon: <FaShieldAlt />, title: "Insurance Cover", desc: "Instant high-yield vehicle and personal insurance protocols." },
//     { icon: <FaGlobeAfrica />, title: "International Portals", desc: "Borderless payment processing pipelines for global digital products." }
//   ];

//   const testimonials = [
//     { name: "Amara Chidi", role: "Business Owner", comment: "Elexdon Connect resolved our complex corporate registration issues in minutes instead of weeks. Absolute game changer!" },
//     { name: "Tunde Bakare", role: "Freelance Engineer", comment: "The API integrations and continuous utility payment streams are incredibly stable. Highly recommended." }
//   ];

//   const faqs = [
//     { q: "How secure is the Elexdon Connect gateway?", a: "We utilize multi-layer banking grade encryption protocols paired with decentralized authentication schemes." },
//     { q: "What is the average transaction turnaround time?", a: "Over 94% of our digital payment validation loops process immediately within 3-5 seconds." }
//   ];

//   return (
//     <Wrapper>
//       {/* PREMIUM LIGHT HEADER */}
//       <Header>
//         <NavContainer>
//           <Logo>
//             ELEXDON<span>.</span>
//           </Logo>

//           {/* Desktop Links */}
//           <NavLinks>
//             <NavLink href="#services">Services</NavLink>
//             <NavLink href="#motivation">Our Core</NavLink>
//             <NavLink href="#why-us">Why Us</NavLink>
//             <NavLink href="#faqs">FAQs</NavLink>
//           </NavLinks>

//           <HeaderActionGroup>
//             <SecondaryBtn style={{ padding: "8px 10px" }}>Sign In</SecondaryBtn>
//             <PrimaryBtn style={{ padding: "8px 10px" }}>Launch App</PrimaryBtn>
//           </HeaderActionGroup>

//           {/* Mobile Menu Icon Toggle */}
//           <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
//           </MenuButton>
//         </NavContainer>

//         {/* Sliding Mobile Drawer Overlay */}
//         <MobileMenu isOpen={menuOpen}>
//           <MobileNavLink href="#services" onClick={() => setMenuOpen(false)}>Services</MobileNavLink>
//           <MobileNavLink href="#motivation" onClick={() => setMenuOpen(false)}>Our Core</MobileNavLink>
//           <MobileNavLink href="#why-us" onClick={() => setMenuOpen(false)}>Why Us</MobileNavLink>
//           <MobileNavLink href="#faqs" onClick={() => setMenuOpen(false)}>FAQs</MobileNavLink>
//           <MobileMenuButtons>
//             <SecondaryBtn style={{ width: "100%" }}>Sign In</SecondaryBtn>
//             <PrimaryBtn style={{ width: "100%", justifyContent: "center" }}>Launch App</PrimaryBtn>
//           </MobileMenuButtons>
//         </MobileMenu>
//       </Header>

//       {/* 1. HERO SECTION */}
//       <HeroSection>
//         <HeroContent>
//           <Fade triggerOnce>
//             <Badge color="#1e40af" bg="#eff6ff">Nigeria's Elite Digital Infrastructure Hub</Badge>
//             <Title>
//               ELEXDON <span>CONNECT</span>
//             </Title>
//             <Description>
//               One modern, hyperscale trusted ecosystem handling utilities, complex government records, identity verification systems, and seamless cross-border value distributions instantly.
//             </Description>
//             <ButtonGroup>
//               <PrimaryBtn>
//                 Launch App Now <FaArrowRight />
//               </PrimaryBtn>
//               <SecondaryBtn>Explore Services Blueprint</SecondaryBtn>
//             </ButtonGroup>
//             <StatsGrid>
//               <StatCard><h3>50+</h3><p>Enterprise Services</p></StatCard>
//               <StatCard><h3>99.9%</h3><p>Platform Uptime</p></StatCard>
//               <StatCard><h3>&lt; 3s</h3><p>Execution Speeds</p></StatCard>
//             </StatsGrid>
//           </Fade>
//         </HeroContent>
//         <HeroGallery>
//           <Zoom triggerOnce>
//             <GridImg src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80" alt="Secure Fintech Interface" />
//             <GridImg src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=600&q=80" alt="Tech Infrastructure Workspace" />
//             <GridImg src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80" alt="Cybersecurity Matrix" />
//             <GridImg src={p1} alt="Encrypted Network Node" />
//           </Zoom>
//         </HeroGallery>
//       </HeroSection>

//       {/* 2. THE MOTIVATION SECTION */}
//       <MotivationSection id="motivation">
//         <SectionHeader>
//           <Badge color="#b45309" bg="#fef3c7"><FaHeart /> Our Absolute Core Motivation</Badge>
//           <h2>Bridging the Digital Chasm for Every Citizen</h2>
//         </SectionHeader>
//         <MotivationContentGrid>
//           <Slide direction="left" triggerOnce>
//             <TextCard>
//               <IconBox color="#dc2626" bg="#fee2e2"><FaLightbulb /></IconBox>
//               <h3>Why We Engineered This Platform</h3>
//               <p>Bureaucracy shouldn't stifle innovation. Our core conviction is that accessing foundational infrastructure like identity updates, enterprise registries, and basic daily utilities should be transparent, lightning fast, and absolutely secure from anywhere on the planet.</p>
//             </TextCard>
//           </Slide>
//           <Slide direction="right" triggerOnce>
//             <MotivationImageGrid>
//               <ImageWrapper>
//                 <InlineImg src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80" alt="Modern Innovation" />
//               </ImageWrapper>
//               <ImageWrapper>
//                 <InlineImg src={p2} alt="Collaborative Development" />
//               </ImageWrapper>
//             </MotivationImageGrid>
//           </Slide>
//         </MotivationContentGrid>
//       </MotivationSection>

//       {/* 3. CORE SERVICES GRID */}
//       <Section id="services">
//         <Fade triggerOnce>
//           <SectionHeader>
//             <Badge color="#047857" bg="#d1fae5">Next-Gen Core Utilities</Badge>
//             <h2>Popular Ecosystem Integrations</h2>
//             <p>A unified environment for digital identity authentication, enterprise assets, updates and instant bills.</p>
//           </SectionHeader>
//         </Fade>
//         <ServicesGrid>
//           {services.map((service, index) => (
//             <Slide direction="up" triggerOnce key={index}>
//               <ServiceCard>
//                 <IconWrap>{service.icon}</IconWrap>
//                 <h3>{service.title}</h3>
//                 <p>{service.desc}</p>
//               </ServiceCard>
//             </Slide>
//           ))}
//         </ServicesGrid>
//       </Section>

//       {/* 4. REINVENTED ARCHITECTURE SHOWCASE */}
//       <FeatureSection>
//         <FeatureGallery>
//           <InlineImg src={p3} alt="DevOps Control Center" />
//           <InlineImg src={p4} alt="Server Operations Cluster" />
//         </FeatureGallery>
//         <FeatureContent>
//           <Fade triggerOnce>
//             <Badge color="#6d28d9" bg="#ede9fe">Systemic Capabilities</Badge>
//             <h2>One Hyper-Localized API Pipeline. Universal Solutions.</h2>
//             <FeatureItemsList>
//               {[
//                 "NIN High-Throughput Verification Loops",
//                 "BVN Dynamic Cross-Matching Systems",
//                 "Realtime CAC Registrar Incorporations",
//                 "Automated Multi-State Electricity Grid Clearances",
//                 "Instant WAEC/NECO Secure Scratch Key Generation",
//                 "Adaptive Tier-1 Network Mobile Top-Ups",
//                 "Encrypted Personal & Asset Insurance Coverage"
//               ].map((item) => (
//                 <FeatureItem key={item}>
//                   <FaCheckCircle color="#10b981" style={{ flexShrink: 0 }} />
//                   <span>{item}</span>
//                 </FeatureItem>
//               ))}
//             </FeatureItemsList>
//           </Fade>
//         </FeatureContent>
//       </FeatureSection>

//       {/* 5. WHY CHOOSE ELEXDON */}
//       <Section id="why-us">
//         <SectionHeader>
//           <Badge color="#be185d" bg="#fce7f3">The Operational Edge</Badge>
//           <h2>Engineered to Outperform</h2>
//         </SectionHeader>
//         <WhyGrid>
//           <WhyCard>
//             <IconBox color="#2563eb" bg="#eff6ff"><FaRocket /></IconBox>
//             <h3>Zero Latency Processing</h3>
//             <p>Our direct pipeline structures eliminate middle-tier handshakes, executing scripts instantly.</p>
//           </WhyCard>
//           <WhyCard>
//             <IconBox color="#10b981" bg="#d1fae5"><FaLock /></IconBox>
//             <h3>Bank-Grade Cryptography</h3>
//             <p>Full database encryption layers shield sensitive government-linked identifier strings.</p>
//           </WhyCard>
//           <WhyCard>
//             <IconBox color="#d97706" bg="#fef3c7"><FaGlobeAfrica /></IconBox>
//             <h3>Absolute Availability</h3>
//             <p>Engineered over automated failover clusters guaranteeing absolute up-time parameters.</p>
//           </WhyCard>
//         </WhyGrid>
//       </Section>

//       {/* 6. SOCIAL PROOF & TESTIMONIALS */}
//       <Section>
//         <SectionHeader>
//           <Badge color="#0e7490" bg="#ecfeff">Social Proof Validation</Badge>
//           <h2>Trusted Across the Federation</h2>
//         </SectionHeader>
//         <TestimonialGrid>
//           {testimonials.map((t, idx) => (
//             <TestimonialCard key={idx}>
//               <FaQuoteLeft size={24} color="#cbd5e1" />
//               <p>{t.comment}</p>
//               <h4>— {t.name}, <span>{t.role}</span></h4>
//             </TestimonialCard>
//           ))}
//         </TestimonialGrid>
//       </Section>

//       {/* 7. HIGH CONVERSION CONTEXT FAQS */}
//       <Section id="faqs">
//         <SectionHeader>
//           <Badge color="#4b5563" bg="#f3f4f6">Knowledge Core</Badge>
//           <h2>Frequently Asked Questions</h2>
//         </SectionHeader>
//         <FAQGrid>
//           {faqs.map((f, idx) => (
//             <FAQCard key={idx}>
//               <FAQQuestion><FaQuestionCircle color="#4f46e5" /> <h4>{f.q}</h4></FAQQuestion>
//               <p>{f.a}</p>
//             </FAQCard>
//           ))}
//         </FAQGrid>
//       </Section>

//       {/* 8. CALL TO ACTION CONTAINER */}
//       <CTA>
//         <CTAGallery>
//           <InlineImg src={p5} alt="Enterprise Solutions" />
//           <InlineImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" alt="Analytical Insights" />
//         </CTAGallery>
//         <CTAContent>
//           <Fade triggerOnce>
//             <h2>Ready to Deploy Elexdon Connect?</h2>
//             <p>Create your modern account dashboard environment within 60 seconds to execute payments seamlessly.</p>
//             <PrimaryBtn style={{ background: "#ffffff", color: "#2563eb", alignSelf: "center", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
//               Get Onboarded Instantly <FaArrowRight />
//             </PrimaryBtn>
//           </Fade>
//         </CTAContent>
//       </CTA>
//     </Wrapper>
//   );
// };

// import React, { useState } from 'react';
// // Assuming your existing icon imports remain the same
// import { 
//   FaBolt, FaIdCard, FaUniversity, FaBuilding, FaMobileAlt, 
//   FaArrowRight, FaTimes, FaBars, FaCheckCircle, FaRocket, 
//   FaLock, FaGlobeAfrica, FaQuoteLeft, FaQuestionCircle, FaHeart, FaLightbulb 
// } from 'react-icons/fa';

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
const navigate = useNavigate();
  // Cleaned services array mapping exactly to your actual offerings
  const services = [
    { 
      icon: <FaIdCard />, 
      title: "NIN Services", 
      desc: "Print your NIN slip, validate your identity, or retrieve your NIN using your phone number or demography details." 
    },
    { 
      icon: <FaBuilding />, 
      title: "CAC & Business Setup", 
      desc: "Handle new CAC registrations, file your CAC Annual Returns, or get your SCUML registration done smoothly." 
    },
    { 
      icon: <FaUniversity />, 
      title: "BVN & Tax (TIN)", 
      desc: "Retrieve your BVN instantly via phone, or register and recover your Tax Identification Number (TIN)." 
    },
    { 
      icon: <FaMobileAlt />, 
      title: "Airtime & Data Top-up", 
      desc: "Recharge your phone instantly or buy mobile data bundles for all major networks without hassle." 
    },
    { 
      icon: <FaBolt />, 
      title: "Electricity Bills", 
      desc: "Pay your prepaid or postpaid electricity bills quickly for IKEDC, EKEDC, AEDC, IBEDC, PHED, and more." 
    }
  ];

  const testimonials = [
    { 
      name: "Amara Chidi", 
      role: "Business Owner", 
      comment: "Elexdon Connect made our business registration and CAC annual returns so simple. Saved us weeks of stress!" 
    },
    { 
      name: "Tunde Bakare", 
      role: "Agent", 
      comment: "Printing NIN slips and helping clients retrieve their lost BVN numbers has been lightning fast on this app." 
    }
  ];

  // Jargon-free, direct customer-focused FAQs
  const faqs = [
    { 
      q: "How secure is Elexdon Connect?", 
      a: "Your data and payments are completely secure. We use standard, industry-approved data protection layers to ensure your identity and funds are safe." 
    },
    { 
      q: "How fast are transactions processed?", 
      a: "Services like airtime recharges, data top-ups, electricity bills, and NIN/BVN slips are processed instantly within seconds." 
    },
    {
      q: "Can I retrieve my NIN if I lost my phone number?",
      a: "Yes! You can use our 'NIN Retrieval with Demography' service to find your details using your personal registration info."
    }
  ];

  return (
    <Wrapper>
      {/* PREMIUM LIGHT HEADER */}
      {/* <Header>
        <NavContainer>
          <Logo>
            ELEXDON<span>.</span>
          </Logo>

         
          <NavLinks>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#motivation">About Us</NavLink>
            <NavLink href="#why-us">Why Us</NavLink>
            <NavLink href="#faqs">FAQs</NavLink>
          </NavLinks>

          <HeaderActionGroup>
            <SecondaryBtn style={{ padding: "8px 10px" }}>Sign In</SecondaryBtn>
            <PrimaryBtn style={{ padding: "8px 10px" }}>Launch App</PrimaryBtn>
          </HeaderActionGroup>

        
          <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </MenuButton>
        </NavContainer>

       
        <MobileMenu isOpen={menuOpen}>
          <MobileNavLink href="#services" onClick={() => setMenuOpen(false)}>Services</MobileNavLink>
          <MobileNavLink href="#motivation" onClick={() => setMenuOpen(false)}>About Us</MobileNavLink>
          <MobileNavLink href="#why-us" onClick={() => setMenuOpen(false)}>Why Us</MobileNavLink>
          <MobileNavLink href="#faqs" onClick={() => setMenuOpen(false)}>FAQs</MobileNavLink>
          <MobileMenuButtons>
            <SecondaryBtn style={{ width: "100%" }}>Sign In</SecondaryBtn>
            <PrimaryBtn style={{ width: "100%", justifyContent: "center" }}>Launch App</PrimaryBtn>
          </MobileMenuButtons>
        </MobileMenu>
      </Header> */}

      {/* 1. HERO SECTION */}
      <HeroSection id="home">
        <HeroContent>
          <Fade triggerOnce>
            <Badge color="#1e40af" bg="#eff6ff">Fast, Reliable Digital Services</Badge>
            <Title>
              ELEXDON PAY <span> CONNECT</span>
            </Title>
            <Description>
            Elexdon Connect--One Platform. Fast and Reliable Endless Digital Services.
            </Description>
            <ButtonGroup>
              <PrimaryBtn onClick={()=>navigate('/userdashboard/overview')}>
                Launch App Now <FaArrowRight />
              </PrimaryBtn>
              <a href="#services">
<SecondaryBtn >View All Services</SecondaryBtn>
              </a>
              
            </ButtonGroup>
            <StatsGrid>
              <StatCard><h3>100%</h3><p>Secure System</p></StatCard>
              <StatCard><h3>24/7</h3><p>Platform Uptime</p></StatCard>
              <StatCard><h3>Instant</h3><p>Delivery Speeds</p></StatCard>
            </StatsGrid>
          </Fade>
        </HeroContent>
        <HeroGallery>
          <Zoom triggerOnce>
            <GridImg src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80" alt="Secure Interface" />
            <GridImg src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=600&q=80" alt="Easy Workspace" />
            <GridImg src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80" alt="Secure Network" />
            <GridImg src={p1} alt="Elexdon Services" />
          </Zoom>
        </HeroGallery>
      </HeroSection>

      {/* 2. THE MOTIVATION SECTION */}
      <MotivationSection id="motivation">
        <SectionHeader>
          <Badge color="#b45309" bg="#fef3c7"><FaHeart /> Our Mission</Badge>
          <h2>Making Essential Services Simple For Everyone</h2>
        </SectionHeader>
        <MotivationContentGrid>
          <Slide direction="left" triggerOnce>
            <TextCard>
              <IconBox color="#dc2626" bg="#fee2e2"><FaLightbulb /></IconBox>
              <h3>Why We Built This Platform</h3>
              <p>You shouldn't have to face endless stress just to validate your identity, pay your household bills, or keep your corporate registrations active. We designed Elexdon Connect to put all these daily services in one fast, reliable, and user-friendly portal so you can get things done in minutes.</p>
            </TextCard>
          </Slide>
          <Slide direction="right" triggerOnce>
            <MotivationImageGrid>
              <ImageWrapper>
                <InlineImg src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80" alt="Modern Setup" />
              </ImageWrapper>
              <ImageWrapper>
                <InlineImg src={p2} alt="User friendly service" />
              </ImageWrapper>
            </MotivationImageGrid>
          </Slide>
        </MotivationContentGrid>
      </MotivationSection>

      {/* 3. CORE SERVICES GRID */}
      <Section id="services">
        <Fade triggerOnce>
          <SectionHeader>
            <Badge color="#047857" bg="#d1fae5">Available Services</Badge>
            <h2>What You Can Do Today</h2>
            <p>Select any of our quick services below to get started immediately.</p>
          </SectionHeader>
        </Fade>
        <ServicesGrid>
          {services.map((service, index) => (
            <Slide direction="up" triggerOnce key={index}>
              <ServiceCard>
                <IconWrap>{service.icon}</IconWrap>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </ServiceCard>
            </Slide>
          ))}
        </ServicesGrid>
      </Section>

      {/* 4. SERVICE BULLET LIST */}
      <FeatureSection>
        <FeatureGallery>
          <InlineImg src={p3} alt="Easy Dashboard" />
          <InlineImg src={p4} alt="Quick Payments" />
        </FeatureGallery>
        <FeatureContent>
          <Fade triggerOnce>
            <Badge color="#6d28d9" bg="#ede9fe">Full Checklist</Badge>
            <h2>Everything You Need in One Portal</h2>
            <FeatureItemsList>
              {[
                "Instant Print/Retrieval of NIN and BVN Slips",
                "NIN Verification and Official Validations",
                "Retrieve Lost NIN/BVN with your Phone Number",
                "Complete CAC Business Registration & Annual Returns",
                "SCUML Registrations for Financial Compliance",
                "TIN (Tax Identification Number) Setup & Retrieval",
                "Instant Airtime & Mobile Data Top-Ups",
                "Fast Utility & Electricity Bill Payments"
              ].map((item) => (
                <FeatureItem key={item}>
                  <FaCheckCircle color="#10b981" style={{ flexShrink: 0 }} />
                  <span>{item}</span>
                </FeatureItem>
              ))}
            </FeatureItemsList>
          </Fade>
        </FeatureContent>
      </FeatureSection>

      {/* 5. WHY CHOOSE ELEXDON */}
      <Section id="why-us">
        <SectionHeader>
          <Badge color="#be185d" bg="#fce7f3">Why Choose Us</Badge>
          <h2>Built for Speed and Reliability</h2>
        </SectionHeader>
        <WhyGrid>
          <WhyCard>
            <IconBox color="#2563eb" bg="#eff6ff"><FaRocket /></IconBox>
            <h3>Instant Processing</h3>
            <p>Your requests don't sit in a long queue. Airtime, data, utility payments, and slip generation process in real time.</p>
          </WhyCard>
          <WhyCard>
            <IconBox color="#10b981" bg="#d1fae5"><FaLock /></IconBox>
            <h3>Safe & Confidential</h3>
            <p>We handle critical documents and identities with secure layers that keep your data private and fully protected.</p>
          </WhyCard>
          <WhyCard>
            <IconBox color="#d97706" bg="#fef3c7"><FaGlobeAfrica /></IconBox>
            <h3>Easy to Use</h3>
            <p>No confusing configurations. Simple forms and direct buttons mean anyone can complete a task without guide maps.</p>
          </WhyCard>
        </WhyGrid>
      </Section>

      {/* 6. SOCIAL PROOF & TESTIMONIALS */}
      <Section>
        <SectionHeader>
          <Badge color="#0e7490" bg="#ecfeff">Reviews</Badge>
          <h2>Loved by Users Nationwide</h2>
        </SectionHeader>
        <TestimonialGrid>
          {testimonials.map((t, idx) => (
            <TestimonialCard key={idx}>
              <FaQuoteLeft size={24} color="#cbd5e1" />
              <p>{t.comment}</p>
              <h4>— {t.name}, <span>{t.role}</span></h4>
            </TestimonialCard>
          ))}
        </TestimonialGrid>
      </Section>

      {/* 7. FAQS */}
      <Section id="faqs">
        <SectionHeader>
          <Badge color="#4b5563" bg="#f3f4f6">Help Center</Badge>
          <h2>Frequently Asked Questions</h2>
        </SectionHeader>
        <FAQGrid>
          {faqs.map((f, idx) => (
            <FAQCard key={idx}>
              <FAQQuestion><FaQuestionCircle color="#4f46e5" /> <h4>{f.q}</h4></FAQQuestion>
              <p>{f.a}</p>
            </FAQCard>
          ))}
        </FAQGrid>
      </Section>

      {/* 8. CALL TO ACTION CONTAINER */}
      <CTA>
        <CTAGallery>
          <InlineImg src={p5} alt="Our Application Interface" />
          <InlineImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" alt="Instant Payments" />
        </CTAGallery>
        <CTAContent>
          <Fade triggerOnce>
            <h2>Ready to use Elexdon Pay Connect?</h2>
            <p>Set up your account dashboard in under 60 seconds and handle your bills or identity documentation right away.</p>
            <PrimaryBtn style={{ background: "#ffffff", color: "#2563eb", alignSelf: "center", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}
            onClick={()=>navigate('/userdashboard/overview')}
            >
              Get Started Instantly <FaArrowRight />
            </PrimaryBtn>
          </Fade>
        </CTAContent>
      </CTA>
    </Wrapper>
  );
};


export default LandingPage;

/* -------------------------------------------------------------------------- */
/* STYLED COMPONENTS SCHEMES (PREMIUM CRISP LIGHT THEME)                     */
/* (CRITICAL CONSTRAINT: MAX 10PX APPLIED TO ALL GAPS, MARGINS, PADDINGS)  */
/* -------------------------------------------------------------------------- */

const Wrapper = styled.div`
  width: 100%;
  background: #f8fafc; /* Premium Light Mode Slate Tint */
  color: #1e293b;
  overflow-x: hidden;
  font-family: system-ui, -apple-system, sans-serif;
  padding-top: 60px;
`;

const Section = styled.section`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  
  h2 {
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 800;
    margin: 0;
    color: #0f172a;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
    max-width: 600px;
    color: #64748b;
    font-size: 16px;
  }
`;

const Badge = styled.div`
  width: fit-content;
  padding: 6px 10px;
  border-radius: 6px;
  background: ${(props) => props.bg || "#e2e8f0"};
  color: ${(props) => props.color || "#475569"};
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 6px;
`;

/* STICKY LIGHT HEADER BLOCK */
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
`;

const NavContainer = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #0f172a;

  span {
    color: #2563eb;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #475569;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: #0f172a;
    background: #f1f5f9;
  }
`;

const HeaderActionGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #0f172a;
  cursor: pointer;
  padding: 10px;
  border-radius: 6px;

  &:hover {
    background: #f1f5f9;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    padding: 10px;
    gap: 10px;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  }
`;

const MobileNavLink = styled.a`
  color: #475569;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  padding: 10px;
  border-radius: 6px;
  background: #f8fafc;

  &:hover {
    color: #0f172a;
    background: #f1f5f9;
  }
`;

const MobileMenuButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/* HERO GRID LAYER */
const HeroSection = styled.section`
  min-height: 85vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 10px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  margin: 0;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #0f172a;

  span {
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Description = styled.p`
  color: #475569;
  font-size: 1.1rem;
  line-height: 1.5;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled.button`
  border: none;
  padding: 10px;
  border-radius: 8px;
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.95;
  }
`;

const SecondaryBtn = styled.button`
  border: 1px solid #cbd5e1;
  padding: 10px;
  border-radius: 8px;
  background: #ffffff;
  color: #1e293b;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f8fafc;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const StatCard = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
  
  h3 {
    margin: 0;
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    color: #2563eb;
  }
  p {
    margin: 0;
    font-size: 1rem;
    color: #64748b;
  }
`;

const HeroGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const GridImg = styled.img`
  width: 100%;
  height: 100%;
  max-height: 240px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

/* THE MOTIVATION SECTION */
const MotivationSection = styled.section`
  padding: 10px;
  background: #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MotivationContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TextCard = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 10px;
  border-left: 4px solid #ef4444;
  border-top: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);

  h3 { margin: 0; font-size: 18px; color: #0f172a; }
  p { margin: 0; font-size: 1rem; color: #475569; line-height: 1.5; }
`;

const MotivationImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const ImageWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #cbd5e1;
`;

const InlineImg = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
`;

/* SERVICES STYLING */
const ServicesGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const ServiceCard = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
  }

  h3 { margin: 0; font-size: 1rem; color: #0f172a; }
  p { margin: 0; font-size: 16px; color: #475569; line-height: 1.4; }
`;

const IconWrap = styled.div`
  font-size: 1.5rem;
  color: #2563eb;
  background: #eff6ff;
  width: fit-content;
  padding: 8px;
  border-radius: 6px;
  display: inline-flex;
`;

/* PERFORMANCE ARCHITECTURE SHOWCASE */
const FeatureSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 10px;
  background: #f8fafc;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureGallery = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  
  img {
    height: 180px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }
`;

const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  
  h2 { margin: 0; font-size: clamp(1.5rem, 3vw, 2.5rem); color: #0f172a; }
`;

const FeatureItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FeatureItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 1rem;
  color: #334155;
`;

/* WHY CHOOSE US */
const WhyGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const WhyCard = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);

  h3 { margin: 0; font-size: 16px; color: #0f172a; }
  p { margin: 0; font-size: 1rem; color: #475569; line-height: 1.4; }
`;

const IconBox = styled.div`
  background: ${(props) => props.bg || "#f1f5f9"};
  color: ${(props) => props.color || "#000"};
  width: fit-content;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* SOCIAL PROOF & TESTIMONIALS */
const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
`;

const TestimonialCard = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);

  p { font-style: italic; color: #334155; font-size: 1rem; margin: 0; }
  h4 { margin: 0; font-size: 13px; color: #2563eb; span { color: #64748b; font-weight: 400; } }
`;

/* FAQ PANELS */
const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FAQCard = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.01);

  p { margin: 0; font-size: 1rem; color: #475569; line-height: 1.4; }
`;

const FAQQuestion = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  h4 { margin: 0; font-size: 1rem; color: #0f172a; }
`;

/* HIGH CONVERTING CALL TO ACTION CONTAINER */
const CTA = styled.section`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.3);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CTAGallery = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  
  img {
    height: 140px;
    border-radius: 6px;
    object-fit: cover;
    width: 100%;
    border: 1px solid rgba(255,255,255,0.1);
  }
`;

const CTAContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 10px;

  h2 { font-size: clamp(1.5rem, 3vw, 2.5rem); margin: 0; color: #ffffff; letter-spacing: -0.01em; }
  p { font-size: 1rem; margin: 0; color: #bfdbfe; }
`;