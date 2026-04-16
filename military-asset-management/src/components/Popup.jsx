import { useEffect, useState } from "react";
import API from "../api";
import "./Popup.css";

export default function Popup({ asset, onClose }) {
  const [transfers, setTransfers] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    const t = await API.get("/transfers");
    const a = await API.get("/assignments");

    setTransfers(
      t.data.filter(
        (x) =>
          x.assetName === asset.assetName &&
          (x.fromBase === asset.base || x.toBase === asset.base)
      )
    );

    setAssignments(
      a.data.filter(
        (x) =>
          x.assetName === asset.assetName &&
          x.base === asset.base
      )
    );
  };

  return (
    <div className="popup-overlay-main">
      <div className="popup-card-main">
        <h3 className="popup-title-main">
          {asset.assetName} ({asset.base})
        </h3>

        {/* TRANSFERS */}
        <div className="popup-section">
          <h4>Transfers</h4>
          {transfers.length > 0 ? (
            transfers.map((t) => (
              <p key={t._id} className="popup-item">
                {t.fromBase} ➝ {t.toBase} ({t.quantity})
              </p>
            ))
          ) : (
            <p className="popup-empty">No transfers</p>
          )}
        </div>

        {/* ASSIGNMENTS */}
        <div className="popup-section">
          <h4>Assignments</h4>
          {assignments.length > 0 ? (
            assignments.map((a) => (
              <p key={a._id} className="popup-item">
                {a.assignedTo || "N/A"} ({a.type}) - {a.quantity}
              </p>
            ))
          ) : (
            <p className="popup-empty">No assignments</p>
          )}
        </div>

        <button className="popup-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}