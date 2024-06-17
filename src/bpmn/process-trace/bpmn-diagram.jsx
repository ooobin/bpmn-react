import React, {useEffect, useRef, useState} from 'react';
import BpmnViewer from 'bpmn-js';
import http from '../../base/http';
import axios from "axios";
import './bpmn-diagram.css';

const BpmnDiagram = ({diagramUrl, processInstanceId}) => {
    const canvasRef = useRef(null);
    const [viewer, setViewer] = useState(null);

    useEffect(() => {
        initializeBpmnViewer();
    }, []);

    useEffect(() => {
        if (viewer) {
            highlightCurrentTask();
        }
    }, [viewer]);

    const initializeBpmnViewer = () => {
        if (canvasRef.current) {
            const viewerInstance = new BpmnViewer({
                container: canvasRef.current
            });

            setViewer(viewerInstance);

            http.get(diagramUrl)
                .then(res => {
                    viewerInstance.importXML(res).then(() => {
                        viewerInstance.get('canvas').zoom('fit-viewport');
                    }).catch(function (err) {
                        const {warnings, message} = err;
                        console.log('something went wrong:', warnings, message);
                    });
                })
        }
    };

    const highlightCurrentTask = () => {
        axios.get(`/engine-rest/process-instance/${processInstanceId}/activity-instances`)
            .then(response => {
                const activities = response.data.childActivityInstances;
                const canvas = viewer.get('canvas');
                activities.forEach(activity => {
                    canvas.addMarker(activity.activityId, 'highlight');
                });
            });
    };

    return <div ref={canvasRef} style={{width: '100%', height: '100vh'}}/>;
};

export default BpmnDiagram;