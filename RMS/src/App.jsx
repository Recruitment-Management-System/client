import axios from "axios";
import React, { useEffect } from "react";


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
