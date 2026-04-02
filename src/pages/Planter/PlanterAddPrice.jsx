import React, { useState } from 'react'
import PlanterService from '../../routes/planterServiceRoutes';
import { useNavigate } from 'react-router-dom';

const PlanterAddPrice = () => {
  
  const navigateTo = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.id;
  
  const [coconutType, setCoconutType] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const priceT = { user_id, coconutType, amount, price, date };

    PlanterService.addPrice(priceT)
      .then((res) => {
        if(res.data.error === true){
                console.log(res.data.message);
            }else{
                navigateTo("/PlanterMainPage", { state: { refresh: true } });
            }
            })
            .catch((error) => {
            console.log(error);
    });

    setCoconutType("");
    setAmount("");
    setPrice("");
    setDate("");
    setMessage("Price added successfully!");
  };

  return (
    <div className="w-full bg-[#111f16] p-6 rounded-md border border-green-900 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Coconut Selling Price</h2>

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
          placeholder="Amount of Coconuts"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 rounded border border-green-800 bg-[#0a1a0f] focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
          required
        />

        <input
          type="number"
          placeholder="Selling Price per Coconut"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 rounded border border-green-800 bg-[#0a1a0f] focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 rounded border border-green-800 bg-[#0a1a0f] focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
          required
        />

        <button className="py-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold w-full">
          Add Price
        </button>
      </form>
    </div>
  );
};

export default PlanterAddPrice;