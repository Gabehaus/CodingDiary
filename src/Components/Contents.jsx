import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import finalClockApp from "../images/finalClockApp.png";
import drumMachineApp from "../images/drumMachineApp.png";
import calcApp from "../images/calcApp.png";
import markdownApp from "../images/markdownApp.png";
import fathackerApp from "../images/fathackerApp.png";
import quoteGenApp from "../images/quoteGenApp.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Card from "./Card.jsx";

export default function Contents() {
  return (
    <div className="contentsBox">
      <h1 className="h1Contents">Coding Diary</h1>
      <h2 className="h2Contents">Gabriel Hauschildt</h2>
      <h2 className="profession">Software Developer</h2>
      <ul>
        <li>
          <Card
            className="cardClass"
            to={"/fatHacker"}
            pic={fathackerApp}
            title={"Fat Hacker Diet App"}
            tools={"React - Express - MongoDB - Node"}
          />
        </li>
        <li>
          <Card
            to={"/markdownPrev"}
            pic={markdownApp}
            title={"Markdown Previewer"}
            tools={"React - Node"}
          />
        </li>
        <li>
          <Card
            to={"/clock"}
            pic={finalClockApp}
            title={"Pomodoro Clock"}
            tools={"React - Node"}
          />
        </li>
        <li>
          <Card
            to={"/drumMach"}
            pic={drumMachineApp}
            title={"Drum Machine"}
            tools={"React - Node"}
          />
        </li>

        <li>
          {" "}
          <Card
            to={"/calculator"}
            pic={calcApp}
            title={"Calculator"}
            tools={"React - Node"}
          />
        </li>
        <li>
          <Card
            to={"/quoteGen"}
            pic={quoteGenApp}
            title={"Quote Generator"}
            tools={"React - Node"}
          />
        </li>
      </ul>
    </div>
  );
}
