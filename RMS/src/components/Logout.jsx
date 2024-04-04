import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  try {
    localStorage.removeItem("token");
    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};

export default Logout;
