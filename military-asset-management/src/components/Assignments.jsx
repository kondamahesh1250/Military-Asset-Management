import { useEffect, useState } from "react";
import API from "../api";
import "./Assignments.css";

export default function Assignments() {
  const [assets, setAssets] = useState([]);
  const [data, setData] = useState({
    assetName: "",
    assignedTo: "",
    quantity: "",
    base: "",
    type: "",
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    const res = await API.get("/assets");
    setAssets(res.data);
  };

  // Selected Asset
  const selectedAsset = assets.find(
    (a) => a.assetName === data.assetName && a.base === data.base,
  );

  // Unique Bases
  const bases = [...new Set(assets.map((a) => a.base))];

  // Assets filtered by base with unique asset names
  const filteredAssets = [
    ...new Map(
      assets.filter((a) => a.base === data.base).map((a) => [a.assetName, a]),
    ).values(),
  ];

  const submit = async () => {
    const { assetName, assignedTo, quantity, base, type } = data;

    if (!assetName || !quantity || !base || !type) {
      return alert("All fields are required");
    }

    if (type === "ASSIGNED" && !assignedTo) {
      return alert("Assigned To is required");
    }

    if (!selectedAsset) {
      return alert("Asset not available in selected base");
    }

    if (quantity > selectedAsset.quantity) {
      return alert("Not enough stock available");
    }

    try {
      await API.post("/assignments", data);
      alert(`${type} Successful`);

      fetchAssets();

      setData({
        assetName: "",
        assignedTo: "",
        quantity: "",
        base: "",
        type: "",
      });
    } catch (err) {
      alert(err.response?.data || "Error occurred");
    }
  };

return (
  <div className="assignment-container">
    <div className="assignment-card">
      <h2>Assignments & Expenditures</h2>

      {/* BASE */}
      <div className="form-group">
        <label>Base</label>
        <select
          value={data.base}
          onChange={(e) =>
            setData({
              ...data,
              base: e.target.value,
              assetName: "",
            })
          }
        >
          <option value="">Select Base</option>
          {bases.map((base) => (
            <option key={base} value={base}>
              {base}
            </option>
          ))}
        </select>
      </div>

      {/* ASSET */}
      <div className="form-group">
        <label>Asset</label>
        <select
          value={data.assetName}
          disabled={!data.base}
          onChange={(e) =>
            setData({
              ...data,
              assetName: e.target.value,
            })
          }
        >
          <option value="">Select Asset</option>
          {filteredAssets.map((a) => (
            <option key={a.assetName} value={a.assetName}>
              {a.assetName} ({a.quantity})
            </option>
          ))}
        </select>
      </div>

      {/* TYPE */}
      <div className="form-group">
        <label>Type</label>
        <select
          value={data.type}
          disabled={!data.assetName}
          onChange={(e) => setData({ ...data, type: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="ASSIGNED">ASSIGNED</option>
          <option value="EXPENDED">EXPENDED</option>
        </select>
      </div>

      {/* ASSIGNED TO */}
      {data.type === "ASSIGNED" && (
        <div className="form-group">
          <label>Assigned To</label>
          <input
            placeholder="Enter name"
            value={data.assignedTo}
            onChange={(e) =>
              setData({ ...data, assignedTo: e.target.value })
            }
          />
        </div>
      )}

      {/* QUANTITY */}
      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          value={data.quantity}
          placeholder="Enter quantity"
          disabled={!data.assetName}
          onChange={(e) =>
            setData({
              ...data,
              quantity: Number(e.target.value),
            })
          }
        />
      </div>

      {/* STOCK INFO */}
      {selectedAsset && (
        <p className="stock-info">
          Available: {selectedAsset.quantity} at {selectedAsset.base}
        </p>
      )}

      <button className="submit-btn" onClick={submit}>
        Submit
      </button>
    </div>
  </div>
);
}
