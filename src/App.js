import React, { useState, useEffect } from "react";

import "./App.css";

import { render } from "react-dom";

import { NavLink } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Contents from "./Components/Contents.jsx";
import Clock2 from "./Components/Clock2.jsx";
import QuoteGen from "./Components/QuoteGen.jsx";
import DrumMach from "./Components/DrumMach.jsx";
import Calculator from "./Components/Calculator.jsx";
import Markdown from "./Components/Markdown.jsx";
import FatHacker from "./Components/FatHacker.jsx";

function App(props) {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Contents} />
      <Route exact path="/clock" component={Clock2} />
      <Route exact path="/quoteGen" component={QuoteGen} />
      <Route exact path="/drumMach" component={DrumMach} />
      <Route exact path="/calculator" component={Calculator} />
      <Route exact path="/markdownPrev" component={Markdown} />
      <Route exact path="/fathacker" component={FatHacker} />
    </BrowserRouter>
  );
}

export default App;
