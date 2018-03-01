import React, {Component, PropTypes} from 'react';
import DataTable from 'components/DataTable';
import {formatDate} from 'common/utils';
import Search from 'components/Search';
import {Row, Col, Button, Icon, Popconfirm, DatePicker} from 'antd';
//状态
const STATUS = {
  '0': "申请中",
  '1': "已通过",
  '2': "已拒绝",
  '3': "已解除",
};

class EditorApply extends Component {
  revoke(id) {
    const {toRevoke} = this.props;
    toRevoke(id);
    this.refs && this.refs.dt.refresh();
  }

  pass(id) {
    const {toPass} = this.props;
    toPass(id);
    this.refs && this.refs.dt.refresh();
  }

  refuse(id) {
    const {toRefuse} = this.props;
    toRefuse(id);
    this.refs && this.refs.dt.refresh();
  }

  del(id) {
    const {toDel} = this.props;
    toDel(id)
    this.refs && this.refs.dt.refresh();
  }

  _getFormItems() {
    const {params} = this.props;
    const context = this;
    let config = {
      formItems: [{
        label: "关键字：",
        name: "mobile",
        span: "6",
        labelCol: {span: 7},
        input: {
          placeholder: "昵称/手机号"
        }
      }, {
        label: "状态：",
        name: "status",
        span: "6",
        labelCol: {span: 6},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(STATUS).map((key) => {
            return {'value': key, 'title': STATUS[key]}
          })
        }
      }, {
        label: "申请时间：",
        span: '11',
        labelCol: {span: 4},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div><DatePicker {...getCustomFieldProps('beginTime')}/>
            <p className="ant-form-split">~</p>
            <DatePicker {...getCustomFieldProps('endTime')}/>
          </div>
        }
      }],
      initValue:params
    }
    return config;
  }


  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '状态',
      dataIndex: 'status',
      render(key){
        return <span>{STATUS[key]}</span>;
      }
    }, {
      key: '1',
      title: '昵称',
      dataIndex: 'userName'
    }, {
      key: '2',
      title: '个人简介',
      dataIndex: 'selfProfile',
      width:'500px'
    }, {
      key: '3',
      title: '手机号',
      dataIndex: 'mobile'
    }, {
      key: '4',
      title: '微信/邮箱',
      dataIndex: 'wachat'
    }, {
      key: '7',
      title: '申请时间',
      dataIndex: 'createTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      title: '操作',
      dataIndex: 'editorApplyId',
      width: '150px',
      render(id, row){
        return <span>
                  {
                    row.status == 0 ?
                      <Popconfirm title="确认通过主编申请吗？" onConfirm={context.pass.bind(context, id, row)}><a href="javascript:;">通过
                        / </a></Popconfirm> : ''
                  }
                  {
                    row.status == 0 ?
                      <Popconfirm title="确认拒绝申请吗？" onConfirm={context.refuse.bind(context, id, row)}><a href="javascript:;">拒绝</a></Popconfirm> : ''
                  }
                  {
                    row.status == 2 ?
                      <Popconfirm title="确认删除申请吗？" onConfirm={context.del.bind(context, id, row)}><a href="javascript:;">删除</a></Popconfirm> : ''
                  }
                  {
                    row.status == 1 ?
                      <Popconfirm title="确认删除申请吗？" onConfirm={context.revoke.bind(context, id, row)}><a href="javascript:;">解除身份</a></Popconfirm> : ''
                  }
        </span>
      }
    }];
    return columns;
  }

  render() {
    const {getFormOptions, tableOptions} = this.props;

    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={getFormOptions().handleSubmit} onReset={getFormOptions().handleReset}/>
        <DataTable bordered={true} columns={this._getColumns()} {...tableOptions} ref="dt"/>
      </div>
    )
  }
}

EditorApply.propTypes = {

}

export default EditorApply;
