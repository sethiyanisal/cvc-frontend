
import React, {useState} from 'react'
import Logo from '../images/Logo.png'

const NavBar = () => {


  const [isOpen, setIsOpen] = useState(false);

  return (
      <>
        <nav className="flex items-center justify-between flex-wrap p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
          <a href="/">
            <img src={Logo} className="w-10  mr-2" alt="Logo" />
          </a>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
            >
              <svg
                className={`fill-current h-6 w-6 ${isOpen ? "hidden" : "block"}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
              <svg
                className={`fill-current h-6 w-6 ${isOpen ? "block" : "hidden"}`}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
              </svg>
            </button>
          </div>
          <div
            className={`w-full block flex-grow lg:flex lg:items-center lg:justify-end lg:w-auto ${isOpen ? "block" : "hidden"}`}
          >
            <div className="text-5sm lg:flex lg:justify-end">
              <a href="/" className="border-b-2 border-transparent block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:text-green-600 transition-colors duration-300 transform dark:hover:text-green-600 hover:border-green-600 mx-1.5 sm:mx-6">Home</a>

              <a href="./Products" className="border-b-2 border-transparent block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:text-green-600 transition-colors duration-300 transform dark:hover:text-green-600 hover:border-green-600 mx-1.5 sm:mx-6">Products & Services</a>

              <a href="./AboutUs" className="border-b-2 border-transparent block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:text-green-600 transition-colors duration-300 transform dark:hover:text-green-600 hover:border-green-600 mx-1.5 sm:mx-6">About Us</a>

              <a href="./Gallery" className="border-b-2 border-transparent block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:text-green-600 transition-colors duration-300 transform dark:hover:text-green-600 hover:border-green-600 mx-1.5 sm:mx-6">Contact Us</a>

              <a href="/Login" className="border-b-2 border-transparent block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 hover:text-green-600 transition-colors duration-300 transform dark:hover:text-green-600 hover:border-green-600 mx-1.5 sm:mx-6">login</a>
            </div>
          </div>
        </nav>
      </>
  )
}

export default NavBar
