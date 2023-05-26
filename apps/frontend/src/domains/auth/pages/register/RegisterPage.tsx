import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div>
      Register page
      <Link to="/auth/login">Login</Link>
    </div>
  );
};

export default RegisterPage;
