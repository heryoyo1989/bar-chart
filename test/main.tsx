import { BarChart } from "src";
import ReactDOM from "react-dom";
import React from "react";
import { BarType } from "src/types";
import { Color } from "deltav";

function start() {
  const containter = document.getElementById('main');
  if (!containter) return;

  const barData: BarType[] = [];
  const names: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'Map', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const colors: Color[] = [
    [1, 0, 0, 1],
    [0, 1, 0, 1],
    [0, 0, 1, 1]
  ]
  for (let i = 0; i < 12; i++) {
    barData.push({
      label: names[i],
      value: 100 + 700 * Math.random(),
      color: colors[i % 3]
    })
  }

  ReactDOM.render(
    <BarChart
      data={barData}
      width={window.innerWidth * 0.8}
      height={window.innerHeight * 0.8}
      origin={[window.innerWidth * 0.1, window.innerHeight * 0.9]}
      labelFont="font"
      labelColor={[1, 1, 1, 1]}
      lineColor={[1, 1, 1, 1]}
      lineWidth={1}
    />,
    containter
  );
}

start();