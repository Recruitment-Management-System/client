import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CandidateInterviewsList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const { candidateID } = useParams();

  const loadData = async () => {
    try {
      const response = await axios.get(`/interview/candidates/${candidateID}`);
      setInterviewList(response.data);
    } catch (error) {
      console.error("Error fetching InterviewList:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleButtonClick = async (action) => {
    //  e.preventDefault();
    try {
      await axios.put(`/candidate/${action}/${candidateID}`);
     
      Swal.fire({
        icon: "success",
        title: "success",
        text: "Record updated successfully!",
      });
    } catch (error) {
     
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Failed to update. Please try again later.",
      });
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex space-x-4 mb-4">
        <button
          className="flex w-40 justify-center rounded-md bg-button px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => handleButtonClick("hire")}
        >
          Hire Candidate
        </button>
        <button
          className="flex w-40 justify-center rounded-md bg-button px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => handleButtonClick("reject")}
        >
          Reject Candidate
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800">
        Interviews List of Candidate : {candidateID}
      </h2>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800">
            <tr>
              
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
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {interviewList.map((interview) => (
              <tr key={interview.interviewid}>
               
                <td className="px-6 py-4 whitespace-nowrap">
                  {interview.interviewType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {interview.interviewStatus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(interview.interviewDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                {new Date(
                      `1970-01-01T${interview.interviewTime}`
                    ).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  
               
                  {interview.interviewStatus === "ENDED" &&
                  interview.interviewType === "HR" ? (
                    <Link
                      to={`/api/interviewer/feedback/viewfeedbackhr/${interview.interviewid}`}
                      className="text-red-600 hover:text-red-900 font-bold"
                    >
                      VIEW FEEDBACK
                    </Link>
                  ) : interview.interviewStatus === "ENDED" &&
                    interview.interviewType === "TECHNICAL" ? (
                    <Link
                      to={`/api/interviewer/interviewFeedList/${interview.interviewid}`}
                      className="text-red-600 hover:text-red-900 font-bold"
                    >
                      VIEW FEEDBACK
                    </Link>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateInterviewsList;
