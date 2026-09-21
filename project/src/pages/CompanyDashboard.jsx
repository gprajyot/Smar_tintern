import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../api/axios";
import CreateInternshipForm from "../components/CreateInternshipForm";
import Sidebar from "../components/Sidebar";

export default function CompanyDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/api/company/analytics");
      setAnalytics(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load company analytics");
    }
  };

  const fetchInternships = async () => {
    try {
      const res = await API.get("/api/company/my-internships");
      setInternships(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load internships");
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      await Promise.all([fetchAnalytics(), fetchInternships()]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 space-y-8 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Company Dashboard</h1>
          <button
            onClick={loadData}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
          >
            Refresh
          </button>
        </div>

        {loading && (
          <div className="flex h-40 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600"></div>
          </div>
        )}

        {error && <div className="rounded-lg bg-red-100 p-3 text-red-600">{error}</div>}

        <CreateInternshipForm onCreated={loadData} />

        {analytics && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Internships"
              value={analytics.total_internships}
              color="text-indigo-600"
            />
            <StatCard
              title="Under Review"
              value={analytics.under_review_internships}
              color="text-yellow-500"
            />
            <StatCard
              title="Rejected"
              value={analytics.rejected_internships}
              color="text-red-500"
            />
            <StatCard
              title="Total Applications"
              value={analytics.total_applications}
              color="text-green-600"
            />
          </div>
        )}

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-bold">My Internships</h2>

          {internships.length === 0 ? (
            <p className="text-gray-500">No internships created yet.</p>
          ) : (
            <div className="space-y-3">
              {internships.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border p-4 transition hover:shadow-md"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      {item.location} • {item.status}
                    </p>
                    {item.fraud_score !== undefined && (
                      <p className="text-sm text-red-600">Fraud Score: {item.fraud_score}</p>
                    )}
                  </div>

                  <Link
                    to={`/company/applicants/${item.id}`}
                    className="rounded-lg bg-indigo-100 px-4 py-1 text-sm text-indigo-600 transition hover:bg-indigo-200"
                  >
                    View Applicants
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
