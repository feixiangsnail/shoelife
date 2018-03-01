import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {formatDate} from 'common/utils';
import {Popconfirm, Button, Icon} from 'antd';
import {H5_URL} from '../../../../../static/apiAlias';
class Topic extends Component {
  del(id) {
    const {toDel} = this.props;
    toDel(id)
    this.refs && this.refs.dt.refresh();
  }
  _getFormItems() {
    const context = this;
    const {params} = context.props;
    let config = {
      formItems: [{
        label: "名称：",
        name: "name",
        span: "6",
        labelCol: {span: 5},
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
      dataIndex: 'name'
    }, {
      key: '1',
      title: 'URL',
      dataIndex: 'url',
      render(key){
        return <a href={key} target="_blank">{key}</a>
      }
    }, {
      key: '2',
      title: '修改时间',
      dataIndex: 'modifyTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      title: '操作',
      dataIndex: 'id',
      render(id, row){
        return <span>
          {
            <Link to={`/market/topic/edit/${id}`}>编辑 / </Link>
          }
          {
            <Popconfirm title="确认删除此网页文件吗？" onConfirm={context.del.bind(context, id, row)}><a href="javascript:;">删除</a></Popconfirm>
          }
        </span>
      }
    }];
    return columns;
  }

  quickButton() {
    return <div style={{textAlign: 'right'}}>
      <Button type="ghost">
        <Link to={`/market/topic/edit`}>
          <Icon type="plus"/> 页面
        </Link>
      </Button>
    </div>
  }
  render() {
    const {formOptions, ...other} = this.props;

    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>
        <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton()} {...other} ref="dt" />
      </div>
    )
  }
}


Topic.propTypes = {

}


export default Topic;
