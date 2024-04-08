import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Link } from 'react-router-dom';


const InterviewsList = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch interviews based on user ID
    const fetchInterviews = async () => {
      try {
        // Fetch JWT token from local storage
        const token = localStorage.getItem("token");

        // Decode JWT token to extract user ID
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

    

        // Fetch interviews relevant to the user ID
        const response = await axios.get(`/interview/interviews/${userId}`, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json'
        //   }
        });

        if (response.status === 200) {
          setInterviews(response.data);
        } else {
          // Handle error
          console.error('Failed to fetch interviews:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching interviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      {/* <div className="flex justify-between items-center mb-4"> */}
      <h2 className="text-2xl font-semibold text-gray-800">Interviews List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Interview ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Interview Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Interview Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Interview Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Interview Time</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {interviews.map(interview => (
              <tr key={interview.interviewID}>
                <td className="px-6 py-4 whitespace-nowrap">{interview.interviewID}</td>
                <td className="px-6 py-4 whitespace-nowrap">{interview.interviewType === 2 ? "Technical" : interview.interviewType == 1 ? "HR" :interview.interviewType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{interview.interviewStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(interview.interviewdate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(interview.interviewTime).toLocaleTimeString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link to={`/candidate-information/${interview.interviewID}`} className="text-indigo-600 hover:text-indigo-900 mr-4 font-bold">CANDIDATES</Link>
                  <Link  className="text-red-600 hover:text-red-900 font-bold">ADD FEEDBACK</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      </div>
    // </div>
  );
};

export default InterviewsList;
