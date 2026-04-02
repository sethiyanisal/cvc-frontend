import React, { useState } from 'react'
import LOGO from '../images/logo.jpg'
import { useAuthContext } from '../hooks/useAuthContext';
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const today = new Date().toLocaleDateString("en-LK", { weekday:"long", year:"numeric", month:"long", day:"numeric" });

  const { authUser, setAuthUser } = useAuthContext();
  const navigateTo = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfOpen, setProfOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  const handleOutsideClick = () => {
    setIsOpen(false);
    setProfOpen(false);
  };

  const handleProfileClick = () => setProfOpen(!isProfOpen);

  const handleProfile = () => {
    if(authUser?.user?.role === "Planter"){
      navigateTo("/PlanterMainPage");
    }else if(authUser?.user?.role === "Admin"){
      navigateTo("/AdminMainPage");
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    setAuthUser({});
    navigateTo("/");
  };

  return (
    <nav className="relative bg-[#111f16] border-b border-green-900 shadow sticky top-0 z-[1000]">
      <div className="container px-4 py-4 mx-auto md:flex md:justify-between md:items-center">

        {/* LEFT */}
        <div className="flex items-center justify-between">
          <a href="#">
            <img className="w-auto h-9" src={LOGO} alt="" />
          </a>
        </div>

        {/* CENTER LINKS */}
        <div className="w-full md:w-auto px-6 py-4 md:p-0 md:flex md:items-center md:space-x-6">

          <a className="text-green-200 hover:text-green-400 transition" href="/">HOME</a>
          <a className="text-green-200 hover:text-green-400 transition" href="#">ABOUT US</a>

          {/* PRODUCTS */}
          <div className="flex items-center space-x-2 relative">
            <a className="text-green-200 hover:text-green-400 transition" href="/Gallery">PRODUCTS</a>

            <div className="relative inline-block">
              <button onClick={handleClick} className="p-1 text-green-300">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isOpen && (
                <div
                  onClick={handleOutsideClick}
                  className="absolute right-0 top-full mt-2 z-50 w-48 bg-[#0a1a0f] border border-green-900 rounded-md shadow-lg text-green-200"
                >
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-green-900/40">Coco chips</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-green-900/40">Coco peat product</a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-green-900/40">Coco fiber product</a>
                </div>
              )}
            </div>
          </div>

          <a className="text-green-200 hover:text-green-400 transition" href="#">CONTACT US</a>
        </div>

        {/* RIGHT SECTION */}
        {authUser?.user ? (
          <div className="relative">
            <div className="relative inline-block">
              <button onClick={handleProfileClick} className="p-2 text-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              {isProfOpen && (
                <div
                  onClick={handleOutsideClick}
                  className="absolute right-0 top-full mt-2 z-50 w-48 bg-[#0a1a0f] border border-green-900 rounded-md shadow-lg text-green-200"
                >
                  <button onClick={handleProfile} className="block w-full text-left px-4 py-2 text-sm hover:bg-green-900/40">
                    Profile
                  </button>
                  <button onClick={handleLogOut} className="block w-full text-left px-4 py-2 text-sm hover:bg-green-900/40">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="text-sm text-green-300/80">{today}</div>
            <Link
              to="/login"
              className="text-green-200 hover:text-green-400 transition"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="text-green-200 hover:text-green-400 transition"
            >
              Sign Up
            </Link>
          </div>
        )}

      </div>
    </nav>
  )
}

export default NavBar;