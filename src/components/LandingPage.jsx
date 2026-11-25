


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
// import p5 from '../Images/p5.jpeg'
import p9 from '../Images/p9.jpeg'
import p10 from '../Images/p10.jpeg'
import { useNavigate } from "react-router-dom";
import LogoTicker from "./LogoTicker";
import cs1 from '../Images/pp1.png'; import cs2 from '../Images/pp2.png';
import cs3 from '../Images/pp3.png'; import cs4 from '../Images/pp4.png';
import cs5 from '../Images/pp5.png'; import cs6 from '../Images/pp6.png';
import cs7 from '../Images/pp7a.png'; import cs8 from '../Images/pp7.png';
import cs9 from '../Images/p9.jpeg'; import cs10 from '../Images/p10.png';
import cs11 from '../Images/pp10.png'; import cs12 from '../Images/pp11.png';
import cs13 from '../Images/jamblogo.png'; import cs14 from '../Images/waeclogo.png';
import cs15 from '../Images/cs15.png'; import cs16 from '../Images/cs16.png';
import cs17 from '../Images/cs17.png'; import cs18 from '../Images/cs18.png';
import cs19 from '../Images/cs19.png'; import cs20 from '../Images/cs20.png';
import cs21 from '../Images/cs21.png'; import cs22 from '../Images/cs22.png';
import cs23 from '../Images/cs23.png'; import cs24 from '../Images/cs24.png';
import BrandPartnership from "./BrandPartnership";
import featureimage2 from '../Images/featureimage2.jpeg'
import how2 from '../Images/how2.jpeg'


const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
const navigate = useNavigate();
  // Cleaned services array mapping exactly to your actual offerings
// You will need to import your images at the top of your LandingPage.js
// e.g., import cs1 from '../Images/cs1.png'; ...

const services = [
  { img: cs1, title: "Print NIN Slip", desc: "Instantly print your official NIN slip." },
  { img: cs2, title: "NIN Validation", desc: "Verify NIN details with high accuracy." },
  // { img: cs3, title: "NIN Demography", desc: "Retrieve lost NIN using your personal data." },
  { img: cs4, title: "CAC Registration", desc: "New business name or company registration." },
  { img: cs5, title: "CAC Annual Return", desc: "Keep your business status compliant." },
  { img: cs6, title: "SCUML Registration", desc: "Secure your SCUML certification easily." },
  { img: cs7, title: "Print BVN Slip", desc: "Get your bank verification slip printed." },
  { img: cs8, title: "TIN Registration", desc: "Set up or retrieve your Tax ID Number." },
  { img: cs9, title: "Airtime Recharge", desc: "Instant top-up for all mobile networks." },
  { img: cs10, title: "Mobile Data", desc: "Affordable data plans for all networks." },
  { img: cs11, title: "Electricity Bill", desc: "Pay prepaid/postpaid utility bills." },
  { img: cs12, title: "Cable TV Sub", desc: "Instant DSTV, GOtv, & Startimes sub." },
  { img: cs13, title: "JAMB Services", desc: "Profile creation & result checking." },
  { img: cs14, title: "WAEC Services", desc: "Result checker pins and verification." }
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
           {/* <GridImg src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=600&q=80" alt="Easy Workspace" /> */}
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
              <p>You shouldn't have to face endless stress just to recharge airtime and data, validate your identity, pay your household bills, or keep your corporate registrations active. We designed Elexdon Pay Connect to put all these daily services in one fast, reliable, and user-friendly portal so you can get things done in minutes.</p>
            </TextCard>
          </Slide>
          <Slide direction="right" triggerOnce>
            <MotivationImageGrid>
              <ImageWrapper>
                <InlineImg src={p10} />
              </ImageWrapper>
              <ImageWrapper>
                <InlineImg src={p2} alt="User friendly service" />
              </ImageWrapper>
            </MotivationImageGrid>
          </Slide>
        </MotivationContentGrid>
      </MotivationSection>

      <LogoTicker/>

   
      {/* 4. SERVICE BULLET LIST */}
      <FeatureSection>
        <FeatureGallery>
          <InlineImg src={p3} alt="Easy Dashboard" />
          <InlineImg src={featureimage2} alt="Quick Payments" style={{objectPosition:"top"}}/>
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

         {/* 3. CORE SERVICES GRID */}
      <Section id="services">
        <Fade triggerOnce>
          <SectionHeader>
            <Badge color="#047857" bg="#d1fae5">Available Services</Badge>
            <h2>Our Services</h2>
            <h3>Pay all your bills at once, without leaving your home with Elexdon Pay Connect's comprehensive range of services.</h3>
          </SectionHeader>
        </Fade>
  <ServicesGrid>
  {services.map((s, index) => (
    <ServiceCard key={index}>
      <img src={s.img} alt={s.title} />
      <h3>{s.title}</h3>
      <p>{s.desc}</p>
    </ServiceCard>
  ))}
</ServicesGrid>
      </Section>

<img src={how2} alt='how2'
style={{width:"100%"}}
/>

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

      <BrandPartnership/>

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
          <InlineImg src={p9} alt="Our Application Interface" />
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
  min-height: 75vh;
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
  font-size: clamp(2.5rem, 6vw, 3rem);
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
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
`;

const GridImg = styled.img`
  width: 100%;
  height: 100%;
  max-height: 400px;
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
// const ServicesGrid = styled.div`
//   display: grid;
//   gap: 10px;
//   grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
// `;

// const ServiceCard = styled.div`
//   background: #ffffff;
//   padding: 10px;
//   border-radius: 8px;
//   border: 1px solid #e2e8f0;
//   transition: transform 0.2s, box-shadow 0.2s;
//   display: flex;
//   flex-direction: column;
//   gap: 6px;
//   box-shadow: 0 1px 3px rgba(0,0,0,0.02);

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
//   }

//   h3 { margin: 0; font-size: 1rem; color: #0f172a; }
//   p { margin: 0; font-size: 16px; color: #475569; line-height: 1.4; }
// `;

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


//

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
  padding: 10px;

  @media(max-width:428px){
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;

const ServiceCard = styled.div`
  background: #ffffff;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.2s;

  &:hover { transform: translateY(-5px); border-color: #2563eb; }

  img {
    width: 100%;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    background: #f1f5f9;
  }

  h3 { margin: 0; font-size: 14px; color: #0f172a; }
  p { margin: 0; font-size: 12px; color: #64748b; line-height: 1.3; }
`;