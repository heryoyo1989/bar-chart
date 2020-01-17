import { BarChartStore } from "../store";

export class BarChartAction {
  store: BarChartStore;

  addRandomData() {
    const x = 300 * Math.random();
    const y = 500 * Math.random();

    console.warn("new random data");
  }
}