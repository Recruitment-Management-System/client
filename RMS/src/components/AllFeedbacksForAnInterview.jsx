import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const AllFeedbacksForAnInterview = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const { interviewid } = useParams();

  const loadData = async () => {
    try {
      const response = await axios.get(`/feedback/interview/${interviewid}`);
      setFeedbacks(response.data);
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
                      className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {feedbacks.map((feedback) => (
                <tr key={feedback.feedbackid}>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        {feedback.feedbackid}
                      </td>
                      <td>
                        <Link
                          to={`/api/interviewer/feedback/viewfeedbackin/${feedback.feedbackid}`}
                          className="text-red-600 hover:text-red-900 font-bold"
                        >
                          VIEW FEEDBACK
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllFeedbacksForAnInterview;
