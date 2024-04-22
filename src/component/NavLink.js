import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="text-white text-lg md:text-lg lg:text-xl font-semibold underline hover:text-gray-300"
    >
      {text}
    </Link>
  );
};

export default NavLink;
