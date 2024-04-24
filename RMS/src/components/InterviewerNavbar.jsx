import React from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const InterviewerNavbar = () => {
  const token = localStorage.getItem("token");
  const decodeToken = jwtDecode(token);
  const id = decodeToken.id;
  const userName = decodeToken.sub;
  return (
    <div>
      <div>
        <h1 className="text-red-500 text-4xl text-center pt-10">INTERVIEWER</h1>
        <h2 className="text-red-500 text-md text-center">{userName}</h2>

        <ul className="ml-5 pt-16 flex flex-col gap-5">
          <li className="text-xl hover:text-blue-500 duration-300">
            <Link to={`/api/interviewer/interviewlist/${id}`}>
              My Interviews
            </Link>
          </li>
          {/* <li className="text-xl hover:text-blue-500 duration-300">
            <Link>View Feedbacks</Link>
          </li> */}
        </ul>
      </div>
      <div className="absolute bottom-5 left-5">
        <Link
          className="hover:text-red-500 text-lg duration-300"
          to={"/api/logout"}
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default InterviewerNavbar;
