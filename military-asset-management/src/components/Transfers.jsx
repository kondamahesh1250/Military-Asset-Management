import { useEffect, useState } from "react";
import API from "../api";
import "./Transfers.css";

export default function Transfers() {
  const [assets, setAssets] = useState([]);
  const [data, setData] = useState({
    assetName: "",
    quantity: "",
    fromBase: "",
    toBase: "",
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    const res = await API.get("/assets");
    setAssets(res.data);
  };

  const selectedAsset = assets.find(
    (a) => a.assetName === data.assetName && a.base === data.fromBase,
  );

  const bases = [...new Set(assets.map((a) => a.base))];

  const filteredAssets = [
    ...new Map(
      assets
        .filter((a) => a.base === data.fromBase)
        .map((a) => [a.assetName, a]),
    ).values(),
  ];

  const submit = async () => {
    const { assetName, quantity, fromBase, toBase } = data;

    if (!assetName || !quantity || !fromBase || !toBase) {
      return alert("All fields are required");
    }

    if (!selectedAsset) {
      return alert("Asset not available");
    }

    if (quantity > selectedAsset.quantity) {
      return alert("Not enough stock");
    }

    try {
      await API.post("/transfers", data);
      alert("Transfer Successful");

      fetchAssets();

      setData({
        assetName: "",
        quantity: "",
        fromBase: "",
        toBase: "",
      });
    } catch (err) {
      alert("Error occurred");
    }
  };

  return (
    <div className="transfer-container-main">
      <div className="transfer-card-main">
        <h2 className="transfer-title-main">Transfer Assets</h2>

        {/* FROM BASE */}
        <div className="transfer-form-group">
          <label>From Base</label>
          <select
            value={data.fromBase}
            onChange={(e) =>
              setData({
                ...data,
                fromBase: e.target.value,
                assetName: "",
                toBase: "",
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
        <div className="transfer-form-group">
          <label>Asset</label>
          <select
            value={data.assetName}
            disabled={!data.fromBase}
            onChange={(e) =>
              setData({
                ...data,
                assetName: e.target.value,
                toBase: "",
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

        {/* TO BASE */}
        <div className="transfer-form-group">
          <label>To Base</label>
          <select
            value={data.toBase}
            disabled={!data.assetName}
            onChange={(e) => setData({ ...data, toBase: e.target.value })}
          >
            <option value="">Select Destination</option>
            {[
              ...new Set(
                assets
                  .filter((a) => a.base !== data.fromBase)
                  .map((a) => a.base),
              ),
            ].map((base) => (
              <option key={base} value={base}>
                {base}
              </option>
            ))}
          </select>
        </div>

        {/* QUANTITY */}
        <div className="transfer-form-group">
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
          <p className="transfer-stock-info">
            Available: {selectedAsset.quantity} at {selectedAsset.base}
          </p>
        )}

        <button className="transfer-submit-btn" onClick={submit}>
          Transfer
        </button>
      </div>
    </div>
  );
}
