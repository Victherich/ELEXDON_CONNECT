// import React from "react";
// import styled from "styled-components";
// import { Fade, Zoom } from "react-awesome-reveal";
// import { FaHeadset } from "react-icons/fa";

// // Replace with your actual assets
// import MichaelPic from '../Images/t1.jpeg'; 
// import OfficePic from '../Images/cs6.png';
// import TeamSection from "./OurTeam";

// const AboutUsPage = () => {
//   return (
//     <Wrapper>
//       {/* 1. HERO SECTION */}
//       <HeroSection>
//         <Overlay />
//         <HeroContent>
//           <Fade direction="up" triggerOnce>
//             <h1 style={{fontSize: "3rem", margin: 0}}>Hi there, we’re Elexdon Pay Connect</h1>
//             <p style={{fontSize: "1.2rem"}}>Technology</p>
//             <p style={{ textAlign:"center"}}>
//               Elexdon Pay Connect is a secure and reliable platform that streamlines bill payments and provides you with a seamless experience, allowing you to easily pay your electricity bills, education bills, airtime top-ups, cable TV subscriptions, data bundle top-ups, and internet bills - all in one place.
//             </p>
//             <PrimaryBtn><FaHeadset /> Talk with Us</PrimaryBtn>
//           </Fade>
//         </HeroContent>
//       </HeroSection>

//       {/* 2. MORE ABOUT US */}
//       <Section>
//         <SectionHeader><h2>MORE ABOUT US</h2></SectionHeader>
//         <LeaderGrid>
          
//           <LeaderContent>
//             <h3>Michael Okoronkwo</h3>
//             <p>At Elexdon Pay Connect, our leadership team comprises seasoned and visionary professionals united by a commitment to advancing financial inclusion and delivering innovative, customer-centric payment solutions.</p>
//             <p>Our executives bring extensive, cross-functional expertise spanning technology, financial services, and enterprise operations. We are guided by a shared mission and a disciplined focus on execution. We are intentionally building a culture defined by excellence, accountability, and collaboration, where talent is empowered to drive sustainable growth.</p>
//             <p>Our strategic objective is to develop a secure, scalable platform that addresses the evolving needs of our customers and partners. We pursue continuous improvement and product innovation as core operating principles. We take pride in our team’s capability and in the measurable impact we are delivering across Africa and in emerging markets beyond.</p>
//           </LeaderContent>
//           <LeaderImage src={MichaelPic} alt="Michael Okoronkwo" />
//         </LeaderGrid>
//       </Section>

//       <TeamSection/>



//       {/* 4. OFFICE LOCATION */}
//       <Section>
//         <SectionHeader><h2>Our Office</h2></SectionHeader>
//         <OfficeGrid>
//           <p>We are conveniently located in the heart of the city, with easy access to public transportation and major highways.</p>
//           <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
//             <img src={OfficePic} alt="Office" style={{width: "100%", borderRadius: "8px"}} />
//             <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...YOUR_MAP_LINK..." width="100%" height="200" style={{border:0, borderRadius: "8px"}} allowFullScreen="" loading="lazy"></iframe>
//           </div>
//         </OfficeGrid>
//       </Section>

      
//     </Wrapper>
//   );
// };

// /* --- STYLED COMPONENTS (Strictly <= 10px spacing) --- */

// const Wrapper = styled.div` display: flex; flex-direction: column; gap: 10px; `;
// const Section = styled.section` padding: 10px; display: flex; flex-direction: column; gap: 10px; `;
// const SectionHeader = styled.div` text-align: center; gap: 10px; `;
// const HeroSection = styled.section` 
//   height: 60vh; background: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000') center/cover;
//   display: flex; align-items: center; justify-content: center; color: white; position: relative; padding: 10px;
// `;
// const Overlay = styled.div` position: absolute; inset: 0; background: rgba(0,0,0,0.6); `;
// const HeroContent = styled.div` position: relative; z-index: 1; text-align: center; display: flex; flex-direction: column; gap: 10px; 
// p{
// padding:0px 50px;
// }
// `;
// const PrimaryBtn = styled.button` padding: 10px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; align-self: center;

// `;
// const LeaderGrid = styled.div` display: grid; grid-template-columns: 1fr 300px; gap: 10px; align-items: start; `;
// const LeaderImage = styled.img` width: 100%; border-radius: 8px; border: 1px solid #e2e8f0; `;
// const LeaderContent = styled.div` display: flex; flex-direction: column; gap: 10px; `;
// const OfficeGrid = styled.div` display: flex; flex-direction: column; gap: 10px; `;

// export default AboutUsPage;


import React from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";
import { FaHeadset, FaWeight } from "react-icons/fa";

// Replace with your actual assets
import MichaelPic from '../Images/ab9.png'; 
import OfficePic from '../Images/cs6.png';
import TeamSection from "./OurTeam";
import { useNavigate } from "react-router-dom";
import FeatureSection from "./FeatureSection";

const AboutUsPage = () => {
    const navigate = useNavigate();

  return (
    <Wrapper>
      {/* 1. HERO SECTION */}
      <HeroSection>
        <Overlay />
        <HeroContent>
          <Fade direction="up" triggerOnce>
            <HeroTitle>Hi there, we’re Elexdon Pay Connect</HeroTitle>
            <HeroSubtitle>Technology</HeroSubtitle>
            <HeroDescription>
              Elexdon Pay Connect is a secure and reliable platform that streamlines bill payments and provides you with a seamless experience, allowing you to easily pay your electricity bills, education bills, airtime top-ups, cable TV subscriptions, data bundle top-ups, and internet bills - all in one place.
            </HeroDescription>
            <PrimaryBtn onClick={()=>navigate('/contact')}><FaHeadset /> Talk with Us</PrimaryBtn>
          </Fade>
        </HeroContent>
      </HeroSection>

      {/* 2. MORE ABOUT US */}
      <Section style={{ backgroundColor: "#f8fafc" }}>
        <SectionHeader><h1>MORE ABOUT US</h1></SectionHeader>
        <LeaderGrid>
          <LeaderContent>
          
            <p>At Elexdon Pay Connect, our leadership team comprises seasoned and visionary professionals united by a commitment to advancing financial inclusion and delivering innovative, customer-centric payment solutions.</p>
            <p>Our executives bring extensive, cross-functional expertise spanning technology, financial services, and enterprise operations. We are guided by a shared mission and a disciplined focus on execution. We are intentionally building a culture defined by excellence, accountability, and collaboration, where talent is empowered to drive sustainable growth.</p>
            <p>Our strategic objective is to develop a secure, scalable platform that addresses the evolving needs of our customers and partners. We pursue continuous improvement and product innovation as core operating principles. We take pride in our team’s capability and in the measurable impact we are delivering across Africa and in emerging markets beyond.</p>
          </LeaderContent>
          <div>
          <LeaderImage src={MichaelPic} alt="Michael Okoronkwo" />
            {/* <h3 style={{textAlign:"center", color:" #2563eb",}}>Michael Okoronkwo</h3>     */}
          </div>
      
        </LeaderGrid>
      </Section>

      {/* <TeamSection/> */}
      <FeatureSection/>

      {/* 4. OFFICE LOCATION */}
      <Section>
        <SectionHeader><h2 style={{color:" #2563eb", fontWeight:'900'}}>Our Office</h2></SectionHeader>
        <OfficeContainer>
          <OfficeInfo>
            <p><strong>Elexdon Pay Connect</strong></p>
            <p>Email: privacy@elexdonpay.com</p>
            <p>Phone: +234 7066911338</p>
            <p>Address: Plot SP 795 First-Gate Mechanic Estate, Apo-Abuja, FCT, Nigeria.</p>
          </OfficeInfo>
          <MapBox>
  <iframe 
    title="map" 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3809249767677!2d7.493038274996901!3d8.961287691068866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e71957e8494b1%3A0x8e8b3992b8344e45!2sApo%20Mechanic%20Village!5e0!3m2!1sen!2sng!4v1715694200000!5m2!1sen!2sng" 
    width="100%" 
    height="300" 
    style={{border:0, borderRadius: "12px"}} 
    allowFullScreen="" 
    loading="lazy">
  </iframe>
</MapBox>
        </OfficeContainer>
      </Section>
    </Wrapper>
  );
};

/* --- ENHANCED STYLES --- */

const Wrapper = styled.div` display: flex; flex-direction: column; color: #1e293b; `;
const Section = styled.section` padding: 10px 10px; display: flex; flex-direction: column; gap: 10px; `;
const SectionHeader = styled.div` text-align: center; margin-bottom: 10px; h1 { color: #2563eb; font-size: 2rem; text-transform: uppercase;font-weight:900; } `;

const HeroSection = styled.section` 
  height: 60vh; background: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000') center/cover;
  display: flex; align-items: center; justify-content: center; color: white; position: relative; padding: 20px; padding-top:50px;
@media(max-width:768px){
height:90vh;
}

  `;
const Overlay = styled.div` position: absolute; inset: 0; background: linear-gradient(rgba(0,0,0,0.7), rgba(37, 99, 235, 0.6)); `;
const HeroContent = styled.div` position: relative; z-index: 1; text-align: center; max-width: 800px; `;
const HeroTitle = styled.h1` font-size: 3rem; font-weight: 800; `;
const HeroSubtitle = styled.p` font-size: 1rem; color: #facc15; font-weight: bold; `;
const HeroDescription = styled.p` font-size: 1rem; margin: 10px 0; `;

const PrimaryBtn = styled.button` 
  padding: 15px 30px; background: #facc15; color: #1e293b; font-weight: bold; border: none; border-radius: 50px; cursor: pointer; font-size: 1rem; transition: transform 0.3s;
  &:hover { transform: scale(1.05); background: #eab308; }
`;

const LeaderGrid = styled.div` display: grid; grid-template-columns: 1fr 350px; gap: 40px; align-items: start; @media (max-width: 768px) { grid-template-columns: 1fr; } `;
const LeaderImage = styled.img` width: 100%; border-radius: 20px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2); `;
const LeaderContent = styled.div` display: flex; flex-direction: column; gap: 15px; h3 { font-size: 2rem; color: #2563eb; } `;

const OfficeContainer = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: center; @media (max-width: 768px) { grid-template-columns: 1fr; } `;
const OfficeInfo = styled.div` background: #fff; padding: 25px; border-radius: 12px; border-left: 5px solid #2563eb; box-shadow: 0 4px 6px rgba(0,0,0,0.1); `;
const MapBox = styled.div` width: 100%; `;

export default AboutUsPage;