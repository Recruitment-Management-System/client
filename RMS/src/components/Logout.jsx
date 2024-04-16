import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.removeItem("token");
      setIsAuthenticated(false); // Set isAuthenticated to false --> in logout
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }, []);

  return null;
};

export default Logout;
