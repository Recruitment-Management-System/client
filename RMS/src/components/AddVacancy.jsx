import React, { useState } from "react";
import Swal from "sweetalert2";
import logo from "../assets/logo.jpg";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams hook

export default function CreateVacancy(props) {
  const { projectID } = useParams(); // Use useParams to access route parameter
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobRole: "",
    jobRefCode: "",
    openings: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.openings < 1) {
      Swal.fire({
        icon: "error",
        title: "Unsuccessfull!",
        text: "Number of openings must be a positive number",
      });
      return;
    }
    try {
      await axios.post(`/vacancies/${projectID}/add`, formData);
      navigate(`/api/project_manager/projects/${projectID}`);
    } catch (error) {
      console.error("Error creating vacancy:", error);
      Swal.fire({
        icon: "error",
        title: "Unsuccessfull!",
        text: "Faild to create a vacancy",
      });
    }
  };

  return (
    <div className="bg-background min-h-screen w-full flex flex-col justify-center items-center">
      <div className="w-1/2 bg-slate-800 py-10">
        <h2 className="text-4xl text-center font-bold leading-9 tracking-tight text-white mb-8">
          Create a vacancy for a project
        </h2>
        <form
          className="space-y-8 md:w-2/5 w-full mx-auto"
          onSubmit={handleSubmit}
        >
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
              className="block w-full pl-3 rounded-md border-0 py-1.5 h-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              className="block w-full pl-3 rounded-md border-0 py-1.5 h-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              className="block w-full pl-3 rounded-md border-0 py-1.5 h-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
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
              className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-black duration-300 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Vacancy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
