import React, { useState } from 'react';
import { Select } from 'antd';

export default function SelectDemo() {
  // 使用 useState 来声明一个状态变量和一个用于更新状态的函数
  const [selectedItem, setSelectedItem] = useState(1);
  const [selectList] = useState([
    {
      guid: '1',
      name: '测试1',
    },
    {
      guid: '2',
      name: '测试2',
    },
  ]);

  return (
    <div id="select">
      <Select style={{ width: '20vw' }} value={selectedItem} onChange={value => setSelectedItem(value)}>
        {selectList.map(item => (
          <Select.Option key={item.guid} value={item.guid}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <div>选择的项目: {selectList.find(item => item.guid === selectedItem).name}</div>
    </div>
  );
}
