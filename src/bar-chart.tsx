import React, { Component } from "react";
import { BarChartView } from "./view/bar-chart-view";
import { BarChartStore } from "./store";
import { BarChartAction } from "./action";
import { Color } from "deltav";
import { BarType } from "./types";
import { Bar } from "./view/bar";


export interface IBarChartProps {
  data: BarType[];
  width: number;
  height: number;
  origin: [number, number];

  labelFont: string;
  labelColor: Color;

  lineColor: Color;
  lineWidth: number;
}

export class BarChart extends Component<IBarChartProps>{
  store: BarChartStore;
  action: BarChartAction;

  constructor(props: IBarChartProps) {
    super(props);

    //this.store = new BarStore({ datas: props.data });
    this.action = new BarChartAction();
    //this.action.store = this.store;
    this.init(props);
  }

  init(props: IBarChartProps) {
    const barData = props.data;
    const barNumber = barData.length;

    // Width
    const width = props.width;
    const shrink = 0.8;
    const barWidth = width / barNumber;
    // const barRecWidth = shrink * barWidth;

    // Height
    let maxValue = 0;
    barData.forEach(d => maxValue = Math.max(d.value, maxValue));
    const height = props.height;

    // Bars
    const bars: Bar[] = [];

    for (let i = 0; i < barNumber; i++) {
      const bar = barData[i];
      bars.push(new Bar({
        height: bar.value * height / maxValue,
        label: bar.label,
        value: bar.value,
        color: bar.color
      }))
    }

    // Lines origin + width & height

    // Labels follow bars

    this.store = new BarChartStore({
      barData: bars,
      origin: props.origin,
      width,
      height
    });

    this.action.store = this.store;
  }

  render() {
    return <BarChartView store={this.store} action={this.action} />;
  }

}