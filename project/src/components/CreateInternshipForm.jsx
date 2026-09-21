import { useState } from "react";
import API from "../api/axios";

export default function CreateInternshipForm({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    stipend: "",
    industry: "",
    required_experience: 0,
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/company/create-internship", form);
      setResult({
        fraudScore: res.data.fraud_score,
        status: res.data.status,
      });
      onCreated();
      setForm({
        title: "",
        description: "",
        location: "",
        stipend: "",
        industry: "",
        required_experience: 0,
      });
    } catch (err) {
      setResult(null);
      alert("Failed to create internship");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-3">
      <h2 className="text-lg font-bold">Create Internship</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input-field" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input-field" required />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="input-field" required />
      <input name="stipend" value={form.stipend} onChange={handleChange} placeholder="Stipend" className="input-field" />
      <input name="industry" value={form.industry} onChange={handleChange} placeholder="Industry" className="input-field" />
      <input type="number" name="required_experience" value={form.required_experience} onChange={handleChange} placeholder="Experience (years)" className="input-field" />
      <button className="btn-primary w-full">Create</button>
      {result && (
        <div className="rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-gray-700">
          Fraud score: <span className="font-semibold">{result.fraudScore}</span> | Status:{" "}
          <span className="font-semibold">{result.status}</span>
        </div>
      )}
    </form>
  );
}
