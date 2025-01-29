import React from "react";
import { NavLink } from "react-router-dom";
import '../index.css';

const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li> 
        <li className="nav-item">
          <NavLink to="/potentialCandidates" className="nav-link">
            Potential Candidates
          </NavLink>
        </li>   
      </ul>
    </nav>
  );
};

export default Nav;
