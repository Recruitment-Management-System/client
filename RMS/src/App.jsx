

import React, { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import "./index.css";
import Register from "./components/register";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Interviewer from "./pages/Interviewer";
import HrPerson from "./pages/HrPerson";
import ProjectManager from "./pages/ProjectManager";

import CreateVacancy from './components/addVacancy';
import UpdateVacancy from './components/updatevacancy';
import Project from './components/projects';
import VacancyTable from "./components/vacancyProject";
import axios from "axios";
import AddCandidate from "./components/addCandidate";
import Vacancy from "./components/vacancy";
import CandidateInfo from "./components/candidateInformation";
import CandidateInfoPage from "./components/candidateInformation";
import Interview from "./components/interview";
import InterviewsList from "./components/interviewsList";

axios.defaults.baseURL = "http://localhost:8080/api";
// axios.defaults.withCredentials = true;


function App() {

  useEffect(()=>{
    const token = localStorage.getItem("token");

    if(token){
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }else{
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [])


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

       
        <Route path="/create-vacancy/:projectID" element={<CreateVacancy />}/>
        <Route path="/update-vacancy/:vacancyID" element={<UpdateVacancy />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/projects/:projectId" element={<VacancyTable />}/>

        <Route path="/candidate" element={<AddCandidate />} />
        <Route path="/vacancies" element={<Vacancy />} />
        <Route path="/candidate-information/:id" element={<CandidateInfoPage />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/interviewlist" element={<InterviewsList />} />


      </Routes>
    </Router>
  );
}

export default App;
