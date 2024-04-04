import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../components/register";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Interviewer from "../pages/Interviewer";
import HrPerson from "../pages/HrPerson";
import ProjectManager from "../pages/ProjectManager";
import Login from "../components/login";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.withCredentials = true;

const Layout = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/register" element={<Register />} />
        <Route path="/api/login" element={<Login />} />
        <Route path="/api/admin" element={<Admin />} />
        <Route path="/api/interviewer" element={<Interviewer />} />
        <Route path="/api/hr_person" element={<HrPerson />} />
        <Route path="/api/project_manager" element={<ProjectManager />} />
      </Routes>
    </Router>
  );
};

export default Layout;
