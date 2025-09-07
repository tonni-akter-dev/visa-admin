"use client";
import React, { useState, useEffect } from "react";

interface Country {
  name: string;
}

const AddVisa = () => {
  const [formData, setFormData] = useState({
    familyName: "",
    givenNames: "",
    visaDescription: "",
    dateOfBirth: "",
    documentNumber: "",
    visaGrantNumber: "",
    visaClass: "",
    visaApplicant: "Primary",
    visaGrantDate: "",
    visaExpiryDate: "",
    location: "",
    visaStatus: "In Effect",
    periodOfStay: "",
    visaType: "Visitor",
    enterBeforeDate: "",
    passportCountry: "",
    applicationId: "",
    transactionRef: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);

  // Predefined options
  const visaApplicants = ["Primary", "Secondary"];
  const visaStatuses = ["In Effect", "Expired", "Cancelled"];
  const visaTypes = ["Visitor", "Student", "Work", "Transit"];

  // Fetch countries
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json"
        );
        const data = await res.json();
        const values: Country[] = Object.values(data);
        const sorted = values.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sorted);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchCountries();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://visa-consultancy-backend.onrender.com/api/visas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Visa added successfully!");
        setFormData({
          familyName: "",
          givenNames: "",
          visaDescription: "",
          dateOfBirth: "",
          documentNumber: "",
          visaGrantNumber: "",
          visaClass: "",
          visaApplicant: "Primary",
          visaGrantDate: "",
          visaExpiryDate: "",
          location: "",
          visaStatus: "In Effect",
          periodOfStay: "",
          visaType: "Visitor",
          enterBeforeDate: "",
          passportCountry: "",
          applicationId: "",
          transactionRef: "",
        });
      } else {
        const errorData = await res.json();
        setMessage(`❌ Error: ${errorData.msg || "Something went wrong"}`);
      }
    } catch (error) {
      setMessage("❌ Network error");
    } finally {
      setLoading(false);
    }
  };

  const requiredFields = [
    "familyName",
    "givenNames",
    "visaDescription",
    "documentNumber",
    "visaGrantNumber",
    "visaType",
    "visaGrantDate",
    "visaExpiryDate",
  ];

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Add New Visa
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(formData).map((key) => (
        <div key={key}>
  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 c apitalize">
    {key}
  </label>
  <div>
    {key === "location" || key === "passportCountry" ? (
      <select
        name={key}
        value={(formData as any)[key]}
        onChange={handleChange}
        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        required={key === "location"}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.name} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    ) : key === "visaApplicant" ? (
      <select
        name="visaApplicant"
        value={formData.visaApplicant}
        onChange={handleChange}
        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      >
        {visaApplicants.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : key === "visaStatus" ? (
      <select
        name="visaStatus"
        value={formData.visaStatus}
        onChange={handleChange}
        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      >
        {visaStatuses.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : key === "visaType" ? (
      <select
        name="visaType"
        value={formData.visaType}
        onChange={handleChange}
        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        required
      >
        {visaTypes.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={key.toLowerCase().includes("date") ? "date" : "text"}
        name={key}
        value={(formData as any)[key]}
        onChange={handleChange}
        className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        required={requiredFields.includes(key)}
      />
    )}
  </div>
</div>

          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Adding Visa..." : "Add Visa"}
        </button>

        {message && (
          <p
            className={`text-center text-sm font-medium mt-2 ${
              message.startsWith("✅")
                ? "text-green-500 dark:text-green-400"
                : "text-red-500 dark:text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddVisa;
