import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function CandidateList() {
  const [Candidates, setCandidates] = useState([]);
  //   const [filteredVacancies, setFilteredVacancies] = useState([]);
  //   const [filterOption, setFilterOption] = useState("all"); // Default filter option
  //   const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const { vacancyid } = useParams();
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`/vacancies/candidates/${vacancyid}`);
        setCandidates(response.data);
        // setFilteredVacancies(response.data); // Initially set filtered vacancies to all vacancies
      } catch (error) {
        console.error("Error fetching vacancies:", error);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen w-full py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Candidates for vacancy {vacancyid}
        </h2>
        <div className="flex items-center space-x-4">
          {/* Search input */}
          <input
            type="text"
            // value={searchTerm}
            // onChange={handleSearchChange}
            placeholder="Search job role..."
            className="bg-white border border-gray-300 px-4 py-2 rounded-l-md rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* Filter dropdown menu */}
          <select
            // value={filterOption}
            // onChange={handleFilterChange}
            className="bg-white border border-gray-300 px-4 py-2 rounded-r-md rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
      <div className="shadow w-full border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800">
            <tr>
              {/* Table headers */}
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
                NIC
              </th>
              {/* <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Experience
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Qualifications
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Description
              </th> */}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              ></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Render filtered vacancies */}
            {Candidates.map((candidate) => (
              <tr key={candidate.candidateID}>
                {/* Table data */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {candidate.firstname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {candidate.lastname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{candidate.nic}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  {candidate.experience}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {candidate.qualification}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {candidate.description}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/api/hr_person/candidate-details/${candidate.candidateID}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4 font-bold"
                  >
                    MORE DETAILS
                  </Link>
                  <Link
                    to={`/api/project_manager/feedback/candidates/${candidate.candidateID}`}
                    // to={`/api/interviewer/feedback/candidates/${candidate.candidateID}`}

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
  );
}
export default CandidateList;

<td className="px-6 py-4 whitespace-nowrap text-sm font-medium"></td>;
