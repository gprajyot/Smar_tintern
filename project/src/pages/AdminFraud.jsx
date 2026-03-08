import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

export default function AdminFraud() {
  const [fraudCases, setFraudCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFraudCases = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/api/admin/fraud-internships");
      setFraudCases(res.data.fraud_cases || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load fraud cases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFraudCases();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Fraud Cases</h1>
          <button
            onClick={fetchFraudCases}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Refresh
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="bg-white p-6 rounded-2xl shadow-md">
          {fraudCases.length === 0 ? (
            <p className="text-gray-600">No fraud cases found.</p>
          ) : (
            <div className="space-y-3">
              {fraudCases.map((item) => (
                <div key={item.id} className="border p-4 rounded-xl bg-gray-50">
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-600">Status: {item.status}</p>
                  {item.fraud_score !== undefined && (
                    <p className="text-sm text-red-600">Fraud Score: {item.fraud_score}</p>
                  )}
                  {item.location && (
                    <p className="text-sm text-gray-500">Location: {item.location}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
