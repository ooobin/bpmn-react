import React from "react";

class CustomPalette extends React.Component {
    constructor(props) {
        super(props);

        const { bpmnFactory, create, elementFactory, palette, translate } = this.props;
        this.bpmnFactory = bpmnFactory;
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;

        palette.registerProvider(this);
    }

    createTask = () => {
        const { bpmnFactory, create, elementFactory } = this;

        return function (event) {
            const businessObject = bpmnFactory.create("bpmn:Task");
            const shape = elementFactory.createShape({
                type: "bpmn:Task",
                businessObject,
            });
            console.log(shape);
            create.start(event, shape);
        };
    };

    getPaletteEntries = () => {
        const { translate } = this;

        return {
            "create.task": {
                group: "model",
                className: "icon-custom lindaidai-task",
                title: translate("创建任务"),
                action: {
                    dragstart: this.createTask(),
                    click: this.createTask(),
                },
            },
        };
    };
}
