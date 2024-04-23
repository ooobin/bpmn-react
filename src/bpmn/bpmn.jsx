import { Component } from "react";
import "./bmpn.css";
import FileSaver from 'file-saver';
import axios from 'axios';

// Bpmn modules
import BpmnModeler from "bpmn-js/lib/Modeler";
import customTranslate from "./translation/custom-translate";
import BpmnColorPickerModule from 'bpmn-js-color-picker';

// 左侧工具栏和画板图像
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
  }

  /**
   * Initialize bpmn modeler
   */
  initModeler = async () => {
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
        parent: "#properties-panel",
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

    // Load diagram
    await this.bpmnModeler.createDiagram();
    // Fit diagram to viewport
    this.bpmnModeler.get('canvas').zoom('fit-viewport');
  }

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

  /**
   * Save diagram as XML
   */
  saveDiagram = async () => {
    const result = await this.bpmnModeler.saveXML({ format: true });
    const { xml } = result

    let blob = new Blob([xml], { type: 'text/xml' });
    FileSaver.saveAs(blob, 'diagram.bpmn');
  }

  /**
   * Save diagram as SVG
   */
  saveSVG = async () => {
    const result = await this.bpmnModeler.saveSVG({ format: true });
    const { svg } = result

    let blob = new Blob([svg], { type: 'image/svg+xml' });
    FileSaver.saveAs(blob, 'diagram.svg');
  }

  /**
   * Submit diagram to Camunda
   *
   * @returns {Promise<void>}
   */
  submitDiagramToCamunda = async () => {
    const result = await this.bpmnModeler.saveXML({ format: true });
    const { xml } = result;

    axios.post('http://localhost:8080/deployProcessDefinition', { bpmnXml: xml }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        console.log(res);
        alert('Diagram submitted to Camunda successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to submit diagram to Camunda')
      });
  }


  /**
   * Handle file change
   *
   * @param event event
   */
  handleFileChange = (event) => {
    const bpmnFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(bpmnFile);

    // readAsText 执行完会自动执行 onload 方法
    reader.onload = (event) => {
      const xml = event.target.result;
      console.log(xml)

      this.bpmnModeler.importXML(xml)
        .then(result => {
          const { warnings } = result;
          console.log("BPMN diagram loaded successfully!", warnings);
        })
        .catch((err) => {
          const { warnings, message } = err;
          console.log("Something went wrong:", warnings, message);
        });
    };
  }

  render() {
    return (
      <div id="App">
        <div id="canvas"></div>
        <div id="properties-panel"></div>
        <div id="canvas-toolbox">
          <button
            className="canvas-toolbox-button"
            onClick={this.saveDiagram}
          >
            导出为 BPMN 文件
          </button>
          <button
            className="canvas-toolbox-button"
            onClick={this.saveSVG}
          >
            导出为 SVG 图像
          </button>

          <input
            type="file"
            id="bpmnFile"
            style={{ display: 'none' }}
            onChange={this.handleFileChange}
          />
          <button
            className="canvas-toolbox-button"
            onClick={() => document.getElementById('bpmnFile').click()}
          >
            导入
          </button>
          <button
            className="canvas-toolbox-button"
            onClick={() => this.bpmnModeler.createDiagram()}
          >
            新建
          </button>
          <button
            className="canvas-toolbox-button"
            onClick={this.submitDiagramToCamunda}
          >
            部署
          </button>
        </div>
      </div>
    );
  }
}

export default Bpmn;
