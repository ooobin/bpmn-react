import { Menu } from 'antd';
import React from 'react';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

class Home extends React.Component {
  getItem(label, key, icon, children, type) {
    return {
      label,
      key,
      icon,
      children,
      type,
    };
  }

  render() {
    const items = [
      this.getItem('Navigation One', 'sub1', <MailOutlined />, [this.getItem('Option 1', '1')]),
      {
        type: 'divider',
      },
      this.getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        this.getItem('Option 2', '2'),
        this.getItem('Submenu', 'sub2-sub1', null, [this.getItem('Option 3', '3')]),
      ]),
      {
        type: 'divider',
      },
      this.getItem('Navigation Three', 'sub3', <SettingOutlined />, [
        this.getItem('Option 4', '4'),
      ]),
    ];

    return (
      <div id="home">
        <div className="home-left">
          <Menu
            // onClick={onClick}
            style={{
              width: 256,
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
          />
        </div>
        <div className="home-right">
          {/* <Link to="/hello?message=hello">点击前往 hello 组件</Link> */}
          {/* <Link to={{ pathname: '/hello', state: { message: 'hello' } }}>点击前往 hello 组件</Link> */}
        </div>
      </div>
    );
  }
}

export default Home;
