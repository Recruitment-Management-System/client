import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
    position: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.endsWith("@mitrai.com")) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Email must end with @mitrai.com",
      });
      return;
    }

    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8080/api/register",
        formData
      );
      console.log("Response from backend:", response.data);
      const { token } = response.data;
      localStorage.setItem("token", token);

      if (token) {
        const decodeToken = jwtDecode(token);
        // const tokenDetails = JSON.stringify(decodeToken);
        const role = decodeToken.role.toLowerCase();
        navigate(`/api/${role}`, { replace: true });
        window.location.reload();
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Account created successfully.",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to create account.",
      });
    }
  };

  return (
    <>
      <div className="bg-background">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="/assets/logo.jpg" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Create an account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Enter your first name"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    type="text"
                    autoComplete="given-name"
                    onChange={handleChange}
                    required
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Enter your last name"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    type="text"
                    onChange={handleChange}
                    autoComplete="family-name"
                    required
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Role
                </label>
                <div className="mt-2">
                  <select
                    onChange={handleChange}
                    value={formData.role}
                    id="role"
                    name="role"
                    // value={formData.role}
                    // onChange={handleChange}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Select Role</option>
                    <option value="HR_PERSON">HR Person</option>
                    <option value="INTERVIEWER">Interviewer</option>
                    <option value="PROJECT_MANAGER">Project Manager</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Postion
                </label>
                <div className="mt-2">
                  <select
                    id="position"
                    onChange={handleChange}
                    name="position"
                    value={formData.position}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>Select Position</option>
                    <option value="SOFTWARE_ENGINEER">SOFTWARE ENGINEER</option>
                    <option value="QA_ENGINEER">QA ENGINEER</option>
                    <option value="DEV_OPS_ENGINEER">DEV OPS ENGINEER</option>
                    <option value="PRODUCT_MANAGER">PRODUCT MANAGER</option>
                    <option value="DATA_SCIENTIST">DATA SCIENTIST</option>
                    <option value="UI_UX_DESIGNER">UI/UX DESIGNER</option>
                    <option value="SYSTEM_ADMINISTRATOR">
                      SYSTEM ADMINISTRATOR
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Eg:john@mitrai.com"
                    id="email"
                    onChange={handleChange}
                    value={formData.username}
                    name="username"
                    type="email"
                    autoComplete="email"
                    required
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Enter your password"
                    onChange={handleChange}
                    id="password"
                    name="password"
                    value={formData.password}
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-button px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
