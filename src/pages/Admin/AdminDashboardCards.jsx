import React, { useEffect, useState } from "react";
import AdminService from "../../routes/adminServiceRoutes";

const AdminDashboardCards = () => {
  const [priceList, setPriceList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [tPrice, setTodayPrice] = useState([]);
  const [price, setPrice] = useState("");

  useEffect(() => {
    AdminService.getAdminPrices()
      .then((res) => {
        setPriceList(res.data.results);
        console.log("Admin Prices:", res.data.results);
      });
  }, []);

  useEffect(() => {
    if (!priceList.length) return;

    console.log("Finding today's price entry from:", priceList);

    const toDateOnly = (d) => d.split("T")[0];
    const todayStr = new Date().toISOString().split("T")[0];

    const todayItem = priceList.filter(
        (p) =>
          toDateOnly(p.price_date) === todayStr
      );

      console.log("Today's Price Entry:", todayItem);
    setTodayPrice(todayItem ? todayItem : null);
  }, [priceList])
  

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setPrice(entry.price);
  };

  const saveEdit = (id) => {
    const updatedEntry = {price};

    AdminService.updatePrice(id, updatedEntry)
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.message);
        } else {
          setPriceList((prev) =>
            prev.map((e) =>
              e.id === id
                ? { ...e, price: price }
                : e
            )
          );
        }
      });

    setEditingId(null);
  };

  return (
    <div className="w-full max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Today’s Admin Entries
      </h1>

      {tPrice?.map((entry) => (
        <div
          key={entry.id}
          className="bg-[#111f16] border border-green-900 rounded-xl p-6 shadow-lg"
        >

          <p className="mt-2">
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
              <button
                className="mt-3 px-4 py-2 bg-green-600 rounded hover:bg-green-700"
                onClick={() => saveEdit(entry.id)}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p>
                <b>Price:</b> Rs. {entry.price}
              </p>

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

export default AdminDashboardCards;