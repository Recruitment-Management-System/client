import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateProject() {
  const { projectID } = useParams();
  const navigate = useNavigate();

  const [selectedProjectManager, setSelectedProjectManager] = useState("");
  const [projectManagers, setProjectManagers] = useState([]);
  const [formData, setFormData] = useState({
    userID: "",
    projectName: "",
    projectCode: ""
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/projects/${projectID}`);
        const projectData = response.data;

        setFormData({
          userID: projectData.userID,
          projectName: projectData.projectName,
          projectCode: projectData.projectCode
        });
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProject();
  }, [projectID]);

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

  const handleUpdateProject = async () => {
    // if (selectedProjectManager && formData.projectName && formData.projectCode) {
      try {
        const projectData = {
          project: {
            projectName: formData.projectName,
            projectCode: formData.projectCode
          },
          userID: parseInt(selectedProjectManager)
        };
        
        await axios.put(`/projects/update/${projectID}`, projectData);
        navigate('/api/hr_person/projects');
      } catch (error) {
        console.error("Error updating project:", error);
        alert("Failed to update project. Please try again later.");
      }
    // }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold leading-9 tracking-tight text-white mb-8">
        Update Project
      </h2>
      <form className="space-y-6">
        {/* Select project manager */}
        <div className="w-full">
          <label className="text-white">Select project manager:</label>
          <br />
          <select
            className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.userID}
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
            value={formData.projectName}
            onChange={(e) =>
              setFormData({ ...formData, projectName: e.target.value })
            }
          />
        </div>

        {/* Project code */}
        <div className="w-full">
          <label className="text-white">Project code:</label>
          <br />
          <input
            className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            value={formData.projectCode}
            onChange={(e) =>
              setFormData({ ...formData, projectCode: e.target.value })
            }
          />
        </div>

        {/* Submit button */}
        <div className="w-full">
          <button
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="button"
            onClick={handleUpdateProject}
          >
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
}
