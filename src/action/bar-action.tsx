import { BarStore } from "../store";

export class BarAction {
  store: BarStore;

  addRandomData() {
    const x = 300 * Math.random();
    const y = 500 * Math.random();

    if (this.store) {
      this.store.addCircle(x, y);
    }


    console.warn("new random data");
  }
}