import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between gap-4 font-bold bg-amber-100 p-2 rounded-md">
      <Link to="/">
        {" "}
        <h2> Home</h2>
      </Link>
      <Link to="/history">
        {" "}
        <h2> History</h2>
      </Link>
      <Link to="/about">
        {" "}
        <h2> About Us</h2>
      </Link>
      <Link to="/LoginSignup">
        <h2>Login or SignUp</h2>
      </Link>
    </div>
  );
};

export default Navbar;
