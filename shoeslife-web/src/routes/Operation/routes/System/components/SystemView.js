import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';

class System extends Component {

  _getFormItems() {
    const {params} = this.props;
    let config = {
      formItems: [{
        label: "关键字：",
        name: "paramName",
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
      title: '名称',
      dataIndex: 'paramName',
      width:'300px',
      render(id, row){
        return <dl>
          <dt>{row.paramName}</dt>
          <dd>说明：{row.remark}</dd>
        </dl>
      }
    }, {
      key: '1',
      title: 'Value',
      dataIndex: 'paramValue',
    }, {
      title: '操作',
      dataIndex: 'paramId',
      width:'50px',
      render(id, row){
        return <Link to={`/operation/system/edit/${id}`}>编辑</Link>
      }
    }];
    return columns;
  }

  render() {
    const {formOptions, ...other} = this.props;

    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>
        <DataTable bordered={false} columns={this._getColumns()}  {...other} />
      </div>
    )
  }
}

System.propTypes = {

  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default System;
