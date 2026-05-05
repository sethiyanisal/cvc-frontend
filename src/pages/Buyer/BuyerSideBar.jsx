import React from "react";

const BuyerSideBar = ({ selectedOption, setSelectedOption }) => {
  return (
    <div className="h-screen w-64 bg-[#111f16] border-r border-green-900 text-green-200 fixed left-0 top-0 pt-20">
      <div className="flex flex-col space-y-2 px-4">

        <button
          onClick={() => setSelectedOption("Dashboard")}
          className={`px-4 py-3 rounded-md text-left transition hover:bg-green-900/40 ${
            selectedOption === "Dashboard" ? "bg-green-900/40 text-green-400" : ""
          }`}
        >
          📊 Dashboard
        </button>

        <button
          onClick={() => setSelectedOption("BuyingPrice")}
          className={`px-4 py-3 rounded-md text-left transition hover:bg-green-900/40 ${
            selectedOption === "BuyingPrice" ? "bg-green-900/40 text-green-400" : ""
          }`}
        >
          💰 Buying Prices
        </button>

      </div>
    </div>
  );
};

export default BuyerSideBar;