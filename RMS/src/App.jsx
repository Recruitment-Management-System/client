import axios from "axios";
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

import CreateVacancy from "./components/addVacancy";
import UpdateVacancy from "./components/updatevacancy";
import Project from "./components/projects";
import VacancyTable from "./components/vacancyProject";

import AddCandidate from "./components/addCandidate";
import Vacancy from "./components/vacancy";

import CandidateInfo from "./components/candidateInformation";
import CandidateInfoPage from "./components/candidateInformation";
import Interview from "./components/interview";
import InterviewsList from "./components/interviewsList";

axios.defaults.baseURL = "http://localhost:8080/api";
// axios.defaults.withCredentials = true;

import Layout from "./layout/Layout";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, []);

  return <Layout />;
}

export default App;
