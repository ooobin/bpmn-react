import React from 'react';
import BpmnDiagram from './bpmn-diagram';

const App = () => {
    return (
        <div>
            <h1>BPMN Diagram</h1>
            <BpmnDiagram
                diagramUrl='http://localhost:8080/getProcessDefinitionXml?processDefinitionId=Process_loan:1:06417262-2bb2-11ef-8fc6-8efe7450640f'
                processInstanceId="2a66d593-2bb2-11ef-8fc6-8efe7450640f"
            />
        </div>
    );
};

export default App;
