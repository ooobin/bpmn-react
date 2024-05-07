import DmnModeler from 'dmn-js/lib/Modeler';
import { useEffect } from 'react';
import http from '../base/http';
import '../bpmn/index.css';
import FileSaver from 'file-saver';

// style
import "dmn-js/dist/assets/diagram-js.css";
import "dmn-js/dist/assets/dmn-font/css/dmn-embedded.css";
import "dmn-js/dist/assets/dmn-js-decision-table-controls.css";
import "dmn-js/dist/assets/dmn-js-decision-table.css";
import "dmn-js/dist/assets/dmn-js-drd.css";
import "dmn-js/dist/assets/dmn-js-literal-expression.css";
import "dmn-js/dist/assets/dmn-js-shared.css";

const DmnTable = () => {
  let dmnModeler = null;

  useEffect(() => {
    document.title = 'DMN Table';
    initModeler();
    handleBgDrag();

    // 返回一个清理函数
    return () => {
      if (dmnModeler) {
        // 销毁 dmnModeler 的实例
        dmnModeler.destroy();
      }
    };
  }, []);

  const initModeler = () => {
    dmnModeler = new DmnModeler({
      container: "#canvas",
      height: "100vh",
    });

    newDiagram();
  }

  /**
   * Handle background drag
   */
  const handleBgDrag = () => {
    const canvas = document.querySelector("#canvas");

    // 以下代码块为触控板或滚轮移动时的背景图像移动
    {
      // 初始背景图片的位置
      let x = 50,
        y = 50;
      let speedFactor = 76; // 调整这个值来改变背景移动的速度

      canvas.addEventListener("wheel", (e) => {
        x -= (e.deltaX / canvas.offsetWidth) * speedFactor;
        y -= (e.deltaY / canvas.offsetHeight) * speedFactor;
        canvas.style.backgroundPosition = `${x}% ${y}%`;
      });
    }

    // 以下代码块为鼠标拖动时的背景图像移动
    {
      let isMouseDown = false;
      canvas.addEventListener("mousedown", (e) => {
        // 按下鼠标左键和滚轮时
        if (e.button === 0 || e.button === 1) {
          isMouseDown = true;
        }
      });

      canvas.addEventListener("mouseup", () => {
        isMouseDown = false;
      });

      canvas.addEventListener("mousemove", (e) => {
        if (isMouseDown) {
          const x = (e.clientX / canvas.offsetWidth) * 100;
          const y = (e.clientY / canvas.offsetHeight) * 100;
          canvas.style.backgroundPosition = `${x}% ${y}%`;
        }
      });
    }

    // 以下代码块为 Palette 抓手工具移动时的背景图像移动
    {
      let lastMousePosition = { x: 0, y: 0 };

      // 监听鼠标移动事件，更新鼠标位置
      canvas.addEventListener("mousemove", function (e) {
        lastMousePosition.x = e.clientX;
        lastMousePosition.y = e.clientY;
      });

      dmnModeler.on("hand.move.move", function () {
        const x = (lastMousePosition.x / canvas.offsetWidth) * 100;
        const y = (lastMousePosition.y / canvas.offsetHeight) * 100;
        canvas.style.backgroundPosition = `${x}% ${y}%`;
      });
    }
  };

  /**
   * new diagram
   */
  const newDiagram = () => {
    // dmn 1.3
    const newDiagramXML = '<?xml version="1.0" encoding="UTF-8"?>' +
      '<definitions id="definitions" ' +
      'xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" ' +
      'xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" ' +
      'xmlns:di="https://www.omg.org/spec/DMN/20191111/DI/" ' +
      'xmlns:dc="https://www.omg.org/spec/DMN/20191111/DC/" ' +
      'xmlns:camunda="http://camunda.org/schema/1.0/dmn">' +
      '</definitions>';

    dmnModeler.importXML(newDiagramXML, (err) => {
      if (err) {
        console.error('Error rendering DMN diagram', err);
      } else {
        console.log('DMN diagram rendered');
      }
    })
  }

  /**
   * Save diagram as XML
   */
  const saveDiagram = async () => {
    const result = await dmnModeler.saveXML({ format: true });
    const { xml } = result

    let blob = new Blob([xml], { type: 'text/xml' });
    FileSaver.saveAs(blob, 'diagram.dmn');
  }

  /**
   * submitDmnToCamunda
   *
   * @returns {Promise<void>}
   */
  const submitDmnToCamunda = async () => {
    const result = await dmnModeler.saveXML({ format: true });
    const { xml } = result;

    http.post('/deployDecisionDefinition', { dmnXml: xml }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        console.log(res);
        if (res.startsWith('Decision deployed successfully')) {
          alert('部署成功!');
          return;
        }
        alert('部署失败!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('部署失败!')
      });
  }

  return (
    <div id="App">
      <div id='canvas' />
      <div id="canvas-toolbox">
        <button
          className="canvas-toolbox-button"
          onClick={saveDiagram}
        >
          导出
        </button>

        {/* <input */}
        {/*   type="file" */}
        {/*   id="bpmnFile" */}
        {/*   style={{ display: 'none' }} */}
        {/*   onChange={handleFileChange} */}
        {/* /> */}
        {/* <button */}
        {/*   className="canvas-toolbox-button" */}
        {/*   onClick={() => document.getElementById('bpmnFile').click()} */}
        {/* > */}
        {/*   导入 */}
        {/* </button> */}
        <button
          className="canvas-toolbox-button"
          onClick={() => newDiagram()}
        >
          新建
        </button>
        <button
          className="canvas-toolbox-button"
          onClick={submitDmnToCamunda}
        >
          部署
        </button>
      </div>
    </div>
  );
};

export default DmnTable;