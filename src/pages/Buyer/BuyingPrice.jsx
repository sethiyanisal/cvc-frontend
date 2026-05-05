import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BuyerService from "../../routes/buyerServiceRoutes";

const BuyingPrice = () => {
  const navigateTo = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.id;

  const [coconutType, setCoconutType] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0]; // current date (YYYY-MM-DD)

    const priceT = {
      user_id,
      coconutType,
      price,
      date: today,
    };

    BuyerService.buyingPrice(priceT)
      .then((res) => {
        if (res.data.error === true) { 
          console.log(res.data.message);
        } else {
          navigateTo("/BuyerMainPage", { state: { refresh: true } });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setCoconutType("");
    setPrice("");
    setMessage("Buying price added successfully!");
  };

  return (
    <div className="w-full bg-[#111f16] p-6 rounded-md border border-green-900 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Add Coconut Buying Price
      </h2>

      {message && (
        <div className="mb-4 p-2 bg-green-900/40 text-green-300 rounded text-center">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <select
          value={coconutType}
          onChange={(e) => setCoconutType(e.target.value)}
          className="p-2 rounded border border-green-800 bg-[#0a1a0f] focus:outline-none focus:ring-2 focus:ring-green-400 w-full text-green-100"
          required
        >
          <option value="" disabled>
            Select Coconut Type
          </option>
          <option value="With Husk">With Husk</option>
          <option value="Without Husk">Without Husk</option>
        </select>

        <input
          type="number"
          placeholder="Buying Price per Coconut"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 rounded border border-green-800 bg-[#0a1a0f] focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
          required
        />

        <button className="py-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold w-full">
          Add Buying Price
        </button>
      </form>
    </div>
  );
};

export default BuyingPrice;