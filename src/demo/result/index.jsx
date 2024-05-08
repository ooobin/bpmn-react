import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import http from "../../base/http";

/**
 * 结果
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Index = () => {
  const [result, setResult] = useState({});
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get('taskId');

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
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <h1>结果</h1>
      <div>金额: {result.amount}</div>
      <div>批准: {result.approve ? '是' : '否'}</div>
      <div>最终金额: {result.finalAmount}</div>
      <div>担保人: {result.guarantor}</div>
      <div>名字: {result.name}</div>
      <button onClick={handleConfirm}>确认</button>
    </div>
  )
}

export default Index;
