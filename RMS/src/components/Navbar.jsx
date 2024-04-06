import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AdminNavbar from "./AdminNavbar";
import InterviewerNavbar from "./InterviewerNavbar";
import PmNavbar from "./PmNavbar";
import HrNavbar from "./HrNavbar";
import UserNavbar from "./UserNavbar";

const Navbar = () => {
  const [navbarComponent, setNavbarComponent] = useState(<UserNavbar />);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const decodeToken = jwtDecode(token);
      const role = decodeToken.role;

      switch (role) {
        case "ADMIN":
          setNavbarComponent(<AdminNavbar />);
          break;
        case "INTERVIEWER":
          setNavbarComponent(<InterviewerNavbar />);
          break;
        case "PROJECT_MANAGER":
          setNavbarComponent(<PmNavbar />);
          break;
        case "HR_PERSON":
          setNavbarComponent(<HrNavbar />);
          break;
        default:
          break;
      }
    }
  }, [token]);

  return <div className="text-white font-bold">{navbarComponent}</div>;
};

export default Navbar;
