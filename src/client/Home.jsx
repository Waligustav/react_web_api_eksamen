import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="mainContainer">
      <h1>Overview</h1>
      <li>
        <Link to="/profile">Current user</Link>
      </li>
      <h3>-- Profiles section --</h3>
      <li>
        <Link to="/users">Show profiles</Link>
      </li>
      <li>
        <Link to={"/create"}>Create profile</Link>
      </li>
      <h3>-- Chat section --</h3>
      <li>
        <Link to="/chat">Chat</Link>
      </li>
    </div>
  );
};
