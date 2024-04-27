import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/sample_ds3.jpg";
import theAgil from "../images/Agil.jpg";
import theDaniel from "../images/Daniel.jpg";
import theRafly from "../images/Rafly.jpg";

const About = () => {
  return (
    <div className="text-white text-center mt-8 ml-12 mr-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">About Us</h2>
      <p className="mt-4">
        Welcome to the Wiki Race Pathfinder website! This project is aimed at
        finding the shortest path from one Wikipedia page to another using two
        popular graph traversal algorithms: Breadth-First Search (BFS) and
        Iterative Deepening Search (IDS). Usually used in WikiRace Game.
      </p>
      <p className="mt-4">
        <strong>Breadth-First Search (BFS):</strong> BFS is a graph traversal
        algorithm that explores all the neighboring nodes at the current depth
        level before moving on to the nodes at the next depth level. It
        guarantees the shortest path from the source node to any other reachable
        node in an unweighted graph. In the context of our task, BFS is used to
        traverse the Wikipedia pages in a level-by-level manner, ensuring that
        the shortest path is found.
      </p>
      <p className="mt-4">
        <strong>Iterative Deepening Search (IDS):</strong> IDS is a combination
        of DFS and BFS. It repeatedly performs DFS with a maximum depth limit,
        gradually increasing the depth limit with each iteration until the
        target node is found. IDS combines the benefits of DFS with the
        completeness and optimality of BFS. In our task, IDS is employed to
        explore the Wikipedia pages iteratively with increasing depth limits
        until the target page is reached, ensuring optimality while keeping
        memory usage low.
      </p>
      <p className="mt-4">
        This project is the final product of an Algorithms Strategy college
        assignment in Institut Teknologi Bandung (ITB).
      </p>
      <p className="mt-8 text-xl">
        <strong>CREATORS:</strong>
      </p>

      <div className="mt-8 mb-16 grid grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
          <Link to="https://github.com/Agil0975">
            <img
              src={theAgil}
              alt="Agil Fadillah Sabri"
              className="w-32 h-32 rounded-md mb-4"
            />
          </Link>
          <p>Agil Fadillah Sabri</p>
        </div>

        <div className="flex flex-col items-center">
          <Link to="https://github.com/raflyhangga">
            <img
              src={theRafly}
              alt="Raden Rafly Hanggaraksa B"
              className="w-32 h-32 rounded-md mb-4"
            />
          </Link>
          <p>Raden Rafly Hanggaraksa B</p>
        </div>

        <div className="flex flex-col items-center">
          <Link to="https://github.com/Gryphuss">
            <img
              src={theDaniel}
              alt="Daniel Mulia Putra Manurung"
              className="w-32 h-32 rounded-md mb-4"
            />
          </Link>
          <p>Daniel Mulia Putra Manurung</p>
        </div>
      </div>
    </div>
  );
};

export default About;
