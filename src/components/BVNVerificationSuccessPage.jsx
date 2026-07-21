import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaPrint, FaArrowLeft, FaIdCard } from 'react-icons/fa6';
// import { downloadSlip } from './BVNPdfGenerator';

const BVNVerificationSuccessPage = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    console.log('Profile data:', profile); // Debugging log to check the profile state

    useEffect(() => {
        const savedData = localStorage.getItem('last_bvn_verification');
        if (!savedData) {
            navigate('/userdashboard/service/printbvn'); // Redirect if no data found
        } else {
            setProfile(JSON.parse(savedData));
        }
    }, [navigate]);




const handleDownload = () => {
        // profile.slip comes from your API response stored in localStorage
        // downloadSlip(profile.slip, profile.profile);

    };



    if (!profile) return <div>Loading...</div>;

    return (
        <PageContainer>
            <Header>
                <button onClick={() => navigate(-1)}><FaArrowLeft /> Back</button>
                <h2>BVN Verification Result</h2>
                <button onClick={handleDownload} style={{ background: '#059669' }}>
                    <FaPrint /> Download {profile.slip?.toUpperCase()} PDF
                </button>
            </Header>

            <ResultCard>
         <PhotoSection>
  <img 
    src={`data:image/jpeg;base64,${profile.profile.data.base64Image}`} 
    alt="BVN Profile" 
    style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
  />
</PhotoSection>
                
                <DetailsGrid>
                    {/* <p>{profile.data.photo}</p> */}
                    <div><label>Full Name</label><p>{profile.profile.data.firstName} {profile.middleName} {profile.surname}</p></div>
                    <div><label>BVN</label><p>{profile.profile.data.bvn}</p></div>
                    <div><label>Gender</label><p>{profile.profile.data.gender}</p></div>
                    <div><label>Date of Birth</label><p>{profile.profile.data.dateOfBirth}</p></div>
                    <div><label>Phone</label><p>{profile.profile.data.phoneNumber1}</p></div>
                    {profile.profile.data.residentialAddress&&<div><label>Address</label><p>{profile.profile.data.residentialAddress}, {profile.profile.data.stateOfResidence}, {profile.profile.data.residence_state}</p></div>}
                    {profile.profile.data.residence_address&&<div><label>Address</label><p>{profile.profile.data.residence_address}, {profile.profile.data.residence_town}, {profile.profile.data.residence_state}</p></div>}
                </DetailsGrid>
            </ResultCard>
        </PageContainer>
    );
};





// --- Enhanced Styles ---

const PageContainer = styled.div`
  padding: 40px 20px;
  max-width: 900px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #f6f9fc 0%, #edf2f7 100%);
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: white;
  padding: 15px 25px;
  border-radius: 50px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
    
    }

  button {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #6366f1;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s ease;
    
    &:hover { background: #4f46e5; }
  }

  h2 { margin: 0; color: #1e293b; font-size: 1.2rem; }
`;

const ResultCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 40px;
  border-top: 8px solid #6366f1;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const PhotoSection = styled.div`
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 20px;
    border: 4px solid #f8fafc;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  label {
    font-size: 0.75rem;
    font-weight: 800;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p {
    margin: 0;
    font-weight: 600;
    color: #334155;
    font-size: 0.8rem;
  }
`;




export default BVNVerificationSuccessPage;