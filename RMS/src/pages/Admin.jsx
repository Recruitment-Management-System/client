import React from "react";
import AdminUserList from "../components/AdminUserList";

const Admin = () => {
  return (
    <div className="h-screen flex w-full">
      <div
        className="w-full"
        style={{
          backgroundImage: `url('/src/assets/bg.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",
        }}
      >
        <div className="h-full">
          <AdminUserList />
        </div>
      </div>
    </div>
  );
};

export default Admin;
