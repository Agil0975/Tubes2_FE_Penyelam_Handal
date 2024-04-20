// NavLink.js
import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="text-white text-lg md:text-xl lg:text-2xl font-semibold underline hover:text-gray-300 mr-6"
    >
      {text}
    </Link>
  );
};

export default NavLink;
