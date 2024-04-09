import React, { useState, useEffect } from "react";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios"; // Import Axios for making HTTP requests

export default function Project() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Function to fetch all projects from the backend
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/projects"); // Adjust the API endpoint according to your backend

        setProjects(response.data); // Set the retrieved projects to the state
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects(); // Call the fetchProjects function when the component mounts
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <h2 className="text-2xl font-bold text-gray-800 ml-2">
            All Projects
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {projects.map((project) => (
            <Link key={project.projectID} to={`/projects/${project.projectID}`}>
              <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800">
                  Name: {project.projectName}
                </h3>
                <p className="text-sm text-gray-600">ID: {project.projectID}</p>
                <p className="text-sm text-gray-600">
                  Code: {project.projectCode}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
