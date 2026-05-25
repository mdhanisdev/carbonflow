import { useEffect, useState } from "react";
import axios from "axios";


function App() {

  const BACKENDURL = "https://carbonflow-production.up.railway.app/";

  const [records, setRecords] = useState([]);

  const [file, setFile] = useState(null);

  const approvedCount = records.filter(
    r => r.status === "APPROVED"
  ).length;

  const rejectedCount = records.filter(
    r => r.status === "REJECTED"
  ).length;

  const suspiciousCount = records.filter(
    r => r.suspicious
  ).length;

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {

    try {

      const response = await axios.get(
        `${BACKENDURL}api/records/`
      );

      setRecords(response.data);

    } catch (error) {
      console.log(error);
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
        `${BACKENDURL}api/records/upload_csv/`,
        formData
      );

      alert("CSV Uploaded Successfully");

      fetchRecords();

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {

  try {

    await axios.patch(
      `${BACKENDURL}api/records/${id}/`,
      {
        status: status
      }
    );

    fetchRecords();

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div style={{ padding: "20px" }}>

      <h1>CarbonFlow Dashboard</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={uploadCSV}>
        Upload CSV
      </button>

      <br /><br />

      <h3>Total Records: {records.length}</h3>

      <h3>Approved: {approvedCount}</h3>

      <h3>Rejected: {rejectedCount}</h3>

      <h3>Suspicious: {suspiciousCount}</h3>

      <table border="1" cellPadding="10">

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

              <td>{record.status}</td>

              <td>
                {record.suspicious ? "YES" : "NO"}
              </td>

              <td>

              <button onClick={() => updateStatus(record.id, "APPROVED")}>Approve</button>

              <button onClick={() => updateStatus(record.id, "REJECTED")}>Reject</button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;