export interface IBarOptions {
  height: number;
  label: String;
  value: number;
  color: [number, number, number, number];
}

export class Bar {
  height: number;
  label: String;
  value: number;
  color: [number, number, number, number];

  constructor(options: IBarOptions) {
    this.height = options.height;
    this.label = options.label;
    this.value = options.value;
    this.color = options.color;
  }
}