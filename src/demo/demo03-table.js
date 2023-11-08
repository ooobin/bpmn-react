import React from 'react';
import { Button, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

class TableDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      dataSource: [
        { guid: '1', name: '张三' },
        { guid: '2', name: '李四' },
      ],
    };
  }

  // 状态改变时触发
  handleForm = (e) => {
    // 使用对象解构获取 name 和 value 属性
    const { type, checked, value, name } = e.target;
    // 根据类型获取值
    const newValue = type === 'checkbox' ? checked : value;
    // 根据 name 设置对应 state 值
    this.setState({
      [name]: newValue,
    });
  };

  // 新增按钮
  handleAdd = () => {
    // 重置分页以显示最后一页
    this.setState((prevState) => {
      const currentPage = Math.ceil((prevState.dataSource.length + 1) / 5);
      return { currentPage };
    });
  };

  render() {
    const columns = [
      {
        title: '序号',
        align: 'center',
        width: '8%',
        render: (text, record, index) => index + 1,
      },
      {
        title: '姓名',
        align: 'center',
        dataIndex: 'name',
      },
      {
        title: '操作',
        align: 'center',
        render: () => {
          return (
            <Space size="middle">
              <Button type="link" size="small">
                <EditOutlined /> 编辑
              </Button>
              <Button type="link" size="small">
                <DeleteOutlined /> 删除
              </Button>
            </Space>
          );
        },
      },
    ];

    return (
      <div id="table">
        <Button onClick={this.handleAdd}>新增</Button>
        <Table
          columns={columns}
          dataSource={this.state.dataSource}
          bordered
          size="small"
          rowKey={(record) => record.guid}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({ selectedRowKeys, selectedRows }, () => {
                console.log(this.state.selectedRows);
              });
            },
          }}
          pagination={{
            pageSize: 5,
            current: this.state.currentPage,
            onChange: (page) => {
              this.setState({ currentPage: page });
            },
          }}
        />
      </div>
    );
  }
}

export default TableDemo;
