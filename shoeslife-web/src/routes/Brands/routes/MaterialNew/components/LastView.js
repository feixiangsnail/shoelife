import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import Search from 'components/Search';

import {formatDate} from 'common/utils';

import {Row, Col, Button, Icon, Popconfirm} from 'antd';

class Last extends Component {

  delLast(id) {
    const {toDel} = this.props;
    toDel(id)
    this.refs && this.refs.dt.refresh();
  }

  _getFormItems() {
    let {params} = this.props;
    let config = {
      formItems: [{
        label: "关键字：",
        name: "searchKey",
        labelCol: {span: 6},
        input: {
          placeholder: '名称或编号'
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
      title: '名称',
      dataIndex: 'materialName'
    }, {
      key: '1',
      title: '编号',
      dataIndex: 'materialIdentifier'
    },{
      key: '2',
      title: '跟高',
      dataIndex: 'lastHeight'
    }, {
      key: '3',
      title: '更新时间',
      dataIndex: 'modifyTime',
      render(key){
        return formatDate(key,'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      title: '操作',
      dataIndex: 'materialId',
      render(id, row){
        return <span>
          <Popconfirm title="删除后不可恢复，确认该楦头么？" onConfirm={context.delLast.bind(context, id, row)}><a href="javascript:;">删除 / </a></Popconfirm>
          <Link to={`/brand/materialNew/editLast/${id}`}>编辑</Link>
        </span>
      }
    }];
    return columns;
  }

  quickButton() {
    return <Row>
      <Col span='2'>
        <Button type="ghost">
          <Link to={`/brand/materialNew/editLast`}>
            <Icon type="plus"/> 添加楦头
          </Link>
        </Button>
      </Col>
    </Row>
  }

  render() {
    const {tableLastOptions, getFormLastOptions} = this.props;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={getFormLastOptions().handleSubmit} onReset={getFormLastOptions().handleReset} sign="last" />
        <DataTable bordered={true} columns={this._getColumns()} {...tableLastOptions} quickButton={this.quickButton()} ref='dt' sign="last"/>
      </div>
    )
  }
}


Last.propTypes = {}


export default Last;
