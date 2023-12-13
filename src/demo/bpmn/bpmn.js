import React, { Component } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import Diagram from "./diagram.bpmn";
import "./app.scss";
import axios from "axios";

// 左边工具栏及编辑元素
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

// 汉化
import customTranslation from "./translation/custom-translation";

class Bpmn extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.bpmnModeler = null;
    }

    componentDidMount() {
        this.initModeler();
        this.addBackgroundMovementListener();
    }

    /**
     * 初始化 bpmn modeler
     */
    initModeler = async () => {
        // 汉化配置
        const customTranslateModule = {
            translate: ["value", customTranslation],
        };

        this.bpmnModeler = new BpmnModeler({
            container: "#canvas",
            height: "100vh",
            additionalModules: [
                // 汉化
                customTranslateModule,
            ],
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
     * 导入 bpmn diagram 成功后的箭头函数
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

    /**
     * 添加背景移动监听事件
     */
    addBackgroundMovementListener = () => {
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
                {/* Place where BPMN diagram will be rendered */}
                <div id="canvas"></div>

                <button className="saveXML" onClick={this.handleSaveXML}>
                    保存为XML
                </button>
            </div>
        );
    }
}

export default Bpmn;
