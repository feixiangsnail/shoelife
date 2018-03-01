import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {formatDate} from 'common/utils';
import {Row, Col, Button, Icon, Popconfirm} from 'antd';

//平台
const PHONE_TYPE = {
  'IOS': "IOS",
  'android': "android"
};
const PUBLISH_STATUS = {
  'published': "已发布",
  'unpublished': "未发布"
};
const UPGRADE_MODE = {
  'optional': "建议升级",
  'must': "强制升级"
};

class Upgrade extends Component {

  del(id) {
    const {toDel} = this.props;
    toDel(id);
    this.refs && this.refs.dt.refresh();
  }

  published(id) {
    const {toPublished} = this.props;
    toPublished(id);
    this.refs && this.refs.dt.refresh();
  }

  Popconfirm(id) {
    const {toPopconfirm} = this.props;
    toPopconfirm(id)
    this.refs && this.refs.dt.refresh();
  }

  _getFormItems() {
    const {params} = this.props;
    let config = {
      formItems: [{
        label: "平台：",
        name: "appType",
        span: "6",
        labelCol: {span: 7},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(PHONE_TYPE).map((key) => {
            return {'value': key, 'title': PHONE_TYPE[key]}
          })
        }
      }, {
        label: "版本号：",
        name: "versionNumber",
        input: {
          placeholder: "请输入版本号"
        }
      }, {
        label: "发布状态：",
        name: "status",
        span: "6",
        labelCol: {span: 7},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(PUBLISH_STATUS).map((key) => {
            return {'value': key, 'title': PUBLISH_STATUS[key]}
          })
        }
      }
      ],
      initValue: params
    }
    return config;
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '平台',
      dataIndex: 'appType'
    }, {
      key: '1',
      title: '版本号',
      dataIndex: 'versionNumber'
    }, {
      key: '2',
      title: '添加时间',
      dataIndex: 'createTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      key: '3',
      title: '发布时间',
      dataIndex: 'releaseTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      key: '4',
      title: '状态',
      dataIndex: 'status',
      render(key){
        return <span>{PUBLISH_STATUS[key]}</span>
      }
    }, {
      key: '5',
      title: '版本说明',
      dataIndex: 'remark'
    }, {
      key: '6',
      title: '升级方式',
      dataIndex: 'upgradeMode',
      render(key){
        return <span>{UPGRADE_MODE[key]}</span>
      }
    }, {
      title: '操作',
      dataIndex: 'versionId',
      render(id, row){
        return <span>
          <Popconfirm title="是否删除该版本？" onConfirm={context.del.bind(context, id, row)}><a href="javascript:;"> 删除 </a></Popconfirm>
          {
            row.status == 'unpublished' && row.appType == 'IOS' ?
              <Link to={`/operation/upgrade/iosAdd/${id}`}> / 编辑</Link> : ''
          }
          {
            row.status == 'unpublished' && row.appType == 'android' ?
              <Link to={`/operation/upgrade/anAdd/${id}`}> / 编辑</Link> : ''
          }
          {
            row.status == 'unpublished' ?
              <Popconfirm title="是否发布该版本？" onConfirm={context.published.bind(context, id, row)}><a href="javascript:;"> / 发布</a></Popconfirm> : ''
          }
          {
            row.status == 'published' ?
              <Link to={`/operation/upgrade/upgrade/${id}`}> / 升级方式 </Link> : ''
          }

        </span>
      }
    }];
    return columns;
  }

  quickButton() {
    return <Row>
      <Col span="2">
        <Button type="ghost">
          <Link to={`/operation/upgrade/anAdd`}>
            <Icon type="plus"/> 添加 Android
          </Link>
        </Button>
      </Col>
      <Col span="2">
        <Button type="ghost">
          <Link to={`/operation/upgrade/iosAdd`}>
            <Icon type="plus"/> 添加 IOS
          </Link>
        </Button>
      </Col>
    </Row>
  }

  render() {
    const {getFormOptions, tableOptions} = this.props;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={getFormOptions().handleSubmit} onReset={getFormOptions().handleReset}/>
        <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton()} {...tableOptions} ref="dt"/>
      </div>
    )
  }
}

Upgrade.propTypes = {

}

export default Upgrade;
