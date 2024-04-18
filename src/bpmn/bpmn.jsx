import React, { Component } from "react";
import "./bmpn.css";
import { Button } from "antd";
import Diagram from "./diagram.bpmn";

// BpmnModeler
import BpmnModeler from "bpmn-js/lib/Modeler";
import customTranslate from "./translation/custom-translate";
import BpmnColorPickerModule from 'bpmn-js-color-picker';

// 工具栏及图像相关
import 'bpmn-js/dist/assets/bpmn-js.css';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-color-picker/colors/color-picker.css";

// 右侧属性面板
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule
} from 'bpmn-js-properties-panel';
import '@bpmn-io/properties-panel/assets/properties-panel.css';
import CamundaBpmnModdle from 'camunda-bpmn-moddle/resources/camunda.json'

class Bpmn extends Component {
  constructor(props) {
    super(props);
    this.bpmnModeler = null;
  }

  componentDidMount() {
    this.initModeler();
    this.handleBgDrag();
    this.bpmnModeler.importXML(Diagram);
    this.successfulImported();
  }

  /**
   * Initialize bpmn modeler
   */
  initModeler = () => {
    // Our custom translation module
    // We need to use the array syntax that is used by bpmn-js internally
    // 'value' tells bmpn-js to use the function instead of trying to instanciate it
    const customTranslateModule = {
      translate: ['value', customTranslate]
    };

    this.bpmnModeler = new BpmnModeler({
      container: "#canvas",
      height: "100vh",
      propertiesPanel: {
        parent: "#properties",
      },
      additionalModules: [
        BpmnColorPickerModule,
        customTranslateModule,
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        CamundaPlatformPropertiesProviderModule
      ],
      moddleExtensions: {
        camunda: CamundaBpmnModdle
      }
    });
  }

  /**
   * Successful imported
   */
  successfulImported = () => {
    this.eventsListener();
  };

  /**
   * eventsListener
   */
  eventsListener = () => {
    const events = ["element.click"];
    events.forEach((event) => {
      this.bpmnModeler.on(event, function (e) {
        /// Print the extension properties
        // const businessObject = e.element.businessObject;
        // if (businessObject.extensionElements) {
        //   businessObject.extensionElements.values.forEach((extensionElement) => {
        //     if (extensionElement.$type === 'camunda:Properties') {
        //       extensionElement.values.forEach((property) => {
        //         console.log(`Property name: ${property.name}, value: ${property.value}`);
        //       });
        //     }
        //   });
        // }
      });
    });
  };

  /**
   * Save bpmn diagram
   */
  handleSaveXML = () => {
    this.bpmnModeler
      .saveXML({ format: true })
      .then((xml) => {
        console.log(xml);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Handle background drag
   */
  handleBgDrag = () => {
    const canvas = document.querySelector("#canvas");

    // 以下代码块为触控板或滚轮移动时的背景图像移动
    {
      // 初始背景图片的位置
      let x = 50,
        y = 50;
      let speedFactor = 76; // 调整这个值来改变背景移动的速度

      canvas.addEventListener("wheel", (e) => {
        x -= (e.deltaX / canvas.offsetWidth) * speedFactor;
        y -= (e.deltaY / canvas.offsetHeight) * speedFactor;
        canvas.style.backgroundPosition = `${x}% ${y}%`;
      });
    }

    // 以下代码块为鼠标拖动时的背景图像移动
    {
      let isMouseDown = false;
      canvas.addEventListener("mousedown", (e) => {
        // 按下鼠标左键和滚轮时
        if (e.button === 0 || e.button === 1) {
          isMouseDown = true;
        }
      });

      canvas.addEventListener("mouseup", () => {
        isMouseDown = false;
      });

      canvas.addEventListener("mousemove", (e) => {
        if (isMouseDown) {
          const x = (e.clientX / canvas.offsetWidth) * 100;
          const y = (e.clientY / canvas.offsetHeight) * 100;
          canvas.style.backgroundPosition = `${x}% ${y}%`;
        }
      });
    }

    // 以下代码块为 Palette 抓手工具移动时的背景图像移动
    {
      let lastMousePosition = { x: 0, y: 0 };

      // 监听鼠标移动事件，更新鼠标位置
      canvas.addEventListener("mousemove", function (e) {
        lastMousePosition.x = e.clientX;
        lastMousePosition.y = e.clientY;
      });

      this.bpmnModeler.on("hand.move.move", function () {
        const x = (lastMousePosition.x / canvas.offsetWidth) * 100;
        const y = (lastMousePosition.y / canvas.offsetHeight) * 100;
        canvas.style.backgroundPosition = `${x}% ${y}%`;
      });
    }
  };

  render() {
    return (
      <div id="App">
        <div id="canvas">
          <div class="canvas-toolbox">
            <Button onClick={this.handleSaveXML}>
              保存
            </Button>
          </div>
        </div>
        <div id="properties"></div>
      </div>
    );
  }
}

export default Bpmn;
