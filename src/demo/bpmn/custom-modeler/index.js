import Modeler from "bpmn-js/lib/Modeler";
import inherits from "inherits"; // 通常用于实现继承
import CustomModule from "./custom";

export default function CustomModeler(options) {
    // 调用 Modeler 类构造函数
    Modeler.call(this, options);
}

// 继承 Modeler 属性方法
inherits(CustomModeler, Modeler);
// 将 CustomModule 添加到 _modules 数组中
CustomModeler.prototype._modules = [].concat(CustomModeler.prototype._modules, [CustomModule]);
