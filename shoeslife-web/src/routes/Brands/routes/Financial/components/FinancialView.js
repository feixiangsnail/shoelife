import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import {DownLoader} from 'components/FileLoader';
import Search from 'components/Search';
import {formatDate,getScreen} from 'common/utils';
import {Row, Col, Button, Icon, DatePicker} from 'antd';

import {
  ADMIN_TRADE_EXPORT
} from '../../../../../static/apiAlias'
const TYPE = {
  '1': '收入',
  '2': '支出'
}
class Financial extends Component {
  _getFormItems() {
    const {downParams} = this.props;
    let config = {
      formItems: [{
        label: "订单编号：",
        name: "orderId",
        span: "6",
        labelCol: {span: 6},
        input: {
          placeholder: '名称或编号'
        }
      }, {
        label: "交易日期：",
        span: '12',
        labelCol: {span: 3},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div><DatePicker {...getCustomFieldProps('tradeTimeStart')}/>
            <p className="ant-form-split">~</p>
            <DatePicker {...getCustomFieldProps('tradeTimeEnd')}/>
          </div>
        }
      }],
      initValue: downParams
    }
    return config;
  }
  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '交易日期',
      dataIndex: 'tranTime',
      render(key){
        return <span>{formatDate(key,'yyyy-MM-dd HH:mm:ss')}</span>
      }
    }, {
      key: '1',
      title: '订单编号',
      dataIndex: 'orderId',
      render(id, row){
        return <Link to={`/order/orderDetail/${id}`}>{id}</Link>;
      }
    }, {
      key: '2',
      title: '收入/支出（元）',
      dataIndex: 'amount',
      render(key, row){
        return <span>{TYPE[row.tradeType] + '：' + key }</span>
      }
    }];
    return columns;
  }

  quickButton() {
    const {downParams} = this.props;
    /*
    if (downParams.pageNum) {
      delete downParams.pageNum
    }
    */
    return <Row>
      <Col span='2'>
        <DownLoader url={ADMIN_TRADE_EXPORT} params={downParams} title='导出Excel'/>
      </Col>
    </Row>
  }

  render() {
    const {formOptions, countResult, ...other} = this.props;

    return (
      <div>

        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit}  onReset={formOptions.handleReset}/>

        <DataTable bordered={false} columns={this._getColumns()} quickButton={this.quickButton()} {...other} />

        <div style={{textAlign: 'right', 'fontSize': '14px', 'fontWeight': 'bold'}}>查询交易金额小计：{countResult ? countResult : '0'}元</div>

      </div>
    )
  }
}

Financial.propTypes = {

  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Financial;
