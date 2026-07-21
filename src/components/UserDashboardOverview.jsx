import React , {useContext} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { userLogout } from '../Features/Slice';
import { 
  FaCreditCard, 
  FaFileInvoiceDollar, 
  FaUserGear, 
  FaPiggyBank, 
  FaArrowUpRightFromSquare, 
  FaWallet,
  FaShieldHalved,
  FaArrowRightArrowLeft,
FaClockRotateLeft,  // Added
  FaCirclePlus,
  
  FaShield, FaPenToSquare, FaCalendarCheck, FaAddressCard, 
  FaMobileScreenButton, FaUsersViewfinder, FaMapLocationDot,
  FaUserCheck, FaPhoneVolume, FaBuildingShield, FaCode,
  FaFileCircleCheck,
  FaArrowRightFromBracket,
  FaScreenpal
} from 'react-icons/fa6';
import { Context } from './Context';

const UserDashboardOverview = () => {
  const dispatch = useDispatch();
  // Pull data safely from the Redux state, matching your fallback structural configuration
  const userInfo = useSelector((state) => state.userInfo) || { 
    name: "Alex Elexdon Node", 
    accountNumber: "8820491823", 
    balance: 45280.50,
    savings: 12400.00
  };
const {user,api_url}=useContext(Context);
  // Quick Action Matrix map matching dashboard sub-view paths


const [totalSpent, setTotalSpent] = React.useState(0);

React.useEffect(() => {
  const fetchTotalSpent = async () => {
    try {
      const response = await fetch(`${api_url}/get_total_spent.php?userId=${user?.id || 0}`);
      const data = await response.json();
      if (data.success) {
        setTotalSpent(parseFloat(data.total_spent) || 0);
      }
    } catch (error) {
      console.error("Error retrieving spending metrics:", error);
    }
  };

  if (user?.id) {
    fetchTotalSpent();
  }
}, [user]);




const adminActions =[
{ 
      path: "/userdashboard/allusers", 
      title: "Manage All Users", 
      badge: "All Users", 
      badgeColor: "#7c3aed",
      icon: <FaUserGear size={14} />, 
      color: "#dc2626" 
    },
    { 
      path: "/userdashboard/alltransactions", 
      title: "Manage All Transactions", 
      badge: "Manage all transactions", 
      badgeColor: "#7c3aed",
      icon: <FaFileInvoiceDollar size={14} />, 
      color: "#dc2626" 
    },

]




const serviceActions = [
    { 
      path: "/userdashboard/service/scumlregistration", 
      title: "SCUML Registration", 
      badge: "NEW", 
      badgeColor: "#7c3aed",
      icon: <FaShield size={14} />, 
      color: "#dc2626" 
    },
    { 
      path: "/userdashboard/service/cac-modification", 
      title: "CAC Modification", 
      badge: "9 new services", 
      badgeColor: "#7c3aed",
      icon: <FaPenToSquare size={14} />, 
      color: "#dc2626" 
    },
    { 
      path: "/userdashboard/service/annualreturns", 
      title: "CAC Annual Return", 
      badge: "NEW", 
      badgeColor: "#7c3aed",
      icon: <FaCalendarCheck size={14} />, 
      color: "#dc2626" 
    },
    { 
      path: "/userdashboard/service/nindirectverification", 
      title: "Print NIN Slip", 
      icon: <FaAddressCard size={14} />, 
      color: "#6366f1" 
    },
    { 
      path: "/userdashboard/service/printbvn", 
      title: "Print BVN Slip", 
      icon: <FaCreditCard size={14} />, 
      color: "#059669" 
    },
    // { 
    //   path: "/userdashboard/service/ninphoneverification", 
    //   title: "Retrieve NIN With Phone", 
    //   icon: <FaMobileScreenButton size={14} />, 
    //   color: "#6366f1" 
    // },
    { 
      path: "/userdashboard/service/nindemographyverification", 
      title: "NIN Retrieval with Demography", 
      badge: "Fully Active", 
      badgeColor: "#4f46e5",
      icon: <FaUsersViewfinder size={14} />, 
      color: "#dc2626" 
    },
    { 
      path: "/userdashboard/service/tinretrieval", 
      title: "TIN Registration / Retrieval", 
      icon: <FaMapLocationDot size={14} />, 
      color: "#6366f1" 
    },
    { 
      path: "/userdashboard/service/ninmodificationmanagement", 
      title: "NIN Validation", 
      icon: <FaUserCheck size={14} />, 
      color: "#6366f1" 
    },
    // { 
    //   path: "/userdashboard/service/bvnphoneprint", 
    //   title: "BVN Retrieval with Phone", 
    //   icon: <FaPhoneVolume size={14} />, 
    //   color: "#059669" 
    // },
    { 
      path: "/userdashboard/service/cacregistration", 
      title: "CAC Registration", 
      icon: <FaBuildingShield size={14} />, 
      color: "#dc2626" 
    },

{ 
  path: "/userdashboard/service/airtimerecharge", 
  title: "Airtime Recharge", 
  badge: "Instant", 
  badgeColor: "#16a34a", // Vibrant green accent
  icon: <FaPhoneVolume size={14} />, 
  color: "#2563eb" // Elexdon Blue primary shell
},
{ 
  path: "/userdashboard/service/datarecharge", 
  title: "Mobile Data Recharge", 
  icon: <FaMobileScreenButton size={14} />, 
  color: "#7c3aed" // Royal purple shell
},
{ 
  path: "/userdashboard/service/electricityrecharge", 
  title: "Electricity Bill Payment", 
  badge: "24/7 Auto", 
  badgeColor: "#ea580c", // Warning amber active notice
  icon: <FaCode size={14} />, // Feel free to swap out with an energy icon if preferred
  color: "#059669" // Stable deep green shell
},
// { 
//   path: "/userdashboard/service/examinationpins", 
//   title: "EXAMINATION PINS", 
//   badge: "24/7 Auto", 
//   badgeColor: "#ea580c", // Warning amber active notice
//   icon: <FaFileCircleCheck size={14} />, // Feel free to swap out with an energy icon if preferred
//   color: "#059669" // Stable deep green shell
// },
{ 
  path: "/userdashboard/service/waecservices", 
  title: "WAEC Services", 
  badge: "24/7 Auto", 
  badgeColor: "#ea580c", // Warning amber active notice
  icon: <FaFileCircleCheck size={14} />, // Feel free to swap out with an energy icon if preferred
  color: "#059669" // Stable deep green shell
},

{ 
  path: "/userdashboard/service/jambservices", 
  title: "JAMB Services", 
  badge: "24/7 Auto", 
  badgeColor: "#ea580c", // Warning amber active notice
  icon: <FaFileCircleCheck size={14} />, // Feel free to swap out with an energy icon if preferred
  color: "#059669" // Stable deep green shell
},
{ 
  path: "/userdashboard/service/tvsubscriptions", 
  title: "TV Subscriptions", 
  // badge: "24/7 Auto", 
  badgeColor: "#16a34a", // Warning amber active notice
  icon: <FaScreenpal size={14} />, // Feel free to swap out with an energy icon if preferred
  color: "#059669" // Stable deep green shell
},
// { 
//   path: "/userdashboard/service/gotv", 
//   title: "Gotv", 
//   // badge: "24/7 Auto", 
//   badgeColor: "#16a34a", // Warning amber active notice
//   icon: <FaScreenpal size={14} />, // Feel free to swap out with an energy icon if preferred
//   color: "#059669" // Stable deep green shell
// }
  ];

  return (
    <OverviewWrapper>
      {/* SECTION 1: CUSTOMER RECOGNITION BLOCK */}
      <WelcomeHeaderBlock>
        <div>
          <WelcomeGreeting>Welcome Back </WelcomeGreeting>
          <ClientAccountName>{user?.role==='admin'?"ADMIN:":""} {user?.name}</ClientAccountName>
        </div>
        <SecuredTag>
          <FaShieldHalved size={12} />
          <span>AES-256 Core Encrypted</span>
        </SecuredTag>
      </WelcomeHeaderBlock>

      {/* SECTION 2: DIGITAL BANKING LEDGER CARDS */}
      <FinancesDisplayGrid>
        {/* PREMIUM VISUAL DEBIT CARD HOUSING ELEMENT */}
        <PremiumVirtualCard>
          <CardHeaderRow>
            <BankCardBrand>ELEXDON PAY <span>CONNECT</span></BankCardBrand>
            <FaWallet size={18} />
          </CardHeaderRow>
          <CardBalanceGroup>
            <BalanceLabelText>Available Account Balance</BalanceLabelText>
            <PrimaryBalanceDisplay>
              NGN {user?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </PrimaryBalanceDisplay>
          </CardBalanceGroup>
          <CardFooterMetrics>
            <div>
  <MetaFieldLabel>AMOUNT SPENT</MetaFieldLabel>
  <MetaFieldValue>
    NGN {totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
  </MetaFieldValue>
</div>
            <ActiveChipElement />
          </CardFooterMetrics>
        </PremiumVirtualCard>

        {/* COMPANION LIQUID SAVINGS ACCOUNT BLOCK */}
      {/* REPLACED VAULT WITH QUICK ACTIONS CARD */}
<QuickActionsCard>
  <ActionPanelTitle>Wallet & Service Actions</ActionPanelTitle>
  <ActionLinksGroup>
    
    <ActionRowLink to="/userdashboard/transactions">
      <IconLabelItem>
        <FaClockRotateLeft size={13} color="#2563eb" />
        <span>Transaction History</span>
      </IconLabelItem>
      <FaArrowUpRightFromSquare size={10} color="#94a3b8" />
    </ActionRowLink>

    {/* <ActionRowLink to="/userdashboard/fundwallethistory">
      <IconLabelItem>
        <FaFileInvoiceDollar size={13} color="#059669" />
        <span>Wallet Top-up History</span>
      </IconLabelItem>
      <FaArrowUpRightFromSquare size={10} color="#94a3b8" />
    </ActionRowLink> */}

   <ActionRowLink to="/userdashboard/fundwallet" $isPrimary>
  <IconLabelItem>
    <FaCirclePlus size={14} color="#ffffff" />
    <span style={{ fontWeight: '700', color: '#ffffff' }}>Fund Wallet</span>
  </IconLabelItem>
  <FaArrowUpRightFromSquare size={10} color="rgba(255, 255, 255, 0.8)" />
</ActionRowLink>

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

  </ActionLinksGroup>
</QuickActionsCard>
      </FinancesDisplayGrid>

       {/* SECTION 3: INTERACTIVE PLATFORM SERVICE HUB */}
      {user?.role==='admin'&&<SectionHeadingLabel>ADMIN ACTIONS</SectionHeadingLabel>}
      
      {user?.role==='admin'&&<ServiceTileGridStructure>
        {adminActions.map((service, index) => (
          <ServiceInteractiveCard key={index} to={service.path}>
            <ActionIconBoundary themeColor={service.color}>
              {service.icon}
            </ActionIconBoundary>
            <ServiceCardTextContainer>
              <ServiceCardTitleGroup>
                <h4>{service.title}</h4>
                <FaArrowUpRightFromSquare size={10} className="launch-icon" />
              </ServiceCardTitleGroup>
              <p>{service.desc}</p>
            </ServiceCardTextContainer>
          </ServiceInteractiveCard>
        ))}
      </ServiceTileGridStructure>}

      {/* SECTION 3: INTERACTIVE PLATFORM SERVICE HUB */}
      <SectionHeadingLabel>ALL SERVICES</SectionHeadingLabel>
      <ServiceTileGridStructure>
        {serviceActions.map((service, index) => (
          <ServiceInteractiveCard key={index} to={service.path}>
            <ActionIconBoundary themeColor={service.color}>
              {service.icon}
            </ActionIconBoundary>
            <ServiceCardTextContainer>
              <ServiceCardTitleGroup>
                <h4>{service.title}</h4>
                <FaArrowUpRightFromSquare size={10} className="launch-icon" />
              </ServiceCardTitleGroup>
              <p>{service.desc}</p>
            </ServiceCardTextContainer>
          </ServiceInteractiveCard>
        ))}
      </ServiceTileGridStructure>
    </OverviewWrapper>
  );
};

export default UserDashboardOverview;

/* -------------------------------------------------------------------------- */
/* STYLED HOOK COMPONENT ELEMENTS (10PX GRID ARCHITECTURE HARD CONSTRAINTS)  */
/* -------------------------------------------------------------------------- */

const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Locked at strict layout limit rule */
  width: 100%;
  box-sizing: border-box;
`;

const WelcomeHeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px; /* Locked at strict layout limit rule */
`;

const WelcomeGreeting = styled.p`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  margin: 0;
`;

const ClientAccountName = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
`;

const SecuredTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #dcfce7;
  border: 1px solid #bbf7d0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  color: #166534;
  white-space: nowrap;
`;

const FinancesDisplayGrid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 10px; /* Locked at strict layout limit rule */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PremiumVirtualCard = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #2563eb 100%);
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 10px; /* Locked at strict layout limit rule */
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 130px;
  box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const CardHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg { color: rgba(255, 255, 255, 0.7); }
`;

const BankCardBrand = styled.div`
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.05em;
  color: #ffffff;
  span {
    color: #60a5fa;
    margin-left: 3px;
  }
`;

const CardBalanceGroup = styled.div`
  margin-top: 4px;
`;

const BalanceLabelText = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: #94a3b8;
  display: block;
`;

const PrimaryBalanceDisplay = styled.h1`
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin: 0;
`;

const CardFooterMetrics = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const MetaFieldLabel = styled.span`
  font-size: 8px;
  font-weight: 600;
  color: #64748b;
  display: block;
  letter-spacing: 0.05em;
`;

const MetaFieldValue = styled.span`
  font-size: 11px;
  font-weight: 600;
  font-family: monospace;
  color: #cbd5e1;
`;

const ActiveChipElement = styled.div`
  width: 20px;
  height: 15px;
  background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
  border-radius: 3px;
  opacity: 0.85;
`;

const VaultAccountCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px; /* Locked at strict layout limit rule */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 130px;
`;

const VaultIconShell = styled.div`
  width: 28px;
  height: 28px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg { color: #16a34a; }
`;

const VaultDataBlock = styled.div`
  margin: 4px 0;
`;

const SecondaryBalanceDisplay = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
`;

const TransferVaultBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 600;
  color: #475569;
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover {
    background: #e2e8f0;
    color: #0f172a;
  }
`;

const SectionHeadingLabel = styled.h3`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  margin: 10px 0 0 0; /* Strict adherence to the 10px top spacing margin anchor */
`;

const ServiceTileGridStructure = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px; /* Locked at strict layout limit rule */

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceInteractiveCard = styled(Link)`
  display: flex;
  align-items: flex-start;
  gap: 10px; /* Locked at strict layout limit rule */
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px; /* Locked at strict layout limit rule */
  text-decoration: none;
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;

  .launch-icon {
    color: #94a3b8;
    transition: color 0.15s ease;
  }

  &:hover {
    border-color: #bfdbfe;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
    
    .launch-icon {
      color: #2563eb;
    }
  }
`;

const ActionIconBoundary = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${props => props.themeColor}12; /* Adding 12 applies a subtle alpha opacity opacity layer */
  border: 1px solid ${props => props.themeColor}33;
  svg { color: ${props => props.themeColor}; }
`;

const ServiceCardTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;

  p {
    font-size: 11px;
    line-height: 1.4;
    color: #64748b;
    margin: 0;
  }
`;

const ServiceCardTitleGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;

  h4 {
    font-size: 13px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
`;


const QuickActionsCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 130px;
  box-sizing: border-box;
`;

const ActionPanelTitle = styled.span`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  display: block;
  margin-bottom: 4px;
`;

const ActionLinksGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  justify-content: center;
`;

const ActionRowLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  padding: 8px 10px;
  text-decoration: none;
  transition: all 0.15s ease-in-out;

  /* Conditional check for the Fund Wallet button highlight */
  ${props => props.$isPrimary ? `
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    border: 1px solid #1e40af;
    box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);

    &:hover {
      background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
      transform: translateY(-0.5px);
      box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
    }
  ` : `
    background: #f8fafc;
    border: 1px solid #e2e8f0;

    &:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
    }
  `}
`;

const IconLabelItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 12px;
    font-weight: 600;
    color: #334155;
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