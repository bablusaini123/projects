
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import '../../../index.css';

function Slider() {
    const images = [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        'https://images.unsplash.com/photo-1516321310768-79d0c1a72f33',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
        'https://images.unsplash.com/photo-1497366210540-1f3c97e7193a',
        'https://images.unsplash.com/photo-1516321310768-79d0c1a72f33',
    ];

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Swiper
                modules={[Autoplay]}
                loop={true}
                slidesPerView={10}
                spaceBetween={0}
                autoplay={{
                    delay: 0, // No delay for continuous scrolling
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false, // Prevent pausing on hover
                }}
                speed={150000} // Very slow transition (15 seconds for a full cycle)
                allowTouchMove={false} // Disable manual dragging for seamless scrolling
                loopedSlides={images.length} // Ensure seamless looping
                cssMode={true} // Use CSS mode for smoother transitions
                className="w-full h-full"
                style={{
                    '--swiper-wrapper-transition-timing-function': 'linear', // Linear transition for constant speed
                }}
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="w-full h-screen bg-cover bg-center relative"
                            style={{ backgroundImage: `url(${src})` }}
                        >
                            <div className="absolute inset-0 bg-red-600 opacity-50"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

function LoginForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        companyName: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setFormData({ email: '', password: '', companyName: '', phone: '' });
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (!isLogin) {
            if (!formData.companyName) newErrors.companyName = 'Company name is required';
            if (!formData.phone) newErrors.phone = 'Phone number is required';
            else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(isLogin ? 'Login submitted' : 'Signup submitted', formData);
            // Add your API call here
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center z-[3000]">
            <div className="flex items-center justify-center flex-grow p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        {isLogin ? 'Login to Your B2B Account' : 'Create Your B2B Account'}
                    </h2>
                    <div className="flex justify-center gap-4 mb-6">
                        <button
                            onClick={toggleForm}
                            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={toggleForm}
                            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Signup
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter company name"
                                    />
                                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter phone number"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>
                            </>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter email address"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter password"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                        >
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <span
                            onClick={toggleForm}
                            className="text-blue-600 hover:underline cursor-pointer"
                        >
                            {isLogin ? 'Sign up' : 'Login'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

function Register() {
    return (
        <div className="relative w-full h-screen">
            <Slider />
            <LoginForm />
        </div>
    );
}

export default Register;












<div className="flex flex-col md:flex-row w-full bg-white text-black ">
        {/* Left Side - Categories */}
        <div className="w-full md:w-1/3 p-8 border-r border-gray-200">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Explore</h1>
            <p className="text-gray-600">Discover business solutions for your enterprise</p>

            {/* Search Input */}
            <div className="relative mt-6 mb-8">
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
          </div>

          {/* Categories */}
          <div className="category-container overflow-y-auto max-h-96">
            <h2 className="text-lg font-semibold mb-4">Popular Categories</h2>
            <ul className="space-y-1">
                <>
              {filterdCategories.map((category, index) => (
                  <div className='flex justify-between  hover:bg-gray-100 rounded-md cursor-pointer transition-colors items-center'>
                    <li
                      key={index}
                      className="px-3 py-2 flex items-center justify-between"
                    >
                      <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                      {category}
                    </li>
                    <div>
                      <span> <ChevronRight /> </span>
                    </div>
                  </div>
                    ))}
                  {filterdCategories.length === 0 && (
                    <li
                      className="px-3 py-2 "
                    >
                      <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                      No Category found
                    </li>
                  )}
                </>
              
            </ul>
          </div>
        </div>

        {/* Right Side - Featured Slider (more conservative size) */}
        <div className="w-full md:w-2/3 bg-white relative overflow-hidden">
          {/* B2B appropriate sized slider */}
          <div className="w-full h-96 md:h-[500px] relative">
            {/* Slides */}
            <div className="relative w-full h-full">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white bg-opacity-90 text-black inline-block px-6 py-3 rounded shadow-md">
                      <h3 className="text-xl md:text-2xl font-bold">{slide.title}</h3>
                      <p className="text-sm md:text-base text-gray-700 mt-1">Professional grade solutions for businesses</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-gray-100 focus:outline-none shadow-md"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-gray-100 focus:outline-none shadow-md"
            >
              <ChevronRight size={20} />
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-4 right-6 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-black" : "bg-gray-300"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>

          {/* Additional B2B call-to-action section */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Request Custom Quote</h3>
                <p className="text-gray-600 text-sm">Get volume pricing tailored to your business needs</p>
              </div>
              <button className="mt-4 md:mt-0 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>


 <div className="w-full md:w-[25%] relative">
        <div className="w-full h-96 md:h-[500px] relative">
          <div className="relative w-full h-full ">
            {slides.map((slideItems, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="  px-4 grid grid-cols-2 gap-4">
                  {slideItems.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow-md">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <div className="p-3">
                        <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-sm text-green-600 font-medium mt-1">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-gray-100 focus:outline-none shadow-md"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full hover:bg-gray-100 focus:outline-none shadow-md"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
          {/* Slide Indicators */}
          <div className="absolute bottom-4 right-6 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>


import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import '@/App.css'
import Category from '../products/category';
import slide1 from './slide1.webp'
import slide2 from './slide2.webp'
import slide3 from './slide3.webp'
import slide4 from './slide4.webp'

export default function B2BLayout() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('')

  // Sample categories for B2B site
  const categories = [
    "Office Electronics",
    "Enterprise Software",
    "Networking Equipment",
    "Server Hardware",
    "IT Services",
    "Data Security",
    "Industrial Supplies",
    "Bulk Devices",
    "Corporate Solutions",
    "Business Furniture",
    "Telecommunication",
    "Printing Solutions",
    "Conference Equipment",
    "Cloud Services",
    "Electronic Components"
  ];

  const slides = [
    {
      image: slide1,
      alt: "Enterprise server solutions",
      title: "Enterprise Servers"
    },
    {
      image: slide2,
      alt: "Business networking equipment",
      title: "Networking Solutions"
    },
    {
      image: slide3,
      alt: "Office electronics and peripherals",
      title: "Office Electronics"
    },
    {
      image: slide4,
      alt: "Corporate security systems",
      title: "Security Systems"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filterdCategories = categories.filter(category =>
     category.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    
      <>
  <div
    style={{
      position: "absolute",
      zIndex: -100,
      width: "100%",
      height: 680,
      top: 190,
      left: 0,
      background: "url(data:image/png",
      backgroundSize: "cover"
    }}
  ></div>
  <div className="header_head-belt__IEf4U">
    <div className="" spm-c="topbanner" async-exposure="true">
      <a
        href="https://www.dhgate.com/sales/market/stocksavesale.html"
        event-type="expose"
        resource=""
        link-type="banner"
        target="_blank"
        style={{
          display: "block",
          width: "100%",
          height: 35,
          background: 'url("data:image/png'
        }}
        scm='{"scm_id":"tag.personallize_booth.null.41365.1.r4236475458"}'
      >
        <div
          className="bg-center bg-no-repeat"
          style={{
            height: 35,
            background:
              "url(https://www.dhresource.com/webp/m/f3/decorate/ys/m/19/55421001-8a49-468a-95f6-0a2b18af2241.jpg) center no-repeat #fff"
          }}
        ></div>
        <img src="" />
      </a>
    </div>
    <div
      className="topInfo_top-info-wrap__G3_7S"
      spm-c="top"
      async-exposure="true"
    >
      <div className="topInfo_top-info-main__fW4BE">
        <a
          className="topInfo_ip-protection__UCXZ5"
          event-type="mouseenter"
          href="//brand.dhgate.com/intellectualproperty/home"
          spm-index="submit"
        >
          IP Protection Portal
        </a>
        <a
          className="topInfo_buyer-protection__RcGTy"
          event-type="mouseenter"
          href="//www.dhgate.com/buyer/buyerProtection#pu1812_buyerprot"
          spm-index="buyer"
        >
          Buyer Protection
        </a>
        <a
          className="topInfo_customer-service__9N835"
          event-type="mouseenter"
          spm-index="custom"
          href="https://www.dhgate.com/helpbuyer/helpcenter.html#pu1812_helptop-contactUs"
        >
          Customer Service
        </a>
        <a
          className="topInfo_save-more__9559J"
          event-type="mouseenter"
          href="//www.dhgate.com/sales/campaign/downloadapp.html#pu1812-APP-head"
          spm-index="down"
        >
          Save more
        </a>
        <div className="language_head-ship-to__5FGwv">
          <div
            className="language_common-trig-box__sO0qE"
            spm-c=""
            spm-index="anycountry"
            event-type="mouseenter"
          >
            <div className="flag_dh-country-flag__YUMTP">
              <var className="flag_dh-flag__oQ5M_ undefined" />
            </div>
            <span className="language_ship-to-text__bleWX">
              USD{/* */}/{/* */}EN
            </span>
            <span className="language_ship-to-arrow__G2QLU" />
          </div>
        </div>
      </div>
    </div>
    <header
      className="header_head-box-belt__yP_Rf"
      spm-c="root-head"
      async-exposure="true"
    >
      <div className="header_head-box__5mGKs" id="head-box-belt">
        <div className="header_head-main__MUATV">
          <div className="logo_dh-logo__yfCCG" spm-c="logo">
            <a href="https://www.dhgate.com">
              <span className="logo_dh-logo-base__qe9Pc" />
            </a>
          </div>
          <div className="search_head-search-belt__zG4vG">
            <form id="searchForm" action="/wholesale/search.do" method="get">
              <div className="search_head-search-box___JytI">
                <div className="search_search-fill__gfqa5">
                  <input type="hidden" name="act" defaultValue="search" />
                  <input
                    type="hidden"
                    id="headDspm"
                    name="dspm"
                    defaultValue=""
                  />
                  <input
                    type="hidden"
                    id="headCate"
                    name="catalog"
                    defaultValue=""
                  />
                  <input
                    type="hidden"
                    id="suggestsearch"
                    name="sus"
                    defaultValue=""
                  />
                  <input
                    type="text"
                    className="search_search-input__UeTtc"
                    autoComplete="off"
                    event-type="click"
                    spm-c="searchInput"
                    name="searchkey"
                    defaultValue=""
                  />
                </div>
                <div
                  className="search_search-attach__WgGjy"
                  event-type="click"
                  spm-c="search"
                />
              </div>
            </form>
          </div>
          <div className="account_head-account-wrap__YsrbG">
            <div className="account_head-account__KMlV_" spm-c="mydhtype">
              <div
                className="account_account-trig-box__cyrpl"
                event-type="mouseenter"
                spm-index="hover"
              >
                <a
                  href="https://dg.dhgate.com/mydhgate/index.html"
                  rel="nofollow"
                  spm-index={1}
                  event-type="click"
                  className="account_account-trig__aSPbp"
                >
                  <span className="account_account-icon__b3LdK" />
                  <div
                    className="account_account-text__79421"
                    spm-index="hover"
                  >
                    <span className="account_account-large__DFHc_">
                      Join{/* */} / {/* */}Sign in
                    </span>
                    <b>
                      <span className="account_mydhgate__CJTMn">My DHgate</span>
                      <span className="account_account-arrow__I1A3k" />
                    </b>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="h-[64px] flex justify-center items-center">
            <i className="border-solid border-[#666666] border-l-[1px] h-[16px] w-[1px] inline-block" />
          </div>
          <div className="viewed_head_viewed__KIiOY" spm-c="recentlyviewed">
            <div
              className="viewed_viewed_trig__yDtze"
              event-type="mouseenter"
              spm-index={1}
            >
              <span
                className="viewed_viewed_icon__SmpqI"
                event-type="click"
                spm-index={1}
              />
            </div>
            <div
              className="viewed_viewed_wrap__VKe6x"
              spm-index={1}
              event-type="mouseenter"
            >
              <i className="triangle_triangle-belt__K4VZV viewed_triangle_belt__mkiWM" />
              <div className="viewed_viewed-box__dIYVS" spm-c="recently">
                <div className="viewed_viewed-title__LW5Le">
                  Recently Viewed
                </div>
                <div className="viewed_viewed-list__ltwiT">
                  <div className="viewed_data_empty__i03m0">
                    <div className="viewed_empty_tips__9H025">
                      We haven't found any Items here.
                    </div>
                    <div className="viewed_empty_action__2TImH">
                      <a
                        rel="nofollow"
                        href="https://secure.dhgate.com/usr/signin.do"
                        spm-c="favsignin"
                      >
                        Sign in
                      </a>{" "}
                      /{" "}
                      <a
                        rel="nofollow"
                        spm-c="joinfree"
                        href="https://secure.dhgate.com/usr/register.do"
                      >
                        Join Free
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="favorites_head_favorites__hcXak"
            spm-c="favorites"
            ss="en"
          >
            <div
              className="favorites_favorites_trig__TIa4J"
              event-type="mouseenter"
              spm-index={1}
            >
              <span
                className="favorites_favorites_icon__hpBTu"
                event-type="click"
                spm-index={1}
              />
            </div>
            <div
              className="favorites_favorites_wrap__5XC6n"
              spm-index={1}
              event-type="mouseenter"
            >
              <i className="triangle_triangle-belt__K4VZV favorites_triangle_belt__bMwHI" />
              <div className="favorites_favorites-box__IqbCF" spm-c="favexpo">
                <div className="favorites_favorites-title__HiKdp">
                  Favorites
                  <a
                    href="https://dg.dhgate.com/favorite/proddetaillist.do"
                    rel="nofollow"
                    spm-c="favmore"
                  >
                    View All{/* */} &gt;
                  </a>
                </div>
                <div className="favorites_favorites-list__qELbM">
                  <div className="favorites_data_empty__T2k3a">
                    <div className="favorites_empty_tips__s2tMo">
                      Please Sign in and view your Favorite Item.
                    </div>
                    <div className="favorites_empty_action__IdxHx">
                      <a
                        href="https://secure.dhgate.com/usr/signin.do"
                        spm-c="favsignin"
                        rel="nofollow"
                      >
                        Sign in
                      </a>{" "}
                      /{" "}
                      <a
                        spm-c="joinfree"
                        href="https://secure.dhgate.com/usr/register.do"
                        rel="nofollow"
                      >
                        Join Free
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="cart_head-cart__uW3H_"
            spm-c="cart"
            event-type="mouseenter"
          >
            <a
              href="https://shoppingcart.dhgate.com/cart/list"
              className="cart_CartLink__OXJtl"
              spm-c="cartclick"
              rel="nofollow"
            >
              <span className="cart_cart-icon__gZ_TV" />
              <div className="cart_cart-text__OmXXF">
                <span className="cart_cart-count__i5w2r" id="cartcnt">
                  0
                </span>
                <span>Cart</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  </div>
  <div className="nav-box" spm-c="toptab" async-exposure="true">
    <div className="nav-Warp" data-editor="nav-Warp">
      {/* nav-del-start */}
      <div className="navigation">
        <div
          id="navBrowseFylout"
          className="nav-allCategorys"
          spm-c="category"
          async-exposure="true"
          data-url="/navsubcats-2018.html"
        >
          <div className="nav-cateTitle" spm-c="cateall">
            <a href="https://www.dhgate.com/all-categories/index.html#pu1806-all">
              <ml>ALL CATEGORIES</ml>
            </a>
          </div>
          <div id="navCatsWarp" className="nav-cateList">
            <ul id="navCats" spm-c="category">
              <li id="navCat0">
                <a
                  href="https://www.dhgate.com/wholesale/pet-supplies/c210.html"
                  spm-index={1}
                >
                  Pet Supplies
                </a>
                <i className="navcate-arr" />
              </li>
              <li id="navCat1">
                <a
                  href="https://www.dhgate.com/wholesale/shoes-accessories/c110.html"
                  spm-index={2}
                >
                  Shoes &amp; Accessories
                </a>
                <i className="navcate-arr" />
              </li>
              <li id="navCat2">
                <a
                  href="https://www.dhgate.com/wholesale/apparel/c014.html"
                  spm-index={3}
                >
                  Apparel
                </a>
                <i className="navcate-arr" />
              </li>
              <li id="navCat3">
                <a
                  href="https://www.dhgate.com/wholesale/bags-luggage-accessories/c107.html"
                  spm-index={4}
                >
                  Bags
                </a>
                <span className="navSubDevide">|</span>
                <a
                  href="https://www.dhgate.com/wholesale/fashion-accessories/c109.html"
                  spm-index={5}
                >
                  Fashion Accessories
                </a>
                <i className="navcate-arr" />
              </li>
              <li id="navCat4">
                <a
                  href="https://www.dhgate.com/wholesale/home-garden/c019.html"
                  spm-index={6}
                >
                  Home&amp;Garden
                </a>
                <span className="navSubDevide">|</span>
                <a
                  href="https://www.dhgate.com/wholesale/lights-lighting/c117.html"
                  spm-index={7}
                >
                  Lighting
                </a>
                <i className="navcate-arr" />
              </li>
              <li id="navCat5">
                <a
                  href="https://www.dhgate.com/wholesale/cell-phones-accessories/c105.html"
                  spm-index={8}
                >
                  Cell Phones
                </a>
                <span className="navSubDevide">|</span>
                <a
                  href="https://www.dhgate.com/wholesale/video-surveillance/c007003.html"
                  spm-index={9}
                >
                  Video Surveillance
                </a>
                <i className="navcate-arr" />
              </li>
              <li id="navCat6">
                <a
                  href="https://www.dhgate.com/wholesale/electronics/c103.html"
                  spm-index={10}
                >
                  Electronics
                </a>
                <span className="navSubDevide">|</span>
                <a
                  href="https://www.dhgate.com/wholesale/office-school-business-industrial/c011.html"
                  spm-index={11}
                >
                  Industrial
                </a>
                <i className="navcate-arr" />
              </li>
              <li id="navCat7">
                <a
                  href="https://www.dhgate.com/wholesale/sports-outdoors/c024.html"
                  spm-index={12}
                >
                  Sports &amp; Outdoors
                </a>
                <i className="navcate-arr" />
              </li>
              <li id="navCat8">
                <a
                  href="https://www.dhgate.com/wholesale/health-beauty/c018.html"
                  spm-index={13}
                >
                  Health &amp; Beauty
                </a>
                <i className="navcate-arr" />
              </li>
              <li id="navCat9">
                <a
                  href="https://www.dhgate.com/wholesale/toys-gifts/c102.html"
                  spm-index={14}
                >
                  Toys&amp;Gifts
                </a>
                <span className="navSubDevide">|</span>
                <a
                  href="https://www.dhgate.com/wholesale/baby-kids-maternity/c111.html"
                  spm-index={15}
                >
                  Baby&amp;Kids
                </a>
                <i className="navcate-arr" />
              </li>
              <li id="navCat10">
                <a
                  href="https://www.dhgate.com/wholesale/jewelry/c100.html"
                  spm-index={16}
                >
                  Jewelry &amp; Watches
                </a>
                <i className="navcate-arr" />
              </li>
              <li id="navCat11">
                <a
                  href="https://www.dhgate.com/wholesale/wedding-party-events/c002.html"
                  spm-index={17}
                >
                  Weddings &amp; Formal Events
                </a>
                <i className="navcate-arr" />
              </li>
              <li id="navCat12">
                <a
                  href="https://www.dhgate.com/wholesale/hair-products/c130.html"
                  spm-index={18}
                >
                  Hair &amp; Styling
                </a>
                <i className="navcate-arr" />
              </li>
              <li id="navCat13">
                <a
                  href="https://www.dhgate.com/wholesale/computers-networking/c104.html"
                  spm-index={19}
                >
                  Computers
                </a>
                <span className="navSubDevide">|</span>
                <a
                  href="https://www.dhgate.com/wholesale/games-accessories/c108.html"
                  spm-index={20}
                >
                  Games
                </a>
                <i className="navcate-arr" />
              </li>
              <li id="navCat14" className="moreCate">
                <a
                  href="https://www.dhgate.com/wholesale/automobiles-motorcycles/c112.html"
                  spm-c="morecate"
                >
                  Automobile &amp; Motorcycle
                </a>
                <i className="navcate-arr" />
              </li>
            </ul>
          </div>
          <div className="navSubLoading" style={{ display: "none" }}>
            <span>Loading</span>
          </div>
        </div>
        <div className="nav-Entrance">
          <ul>
            <li>
              <a
                href="https://www.dhgate.com/sales/market/flashdeals.html"
                spm-index={1}
                resource={22925}
              >
                Flash Deals
              </a>
            </li>
            <li>
              <a
                href="https://www.dhgate.com/sales/market/pet_deals.html"
                spm-index={2}
                resource={22925}
              >
                Pet Oasis
              </a>
            </li>
            <li>
              <a
                href="https://www.dhgate.com/sales/market/2022just2.html"
                spm-index={3}
                resource={22925}
              >
                Just For You
              </a>
            </li>
            <li>
              <a
                href="https://www.dhgate.com/sales/market/pet_groomer.html"
                spm-index={4}
                resource={22925}
              >
                Groomer
              </a>
            </li>
            <li>
              <a
                href="https://www.dhgate.com/sales/market/influencers_picks.html"
                spm-index={5}
                resource={22925}
              >
                influencers’ Picks
              </a>
            </li>
          </ul>
        </div>
        <div className="-j-mobile-nav" />
      </div>
      {/* nav-del-end */}
      {/* nav-bot */}
    </div>
  </div>
  <div className="page_layout__kCQ53">
    <div className="page_content__BRae2">
      <div className="page_aboveTheFold__kHZPB">
        <div className="page_categoryLeft__0KRmv" />
        {/*$*/}
        <div className="newBuyer_newBuyer__WUskd">
          <a
            href="https://www.dhgate.com/newBuyerZone/newBuyerZone.html"
            className="newBuyer_titleWrap__PGtMK"
            spm-c="supersavingmore"
          >
            <h2>
              New User，UP TO <span>90% Off</span>
            </h2>
            <div className="newBuyer_titleViewAll__nFLyu">
              <i />
            </div>
          </a>
          <div className="newBuyer_listWrap__su71E">
            <div className="newBuyer_listMain__2_n8E" spm-c="supersaving">
              <div
                className="slick-slider newBuyerSlider slick-initialized"
                dir="ltr"
              >
                <button
                  type="button"
                  data-role="none"
                  className="slick-arrow slick-prev"
                  style={{ display: "block" }}
                >
                  {" "}
                  {/* */}Previous
                </button>
                <div className="slick-list">
                  <div
                    className="slick-track"
                    style={{ width: "600%", left: "-100%" }}
                  >
                    <div
                      data-index={-2}
                      tabIndex={-1}
                      className="slick-slide slick-cloned"
                      aria-hidden="true"
                      style={{ width: "8.333333333333334%" }}
                    >
                      <div>
                        <div
                          className="newBuyer_groupWrap__XpCOf"
                          tabIndex={-1}
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="newBuyer_productInfo__7FRzC">
                            <a
                              href="https://www.dhgate.com/product/new-women-s-accessories-with-personalized/1036044876.html"
                              target="_blank"
                              itemcode={1036044876}
                              spm-index={6}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/n/02/10078d9b-cef0-4ee6-b202-fabdc4f53d56.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $4.90{/* */}
                                <span>$19.79</span>
                              </div>
                            </a>
                          </div>
                          <div className="newBuyer_productInfo__7FRzC newBuyer_secondOne__GpXhJ">
                            <a
                              href="https://www.dhgate.com/product/26-english-a-z-letter-classic-minimalist/1034578990.html"
                              target="_blank"
                              itemcode={1034578990}
                              spm-index={7}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/s/23/53d4177c-c0b7-48bf-8006-cfe267e3d286.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $4.90{/* */}
                                <span>$19.69</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-index={-1}
                      tabIndex={-1}
                      className="slick-slide slick-cloned"
                      aria-hidden="true"
                      style={{ width: "8.333333333333334%" }}
                    >
                      <div>
                        <div
                          className="newBuyer_groupWrap__XpCOf"
                          tabIndex={-1}
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="newBuyer_productInfo__7FRzC">
                            <a
                              href="https://www.dhgate.com/product/hecheng-new-turquoise-bohemian-style-jewelry/1035559122.html"
                              target="_blank"
                              itemcode={1035559122}
                              spm-index={8}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/s/29/063122e9-4fd1-45f3-817a-1825f75914df.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $4.90{/* */}
                                <span>$19.69</span>
                              </div>
                            </a>
                          </div>
                          <div className="newBuyer_productInfo__7FRzC newBuyer_secondOne__GpXhJ">
                            <a
                              href="https://www.dhgate.com/product/2024-spring-korean-version-instagram-style/1012842450.html"
                              target="_blank"
                              itemcode={1012842450}
                              spm-index={9}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/j/18/1f2cb0bf-8872-413a-8cf1-42cb2428f1bf.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $9.90{/* */}
                                <span>$14.25</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-index={0}
                      className="slick-slide slick-active slick-current"
                      tabIndex={-1}
                      aria-hidden="false"
                      style={{ outline: "none", width: "8.333333333333334%" }}
                    >
                      <div>
                        <div
                          className="newBuyer_groupWrap__XpCOf"
                          tabIndex={-1}
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div
                            className="newBuyer_couponInfo__ZLLB2"
                            spm-c="newzone"
                            spm-index={1}
                            sync-exposure="true"
                          >
                            <a href="https://www.dhgate.com/newBuyerZone/newBuyerZone.html">
                              <strong>$9</strong>
                              <p>Coupon Pack</p>
                              <div className="newBuyer_getButton__7RMAi">
                                <span>Collect</span>
                              </div>
                            </a>
                          </div>
                          <div className="newBuyer_productInfo__7FRzC newBuyer_secondOne__GpXhJ">
                            <a
                              href="https://www.dhgate.com/product/trendy-puffer-quilted-tote-rhombus-nylon/1028780785.html"
                              target="_blank"
                              itemcode={1028780785}
                              spm-index={1}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/z/28/b851eea4-f88d-458f-bce9-5894eb3b9e09.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $24.90{/* */}
                                <span>$49.80</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-index={1}
                      className="slick-slide slick-active"
                      tabIndex={-1}
                      aria-hidden="false"
                      style={{ outline: "none", width: "8.333333333333334%" }}
                    >
                      <div>
                        <div
                          className="newBuyer_groupWrap__XpCOf"
                          tabIndex={-1}
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="newBuyer_productInfo__7FRzC">
                            <a
                              href="https://www.dhgate.com/product/women-s-shorts-2025-summer-leopard-print/1036595364.html"
                              target="_blank"
                              itemcode={1036595364}
                              spm-index={2}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/n/06/f48174c9-c7c2-4726-be25-d37757cb9ea0.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $14.90{/* */}
                                <span>$32.95</span>
                              </div>
                            </a>
                          </div>
                          <div className="newBuyer_productInfo__7FRzC newBuyer_secondOne__GpXhJ">
                            <a
                              href="https://www.dhgate.com/product/handmade-beach-rattan-bag-female-messenger/1034375230.html"
                              target="_blank"
                              itemcode={1034375230}
                              spm-index={3}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/s/12/b1d0b76b-c220-4072-9428-da1cfee160f9.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $9.90{/* */}
                                <span>$19.78</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-index={2}
                      className="slick-slide"
                      tabIndex={-1}
                      aria-hidden="true"
                      style={{ outline: "none", width: "8.333333333333334%" }}
                    >
                      <div>
                        <div
                          className="newBuyer_groupWrap__XpCOf"
                          tabIndex={-1}
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="newBuyer_productInfo__7FRzC">
                            <a
                              href="https://www.dhgate.com/product/2024-sparkling-gorgeous-handmade-full-round/1000153029.html"
                              target="_blank"
                              itemcode={1000153029}
                              spm-index={4}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/o/07/a698d1fa-f165-41d5-bd23-0c8e8bc82a72.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $9.90{/* */}
                                <span>$30.53</span>
                              </div>
                            </a>
                          </div>
                          <div className="newBuyer_productInfo__7FRzC newBuyer_secondOne__GpXhJ">
                            <a
                              href="https://www.dhgate.com/product/fashionable-full-dia-cuban-chain-necklace/1034534358.html"
                              target="_blank"
                              itemcode={1034534358}
                              spm-index={5}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/s/23/32755abd-9562-4d78-a7f1-81428e4b83bb.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $4.90{/* */}
                                <span>$19.69</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-index={3}
                      className="slick-slide"
                      tabIndex={-1}
                      aria-hidden="true"
                      style={{ outline: "none", width: "8.333333333333334%" }}
                    >
                      <div>
                        <div
                          className="newBuyer_groupWrap__XpCOf"
                          tabIndex={-1}
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="newBuyer_productInfo__7FRzC">
                            <a
                              href="https://www.dhgate.com/product/new-women-s-accessories-with-personalized/1036044876.html"
                              target="_blank"
                              itemcode={1036044876}
                              spm-index={6}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/n/02/10078d9b-cef0-4ee6-b202-fabdc4f53d56.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $4.90{/* */}
                                <span>$19.79</span>
                              </div>
                            </a>
                          </div>
                          <div className="newBuyer_productInfo__7FRzC newBuyer_secondOne__GpXhJ">
                            <a
                              href="https://www.dhgate.com/product/26-english-a-z-letter-classic-minimalist/1034578990.html"
                              target="_blank"
                              itemcode={1034578990}
                              spm-index={7}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/s/23/53d4177c-c0b7-48bf-8006-cfe267e3d286.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $4.90{/* */}
                                <span>$19.69</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-index={4}
                      className="slick-slide"
                      tabIndex={-1}
                      aria-hidden="true"
                      style={{ outline: "none", width: "8.333333333333334%" }}
                    >
                      <div>
                        <div
                          className="newBuyer_groupWrap__XpCOf"
                          tabIndex={-1}
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="newBuyer_productInfo__7FRzC">
                            <a
                              href="https://www.dhgate.com/product/hecheng-new-turquoise-bohemian-style-jewelry/1035559122.html"
                              target="_blank"
                              itemcode={1035559122}
                              spm-index={8}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/s/29/063122e9-4fd1-45f3-817a-1825f75914df.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $4.90{/* */}
                                <span>$19.69</span>
                              </div>
                            </a>
                          </div>
                          <div className="newBuyer_productInfo__7FRzC newBuyer_secondOne__GpXhJ">
                            <a
                              href="https://www.dhgate.com/product/2024-spring-korean-version-instagram-style/1012842450.html"
                              target="_blank"
                              itemcode={1012842450}
                              spm-index={9}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/j/18/1f2cb0bf-8872-413a-8cf1-42cb2428f1bf.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $9.90{/* */}
                                <span>$14.25</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-index={5}
                      tabIndex={-1}
                      className="slick-slide slick-cloned"
                      aria-hidden="true"
                      style={{ width: "8.333333333333334%" }}
                    >
                      <div>
                        <div
                          className="newBuyer_groupWrap__XpCOf"
                          tabIndex={-1}
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div
                            className="newBuyer_couponInfo__ZLLB2"
                            spm-c="newzone"
                            spm-index={1}
                            sync-exposure="true"
                          >
                            <a href="https://www.dhgate.com/newBuyerZone/newBuyerZone.html">
                              <strong>$9</strong>
                              <p>Coupon Pack</p>
                              <div className="newBuyer_getButton__7RMAi">
                                <span>Collect</span>
                              </div>
                            </a>
                          </div>
                          <div className="newBuyer_productInfo__7FRzC newBuyer_secondOne__GpXhJ">
                            <a
                              href="https://www.dhgate.com/product/trendy-puffer-quilted-tote-rhombus-nylon/1028780785.html"
                              target="_blank"
                              itemcode={1028780785}
                              spm-index={1}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/z/28/b851eea4-f88d-458f-bce9-5894eb3b9e09.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $24.90{/* */}
                                <span>$49.80</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-index={6}
                      tabIndex={-1}
                      className="slick-slide slick-cloned"
                      aria-hidden="true"
                      style={{ width: "8.333333333333334%" }}
                    >
                      <div>
                        <div
                          className="newBuyer_groupWrap__XpCOf"
                          tabIndex={-1}
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="newBuyer_productInfo__7FRzC">
                            <a
                              href="https://www.dhgate.com/product/women-s-shorts-2025-summer-leopard-print/1036595364.html"
                              target="_blank"
                              itemcode={1036595364}
                              spm-index={2}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/n/06/f48174c9-c7c2-4726-be25-d37757cb9ea0.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $14.90{/* */}
                                <span>$32.95</span>
                              </div>
                            </a>
                          </div>
                          <div className="newBuyer_productInfo__7FRzC newBuyer_secondOne__GpXhJ">
                            <a
                              href="https://www.dhgate.com/product/handmade-beach-rattan-bag-female-messenger/1034375230.html"
                              target="_blank"
                              itemcode={1034375230}
                              spm-index={3}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/s/12/b1d0b76b-c220-4072-9428-da1cfee160f9.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $9.90{/* */}
                                <span>$19.78</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-index={7}
                      tabIndex={-1}
                      className="slick-slide slick-cloned"
                      aria-hidden="true"
                      style={{ width: "8.333333333333334%" }}
                    >
                      <div>
                        <div
                          className="newBuyer_groupWrap__XpCOf"
                          tabIndex={-1}
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="newBuyer_productInfo__7FRzC">
                            <a
                              href="https://www.dhgate.com/product/2024-sparkling-gorgeous-handmade-full-round/1000153029.html"
                              target="_blank"
                              itemcode={1000153029}
                              spm-index={4}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/o/07/a698d1fa-f165-41d5-bd23-0c8e8bc82a72.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $9.90{/* */}
                                <span>$30.53</span>
                              </div>
                            </a>
                          </div>
                          <div className="newBuyer_productInfo__7FRzC newBuyer_secondOne__GpXhJ">
                            <a
                              href="https://www.dhgate.com/product/fashionable-full-dia-cuban-chain-necklace/1034534358.html"
                              target="_blank"
                              itemcode={1034534358}
                              spm-index={5}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/s/23/32755abd-9562-4d78-a7f1-81428e4b83bb.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $4.90{/* */}
                                <span>$19.69</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-index={8}
                      tabIndex={-1}
                      className="slick-slide slick-cloned"
                      aria-hidden="true"
                      style={{ width: "8.333333333333334%" }}
                    >
                      <div>
                        <div
                          className="newBuyer_groupWrap__XpCOf"
                          tabIndex={-1}
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="newBuyer_productInfo__7FRzC">
                            <a
                              href="https://www.dhgate.com/product/new-women-s-accessories-with-personalized/1036044876.html"
                              target="_blank"
                              itemcode={1036044876}
                              spm-index={6}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/n/02/10078d9b-cef0-4ee6-b202-fabdc4f53d56.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $4.90{/* */}
                                <span>$19.79</span>
                              </div>
                            </a>
                          </div>
                          <div className="newBuyer_productInfo__7FRzC newBuyer_secondOne__GpXhJ">
                            <a
                              href="https://www.dhgate.com/product/26-english-a-z-letter-classic-minimalist/1034578990.html"
                              target="_blank"
                              itemcode={1034578990}
                              spm-index={7}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/s/23/53d4177c-c0b7-48bf-8006-cfe267e3d286.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $4.90{/* */}
                                <span>$19.69</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-index={9}
                      tabIndex={-1}
                      className="slick-slide slick-cloned"
                      aria-hidden="true"
                      style={{ width: "8.333333333333334%" }}
                    >
                      <div>
                        <div
                          className="newBuyer_groupWrap__XpCOf"
                          tabIndex={-1}
                          style={{ width: "100%", display: "inline-block" }}
                        >
                          <div className="newBuyer_productInfo__7FRzC">
                            <a
                              href="https://www.dhgate.com/product/hecheng-new-turquoise-bohemian-style-jewelry/1035559122.html"
                              target="_blank"
                              itemcode={1035559122}
                              spm-index={8}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/s/29/063122e9-4fd1-45f3-817a-1825f75914df.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $4.90{/* */}
                                <span>$19.69</span>
                              </div>
                            </a>
                          </div>
                          <div className="newBuyer_productInfo__7FRzC newBuyer_secondOne__GpXhJ">
                            <a
                              href="https://www.dhgate.com/product/2024-spring-korean-version-instagram-style/1012842450.html"
                              target="_blank"
                              itemcode={1012842450}
                              spm-index={9}
                              scm=""
                            >
                              <div className="newBuyer_productImg__d_nT8">
                                <img
                                  alt=""
                                  loading="lazy"
                                  width={141}
                                  height={141}
                                  decoding="async"
                                  data-nimg={1}
                                  style={{ color: "transparent" }}
                                  src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/j/18/1f2cb0bf-8872-413a-8cf1-42cb2428f1bf.jpg"
                                />
                              </div>
                              <div className="newBuyer_productPrice__zlshX">
                                $9.90{/* */}
                                <span>$14.25</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  data-role="none"
                  className="slick-arrow slick-next"
                  style={{ display: "block" }}
                >
                  {" "}
                  {/* */}Next
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*/$*/}
        {/*$*/}
        <div className="banner_banner__OCzBK" spm-c="banner">
          <div
            className="slick-slider bannerSlider slick-initialized"
            dir="ltr"
          >
            <button
              type="button"
              data-role="none"
              className="slick-arrow slick-prev"
              style={{ display: "block" }}
            >
              {/* */}Previous
            </button>
            <div className="slick-list">
              <div
                className="slick-track"
                style={{ width: "900%", left: "-100%" }}
              >
                <div
                  data-index={-1}
                  tabIndex={-1}
                  className="slick-slide slick-cloned"
                  aria-hidden="true"
                  style={{ width: "11.11111111111111%" }}
                >
                  <div>
                    <a
                      href="https://www.dhgate.com/sales/market/2023m12lunbo.html"
                      resource={40992}
                      spm-index={4}
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        alt=""
                        loading="lazy"
                        width={308}
                        height={400}
                        decoding="async"
                        data-nimg={1}
                        className="banner-image"
                        style={{ color: "transparent" }}
                        src="https://www.dhresource.com/webp/m/f3/decorate/ys/l/25/5d7658e9-0083-4939-9644-57ca08241541.jpg"
                      />
                    </a>
                  </div>
                </div>
                <div
                  data-index={0}
                  className="slick-slide slick-active slick-current"
                  tabIndex={-1}
                  aria-hidden="false"
                  style={{ outline: "none", width: "11.11111111111111%" }}
                >
                  <div>
                    <a
                      href="https://www.dhgate.com/sales/market/stocksavesale.html"
                      resource={41366}
                      spm-index={1}
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        alt=""
                        loading="lazy"
                        width={308}
                        height={400}
                        decoding="async"
                        data-nimg={1}
                        className="banner-image"
                        style={{ color: "transparent" }}
                        src="https://www.dhresource.com/webp/m/f3/decorate/ys/m/19/5d0e33c2-6858-4b9d-b219-76900dc7dce5.jpg"
                      />
                    </a>
                  </div>
                </div>
                <div
                  data-index={1}
                  className="slick-slide"
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ outline: "none", width: "11.11111111111111%" }}
                >
                  <div>
                    <a
                      href="https://www.dhgate.com/sales/market/beachstyle.html"
                      resource={41373}
                      spm-index={2}
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        alt=""
                        loading="lazy"
                        width={308}
                        height={400}
                        decoding="async"
                        data-nimg={1}
                        className="banner-image"
                        style={{ color: "transparent" }}
                        src="https://www.dhresource.com/webp/m/f3/decorate/ys/m/21/92fcdd49-21c7-4099-804b-9353969f58ba.jpg"
                      />
                    </a>
                  </div>
                </div>
                <div
                  data-index={2}
                  className="slick-slide"
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ outline: "none", width: "11.11111111111111%" }}
                >
                  <div>
                    <a
                      href="https://www.dhgate.com/sales/market/industrial.html"
                      resource={41200}
                      spm-index={3}
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        alt=""
                        loading="lazy"
                        width={308}
                        height={400}
                        decoding="async"
                        data-nimg={1}
                        className="banner-image"
                        style={{ color: "transparent" }}
                        src="https://www.dhresource.com/webp/m/f3/decorate/ys/s/21/7cd554ff-3a74-424c-b259-ae5c93322325.jpg"
                      />
                    </a>
                  </div>
                </div>
                <div
                  data-index={3}
                  className="slick-slide"
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ outline: "none", width: "11.11111111111111%" }}
                >
                  <div>
                    <a
                      href="https://www.dhgate.com/sales/market/2023m12lunbo.html"
                      resource={40992}
                      spm-index={4}
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        alt=""
                        loading="lazy"
                        width={308}
                        height={400}
                        decoding="async"
                        data-nimg={1}
                        className="banner-image"
                        style={{ color: "transparent" }}
                        src="https://www.dhresource.com/webp/m/f3/decorate/ys/l/25/5d7658e9-0083-4939-9644-57ca08241541.jpg"
                      />
                    </a>
                  </div>
                </div>
                <div
                  data-index={4}
                  tabIndex={-1}
                  className="slick-slide slick-cloned"
                  aria-hidden="true"
                  style={{ width: "11.11111111111111%" }}
                >
                  <div>
                    <a
                      href="https://www.dhgate.com/sales/market/stocksavesale.html"
                      resource={41366}
                      spm-index={1}
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        alt=""
                        loading="lazy"
                        width={308}
                        height={400}
                        decoding="async"
                        data-nimg={1}
                        className="banner-image"
                        style={{ color: "transparent" }}
                        src="https://www.dhresource.com/webp/m/f3/decorate/ys/m/19/5d0e33c2-6858-4b9d-b219-76900dc7dce5.jpg"
                      />
                    </a>
                  </div>
                </div>
                <div
                  data-index={5}
                  tabIndex={-1}
                  className="slick-slide slick-cloned"
                  aria-hidden="true"
                  style={{ width: "11.11111111111111%" }}
                >
                  <div>
                    <a
                      href="https://www.dhgate.com/sales/market/beachstyle.html"
                      resource={41373}
                      spm-index={2}
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        alt=""
                        loading="lazy"
                        width={308}
                        height={400}
                        decoding="async"
                        data-nimg={1}
                        className="banner-image"
                        style={{ color: "transparent" }}
                        src="https://www.dhresource.com/webp/m/f3/decorate/ys/m/21/92fcdd49-21c7-4099-804b-9353969f58ba.jpg"
                      />
                    </a>
                  </div>
                </div>
                <div
                  data-index={6}
                  tabIndex={-1}
                  className="slick-slide slick-cloned"
                  aria-hidden="true"
                  style={{ width: "11.11111111111111%" }}
                >
                  <div>
                    <a
                      href="https://www.dhgate.com/sales/market/industrial.html"
                      resource={41200}
                      spm-index={3}
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        alt=""
                        loading="lazy"
                        width={308}
                        height={400}
                        decoding="async"
                        data-nimg={1}
                        className="banner-image"
                        style={{ color: "transparent" }}
                        src="https://www.dhresource.com/webp/m/f3/decorate/ys/s/21/7cd554ff-3a74-424c-b259-ae5c93322325.jpg"
                      />
                    </a>
                  </div>
                </div>
                <div
                  data-index={7}
                  tabIndex={-1}
                  className="slick-slide slick-cloned"
                  aria-hidden="true"
                  style={{ width: "11.11111111111111%" }}
                >
                  <div>
                    <a
                      href="https://www.dhgate.com/sales/market/2023m12lunbo.html"
                      resource={40992}
                      spm-index={4}
                      tabIndex={-1}
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <img
                        alt=""
                        loading="lazy"
                        width={308}
                        height={400}
                        decoding="async"
                        data-nimg={1}
                        className="banner-image"
                        style={{ color: "transparent" }}
                        src="https://www.dhresource.com/webp/m/f3/decorate/ys/l/25/5d7658e9-0083-4939-9644-57ca08241541.jpg"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              data-role="none"
              className="slick-arrow slick-next"
              style={{ display: "block" }}
            >
              {" "}
              {/* */}Next
            </button>
            <ul style={{ display: "block" }} className="slick-dots">
              <li className="slick-active">
                <button>1</button>
              </li>
              <li className="">
                <button>2</button>
              </li>
              <li className="">
                <button>3</button>
              </li>
              <li className="">
                <button>4</button>
              </li>
            </ul>
          </div>
        </div>
        {/*/$*/}
        <div className="userInfo_userInfo__Eb_fF userInfo_notLogin__cJ8n3">
          <a
            href="https://dg.dhgate.com/mydhgate/index.html"
            className="userInfo_userAccount__AGQ1x"
            spm-c="mydhtype_new"
            event-type="mouseenter"
          >
            <div
              className="userInfo_userPicture__OrYw_"
              spm-c="user_new"
              spm-index={1}
              event-code="i7OUPxepgna3"
            />
            <div className="userInfo_userName__SucmU">
              <span
                className="userInfo_welcome__FDeIZ"
                title="Welcome to DHgate"
              >
                Welcome to DHgate
              </span>
            </div>
          </a>
          <a
            event-type="expose"
            spm-c="user_new"
            spm-index={1}
            event-code="i7OUPxepgna3"
          />
          <div className="userInfo_newBuyerCouponWrapNo__wjDl3" />
          <a
            spm-index="coupon-1"
            event-type="expose"
            link-type="coupon"
            href="https://www.dhgate.com/newBuyerZone/newBuyerZone.html"
            className="userInfo_newBuyerCouponWrap__gfnU0"
            spm-c="newzone"
          >
            <div className="userInfo_newBuyerCouponSum__w090r">
              <span className="userInfo_sum__66o8_">$9</span>
              <span className="userInfo_pack__uFt7_">Coupon Pack</span>
            </div>
            <div className="userInfo_newBuyerCouponPack__yBtCB">
              <div className="userInfo_getNow__ll5RS">Get Now</div>
            </div>
          </a>
          <div
            className="userInfo_joinFree__xuRrC"
            spm-c="sjright"
            spm-index="joinfree"
            event-type="click"
          >
            Join free
          </div>
          <div
            className="userInfo_signIn__Oc_un"
            spm-c="sjright"
            spm-index="signin"
            event-type="click"
          >
            Sign in
          </div>
        </div>
      </div>
      {/*$!*/}
      <template data-dgst="NEXT_DYNAMIC_NO_SSR_CODE" />
      {/*/$*/}
      {/*$*/}
      <div className="rights_newBuyerRights__dmqwc">
        <a href="https://www.dhgate.com/buyer/buyerProtection" target="_blank">
          <ul>
            <li
              className="rights_firstRights__53vob"
              title="Worry-Free Shopping"
            >
              <div>
                <i className="rights_shopping__sGBlu" />
              </div>
              <div className="rights_newbuyer_tips__Xyzzr">
                <p
                  className="rights_newbuyer_title__hp8CB"
                  title="Worry-Free Shopping"
                >
                  Worry-Free Shopping
                </p>
                <p
                  className="rights_newbuyer_desc__leBRH"
                  title="Easy Refund & Return And Buyer Protection"
                >
                  Easy Refund &amp; Return And Buyer Protection
                </p>
              </div>
            </li>
            <li title="Worldwide Delivery">
              <div>
                <i className="rights_delivery__btaBg" />
              </div>
              <div className="rights_newbuyer_tips__Xyzzr">
                <p
                  className="rights_newbuyer_title__hp8CB"
                  title="Worldwide Delivery"
                >
                  Worldwide Delivery
                </p>
                <p
                  className="rights_newbuyer_desc__leBRH"
                  title="Partner With Leading Global Logistics Companies To 200+ Countries."
                >
                  Partner With Leading Global Logistics Companies To 200+
                  Countries.
                </p>
              </div>
            </li>
            <li title="24/7 Customer Service">
              <div>
                <i className="rights_service__Pc7wX" />
              </div>
              <div className="rights_newbuyer_tips__Xyzzr">
                <p
                  className="rights_newbuyer_title__hp8CB"
                  title="24/7 Customer Service"
                >
                  24/7 Customer Service
                </p>
                <p
                  className="rights_newbuyer_desc__leBRH"
                  title="24/7 online customer service and multiple consultation approach"
                >
                  24/7 online customer service and multiple consultation
                  approach
                </p>
              </div>
            </li>
            <li title="Secure Payment">
              <div>
                <i className="rights_payment__Yj_M8" />
              </div>
              <div className="rights_newbuyer_tips__Xyzzr">
                <p
                  className="rights_newbuyer_title__hp8CB"
                  title="Secure Payment"
                >
                  Secure Payment
                </p>
                <p
                  className="rights_newbuyer_desc__leBRH"
                  title="Pay with top payment methods trusted by 100 million shoppers"
                >
                  Pay with top payment methods trusted by 100 million shoppers
                </p>
              </div>
            </li>
          </ul>
        </a>
      </div>
      {/*/$*/}
      <div
        className="promotion_promoRecom__yQliY"
        spm-c="promotion"
        async-exposure="true"
      >
        {/*$*/}
        <div
          id="bannerRem121"
          className="banner121_banner121__axD3m"
          spm-c="promobanner_personal1"
          event-code="KrByTN7YaV4F"
          style={{
            borderColor: "transparent",
            backgroundImage:
              "url(https://www.dhresource.com/webp/m/f3/decorate/ys/m/19/86066df8-44a1-437c-ba15-2bb64d8d6f24.png)"
          }}
        >
          <div className="banner121_content__3gpyg">
            <p className="banner121_titleImg__T9hxl" />
          </div>
        </div>
        {/*/$*/}
      </div>
      {/*$*/}
      <div
        spm-c="floormodule"
        className="cricle-floor-module"
        async-exposure="true"
      >
        <div
          className="fullColumn_salesBox__QqVQu"
          style={{
            background:
              "url(https://www.dhresource.com/webp/m/f3/decorate/jc/n/20/f8a6103a-c09a-48d3-8536-cc43c2626b3b.png) top left no-repeat,linear-gradient(135deg, #fff8e5, #ffe2cc)"
          }}
          spm-c="floormodule_1"
          async-exposure="true"
        >
          <div className="fullColumn_salesTitleBox__fyehj">
            <div className="fullColumn_salesTitle__ZTUwB">
              <h2>China Sourcing#fyp</h2>
              <span>Competitive Price,Better Quality</span>
            </div>
            <a
              className="fullColumn_viewMore__5F_su"
              href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199"
              spm-c="floormodule_1more"
              spm-index={1}
              d1-apl='{"pgp_id":"","bgp_id":""}'
            >
              <span>View All</span>
              <i />
            </a>
          </div>
          <div className="fullColumn_salesListBox___yHzT">
            <div className="fullColumn_salesList__D_2GK">
              <div className="swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=965924375"
                          spm-index={0}
                          itemcode={965924375}
                          resource="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/s/16/c4ce8021-b1cc-4939-9eb5-aac5f99c4d2a.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_lanhai"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_lanhai_greenScreenFlag_0.2072649787337069_965924375__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="2024 Aso Ebi Gold Florals Mermaid Prom Dress Sequined Evening Formal Party Second Reception 50th Birthday Engagement Gowns Dresses Robe De Soiree ZJ330"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/s/16/c4ce8021-b1cc-4939-9eb5-aac5f99c4d2a.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $304.34
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy">
                          $338.15
                        </span>
                      </div>
                      <div className="fullColumn_prod-save__VdZfR">
                        <span>
                          Save
                          {/* */}$33.81
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=1036435547"
                          spm-index={1}
                          itemcode={1036435547}
                          resource="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/j/22/f6d44fd5-8fdd-4fab-b105-4141f532fb4d.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_lanhai"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_lanhai_greenScreenFlag_0.17758154670304405_1036435547__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="V-Neck Celebrity Fashion Evening Dresses Elegant Sleeveless Crystal Lady 2024 Prom Pageant Gowns Robe De Soiree Customed"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/j/22/f6d44fd5-8fdd-4fab-b105-4141f532fb4d.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $137.75
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy">
                          $275.50
                        </span>
                      </div>
                      <div className="fullColumn_prod-save__VdZfR">
                        <span>
                          Save
                          {/* */}$137.75
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=1032439102"
                          spm-index={2}
                          itemcode={1032439102}
                          resource="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/s/13/4967394d-00fc-4db0-aed2-433e8e623982.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_lanhai"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_lanhai_greenScreenFlag_0.1764297440718104_1032439102__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="Casual Dresses Summer Elegant Temperament Women Prom Gown Fashion Solid Tassels Suspender Sexy Hollow Out Sleeveless Party Mini"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/s/13/4967394d-00fc-4db0-aed2-433e8e623982.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $26.81
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy">
                          $53.62
                        </span>
                      </div>
                      <div className="fullColumn_prod-save__VdZfR">
                        <span>
                          Save
                          {/* */}$26.81
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=992980466"
                          spm-index={3}
                          itemcode={992980466}
                          resource="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/y/19/9c0974be-eadb-4617-9ae4-0fcc972649fe.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_lanhai"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_lanhai_greenScreenFlag_0.17278507008997285_992980466__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="2024 Gold Homecoming Dresses Prom Evening Sheath Lace Crystals Mini Short Party Graduation Homecoming Birthday Holiday Club Gowns Dress ZJ101"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/y/19/9c0974be-eadb-4617-9ae4-0fcc972649fe.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $141.04
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy">
                          $156.71
                        </span>
                      </div>
                      <div className="fullColumn_prod-save__VdZfR">
                        <span>
                          Save
                          {/* */}$15.67
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=864196488"
                          spm-index={4}
                          itemcode={864196488}
                          resource="https://img4.dhresource.com/webp/m/260x260/f3/albu/km/m/09/a5e9651a-7711-49ce-91c1-08ff75f50d4b.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_lanhai"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_lanhai_greenScreenFlag_0.17210586319615087_864196488__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="Casual Dresses Solid High Waist Hollow Out For Women Summer Sleeveless Cut Dress Fashion Elegant Clothes Vacation"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://img4.dhresource.com/webp/m/260x260/f3/albu/km/m/09/a5e9651a-7711-49ce-91c1-08ff75f50d4b.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $21.06
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy">
                          $42.11
                        </span>
                      </div>
                      <div className="fullColumn_prod-save__VdZfR">
                        <span>
                          Save
                          {/* */}$21.05
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=1002893182"
                          spm-index={5}
                          itemcode={1002893182}
                          resource="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/o/16/a1e701fc-2fa8-470a-a328-36fe3518cf56.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_lanhai"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_lanhai_greenScreenFlag_0.16325659577596463_1002893182__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="Ivory Wedding Dresses White Bridal Gowns Formal O-Neck Beaded Satin Custom Zipper Lace Up Plus Size New Pearls Crystal Detachable Train"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/o/16/a1e701fc-2fa8-470a-a328-36fe3518cf56.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $149.49
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy" />
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=1041502830"
                          spm-index={6}
                          itemcode={1041502830}
                          resource="https://img4.dhresource.com/webp/m/260x260/f3/albu/ys/h/12/a1ffd270-4a9f-4030-93d0-ac0325ce5bc0.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_lanhai"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_lanhai_greenScreenFlag_0.16202125622219987_1041502830__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="Fashion Design Solid Silver Gra Moissanite 18mm 20mm Wide Diamond Iced Out Pendant Necklace Cuban Link Chain for Rapper"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://img4.dhresource.com/webp/m/260x260/f3/albu/ys/h/12/a1ffd270-4a9f-4030-93d0-ac0325ce5bc0.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $31.58
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy" />
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=1042174433"
                          spm-index={7}
                          itemcode={1042174433}
                          resource="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/z/20/f9bdc77c-761b-49c2-9c3a-086cfe7d34e7.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_youshi"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_youshi_greenScreenFlag_0.16200072897502685_1042174433__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="Urious Gold Crystals Beaded Mermaid Prom Dresses Jewel Neck Sleeveless Long Celebrity Party Gown African Evening Formal Dress 2025"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/z/20/f9bdc77c-761b-49c2-9c3a-086cfe7d34e7.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $172.53
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy">
                          $345.05
                        </span>
                      </div>
                      <div className="fullColumn_prod-save__VdZfR">
                        <span>
                          Save
                          {/* */}$172.52
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=541202451"
                          spm-index={8}
                          itemcode={541202451}
                          resource="https://www.dhresource.com/webp/m/260x260/f2/albu/g8/M01/5A/41/rBVaVF6-qV2AP98mAASUchrA17s012.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_lanhai"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_lanhai_greenScreenFlag_0.15760502448407437_541202451__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="New High Quality Real Photo Bling Bling Crystal Wedding Dresses Back Bandage Tulle Appliques Floor-Length Ball Gown Wedding Gowns"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://www.dhresource.com/webp/m/260x260/f2/albu/g8/M01/5A/41/rBVaVF6-qV2AP98mAASUchrA17s012.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $154.64
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy" />
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=988866851"
                          spm-index={9}
                          itemcode={988866851}
                          resource="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/y/12/ec0ec4a9-990c-42fa-acdd-39f5a093e7d3.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_lanhai"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_lanhai_greenScreenFlag_0.15535822182975598_988866851__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="High quality niche design Korean version large capacity pillow bag for women's new high-end and versatile commuting carrying crossbody bag"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/y/12/ec0ec4a9-990c-42fa-acdd-39f5a093e7d3.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $14.75
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy">
                          $22.35
                        </span>
                      </div>
                      <div className="fullColumn_prod-save__VdZfR">
                        <span>Save {/* */}$7.60</span>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=998973086"
                          spm-index={10}
                          itemcode={998973086}
                          resource="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/y/23/e089880a-f48a-4bf9-bc49-4c1d99c77a6f.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_lanhai"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_lanhai_greenScreenFlag_0.15189269922038456_998973086__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="2024 Plus Size Yellow Mermaid Prom Dresses For Special Occasion Crystals Sequined Evening Formal Party Second Reception Birthday Engagement Gowns Dress ZJ76"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/y/23/e089880a-f48a-4bf9-bc49-4c1d99c77a6f.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $304.34
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy">
                          $338.15
                        </span>
                      </div>
                      <div className="fullColumn_prod-save__VdZfR">
                        <span>
                          Save
                          {/* */}$33.81
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=987607198"
                          spm-index={11}
                          itemcode={987607198}
                          resource="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/y/08/f7013df3-8c45-48da-846f-f2dd44a79612.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_lanhai"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_lanhai_greenScreenFlag_0.14985826611712663_987607198__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="2024 Mermaid Wedding Dress for Bride Illusion Bridal Gowns Sheer Neck Long Sleeves Side Split Crystals Decorated Wedding Gowns for African Nigeria Black Women D208"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/y/08/f7013df3-8c45-48da-846f-f2dd44a79612.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $149.84
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy">
                          $166.49
                        </span>
                      </div>
                      <div className="fullColumn_prod-save__VdZfR">
                        <span>
                          Save
                          {/* */}$16.65
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=1045203494"
                          spm-index={12}
                          itemcode={1045203494}
                          resource="https://img4.dhresource.com/webp/m/260x260/f3/albu/ys/t/19/bd162fc7-9b13-4692-b8ec-e55f14021887.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_lanhai"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_lanhai_greenScreenFlag_0.14551643571692496_1045203494__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="Women's Two Piece Pants Weird Puss Summer Sexy 2 Set Women Tracksuit Sporty Camisole Vest Leggings Skinny Activity Fit Stretch Streetwear"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://img4.dhresource.com/webp/m/260x260/f3/albu/ys/t/19/bd162fc7-9b13-4692-b8ec-e55f14021887.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $14.90
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy">
                          $34.31
                        </span>
                      </div>
                      <div className="fullColumn_prod-save__VdZfR">
                        <span>
                          Save
                          {/* */}$19.41
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=1019864742"
                          spm-index={13}
                          itemcode={1019864742}
                          resource="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/g/16/55f51e72-ee3f-4eb4-9b0f-98ec655158f3.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_lanhai"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_lanhai_greenScreenFlag_0.14386405769700372_1019864742__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="Best Selling 8mm Two Rows Iced Out Man Hip Hop Jewelry GRA Certificates Pass Diamond Tester VVS1 Moissanite Cuban Link Chain Men"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/g/16/55f51e72-ee3f-4eb4-9b0f-98ec655158f3.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $31.58
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy" />
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=1040284759"
                          spm-index={14}
                          itemcode={1040284759}
                          resource="https://img4.dhresource.com/webp/m/260x260/f3/albu/ys/h/03/e11997cd-8a40-4edc-a4bc-298d2858154c.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_lanhai"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_lanhai_greenScreenFlag_0.1433826397026951_1040284759__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="Yu Ying 925 Solid Silver 4mm 8mm 10mm Wide Chain VVS Round Moissanite Ball Shape Cuban Link Chain For Hip Hop Jewelry"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://img4.dhresource.com/webp/m/260x260/f3/albu/ys/h/03/e11997cd-8a40-4edc-a4bc-298d2858154c.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $34.74
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy" />
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="fullColumn_salesItem__h9VOp">
                      <div className="fullColumn_salesItemImg__pLoOC">
                        <a
                          href="https://www.dhgate.com/sales/market/ifashion.html?topFloorId=floor_1743142435199&topItemcode=1038399516"
                          spm-index={15}
                          itemcode={1038399516}
                          resource="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/n/18/583d9c01-751a-4d94-8e53-f9059773c817.jpg"
                          event-type="click"
                          event-code="3ZLGCc6hF3Ic"
                          scm='{"algo":{"vid":"300A12ACF1E72D680458200602124508","bussiness_id":"GuoYuHang_pick","requestKey":"04132ef86c5fad92c26785bf956bec03","group_id":"[\"8652\"]","uuid":"z5aDyvlfF3yVs3rOFd-OC0","recId":"promo_cs_shuffler_lanhai"},"scm_id":"rec.yml...null_default_marketp13n_fm-jfy-filter_promo_cs_shuffler_lanhai_greenScreenFlag_0.14322250837708778_1038399516__."}'
                          d1-apl='{"pgp_id":"8652","bgp_id":""}'
                        >
                          <img
                            alt="Casual Dresses Elegant White Satin Backless Maxi Dress For Women Sexy Bodycon Sleeveless Tassels Pleated Long Vocation Beach Party Robe"
                            loading="lazy"
                            width={194}
                            height={194}
                            decoding="async"
                            data-nimg={1}
                            style={{ color: "transparent" }}
                            src="https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/n/18/583d9c01-751a-4d94-8e53-f9059773c817.jpg"
                          />
                        </a>
                      </div>
                      <div className="fullColumn_prod-price-box__UtMiq">
                        <span className="fullColumn_prod-price__CMXSl">
                          $22.00
                        </span>
                        <span className="fullColumn_prod-originalPrice__9u9oy">
                          $38.59
                        </span>
                      </div>
                      <div className="fullColumn_prod-save__VdZfR">
                        <span>
                          Save
                          {/* */}$16.59
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-button-prev clo-ranking-prev-floorModule_1" />
              <div className="swiper-button-next clo-ranking-next-floorModule_1" />
            </div>
          </div>
        </div>
      </div>
      <div
        className="newBuyerFlashDeals_newBuyerFlashDeals__1d2St"
        spm-c="flashdeal"
        async-exposure="true"
      >
        {/*$*/}
        <a
          spm-c="flashdealmore"
          className="newBuyerFlashDeals_newBuyerFlashDealsLeft__x9qP_"
          href=""
        >
          <h2 className="newBuyerFlashDeals_newBuyerFlashDealsTitle__4sZKd">
            Flash Deals
          </h2>
          <div className="countDown_countDown__jnEA5">
            <div className="countDown_text__eVpPD">Ends In</div>
            <div className="countDown_timeWrap__CKome">
              <span className="mr-[5px]" data-content-after={0} />:
              <span className="mx-[5px]" data-content-after={0} />:
              <span className="ml-[5px]" data-content-after={0} />
            </div>
          </div>
          <div
            className="newBuyerFlashDeals_viewAllLink__P_hHY"
            spm-c="flashdealmore"
          >
            <span title="View All">View All</span>
            <i className="newBuyerFlashDeals_iconArrow__m3rhM" />
          </div>
        </a>
        <div className="newBuyerFlashDeals_newBuyerFlashDealsRight__wwbJ0">
          <span aria-live="polite" aria-busy="true">
            <span className="react-loading-skeleton newBuyerFlashDeals_flashDealsSkeleton__pMKLy">
              ‌
            </span>
            <span className="react-loading-skeleton newBuyerFlashDeals_flashDealsSkeleton__pMKLy">
              ‌
            </span>
            <span className="react-loading-skeleton newBuyerFlashDeals_flashDealsSkeleton__pMKLy">
              ‌
            </span>
            <span className="react-loading-skeleton newBuyerFlashDeals_flashDealsSkeleton__pMKLy">
              ‌
            </span>
            <span className="react-loading-skeleton newBuyerFlashDeals_flashDealsSkeleton__pMKLy">
              ‌
            </span>
            <span className="react-loading-skeleton newBuyerFlashDeals_flashDealsSkeleton__pMKLy">
              ‌
            </span>
            <span className="react-loading-skeleton newBuyerFlashDeals_flashDealsSkeleton__pMKLy">
              ‌
            </span>
          </span>
        </div>
        {/*/$*/}
      </div>
      <div
        className="relatedToItems_relatedToItems__h9l2c"
        spm-c="relatedviewed"
        async-exposure="true"
      >
        {/*$*/}
        {/*/$*/}
      </div>
      <div className="mt-4 flex">
        <div
          className="topRanking_topRanking__H2V_w"
          spm-c="topranking"
          async-exposure="true"
        >
          {/*$*/}
          <div className="topRanking_topTitle__3Mz1P">
            <h2>Top Ranking</h2>
            <a
              className="topRanking_topViewAll__5lAdy"
              href="https://www.dhgate.com/activities/promotion/ranking.html?cateId="
              target="_blank"
            >
              <span>View All</span>
              <i />
            </a>
          </div>
          <div className="topRanking_productList__d56Mi">
            <span aria-live="polite" aria-busy="true">
              <span className="react-loading-skeleton topRanking_topRankingSkeleton__1M_Ok">
                ‌
              </span>
              <span className="react-loading-skeleton topRanking_topRankingSkeleton__1M_Ok">
                ‌
              </span>
              <span className="react-loading-skeleton topRanking_topRankingSkeleton__1M_Ok">
                ‌
              </span>
              <span className="react-loading-skeleton topRanking_topRankingSkeleton__1M_Ok">
                ‌
              </span>
            </span>
          </div>
          {/*/$*/}
        </div>
        <div
          className="featuredSeller_featuredSeller__j1iGM"
          spm-c="featureds"
          async-exposure="true"
        >
          {/*$*/}
          <div className="featuredSeller_featuredSellerTop__z1CkE">
            <h2 className="featuredSeller_featuredSellerTitle__AeH1B">
              Featured Seller
            </h2>
          </div>
          <div className="featuredSeller_featuredSellerContent__R1re1">
            <span aria-live="polite" aria-busy="true">
              <span className="react-loading-skeleton featuredSeller_featuredSellerSkeleton__PaBEp">
                ‌
              </span>
              <span className="react-loading-skeleton featuredSeller_featuredSellerSkeleton__PaBEp">
                ‌
              </span>
              <span className="react-loading-skeleton featuredSeller_featuredSellerSkeleton__PaBEp">
                ‌
              </span>
              <span className="react-loading-skeleton featuredSeller_featuredSellerSkeleton__PaBEp">
                ‌
              </span>
            </span>
          </div>
          {/*/$*/}
        </div>
      </div>
      {/*$*/}
      <div id="yml-wrap" className="youMayLike_youMayLike__IejKk">
        <h2 className="youMayLike_youMayLikeTitle__wGLjv">You May Like</h2>
        <div id="yml-tab">
          <div className="ant-spin-nested-loading css-19lec04">
            <div className="ant-spin-container">
              <div
                id="downfixedymlTab"
                className="youMayLike_youMayLikeCategoriesList__N0BDV"
                spm-c="ymltab"
              >
                <div className="swiper">
                  <div className="swiper-wrapper" />
                </div>
                <div className="youMayLike_swiper-button-prev__noJLY" />
                <div className="youMayLike_swiper-button-next__9fXd_" />
                <div className="youMayLike_fixedNextMask__V7Y9Q" />
              </div>
            </div>
          </div>
        </div>
        <div
          className="youMayLike_youMayLikeProductsList__5TIHK"
          spm-c="ymljfy"
          async-exposure="true"
        />
      </div>
      {/*/$*/}
      {/*/$*/}
      {/*$*/}
      {/*$*/}
      <div className="popularProducts_popularProducts__dsAZF" spm-c="popprod">
        <h2 className="popularProducts_popularProductsTitle__Rqz6p">
          Popular China Wholesale Products
        </h2>
        <div className="popularProducts_popularProductsList__RvDy8">
          <div className="swiper">
            <div className="swiper-wrapper">
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="yorkie clothes"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/t/05/9a037d47-950d-493b-af05-e6627b5eb94c.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={0}
                    href="https://www.dhgate.com/wholesale/yorkie+clothes.html"
                  >
                    yorkie clothes
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="big dog clothes"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/h/12/548d77b1-41d8-4601-90e6-b7366cab6942.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={1}
                    href="https://www.dhgate.com/wholesale/big+dog+clothes.html"
                  >
                    big dog clothes
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="dog swimming clothes"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/o/03/b0250917-ee6b-4166-9e77-f664eaacbd26.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={2}
                    href="https://www.dhgate.com/wholesale/dog+swimming+clothes.html"
                  >
                    dog swimming clothes
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="portable dog drinking bottle"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://www.dhresource.com/webp/m/300x300/f2/albu/g7/M00/82/57/rBVaSVtpXEeAAATHAABeqrWzCnk360.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={3}
                    href="https://www.dhgate.com/wholesale/portable+dog+drinking+bottle.html"
                  >
                    portable dog drinking bottle
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="automatic fish food feeder"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/y/30/9a9de727-46e0-4378-b730-0ec45b80225d.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={4}
                    href="https://www.dhgate.com/wholesale/automatic+fish+food+feeder.html"
                  >
                    automatic fish food feeder
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="teacup chihuahua clothes"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/km/l/29/7cba51fb-ff4c-41bb-bd60-3dfe34ee70d7.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={5}
                    href="https://www.dhgate.com/wholesale/teacup+chihuahua+clothes.html"
                  >
                    teacup chihuahua clothes
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="hamster supplies"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/km/s/21/c1063252-a50c-4cb3-82d2-319d3d04c648.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={6}
                    href="https://www.dhgate.com/wholesale/hamster+supplies.html"
                  >
                    hamster supplies
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="cute puppy clothing"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/s/02/20fd9f42-efdf-4414-9b88-b1814d77b4c9.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={7}
                    href="https://www.dhgate.com/wholesale/cute+puppy+clothing.html"
                  >
                    cute puppy clothing
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="cats laser pointer"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/h/02/9e9d9ab6-ef83-41fe-ba41-9fcc7060c1b0.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={8}
                    href="https://www.dhgate.com/wholesale/cats+laser+pointer.html"
                  >
                    cats laser pointer
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="chihuahua clothes"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/g/19/7205bd16-fafa-4e33-aebd-6ef66d3edd8b.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={9}
                    href="https://www.dhgate.com/wholesale/chihuahua+clothes.html"
                  >
                    chihuahua clothes
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="self cleaning fish tank"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/g/14/1f53544d-9186-4000-ac6f-ac3e58449a28.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={10}
                    href="https://www.dhgate.com/wholesale/self+cleaning+fish+tank.html"
                  >
                    self cleaning fish tank
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="gerbil toys"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/j/30/ad9e8f78-b8d3-470a-ae1e-7431a1a307ac.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={11}
                    href="https://www.dhgate.com/wholesale/gerbil+toys.html"
                  >
                    gerbil toys
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="dog hair bows"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/j/09/36118063-a1f3-428d-bdd0-0d28b62049bc.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={12}
                    href="https://www.dhgate.com/wholesale/dog+hair+bows.html"
                  >
                    dog hair bows
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="mini fish tank"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/km/s/14/9e7d571d-ff75-405f-9694-12881b98788f.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={13}
                    href="https://www.dhgate.com/wholesale/mini+fish+tank.html"
                  >
                    mini fish tank
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="chihuahua clothing"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://www.dhresource.com/webp/m/300x300/f2/albu/g22/M01/F5/0B/rBVaEmJeIFyAPm-JABD8Y7s3rkk742.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={14}
                    href="https://www.dhgate.com/wholesale/chihuahua+clothing.html"
                  >
                    chihuahua clothing
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="xxs dog clothes"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/km/s/21/b4845333-5932-429b-9d18-160567db80ee.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={15}
                    href="https://www.dhgate.com/wholesale/xxs+dog+clothes.html"
                  >
                    xxs dog clothes
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="dog clothes raincoat"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/j/22/05f718b7-1e3f-40ed-84fb-46b5604e15ae.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={16}
                    href="https://www.dhgate.com/wholesale/dog+clothes+raincoat.html"
                  >
                    dog clothes raincoat
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="dog vest harnesses"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/g/05/a1a6dbef-231e-483a-bdcb-9e2747671bb7.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={17}
                    href="https://www.dhgate.com/wholesale/dog+vest+harnesses.html"
                  >
                    dog vest harnesses
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="childrens cat toys"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/z/18/bfda8d79-65fc-48b7-a997-bbdb1d74fe3c.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={18}
                    href="https://www.dhgate.com/wholesale/childrens+cat+toys.html"
                  >
                    childrens cat toys
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="gold dog chains"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://www.dhresource.com/webp/m/300x300/f2/albu/g21/M00/9C/84/rBNaOWDj3gaAayR_AAHFBt9ymYM034.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={19}
                    href="https://www.dhgate.com/wholesale/gold+dog+chains.html"
                  >
                    gold dog chains
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="big dogs t shirts"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/km/g/20/a696f94d-6cb4-4605-810a-0ad34f597f23.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={20}
                    href="https://www.dhgate.com/wholesale/big+dogs+t+shirts.html"
                  >
                    big dogs t shirts
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="princess dog beds"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/j/13/7681d644-cd8b-4349-9480-bc6674712ab3.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={21}
                    href="https://www.dhgate.com/wholesale/princess+dog+beds.html"
                  >
                    princess dog beds
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="cat clothes"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/o/15/6805ac63-0b62-4f5d-8a71-fe93f22034d5.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={22}
                    href="https://www.dhgate.com/wholesale/cat+clothes.html"
                  >
                    cat clothes
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="rubber balls for dogs"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://www.dhresource.com/webp/m/300x300/f2/albu/g10/M01/46/C5/rBVaVl7Z0FOAP7YLAADbEN8tGKY058.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={23}
                    href="https://www.dhgate.com/wholesale/rubber+balls+for+dogs.html"
                  >
                    rubber balls for dogs
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="funny dog suits"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://www.dhresource.com/webp/m/300x300/f2/albu/g19/M01/7D/75/rBVap2BawKKAKPhEAABvZtmx7KE946.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={24}
                    href="https://www.dhgate.com/wholesale/funny+dog+suits.html"
                  >
                    funny dog suits
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="large dog clothes"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/g/23/cfd8bc57-880d-4ce7-97c3-c19edc1392c7.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={25}
                    href="https://www.dhgate.com/wholesale/large+dog+clothes.html"
                  >
                    large dog clothes
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="dog bowtie"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/t/21/6b573f97-5ee2-41a3-9fd2-50c84e61e993.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={26}
                    href="https://www.dhgate.com/wholesale/dog+bowtie.html"
                  >
                    dog bowtie
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="dog collar charms"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://www.dhresource.com/webp/m/300x300/f2/albu/g17/M01/82/09/rBVa4WIjavCAP2zjAAhT3NLaBrE607.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={27}
                    href="https://www.dhgate.com/wholesale/dog+collar+charms.html"
                  >
                    dog collar charms
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="dog costume"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/km/j/16/8fae8a19-2d3d-4ffe-a53d-1c49b138ada3.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={28}
                    href="https://www.dhgate.com/wholesale/dog+costume.html"
                  >
                    dog costume
                  </a>
                </div>
              </div>
              <div
                className="swiper-slide"
                style={{ width: "fit-content", padding: "16px 0" }}
              >
                <div className="popularProducts_listItem__7s4Bw">
                  <img
                    alt="dog pajamas"
                    loading="lazy"
                    width={42}
                    height={42}
                    decoding="async"
                    data-nimg={1}
                    className="popularProducts_itemImg__H_xVo"
                    style={{ color: "transparent" }}
                    src="https://img4.dhresource.com/webp/m/300x300/f3/albu/jc/z/27/4254f439-446e-44b3-b34e-b0990c53a71a.jpg"
                  />
                  <div className="popularProducts_iconFire__RjBJA" />
                  <a
                    className="popularProducts_itemName__d_eJZ"
                    spm-index={29}
                    href="https://www.dhgate.com/wholesale/dog+pajamas.html"
                  >
                    dog pajamas
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="popularProducts_swiper-button-prev__IaMq7" />
          <div className="popularProducts_swiper-button-next__EfcU4" />
          <div className="popularProducts_nextMask__UD4sK" />
        </div>
      </div>
      {/*/$*/}
      {/*/$*/}
    </div>
    <div spm-c="dialog" async-exposure="true">
      {/*$*/}
      {/*$*/}
      {/*/$*/}
      {/*/$*/}
    </div>
    {/*$*/}
    <div id="mainToolBar" className="mainToolBar_mainToolBar__cu2Ui" />
    {/*/$*/}
    {/*$*/}
       {/*/$*/}
    {/*$*/}
    {/*/$*/}
    {/*$*/}
    {/*/$*/}
  </div>
  <div>
    {/* Google Tag Manager */}
    {/* End Google Tag Manager */}
  </div>
  <footer className="footer_foot-box__rwpGi">
    <div className="footer_foot-aboutus__n0zTd">
      <div className="footer_foot-aboutus-help__S22Fr">
        <div className="footer_foot-aboutus-box___SO7m">
          <span className="footer_foot-aboutus-about__sgekS" />
          <p className="footer_foot-title__sak6Y">About DHgate</p>
          <ul>
            <li>Wholesale products from certified sellers</li>
            <li>Worldwide shipping </li>
            <li>Low prices from US $0.1</li>
            <li className="footer_more__mdngk">
              <a href="https://www.dhgate.com/about/about_us.html">
                Learn More {/* */}&gt;&gt;
              </a>
            </li>
          </ul>
        </div>
        <div className="footer_foot-aboutus-box___SO7m">
          <span className="footer_foot-aboutus-faq__946YP" />
          <p className="footer_foot-title__sak6Y">Buyers FAQ</p>
          <ul>
            <li>How do I contact the seller?</li>
            <li>How do I make a payment?</li>
            <li>How do I calculate shipping cost?</li>
            <li className="footer_more__mdngk">
              <a href="https://www.dhgate.com/about/faq.html">
                Learn More
                {/* */}&gt;&gt;
              </a>
            </li>
          </ul>
        </div>
        <div className="footer_foot-aboutus-box___SO7m">
          <span className="footer_foot-aboutus-protection__xXEV5" />
          <p className="footer_foot-title__sak6Y">Buyer Protection</p>
          <ul>
            <li>Secure payments</li>
            <li>Guaranteed refunds</li>
            <li>Escrow protection on every order</li>
            <li className="footer_more__mdngk">
              <a href="https://www.dhgate.com/buyer/buyerProtection">
                Learn More {/* */}&gt;&gt;
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer_foot-main__4QtrF">
      <div className="footer_synopsis-box__g60NG">
        <h1 className="footer_foot-title__sak6Y">
          DHgate-Top-notch China Wholesale Marketplace
        </h1>
        <p className="footer_synopsis-content__B_HKe">
          DHgate, established in 2004, is the premier B2B cross-border
          e-commerce wholesale marketplace in China, connecting more than 2
          million registered buyers from over 220 countries and regions
          worldwide. Our comprehensive platform offers over 30 million products
          across 26 categories, including electronics, home and toys, outdoors,
          renewable energy items, and custom products, to name a few. We
          prioritize reliability, convenience, and efficiency, enabling our
          esteemed global buyers and sellers to connect and trade seamlessly.
          Our partnership with trusted international shipping couriers, such as
          DHL, UPS, FedEx, and more, guarantees prompt and cost-effective
          delivery services. We also have stringent quality control measures,
          including supplier selection criteria, dispute resolution mechanisms,
          and secure and streamlined payment processes, ensuring that
          transactions are smooth. Our popular business model is ideal for drop
          shippers looking for trouble-free sourcing options from reliable
          suppliers, with the items shipped directly to their customers,
          reducing inventory management efforts and shipping expenses. Join us
          today and experience the power of DHgate!
        </p>
      </div>
      <div className="footer_foot-service__ASc0y">
        <div className="footer_user-riHelp__6TOJF" spm-c="header">
          <dl>
            <dt>Dispatch &amp; Delivery</dt>
            <dd>
              <a
                href="https://www.dhgate.com/help/buyerhelpnew.php?catid=AF42E910538F9C43E0537F6415AC5FF0&language=en#help_php-indexleft-0"
                spm-index={1}
                rel="nofollow"
              >
                Delivery Options
              </a>
            </dd>
            <dd>
              <a
                href="https://www.dhgate.com/help/buyerhelpnew.php?catid=AF42E91053959C43E0537F6415AC5FF0&language=en#help_php-indexleft-2"
                spm-index={2}
                rel="nofollow"
              >
                Customs &amp; Import Tax
              </a>
            </dd>
            <dd>
              <a
                href="https://www.dhgate.com/help/buyerhelpnew.php?catid=AF3EDC2E7C82F33AE0537F6415ACCB6D&language=en#help_php-indexleft-1"
                spm-index={3}
                rel="nofollow"
              >
                Tracking Your Items
              </a>
            </dd>
            <dt className="footer_user-riHelp-pp__OgQTo">Partnership</dt>
            <dd>
              <a href="//aff.dhgate.com/" spm-index={4} rel="nofollow">
                Affiliate Program
              </a>
            </dd>
          </dl>
          <dl>
            <dt>Refund &amp; Return</dt>
            <dd>
              <a
                href="//www.dhgate.com/buyer/buyerProtection"
                spm-index={5}
                rel="nofollow"
              >
                DHgate Service Pledge
              </a>
            </dd>
            <dd>
              <a
                href="https://www.dhgate.com/help/buyerhelpnew.php?catid=AF42E91053A29C43E0537F6415AC5FF0&language=en#help_php-indexleft-0"
                spm-index={6}
                rel="nofollow"
              >
                Refund &amp; Return Process
              </a>
            </dd>
            <dd>
              <a
                href="https://www.dhgate.com/help/buyerhelpnew.php?catid=AF42E91053A29C43E0537F6415AC5FF0&artid=AF42E91055329C43E0537F6415AC5FF0&language=en#help_php-listmiddel-key"
                spm-index={7}
                rel="nofollow"
              >
                DHgate Resolution Center
              </a>
            </dd>
            <dt className="footer_user-riHelp-pp__OgQTo">Payment</dt>
            <dd>
              <a
                href="https://www.dhgate.com/help/buyerhelpnew.php?catid=AF3ED9AB3B35F189E0537F6415ACAB00&language=en#help_php-listmiddel-AF3ED9AB3B35F189E0537F6415ACAB00"
                spm-index={14}
                rel="nofollow"
              >
                Payment Methods
              </a>
            </dd>
            <dd>
              <a
                href="https://www.dhgate.com/help/buyerhelpnew.php?catid=AF3ED9AB3B38F189E0537F6415ACAB00&language=en#help_php-indexleft-2"
                spm-index={15}
                rel="nofollow"
              >
                Coupon
              </a>
            </dd>
          </dl>
          <dl>
            <dt>Customer Service</dt>
            <dd>
              <a
                href="https://www.dhgate.com/help/helpcenter.html"
                spm-index={11}
              >
                Customer Service
              </a>
            </dd>
            <dd spm-c="bottom-Severice">
              <a
                href="//www.dhgate.com/sales/uslocalservice.html"
                spm-index={13}
                rel="nofollow"
              >
                US Local Services
              </a>
            </dd>
            <dt className="footer_user-riHelp-pp__OgQTo">Blog</dt>
            <dd>
              <a href="https://www.dhgate.com/blog/" spm-param={1}>
                Shopping Guides &amp; Insights
              </a>
            </dd>
          </dl>
          <dl>
            <dt>Policy</dt>
            <dd>
              <a
                href="https://www.dhgate.com/help/buyerhelpnew.php?catid=AF3ED9AB3B37F189E0537F6415ACAB00&language=en"
                spm-index={8}
                rel="nofollow"
              >
                Management &amp; Compliance
              </a>
            </dd>
            <dd>
              <a
                spm-param={1}
                href="https://dg.dhgate.com/buyerdisputesystem/index.html#/privacyIndex?id=2&isapp=pc"
                rel="nofollow"
              >
                Terms of Use
              </a>
            </dd>
            <dd>
              <a
                spm-param={1}
                href="https://dg.dhgate.com/buyerdisputesystem/index.html#/privacyIndex?id=1&isapp=pc"
                rel="nofollow"
              >
                Security &amp; Privacy
              </a>
            </dd>
            <dd>
              <a
                spm-param={1}
                href="https://dg.dhgate.com/buyerdisputesystem/index.html#/privacyIndex?id=3&isapp=pc"
                rel="nofollow"
              >
                About Cookies
              </a>
            </dd>
            <dt className="footer_user-riHelp-pp__OgQTo">
              <a
                href="//brand.dhgate.com/intellectualproperty/home"
                spm-index={12}
                rel="nofollow"
              >
                IP Protection Portal
              </a>
            </dt>
          </dl>
        </div>
      </div>
      <div className="footer_foot-line__JvJZp" />
      <div className="footer_foot-connect__dVgS_">
        <div className="footer_foot-connect-box__nKqOz">
          <div className="footer_foot-social__YWHPT" spm-c="community">
            <p className="footer_foot-title__sak6Y">Community</p>
            <div>
              <a
                rel="nofollow"
                href="https://www.facebook.com/dhgate/"
                spm-index="Facebook"
                target="_blank"
                className="footer_facebook__tByGH"
              />
              <a
                rel="nofollow"
                href="https://www.instagram.com/dhgate_official/"
                spm-index="Instagram"
                target="_blank"
                className="footer_instagram__DQx_Y"
              />
              <a
                rel="nofollow"
                href="https://www.pinterest.com/dhgate/pins/"
                spm-index="Pinterest"
                target="_blank"
                className="footer_pinterest__18JsJ"
              />
              <a
                rel="nofollow"
                href="https://twitter.com/dhgate"
                spm-index="Twitter"
                target="_blank"
                className="footer_twitter__KQ2bN"
              />
              <a
                rel="nofollow"
                href="https://www.youtube.com/user/DHgate2004"
                spm-index="Youtube"
                target="_blank"
                className="footer_youtube__6kIA8"
              />
            </div>
          </div>
          <div className="footer_foot-mobile__AE1kN">
            <p className="footer_foot-title__sak6Y">
              Get DHgate on your Mobile
            </p>
            <div className="footer_foot-mobile-plan__sjNqr">
              <a
                rel="nofollow"
                href="https://app.appsflyer.com/id905869418?pid=PC-header"
                target="_blank"
                className="footer_foot-mobile-ios__PajBW"
              />
              <a
                rel="nofollow"
                href="https://m.dhgate.com/common/download.html"
                target="_blank"
                className="footer_foot-mobile-android__T6704"
              />
            </div>
          </div>
        </div>
        <div className="footer_foot-connect-q__6s0MN">
          Any questions or suggestions ?{/* */}{" "}
          <a
            href="https://www.dhgate.com/research_part/index.html"
            target="_blank"
            rel="nofollow"
          >
            Please let us know.
          </a>
        </div>
      </div>
      <div className="footer_foot-line__JvJZp" />
      <div className="footer_foot-accept__xs252">
        <b className="footer_foot-title__sak6Y">Accept{/* */}:</b>
        <ul>
          <li className="footer_master__gWaiM" />
          <li className="footer_visa__LLL0h" />
          <li className="footer_ae__fuhh9" />
          <li className="footer_diners__Kn8bT" />
          <li className="footer_discover__6YSRA" />
          <li className="footer_bank__nv5ye" />
          <li className="footer_peal__B_A3a" />
          <li className="footer_sofort__ow8B6" />
          <li className="footer_elo__Mv95y" />
          <li className="footer_ver__u3vxo">
            <a
              rel="nofollow"
              target="_blank"
              href="https://seal.digicert.com/seals/popup/?tag=7r7aZwFe&url=www.dhgate.com&lang=en"
            />
          </li>
          <li className="footer_pci__63_jp" />
          <li className="footer_klarna___cftn" />
        </ul>
      </div>
      <div className="footer_foot-line__JvJZp" />
      <div>
        <div className="footer_foot-site__F4s5W">
          <a href="https://www.dhgate.com/help/helpcenter.html">
            Customer Service
          </a>
          <a href="https://www.dhgate.com/">China Wholesale</a>
          <a href="https://dg.dhgate.com/buyerdisputesystem/index.html#/privacyIndex?id=1&isapp=pc">
            Security &amp; Privacy
          </a>
          <a href="https://www.dhgate.com/about/about_us.html">About Us</a>
          <a href="https://www.dhport.com/">China Manufacturers</a>
          <a href="http://seller.dhgate.com">Seller Home</a>
          <a href="https://www.dhgate.com/blog/">Blog</a>
          <a href="https://smart.dhgate.com/">Smart Shopping</a>
          <a href="https://dg.dhgate.com/buyerdisputesystem/index.html#/privacyIndex?id=2&isapp=pc">
            Terms of Use
          </a>
          <a href="https://www.dhgate.com/local-warehouse.html">
            Local Warehouse
          </a>
          <a href="https://discord.gg/WQU2fhCyeM" rel="nofollow">
            Discord Community
          </a>
        </div>
        <div className="footer_foot-copyright__WCw9c">
          Copyright Notice{/* */} © 2004 - {/* */}2025{/* */}
          DHgate.com {/* */}All rights reserved{/* */}.
          <a
            rel="nofollow"
            href="https://css.dhresource.com/webp/m/multi/common/image/license.jpg?v=20180530"
            className="ml-2 text-white"
            target="_blank"
          >
            License
          </a>
          <a
            rel="nofollow"
            href="https://beian.miit.gov.cn"
            target="_blank"
            className="text-white"
          >
            ICP备18054285号-7
          </a>
          <a
            rel="nofollow"
            href="https://beian.mps.gov.cn/#/query/webSearch"
            target="_blank"
            className="text-white"
          >
            京公网安备11010802029844号
          </a>
          Room 701, 7th Floor, Chengfu Road, Haidian District, Beijing, China
        </div>
      </div>
    </div>
  </footer>
  {/*$!*/}
  <template data-dgst="NEXT_DYNAMIC_NO_SSR_CODE" />
  {/*/$*/}
  {/*$!*/}
  <template data-dgst="NEXT_DYNAMIC_NO_SSR_CODE" />
  {/*/$*/}


      {/* <Category /> */}
    </>
  );
}