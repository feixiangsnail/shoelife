import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import 'henui/index.less'
import '../../styles/core.less'
import 'antd/dist/antd.min.css'
import classes from './CoreLayout.less'
import {Menu, Breadcrumb, Icon} from 'antd'
import store from 'store2';
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item;

import Page from '../../components/Page'
import getMenu from '../../common/menu'
import NavBar from '../../components/NavBar'

const logo = require('./logo.png')
function CoreLayout(props)  {
  let result = null;
  let findNestedProp = (props)=> {
    let previousChildren = props.children;

    if (null !== props.children) {
      result = props.children;
      findNestedProp(props.children.props)
    }
  }
  findNestedProp(props);
  const {handleLogout, pic,userName} = props;
  //从本地存储中获取登录信息中的菜单列表
  const menuList = store.get('USER') && store.get('USER')[0].menus;
  //获取菜单列表
  let menus = getMenu(menuList);
  return (
    <div className={classes.corelayout}>
      <div className={classes.header + ' site-navbar navbar navbar-default navbar-fixed-top navbar-mega'}>
        <div className={classes.logo}>
          <Link to="/">
            <img src={logo} height="46"/>
          </Link>
        </div>
        <NavBar pic={pic} handleLogout={handleLogout} userName={userName}/>
      </div>
      <div className={classes.aside}>
        <aside className={classes.sider}>
          <Menu mode="inline" theme="dark" onOpen={props.onToggle} onClose={props.onToggle} onClick={props.handleClick}
                selectedKeys={[props.current]} openKeys={props.openKeys} className={classes.customMenu}>
            {
              menus.map((menu, index) => {
                return <SubMenu key={`menu-${index}`} title={<span><Icon type={menu.icon} />{menu.title}</span>}>
                  {
                    menu.children.map((subMenu, subIndex) => {
                      if (subMenu.children) {
                        return <SubMenu key={`sub-${subIndex}`}
                                        title={<span><Icon type={subMenu.icon}  />{subMenu.title}</span>}>
                          {
                            subMenu.children.map((subChildMenu, subChildIndex) => {
                              return <MenuItem key={`${subChildMenu.url}`}  className={classes.customSubMenu}>
                                <Link to={subChildMenu.url}>{subChildMenu.title}</Link>
                              </MenuItem>
                            })
                          }
                        </SubMenu>
                      } else {
                        return <MenuItem key={`${subMenu.url}`}  className={classes.customSubMenu}>
                          <Link to={subMenu.url}>{subMenu.title}</Link>
                        </MenuItem>
                      }
                    })
                  }
                </SubMenu>
              })
            }
          </Menu>
        </aside>

        <div className={classes['container']}>
          <Page>
            {result ? result : props.children}
          </Page>
        </div>
        <div className={classes['footer']}>
          Copyright © 2016~2017 Shoelives. All Rights Reserved
        </div>
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
