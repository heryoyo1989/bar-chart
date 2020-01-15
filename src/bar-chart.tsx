import React, { Component } from "react";
import { BarChartView } from "./view/bar-chart-view";
import { BarStore } from "./store";
import { BarAction } from "./action";


export interface IBarChartProps {
  data: [number, number][];
}

export class BarChart extends Component<IBarChartProps>{
  store: BarStore;
  action: BarAction;

  constructor(props: IBarChartProps) {
    super(props);

    this.store = new BarStore({ datas: props.data });
    this.action = new BarAction();
    this.action.store = this.store;
  }

  render() {
    return <BarChartView store={this.store} action={this.action} />;
  }

}