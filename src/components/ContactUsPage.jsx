import React from "react";
import styled from "styled-components";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const ContactUsPage = () => {
  return (
    <Wrapper>
      <HeaderSection>
        <h1>Get In Touch</h1>
        <p>We’d love to hear from you. Reach out to us for any inquiries or support.</p>
      </HeaderSection>

      <ContentGrid>
        {/* CONTACT FORM */}
        <FormSection>
          <FormTitle>Send us a message</FormTitle>
          <FormContainer>
            <Input type="text" placeholder="Your Name" />
            <Input type="email" placeholder="Your Email" />
            <TextArea placeholder="Your Message" rows="5" />
            <SubmitBtn type="submit"><FaPaperPlane /> Send Message</SubmitBtn>
          </FormContainer>
        </FormSection>

        {/* CONTACT DETAILS & MAP */}
        <InfoSection>
          <InfoCard>
            <DetailItem>
              <FaMapMarkerAlt /> <span>Plot SP 795 First-Gate Mechanic Estate, Apo-Abuja, FCT, Nigeria.</span>
            </DetailItem>
            <DetailItem>
              <FaEnvelope /> <span>privacy@elexdonpay.com</span>
            </DetailItem>
            <DetailItem>
              <FaPhoneAlt /> <span>+234 7066911338</span>
            </DetailItem>
          </InfoCard>

          <MapBox>
            <iframe 
              title="office-location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6675200000003!2d7.4776!3d9.0152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnNTQuNyJOIDfCsDI4JzM5LjQiRQ!5e0!3m2!1sen!2sng!4v1620000000000" 
              width="100%" height="250" style={{border:0, borderRadius: "12px"}} allowFullScreen="" loading="lazy">
            </iframe>
          </MapBox>
        </InfoSection>
      </ContentGrid>
    </Wrapper>
  );
};

/* --- STYLED COMPONENTS --- */

const Wrapper = styled.div` padding: 80px 20px; max-width: 1200px; margin: auto; `;

const HeaderSection = styled.div` text-align: center; margin-bottom: 40px; h1 { color: #2563eb; font-size: 3rem; } p { font-size: 1.2rem; color: #64748b; } `;

const ContentGrid = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 40px; @media (max-width: 768px) { grid-template-columns: 1fr; } `;

const FormSection = styled.div` background: #ffffff; padding: 30px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); `;
const FormTitle = styled.h2` color: #1e293b; margin-bottom: 20px; `;
const FormContainer = styled.form` display: flex; flex-direction: column; gap: 15px; `;
const Input = styled.input` padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 1rem; `;
const TextArea = styled.textarea` padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 1rem; resize: none; `;
const SubmitBtn = styled.button` padding: 15px; background: #2563eb; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.3s; &:hover { background: #1d4ed8; } `;

const InfoSection = styled.div` display: flex; flex-direction: column; gap: 20px; `;
const InfoCard = styled.div` background: #f8fafc; padding: 25px; border-radius: 16px; border-left: 5px solid #2563eb; display: flex; flex-direction: column; gap: 15px; `;
const DetailItem = styled.div` display: flex; align-items: center; gap: 15px; color: #334155; font-size: 1.1rem; svg { color: #2563eb; flex-shrink: 0; } `;
const MapBox = styled.div` width: 100%; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); `;

export default ContactUsPage;