import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CandidateList = () => {
  const [candidateList, setCandidateList] = useState([]);
  const { vacancyid } = useParams();

  const loadData = async () => {
    try {
      const response = await axios.get(`vacancies/${vacancyid}/candidates`);
      setCandidateList(response.data);
    } catch (error) {
      console.error("Error fetching candidateList:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="bg-gray-200 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <div className="justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Candidate List
            </h2>
          </div>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-800">
                  <tr>
                    {/* Table headers */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Candidate ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Experience
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Qualification
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Render filtered vacancies */}
                  {candidateList.map((candidate) => (
                    <tr key={candidate.candidateID}>
                      {/* Table data */}

                      <td className="px-6 py-4 whitespace-nowrap">
                        {candidate.candidateID}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {candidate.firstname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {candidate.lastname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {candidate.experience}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {candidate.qualification}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {candidate.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          to={`/feedback/candidates/${candidate.candidateID}`}
                          className="text-indigo-600 hover:text-indigo-900 mr-4 font-bold"
                        >
                          View Feedbacks
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default CandidateList;
