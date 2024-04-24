import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function SecondInterviewList() {
  const [Candidates, setCandidates] = useState([]);
  //   const [filteredVacancies, setFilteredVacancies] = useState([]);
  //   const [filterOption, setFilterOption] = useState("all"); // Default filter option
  //   const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const { vacancyID } = useParams();
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('candidate/secondinterview');
        setCandidates(response.data);
        // setFilteredVacancies(response.data); // Initially set filtered vacancies to all vacancies
      } catch (error) {
        console.error("Error fetching vacancies:", error);
      }
    };

    fetchCandidates();
  }, []);

  // Function to handle filter change
  //   const handleFilterChange = (event) => {
  //     const option = event.target.value;
  //     setFilterOption(option);

  // Filter vacancies based on the selected option
  // if (option === "open") {
  //   const filtered = vacancies.filter((vacancy) => vacancy.status === "OPEN");
  //   setFilteredVacancies(filtered);
  // } else if (option === "closed") {
  //   const filtered = vacancies.filter(
  //     (vacancy) => vacancy.status === "CLOSED"
  //   );
  //   setFilteredVacancies(filtered);
  // } else {
  //   setFilteredVacancies(vacancies);
  // }

  // Function to handle search input change
  //   const handleSearchChange = (event) => {
  //     setSearchTerm(event.target.value);
  //   };

  // Filter vacancies by job role based on search term
  //   useEffect(() => {
  //     const filtered = vacancies.filter((vacancy) =>
  //       vacancy.jobRole.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setFilteredVacancies(filtered);
  //   }, [searchTerm, vacancies]);

  return (
    <div className="bg-gray-200 min-h-screen w-full py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Candidates Eligible for Second Interview
        </h2>
  
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
                    className="text-red-600 hover:text-red-900 font-bold"
                    to={`/api/hr_person/add-interview/${candidate.candidateID}`}
                  >
                    ADD INTERVIEW
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
export default SecondInterviewList;
