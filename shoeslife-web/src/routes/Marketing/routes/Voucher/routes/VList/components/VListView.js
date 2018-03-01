import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import {formatDate} from 'common/utils';
import Search from 'components/Search';
//状态
const STATUS = {
  '0': "待使用",
  '1': "占用中",
  '2': "已使用",
  '3': "已失效",
};
class VList extends Component {

  _getFormItems() {
    const context = this;
    const {params} = context.props;
    let config = {
      formItems: [{
        label: "用户账号：",
        span: "6",
        labelCol: {span: 6},
        name: "userName",
        input: {}
      }, {
        label: "状态：",
        name: "status",
        span: "5",
        labelCol: {span: 5},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(STATUS).map((key) => {
            return {'value': key, 'title': STATUS[key]}
          })
        }
      }],
      initValue: params
    }
    return config;
  }


  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '用户账号',
      dataIndex: 'userName'
    }, {
      key: '1',
      title: '领取时间段',
      dataIndex: 'createTime',
      render(key, row){
        return formatDate(key, true)
      }
    }, {
      key: '2',
      title: '使用状态',
      dataIndex: 'status',
      render(key){
        return STATUS[key]
      }
    }, {
      key: '3',
      title: '使用时间',
      dataIndex: 'useTime',
      render(key){
        return formatDate(key, true)
      }
    }, {
      key: '4',
      title: '过期时间',
      dataIndex: 'expireDate',
      render(key){
        return formatDate(key, true)
      }
    }];
    return columns;
  }


  render() {
    const {formOptions, ...other} = this.props;

    return (
      <div>

        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>


        <DataTable bordered={true} columns={this._getColumns()}  {...other} />

      </div>
    )
  }
}


VList.propTypes = {

  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default VList;
