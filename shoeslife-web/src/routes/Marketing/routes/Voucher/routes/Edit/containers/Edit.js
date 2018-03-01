import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {addItem, modifyItem, view} from '../modules/EditReducer'
import {getTimeStamp, formatDate} from 'common/utils';
import {message} from 'antd';
class Edit extends Component {
  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {},
      item: null,
    }
  }

  componentDidMount() {
    const {view, params} = this.props;
    if (params.id) {
      view(params.id)
    }
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {
      setTimeout(() => {
        nextProps.history.go(-1);
      }, 800);
    }
    if (nextProps.params.id) {
      this.setState({
        item: nextProps.result ? nextProps.result[0] : ''
      })
    }
  }

  getFormOptions() {
    const context = this;
    const {addItem, modifyItem, params} = context.props;
    return {
      handleSubmit(value) {

        // 领取时间必填
        if (!value.sendStartDate || !value.sendEndDate) {
          message.error('领取时间不能为空！', 3);
          return false
        }

        // 使用有效期必填
        if (value.type != 3) {
          if (!value.useStartTime || !value.useEndTime) {
            message.error('使用有效期不能为空！', 3);
            return false
          }
          // 使用有效期结束时间不可以早于领取时间的开始时间
          if (getTimeStamp(value.useEndTime) < getTimeStamp(value.useStartTime)) {
            message.error('使用有效期结束时间不可以早于领取时间的开始时间！', 3);
            return false
          }
          // 使用有效期，强制添加时分秒并转成时间戳，方便后台存储，
          if (value.useStartTime && value.useEndTime) {
            value.useStartTime = getTimeStamp(formatDate(value.useStartTime, false) + ' 00:00:00')
            value.useEndTime = getTimeStamp(formatDate(value.useEndTime, false) + ' 23:59:59')
          }
        }

        // 领取结束时间不能早于起始时间
        if (getTimeStamp(value.sendStartDate) > getTimeStamp(value.sendEndDate)) {
          message.error('领取结束时间不能早于起始时间！', 3);
          return false
        }
        // 领取时间段转成时间戳
        if (value.sendStartDate && value.sendEndDate) {
          value.sendStartTime = getTimeStamp(value.sendStartDate)
          value.sendEndTime = getTimeStamp(value.sendEndDate)
        }

        /**
         * 活动发放-名称、发放形式、单张面额、发放数量、兑换码、领取时间、使用时间、使用说明
         */
        if (value.type == 1) {

          // 兑换码校验
          if (value.conversionCode) {
            if (value.conversionCode.length > 10 || value.conversionCode.length < 2) {
              message.error('兑换码为2～10个字！', 3);
              return false
            }
          }
          params.id ? modifyItem({
            voucherId: params.id,
            name: value.name,
            type: 1,
            totalQuantity: value.totalQuantity,
            denomination: value.denomination,
            conversionCode: value.conversionCode,
            sendStartTime: value.sendStartTime,
            sendEndTime: value.sendEndTime,
            useStartTime: value.useStartTime,
            useEndTime: value.useEndTime,
            instructions: value.instructions,
          }) :
            addItem({
              name: value.name,
              type: 1,
              totalQuantity: value.totalQuantity,
              denomination: value.denomination,
              conversionCode: value.conversionCode,
              sendStartTime: value.sendStartTime,
              sendEndTime: value.sendEndTime,
              useStartTime: value.useStartTime,
              useEndTime: value.useEndTime,
              instructions: value.instructions,
            })
        }

        /**
         * 指定账号-名称、发放形式、单张面额、发放账号、领取时间、使用时间、使用说明
         */
        if (value.type == 2) {

          // 发放账号校验
          if (value.accounts) {
            const reg = /^1[0134578]\d{9}$/;
            if (value.accounts.indexOf('\n') > 0) {
              let arr = value.accounts.split('\n');
              value.totalQuantity = arr.length;
              if (arr.length > 1000) {
                message.error('发放账号最多 1000 个', 3);
                return false
              }
              for (let i = 0; i < arr.length; i++) {
                if (!(reg.test(arr[i]))) {
                  message.error(arr[i] + ' 格式不正确', 3);
                  return false
                }
              }
            } else {
              // value.accounts.indexOf('\n') == -1 只有一个
              if (!(reg.test(value.accounts))) {
                message.error(value.accounts + ' 格式不正确', 3);
                return false
              }
              value.totalQuantity = 1
            }
          } else {
            message.error('发放账号不能为空！', 3);
            return false
          }
          params.id ? modifyItem({
            voucherId: params.id,
            name: value.name,
            type: 2,
            denomination: value.denomination,
            totalQuantity: value.totalQuantity,
            accounts: value.accounts,
            sendStartTime: value.sendStartTime,
            sendEndTime: value.sendEndTime,
            useStartTime: value.useStartTime,
            useEndTime: value.useEndTime,
            instructions: value.instructions,
          }) :
            addItem({
              name: value.name,
              type: 2,
              denomination: value.denomination,
              totalQuantity: value.totalQuantity,
              accounts: value.accounts,
              sendStartTime: value.sendStartTime,
              sendEndTime: value.sendEndTime,
              useStartTime: value.useStartTime,
              useEndTime: value.useEndTime,
              instructions: value.instructions,
            })
        }

        /**
         * 新用户-名称、发放形式、单张面额、发放数量、领取时间、有效天数、使用说明
         */
        if (value.type == 3) {
          params.id ? modifyItem({
            voucherId: params.id,
            name: value.name,
            type: 3,
            denomination: value.denomination,
            totalQuantity: value.totalQuantity,
            sendStartTime: value.sendStartTime,
            sendEndTime: value.sendEndTime,
            expireDate: value.expireDate,
            instructions: value.instructions,
          }) :
            addItem({
              name: value.name,
              type: 3,
              denomination: value.denomination,
              totalQuantity: value.totalQuantity,
              sendStartTime: value.sendStartTime,
              sendEndTime: value.sendEndTime,
              expireDate: value.expireDate,
              instructions: value.instructions,
            })
        }
      },
      handleReset() {
      }
    }
  }

  render() {
    const {item} = this.state;

    const {loading, result, params} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><EditView  {...formOptions} item={item} params={params}/></Panel>
  }
}

Edit.propTypes = {}

const mapActionCreators = {
  view,
  modifyItem,
  addItem
}


const mapStateToProps = (state) => {
  const {result, loading, addResult, isJump, modResult} = state.edit;
  return {'result': result, loading, addResult, isJump, modResult};
}

export default connect(mapStateToProps, mapActionCreators)(Edit)

