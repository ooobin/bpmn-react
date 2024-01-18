import React from "react";
import { Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

class TableDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
                {guid: "1", name: "张三"},
                {guid: "2", name: "李四"},
            ],
        };
    }

    render() {
        // 如果你需要展示数据源中的某个字段，那么就需要指定dataIndex
        // 如果你的列需要自定义渲染或者不需要展示数据源中的数据，那么就不需要写dataIndex
        const columns = [
            {
                title: "序号",
                align: "center",
                width: "8%",
                render: (text, record, index) => {
                    return index;
                },
            },
            {
                title: "姓名",
                align: "center",
                dataIndex: "name",
            },
            {
                title: "操作",
                align: "center",
                render: () => {
                    return (
                        <Space size="middle">
                            <Button type="link" size="small">
                                <EditOutlined/> 编辑
                            </Button>
                            <Button type="link" size="small">
                                <DeleteOutlined/> 删除
                            </Button>
                        </Space>
                    );
                },
            },
        ];

        return (
            <div id="table">
                <Table
                    columns={columns}
                    dataSource={this.state.dataSource}
                    bordered
                    size="small"
                    rowKey={record => record.guid}
                    rowSelection={{
                        type: "checkbox",
                        onChange: (selectedRowKeys, selectedRows) => {
                            console.log(selectedRowKeys, selectedRows);
                        },
                    }}
                />
            </div>
        );
    }
}

export default TableDemo;
