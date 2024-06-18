// Import styles
import '@bpmn-io/form-js-viewer/dist/assets/form-js.css';
import '@bpmn-io/form-js-viewer/dist/assets/form-js-base.css';
import '@bpmn-io/form-js-viewer/dist/assets/flatpickr/light.css';
import '@bpmn-io/form-js-editor/dist/assets/dragula.css';
import '@bpmn-io/form-js-editor/dist/assets/form-js-editor.css';
import '@bpmn-io/form-js-editor/dist/assets/form-js-editor-base.css';
import '@bpmn-io/form-js-editor/dist/assets/properties-panel.css';

// Import dependencies
import React, { useEffect, useRef } from 'react';
import { FormEditor } from '@bpmn-io/form-js-editor';
import schema from './schema.json';
import axios from "axios";

const FormEditorComponent = () => {
    const formRef = useRef(null);
    let formEditor = null;

    useEffect(() => {
        document.title = 'Form Editor';

        formEditor = new FormEditor({
            container: formRef.current,
        });
        formEditor.importSchema(schema).catch((error) => {
            console.error('Failed to import schema', error);
        });

        return () => {
            if (formEditor) {
                formEditor.destroy();
            }
        };
    }, []);

    function openForm(form) {
        return formEditor.importSchema(form).then(() => {

        }).catch((error) => {
            console.error('form open error', error);
        });
    }

    function createDiagram() {
        const INITIAL_FORM = {
            "components": [],
            "type": "default",
        };

        openForm(INITIAL_FORM);
    }

    const deploy = () => {
        const formSchema = formEditor.getSchema();

        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify(formSchema)], { type: 'application/json' }), 'form.json');

        axios.post('/engine-rest/deployment/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }

    return (
        <>
            <div ref={formRef} style={{ width: '100vw', height: '95vh' }}></div>
            <div
                style={{ height: '4vh', backgroundColor: 'white', borderTop: '1px solid #ccc' }}
            >
                <button onClick={createDiagram}>Create Diagram</button>
                <button onClick={deploy}>Deploy</button>
            </div>
        </>
    )
};

export default FormEditorComponent;