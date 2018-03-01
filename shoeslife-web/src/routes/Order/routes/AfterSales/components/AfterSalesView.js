import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import {DownLoader} from 'components/FileLoader';
import Search from 'components/Search';
import {formatDate} from 'common/utils';

import {Row, Col, Button, Icon, DatePicker, Popconfirm} from 'antd';

import {
  ORDER_AFTERSALE_EXPORT
} from '../../../../../static/apiAlias'
/**
 * 当前服务状态 用于select下拉
 * @type {{0: string, 1: string, 2: string, 3: string, 4: string, 5: string}}
 */
const currentStatus = {
  '0': "已取消",
  '1': "待审核",
  '2': "拒绝",
  '3': "待受理",
  '4': "受理中",
  '5': "已完成",
}
/**
 * 服务状态 用于table展示
 * @type {{0: string, 1: string, 2: string, 3: string, 4: string, 5: string, 6: string, 7: string, 8: string, 9: string, 10: string, 11: string}}
 */
const STATUS = {
  '0': "已取消",
  '1': "待审核",
  '2': "已拒绝",
  '3': "待受理",
  '4': "待受理",
  '5': "待受理",
  '6': "受理中",
  '7': "已完成",
  '8': "已完成",
  '9': "已完成",
  '10': "已完成",
  '11': "已完成",
};
//服务类型  1：保修，2：保养、3：退货、4：换货
const TYPE = {
  '1': "免费维修",
  '2': "免费保养",
  '3': "退货",
  '4': "换货",
};
class AfterSales extends Component {
  isAccept(key, row) {
    const {toAccept} = this.props;
    toAccept(key, row)
    //this.refs && this.refs.dt.refresh();
  }

  isGet(key, row) {
    const {toGet} = this.props;
    toGet(key, row)
    this.refs && this.refs.dt.refresh();
  }

  /**
   * 近7天、近30天
   * @param t
   */
  recentTime(t) {
    const {recent} = this.props;
    recent(t)
  }

  _getFormItems() {
    const context = this;
    const {params} = this.props;
    let config = {
      formItems: [{
        label: "服务单号：",
        name: "aftersaleId",
        span: "6",
        labelCol: {span: 6},
        input: {}
      }, {
        label: "订单编号：",
        name: "orderId",
        span: "6",
        labelCol: {span: 6},
        input: {}
      }, {
        label: "快递单号：",
        name: "accountExpressNo",
        span: "6",
        labelCol: {span: 6},
        input: {}
      }, {
        label: "服务状态：",
        name: "nowStatus",
        labelCol: {span: 6},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(currentStatus).map((key) => {
            return {'value': key, 'title': currentStatus[key]}
          })
        }
      }, {
        label: "服务类型：",
        name: "aftersaleType",
        labelCol: {span: 6},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(TYPE).map((key) => {
            return {'value': key, 'title': TYPE[key]}
          })
        }
      }, {
        label: "申请时间：",
        span: '11',
        labelCol: {span: 3},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div><DatePicker {...getCustomFieldProps('startCreateTime')}/>
            <p className="ant-form-split">~</p>
            <DatePicker {...getCustomFieldProps('endCreateTime')}/>
          </div>
        }
      }, {
        label: "",
        span: "3",
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div>
            <a href="javascript:;" style={{fontSize:'14px'}} onClick={context.recentTime.bind(context,604800000)}>近7天</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="javascript:;" style={{fontSize:'14px'}} onClick={context.recentTime.bind(context,2592000000)}>近30天</a>
          </div>
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
      title: '服务单号',
      dataIndex: 'aftersaleId',
      render(id, row){
        return <Link to={`/order/serviceDetail/${id}`}>{id}</Link>;
      }
    }, {
      key: '1',
      title: '用户账号',
      dataIndex: 'accountName'
    }, {
      key: '2',
      title: '订单编号',
      dataIndex: 'orderId',
      render(id, row){
        return <Link to={`/order/orderDetail/${id}`}>{id}</Link>;
      }
    }, {
      key: '3',
      title: '快递单号',
      dataIndex: 'accountExpressNo'
    }, {
      key: '4',
      title: '服务类型',
      dataIndex: 'aftersaleType',
      render(key){
        return <span>{TYPE[key]}</span>
      }
    }, {
      key: '5',
      title: '服务状态',
      dataIndex: 'nowStatus',
      render(key){
        return <span>{currentStatus[key]}</span>
      }
    }, {
      key: '6',
      title: '创建时间',
      dataIndex: 'createTime',
      render(key){
        return <span>{formatDate(key, 'yyyy-MM-dd HH:mm:ss')}</span>
      }
    }, {
      key: '7',
      title: '更新时间',
      dataIndex: 'modifyTime',
      render(key){
        return <span>{formatDate(key, 'yyyy-MM-dd HH:mm:ss')}</span>
      }
    }, {
      title: '操作',
      dataIndex: 'accountName',
      render(key, row){
        return <span>
          {
            row.aftersaleStatus == '1' ? <div>
                <Popconfirm title="服务接受后无法驳回，请按照用户需求处理，如有问题，可与用户沟通协商。" onConfirm={context.isAccept.bind(context, key, row)}><a href="javascript:;">接受
                / </a></Popconfirm>
                <Link to={`/order/sales/refuse/${row.aftersaleId}`}>拒绝</Link>
              </div> : ''
          }
          {
            //aftersaleStatus==3&&aftersaleType!==4
            (row.aftersaleStatus == '4' || row.aftersaleStatus == '5' || row.aftersaleStatus == '6' ||row.aftersaleStatus == '3') && (row.aftersaleType !== '4')?
              <Link to={`/order/sales/updDeli/${row.aftersaleId}/${row.accountExpressNo}`}>更新状态</Link> : ''
          }
          {
            //服务类型-----换货
            row.aftersaleType == '4' && (row.aftersaleStatus == '4'||row.aftersaleStatus == '3') ?
              <Popconfirm title="确认收货后，系统将会生成新的0元订单，请确保在约定时间内完成生产并发货。" onConfirm={context.isGet.bind(context, key, row)}>
                <a href="javascript:;">确认收货</a>
              </Popconfirm> : ''
          }
          {
            row.aftersaleStatus == '11' && row.aftersaleType !== '3' && row.aftersaleType !== '4' ?
              <Link to={`/order/logis/${row.addressInfo}/${row.companyExpressNo}/${row.companyExpressCompany}`}>物流进度</Link> : ''
          }
        </span>
      }
    }];
    return columns;
  }

  quickButton() {
    const {params} = this.props;
    /*
     if (downParams.pageNum) {
     delete downParams.pageNum
     }*/
    return <Row>
      <Col span='2'>
        <DownLoader url={ORDER_AFTERSALE_EXPORT} params={params} title='导出Excel'/>
      </Col>
    </Row>
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


AfterSales.propTypes = {
  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default AfterSales;
