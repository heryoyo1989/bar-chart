import { BarChart } from "src";
import ReactDOM from "react-dom";
import React from "react";

function start() {
  const containter = document.getElementById('main');
  if (!containter) return;

  ReactDOM.render(<BarChart />, containter);
}

start();