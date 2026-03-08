import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/api/admin/analytics");
      setAnalytics(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Analytics</h1>
          <button
            onClick={fetchAnalytics}
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

        {analytics && (
          <div className="grid lg:grid-cols-2 gap-6">
            <AnalyticsCard title="Role Distribution">
              {Object.entries(analytics.role_distribution || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between py-1 text-sm">
                  <span className="capitalize">{key}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </AnalyticsCard>

            <AnalyticsCard title="Industry Distribution">
              {Object.entries(analytics.industry_distribution || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between py-1 text-sm">
                  <span>{key}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </AnalyticsCard>

            <AnalyticsCard title="Location Distribution">
              {Object.entries(analytics.location_distribution || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between py-1 text-sm">
                  <span>{key}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </AnalyticsCard>

            <AnalyticsCard title="Monthly Applications">
              {Object.entries(analytics.monthly_applications || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between py-1 text-sm">
                  <span>{key}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </AnalyticsCard>
          </div>
        )}
      </div>
    </div>
  );
}

function AnalyticsCard({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-gray-700 font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
