import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const InterviewsList = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOption, setFilterOption] = useState("all");
  const [filteredInterviews, setFilteredInterviews] = useState([]);

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

        const response = await axios.get(`/interview/interviews/${userId}`);

        if (response.status === 200) {
          setInterviews(response.data);
          setFilteredInterviews(response.data); // Initialize filtered interviews with all interviews
        } else {
          // Handle error
          console.error("Failed to fetch interviews:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching interviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const handleFilterChange = (event) => {
    const option = event.target.value;
    setFilterOption(option);

    // Filter interviews based on the selected option
    if (option === "pending") {
      const filtered = interviews.filter(
        (interview) => interview.interviewStatus === "PENDING"
      );
      setFilteredInterviews(filtered);
    } else if (option === "Happening") {
      const filtered = interviews.filter(
        (interview) => interview.interviewStatus === "HAPPENING"
      );
      setFilteredInterviews(filtered);
    } else if (option === "canceled") {
      const filtered = interviews.filter(
        (interview) => interview.interviewStatus === "CANCELED"
      );
      setFilteredInterviews(filtered);
    } else if (option === "ended") {
      const filtered = interviews.filter(
        (interview) => interview.interviewStatus === "ENDED"
      );
      setFilteredInterviews(filtered);
    } else {
      // If 'All' is selected, reset the filtered interviews to all interviews
      setFilteredInterviews(interviews);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Interviews List
      </h2>
      <div className="flex items-center mb-6">
        <label htmlFor="filter" className="mr-4">
          Filter:
        </label>
        <select
          id="filter"
          value={filterOption}
          onChange={handleFilterChange}
          className="bg-white border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="Happening">Happening</option>
          <option value="ended">Ended</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Interview ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Interview Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Interview Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Interview Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Interview Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInterviews.map((interview) => (
                <tr key={interview.interviewID}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {interview.interviewID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {interview.interviewType}

                   
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {interview.interviewStatus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(interview.interviewdate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(interview.interviewTime).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/candidate-information/${interview.interviewID}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 font-bold"
                    >
                      CANDIDATES
                    </Link>
           
                    {(interview.interviewStatus === "PENDING" ||
                      interview.interviewStatus === "HAPPENING") &&
                    interview.interviewType === "TECHNICAL" ? (
                      <Link
                        to={`/feedback/savefeedback/${interview.interviewid}`}
                        className="text-red-600 hover:text-red-900 font-bold"
                      >
                        ADD FEEDBACK
                      </Link>
                    ) : (interview.interviewStatus === "PENDING" ||
                        interview.interviewStatus === "HAPPENING") &&
                      interview.interviewType === "HR" ? (
                      <Link
                        to={`/feedback/savefeedbackhr/${interview.interviewID}`}
                        className="text-red-600 hover:text-red-900 font-bold"
                      >
                        ADD FEEDBACK
                      </Link>
                    ) : interview.interviewStatus === "ENDED" &&
                      interview.interviewType === "HR" ? (
                      <Link
                        to={`/feedback/viewfeedbackhr/${interview.interviewID}`}
                        className="text-red-600 hover:text-red-900 font-bold"
                      >
                        VIEW FEEDBACK
                      </Link>
                    ) : interview.interviewStatus === "ENDED" &&
                    interview.interviewType === "TECHNICAL" ?(
                      <Link
                        to={`/feedback/viewfeedbackin/${interview.interviewID}`}
                        className="text-red-600 hover:text-red-900 font-bold"
                      >
                        VIEW FEEDBACK
                      </Link>
                    ): null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InterviewsList;
