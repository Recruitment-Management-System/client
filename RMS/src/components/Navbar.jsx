import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AdminNavbar from "./AdminNavbar";
import InterviewerNavbar from "./InterviewerNavbar";
import PmNavbar from "./PmNavbar";
import HrNavbar from "./HrNavbar";
import UserNavbar from "./UserNavbar";

const Navbar = ({ isAuthenticated }) => {
  const [navbarComponent, setNavbarComponent] = useState(<UserNavbar />);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isAuthenticated && token) {
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
    } else {
      setNavbarComponent(<UserNavbar />);
    }
  }, [isAuthenticated]);

  return <div className="text-white font-bold">{navbarComponent}</div>;
};

export default Navbar;
