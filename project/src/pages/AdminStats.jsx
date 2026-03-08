import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

export default function AdminStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/api/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Statistics</h1>
          <button
            onClick={fetchStats}
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

        {stats && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Users" value={stats.total_users} color="text-indigo-600" />
            <StatCard title="Students" value={stats.total_students} color="text-green-600" />
            <StatCard title="Companies" value={stats.total_companies} color="text-purple-600" />
            <StatCard title="Internships" value={stats.total_internships} color="text-orange-600" />
            <StatCard title="Applications" value={stats.total_applications} color="text-red-600" />
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
