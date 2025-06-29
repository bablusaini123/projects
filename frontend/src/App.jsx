import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import LoginPage from './components/login';
import SignupPage from './components/signup';
import SkillEarnLanding from './components/home';
import TermsAndConditions from './components/terms';
import Header from './components/header';
import Footer from './components/footer';
import Privacy from './components/privacy';
import UserDashboard from './components/dashboard';
import SuccessPage from './components/SuccessPage';
import { isAuthenticated } from './components/auth';
import './App.css';
import { Book, DollarSignIcon, ExternalLink, Outdent, User, Users, Wallet } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

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
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/terms&condition" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<UserDashboard />} />} />
            <Route path="/" element={<SkillEarnLanding />} />
            <Route path="/success" element={<PurchaseProtectedRoute element={<SuccessPage />} />} />
          </Routes>
          <Footer />
          {
            isLogin ? (
              <div className=' md:hidden z-50  sm:flex flex justify-between gap-5 bg-white text-black fixed bottom-0 w-full p-2'>
                <HashLink smooth to="/dashboard#wallet" className='flex justify-center flex-col items-center text-center text-xs font-bold  '><Wallet className='text-blue-500 ' /> <div className='bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent'> Wallet</div></HashLink>
                <HashLink smooth to="/dashboard#affiliate" className='flex justify-center flex-col items-center text-center text-xs font-bold  '><Users className='text-blue-500 ' /> <div className='bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent'> Affiliate</div></HashLink>
                <HashLink smooth to='/dashboard#reffer' className='flex justify-center flex-col items-center text-center text-xs font-bold  '> <DollarSignIcon className='text-blue-500 ' /> <div className='bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent'> Reffer</div></HashLink>
                <HashLink smooth to='/#courses' className='flex justify-center flex-col items-center text-center text-xs font-bold  '><Book className='text-blue-500 ' /><div className='bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent'> Courses</div></HashLink>
                <HashLink smooth to='/dashboard#reffer' className='flex justify-center flex-col items-center text-center text-xs font-bold  '><User className='text-blue-500 ' />  <div className='bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent'> Profile</div></HashLink>


              </div>
            ) : (

          <div className="md:hidden sm:flex flex z-50 justify-between gap-5 bg-white text-black fixed bottom-0 w-full p-2">
            <Link to="/login" className="flex justify-center flex-col items-center text-center text-xs font-bold">
              <Wallet className="text-blue-500" />
              <div className="bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">Wallet</div>
            </Link>

            <Link to="/login" className="flex justify-center flex-col items-center text-center text-xs font-bold">
              <Users className="text-blue-500" />
              <div className="bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">Affiliate</div>
            </Link>

            <Link to="/login" className="flex justify-center flex-col items-center text-center text-xs font-bold">
              <DollarSignIcon className="text-blue-500" />
              <div className="bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">Refer</div>
            </Link>

            <Link to="/login" className="flex justify-center flex-col items-center text-center text-xs font-bold">
              <Book className="text-blue-500" />
              <div className="bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">Courses</div>
            </Link>

            <Link to='/login' className="flex justify-center flex-col items-center text-center text-xs font-bold">
              <User className="text-blue-500" />
              <div className="bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">Profile</div>
            </Link>
          </div>

          )
          }

        </main>
      </div>
    </Router>
  );
};

export default App;