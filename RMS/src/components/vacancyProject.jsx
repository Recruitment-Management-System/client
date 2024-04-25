import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function VacancyTable() {
  const [vacancies, setVacancies] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [filterOption, setFilterOption] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { projectId } = useParams();

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get(`/vacancies/projects/${projectId}`);
        setVacancies(response.data);
        setFilteredVacancies(response.data);
      } catch (error) {
        console.error("Error fetching vacancies:", error);
      }
    };

    fetchVacancies();
  }, [projectId]);

  useEffect(() => {
    const filterVacancies = () => {
      let filtered = vacancies;

      filtered = filtered.filter((vacancy) =>
        vacancy.jobRole.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filterOption === "open") {
        filtered = filtered.filter((vacancy) => vacancy.status === "OPEN");
      } else if (filterOption === "closed") {
        filtered = filtered.filter((vacancy) => vacancy.status === "CLOSED");
      }

      return filtered;
    };

    setFilteredVacancies(filterVacancies());
  }, [searchTerm, filterOption, vacancies]);

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="bg-gray-200 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Vacancies</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search job role..."
            className="bg-white border border-gray-300 px-4 py-2 rounded-l-md rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
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

        <Link
          to={`/api/project_manager/create-vacancy/${projectId}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Vacancy
        </Link>
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800">
            <tr>
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
            {filteredVacancies.map((vacancy) => (
              <tr key={vacancy.vacancyID}>
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
                    to={`/api/project_manager/update-vacancy/${vacancy.vacancyID}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4 font-bold"
                  >
                    EDIT
                  </Link>
                  <Link
                    to={`/api/project_manager/candidatelist/${vacancy.vacancyID}`}
                    className="text-red-600 hover:text-indigo-900 mr-4 font-bold"
                  >
                    VIEW VACANCY
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

export default VacancyTable;
