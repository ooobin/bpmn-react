import React, { useEffect, useState } from 'react';
import axios from "axios";

const FormEditorComponent = () => {

    const [formsData, setFormsData] = useState([]);

    useEffect(() => {
        document.title = 'Form Viewer';

        getTasks();
    }, []);

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

    return (
        <>
            <select name="options" style={{ display: "block", width: '200px' }}>
                {formsData && formsData.map((item, index) => {
                    return (
                        <option key={index} value={item.id}>{item.id}</option>
                    )
                })}
            </select>
        </>
    )
}

export default FormEditorComponent;