import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Map from "../components/Map";
import { useNavigate } from "react-router-dom";
import UserService from "../routes/userServiceRoutes";

const SignUp = () => {

  const navigateTo = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  })

  const handleLocationSelect = (coords) => {
    setLocation(coords)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(role === "Planter" || role === "Seller" || role === "AgriOfficer"){
    if (!location.lat || !location.lng) {
      alert('Please select a location')
      return
    }
  }

    const user = {
        firstName: firstName,
        lastName: lastName,
        contactNo:contactNum,
        email:email,
        password: password,
        role: role,
        latitude: location.lat || null,
        longitude: location.lng || null
    }
   
    UserService
        .signUpUser(user)
        .then((res) => {
            if(res.data.error === true){
                console.log(res.data.message);
            }else{
                navigateTo("/Login");
            }
            })
        .catch((error) => {
        console.log(error);
    });
}

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-700 via-green-400 to-green-200">

    <NavBar/>

      {/* Center Container */}
      <div className="flex flex-1 justify-center items-center">

        {/* Signup Card */}
        <div className="w-full max-w-3xl p-10 rounded-2xl shadow-2xl backdrop-blur-md bg-white/20 border border-white/30">

          <h1 className="text-4xl font-bold text-white mb-3">
            Sign Up
          </h1>

          <h2 className="text-lg text-green-200 mb-6">
            Get your free account now
          </h2>

          <form className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* First Name */}
            <div>
              <label className="block mb-2 text-sm text-white">First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className="w-full px-5 py-3 text-gray-900 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block mb-2 text-sm text-white">Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="w-full px-5 py-3 text-gray-900 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-sm text-white">Phone Number</label>
              <input
                value={contactNum}
                onChange={(e) => setContactNum(e.target.value)}
                type="text"
                className="w-full px-5 py-3 text-gray-900 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm text-white">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full px-5 py-3 text-gray-900 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm text-white">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full px-5 py-3 text-gray-900 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 text-sm text-white">User Role</label>
                <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-5 py-3 text-gray-900 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                <option value="">Select Role</option>
                <option value="Planter">Planter</option>
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
                <option value="AgriOfficer">Agri Officer</option>
                </select>
            </div>

            {(role === "Planter" || role === "Seller" || role === "AgriOfficer") && (
                <div className="md:col-span-2">
                    <Map onLocationSelect={handleLocationSelect}/>
                </div>
            )}

            {/* Button */}
            <div className="md:col-span-2">
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full py-3 mt-6 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300 shadow-lg"
              >
                Sign Up
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

export default SignUp;