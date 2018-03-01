import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditorApplyView from '../components/EditorApplyView'
import Panel from 'components/Panel'
import {queryList, deleteItem, refuseItem, revokeItem, passItem} from '../modules/EditorApplyReducer'
import {getTimeStamp,initScreen} from 'common/utils';
import {message} from 'antd';

class EditorApply extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.toDel = this._del.bind(this);
    this.toRefuse = this._refuse.bind(this);
    this.toRevoke = this._revoke.bind(this);
    this.toPass = this._pass.bind(this);

    this.state = {
      params: initScreen({
        data:{
          status:null
        }
      })
    }
  }
  _del(id) {
    const {deleteItem} = this.props;
    deleteItem(id)
  }

  _refuse(id) {
    const {refuseItem} = this.props;
    refuseItem(id)
  }
  _revoke(id) {
    const {revokeItem} = this.props;
    revokeItem(id)
  }
  _pass(id) {
    const {passItem} = this.props;
    passItem(id)
  }


  componentDidMount() {
    const {queryList, location} = this.props;
    const {params} = this.state;
    queryList(params);
  }

  getFormOptions() {
    const context = this;
    return {
      handleSubmit(value) {
        if (getTimeStamp(value.beginTime) > getTimeStamp(value.endTime)) {
          message.error('开始时间不能晚于结束时间！');
          return false
        } else {
          context.setState({
            params: value
          })
        }
      },
      handleReset() {
        setTimeout(() => {
          context.setState({
            params: {
              status:null
            }
          })
        });
      }
    }
  }

  render() {
    const {params} = this.state;
    const {list, queryList, total, loading, delResult, refuseResult,revokeResult,passResult} = this.props;
    const tableOptions = {
      dataSource: list,                         //加载组件时，表格从容器里获取初始值
      action: queryList,                         //表格翻页时触发的action
      pagination: {                              //表格页码配置，如果为false，则不展示页码
        total: total                             //数据总数
      },
      loading,                                    //表格加载数据状态
      params,                                     //表格检索数据参数
    }


    return <Panel title=""><EditorApplyView tableOptions={tableOptions} getFormOptions={this.getFormOptions}
                                     toDel={this.toDel} params={params} toRefuse={this.toRefuse} toRevoke={this.toRevoke} toPass={this.toPass}
    /></Panel>
  }
}


EditorApply.propTypes = {

}

const mapActionCreators = {
  queryList,
  deleteItem,
  refuseItem,
  revokeItem,
  passItem
}


const mapStateToProps = (state) => {
  const {result,delResult,refuseResult,loading, revokeResult, passResult} = state.editorApply;

  let list = [],total = 0;
  if(result instanceof Array){
      list = result[0].list;
      total = result[0].total;
  }

  return {list, total, loading, delResult, refuseResult,revokeResult,passResult};

}

export default connect(mapStateToProps, mapActionCreators)(EditorApply)
