import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams hook
import Swal from "sweetalert2";


export default function CreateVacancy(props) {
  const { projectID } = useParams(); // Use useParams to access route parameter
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobRole: "",
    jobRefCode: "",
    openings: "",
    status: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/vacancies/${projectID}/add`, formData);
      // alert('Vacancy created successfully!');
      Swal.fire({
        icon: "success",
        title: "success",
        text: "Vacancy created successfully!",
      });
      // Redirect to project page or any other page after successful submission
      navigate(`/projects/${projectID}`);
    } catch (error) {
      console.error("Error creating vacancy:", error);
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Failed to create vacancy. Please try again later",
      });
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col justify-center items-center">
      {/* <img src={logo} alt="Logo" className="h-10 w-auto mb-4" /> */}

      <h2 className="text-2xl font-bold leading-9 tracking-tight text-white mb-8">
        Create a vacancy
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="jobRole"
            className="block text-sm font-medium leading-6 text-white"
          >
            Job Role
          </label>
          <input
            id="jobRole"
            name="jobRole"
            type="text"
            autoComplete="given-name"
            required
            value={formData.jobRole}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label
            htmlFor="jobRefCode"
            className="block text-sm font-medium leading-6 text-white"
          >
            Job Reference Code
          </label>
          <input
            id="jobRefCode"
            name="jobRefCode"
            type="text"
            autoComplete="family-name"
            required
            value={formData.jobRefCode}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label
            htmlFor="openings"
            className="block text-sm font-medium leading-6 text-white"
          >
            Openings
          </label>
          <input
            id="openings"
            name="openings"
            type="number"
            autoComplete="openings"
            required
            value={formData.openings}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium leading-6 text-white"
          >
            Status
          </label>

          <select
            id="status"
            name="status"
            required
            value={formData.status}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Select Status</option>
            <option value="OPEN">OPEN</option>
            <option value="CLOSED">CLOSED</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="reason"
            className="block text-sm font-medium leading-6 text-white"
          >
            Reason
          </label>
          <textarea
            id="reason"
            name="reason"
            type="text"
            autoComplete="reason"
            required
            value={formData.reason}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-button px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Vacancy
          </button>
        </div>
      </form>
    </div>
  );
}
