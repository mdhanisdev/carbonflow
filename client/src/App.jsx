import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API_BASE = "/api/";
  const [records, setRecords] = useState([]);
  const [file, setFile] = useState(null);

  const approvedCount = records.filter((r) => r.status === "APPROVED").length;
  const rejectedCount = records.filter((r) => r.status === "REJECTED").length;
  const suspiciousCount = records.filter((r) => r.suspicious).length;

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {

    try {

      const response = await axios.get(
        `${API_BASE}records/`
      );

      const data = Array.isArray(response.data) ? response.data : response.data.results || [];
      setRecords(data);

    } catch (error) {
      console.error("Fetch error:", error.response?.status, error.response?.data || error.message);
      alert(`Error fetching records: ${error.response?.data?.detail || error.message}`);
    }
  };

  const uploadCSV = async () => {

    if (!file) {
      alert("Select CSV file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      await axios.post(
        `${API_BASE}records/upload_csv/`,
        formData
      );

      alert("CSV Uploaded Successfully");

      fetchRecords();

    } catch (error) {
      console.error("Upload error:", error.response?.status, error.response?.data || error.message);
      alert(`Upload failed: ${error.response?.data?.error || error.message}`);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API_BASE}records/${id}/`, { status });
      fetchRecords();
    } catch (error) {
      console.error("Update error:", error.response?.status, error.response?.data || error.message);
      alert(`Status update failed: ${error.response?.data?.detail || error.message}`);
    }
  };

  const statusBadge = (status) => {
    if (status === "APPROVED") return "approved";
    if (status === "REJECTED") return "rejected";
    return "pending";
  };

  return (
    <div className="app-shell">
      <div className="app-container">
        <div className="app-header">
          <div>
            <h1>CarbonFlow Dashboard</h1>
            <p>Upload, review, and manage carbon emission records with a clean local workflow.</p>
          </div>
        </div>

        <div className="control-panel">
          <label className="file-input-button">
            Select CSV File
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </label>
          <button className="primary-button" onClick={uploadCSV}>
            Upload CSV
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-primary">
            Total Records
            <span>{records.length}</span>
          </div>
          <div className="stat-card stat-success">
            Approved
            <span>{approvedCount}</span>
          </div>
          <div className="stat-card stat-danger">
            Rejected
            <span>{rejectedCount}</span>
          </div>
          <div className="stat-card stat-warning">
            Suspicious
            <span>{suspiciousCount}</span>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="records-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Source</th>
                <th>Category</th>
                <th>Value</th>
                <th>Scope</th>
                <th>Status</th>
                <th>Suspicious</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.source_type}</td>
                  <td>{record.category}</td>
                  <td>{record.value}</td>
                  <td>{record.scope}</td>
                  <td>
                    <span className={`badge ${statusBadge(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${record.suspicious ? "suspicious" : "pending"}`}>
                      {record.suspicious ? "YES" : "NO"}
                    </span>
                  </td>
                  <td>
                    <div className="button-group">
                      <button className="small-button approve" onClick={() => updateStatus(record.id, "APPROVED")}>Approve</button>
                      <button className="small-button reject" onClick={() => updateStatus(record.id, "REJECTED")}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;