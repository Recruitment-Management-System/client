import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CandidateInfoPage = () => {
  const { id } = useParams(); // Get the interview ID from URL parameters
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(`/interview/${id}`);

        // Assuming the backend returns the candidate object in the response data
        setCandidate(response.data);
      } catch (error) {
        console.error("Error fetching candidate:", error);
      }
    };

    fetchCandidate();
  }, [id]); // Fetch candidate details whenever the candidate ID changes

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-md overflow-hidden max-w-md w-full">
        <div className="px-6 py-4 bg-gray-800 text-white">
          <h2 className="text-xl font-semibold">Candidate Information</h2>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Name:
            </label>
            <p className="text-gray-900">{`${candidate?.firstname} ${candidate?.lastname}`}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              NIC:
            </label>
            <p className="text-gray-900">{candidate?.nic}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Experience:
            </label>
            <p className="text-gray-900">{candidate?.experience} years</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Qualifications:
            </label>
            <p className="text-gray-900">{candidate?.qualification}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateInfoPage;
