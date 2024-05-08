import { useEffect, useState } from "react";
import http from "../../base/http";

/**
 * 结果
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Index = () => {
  const [result, setResult] = useState({});
  const [taskId, setTaskId] = useState('');

  useEffect(() => {
    http.get('/tasks')
      .then(res => {
        if (res.length === 0) {
          // alert('没有任务');
        } else {
          const newTaskId = res[0].id;
          setTaskId(newTaskId);
        }
      })
  })

  useEffect(() => {
    document.title = "结果";

    http.post('http://192.168.9.16:8888/getFinalVariables', {}, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => {
        console.log(res)
        setResult({
          amount: res.amount.value,
          approve: res.approve.value,
          finalAmount: res.finalAmount.value,
          guarantor: res.guarantor.value,
          name: res.name.value
        })
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [])

  /**
   * Confirm button click event
   */
  const handleConfirm = () => {
    http.post('http://192.168.9.16:8888/completeExternalTask', { taskId }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => {
        console.log(res);
        alert("操作成功, 流程结束!");
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div style={{ fontSize: '20px' }}>
      <h1>结果</h1>
      <div>金额: {result.amount}</div>
      <div>批准: {result.approve ? '是' : '否'}</div>
      <div>最终金额: {result.finalAmount}</div>
      <div>担保人: {result.guarantor}</div>
      <div>名字: {result.name}</div>
      <br />
      <button onClick={handleConfirm} style={{ width: '100px', height: '50px' }}>确认</button>
    </div>
  )
}

export default Index;
