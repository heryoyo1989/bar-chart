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
  PickType,
  LabelInstance,
  EdgeInstance,
  SimpleEventHandler
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
  
  testProvider = {
    rectangles: new InstanceProvider<RectangleInstance>(),
    labels: new InstanceProvider<LabelInstance>(),
    lines: new InstanceProvider<EdgeInstance>()
  }

  constructor(props: IBarCharViewProps) {
    super(props);
    this.action = props.action;
    this.store = props.store;
    // this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.testProvider.rectangles.add(new RectangleInstance({
      position: [0, 0],
      color: [1, 1, 1, 1],
      size: [100, 300],
    }));
  }

  mouseOverHandler = (info: IPickInfo<RectangleInstance>) => {
    console.warn('Recs Mouse Over');
    info.instances.forEach(instance => {
      instance.color = [1, 1, 1, 1];
    });
  }

  handleClick() {
    console.warn('handle click');
  }

  makeSurface() {
    const element = document.createElement('div');
    element.style.width = '100%';
    element.style.height = '100%';
    const container = document.getElementById('main');
    if(container) container.appendChild(element);

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
        controller: new BasicCamera2DController({
          camera: cameras.main,
          startView: "main.main"
        }),
        simple: new SimpleEventHandler({

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
              createLayer(RectangleLayer, {
                data: providers.rectangles,
                key: `recs`,
                picking: PickType.SINGLE,
                onMouseOver:this.mouseOverHandler,
                onMouseOut: (info: IPickInfo<RectangleInstance>) => {
                  console.warn('Recs Mouse Out');
                },
                onMouseClick: (info: IPickInfo<RectangleInstance>) => {
                  console.warn('Recs Mouse Click');
                }

              }),
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
              
            ]
          }
        }
      })
    });

    return <div></div>;
  }

  render() {
    this.makeSurface();
    return false;
  }
}