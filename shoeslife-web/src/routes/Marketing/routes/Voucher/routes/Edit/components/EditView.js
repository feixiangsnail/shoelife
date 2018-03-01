import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {message, DatePicker, InputNumber} from 'antd';
import {formatDate, getTimeStamp} from 'common/utils';
import Form from 'components/Form';
import classes from './style.less';
const TYPE = {
  '1': "活动发放",
  '2': "指定账号",
  '3': "新用户",
};
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useType: props.params.type || '1'
    }
  }

  _getFormItems() {
    const context = this;
    const {useType} = context.state;
    const {item, params} = context.props;
    const disabledDate = (current) => {
      return current && getTimeStamp(formatDate(current.getTime(), false)) < getTimeStamp(formatDate(Date.now(), false))
    };
    let config = {
      formItems: [{
        label: "活动名称：",
        name: "name",
        rules: [
          {required: true, message: '名称为10个字以内'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (value.length > 10) {
                    callback([new Error('名称为10个字以内')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {}
      }, params.type ? {
        label: "发放形式：",
        name: "type",
        custom(getCustomFieldProps) {
          return <label className="ant-checkbox-inline">
            <span>{TYPE[params.type]}</span>
          </label>
        }
      } : {
        label: "发放形式：",
        name: "type",
        rules: [{required: true, type: 'string', message: '请选择发放形式'}],
        radio: {
          radioValue: [
            {value: '1', title: '活动发放'},
            {value: '2', title: '指定账号'},
            {value: '3', title: '新用户'},
          ],
          value: useType,
          onChange: (e) => {
            this.setState({
              useType: e.target.value
            })
          },
          disabled: params.id ? true : false
        }
      }, {
        label: "单张面额：",
        name: "denomination",
        rules: [{required: true, type: 'number', message: '请输入2-4位的整数'}],
        infoLabel: <div style={{color: '#999'}}>元，无需小数点</div>,
        inputNumber: {
          min: 10,
          max: 9999,
          style: {
            width: '100px',
            float: 'left'
          }
        }
      }, {
        label: "发送数量：",
        name: "totalQuantity",
        cName: useType == '2' ? classes.isHide : classes.isShow,
        wrapperCol: {span: 9},
        rules: [{required: useType != '2' ? true : false, message: '请输入1-7位的整数'}],
        infoLabel: <div style={{color: '#999'}}>份，为确保活动可控性，请设置优惠券发放上限</div>,
        inputNumber: {
          min: 1,
          max: 9999999,
          style: {
            width: '100px',
            float: 'left'
          }
        }
      }, {
        label: "兑换码：",
        name: "conversionCode",
        cName: useType == '1' ? classes.isShow : classes.isHide,
        infoLabel: <div style={{color: '#999'}}>输入后即可兑换（领取）此优惠券</div>,
        input: {
          style: {
            width: '100px',
            float: 'left',
            marginRight: '10px'
          }
        }
      }, {
        label: "发放账号：",
        name: "accounts",
        cName: useType == '2' ? classes.isShow : classes.isHide,
        required: true,
        input: {
          type: "textarea",
          rows: 8,
          max: 10,
          style: {
            width: '150px'
          },
          placeholder: ''
        }
      }, {
        label: "领取时间段：",
        required: true,
        labelCol: {span: 2},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div><DatePicker {...getCustomFieldProps('sendStartDate')} showTime={true} format="yyyy-MM-dd HH:mm:ss" disabledDate={disabledDate}/>
            <p className="ant-form-split">~</p>
            <DatePicker {...getCustomFieldProps('sendEndDate')} showTime={true} format="yyyy-MM-dd HH:mm:ss" disabledDate={disabledDate}/>
          </div>
        }
      }, {
        label: "使用有效期：",
        required: true,
        cName: useType == '3' ? classes.isHide : classes.isShow,
        labelCol: {span: 2},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div><DatePicker {...getCustomFieldProps('useStartTime')} showTime={false} format="yyyy-MM-dd" disabledDate={disabledDate}/>
            <p className="ant-form-split">~</p>
            <DatePicker {...getCustomFieldProps('useEndTime')} showTime={false} format="yyyy-MM-dd" disabledDate={disabledDate}/>
          </div>
        }
      }, {
        label: "有效天数：",
        name: "expireDate",
        cName: useType == '3' ? classes.isShow : classes.isHide,
        rules: [{required: useType == '3' ? true : false, message: '请输入1-3位的整数'}],
        infoLabel: <div style={{color: '#999'}}>天内，用户领取后的有效期</div>,
        inputNumber: {
          min: 1,
          max: 999,
          style: {
            width: '100px',
            float: 'left'
          }
        }
      }, {
        label: "使用说明：",
        name: "instructions",
        rules: [
          {required: true, message: '请输入使用说明，5～30个字'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (value.length < 5 || value.length > 30) {
                    callback([new Error('请输入使用说明，5～30个字以内')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {
          type: "textarea",
          rows: 5,
          placeholder: '请告知用户使用方式及规则'
        }
      }],
      initValue: {
        name: null,
        type: null,
        denomination: '',
        instructions: '有效期内即可使用',
        totalQuantity: '',
        conversionCode: null,
        accounts: null,
        sendStartDate: null,
        sendEndDate: null,
        useStartTime: null,
        useEndTime: null,
        expireDate: '',
      }
    }
    config.initValue.type = useType
    /**
     * 1-活动发放：发放数量、兑换码、使用有效期
     * 2-指定账号：发放账号、使用有效期
     * 3-新用户：发放数量、有效天数
     */
    if (item) {
      config.initValue = item
      if (item.sendStartTime) {
        config.initValue.sendStartDate = formatDate(item.sendStartTime, 'yyyy-MM-dd HH:mm:ss')
      }
      if (item.sendEndTime) {
        config.initValue.sendEndDate = formatDate(item.sendEndTime, 'yyyy-MM-dd HH:mm:ss')
      }
      if (item.useStartTime) {
        config.initValue.useStartTime = formatDate(item.useStartTime, 'yyyy-MM-dd')
      }
      if (item.useEndTime) {
        config.initValue.useEndTime = formatDate(item.useEndTime, 'yyyy-MM-dd')
      }
    }
    return config;
  }

  render() {
    const {formOptions, ...other} = this.props;

    return (
      <div>
        <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>
      </div>
    )
  }
}


Edit.propTypes = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Edit;
