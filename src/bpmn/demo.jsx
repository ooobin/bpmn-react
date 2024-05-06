import React, { useEffect, useState } from 'react';
import axios from "axios";

const Demo = () => {
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState('');
  const [guarantor, setGuarantor] = useState('');
  const [options, setOptions] = useState('');

  useEffect(() => {
    // 获取所有流程
    axios.get('http://localhost:8080/get-processes')
      .then(res => {
        setData(res.data);
      })
  }, []);

  const handleInputChange = (event) => {
    if (event.target.name === 'amount') {
      setAmount(event.target.value);
    } else if (event.target.name === 'guarantor') {
      setGuarantor(event.target.value);
    } else if (event.target.name === 'options') {
      setOptions(event.target.value);
    }
  }

  const handleSubmit = (event) => {
    // 阻止表单默认提交行为
    event.preventDefault();

    // 启动流程
    axios.post('http://localhost:8080/start-process', {
      processDefinitionKey: options,
      amount: amount,
      guarantor: guarantor,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        console.log(res);
        if (res.data.startsWith('实例启动成功')) {
          alert('启动成功!');
          return;
        }
        alert('启动失败!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('启动失败!')

      })
  }

  const handleAudit = () => {
    axios.get('http://localhost:8080/tasks')
      .then(res => {
        if (res.data.length === 0) {
          alert('没有任务');
        } else {
          const taskId = res.data[0].id;
          axios.post('http://localhost:8080/complete-task', {
            taskId: taskId,
            approve: true
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
      })
  }

  return (
    <div id="App">
      <form onSubmit={handleSubmit}>
        <select name="options" onChange={handleInputChange} style={{ display: "block" }}>
          {data.map((item, index) => {
            return (
              <option key={index} value={item.key}>{item.name}</option>
            )
          })}
        </select>
        <input
          type="text"
          name="amount"
          value={amount}
          onChange={handleInputChange}
          placeholder="Amount"
        />
        <input
          type="text"
          name="guarantor"
          value={guarantor}
          onChange={handleInputChange}
          placeholder="Guarantor"
        />
        <button type="submit">发送</button>
        <button onClick={handleAudit}>审核</button>
      </form>
    </div>
  );
}

export default Demo;