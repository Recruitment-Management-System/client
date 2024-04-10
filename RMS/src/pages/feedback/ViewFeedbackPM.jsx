import React, { useEffect, useState } from "react";
import Table from "../../components/FeedbackViewTable";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewFeedbackPM = () => {

  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:8080/api/feedback/35");
    setData(response.data.details.categoryMap);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
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
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Score
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Expected Competency Level
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Iterate over categoryMap */}
                {Object.entries(data).map(([category, values]) => (
                  <tr key={category}>
                    <td className="px-6 py-4 whitespace-nowrap">{category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {values.score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {values.expectedCompetencyLevel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {values.comment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="m-4 space-x-4 flex justify-between">
              <button className="cursor-pointer">
                <Link
                  to={""}
                  className="text-white rounded-sm text-1xl px-5 py-3 bg-[#222831]"
                >
                  Hire Candidate
                </Link>
              </button>
              <button className="cursor-pointer">
                <Link
                  to={""}
                  className="text-white rounded-sm text-1xl px-5 py-3 bg-[#222831]"
                >
                  Reject Candidate
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewFeedbackPM;
