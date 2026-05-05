import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import BuyerSideBar from "./BuyerSideBar";
import BuyingPrice from "./BuyingPrice";

const BuyerMainPage = () => {
  const [selectedOption, setSelectedOption] = useState("Dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top NavBar */}
      <NavBar />

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <BuyerSideBar
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        {/* Main Content */}
        <main className="flex-1 pt-24 bg-[#0a1a0f] min-h-screen text-green-100 ml-64 flex justify-center items-start">
          <div className="w-full max-w-md mt-10">
            {selectedOption === "Dashboard" && (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold">Dashboard</h1>
                  <p>Welcome to your Buyer Dashboard.</p>
                </div>
              </>
            )}

            {selectedOption === "BuyingPrice" && <BuyingPrice />}

          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerMainPage;