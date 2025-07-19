import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import LoginPage from './components/login';
import SignupPage from './components/signup';
// import earnscopLanding from './components/home';
import EarnscopLanding from './components/home';
import TermsAndConditions from './components/terms';
import Header from './components/header';
import Footer from './components/footer';
import Privacy from './components/privacy';
import UserDashboard from './components/dashboard';
import SuccessPage from './components/SuccessPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faPeopleGroup, faHouse, faBook, faUser } from '@fortawesome/free-solid-svg-icons'
import { isAuthenticated } from './components/auth';
import './App.css';
import { Book, DollarSignIcon, ExternalLink, Outdent, User, Users, Wallet } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import ScrollToTop from './components/scroll';
import Questions from './components/questions';
import About from './components/about_us';
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
};

const PurchaseProtectedRoute = ({ element }) => {
  const location = useLocation();
  const isAuth = isAuthenticated();
  const hasPurchaseData = location.state?.course && location.state?.amount;

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: '/success' }} replace />;
  }

  if (!hasPurchaseData) {
    return <Navigate to="/" replace />;
  }

  return element;
};
const isLogin = localStorage.getItem('loggedIn')


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <main>
          <Header />
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/terms&condition" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<UserDashboard />} />} />
            <Route path="/" element={<EarnscopLanding />} />
            <Route path="/success" element={<PurchaseProtectedRoute element={<SuccessPage />} />} />
            <Route path="/frequently-asked-questions" element={<Questions />} />
            <Route path="/about-us" element={<About />} />


          </Routes>
          <Footer />
          {
            isLogin ? (
              <div className='md:hidden z-50 sm:flex flex justify-between gap-5 bg-gray-200 text-black fixed bottom-0 w-full pb-2 pt-3 px-2'>
                <HashLink to='/' className='flex justify-center flex-col items-center text-center gap-1 text-xs font-bold'>
                  <FontAwesomeIcon icon={faHouse} className='text-2xl'/>
                  <div className='font-medium'>Home</div>
                </HashLink>
                <HashLink to="/dashboard#wallet" className='flex justify-center flex-col gap-1 items-center text-center text-xs font-bold'>
                  <FontAwesomeIcon icon={faWallet} className='text-2xl' />
                  <div className='font-medium'>Wallet</div>
                </HashLink>

                <HashLink to="/dashboard#affiliate" className='flex justify-center flex-col gap-1 items-center text-center text-xs font-bold'>
                  <FontAwesomeIcon icon={faPeopleGroup} className='text-2xl'/>
                  <div className='font-medium'>Affiliate</div>
                </HashLink>


                <HashLink smooth to='/#courses' className='flex justify-center flex-col gap-1 items-center text-center text-xs font-bold'>
                  <FontAwesomeIcon icon={faBook} className='text-2xl'/>
                  <div className='font-medium'>Courses</div>
                </HashLink>

                <HashLink to='/dashboard#reffer' className='flex justify-center flex-col items-center gap-1 text-center text-xs font-bold'>
                  <FontAwesomeIcon icon={faUser} className='text-2xl'/>
                  <div className='font-medium'>Profile</div>
                </HashLink>
              </div>
            ) : (

              <div className='md:hidden z-50 sm:flex flex justify-between gap-5 bg-gray-200 text-black fixed bottom-0 w-full pb-2 pt-3 px-2'>
                <HashLink to='/' className='flex justify-center flex-col items-center text-center gap-1 text-xs font-bold'>
                  <FontAwesomeIcon icon={faHouse} className='text-2xl'/>
                  <div className='font-medium'>Home</div>
                </HashLink>
                <HashLink to="/login" className='flex justify-center flex-col gap-1 items-center text-center text-xs font-bold'>
                  <FontAwesomeIcon icon={faWallet} className='text-2xl' />
                  <div className='font-medium'>Wallet</div>
                </HashLink>

                <HashLink to="/login" className='flex justify-center flex-col gap-1 items-center text-center text-xs font-bold'>
                  <FontAwesomeIcon icon={faPeopleGroup} className='text-2xl'/>
                  <div className='font-medium'>Affiliate</div>
                </HashLink>


                <HashLink smooth to='/login' className='flex justify-center flex-col gap-1 items-center text-center text-xs font-bold'>
                  <FontAwesomeIcon icon={faBook} className='text-2xl'/>
                  <div className='font-medium'>Courses</div>
                </HashLink>

                <HashLink to='/login' className='flex justify-center flex-col items-center gap-1 text-center text-xs font-bold'>
                  <FontAwesomeIcon icon={faUser} className='text-2xl'/>
                  <div className='font-medium'>Profile</div>
                </HashLink>
              </div>

            )
          }

        </main>
      </div>
    </Router>
  );
};

export default App;