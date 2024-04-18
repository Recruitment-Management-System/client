import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  // State variables
  const [selectedProjectManager, setSelectedProjectManager] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [projectManagers, setProjectManagers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectManagers = async () => {
      try {
        const response = await axios.get("/users/projectManagers");
        setProjectManagers(response.data);
      } catch (error) {
        console.error("Error fetching project managers:", error);
      }
    };

    fetchProjectManagers();
  }, []);

  // Function to handle adding a project
  const handleAddProject = async () => {
    if (selectedProjectManager && projectName && projectCode) {
      try {
        const projectData = {
            project: {
                projectName: projectName,
                projectCode: projectCode
              },
          userID: parseInt(selectedProjectManager) // Assuming this is how you identify the project manager
        };
        await axios.post("/projects/project/save", projectData);
        // Navigate or perform further actions after successfully adding the project
        navigate('/api/hr_person/vacancies');
      } catch (error) {
        console.error("Error adding project:", error);
        alert("Failed to add project. Please try again later.");
      }
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold leading-9 tracking-tight text-white mb-8">
        Add Project for Project Managers
      </h2>
      <form className="space-y-6">
        {/* Select project manager */}
        <div className="w-full">
          <label className="text-white">Select project manager:</label>
          <br />
          <select
            className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedProjectManager}
            onChange={(e) => setSelectedProjectManager(e.target.value)}
            >
             <option value="">Select project manager</option>
            {projectManagers.map((manager) => (
            <option key={manager.id} value={manager.id}>
            {manager.firstName + " " + manager.lastName}
            </option>
            ))}
        </select>

        </div>

        {/* Project name */}
        <div className="w-full">
          <label className="text-white">Project name:</label>
          <br />
          <input
            className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        {/* Project code */}
        <div className="w-full">
          <label className="text-white">Project code:</label>
          <br />
          <input
            className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            value={projectCode}
            onChange={(e) => setProjectCode(e.target.value)}
          />
        </div>

        {/* Submit button */}
        <div className="w-full">
          <button
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="button"
            onClick={handleAddProject}
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
}
