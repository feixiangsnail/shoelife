import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classes from './style.less';
import Form from 'components/Form';
import {Row, Col, Button, Icon, Checkbox} from 'antd';
import {formatDate} from 'common/utils';


/**
 * 服务类型+状态
 *
 * 受理中----发货
 *
 * 已收到商品 服务类型退货----退款
 * @type {[*]}
 */
//快递公司
const CLIST = [{value: 'SFEXPRESS', title: "顺丰快递"}]
//支付方式
const PAYTYPE = {
  'ALIPAY': "支付宝支付",
  'WACHAT': "微信支付"
}

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
    const {item} = context.props;
    const sentForm = [
      {
        label: "快递公司：",
        name: "companyExpressCompany",
        rules: [{required: true, type: 'string', message: '请选择快递公司'}],
        select: {
          optionValue: CLIST
        }
      }, {
        label: "快递单号：",
        name: "companyExpressNo",
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
    const returnForm = [
      {
        label: "退款方式：",
        custom(getCustomFieldProps) {
          return <span name="returnType">原路径退回（{PAYTYPE[item.returnType]}）</span>
        }
      }, {
        label: "退款金额：",
        name: "returnPrice",
        cName: 'afterInput',
        wrapperCol: {span: 9},
        disabled: true,
        infoLabel: <div style={{color: '#76838f'}}> &nbsp; 元，订单实付金额为&#65509; {item.returnPrice}</div>,
        input: {
          style: {width: '100px'},
        }
      }
    ]
    let config = {
      formItems: [],
      initValue: {
        companyExpressCompany: 'SFEXPRESS',
        companyExpressNo: null,
        returnType: null,
        returnPrice: null
      }
    }
    if (isCheck) {
      /**item.aftersaleType == 3 ? '退款' : '发货'
       * STATUS==3 && TYPE ==3  显示“退款”操作---7
       * STATUS==3 && TYPE !=3/4  显示“发货”操作---7
       */
      config.formItems = item.aftersaleType == '3' ? returnForm : sentForm
    }
    if (item) {
      config.initValue.returnType = item.returnType;
      config.initValue.returnPrice = item.returnPrice;
    }
    return config;
  }

  /**
   * 售后服务状态
   * @param d
   * @returns {*}
   */
  getMassge(s) {
    switch (s.afterSaleStatus) {
      case "0":
        return "您已取消申请"
        break;
      case "1":
        return "您的服务单已申请，请等待商家审核"
        break;
      case "2":
        return "您的服务单审核关闭"
        break;
      case "3":
        return "商家已审核通过，请将商品寄到指定地址，并填写快递信息"
        break;
      case "4":
        return "等待商家收货"
        break;
      case "5":
        return "已收到您的商品，即将开始受理"
        break;
      case "6":
        return "商家正在受理"
        break;
      case "7":
        return "已收到商品"
        break;
      case "8":
        return "服务单已完成，并为您创建新的订单，感谢您的支持与理解，祝生活愉快"
        break;
      case "9":
        return "订单金额已退回原支付方式，约1~10个工作日到账，请注意查收"
        break;
      case "10":
        return "服务单已完成，感谢您的支持与理解，祝生活愉快"
        break;
      case "11":
        return "您的商品已寄回，请注意查收"
        break;
    }
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
      statusList = item.afterSaleStatus;
    }
    return (
      <div className={classes.infor}>
        <ul>
          <li>收件信息：{item.addressInfo}</li>
        </ul>
        {
          statusList && statusList.length && statusList.map((s, index) => {
            return <div className={classes.inforCheck} key={index}>
              <Checkbox defaultChecked={true} disabled={true}/>  &nbsp; {formatDate(s.createTime,'yyyy-MM-dd HH:mm:ss')} &nbsp; &nbsp;  &nbsp; {this.getMassge(s)}
            </div>
          })
        }
        {/**
         * STATUS==3/4  显示“已收到商品”操作（已审核通过，商家未受到商品之前显示）---5
         * STATUS==5 TYPE !=3   显示“开始受理”操作（商家确认收到商品后可以开始受理）----6
         * STATUS==5/6 && TYPE ==3  显示“退款”操作（拖货：商家确认收到后可办理退货）---9
         * STATUS==6 && TYPE !=3   显示“发货”操作（商家受理后可发货）-----11
         * 只循环一次
         */
        }
        {
          item.aftersaleStatus == '3' || item.aftersaleStatus == '4' ? <div><Checkbox defaultChecked={false}/> &nbsp; 已收到商品</div> : ''
        }
        {
          item.aftersaleStatus == '5' && item.aftersaleType !== '3' ? <div><Checkbox defaultChecked={false}/> &nbsp; 开始受理</div> : ''
        }
        {
          (item.aftersaleStatus == '6'||item.aftersaleStatus == '5') && (item.aftersaleType == '3') ?
            <div><Checkbox defaultChecked={false} onChange={(e) => {
              this.setState({isCheck: e.target.checked})
            }}/> &nbsp; 退款</div> : ''
        }
        {
          (item.aftersaleStatus == '6') && (item.aftersaleType !== '3') && (item.aftersaleType !== '4') ? <div>
            <Checkbox defaultChecked={false} onChange={(e) => {
              this.setState({isCheck: e.target.checked})
            }}/> &nbsp; 发货</div> : ''
        }
        <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}
              buttonOption={buttonOption}/>
      </div>
    )
  }
}

UpdDeli.propTypes = {}

export default UpdDeli;





































