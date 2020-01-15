import React, { Component, ReactNode } from "react";
import {
  BasicSurface,
  CircleInstance,
  InstanceProvider,
  Camera2D,
  BasicCamera2DController,
  createView,
  View2D,
  ClearFlags,
  createLayer,
  CircleLayer,
  AutoEasingMethod,
  AutoEasingLoopStyle
} from "deltav";
import { BarAction } from "src/action";
import { BarStore } from "src/store";
import { observer } from "mobx-react";

const { random } = Math;

export interface IBarCharViewProps {
  action: BarAction;
  store: BarStore;
}

@observer export class BarChartView extends Component<IBarCharViewProps> {
  action: BarAction;
  store: BarStore;

  constructor(props: IBarCharViewProps) {
    super(props);
    this.action = props.action;
    this.store = props.store;
  }

  makeSurface() {
    const element = document.createElement('div');
    document.body.appendChild(element);
    element.style.width = '100%';
    element.style.height = '100%';

    const surface = new BasicSurface({
      container: element,
      providers: this.store.providers,
      cameras: {
        main: new Camera2D()
      },
      resources: {},
      eventManagers: cameras => ({
        main: new BasicCamera2DController({
          camera: cameras.main,
          startView: ["main.main"]
        })
      }),
      scenes: (_resources, providers, cameras) => ({
        resources: [],
        scenes: {
          main: {
            views: {
              main: createView(View2D, {
                camera: cameras.main,
                background: [0, 0, 0, 1],
                clearFlags: [ClearFlags.COLOR, ClearFlags.DEPTH]
              })
            },
            layers: [
              createLayer(CircleLayer, {
                animate: {
                  center: AutoEasingMethod.easeInOutCubic(
                    2000,
                    0,
                    AutoEasingLoopStyle.NONE
                  )
                },
                data: providers.circles,
                key: `circles`,
                scaleFactor: () => cameras.main.scale2D[0],
                onMouseClick: () => {
                  console.warn("mouse click");
                  // this.action.addRandomData();
                },
                usePoints: true
              })
            ]
          }
        }
      })
    });

    return false;
  }

  render() {
    return <div>
      <button onClick={() => this.action.addRandomData()}>Add</button>
      {this.makeSurface()}
    </div>;
  }
}