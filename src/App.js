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

function App() {
  return (
  <BrowserRouter>
  <ScrollToTop/>
  <Header/>
  <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/usersignup' element={<UserSignup/>}/>
    <Route path='/userlogin' element={<UserLogin/>}/>


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
          </Route>
        </Route>
  </Routes>
  <Footer/>
  </BrowserRouter>
  );
}

export default App;
