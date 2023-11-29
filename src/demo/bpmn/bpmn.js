import React, { Component } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import diagram from "./diagram.bpmn";
import "./App.css";

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
} from "bpmn-js-properties-panel";

// use Camunda BPMN namespace
import camundaModdleDescriptors from "camunda-bpmn-moddle/resources/camunda";

class Bpmn extends Component {
    constructor(props) {
        super(props);
        this.bpmnModeler = null;
    }

    componentDidMount() {
        // 初始化 bpmnModeler
        this.initModeler();
    }

    initModeler = () => {
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

        // 加载 bpmn diagram
        this.loadBpmnDiagram();
    };

    loadBpmnDiagram = async () => {
        try {
            this.bpmnModeler.importXML(diagram);
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <div id="App">
                {/* Place where BPMN diagram will be rendered */}
                <div id="canvas"></div>
                {/* Additional panel for properties */}
                <div id="properties"></div>
            </div>
        );
    }
}

export default Bpmn;
