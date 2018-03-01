import React from 'react'
import avatar from './avatar.png'
import Image from 'components/Image';
import {Menu, Dropdown, Icon} from 'antd';
import {Link} from 'react-router';
export default ({pic, handleLogout, userName}) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">

        <Link to={`/pubPassword`}>修改密码</Link>

      </Menu.Item>

      <Menu.Item key="1">
        <a href="javascript:;" onClick={handleLogout}>安全退出</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <ul className="nav navbar-toolbar navbar-right navbar-toolbar-right">
      <li className="dropdown">
        <a className="navbar-avatar dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false"
           data-animation="scale-up" role="button">
            <span className="avatar avatar-online">
              {
                pic ? <Image src={pic+'?x-oss-process=image/resize,m_fixed,h_100,w_100'} alt="头像"/> : <img src={avatar} alt="头像"/>
              }
              <i />
            </span>
        </a>
      </li>
      <li className="dropdown">
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#" style={{marginRight: '35px', fontSize: '14px', fontWeight: 'bold'}}>
            {userName} <Icon type="down"/>
          </a>
        </Dropdown>
      </li>
    </ul>
  )
}
