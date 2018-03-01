import React, {Component, PropTypes} from 'react';
import AdvertiseView from './AdvertiseView'
import SpaceView from './SpaceView'
import {Link} from 'react-router';
import {getMenuKey} from 'common/utils';

import {Tabs,Button,Icon} from 'antd';
const TabPane = Tabs.TabPane;
class Square extends Component {
  render() {
    const context = this;
    let activeKey = getMenuKey('activeKey')+'';
    const {
      tableOptions,
      getFormOptions,
      tableOptionsP,
      params,
      toRelease,
      toDel,
      toDelSpace,
      toEdit,
      sList,
      isP
    } = context.props;
    return (
      <div>
        <Tabs defaultActiveKey={activeKey}>
          <TabPane tab="广告管理" key="1">
            <div style={{position: 'absolute', top: '-52px', right: '0'}}>
              <Button type="ghost">
                <Link to={`/market/advert/edit`}>
                  <Icon type="plus"/> 广告
                </Link>
              </Button>
            </div>
            <AdvertiseView tableOptions={tableOptions} getFormOptions={getFormOptions} toDel={toDel} toRelease={toRelease} params={params} sList={sList}/>
          </TabPane>
          <TabPane tab="广告位管理" key="2">
            <div style={{position: 'absolute', top: '-52px', right: '0'}}>
              <Button type="ghost">
                <Link to={`/market/advert/editSpace`}>
                  <Icon type="plus"/> 广告位
                </Link>
              </Button>
            </div>
            <SpaceView tableOptionsP={tableOptionsP} toDelSpace={toDelSpace} toEdit={toEdit} isP={isP}/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

Square.propTypes = {}

export default Square;
