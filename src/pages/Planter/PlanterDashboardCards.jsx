import React, { useEffect, useState } from "react";
import PlanterService from "../../routes/planterServiceRoutes";


const PlanterDashboardCards = () => {

  const [priceList, setPriceList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.id;

  useEffect(() => {
    PlanterService.getPrice(user_id)
    .then((res) =>{
        setPriceList(res.data.price);
    })
  }, []);

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setPrice(entry.unit_price);
    setCount(entry.coconut_count);
  };

  const saveEdit = async (id) => {

    const updatedEntry = { price, count };

    PlanterService.updatePrice(id, updatedEntry)
    .then((res) =>{
        if(res.data.error === true){
            console.log(res.data.message);
        }else{
            // Update the local priceList state with the new values
            setPriceList((prevList) =>
              prevList.map((entry) =>
                entry.id === id ? { ...entry, unit_price: price, coconut_count: count } : entry
              )
            );
        }
    });

    setEditingId(null);
  };


  return (
    <div className="w-full max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Today’s Entries</h1>

      {priceList?.map((entry) => (
        <div
          key={entry.id}
          className="bg-[#111f16] border border-green-900 rounded-xl p-6 shadow-lg"
        >
          <p className="text-lg mb-2">
            <b>Type:</b> {entry.coconut_type}
          </p>

          {editingId === entry.id ? (
            <>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-2 p-2 w-full rounded bg-[#0a1a0f] border border-green-800 text-green-100"
                placeholder="Price per coconut"
              />
              <input
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="mt-2 p-2 w-full rounded bg-[#0a1a0f] border border-green-800 text-green-100"
                placeholder="Coconut count"
              />
              <button
                className="mt-3 px-4 py-2 bg-green-600 rounded hover:bg-green-700"
                onClick={() => saveEdit(entry.id)}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p><b>Price:</b> Rs. {entry.unit_price}</p>
              <p><b>Count:</b> {entry.coconut_count}</p>
              <button
                className="mt-3 px-4 py-2 bg-green-700 rounded hover:bg-green-800"
                onClick={() => startEdit(entry)}
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlanterDashboardCards;