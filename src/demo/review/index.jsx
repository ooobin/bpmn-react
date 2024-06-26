import { useEffect, useState } from "react";
import axios from "axios";

/**
 * 审核流程
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Index = () => {
  const [taskId, setTaskId] = useState('');
  const [finalAmount, setFinalAmount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    document.title = "审核流程";

    // 定义获取任务的函数
    const fetchTasks = () => {
      axios.get('/tasks')
        .then(res => {
          if (res.length === 0) {
            // alert('没有任务');
          } else {
            const newTaskId = res.data[0].id;
            setTaskId(newTaskId);

            // 根据任务id获取变量
            axios.post('/getVariesByTaskId', { taskId: newTaskId }, {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
              .then(res => {
                setData(res.data)
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
        })
    };

    // 立即执行一次
    fetchTasks();
  }, []);

  /**
   * 输入框变化
   *
   * @param event event
   */
  const handleInputChange = (event) => {
    setFinalAmount(event.target.value);
  }

  /**
   * 审核
   */
  const handleAudit = (approve) => {
    if (!taskId) {
      alert('没有任务');
      return;
    }

    axios.post('/complete-task', {
      taskId: taskId,
      approve,
      finalAmount: finalAmount
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        console.log(res);
        if (res.data.startsWith('任务审核完成')) {
          alert('审核成功!');
          return;
        }
        alert('审核失败!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('审核失败!')
      });
  }

  return (
    <div id="Review" style={{ fontSize: '20px' }}>
      <div>
        <span>任务ID: </span>
        <span>{taskId}</span>
      </div>
      <br />
      <div>
        <div>申请人: {data.name}</div>
        <div>申请金额: {data.amount}</div>
        <div>担保人: {data.guarantor}</div>
      </div>
      <br />
      <div>
        <label>
          放款金额:
          <input
            type="text"
            name="finalAmount"
            value={finalAmount}
            onChange={handleInputChange}
            placeholder="放款金额"
          />
        </label>
      </div>
      <br />
      <button
        onClick={() => handleAudit(true)}
        style={{ width: '100px', height: '50px' }}
      >
        批准
      </button>
      <button
        onClick={() => handleAudit(false)}
        style={{ width: '100px', height: '50px' }}
      >
        拒绝
      </button>
    </div>
  )
}

export default Index;
