import { InstanceProvider, CircleInstance, RectangleInstance, LabelInstance, EdgeInstance } from "deltav";
import { Bar } from "../view/bar";

export interface IBarChartStoreOptions {
  barData: Bar[];
  origin: [number, number];
  width: number;
  height: number;
}

export class BarChartStore {
  providers = {
    rectangles: new InstanceProvider<RectangleInstance>(),
    labels: new InstanceProvider<LabelInstance>(),
    lines: new InstanceProvider<EdgeInstance>()
  }

  constructor(options: IBarChartStoreOptions) {
    const {
      barData,
      origin,
      width,
      height
    } = options;

    // Horizon Line
    const horizonLine = new EdgeInstance({
      start: origin,
      end: [origin[0] + width, origin[1]]
    });
    this.providers.lines.add(horizonLine);

    // Vertical Line
    const verticalLine = new EdgeInstance({
      start: origin,
      end: [origin[0], origin[1] - height]
    })
    this.providers.lines.add(verticalLine);


    const barWidth = width / barData.length;
    const barRecWidth = 0.8 * barWidth;

    for (let i = 0, endi = barData.length; i < endi; i++) {
      const bar = barData[i];
      // Rectangle

      console.warn("color", bar.color, bar.height);

      const rectangle = new RectangleInstance({
        position: [origin[0] + (i + 0.1) * barWidth, origin[1] - bar.height],
        color: bar.color,
        size: [barRecWidth, bar.height],
      });

      this.providers.rectangles.add(rectangle);

      // label
    }



  }
}