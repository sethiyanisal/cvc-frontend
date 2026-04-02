import React, { useState, useEffect, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import NavBar from "../components/NavBar";
import AllUserMap from "../components/AllUserMap";
import UserService from "../routes/userServiceRoutes";
import AdminService from "../routes/adminServiceRoutes";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const roleColors = {
  Planter: "bg-green-400",
  Seller: "bg-orange-400",
  AgriOfficer: "bg-blue-400",
};

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("Planter");
  const [modalOpen, setModalOpen] = useState(false);
  const [prices, setPrices] = useState([]);
  const [changeInfo, setChangeInfo] = useState(null);
  const [retailChangeInfo, setRetailChangeInfo] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState({
    wholesale: null,
    retail: null,
  });

  const planterCount = users.filter(u => u.role === "Planter").length;
  const sellerCount = users.filter(u => u.role === "Seller").length;
  const agroCount = users.filter(u => u.role === "AgriOfficer").length;
  const totalCount = users.length;

  useEffect(() => {
    UserService.getLocations().then(res => {
      setUsers(res.data.locations);
    });
  }, []);

  useEffect(() => {
    AdminService.getAdminPrices().then(res => {
      setPrices(res.data.results);
    });
  }, []);

  // Calculate today's change
  useEffect(() => {
    if (!prices.length) return;

    const toDateOnly = (d) => d.split("T")[0];
    const todayStr = new Date().toISOString().split("T")[0];
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    const getChange = (priceType) => {
      const todayItem = prices.find(
        (p) =>
          p.coconut_type === "With Husk" &&
          p.price_type === priceType &&
          toDateOnly(p.price_date) === todayStr
      );

      const yesterdayItem = prices.find(
        (p) =>
          p.coconut_type === "With Husk" &&
          p.price_type === priceType &&
          toDateOnly(p.price_date) === yesterdayStr
      );

      if (!todayItem || !yesterdayItem) return null;

      const percent =
        ((todayItem.price - yesterdayItem.price) / yesterdayItem.price) * 100;

      return {
        percent: Math.abs(percent).toFixed(1),
        isUp: percent >= 0,
        price: todayItem.price,
      };
    };

    setChangeInfo(getChange("Wholesale"));
    setRetailChangeInfo(getChange("Retail"));
  }, [prices]);

  // Weekly stats
  useEffect(() => {
    if (!prices.length) return;

    const todayStr = new Date().toISOString().split("T")[0];

    // Get Monday of this week
    const today = new Date();
    const day = today.getDay() || 7;
    const monday = new Date(today);
    if (day !== 1) monday.setDate(today.getDate() - day + 1);
    const mondayStr = monday.toISOString().split("T")[0];

    const getWeeklyStats = (priceType) => {
      const weekData = prices
        .filter(
          (p) =>
            p.coconut_type === "With Husk" &&
            p.price_type === priceType &&
            p.price_date >= mondayStr &&
            p.price_date <= todayStr
        )
        .sort((a, b) => new Date(a.price_date) - new Date(b.price_date));

      if (!weekData.length) return null;

      const pricesOnly = weekData.map((p) => p.price);
      const opening = weekData.find((p) => p.price_date === mondayStr)?.price ?? pricesOnly[0];
      const high = Math.max(...pricesOnly);
      const low = Math.min(...pricesOnly);
      const todayVolume = weekData.filter((p) => p.price_date === todayStr).length;

      return { opening, high, low, volume: todayVolume, weekData };
    };

    setWeeklyStats({
      wholesale: getWeeklyStats("Wholesale"),
      retail: getWeeklyStats("Retail"),
    });
  }, [prices]);

  // Chart data for last 7 days
  const chartData = useMemo(() => {
    const getLast7Days = (priceType) => {
      if (!weeklyStats[priceType]?.weekData) return [];
      const data = weeklyStats[priceType].weekData;
      return data.map((p) => p.price);
    };

    const getLabels = () => {
      if (!weeklyStats.wholesale?.weekData) return [];
      return weeklyStats.wholesale.weekData.map((p) => new Date(p.price_date).toLocaleDateString("en-GB"));
    };

    return {
      labels: getLabels(),
      datasets: [
        {
          label: "Wholesale",
          data: getLast7Days("wholesale"),
          borderColor: "#4ade80",
          backgroundColor: "rgba(74,222,128,0.2)",
        },
        {
          label: "Retail",
          data: getLast7Days("retail"),
          borderColor: "#fb923c",
          backgroundColor: "rgba(251,146,60,0.2)",
        },
      ],
    };
  }, [weeklyStats]);

  return (
    <div className="min-h-screen bg-[#0a1a0f] text-green-100">
      <NavBar />

      <div className="p-6 grid gap-6">
        {/* ROW 1: Tiles */}
        <div className="p-7 px-9 grid gap-6 bg-[#0a1a0f]">
          <div className="grid grid-cols-3 gap-6">
            {/* Wholesale Tile */}
            <div className="rounded-xl border border-green-900 bg-[#0f2418] shadow-md p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <h3 className="text-sm font-semibold text-green-400">Today's Wholesale Price</h3>
              </div>
              <div className="font-serif text-5xl font-black leading-none text-green-400">
                LKR {changeInfo ? `${changeInfo.price}` : "Loading..."}
              </div>
              <div className="text-xs mt-1 text-green-200/70">per coconut nut</div>
              <div
                className={`inline-flex items-center gap-1 text-xs font-semibold mt-3 px-3 py-1 rounded-full ${
                  changeInfo?.isUp
                    ? "bg-green-400/20 text-green-300"
                    : "bg-red-400/20 text-red-300"
                }`}
              >
                {changeInfo && (
                  <span className="text-sm">
                    {changeInfo.isUp ? "▲" : "▼"} {changeInfo.percent}% from yesterday
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  ["Opening", weeklyStats.wholesale?.opening, "text-green-100"],
                  ["Weekly High", weeklyStats.wholesale?.high?.toFixed(2), "text-green-400"],
                  ["Weekly Low", weeklyStats.wholesale?.low?.toFixed(2), "text-red-400"],
                  ["Volume (today)", weeklyStats.wholesale?.volume, "text-green-100"],
                ].map(([l, v, color]) => (
                  <div key={l} className="border border-green-900 bg-[#0c1f14] rounded-lg px-3 py-2">
                    <label className="text-xs text-green-200/60">{l}</label>
                    <div className={`text-lg font-semibold ${color}`}>{v ?? "-"}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Retail Tile */}
            <div className="rounded-xl border border-green-900 bg-[#0f2418] shadow-md p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <h3 className="text-sm font-semibold text-orange-400">Today's Retail Price</h3>
              </div>
              <div className="font-serif text-5xl font-black leading-none text-orange-400">
                LKR {retailChangeInfo ? `${retailChangeInfo.price}` : "Loading..."}
              </div>
              <div className="text-xs mt-1 text-green-200/70">per coconut nut (consumer)</div>
              <div
                className={`inline-flex items-center gap-1 text-xs font-semibold mt-3 px-3 py-1 rounded-full ${
                  retailChangeInfo?.isUp
                    ? "bg-green-400/20 text-green-300"
                    : "bg-red-400/20 text-red-300"
                }`}
              >
                {retailChangeInfo && (
                  <span className="text-sm">
                    {retailChangeInfo.isUp ? "▲" : "▼"} {retailChangeInfo.percent}% from yesterday
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  ["Opening", weeklyStats.retail?.opening, "text-green-100"],
                  ["Weekly High", weeklyStats.retail?.high?.toFixed(2), "text-green-400"],
                  ["Weekly Low", weeklyStats.retail?.low?.toFixed(2), "text-red-400"],
                  ["Volume (today)", weeklyStats.retail?.volume, "text-green-100"],
                ].map(([l, v, color]) => (
                  <div key={l} className="border border-green-900 bg-[#0c1f14] rounded-lg px-3 py-2">
                    <label className="text-xs text-green-200/60">{l}</label>
                    <div className={`text-lg font-semibold ${color}`}>{v ?? "-"}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stakeholders */}
            <div className="rounded-xl border border-green-900 bg-[#0f2418] shadow-md p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <h3 className="text-sm font-semibold text-yellow-400">Registered Stakeholders</h3>
              </div>
              <div className="font-serif text-4xl font-black leading-none text-yellow-400">{totalCount}</div>
              <div className="text-xs mt-1 text-green-200/70">total active members</div>

              <div className="flex gap-3 flex-wrap mt-4">
                {[
                  ["planterCount", planterCount, "Planters", "text-green-400"],
                  ["sellerCount", sellerCount, "Sellers", "text-orange-400"],
                  ["agroCount", agroCount, "Agronomists", "text-yellow-400"],
                ].map(([k, n, l, color]) => (
                  <div key={k} className="flex items-center gap-2 border border-green-900 bg-[#0c1f14] rounded-lg px-4 py-2 text-xs">
                    <span className={`text-lg font-bold ${color}`}>{n}</span>
                    <span className="text-green-200/70">{l}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5"> 
                <div className="text-xs mb-2 text-green-200/60"> Distribution </div>
                <div className="flex h-2 rounded overflow-hidden bg-[#0c1f14]">
                  {totalCount > 0 && (
                    <>
                      <div
                        className="bg-green-400"
                        style={{ width: `${((planterCount / totalCount) * 100).toFixed(1)}%` }}
                      />
                      <div
                        className="bg-orange-400"
                        style={{ width: `${((sellerCount / totalCount) * 100).toFixed(1)}%` }}
                      />
                      <div
                        className="bg-yellow-400"
                        style={{ width: `${((agroCount / totalCount) * 100).toFixed(1)}%` }}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW: Chart + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="bg-[#111f16] p-6 rounded-xl border border-green-900">
            <h2 className="mb-4 text-sm text-green-300">Price Fluctuation</h2>
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: { legend: { labels: { color: "#a7c5b0" } } },
                scales: { x: { ticks: { color: "#a7c5b0" } }, y: { ticks: { color: "#a7c5b0" } } },
              }}
            />
          </div>

          {/* Map */}
          <div className="bg-[#111f16] p-6 rounded-xl border border-green-900">
            <h2 className="mb-4 text-sm text-green-300">Map</h2>
            <AllUserMap />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[#111f16] p-6 rounded-xl border border-green-900">
          <div className="flex mb-4">
            {["Planter", "Seller", "AgriOfficer"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 ${activeTab === tab ? "bg-[#162b1d]" : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {users
              .filter((u) => u.role === activeTab)
              .map((u, i) => (
                <div key={i} className="flex items-center gap-4 bg-[#162b1d] p-3 rounded">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${roleColors[u.role]}`}>
                    {u.first_name[0]}
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-semibold leading-none">
                      {`${u.first_name} ${u.last_name}`.toUpperCase()}
                    </p>
                    <p className="text-sm text-green-300 leading-none">
                      {u.contact_number}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#111f16] p-6 rounded-xl w-[400px]">
            <h2 className="text-lg mb-4">Add User</h2>
            <button onClick={() => setModalOpen(false)} className="mt-4 w-full bg-green-400 text-black py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}