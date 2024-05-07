import http from "../../base/http";
import { useEffect, useState } from "react";

const Index = () => {
  const [taskId, setTaskId] = useState('');

  useEffect(() => {
    // 获取所有任务
    http.get('/tasks')
      .then(async res => {
        if (res.length === 0) {
          alert('没有任务');
        } else {
          await setTaskId(res[0].id);
          // 根据任务id获取变量
          http.post('/getVariesByTaskId', { taskId: taskId })
            .then(res => {
              console.log(res);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      })
  })

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
      approve
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
    <div id="App">
      <button onClick={() => handleAudit(true)}>批准</button>
      <button onClick={() => handleAudit(false)}>拒绝</button>
    </div>
  )
}

export default Index;
