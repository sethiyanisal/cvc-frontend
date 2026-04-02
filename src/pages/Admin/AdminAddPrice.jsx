import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminService from '../../routes/adminServiceRoutes';

const AdminAddPrice = () => {
  
  const navigateTo = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.id;
  
  const [coconutType, setCoconutType] = useState(""); // with husk / without husk
  const [priceType, setPriceType] = useState("");     // wholesale / retail
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const priceData = { 
      user_id, 
      coconutType, 
      priceType, 
      price, 
      date 
    };

    AdminService.addPrice(priceData)
      .then((res) => {
        if(res.data.error){
            console.log(res.data.message);
        } else {
            navigateTo("/AdminMainPage", { state: { refresh: true } });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setCoconutType("");
    setPriceType("");
    setPrice("");
    setDate("");
    setMessage("Price added successfully!");
  };

  return (
    <div className="w-full bg-[#111f16] p-6 rounded-md border border-green-900 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Coconut Price</h2>

      {message && (
        <div className="mb-4 p-2 bg-green-900/40 text-green-300 rounded text-center">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

        {/* Coconut Type */}
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

        {/* Price Type */}
        <select
          value={priceType}
          onChange={(e) => setPriceType(e.target.value)}
          className="p-2 rounded border border-green-800 bg-[#0a1a0f] focus:outline-none focus:ring-2 focus:ring-green-400 w-full text-green-100"
          required
        >
          <option value="" disabled>
            Select Price Type
          </option>
          <option value="Wholesale">Wholesale Price</option>
          <option value="Retail">Retail Price</option>
        </select>

        {/* Price */}
        <input
          type="number"
          placeholder="Price per Coconut"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 rounded border border-green-800 bg-[#0a1a0f] focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
          required
        />

        {/* Date */}
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

export default AdminAddPrice;