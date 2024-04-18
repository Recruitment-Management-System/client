import React, { useState, useEffect } from "react";

import logo from "../assets/logo.jpg";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


export default function UpdateVacancy() {
  const { vacancyID } = useParams(); // Get vacancyId from URL params
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobRole: "",
    jobRefCode: "",
    openings: "",
    status: "",

    reason: "",

  });

  const [notFound, setNotFound] = useState(false); // State for 404 redirect

  useEffect(() => {
    // Fetch existing data for vacancy to be updated
    const fetchVacancy = async () => {
      try {
        const response = await axios.get(`/vacancies/${vacancyID}`);
        const vacancyData = response.data;
        // Set the formData state with the existing vacancy data
        if (!vacancyData) {
          setNotFound(true); // Set notFound state to true
        } else {
          // Set the formData state with the existing vacancy data
          setFormData({
            jobRole: vacancyData.jobRole,
            jobRefCode: vacancyData.jobRefCode,
            openings: vacancyData.openings,
            status: vacancyData.status,
            reason: vacancyData.reason,
          });
        }
      } catch (error) {
      
        console.error("Error fetching vacancy data:", error);
        setNotFound(true);
      }
    };

    fetchVacancy();
  }, [vacancyID]);

  if (notFound) {
    return navigate("/api/notfound");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/vacancies/update/${vacancyID}`, formData);

      alert("Vacancy updated successfully!");
      navigate("/api/project_manager/projects")
      // Redirect to previous page or any other page after successful update
    } catch (error) {
     
      console.error("Error updating vacancy:", error);
      alert("Failed to update vacancy. Please try again later.");

    }

   
  };

  return (
    <div className="bg-background">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img className="mx-auto h-10 w-auto" src={logo} alt="Logo" /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Update a vacancy
          </h2>
        </div>

          <form className="space-y-6 md:w-2/5 w-full mx-auto" onSubmit={handleSubmit}>
            <div>

              <label
                htmlFor="jobRole"
                className="block text-sm font-medium leading-6 text-white"
              >

                Job Role
              </label>
              <div className="mt-2">
                <input
                  id="jobRole"
                  name="jobRole"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.jobRole} // Set value from formData state
                  onChange={handleChange}
                  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>

              <label
                htmlFor="jobRefCode"
                className="block text-sm font-medium leading-6 text-white"
              >

                Job Reference Code
              </label>
              <div className="mt-2">
                <input
                  id="jobRefCode"
                  name="jobRefCode"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.jobRefCode} // Set value from formData state
                  onChange={handleChange}
                  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>

              <label
                htmlFor="openings"
                className="block text-sm font-medium leading-6 text-white"
              >

                Openings
              </label>
              <div className="mt-2">
                <input
                  id="openings"
                  name="openings"
                  type="text"
                  autoComplete="openings"
                  required
                  value={formData.openings} // Set value from formData state
                  onChange={handleChange}
                  min="1"
                  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>

              <label
                htmlFor="status"
                className="block text-sm font-medium leading-6 text-white"
              >

                Status
              </label>
              <div className="mt-2">
                <select
                  id="status"
                  name="status"
                  required
                  value={formData.status} // Set value from formData state
                  onChange={handleChange}
                  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select Status</option>
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                  
                </select>
              </div>
            </div>
            <div>

              <label
                htmlFor="reason"
                className="block text-sm font-medium leading-6 text-white"
              >

                Reason
              </label>
              <div className="mt-2">
                <textarea
                  id="reason"
                  name="reason"
                  type="text"
                  autoComplete="reason"
                  required
                  value={formData.reason} // Set value from formData state
                  onChange={handleChange}
                  className="block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-button px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Vacancy
              </button>
            </div>
          </form>
        </div>
     
    </div>
  );
}
