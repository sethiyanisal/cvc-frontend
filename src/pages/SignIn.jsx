import NavBar from '../components/NavBar';
import React,{useState} from 'react';
import backgroundImage from '../images/284090-P6KV60-843.jpg'



const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState('');

    
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-green-700 via-green-400 to-green-200">
  <NavBar/>

  <div className="flex flex-1 justify-center items-center">
    
      
      <div className="w-full max-w-xl p-10 rounded-2xl shadow-2xl backdrop-blur-md bg-white/20 border border-white/30">

        <div className="text-start px-20">
          <p className="text-4xl font-bold text-white">Welcome Back!</p>
            <h1 className="mt-2 text-lg font-semibold text-green-200">
            Login to continue
            </h1>
        </div>

        <div className="mt-10 px-20">
                        <form >
                            <div >
                                <label htmlFor="email" className="flex justify-start block mb-2 font-semibold text-sm text-gray-200">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)}  type="email" name="email" id="email" placeholder="user@gmail.com" className="w-full p-3 rounded-lg border border-gray-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-green-400" />
                            </div>

                            <div className="mt-6">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" className="text-sm text-gray-200 font-semibold">Password</label>
                                    <a href="#" className="text-sm text-gray-300 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                                </div>

                                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Your Password" className="w-full p-3 rounded-lg border border-gray-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-green-400"/>
                                
                            </div>

                            <div className="mt-6">
                                <button type="submit" className="w-full py-3 mt-6 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300 shadow-lg">
                                    Sign in
                                </button>
                            </div>
                            <p className="mt-2 text-sm text-center text-gray-200">Don't have an account yet? <a href="Registration" className="text-green-700 focus:outline-none focus:underline hover:underline">Sign up</a>.</p>

                            {status === true ? <div className="mt-4 flex w-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                                <div className="flex items-center justify-center w-12 bg-red-500">
                                    <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                                    </svg>
                                </div>

                                <div className="py-2 w-full">
                                    <div className="mx-3 ">
                                        <span className="font-semibold text-red-500 dark:text-red-400 text-center">Error</span>
                                        <p className="text-sm text-gray-600 dark:text-gray-200">
                                        {message}
                                        </p>
                                    </div>
                                </div>
                            </div> : null}
                        </form>

                    </div>
                </div>
            </div>
    </div>
  )
}

export default SignIn;