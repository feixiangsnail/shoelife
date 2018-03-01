import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import {formatDate} from 'common/utils';
import Search from 'components/Search';
import {Row, Col, Button, Icon, DatePicker, Modal} from 'antd';

//用户类型  身份
const TYPE = {
  '1': "普通用户",
  '2': "主编"
};
//性别
const GENDER = {
  '0': "男",
  '1': "女",
};
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
        label: "账号：",
        name: "account",
        span: "6",
        labelCol: {span: 4},
        input: {}
      }, {
        label: "身份：",
        name: "type",
        span: "6",
        labelCol: {span: 4},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(TYPE).map((key) => {
            return {'value': key, 'title': TYPE[key]}
          })
        }
      }, {
        label: "注册日期：",
        span: '12',
        labelCol: {span: 4},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div><DatePicker {...getCustomFieldProps('beginTime')}/>
            <p className="ant-form-split">~</p>
            <DatePicker {...getCustomFieldProps('endTime')}/>
          </div>
        }
      },{
        label: "",
        span: "3",
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div>
            <a href="javascript:;" style={{fontSize:'14'}} onClick={context.recentTime.bind(context,604800000)}>近7天</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="javascript:;" onClick={context.recentTime.bind(context,2592000000)}>近30天</a>
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
      title: '账号',
      dataIndex: 'mobile',
      render(key, row){
        return <Link to={`/users/infor/${row.id}/${row.unionid}`}>{key ? key : row.unionid}</Link>;
      }
    }, {
      key: '1',
      title: '昵称',
      dataIndex: 'userName'
    }, {
      key: '2',
      title: '性别',
      dataIndex: 'gender',
      render(key){
        return GENDER[key]
      }
    }, {
      key: '3',
      title: '身份',
      dataIndex: 'type',
      render(key){
        return TYPE[key]
      }
    }, {
      key: '4',
      title: '注册时间',
      dataIndex: 'createtime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      key: '5',
      title: '最后登录时间',
      dataIndex: 'lastLoginTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
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

List.propTypes = {
  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default List;
