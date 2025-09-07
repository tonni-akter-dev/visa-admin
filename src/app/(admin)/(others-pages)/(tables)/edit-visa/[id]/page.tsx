"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Visa {
  _id: string;
  familyName: string;
  givenNames: string;
  dateOfBirth: string;
  documentNumber: string;
  visaDescription: string;
  visaGrantNumber: string;
  visaType: string;
  stream: string;
  visaGrantDate: string;
  visaExpiryDate: string;
  visaStatus: string;
  passportNumber?: string;
  passportCountry?: string;
}

const EditVisa = () => {
  const { id } = useParams(); // get visa id from route
  const router = useRouter();

  const [formData, setFormData] = useState<Visa | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch the visa data
  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const res = await fetch(`https://visa-consultancy-backend.onrender.com/api/visas/${id}`);
        if (!res.ok) throw new Error("Failed to fetch visa");
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchVisa();
  }, [id]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      setSaving(true);
      const res = await fetch(`https://visa-consultancy-backend.onrender.com/api/visas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update visa");
      router.push("/visa-list"); // redirect to visa list
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-4">Loading visa...</p>;
  if (!formData) return <p className="p-4 text-red-500">Visa not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8 border">
      <h2 className="text-2xl font-semibold mb-6">Edit Visa</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Family Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Family Name</label>
          <input
            type="text"
            name="familyName"
            value={formData.familyName}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Given Names */}
        <div>
          <label className="block text-sm font-medium mb-1">Given Names</label>
          <input
            type="text"
            name="givenNames"
            value={formData.givenNames}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth?.split("T")[0]}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Passport Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Passport Number</label>
          <input
            type="text"
            name="documentNumber"
            value={formData.documentNumber}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Visa Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Visa Description</label>
          <input
            type="text"
            name="visaDescription"
            value={formData.visaDescription}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Visa Grant Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Visa Grant Number</label>
          <input
            type="text"
            name="visaGrantNumber"
            value={formData.visaGrantNumber}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Visa Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Visa Type</label>
          <input
            type="text"
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Stream */}
        <div>
          <label className="block text-sm font-medium mb-1">Stream</label>
          <input
            type="text"
            name="stream"
            value={formData.stream}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Visa Grant Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Visa Grant Date</label>
          <input
            type="date"
            name="visaGrantDate"
            value={formData.visaGrantDate?.split("T")[0]}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Visa Expiry Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Visa Expiry Date</label>
          <input
            type="date"
            name="visaExpiryDate"
            value={formData.visaExpiryDate?.split("T")[0]}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Visa Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Visa Status</label>
          <select
            name="visaStatus"
            value={formData.visaStatus}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="In Effect">In Effect</option>
            <option value="Expired">Expired</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Passport Country */}
        <div>
          <label className="block text-sm font-medium mb-1">Passport Country</label>
          <input
            type="text"
            name="passportCountry"
            value={formData.passportCountry || ""}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update Visa"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVisa;
