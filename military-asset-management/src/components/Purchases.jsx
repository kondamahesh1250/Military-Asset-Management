import { useState } from "react";
import API from "../api";
import "./Purchases.css";

export default function Purchases() {
  const [data, setData] = useState({
    assetName: "",
    quantity: "",
    base: "",
  });

  const submit = async () => {
    const { assetName, quantity, base } = data;

    if (!assetName || !quantity || !base) {
      return alert("All fields are required");
    }

    try {
      await API.post("/assets", data);
      alert("Asset Added Successfully");

      setData({
        assetName: "",
        quantity: "",
        base: "",
      });
    } catch (err) {
      alert("Error adding asset");
    }
  };

  return (
    <div className="purchase-container-main">
      <div className="purchase-card-main">
        <h2 className="purchase-title-main">Add New Asset</h2>

        {/* ASSET NAME */}
        <div className="purchase-form-group">
          <label>Asset Name</label>
          <input
            type="text"
            placeholder="Enter asset name"
            value={data.assetName}
            onChange={(e) =>
              setData({ ...data, assetName: e.target.value })
            }
          />
        </div>

        {/* QUANTITY */}
        <div className="purchase-form-group">
          <label>Quantity</label>
          <input
            type="number"
            placeholder="Enter quantity"
            value={data.quantity}
            onChange={(e) =>
              setData({
                ...data,
                quantity: Number(e.target.value),
              })
            }
          />
        </div>

        {/* BASE */}
        <div className="purchase-form-group">
          <label>Base</label>
          <select
            value={data.base}
            onChange={(e) =>
              setData({ ...data, base: e.target.value })
            }
          >
            <option value="">Select Base</option>
            <option value="Base A">Base A</option>
            <option value="Base B">Base B</option>
          </select>
        </div>

        <button className="purchase-submit-btn" onClick={submit}>
          Add Asset
        </button>
      </div>
    </div>
  );
}