import { InstanceProvider, CircleInstance } from "deltav";

export interface IBarStoreOptions {
  datas: [number, number][];
}

export class BarStore {
  providers = {
    circles: new InstanceProvider<CircleInstance>()
  }

  constructor(options: IBarStoreOptions) {
    const datas = options.datas;

    for (let i = 0; i < datas.length; i++) {
      const x = datas[i][0];
      const y = datas[i][1];
      const circleInstance = new CircleInstance({
        center: [x, y],
        radius: 10,
        color: [0, 0, 1, 1]
      });

      this.providers.circles.add(circleInstance);
    }
  }

  addCircle(x: number, y: number) {
    const circleInstance = new CircleInstance({
      center: [x, y],
      radius: 10,
      color: [0, 0, 1, 1]
    });

    this.providers.circles.add(circleInstance);
  }
}