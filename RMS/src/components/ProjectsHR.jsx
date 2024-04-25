import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProjectsHR() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/projects/projectsWithUserName");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter projects based on the search term
  const filteredProjects = projects.filter((project) =>
    project[0].projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`/projects/delete/${projectId}`);
      // After successful deletion, refetch projects
      const response = await axios.get("/projects/projectsWithUserName");
      setProjects(response.data);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
        {/* Button for creating a new project */}
        <Link
          to="/api/hr_person/addproject"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          Create Project
        </Link>
        {/* Search input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search project name..."
          className="bg-white border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800">
            <tr>
              
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Project Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Project Code
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Project Manager
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Render filtered projects */}
            {filteredProjects.map((project) => (
              <tr key={project[0].projectID}>
                {/* Table data */}
                
                <td className="px-6 py-4 whitespace-nowrap">{project[0].projectName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project[0].projectCode}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project[1]}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/api/hr_person/updateproject/${project[0].projectID}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4 font-bold"
                  >
                  EDIT
                  </Link>
                  <button
                    onClick={() => deleteProject(project[0].projectID)}
                    className="text-red-600 hover:text-red-900 font-bold"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
