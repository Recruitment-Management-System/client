import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

export default function Example() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (formData[key] === "") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "All fields are required.",
        });
        return;
      }
    }

    // if (formData.password.length < 8) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Invalid Password",
    //     text: "Password must be at least 8 characters long.",
    //   });
    //   return;
    // }

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
        "http://localhost:8080/api/login",
        formData
      );
      console.log("Response from backend:", response.data);

      const { token } = response.data;

      localStorage.setItem("token", token);

      if (token) {
        const decodeToken = jwtDecode(token);
        const tokenDetails = JSON.stringify(decodeToken);
        const role = decodeToken.role.toLowerCase();
        navigate(`/api/${role}`, { replace: true });
        window.location.reload();
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Loggin sucessfull!",
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed login to account.",
      });
    }
  };

  return (
    <>
      <div className="bg-background h-screen flex justify-center items-center">
        <div className="flex bg-slate-800 w-1/2 rounded-md">
          <div className="flex flex-1 flex-col justify-center px-6 py-8 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
              <form
                className="space-y-6 mx-auto "
                action="#"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      id="email"
                      name="username"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Eg:john@mitrai.com"
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      onChange={handleChange}
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="password"
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
                <div className="text-sm text-white text-center cursor-pointer">
                  Don't have an Account?
                  <span className="text-white">
                    <Link to="/api/register"> Sign Up</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
