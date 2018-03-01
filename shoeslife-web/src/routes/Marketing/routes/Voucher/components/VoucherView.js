import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {formatDate} from 'common/utils';
import DataTable from 'components/DataTable';
import Search from 'components/Search';

import {Popconfirm, Button, Icon} from 'antd';
//状态
const STATUS = {
  '0': "待发放",
  '1': "发放中",
  '2': "已领完",
  '3': "发放结束",
};
//发放形式

const TYPE = {
  '1': "活动发放",
  '2': "指定账号",
  '3': "新用户",
};
class Voucher extends Component {

  del(id) {
    const {toDel} = this.props;
    toDel(id)
    this.refs && this.refs.dt.refresh();
  }

  release(id, row) {
    const {toRelease} = this.props;
    toRelease(id, row);
    this.refs && this.refs.dt.refresh();
  }

  _getFormItems() {
    const context = this;
    const {params} = context.props;
    let config = {
      formItems: [{
        label: "名称：",
        name: "name",
        span: "5",
        labelCol: {span: 5},
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
      title: '名称',
      dataIndex: 'name',
      render(key, row){
        return <Link to={`/market/voucher/detail/${row.voucherId}`}>{key}</Link>
      }
    }, {
      key: '1',
      title: '发放形式',
      dataIndex: 'type',
      render(key){
        return TYPE[key]
      }
    }, {
      key: '2',
      title: '发送数量',
      dataIndex: 'totalQuantity'
    }, {
      key: '3',
      title: '面额（元）',
      dataIndex: 'denomination'
    }, {
      key: '4',
      title: '领取时间段',
      dataIndex: 'sendStartTime',
      render(key, row){
        return <span>{formatDate(key, true) + ' ~ ' + formatDate(row.sendEndTime, true)}</span>
      }
    }, {
      key: '5',
      title: '使用有效期',
      dataIndex: 'useStartTime',
      render(key, row){
        return <span>{key ? formatDate(key, false) + ' ~ ' + formatDate(row.useEndTime, false) : row.expireDate + '天以内'}</span>
      }
    }, {
      key: '6',
      title: '当前状态',
      dataIndex: 'status',
      render(key){
        return STATUS[key]
      }
    }, {
      title: '操作',
      dataIndex: 'voucherId',
      render(id, row){
        return <span>
          {
            row.status == '0' ? <Link to={`/market/voucher/edit/${id}/${row.type}`}>编辑 / </Link> : ''
          }
          {
            row.status == '0' ?
              <Popconfirm title="是否立即发放？" onConfirm={context.release.bind(context, id, row)}><a
                href="javascript:;">立即发放</a></Popconfirm> : ''
          }
          {
            row.status == '1' ?
              <Popconfirm title="是否结束发放？" onConfirm={context.release.bind(context, id, row)}><a
                href="javascript:;">结束发放</a></Popconfirm> : ''
          }
          {
            row.status == '0' ?
              <Popconfirm title="是否删除该代金券？" onConfirm={context.del.bind(context, id, row)}><a href="javascript:;"> / 删除</a></Popconfirm> : ''
          }
        </span>
      }
    }];
    return columns;
  }

  quickButton() {
    return <div style={{textAlign: 'right'}}>
      <Button type="ghost">
        <Link to={`/market/voucher/edit`}>
          <Icon type="plus"/> 优惠活动
        </Link>
      </Button>
    </div>
  }

  render() {
    const {formOptions, ...other} = this.props;

    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>


        <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton()} {...other} ref="dt"/>

      </div>
    )
  }
}


Voucher.propTypes = {}


export default Voucher;
