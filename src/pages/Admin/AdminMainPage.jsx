import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import AdminSideBar from "./AdminSideBar";
import AdminAddPrice from "./AdminAddPrice";

const AdminMainPage = () => {
    const [selectedOption, setSelectedOption] = useState("Dashboard");
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top NavBar */}
      <NavBar/>

      {/* Sidebar + Content */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <AdminSideBar selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>

        {/* Main Content */}
        <main className="flex-1 pt-24 bg-[#0a1a0f] min-h-screen text-green-100 ml-64 flex justify-center items-start">
          {/* Use items-start + mt-10 for a little spacing from navbar */}
          <div className="w-full max-w-md mt-10">           
            {selectedOption === "Dashboard" && (
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p>Welcome to your Planter Dashboard.</p>
              </div>
            )}

            {selectedOption === "AddPrice" && <AdminAddPrice />}
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminMainPage;