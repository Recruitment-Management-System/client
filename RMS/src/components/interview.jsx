import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Interview() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get(`/interviews`);
        setInterviews(response.data);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Interview ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Interview Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Interview Time</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Candidate ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {interviews.map(interview => (
              <tr key={interview.interviewID}>
                <td className="px-6 py-4 whitespace-nowrap">{interview.interviewID}</td>
                <td className="px-6 py-4 whitespace-nowrap">{interview.interviewDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{interview.interviewTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{interview.candidateID}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/update-interview/${interview.interviewID}`} className="text-indigo-600 hover:text-indigo-900 mr-4 font-bold">Edit</Link>
                  <Link to={`/interview-details/${interview.interviewID}`} className="text-indigo-600 hover:text-indigo-900 mr-4 font-bold">Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Interview;
