import React, {Component, PropTypes} from 'react';
import classes from './style.less';
import {Row, Col, Button, Icon, Table} from 'antd';
import {formatDate} from 'common/utils';

import '../../../../../static/jquery'
import '../../../../../static/jQuery.print'

const PAYTYPE = {
  'ALIPAY': "支付宝支付",
  'WACHAT': "微信支付",
};
const STATUS = {
  '0': "已取消",
  '1': "未支付",
  '2': "已支付，待生产",
  '3': "已支付，待发货",
  '4': "已支付，已发货",
  '5': "已支付，已完成",
};
const KEEP = {
  '1': "一个月内免费",
  '3': "三个月内免费",
  '6': "半年内免费",
  '12': "一年内免费",
  '0': "终身免费",
};
const INVOICE = {
  '0': "需要发票",
  '1': "不开发票",
};
const CLIST = {
  'SFEXPRESS': "顺丰快递"
}
class OrderDetail extends Component {

  toBack() {
    history.go(-1);
  }

  toPrint() {
    $("#printOrder").print()
  }

  render() {
    const context = this;
    const {item} = context.props;
    /**
     * 鞋跟 鞋面   ------鞋款
     * 款式        -----鞋
     * @type {[*]}
     */
    const columns = [{
      title: '项目',
      dataIndex: 'payTitle'
    }, {
      title: '用料',
      dataIndex: 'payName'
    }, {
      title: '价格(元)',
      dataIndex: 'payPrice'
    }];
    let cardList = null, payFirstName = null, paystyle = null, payList = [], payPositionList = [];
    if (!item) {
      return false
    } else {
      cardList = item.orderProductVo && item.orderProductVo.length ? item.orderProductVo[0] : '';
      //费用清单第一条数据name
      payFirstName = item.orderProductVo && item.orderProductVo.length ? item.orderProductVo[0].shoeCustomizedDetail.price : '';
      payList = [{
        key: '0',
        payTitle: '款式基准价',
        payName: null,
        payPrice: payFirstName,
        id: 0
      }]
      paystyle = item.orderProductVo && item.orderProductVo.length ? item.orderProductVo[0].shoeCustomizedDetail.list : [];
      /**
       * 装饰/部位价格
       * @type {Array}
       */
      payPositionList = paystyle && paystyle.length && paystyle.length > 0 ? paystyle.map((m) => {
        return ({
          payTitle: m.modeName,
          payName: m.materialName + m.materialColor,
          payPrice: m.materialPrice,
          id: m.modeId
        })
      }) : [];
      payList = payList.concat(payPositionList)
    }

    return (
      <div className={classes.infor}>
        <div id="printOrder">
          <dl>
            <dt>订单基本信息</dt>
            {
              item.totalFee ? <dd>• 订单金额：{item.totalFee}元（实付 {item.payment}元，代金券抵扣 {item.totalFee - item.payment}元）</dd> :
                <dd>• 订单金额：{item.payment}元</dd>
            }
            <dd>• 支付方式：{item.payType ? PAYTYPE[item.payType] : ''}{item.payNo ? '（交易单号：' + item.payNo + '）' : ''}</dd>
            {
              item.payTime ? <dd>{'• 支付时间：' + formatDate(item.payTime, 'yyyy-MM-dd HH:mm:ss')}</dd> : ''
            }
            <dd>• 发票信息：{item.isInvoice == '0' ? item.invoiceName : INVOICE[item.isInvoice]}</dd>
            <dd>• 订单状态：{STATUS[item.orderStatus]}{item.orderStatus == '4' ? '（' + CLIST[item.expressCompany] + '，' + item.expressNo + '）' : ''}</dd>
            <dd>• 收件信息：{item.shipAddress + '，' + item.shipName + '，' + item.shipPhone}</dd>
          </dl>
          <dl>
            <dt>鞋码(mm)</dt>
            {
              cardList.orderCard && cardList.orderCard.length ? cardList.orderCard.map((c) => {
                return <dd> • {c.cardName ? c.cardName + ':' : ''}左脚长{c.leftFootLength}，右脚长{c.rightFootLength}</dd>
              }) : '暂无信息'
            }
          </dl>
          <dl>
            <dt>用户备注</dt>
            <dd>{item.remark ? item.remark : '暂无备注'}</dd>
          </dl>
          <dl>
            <dt>售后服务</dt>
            <dd>{cardList.freeRepair ? KEEP[cardList.freeRepair] + '维修' : '无'}</dd>
          </dl>
          <dl style={{marginBottom: '15px'}}>
            <dt>费用清单</dt>
            <dd>
              <Table rowKey={record => record.id} columns={columns} dataSource={payList} pagination={false} size="middle"/>
            </dd>
          </dl>
        </div>
        <Button type="primary" onClick={context.toPrint.bind(context)}>打印</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type="ghost" onClick={context.toBack.bind(context)}>返回</Button>
      </div>
    )
  }
}

OrderDetail.propTypes = {}

export default OrderDetail;
