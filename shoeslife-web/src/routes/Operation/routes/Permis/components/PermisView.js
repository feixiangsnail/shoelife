import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import Search from 'components/Search';

import {Row, Col, Button, Icon, Popconfirm} from 'antd';

class Permis extends Component {
  del(id) {
    const {toDel} = this.props;
    toDel(id)
    this.refs && this.refs.dt.refresh();
  }

  lock(id, row) {
    const {toLock} = this.props;
    toLock(id, row)
    this.refs && this.refs.dt.refresh();
  }

  _getFormItems() {
    const {params} = this.props;
    let config = {
      formItems: [{
        label: "账号：",
        name: "email",
        labelCol: {span: 6},
        input: {}
      }],
      initValue: params
    }
    return config;
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '昵称',
      dataIndex: 'userName'
    }, {
      key: '1',
      title: '账号',
      dataIndex: 'email'
    }, {
      key: '2',
      title: '权限',
      dataIndex: 'roleName'
    }, {
      key: '3',
      title: '操作',
      dataIndex: 'id',
      width: '200px',
      render(id, row){
        return row.roleId !== 1 ? <span>
          <Link to={`/operation/permis/edit/${id}`}>编辑 / </Link>
          <Popconfirm title="是否删除该用户？" onConfirm={context.del.bind(context, id, row)}><a href="javascript:;">删除</a></Popconfirm>
          {
            row.status == '0' ?
              <Popconfirm title="是否禁用该用户？" onConfirm={context.lock.bind(context, id, row)}><a href="javascript:;"> / 禁用</a></Popconfirm>
              : <Popconfirm title="是否恢复该用户？" onConfirm={context.lock.bind(context, id, row)}><a href="javascript:;"> / 恢复</a></Popconfirm>
          }
        </span> : ''
      }
    }];
    return columns;
  }

  quickButton() {
    return <Row>
      <Col span='2'>
        <Button type="ghost">
          <Link to={`/operation/permis/add/`}>
            <Icon type="plus"/> 添加管理员
          </Link>
        </Button>
      </Col>
    </Row>
  }

  render() {
    const {getFormOptions, tableOptions, dataSource} = this.props;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={getFormOptions().handleSubmit} onReset={getFormOptions().handleReset}/>
        <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton()} dataSource={dataSource} {...tableOptions} ref='dt'/>
      </div>
    )
  }
}

Permis.propTypes = {}

export default Permis;
