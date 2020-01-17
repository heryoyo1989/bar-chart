import React, { Component, ReactNode } from "react";
import {
  BasicSurface,
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
  EdgeType,
  LabelLayer,
  IPickInfo,
  RectangleInstance,
  PickType
} from "deltav";
import { BarChartAction } from "src/action";
import { BarChartStore } from "src/store";
import { observer } from "mobx-react";
import { DEFAULT_RESOURCES } from "src/types";

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
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
  }

  mouseOverHandler = (info: IPickInfo<RectangleInstance>) => {
    console.warn('Recs Mouse Over');
    info.instances.forEach(instance => {
      instance.color = [1, 1, 1, 1];
    });
  }

  makeSurface() {
    const element = document.createElement('div');
    document.body.appendChild(element);
    element.style.width = '100%';
    element.style.height = '100%';
    element.onclick = () => {
      console.warn("element click");
    }

    const surface = new BasicSurface({
      container: element,
      providers: this.store.providers,
      cameras: {
        main: new Camera2D()
      },
      resources: {
        font: DEFAULT_RESOURCES.font
      },
      eventManagers: cameras => ({
        main: new BasicCamera2DController({
          camera: cameras.main,
          startView: ["main.main"]
        })
      }),
      scenes: (resources, providers, cameras) => ({
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
              createLayer(EdgeLayer, {
                data: providers.lines,
                key: `lines`,
                type: EdgeType.LINE
              }),
              createLayer(LabelLayer, {
                data: providers.labels,
                key: `labels`,
                resourceKey: resources.font.key,
              }),
              createLayer(RectangleLayer, {
                data: providers.rectangles,
                key: `recs`,
                picking: PickType.SINGLE,
                onMouseOver: () => {
                  console.warn("over");
                },
                onMouseOut: (info: IPickInfo<RectangleInstance>) => {
                  console.warn('Recs Mouse Out');
                },
                onMouseClick: (info: IPickInfo<RectangleInstance>) => {
                  console.warn('Recs Mouse Click');
                }

              })
            ]
          }
        }
      })
    });

    return <div></div>;
  }

  render() {
    return <div onClick={() => { console.warn("dive mouse over") }}>
      {this.makeSurface()}
    </div>;
  }
}