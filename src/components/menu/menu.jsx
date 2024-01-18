import React from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

class CustomMenu extends React.Component {
    constructor(props) {
        super(props);
        this.history = props.history;
        this.items = [
            // 此处的 key 对应路由中的 path/home/:key
            this.getItem('Test', 'test', <MailOutlined/>, null),
            this.getItem('Common', 'common', <AppstoreOutlined/>, null),
            this.getItem('CommonClass', 'common-class', null, null),
            this.getItem('TableDemo', 'table-demo', null, null),
            this.getItem('Timer', 'timer', null, null),
            this.getItem('Breadcrumb', 'breadcrumb-demo', null, null),
            this.getItem('Echarts', 'echarts', null, [
                this.getItem('Bar', 'bar-echarts', null, null),
            ]),
            this.getItem('Props', 'props', null, null),
            this.getItem('函数组件', 'func', null, [
                this.getItem('My-App', 'my-app', null, null),
                this.getItem('My-Game', 'my-game', null, null),
            ]),
        ];

        // 若选择子菜单，则记录所在父菜单的 key，刷新页面时默认展开该父菜单
        const openKeys = localStorage.getItem('openKeys');
        this.state = {
            openKeys: openKeys ? openKeys : null, // 选择子菜单项时记录所在父菜单的 key
        }
    }

    /**
     * 生成菜单项
     * @param label
     * @param key
     * @param icon
     * @param children
     */
    getItem(label, key, icon, children) {
        return {
            label,
            key,
            icon,
            children,
        };
    }

    /**
     * 菜单点击事件
     * @param e
     */
    handleMenuClick = (e) => {
        // history 对象是通过路由组件传递的，所以组件需要 Route 或者 withRouter 包裹
        this.history.push("/home/" + e.key);

        // 保存子菜单项所在父菜单的 key
        const openKeys = e.keyPath[1];
        this.setState({ openKeys });
        localStorage.setItem('openKeys', openKeys);
    };

    render() {
        const key = window.location.pathname.split('/')[2];
        return (
            <Menu
                mode="inline"
                items={this.items}
                defaultSelectedKeys={[key]}
                defaultOpenKeys={[this.state.openKeys]}
                onClick={this.handleMenuClick}
            />
        );
    }
}

export default withRouter(CustomMenu);
