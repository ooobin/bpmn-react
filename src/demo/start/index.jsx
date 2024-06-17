import React, { useEffect, useState } from 'react';

/**
 * 启动流程
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Index = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [guarantor, setGuarantor] = useState('');
  const [options, setOptions] = useState('');

  useEffect(() => {
    document.title = "启动流程";

    // 获取所有流程
    axios.get('/get-processes')
      .then(res => {
        setData(res.data);

        // 默认选中第一个
        res.length > 0 && setOptions(res[0].key);
      })
  }, []);

  /**
   * 输入框变化
   *
   * @param event event
   */
  const handleInputChange = (event) => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    } else if (event.target.name === 'amount') {
      setAmount(event.target.value);
    } else if (event.target.name === 'guarantor') {
      setGuarantor(event.target.value);
    } else if (event.target.name === 'options') {
      setOptions(event.target.value);
    }
  }

  /**
   * 表单发送
   *
   * @param event event
   */
  const handleSubmit = (event) => {
    // 阻止表单默认提交行为
    event.preventDefault();

    // 启动流程
    axios.post('/start-process', {
      processDefinitionKey: options,
      name: name,
      amount: amount,
      guarantor: guarantor,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
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

    // 设置随机数刷新页面使用
    localStorage.setItem("random", Math.random().toString());
  }

  return (
    <div id="App">
      <form onSubmit={handleSubmit}>
        <select name="options" onChange={handleInputChange} style={{ display: "block", width: '200px' }}>
          {data && data.map((item, index) => {
            return (
              <option key={index} value={item.key}>{item.name}</option>
            )
          })}
        </select>
        <br />
        <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          placeholder="Name"
          style={{ width: '200px', height: '20px', display: 'block' }}
        />
        <input
          type="text"
          name="amount"
          value={amount}
          onChange={handleInputChange}
          placeholder="Amount"
          style={{ width: '200px', height: '20px', display: 'block' }}
        />
        <input
          type="text"
          name="guarantor"
          value={guarantor}
          onChange={handleInputChange}
          placeholder="Guarantor"
          style={{ width: '200px', height: '20px', display: 'block' }}
        />
        <br />
        <br />
        <button type="submit" style={{ width: '100px', height: '50px', display: 'block' }}>发送</button>
      </form>
    </div>
  );
}

export default Index;