import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
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
import Unauthorized from "../components/Unauthorized";
import { jwtDecode } from "jwt-decode";
import AllInterviews from "../components/AllInterviews";

axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.withCredentials = true;

const Layout = () => {
  const [role, setRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodeToken = jwtDecode(token);
      setRole(decodeToken.role);
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
              {/* authentication routes */}
              <Route path="/" element={<Home />} />
              <Route path="/api/register" element={<Register />} />
              <Route path="/api/login" element={<Login />} />
              <Route
                path="/api/logout"
                element={<Logout setIsAuthenticated={setIsAuthenticated} />}
              />

              {/* HR routes */}

              <Route
                path="/api/hr_person"
                element={role === "HR_PERSON" ? <HrPerson /> : <Unauthorized />}
              />
              <Route
                path="/api/hr_person/vacancies"
                element={role === "HR_PERSON" ? <Vacancy /> : <Unauthorized />}
              />
              <Route
                path="/api/hr_person/add/:vacancyID"
                element={
                  role === "HR_PERSON" ? <AddCandidate /> : <Unauthorized />
                }
              />
              <Route
                path="/api/hr_person/candidates/:vacancyID"
                element={
                  role === "HR_PERSON" ? <Candidates /> : <Unauthorized />
                }
              />
              <Route
                path="/api/hr_person/add-interview/:candidateID"
                element={<AddInterview />}
              />
              <Route
                path="/api/hr_person/candidate-details/:candidateID"
                element={<CandidateDetails />}
              />
              <Route
                path="/api/hr_person/allInterviewsHRView"
                element={<AllInterviews />}
              />
              {/* <Route
                path="/api/hr_person/feedback/update/:feedbackhrid"
                element={<UpdateFeedbackHR />}
              /> */}

              {/* PM routes */}

              <Route
                path="/api/project_manager"
                element={
                  role === "PROJECT_MANAGER" ? (
                    <ProjectManager />
                  ) : (
                    <Unauthorized />
                  )
                }
              />

              <Route
                path="/api/project_manager/create-vacancy/:projectID"
                element={<CreateVacancy />}
              />

              <Route
                path="/api/project_manager/update-vacancy/:vacancyID"
                element={<UpdateVacancy />}
              />

              <Route
                path="/api/project_manager/projects/:projectId"
                element={<VacancyTable />}
              />

              <Route
                path="/api/project_manager/projects"
                element={<Project />}
                //project id eken pmge project display karana
              />
              <Route
                path="/api/project_manager/candidatelist/:vacancyid"
                element={<CandidateList />}
              />

              <Route
                path="/api/project_manager/feedback/candidates/:candidateID"
                element={<CandidateInterviewsList />}
              />

              {/* <Route path="/api/admin" element={<Admin />} /> */}
              {/* <Route path="/api/interviewer" element={<Interviewer />} />
              <Route path="/api/project_manager" element={<ProjectManager />} /> */}

              {/* <Route path="/api/vacancies" element={<Vacancy />} /> */}
              {/* <Route
                path="/api/candidates/:vacancyID"
                element={<Candidates />}
              /> */}
              {/* <Route path="/api/add/:vacancyID" element={<AddCandidate />} /> */}
              {/* <Route path="/api/abc/:vacancyID" element={<Candidates />} /> */}

              {/* Interviewer routes */}

              <Route
                path="/api/interviewer"
                element={
                  role === "INTERVIEWER" ? <Interviewer /> : <Unauthorized />
                }
              />

              <Route
                path="/api/interviewer/feedback/savefeedback/:interviewID"
                element={<AddFeedback />}
              />

              <Route
                path="/api/interviewer/feedback/viewfeedbackin/:interviewid"
                element={<ViewFeedbackInterviewer />}
              />

              <Route
                path="/api/interviewer/feedback/candidates/:candidateID"
                element={<CandidateInterviewsList />}
              />

              <Route
                path="/api/interviewer/interviewlist/:userId"
                element={<InterviewsList />}
              />

              <Route
                path="/api/interviewer/candidate-information/:id"
                element={<CandidateInfoPage />}
              />

              <Route
                path="/api/interviewer/feedback/savefeedbackhr/:interviewID"
                element={<AddFeedbackHR />}
              />

              <Route
                path="/api/interviewer/feedback/viewfeedbackhr/:interviewid"
                element={<ViewFeedbackHR />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Layout;
