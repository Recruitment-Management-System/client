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

import NotFoundPage from "../components/NotFoundPage";
import AddProject from "../components/AddProject";
import ProjectsHR from "../components/ProjectsHR";
import UpdateProject from "../components/UpdateProject";

import AllInterviews from "../components/AllInterviews";
import SecondInterviewList from "../components/SecondInterviewList";
import AllInterviewsForHr from "../components/AllInterviewsForHr";
import UpdateInterview from "../components/UpdateInterview";
import AllFeedbacksForAnInterview from "../components/AllFeedbacksForAnInterview";


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
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/api/register" element={<Register />} />
              <Route path="/api/login" element={<Login />} />
              <Route
                path="/api/logout"
                element={<Logout setIsAuthenticated={setIsAuthenticated} />}
              />
              {/* Admin routes */}
              <Route
                path="/api/admin"
                element={role === "ADMIN" ? <Admin /> : <Unauthorized />}
              />
              {/* HR routes */}
              <Route
                path="/api/hr_person"
                element={role === "HR_PERSON" ? <HrPerson /> : <Unauthorized />}
              />
              <Route
                path="/api/hr_person/vacancies"
                element={role === "HR_PERSON" ? <Vacancy /> : <NotFoundPage />}
              />
              <Route
                path="/api/hr_person/add/:vacancyID"
                element={
                  role === "HR_PERSON" ? <AddCandidate /> : <NotFoundPage />
                }
              />
              <Route
                path="/api/hr_person/candidates/:vacancyID"
                element={
                  role === "HR_PERSON" ? <Candidates /> : <NotFoundPage />
                }
              />
              <Route
                path="/api/hr_person/all-interivews"
                element={
                  role === "HR_PERSON" ? (
                    <AllInterviewsForHr />
                  ) : (
                    <NotFoundPage />
                  )
                }
              />
              <Route
                path="/api/hr_person/add-interview/:candidateID"
                element={
                  role === "HR_PERSON" ? <AddInterview /> : <NotFoundPage />
                }
              />
              <Route
                path="/api/hr_person/candidate-details/:candidateID"
                element={
                  role === "HR_PERSON" || role === "PROJECT_MANAGER" || role==="INTERVIEWER"? (
                    <CandidateDetails />
                  ) : (
                    <NotFoundPage />
                  )
                }
              />

              <Route
                path="/api/hr_person/secondinterviews"
                element={
                  role === "HR_PERSON" ? (
                    <SecondInterviewList />
                  ) : (
                    <NotFoundPage />
                  )
                }
              />
              <Route
                path="/api/hr_person/update-interview/:candidateID/:interviewid"
                element={
                  role === "HR_PERSON" ? <UpdateInterview /> : <NotFoundPage />
                }
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
                element={
                  role === "PROJECT_MANAGER" ? (
                    <CreateVacancy />
                  ) : (
                    <NotFoundPage />
                  )
                }
              />
              <Route
                path="/api/project_manager/update-vacancy/:vacancyID"
                element={
                  role === "PROJECT_MANAGER" ? (
                    <UpdateVacancy />
                  ) : (
                    <NotFoundPage />
                  )
                }
              />
              <Route
                path="/api/project_manager/projects/:projectId"
                element={
                  role === "PROJECT_MANAGER" ? (
                    <VacancyTable />
                  ) : (
                    <NotFoundPage />
                  )
                }
              />
              <Route
                path="/api/project_manager/projects"
                element={
                  role === "PROJECT_MANAGER" ? <Project /> : <NotFoundPage />
                }
                //project id eken pmge project display karana
              />
              <Route
                path="/api/project_manager/candidatelist/:vacancyid"
                element={
                  role === "PROJECT_MANAGER" ? (
                    <CandidateList />
                  ) : (
                    <NotFoundPage />
                  )
                }
              />

              <Route
                path="/api/project_manager/feedback/candidates/:candidateID"
                element={
                  role === "PROJECT_MANAGER" ? (
                    <CandidateInterviewsList />
                  ) : (
                    <NotFoundPage />
                  )
                }
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
                element={
                  role === "INTERVIEWER" ? <AddFeedback /> : <NotFoundPage />
                }
              />
              <Route
                path="/api/interviewer/feedback/viewfeedbackin/:feedbackid"
                element={
                  role === "INTERVIEWER" || role === "PROJECT_MANAGER" || role === "HR_PERSON" ? (
                    <ViewFeedbackInterviewer />
                  ) : (
                    <NotFoundPage />
                  )
                }
              />
              <Route
                path="/api/interviewer/feedback/candidates/:candidateID"
                element={
                  role === "INTERVIEWER" ? (
                    <CandidateInterviewsList />
                  ) : (
                    <NotFoundPage />
                  )
                }
              />
              <Route
                path="/api/interviewer/interviewlist/:userId"
                element={<InterviewsList />}
              />
              <Route
                path="/api/interviewer/candidate-information/:id"
                element={<CandidateInfoPage />}
              />

              <Route path="/api/notfound" element={<NotFoundPage />} />
              <Route
                path="/api/hr_person/addproject"
                element={
                  role === "HR_PERSON" ? <AddProject /> : <NotFoundPage />
                }
              />
              <Route
                path="/api/hr_person/projects"
                element={
                  role === "HR_PERSON" ? <ProjectsHR /> : <NotFoundPage />
                }
              />
              <Route
                path="/api/hr_person/updateproject/:projectID"
                element={
                  role === "HR_PERSON" ? <UpdateProject /> : <NotFoundPage />
                }
              />

              <Route
                path="/api/interviewer/feedback/savefeedbackhr/:interviewID"
                element={
                  role === "INTERVIEWER" ? <AddFeedbackHR /> : <NotFoundPage />
                }
              />
              <Route
                path="/api/interviewer/feedback/viewfeedbackhr/:interviewid"
                element={
                  role === "INTERVIEWER" || role === "PROJECT_MANAGER" ? (
                    <ViewFeedbackHR />
                  ) : (
                    <NotFoundPage />
                  )
                }
              />
              <Route path = "/api/interviewer/interviewFeedList/:interviewid" element ={<AllFeedbacksForAnInterview/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Layout;
