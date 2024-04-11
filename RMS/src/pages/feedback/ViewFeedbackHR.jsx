import React, { useEffect, useState } from "react";
import Table from "../../components/FeedbackViewTable";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewFeedbackInterviewer = () => {
  const [feedback, setFeedback] = useState(null);
  const { interviewid } = useParams();

  const loadData = async () => {
    try {
      const response = await axios.get(`/feedbackhr/interview/${interviewid}`);
      setFeedback(response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <div className="flex justify-between items-center mb-4">
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
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Salary Expectation
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Comment
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {feedback && (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {feedback.feedbackidhr}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(feedback.feedbackdate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {feedback.salaryexpectation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {feedback.comment}
                      </td>
                      
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewFeedbackInterviewer;
