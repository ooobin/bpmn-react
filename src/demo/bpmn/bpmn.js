import React, { Component } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import Diagram from "./diagram.bpmn";
import "./App.css";
import "bpmn-js/dist/assets/diagram-js.css"; // 左边工具栏及编辑元素
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/properties-panel.css"; // 右边属性面板
import {
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    CamundaPlatformPropertiesProviderModule,
} from "bpmn-js-properties-panel"; // use Camunda BPMN namespace
import camundaModdleDescriptors from "camunda-bpmn-moddle/resources/camunda";
import axios from "axios";

class Bpmn extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.bpmnModeler = null;
    }

    componentDidMount() {
        // 初始化 BpmnModeler
        this.initModeler();
    }

    getDiagramXML = () => {
        axios
            .get("https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmnMock.bpmn")
            .then((res) => {
                this.setState({
                    diagramXML: res.data,
                });
            });
    };

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

        // 获取 bpmn diagram
        this.getDiagramXML();
        // 加载 bpmn diagram
        this.loadBpmnDiagram();
    };

    loadBpmnDiagram = () => {
        if (this.state.diagramXML) {
            this.bpmnModeler.importXML(Diagram);
        } else {
            this.bpmnModeler.importXML(this.state.diagramXML);
        }

        this.importSuccess();
    };

    importSuccess = () => {
        // 添加绑定事件
        this.addModelerListener();
    };

    addModelerListener = () => {
        this.bpmnModeler.on("commandStack.changed", (e) => {
            console.log(e);
        });
    };

    handleSaveXML = () => {
        console.log("保存");
        this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
            if (err) {
                console.log(err);
            } else {
                console.log(xml);
            }
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
                    保存
                </button>
            </div>
        );
    }
}

export default Bpmn;
