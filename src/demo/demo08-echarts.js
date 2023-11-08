import React from 'react';
import * as echarts from 'echarts';

class Echarts extends React.Component {
  // 组件渲染完成时触发
  componentDidMount() {
    this.echartsInit();
  }

  echartsInit = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('echarts'));
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例',
      },
      tooltip: {},
      xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      },
      yAxis: [
        {
          type: 'value',
          name: '降水量',
          position: 'left',
          axisLabel: {
            formatter: '{value} ml',
          },
        },
        {
          type: 'value',
          name: '温度',
          position: 'right',
          axisLabel: {
            formatter: '{value} °C',
          },
        },
      ],
      series: [
        {
          name: '降水量',
          type: 'bar',
          yAxisIndex: 0,
          data: [10, 40, 72, 20, 20, 40],
          itemStyle: {
            color: 'black',
            barBorderRadius: [5, 5, 0, 0],
          },
        },
        {
          name: '温度',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          data: [5, 20, 36, 10, 10, 20],
          lineStyle: {
            normal: {
              color: 'green',
              width: 3,
              type: 'dashed',
            },
          },
        },
      ],
    });
  };

  render() {
    return (
      <div id="echarts">
        <div className="demo-component">
          <br />
          <br />
          <div id="echarts" style={{ height: '400px', width: '50vw', margin: '0 auto' }} />
        </div>
      </div>
    );
  }
}

export default Echarts;
