import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import AllView from './AllView'
import RecommendView from './RecommendView'
import {Button} from 'antd'

import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;


class Square extends Component {
  render() {
    const context = this;
    const {
      tableOptions,
      getFormOptions,
      tableOptionsR,
      getFormOptionsR,
      toDel,
      isRecommend,
      recent,
      paramsAll,
      paramsR
    } = context.props;
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="全部" key="1">
            <AllView params={paramsAll} tableOptions={tableOptions} getFormOptions={getFormOptions} toDel={toDel} recent={recent} isRecommend={isRecommend}/>
          </TabPane>
          <TabPane tab="推荐" key="2">
            <RecommendView params={paramsR} tableOptionsR={tableOptionsR} getFormOptionsR={getFormOptionsR} toDel={toDel} recent={recent} isRecommend={isRecommend}/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

Square.propTypes = {}

export default Square;
