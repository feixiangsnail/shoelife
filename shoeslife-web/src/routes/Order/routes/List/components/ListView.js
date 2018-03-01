import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import {DownLoader} from 'components/FileLoader';
import Search from 'components/Search';
import {Row, Col, Button, Icon, DatePicker} from 'antd';
import {formatDate} from 'common/utils';

import {
  ORDER_LIST_EXPORT
} from '../../../../../static/apiAlias'

const ORDER_STATUS = {
  // 订单状态已取消
  "0": "已取消",
  // 订单状态未支付
  "1": "未支付",
  // 订单状态已支付 待生产
  "2": "待生产",
  // 订单状态已支付 待发货
  "3": '待发货',
  // 订单状态已支付 已发货
  "4": "已发货",
  // 订单状态已支付 已完成
  "5": "已完成",
  //已删除
  "6": "已删除",
  //系统自动完成
  "7": "已完成",
}
const PAY_STATUS = {
  "1": "未支付",
  "2": "已支付",
  "3": "已退款",
}

class List extends Component {
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
        label: "订单编号：",
        name: "orderId",
        span: "6",
        labelCol: {span: 6},
        input: {}
      }, {
        label: "订单状态：",
        name: "orderStatus",
        span: "6",
        labelCol: {span: 6},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(ORDER_STATUS).map((key) => {
            return {'value': key, 'title': ORDER_STATUS[key]}
          })
        }
      }, {
        label: "支付状态：",
        name: "payStatus",
        span: "6",
        labelCol: {span: 6},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(PAY_STATUS).map((key) => {
            return {'value': key, 'title': PAY_STATUS[key]}
          })
        }
      },{
        label: "用户账号：",
        name: "userName",
        span: "6",
        labelCol: {span: 6},
        input: {}
      }, {
        label: "下单日期：",
        span: '12',
        labelCol: {span: 3},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div><DatePicker {...getCustomFieldProps('startOrderTime')}/>
            <p className="ant-form-split">~</p>
            <DatePicker {...getCustomFieldProps('endOrderTime')}/>
          </div>
        }
      },{
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
      title: '订单编号',
      dataIndex: 'orderId',
      render(id, row){
        return <Link style={{color: row.orderStatus=='2'?'#f5334a':''}} to={`/order/orderDetail/${id}`}>{id}</Link>
      }
    }, {
      key: '1',
      title: '用户账号',
      dataIndex: 'userName',
      render(key, row){
        return <span style={{color: row.orderStatus=='2'?'#f5334a':''}}>{key}</span>
      }
    }, {
      key: '2',
      title: '单价及数量',
      dataIndex: 'unitPrice',
      render(key, row){
        let orderNum = 0;
        if(row.orderProductVo)
            orderNum = row.orderProductVo.length;
        return <span style={{color: row.orderStatus=='2'?'#f5334a':''}}>{key}*{ orderNum }</span>
      }
    }, {
      key: '3',
      title: '实付金额（元）',
      dataIndex: 'payment',
      render(key, row){
        return <span style={{color: row.orderStatus=='2'?'#f5334a':''}}>{row.payStatus == 1 ? '' : key}</span>;
      }
    }, {
      key: '4',
      title: '支付状态',
      dataIndex: 'payStatus',
      render(key, row){
        return <span style={{color: row.orderStatus=='2'?'#f5334a':''}}>{PAY_STATUS[key]}</span>;
      }
    }, {
      key: '5',
      title: '订单状态',
      dataIndex: 'orderStatus',
      render(key, row){
        return <span style={{color: row.orderStatus=='2'?'#f5334a':''}}>{ORDER_STATUS[key]}</span>
      }
    }, {
      key: '6',
      title: '下单时间',
      dataIndex: 'orderTime',
      render(key, row){
        return <span style={{color: row.orderStatus=='2'?'#f5334a':''}}>{formatDate(key, 'yyyy-MM-dd HH:mm:ss')}</span>
      }
    }, {
      key: '7',
      title: '支付时间',
      dataIndex: 'payTime',
      render(key, row){
        return <span style={{color: row.orderStatus=='2'?'#f5334a':''}}>{formatDate(key, 'yyyy-MM-dd HH:mm:ss')}</span>
      }
    }, {
      title: '操作',
      dataIndex: 'orderId',
      width: '130px',
      render(key, row){
        return <span>
          {
            row.orderStatus == '2' || row.orderStatus == '3' ? <Link style={{color: row.orderStatus=='2'?'#f5334a':''}} to={`/order/list/updDeli/${row.orderId}`}>更新状态 / </Link> : ''
          }
          {
                row.orderStatus == '4' ? <Link style={{color: row.orderStatus=='2'?'#f5334a':''}} to={`/order/logis/${row.addressInfo}/${row.expressNo}/${row.expressCompany}`}>物流进度 / </Link> : ''
          }
          <Link style={{color: row.orderStatus=='2'?'#f5334a':''}} to={`/order/list/detail/${row.orderId}`}>定制详情</Link>
        </span>
      }
    }];
    return columns;
  }

  quickButton() {
    const {params} = this.props;
    /*
    if (params.pageNum) {
      delete params.pageNum
    }*/
    return <Row>
      <Col span='2'>
        <DownLoader url={ORDER_LIST_EXPORT} params={params} title='导出Excel'/>
      </Col>
    </Row>
  }

  render() {
    const {formOptions, ...other} = this.props;

    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>
        <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton()} {...other} />
      </div>
    )
  }
}

List.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default List;
