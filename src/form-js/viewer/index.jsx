import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { Form } from '@bpmn-io/form-js';

const FormEditorComponent = () => {

    const [formsData, setFormsData] = useState([]);
    const formRef = useRef(null);

    useEffect(() => {
        document.title = 'Form Viewer';

        getTasks();
    }, []);

    useEffect(() => {
        if (formsData.length > 0) {
            initializeForm();
        }
    }, [formsData]);

    const getTasks = () => {
        axios.get('/engine-rest/deployment')
            .then(response => {
                const deployments = response.data;
                deployments.forEach(deployment => {
                    axios.get(`/engine-rest/deployment/${deployment.id}/resources`)
                        .then(res => {
                            const resources = res.data;
                            resources.forEach(resource => {
                                if (resource.name === 'form.json') {
                                    axios.get(`/engine-rest/deployment/${deployment.id}/resources/${resource.id}/data`)
                                        .then(res => {
                                            console.log(res.data);
                                            // 这里是表单的内容
                                            setFormsData(prevFormsData => [...prevFormsData, res.data]);
                                        })
                                        .catch(error => console.error(error));
                                }
                            });
                        })
                        .catch(error => console.error(error));
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    const initializeForm = () => {
        const form = new Form({
            container: formRef.current,
        });

        form.importSchema(formsData[0]);
    }

    return (
        <>
            <div ref={formRef}></div>
        </>
    )
}

export default FormEditorComponent;