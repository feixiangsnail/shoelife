import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import {formatDate} from 'common/utils';
import {Popconfirm, Icon, Input, message} from 'antd';
//广告类型
const TYPE = {
  'ICON': "图片广告",
};
class Advertise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: null
    }
  }

  del(id,row) {
    const {toDelSpace} = this.props;
    toDelSpace(id,row)
    this.refs && this.refs.dt.refresh();
  }

  edit(row) {
    row.is = true;
    this.forceUpdate()
  }

  isSubm(key, row) {
    const {newName} = this.state;
    const {toEdit, isP} = this.props;
    toEdit(newName, row)
    row.is = isP;
    this.refs && this.refs.dt.refresh();
  }

  isReSet(row) {
    this.forceUpdate()
    row.is = false;
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '广告位ID',
      dataIndex: 'id'
    }, {
      key: '1',
      title: '广告位名称',
      dataIndex: 'name',
      render(key, row){
        return !row.is ? <div>{key}&nbsp; &nbsp; &nbsp; &nbsp;
          <Icon type="edit" style={{color: '#2db7f5', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer'}}
                onClick={context.edit.bind(context, row)}/>
        </div> :
          <div>
            <Input defaultValue={key} style={{width: '50%'}} onChange={(e) => {
              if (e.target.value.length > 20) {
                message.warning('请输入广告位名称,20个字符以内');
                return false
              }
              context.setState({
                newName: e.target.value
              })
            }}/> &nbsp; &nbsp;
            <Icon type="check" style={{color: '#2db7f5', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer'}}
                  onClick={context.isSubm.bind(context, key, row)}/>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <Icon type="cross" style={{color: '#2db7f5', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer'}}
                  onClick={context.isReSet.bind(context, row)}/>
          </div>
      },
    }, {
      key: '2',
      title: '广告类型',
      dataIndex: 'type',
      render(key){
        return TYPE[key]
      }
    }, {
      key: '3',
      title: '添加时间',
      dataIndex: 'createTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      key: '4',
      title: '轮播广告数',
      dataIndex: 'standNumber',
    }, {
      title: '操作',
      dataIndex: 'modifyTime',
      render(id, row){
        return <span>
          {
            <Popconfirm title="确认删除此广告位吗？" onConfirm={context.del.bind(context, id, row)}><a href="javascript:;">删除</a></Popconfirm>
          }
        </span>
      }
    }];
    return columns;
  }

  render() {
    const {tableOptionsP} = this.props;
    return (
      <div>
        <DataTable bordered={true} columns={this._getColumns()} {...tableOptionsP} ref='dt'/>
      </div>
    )
  }
}

Advertise.propTypes = {}

export default Advertise;
