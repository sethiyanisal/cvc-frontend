import React, { useEffect, useState } from "react";
import BuyerService from "../../routes/buyerServiceRoutes";

const BuyerDashboardCards = () => {
  const [priceList, setPriceList] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editData, setEditData] = useState({ price: "" });

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.id;

  useEffect(() => {
    BuyerService.getBuyingPrices().then((res) => {
      const allPrices = res.data.results;

    const filtered = allPrices.filter(
      (item) => item.user_id === user_id
    );

    setPriceList(filtered);
    });
  }, []);

  const startEdit = (entry) => {
    setEditingRow(entry.id);
    setEditData({ price: entry.price });
  };

  const handleChange = (e) => {
  setEditData({ ...editData, [e.target.name]: e.target.value });
};

  const saveEdit = (id) => {
    BuyerService.updatePrice(id, editData).then((res) => {
      if (!res.data.error) {
        setPriceList((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, ...editData } : item
          )
        );
        setEditingRow(null);
      }
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Buyer Price Entries</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-green-900 text-left">
          <thead className="bg-[#0f1f14] text-green-300">
            <tr>
              <th className="p-3 border border-green-900">Type</th>
              <th className="p-3 border border-green-900">Price (Rs)</th>
              <th className="p-3 border border-green-900 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {priceList.map((entry) => (
              <tr key={entry.id} className="bg-[#111f16]">
                <td className="p-3 border border-green-900">
                  {entry.coconut_type}
                </td>

                <td className="p-3 border border-green-900">
                  {editingRow === entry.id ? (
                    <input
                      name="price"
                      value={editData.price}
                      onChange={handleChange}
                      className="p-1 w-full rounded bg-[#0a1a0f] border border-green-800 text-green-100"
                    />
                  ) : (
                    `Rs. ${entry.price}`
                  )}
                </td>


                <td className="p-3 border border-green-900 text-center">
                  {editingRow === entry.id ? (
                    <button
                      onClick={() => saveEdit(entry.id)}
                      className="px-4 py-1 bg-green-600 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(entry)}
                      className="px-4 py-1 bg-green-700 rounded hover:bg-green-800"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerDashboardCards;