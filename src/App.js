// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputForm from "./component/InputForm";
import About from "./pages/About";
import NavLink from "./component/NavLink"; // Custom NavLink component

function App() {
  return (
    <Router>
      <div className="text-white min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="bg-repeat w-full h-full text-primary-100 heropattern-topography-red-500 min-h-screen flex flex-col items-center justify-center relative">
          <div className="absolute top-0 right-0 m-4 flex flex-row items-center">
            <NavLink to="/about" text="About" />
            <div className="h-6 w-px bg-white mx-4"></div>{" "}
            {/* Vertical divider */}
            <a
              href="https://github.com/Agil0975/Tubes2_FE_Penyelam_Handal.git"
              className="text-white text-lg md:text-xl lg:text-2xl font-semibold underline hover:text-gray-300"
            >
              Github
            </a>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-8">
            WIKI RACE PATHFINDER
          </h1>
          <div className="mt-8">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/" element={<InputForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
