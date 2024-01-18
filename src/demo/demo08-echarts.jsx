import React from 'react';
import * as echarts from 'echarts';

class Echarts extends React.Component {
    componentDidMount() {
        this.echartsInit();
    }

    echartsInit = () => {
        const myChart = echarts.init(document.getElementById('bar-echarts'));
        myChart.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                }
            ]
        });
    };

    render() {
        return (
            <div id="bar-echarts" style={{ height: '400px', width: '50vw', margin: '0 auto' }}/>
        );
    }
}

export default Echarts;
