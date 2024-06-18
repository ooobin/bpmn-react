import React, { useEffect, useState } from 'react';
import BpmnDiagram from './bpmn-diagram';
import axios from "axios";

const App = () => {

    const [definitionId, setDefinitionId] = useState('');
    const [processInstanceId, setProcessInstanceId] = useState('');

    useEffect(() => {
        getProcessInstanceId();
    })

    const getProcessDefinitionXml = () => {
    }

    const getProcessInstanceId = () => {
        axios.get('/engine-rest/process-instance')
            .then(response => {
                console.log(response.data);
                setDefinitionId(response.data[0].definitionId);
                setProcessInstanceId(response.data[0].id);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <h1>BPMN Diagram</h1>
            {
                definitionId && <BpmnDiagram
                    diagramUrl={'http://localhost:8080/getProcessDefinitionXml?processDefinitionId=' + definitionId}
                    processInstanceId={processInstanceId}
                />
            }
        </div>
    );
};

export default App;
