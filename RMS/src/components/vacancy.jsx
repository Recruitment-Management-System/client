import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Vacancy() {
  const [vacancies, setVacancies] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [filterOption, setFilterOption] = useState("all"); // Default filter option
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get(`/vacancies`);
        setVacancies(response.data);
        setFilteredVacancies(response.data); // Initially set filtered vacancies to all vacancies
      } catch (error) {
        console.error("Error fetching vacancies:", error);
      }
    };

    fetchVacancies();
  }, []);

  // Function to handle filter change
  const handleFilterChange = (event) => {
    const option = event.target.value;
    setFilterOption(option);

    // Filter vacancies based on the selected option
    if (option === "open") {
      const filtered = vacancies.filter((vacancy) => vacancy.status === "OPEN");
      setFilteredVacancies(filtered);
    } else if (option === "closed") {
      const filtered = vacancies.filter(
        (vacancy) => vacancy.status === "CLOSED"
      );
      setFilteredVacancies(filtered);
    } else {
      setFilteredVacancies(vacancies);
    }
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter vacancies by job role based on search term
  useEffect(() => {
    const filtered = vacancies.filter((vacancy) =>
      vacancy.jobRole.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVacancies(filtered);
  }, [searchTerm, vacancies]);

  return (
    <div className="bg-gray-200 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Vacancies</h2>
        <div className="flex items-center space-x-4">
          {/* Search input */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search job role..."
            className="bg-white border border-gray-300 px-4 py-2 rounded-l-md rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* Filter dropdown menu */}
          <select
            value={filterOption}
            onChange={handleFilterChange}
            className="bg-white border border-gray-300 px-4 py-2 rounded-r-md rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
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
                Vacancy ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Job Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Job Reference Code
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Openings
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Reason
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
            {filteredVacancies.map((vacancy) => (
              <tr key={vacancy.vacancyID}>
                {/* Table data */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {vacancy.vacancyID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vacancy.jobRole}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vacancy.jobRefCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vacancy.openings}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vacancy.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {vacancy.reason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/api/hr_person/candidates/${vacancy.vacancyID}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4 font-bold"
                  >
                    CANDIDATES
                  </Link>

                  <Link
                    className="text-red-600 hover:text-red-900 font-bold"
                    to={`/api/hr_person/add/${vacancy.vacancyID}`}
                  >
                    ADD CANDIDATE
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

export default Vacancy;
