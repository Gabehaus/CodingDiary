import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fathackerApp from "../images/fathackerApp.png";

export default function Card({ to, pic, title, tools }) {
  return (
    <div className="card">
      <Link to={to} className="link">
        <a>
          <img src={pic}></img>
        </a>
      </Link>
      <h3 className="h3Contents">{title}</h3>
      <h4 className="h4Contents">{tools}</h4>
      <Link to={to} className="buttonLink">
        <button className="entry">Diary Entry</button>
      </Link>
    </div>
  );
}
