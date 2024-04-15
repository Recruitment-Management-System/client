import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function AddInterview() {
  // State variables
  const [selectedInterviewers, setSelectedInterviewers] = useState([]);
  const [selectedInterviewer, setSelectedInterviewer] = useState("");
  const [interviewers, setInterviewers] = useState([]);
  const { candidateID } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userIDs: [],
    interview: {
      interviewType: "",
      interviewStatus: "",
      interviewDate: "",
      interviewTime: "",
    },
  });

  // Fetch interviewers on component mount
  useEffect(() => {
    const fetchInterviewers = async () => {
      try {
        const response = await axios.get("/users/interviewers");
        setInterviewers(response.data);
      } catch (error) {
        console.error("Error fetching interviewers:", error);
      }
    };

    fetchInterviewers();
  }, []);

  // Function to handle adding an interviewer
  const handleAddInterviewer = () => {
    if (selectedInterviewer) {
      setSelectedInterviewers([...selectedInterviewers, selectedInterviewer]);
      setSelectedInterviewer("");
    }
  };

  // Function to handle removing an interviewer
  const handleRemoveInterviewer = (interviewerId) => {
    const updatedInterviewers = selectedInterviewers.filter(
      (id) => id !== interviewerId
    );
    setSelectedInterviewers(updatedInterviewers);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      interview: {
        ...formData.interview,
        [name]: value,
      },
      userIDs: selectedInterviewers,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post(`/interview/interviewer/${candidateID}`, formData);
    } catch (error) {
      console.error("Error adding interview:", error);
      alert("Failed to create interview. Please try again later.");
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold leading-9 tracking-tight text-white mb-8">
        Create Interview
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Select interviewers */}
        <div className="w-full">
          <label className="w-full">Select interviewers:</label>
          <br />
          <select
            value={selectedInterviewer}
            onChange={(e) => setSelectedInterviewer(e.target.value)}
          >
            <option value="">Select interviewer</option>
            {interviewers.map((interviewer) => (
              <option key={interviewer.id} value={interviewer.id}>
                {interviewer.id +
                  ". " +
                  interviewer.firstName +
                  " " +
                  interviewer.lastName +
                  " - " +
                  interviewer.position}
              </option>
            ))}
          </select>
          <br />
          <button type="button" onClick={handleAddInterviewer}>
            Add Interviewer
          </button>
        </div>

        {/* Show selected interviewers */}
        <div className="w-full">
          <label>Selected interviewers ID's:</label>
          <br />
          {selectedInterviewers.join(", ")}
        </div>

        {/* Interview form fields */}
        <div className="w-full">
          {/* Interview Type */}
          <label
            htmlFor="interviewType"
            className="block text-sm font-medium leading-6 text-white"
          >
            Interview Type
          </label>
          <select
            id="interviewType"
            name="interviewType"
            required
            value={formData.interview.interviewType}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Select Interview Type</option>
            <option value="HR">HR</option>
            <option value="TECHNICAL">TECHNICAL</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>
        <div className="w-full">
          {/* Interview Status */}
          <label
            htmlFor="interviewStatus"
            className="block text-sm font-medium leading-6 text-white"
          >
            Interview Status
          </label>
          <select
            id="interviewStatus"
            name="interviewStatus"
            required
            value={formData.interview.interviewStatus}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Select Interview Status</option>
            <option value="PENDING">PENDING</option>
            <option value="ENDED">ENDED</option>
            <option value="HAPPENING">HAPPENING</option>
            <option value="CANCELED">CANCELED</option>
          </select>
        </div>
        <div className="w-full">
          {/* Interview Date */}
          <label
            htmlFor="interviewDate"
            className="block text-sm font-medium leading-6 text-white"
          >
            Interview Date
          </label>
          <input
            id="interviewDate"
            name="interviewDate"
            type="date"
            required
            value={formData.interview.interviewDate}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="w-full">
          {/* Interview Time */}
          <label
            htmlFor="interviewTime"
            className="block text-sm font-medium leading-6 text-white"
          >
            Interview Time
          </label>
          <input
            id="interviewTime"
            name="interviewTime"
            type="time"
            required
            value={formData.interview.interviewTime}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {/* Submit button */}
        <div className="w-full">
          <button
            type="submit"
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Interview
          </button>
        </div>
      </form>
    </div>
  );
}
