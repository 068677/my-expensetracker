import React from "react";
import {Link} from 'react-router-dom'

const Navbar = () => {
   
  return (
    <nav className="bg-blue-950 text-white p-5 ">
      <ul className="flex justify-evenly items-center">
        <li className="list-none hover:text-lg h-7 sm:w-1/5 text-center">
          <Link to ="/">Home</Link>
        </li>
        <li className="list-none hover:text-lg h-7 sm:w-1/5 text-center">
          <Link to="/Login">Login</Link>
        </li>
        <li className="list-none hover:text-lg h-7 sm:w-1/5 text-center">
          <Link to="/About">About</Link>
        </li>
        <li className="list-none hover:text-lg h-7 sm:w-1/5 text-center">
          <Link to="/AddRecord">Add Record</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
