import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import DynamicView from '../components/DynamicView'
import Panel from 'components/Panel'
import {queryList, desList, modifyItem, deleteItem} from '../modules/DynamicReducer'
import {initScreen} from 'common/utils';
import store from 'store2';
class Dynamic extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.toDel = this._del.bind(this);
    this.toRelease = this._release.bind(this);
    this.state = {
      params: initScreen({
        data: {
          designerId: null
        }
      })
    }
  }

  // 发布
  _release(id, row) {
    const {modifyItem} = this.props;
    modifyItem({
      designerDynamicId: id,
      isRelease: '0'
    })
  }

  //删除
  _del(id) {
    const {deleteItem} = this.props;
    deleteItem(id)
  }

  componentDidMount() {
    const getUserInfor = store.get('USER') && store.get('USER')[0];
    const {queryList, desList} = this.props;
    const {params} = this.state;
    desList();
    if (getUserInfor.designer) {
      queryList({
        designerId: getUserInfor.accountId
      })
    } else {
      queryList(params);
    }
  }

  getFormOptions() {
    const context = this;
    return {
      handleSubmit(value) {
        context.setState({
          params: value
        })
      },
      handleReset() {
        setTimeout(() => {
          context.setState({
            params: {
              designerId: null
            }
          })
        });
      }
    }
  }

  render() {
    const {params} = this.state;
    const {list, queryList, desResult, total, loading} = this.props;
    const tableOptions = {
      dataSource: list,
      action: queryList,
      pagination: {
        total: total
      },
      loading,
      params
    }

    const formOptions = {
      'formOptions': this.getFormOptions()
    }
    /**
     * 设计师
     * @type {Array}
     */
    let dList = [];
    if (desResult) {
      dList = desResult.map(c => {
        return {
          value: c.id,
          title: c.adminName
        }
      });
    } else {
      dList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
    const getUserInfor = store.get('USER') && store.get('USER')[0];
    if(getUserInfor.designer){
      params.designerId = getUserInfor.accountId;
    }

    return <Panel title=""><DynamicView {...tableOptions} {...formOptions} params={params} isDeser={getUserInfor.designer}
                                        toDel={this.toDel} toRelease={this.toRelease} dList={dList}/></Panel>
  }
}

Dynamic.propTypes = {}

const mapActionCreators = {
  queryList,
  deleteItem,
  modifyItem,
  desList
}

const mapStateToProps = (state) => {
  const {result, loading, modResult, desResult, delResult, isOk} = state.dynamic;
  let list = [], total = 0;
  if (result instanceof Array) {
    list = result[0].list;
    total = result[0].total;
  }
  return {list, total, loading, modResult, desResult, delResult, isOk};
}

export default connect(mapStateToProps, mapActionCreators)(Dynamic)
