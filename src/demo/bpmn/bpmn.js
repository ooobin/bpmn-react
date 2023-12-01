import React, { Component } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import Diagram from "./diagram.bpmn";
import "./app.css";
import axios from "axios";

// 左边工具栏及编辑元素
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

// 右边属性面板
import "bpmn-js-properties-panel/dist/assets/properties-panel.css";
import {
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    CamundaPlatformPropertiesProviderModule,
} from "bpmn-js-properties-panel"; // use Camunda BPMN namespace
import camundaModdleDescriptors from "camunda-bpmn-moddle/resources/camunda";

class Bpmn extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.bpmnModeler = null;
    }

    componentDidMount() {
        this.initModeler();
    }

    /**
     * 初始化 bpmn modeler
     */
    initModeler = async () => {
        this.bpmnModeler = new BpmnModeler({
            container: "#canvas",
            height: "100vh",
            propertiesPanel: {
                parent: "#properties",
            },
            additionalModules: [
                BpmnPropertiesPanelModule,
                BpmnPropertiesProviderModule,
                CamundaPlatformPropertiesProviderModule,
            ],
            moddleExtensions: {
                camunda: camundaModdleDescriptors,
            },
        });

        await this.getDiagramXML();
        this.loadBpmnDiagram();
    };

    /**
     * 获取 bpmn diagram
     * @returns {Promise<unknown>} 异步对象，具有三种状态（pending、fulfilled、rejected）
     */
    getDiagramXML = async () => {
        const res = await axios.get("https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmnMock.bpmn");

        // 一旦setState操作完成，resolve就会被调用，Promise 就会解决
        return new Promise((resolve) => {
            this.setState(
                {
                    diagramXML: res.data,
                },
                resolve,
            );
        });
    };

    /**
     * 加载 bpmn diagram
     */
    loadBpmnDiagram = () => {
        if (this.state.diagramXML === undefined) {
            // 返回一个默认的 diagram
            this.bpmnModeler.importXML(Diagram);
        } else {
            this.bpmnModeler.importXML(this.state.diagramXML);
        }

        this.importSuccess();
    };

    /**
     * 导入 bpmn diagram 成功后的回调函数
     */
    importSuccess = () => {
        this.addModelerListener();
        this.addEventBusListener();
    };

    /**
     * 添加 modeler 监听事件
     */
    addModelerListener = () => {
        const events = ["shape.added", "shape.removed"];
        events.forEach((event) => {
            this.bpmnModeler.on(event, function (e) {});
        });
    };

    /**
     * 监听 eventBus 事件
     */
    addEventBusListener = () => {
        const eventTypes = ["element.click", "element.changed"];
        const eventBus = this.bpmnModeler.get("eventBus", true);
        eventTypes.forEach((eventType) => {
            eventBus.on(
                eventType,
                function (e) {
                    // 点击画布时，不做任何处理
                    if (e.element.type === "bpmn:Process") return;
                    console.log(e);
                }.bind(this),
            );
        });
    };

    /**
     * 保存 bpmn diagram
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

    render() {
        return (
            <div id="App">
                {/* Place where BPMN diagram will be rendered */}
                <div id="canvas"></div>
                {/* Additional panel for properties */}
                <div id="properties"></div>

                <button className="saveXML" onClick={this.handleSaveXML}>
                    保存为XML
                </button>
            </div>
        );
    }
}

export default Bpmn;
