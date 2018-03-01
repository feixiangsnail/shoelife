import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classes from './style.less';
import Form from 'components/Form';
import {Row, Col, Button, Icon, Checkbox} from 'antd';
import {formatDate, getNowTime, getTimeStamp} from 'common/utils';
const STATUS = {
  "0": "订单已取消",
  "1": "订单未支付",
  "2": "订单已支付，待生产",
  "3": '已开始生产，待发货',
  "4": "订单已支付，已发货",
  "5": "用户已确认收货，订单已完成",
  "6": "订单已删除",
  "7": "系统已自动确认收货，订单已完成",
}
//快递公司
const CLIST = [{value: 'SFEXPRESS', title: "顺丰快递"}]
class UpdDeli extends Component {

  constructor(props) {
    super(props);
    this.state = {
      params: {},
      isCheck: false
    }
  }

  _getFormItems() {
    const context = this;
    const {isCheck} = context.state;
    const formList = [
      {
        label: "快递公司：",
        name: "expressCompany",
        rules: [{required: true, type: 'string', message: '请选择快递公司'}],
        select: {
          optionValue: CLIST
        }
      }, {
        label: "快递单号：",
        name: "expressNo",
        rules: [
          {required: true, message: '请输入正确的快递单号，35个字符以内，字母数字均可'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (!(/^[a-zA-Z0-9]{1,35}$/.test(value))) {
                    callback([new Error('请输入正确的快递单号，35个字符以内，字母数字均可')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {}
      }
    ]
    let config = {
      formItems: [],
      initValue: {
        expressCompany: 'SFEXPRESS',
        expressNo: null
      }
    }
    if (isCheck) {
      config.formItems = formList
    }
    return config;
  }

  render() {
    const {formOptions, item, ...other} = this.props;
    let statusList = [];
    const buttonOption = {
      buttons: [
        {
          key: 'commit',
          type: 'primary',
          name: '保存更新',
        }
      ]
    }
    if (!item) {
      return false
    } else {
      statusList = item.orderStatusList;
    }
    return (
      <div className={classes.infor}>
        <ul>
          <li>• 计划发货时间：{
            formatDate(item.payTime + item.orderProductVo[0].productionPeriod * 24 * 60 * 60 * 1000)
          } 前（还剩 {
            parseInt(
              item.orderProductVo[0].productionPeriod-(getTimeStamp(getNowTime())-item.payTime)/(1000*24*60*60)>0?
            item.orderProductVo[0].productionPeriod-(getTimeStamp(getNowTime())-item.payTime)/(1000*24*60*60):'0'
          )
        } 天）
          </li>
          <li>• 收件信息：{item.shipAddress} {item.shipName} {item.shipPhone}</li>
        </ul>
        {
          statusList && statusList.length && statusList.map((s) => {
            return <div className={classes.inforCheck}>
              <Checkbox defaultChecked={true} disabled={true}/>
              &nbsp; {formatDate(s.createTime, 'yyyy-MM-dd HH:mm:ss')} &nbsp; &nbsp;  &nbsp; {STATUS[s.orderStatus]}
            </div>
          })
        }
        {
          item.orderStatus == '2' ? <div><Checkbox defaultChecked={false}/> &nbsp; 开始生产</div> : ''
        }
        {
          item.orderStatus == '3' ? <div><Checkbox defaultChecked={false} onChange={(e) => {
            this.setState({
              isCheck: e.target.checked
            })
          }}/> &nbsp; 发货</div> : ''
        }
        <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}
              buttonOption={buttonOption}/>
      </div>
    )
  }
}

UpdDeli.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default UpdDeli;











