import React, { useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

export default function AddCandidate() {
  const { projectId } = useParams(); // Use useParams to access route parameter
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nic: "",
    candidateName: {
      firstName: "",
      lastName: ""
    },
    experience: "",
    qualifications: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/candidates/${projectId}/add`, formData);
      // Redirect to project page or any other page after successful submission
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.error('Error adding candidate:', error);
      alert('Failed to add candidate. Please try again later.');
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold leading-9 tracking-tight text-white mb-8">Add a Candidate</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
      
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-white">
              First Name
            </label>
            <input
              id="firstName"
              name="candidateName.firstName"
              type="text"
              autoComplete="given-name"
              required
              value={formData.candidateName.firstName}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-white">
              Last Name
            </label>
            <input
              id="lastName"
              name="candidateName.lastName"
              type="text"
              autoComplete="family-name"
              required
              value={formData.candidateName.lastName}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="nic" className="block text-sm font-medium leading-6 text-white">
            NIC
          </label>
          <input
            id="nic"
            name="nic"
            type="text"
            autoComplete="nic"
            required
            value={formData.nic}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="w-full">
          <label htmlFor="experience" className="block text-sm font-medium leading-6 text-white">
            Experience (years)
          </label>
          <input
            id="experience"
            name="experience"
            type="number"
            autoComplete="experience"
            required
            value={formData.experience}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="w-full">
          <label htmlFor="qualifications" className="block text-sm font-medium leading-6 text-white">
            Qualifications
          </label>
          <textarea
            id="qualifications"
            name="qualifications"
            type="text"
            autoComplete="qualifications"
            required
            value={formData.qualifications}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="w-full">
          <button
            type="submit"
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Candidate
          </button>
        </div>
      </form>
    </div>
  );
}
