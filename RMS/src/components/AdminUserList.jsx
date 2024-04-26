import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function AdminUserList() {
  const [Users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterOption, setFilterOption] = useState("all"); // Default filter option
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/admin/user-list`);
        setUsers(response.data);
        setFilteredUsers;
      } catch (error) {
        console.error("Error fetching Users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleActivate = async (id) => {
    try {
      // alert(userID);
      await axios.put(`/admin/enable-user/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error activating user:", error);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      // alert(userID);
      await axios.put(`/admin/disable-user/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deactivating user:", error);
    }
  };

  // Function to handle filter change
  const handleFilterChange = (event) => {
    const option = event.target.value;
    setFilterOption(option);

    // Filter Users based on the selected option
    if (option === "1") {
      const filtered = Users.filter((user) => user.active === 1);
      setFilteredUsers(filtered);
    } else if (option === "0") {
      const filtered = Users.filter((user) => user.active === 0);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(Users);
    }
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter Users by job role based on search term
  useEffect(() => {
    const filtered = Users.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, Users]);

  return (
    <div className="bg-gray-200 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
        <div className="flex items-center space-x-4">
          {/* Search input */}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search name..."
            className="bg-white border border-gray-300 px-4 py-2 rounded-l-md rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {/* Filter dropdown menu */}
          <select
            value={filterOption}
            onChange={handleFilterChange}
            className="bg-white border border-gray-300 px-4 py-2 rounded-r-md rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All</option>
            <option value="0">Inactive</option>
            <option value="1">Active</option>
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
                User Name
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
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Position
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
            {/* Render filtered users */}
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                {/* Table data */}
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {user.active === 0 ? (
                    <Link
                      // to={`/api/hr_person/candidates/${va}`}
                      onClick={() => handleActivate(user.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 font-bold"
                    >
                      ACTIVATE
                    </Link>
                  ) : (
                    <Link
                      className="text-red-600 hover:text-red-900 font-bold"
                      onClick={() => handleDeactivate(user.id)}

                      // to={`/api/hr_person/add/${vacancy.vacancyID}`}
                    >
                      DEACTIVATE
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUserList;
