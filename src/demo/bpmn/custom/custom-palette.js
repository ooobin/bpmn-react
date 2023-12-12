class CustomPalette {
    constructor(bpmnFactory, create, elementFactory, palette) {
        this.bpmnFactory = bpmnFactory;
        this.create = create;
        this.elementFactory = elementFactory;

        // 指定此类是个 Palette
        palette.registerProvider(this);
    }

    /**
     * 重写此方法，返回自定义的 Palette Entries
     */
    getPaletteEntries(element) {
        const { create, elementFactory } = this;

        function customAction() {
            return function (event) {
                const shape = elementFactory.createShape({
                    type: "bpmn:Custom",
                });
                create.start(event, shape);
            };
        }

        return {
            "create.custom": {
                className: "bpmn-icon-custom", // 样式类名，修改样式使用
                title: "自定义节点", // 鼠标悬浮时的提示信息
                action: {
                    // 操作
                    dragstart: customAction(), // 开始拖拽时调用的事件
                    click: customAction(), // 点击时调用的事件
                },
            },
        };
    }
}

// 使用$inject注入一些需要的变量
CustomPalette.$inject = ["bpmnFactory", "create", "elementFactory", "palette"];

export default CustomPalette;
