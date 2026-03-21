import React, {useState}  from 'react'
import LOGO from '../images/logo.jpg'
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

    const {authUser, setAuthUser} = useAuthContext();
    const navigateTo = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [isProfOpen, setProfOpen] = useState(false);
  
    const handleClick = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOutsideClick = () => {
      setIsOpen(false);
      setProfOpen(false);
    };

    const handleProfileClick = () => {
      setProfOpen(!isProfOpen);
    };

    const handleLogOut = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      setAuthUser({});
      navigateTo("/")
  };
  
  return (
    <div>
  <nav className="relative bg-white shadow-md dark:bg-gray-900">
    
    <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">

      {/* Logo */}
      <div className="flex items-center justify-between w-full lg:w-auto">
        <a href="#">
          <img className="h-8 sm:h-10 w-auto" src={LOGO} alt="logo" />
        </a>

        {/* Mobile menu button */}
        <div className="lg:hidden flex">
          <button
            type="button"
            className="text-gray-600 dark:text-gray-200 hover:text-blue-500 focus:outline-none"
            aria-label="toggle menu"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu */}
      <div
        className="absolute lg:static top-full left-0 w-full lg:w-auto bg-white dark:bg-gray-900 lg:bg-transparent shadow-lg lg:shadow-none z-20 transition-all duration-300 ease-in-out"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2 px-6 lg:px-0 py-4 lg:py-0">

          <a className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 transition" href="/">
            HOME
          </a>

          <a className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 transition" href="#">
            ABOUT US
          </a>

          {/* PRODUCTS */}
          <div className="flex items-center relative">
            
            <a
              className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
              href="/Gallery"
            >
              PRODUCTS
            </a>

            {/* dropdown button */}
            <button
              onClick={handleClick}
              className="p-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* dropdown */}
            {isOpen && (
              <div
                onClick={handleOutsideClick}
                className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden z-30"
              >
                <a className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition" href="#">
                  Coco chips
                </a>
                <a className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition" href="#">
                  Coco peat product
                </a>
                <a className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition" href="#">
                  Coco fiber product
                </a>
              </div>
            )}
          </div>

          <a className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 transition" href="#">
            CONTACT US
          </a>
        </div>
      </div>

      {/* AUTH SECTION */}
      {authUser?.user? (
        <div className="hidden xl:flex items-center gap-4 relative">

          {/* profile button */}
          <button
            onClick={handleProfileClick}
            className="p-2 text-gray-700 dark:text-white hover:text-blue-500 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          {/* profile dropdown */}
          {isProfOpen && (
            <div
              onClick={handleOutsideClick}
              className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden z-30"
            >
              <a
                href="/CustomerProfile"
                className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Profile
              </a>
              <button
                onClick={handleLogOut}
                className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition">
            <a href="Login">Sign In</a>
          </button>
        </div>
      )}

    </div>
  </nav>
</div>
  )
}

export default NavBar;