
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import "./index.css";
import Register from "./components/register";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Interviewer from "./pages/Interviewer";
import HrPerson from "./pages/HrPerson";
import ProjectManager from "./pages/ProjectManager";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './modules/login';
import './index.css'
import Register from './modules/register';
import CreateVacancy from './modules/addVacancy';
import UpdateVacancy from './modules/updatevacancy';
import Project from './modules/projects';


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/api/login" element={<Login />} />
        <Route path="/api/register" element={<Register />} />
        <Route path="/api/admin" element={<Admin />} />
        <Route path="/api/interviewer" element={<Interviewer />} />
        <Route path="/api/hr_person" element={<HrPerson />} />
        <Route path="/api/project_manager" element={<ProjectManager />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-vacancy/:projectID" element={<CreateVacancy />}/>
        <Route path="/update-vacancy" element={<UpdateVacancy />} />
        <Route path="/projects" element={<Project />} />

      </Routes>
    </Router>
  );
}

export default App;
