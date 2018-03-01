import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import {DownLoader, UpLoader} from 'components/FileLoader';
import {Row, Col, Button, Input, Alert, Popconfirm, Modal, message} from 'antd';

class Notate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCode: null,
      newName: null
    }
  }
  // 新增
  addNew() {
    const context = this;
    const {addSubm} = context.props;
    addSubm()
  }

  // 删除
  del(id) {
    const {toDel} = this.props;
    toDel(id)
    //this.refs && this.refs.dt.refresh();
  }

  // 编辑
  _update(id,row) {
    row.is = true;
    this.forceUpdate()
  }
  // 完成
  _isSubm(id, row) {
    const {newName,newCode} = this.state;
    const {toSubm, isP} = this.props;
    toSubm(newName, newCode,row)
    row.is = isP;
  }
  _refresh() {
    this.refs.dt.refresh();
  }
  // 取消
  _isReSet(id,row) {
    this.forceUpdate()
    row.is = false;
  }
  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: 'OBJ文件所用名称',
      dataIndex: 'dictCode',
      render(key, row){
        return !row.is ?
          <div style={{color:row.dictId == '-1'?'#f5334a':''}}>{key}</div> :
          <div>
            <Input defaultValue={key} style={{width: '50%'}} onChange={(e) => {
            context.setState({
              newCode: e.target.value
            })
          }}/>
          </div>
      }
    }, {
      key: '1',
      title: '解析后的中文名称',
      dataIndex: 'dictName',
      render(key, row){
        return !row.is ?
          <div style={{color:row.dictId == '-1'?'#f5334a':''}}>{key}</div> :
          <div>
            <Input defaultValue={key} style={{width: '50%'}} onChange={(e) => {
              context.setState({
                newName: e.target.value
              })
            }}/>
          </div>
      }
    }, {
      title: '操作',
      dataIndex: 'dictId',
      render(id, row){
        return !row.is ?<span>
          <a style={{color:row.dictId == '-1'?'#f5334a':''}} href="javascript:;" onClick={context._update.bind(context, id, row)}>编辑</a>
          {
            row.dictId != '-1'?<Popconfirm title="是否删除该用户？" onConfirm={context.del.bind(context, id, row)}>
              <a style={{color:row.dictId == '-1'?'#f5334a':''}} href="javascript:;"> / 删除</a>
            </Popconfirm>:''
          }
        </span>:<span>
          <a href="javascript:;" onClick={context._isSubm.bind(context, id, row)}>完成 / </a>
          <a href="javascript:;" onClick={context._isReSet.bind(context, id, row)}>取消</a>
        </span>
      }
    }];
    return columns;
  }

  quickButton() {
    const context = this;
    const {logList} = context.props; 
    return <Row>
      <Col span='2'>
        <UpLoader upConfig={{
          title:'批量导入',
          action: '/product/admin/dict/upload', 
          onChange:logList,
          beforeUpload: function (file) {
            const isFile = /\.(xls|xlsx|csv)$/ig.test(file.name);
            if (!isFile) {
              message.error('只能上传 xls或xlsx 后缀文件！', 3);
            }
            return isFile;
          }
        }}/>
      </Col>
      <Col span='2'>
        <DownLoader url='/product/admin/dict/down' title='下载配置模板'/>
      </Col>
    </Row>
  }

  render() {
    const {tableOptions, dataSource} = this.props;
    return (
      <div>
        <Alert message="温馨提示"
               description="使用中文命名，导出OBJ文件将无法识别，请务必使用英文／数字命名分组和图层名称。在此处设置命名规范，将用于程序自动解析已上传的OBJ文件"
               type="info" closeText="不再提醒"
               showIcon/>
        <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton()} dataSource={dataSource} {...tableOptions} ref='dt'/>
        <a href="javascript:;" style={{display: 'block', textAlign: 'center', margin: '10px 0'}} onClick={this.addNew.bind(this)}>添加一条</a>
      </div>
    )
  }
}


Notate.propTypes = {}


export default Notate;
