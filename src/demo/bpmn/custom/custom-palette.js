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

        function createTask() {
            return function (event) {
                const shape = elementFactory.createShape({
                    type: "bpmn:Task",
                });
                create.start(event, shape);
            };
        }

        return {
            "create.task": {
                className: "bpmn-icon-task", // 样式类名，修改样式使用
                title: "创建任务", // 鼠标悬浮时的提示信息
                action: {
                    // 操作
                    dragstart: createTask(), // 开始拖拽时调用的事件
                    click: createTask(), // 点击时调用的事件
                },
            },
        };
    }
}

// 使用$inject注入一些需要的变量
CustomPalette.$inject = ["bpmnFactory", "create", "elementFactory", "palette"];

export default CustomPalette;
