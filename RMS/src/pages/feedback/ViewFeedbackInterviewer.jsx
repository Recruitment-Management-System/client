import React, { useEffect, useState } from "react";
import {fetchCandidateIDByInterviewID} from "../../components/fetchCandidateIdByInterviewId"
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewFeedbackInterviewer = () => {
  const [feedback, setFeedback] = useState(null);
  const { interviewid } = useParams();

  const loadData = async () => {
    try {
      const response = await axios.get(`/feedback/interview/${interviewid}`);
      setFeedback(response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  //get candidate id of the interview
  const getCandidateIDFromInterview = async (interviewID) => {
    try {
      const candidateID = await fetchCandidateIDByInterviewID(interviewID);
      return candidateID;
    } catch (error) {
      console.error("Error fetching candidateID:", error);
      return null;
    }
  };

  return (
    <>
      <div className="bg-gray-200 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <div className="justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Feedback ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Overall Rating
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Second Interview
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Feedback Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {feedback && (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {feedback.feedbackid}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {feedback.overallrating}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {feedback.secondinterview ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(feedback.feedbackdate).toLocaleDateString()}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          {feedback && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Feedback Details
              </h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="mt-1 max-w-2xl text-sm text-gray-500">
                    Details of categories
                  </h3>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    {Object.entries(feedback.details.categoryMap).map(
                      ([category, values]) => (
                        <div
                          key={category}
                          className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                        >
                          <dt className="text-sm font-medium text-gray-500">
                            {category}
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            <div>Score: {values.score}</div>
                            <div>
                              Expected Competency Level:{" "}
                              {values.expectedCompetencyLevel}
                            </div>
                            <div>Comment: {values.comment}</div>
                          </dd>
                        </div>
                      )
                    )}
                  </dl>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewFeedbackInterviewer;
