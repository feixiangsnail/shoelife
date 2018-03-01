import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import LastView from './LastView'
import MateriView from './MateriView'

import {getMenuKey} from 'common/utils';
import {Button} from 'antd'

import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

class Material extends Component {

  render() {
    const context = this;
    let activeKey = getMenuKey('activeKey');
    const {
      tableLastOptions,
      getFormLastOptions,
      tableMateriOptions,
      getFormMateriOptions,
      tableDecoriOptions,
      getFormDecoriOptions,
      tableStampOptions,
      getFormStampOptions,

      lastParams,
      materiParams,
      decoriParams,
      stampParams,

      cateList,
      toDel
    } = context.props;
    return (
      <div>
        <Tabs defaultActiveKey={activeKey}>
          <TabPane tab="楦头" key="1">
            <LastView tableLastOptions={tableLastOptions} getFormLastOptions={getFormLastOptions} toDel={toDel} params={lastParams} />
          </TabPane>
          <TabPane tab="材料" key="2">
            <MateriView tableMateriOptions={tableMateriOptions} getFormMateriOptions={getFormMateriOptions} cateList={cateList} toDel={toDel} params={materiParams}/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}


Material.propTypes = {}


export default Material;
