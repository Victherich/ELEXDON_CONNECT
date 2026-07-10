import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import UserSignup from './components/UserSignUp';
import UserLogin from './components/UserLogin';
import PrivateUserDashboard from './components/PrivateUserDashboard';
import UserDashboardLayout from './components/UserDashboardLayout';
import ScrollToTop from './components/ScrollToTop';
import UserDashboardOverview from './components/UserDashboardOverview';
import NINPhoneVerification from './components/NINPhoneVerification';
import NINDirectVerification from './components/NINDirectVerification';
import BVNVerification from './components/BVNVerification';
import BVNPhoneVerification from './components/BVNPhoneVerification';
import NINDemographyVerification from './components/NINDemographyVerification';
import NINModificationManagement from './components/NINModificationManagement';
import AirtimeRechargeManagement from './components/AirtimeRechargeManagement';
import DataRechargeSelector from './components/DataRechargeSelector';
import DataPurchasePage from './components/DataPurchasePage';
import ScumlRegistrationPage from './components/ScumlRegistrationPage';
import AnnualReturnsSelectPage from './components/AnnualReturnsSelectPage';
import BusinessNameAnnualReturnsForm from './components/BusinessNameAnnualReturnsForm';
import CompanyAnnualReturnsForm from './components/CompanyAnnualReturnsForm';
import TinRetrievalForm from './components/TinRetrievalForm';
import ElectricityForm from './components/ElectricityForm';
import CacRegistrationPortal from './components/CacRegistrationPortal';
import TransactionHistory from './components/TransactionHistory';
import FundWalletPage from './components/FundWalletPage';
import UserProfilePage from './components/UserProfilePage';
import AdminUserManagement from './components/AdminUserManagement';
import ExamPinManagement from './components/ExamPinManagement';
import WaecManagement from './components/WaecManagement';
import JambManagement from './components/JambManagement';
import AdminTransactionHistory from './components/AdminTransactionHistory';
import AboutUsPage from './components/AboutUsPage';
import LogoTicker from './components/LogoTicker';
import TermsPage from './components/TermsAndConditionsPage';
import PrivacyPolicyPage from './components/PrivacyPolicy';
import TermsOfUsePage from './components/TermsOfUse';
import DownloadCTA from './components/DownloadCTA';
import ContactUsPage from './components/ContactUsPage';

import GotvSubscription from './components/GotvSubscription';

import TvServiceSelector from './components/TvServiceSelector';

function App() {
  return (
  <BrowserRouter>
  <ScrollToTop/>
  <Header/>
  <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/usersignup' element={<UserSignup/>}/>
    <Route path='/userlogin' element={<UserLogin/>}/>
    <Route path='/about' element={<AboutUsPage/>}/>
    <Route path='/termsofservice' element={<TermsPage/>}/>
    <Route path='/privacypolicy' element={<PrivacyPolicyPage/>}/>
    <Route path='/termsofuse' element={<TermsOfUsePage/>}/>
    <Route path='/contact' element={<ContactUsPage/>}/>
   


    <Route element={<PrivateUserDashboard />}>
          {/* Layout structural wrapper is applied globally here across sub-routes */}
          <Route path="/userdashboard" element={<UserDashboardLayout />}>
            {/* These children will render dynamically within UserDashboardLayout's <Outlet /> */}
            <Route path="overview" element={<UserDashboardOverview />} />
            <Route path="service/ninphoneverification" element={<NINPhoneVerification/>} />
            <Route path="service/nindirectverification" element={<NINDirectVerification/>} />
            <Route path="service/printbvn" element={<BVNVerification/>} />
            <Route path='service/bvnphoneprint' element={<BVNPhoneVerification/>}/>
            <Route path='service/nindemographyverification' element={<NINDemographyVerification/>}/>
            <Route path='service/ninmodificationmanagement' element={<NINModificationManagement/>}/>
            <Route path='service/airtimerecharge' element={<AirtimeRechargeManagement/>}/>
            <Route path='service/datarecharge' element={<DataRechargeSelector/>}/>
            <Route path='service/datarecharge/:serviceID' element={<DataPurchasePage/>}/>
            <Route path='service/scumlregistration' element={<ScumlRegistrationPage/>}/>
            <Route path='service/annualreturns' element={<AnnualReturnsSelectPage/>}/>
            <Route path='service/annualreturns/businessname' element={<BusinessNameAnnualReturnsForm/>}/>
             <Route path='service/annualreturns/company' element={<CompanyAnnualReturnsForm/>}/>
             <Route path='service/tinretrieval' element={<TinRetrievalForm/>}/>
             <Route path='service/electricityrecharge' element={<ElectricityForm/>}/>
             <Route path='service/cacregistration' element={<CacRegistrationPortal/>}/>
             <Route path='service/examinationpins' element={<ExamPinManagement/>}/>
<Route path='service/waecservices' element={<WaecManagement/>}/>
<Route path='service/jambservices' element={<JambManagement/>}/>
             <Route path='transactions' element={<TransactionHistory/>}/>
             <Route path='fundwallet' element={<FundWalletPage/>}/>
             <Route path='profile' element={<UserProfilePage/>}/>
             <Route path='allusers' element={<AdminUserManagement/>}/>
             <Route path='alltransactions' element={<AdminTransactionHistory/>}/>
              <Route path='service/tvsubscriptions' element={<TvServiceSelector/>}/>
              <Route path='service/gotv' element={<GotvSubscription/>}/>
             
          </Route>
        </Route>
  </Routes>
  <LogoTicker/>
  <DownloadCTA/>
  <Footer/>
  </BrowserRouter>
  );
}

export default App;
