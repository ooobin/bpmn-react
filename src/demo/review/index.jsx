import http from "../../base/http";
import { useEffect, useState } from "react";

const Index = () => {
  const [taskId, setTaskId] = useState('');
  const [amount, setAmount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    document.title = "审核流程";

    // 获取所有任务
    http.get('/tasks')
      .then(res => {
        if (res.length === 0) {
          alert('没有任务');
        } else {
          setTaskId(res[0].id);

          if (taskId) {
            // 根据任务id获取变量
            http.post('/getVariesByTaskId', { taskId: taskId }, {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            })
              .then(res => {
                setData(res)
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
        }
      })
  }, [taskId])

  const handleInputChange = (event) => {
    setAmount(event.target.value);
  }

  /**
   * 审核
   */
  const handleAudit = (approve) => {
    if (!taskId) {
      alert('没有任务');
      return;
    }

    http.post('/complete-task', {
      taskId: taskId,
      approve,
      finalAmount: amount
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        console.log(res);
        if (res.startsWith('任务审核完成')) {
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
    <div id="Review">
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
            name="amount"
            value={amount}
            onChange={handleInputChange}
            placeholder="放款金额"
          />
        </label>
      </div>
      <br />
      <button onClick={() => handleAudit(true)}>批准</button>
      <button onClick={() => handleAudit(false)}>拒绝</button>
    </div>
  )
}

export default Index;
