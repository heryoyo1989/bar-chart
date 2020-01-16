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
  AutoEasingLoopStyle,
  RectangleLayer,
  EdgeLayer,
  EdgeType
} from "deltav";
import { BarChartAction } from "src/action";
import { BarChartStore } from "src/store";
import { observer } from "mobx-react";

const { random } = Math;

export interface IBarCharViewProps {
  action: BarChartAction;
  store: BarChartStore;
}

@observer export class BarChartView extends Component<IBarCharViewProps> {
  action: BarChartAction;
  store: BarChartStore;

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
              /*createLayer(CircleLayer, {
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
              })*/

              createLayer(EdgeLayer, {
                data: providers.lines,
                key: `lines`,
                type: EdgeType.LINE
              })
              , createLayer(RectangleLayer, {
                data: providers.rectangles,
                key: `recs`,
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