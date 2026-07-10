import React from 'react';
import styled from 'styled-components';
import { Fade, Zoom } from 'react-awesome-reveal';

// Import team images
import teamMember1 from "../Images/t1.jpeg";
import teamMember2 from "../Images/t2.jpeg";
import teamMember3 from "../Images/t3.jpeg";
import teamMember4 from '../Images/t4.jpeg';
import teamMember5 from "../Images/t5.jpeg";
import teamMember6 from '../Images/t6.jpeg';

// --- Team Data ---
const teamMembersData = [
  { id: 1, name: "MICHAEL E. OKORONKWO", position: "CEO / Senior Developer", image: teamMember1 },
  { id: 4, name: "AYODELE SEGUN PETER", position: "Mobile App / Back-end Developer", image: teamMember4 },
  { id: 6, name: "VICTOR NDU", position: "Web Developer", image: teamMember6 },
  { id: 2, name: "DAVID O. UCHE", position: "Graphic Designer-System Engineer / Marketing", image: teamMember2 },
  { id: 3, name: "HELEN EBONG UDOH", position: "Admin / Secretary", image: teamMember3 },
  { id: 5, name: "INNOCENT AGBAEZE", position: "Projects Officer / Uk-Representative", image: teamMember5 },
];

const TeamSectionContainer = styled.section`
  padding: 10px;
  background: #ffffff;
  text-align: center;
`;

const SectionHeader = styled.div`
  margin-bottom: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #0f172a;
  margin: 10px 0;
`;

const SectionWriteup = styled.div`
  font-size: 0.9rem;
  color: #475569;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.5;
  text-align: center;
  
  strong { color: #0f172a; }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  padding: 10px;
`;

const TeamMemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  background: #f8fafc;
`;

const CircleImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  margin-bottom: 10px;
  position: relative;
`;

const MemberImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MemberName = styled.h3`
  font-size: 0.85rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const MemberPosition = styled.p`
  font-size: 0.75rem;
  color: #64748b;
  margin: 5px 0 0 0;
`;

const TeamSection = () => {
  return (
    <TeamSectionContainer>
      <Fade direction="down" triggerOnce>
        <SectionHeader>
          <SectionTitle>Elexdon Pay Connect Leadership</SectionTitle>
          <SectionWriteup>
            <p><strong>- Elexdon,</strong> Visionary leadership delivering and building secure, scalable payment solutions that drive innovation for customers across Africa and beyond.</p>
            <p>Meet our leadership team at Elexdon Pay Connect! We are passionate professionals dedicated to financial inclusion and innovation, bringing diverse expertise in tech, finance, and business to our platform.</p>
          </SectionWriteup>
        </SectionHeader>
      </Fade>

      <TeamGrid>
        {teamMembersData.map((member, index) => (
          <Zoom triggerOnce delay={index * 50} key={member.id}>
            <TeamMemberCard>
              <CircleImageWrapper>
                <MemberImage src={member.image} alt={member.name} />
              </CircleImageWrapper>
              <MemberName>{member.name}</MemberName>
              <MemberPosition>{member.position}</MemberPosition>
            </TeamMemberCard>
          </Zoom>
        ))}
      </TeamGrid>
    </TeamSectionContainer>
  );
};

export default TeamSection;