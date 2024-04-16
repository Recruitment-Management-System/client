import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../components/register";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Interviewer from "../pages/Interviewer";
import HrPerson from "../pages/HrPerson";
import ProjectManager from "../pages/ProjectManager";
import Login from "../components/login";
import axios from "axios";
import CreateVacancy from "../components/AddVacancy";
import UpdateVacancy from "../components/updatevacancy";
import Project from "../components/projects";
import VacancyTable from "../components/vacancyProject";
import AddCandidate from "../components/AddCandidate";
import Vacancy from "../components/vacancy";
import Logout from "../components/Logout";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Candidates from "../components/Candidates";
import CandidateDetails from "../components/CandidateDetails";
import AddInterview from "../components/AddInterview";

import AddFeedback from "../pages/feedback/AddFeedback";
import ViewFeedbackInterviewer from "../pages/feedback/ViewFeedbackInterviewer";
import ViewFeedbackHR from "../pages/feedback/ViewFeedbackHR";
import AddFeedbackHR from "../pages/feedback/AddFeedbackHR";
import CandidateList from "../components/CandidateList";
import UpdateFeedbackHR from "../pages/feedback/UpdateFeedbackHR";
import CandidateInterviewsList from "../components/candidateInterviewList";

import InterviewsList from "../components/interviewsList";
import CandidateInfoPage from "../components/candidateInformation";

axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.withCredentials = true;

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

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
      <div className="h-screen flex w-full">
        <div className="w-1/6 bg-[#222831] h-full overflow-hidden fixed inset-y-0 left-0">
          <Navbar isAuthenticated={isAuthenticated} />
        </div>
        <div className="flex-1 flex">
          <div className="w-1/6"></div> {/* Empty space for the side navbar */}
          <div className="w-5/6 bg-white">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/api/register" element={<Register />} />
              <Route path="/api/login" element={<Login />} />
              <Route
                path="/api/logout"
                element={<Logout setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route path="/api/admin" element={<Admin />} />
              <Route path="/api/interviewer" element={<Interviewer />} />
              <Route path="/api/hr_person" element={<HrPerson />} />
              <Route path="/api/project_manager" element={<ProjectManager />} />

              <Route
                path="/create-vacancy/:projectID"
                element={<CreateVacancy />}
              />
              <Route
                path="/update-vacancy/:vacancyID"
                element={<UpdateVacancy />}
              />
              <Route path="/projects" element={<Project />} />
              <Route path="/projects/:projectId" element={<VacancyTable />} />

              <Route path="/vacancies" element={<Vacancy />} />
              <Route path="/add/:vacancyID" element={<AddCandidate />} />
              <Route path="/candidates/:vacancyID" element={<Candidates />} />
              <Route
                path="/add-interview/:candidateID"
                element={<AddInterview />}
              />
              <Route
                path="/candidate-details/:candidateID"
                element={<CandidateDetails />}
              />
              <Route path="/add" element={<AddCandidate />} />
              <Route path="/abc/:vacancyID" element={<Candidates />} />

              <Route
                path="/feedback/savefeedback/:interviewID"
                element={<AddFeedback />}
              />
              <Route
                path="/feedback/savefeedbackhr/:interviewID"
                element={<AddFeedbackHR />}
              />
              <Route
                path="/feedback/viewfeedbackin/:interviewid"
                element={<ViewFeedbackInterviewer />}
              />
              <Route
                path="/feedback/viewfeedbackhr/:interviewid"
                element={<ViewFeedbackHR />}
              />
              <Route
                path="/candidatelist/:vacancyid"
                element={<CandidateList />}
              />
              <Route
                path="/feedback/update/:feedbackhrid"
                element={<UpdateFeedbackHR />}
              />
              <Route
                path="/feedback/candidates/:candidateID"
                element={<CandidateInterviewsList />}
              />

              <Route
                path="/interviewlist/:userId"
                element={<InterviewsList />}
              />

              <Route
                path="/candidate-information/:id"
                element={<CandidateInfoPage />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Layout;
