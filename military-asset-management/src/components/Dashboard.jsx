import { useEffect, useState } from "react";
import API from "../api";
import Popup from "./Popup";
import "./Dashboard.css";

export default function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [baseFilter, setBaseFilter] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/assets");
    setAssets(res.data);
    setFiltered(res.data);
  };

  // FILTER LOGIC
  const applyFilter = () => {
    let data = assets;
    if (baseFilter) {
      data = data.filter((a) => a.base === baseFilter);
    }
    setFiltered(data);
  };

  return (
  <div className="dashboard-container-main">
    <div className="dashboard-card-main">
      <h2 className="dashboard-title-main">Dashboard ({role})</h2>

      {/* ROLE INFO */}
      <div className="dashboard-role-info">
        {role === "ADMIN" && <p>👑 Full Access</p>}
        {role === "COMMANDER" && <p>🪖 Manage Assignments & Transfers</p>}
        {role === "LOGISTICS" && <p>📦 Manage Purchases</p>}
      </div>

      {/* FILTER SECTION */}
      <div className="dashboard-filter-section">
        <select
          className="dashboard-select"
          onChange={(e) => setBaseFilter(e.target.value)}
        >
          <option value="">All Bases</option>
          <option value="Base A">Base A</option>
          <option value="Base B">Base B</option>
        </select>

        <button
          className="dashboard-filter-btn"
          onClick={applyFilter}
        >
          Apply Filter
        </button>
      </div>

      {/* ASSET LIST */}
      <div className="dashboard-assets-grid">
        {filtered.map((a) => (
          <div key={a._id} className="dashboard-asset-card">
            <h4>{a.assetName}</h4>
            <p>Qty: {a.quantity}</p>
            <p>Base: {a.base}</p>

            <button
              className="dashboard-view-btn"
              onClick={() => setSelectedAsset(a)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* POPUP */}
    {selectedAsset && (
      <Popup asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
    )}
  </div>
);
}
