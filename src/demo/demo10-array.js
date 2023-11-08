import React, { useState, useEffect } from 'react';

const Array = () => {
  const [list, setList] = useState([
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' },
    {
      id: 4,
      name: '赵六',
      children: [
        { name: '小赵1', age: 1 },
        { name: '小赵2', age: 2 },
      ],
    },
  ]);

  // 组件渲染完成后执行
  // useEffect(() => {
  //   setList((prevState) => {
  //     const updatedList = prevState.map((item) => {
  //       return item.name === '张三' ? { ...item, name: '张三丰' } : item;
  //     });
  //     return updatedList;
  //   });
  // }, []);

  // filter使用
  // useEffect(() => {
  //   setList((prevState) => {
  //     const updatedList = prevState.filter((item) => item.name === '张三');
  //     return updatedList;
  //   });
  // }, []);

  // 添加值
  // useEffect(() => {
  //   setList((prevState) => {
  //     const updatedList = prevState.map((item) => {
  //       if (item.name === '赵六') {
  //         item.children.push({ name: '小赵3', age: 3 });
  //       }
  //       return item;
  //     });
  //     return updatedList;
  //   });
  // }, []);

  // 数组常用操作
  // concat()/join()/push()/slice()/indexOf()/some()/every()/

  // slice(start, end), 裁剪第 end 个之前的元素, 并返回一个新数组
  // useEffect(() => {
  //   setList((prevState) => {
  //     const updatedList = prevState.slice(1, 3);
  //     return updatedList;
  //   });
  // }, []);

  // includes() 判断数组中是否包含某个值
  // const indexList = [1, 2, 3]
  // if (indexList.includes(1)) {
  //     console.log('存在')
  // } else {
  //     console.log('不存在')
  // }

  // 数组对象改名
  useEffect(() => {
    const updatedList = list.map((item) => {
      const newItem = { ...item };
      newItem.guid = newItem.id;
      delete newItem.id;
      return newItem;
    });
    setList(updatedList);

    return () => {};
  }, []);

  // 数组添加对象
  // useEffect(() => {
  //   setList((prevState) => {
  //     return [...prevState, { id: 5, name: '老七' }];
  //   });
  // }, []);

  return <div id="array">数组</div>;
};

export default Array;
