import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import TabsView from '../components/TabsView'
import Panel from 'components/Panel'
import {queryList, modifyItem, deleteItem, deleteSpace, modifySpace, spaceList} from '../modules/AdvertiseReducer'
import {getTimeStamp, getNowTime, formatDate, initManyScreen} from 'common/utils';
class Advertise extends Component {
  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.toDel = this._del.bind(this);
    this.toDelSpace = this._delSpace.bind(this);
    this.toRelease = this._release.bind(this);
    this.toEdit = this._edit.bind(this);
    let params = initManyScreen(['ad', 'space']);
    params.ad.spaceId = params.ad.spaceId || null;
    params.ad.status = params.ad.status || null;
    params.ad.play = params.ad.play || null;
    this.state = {
      params: params
    }
  }

  // 广告-删除
  _del(id) {
    const {deleteItem} = this.props;
    deleteItem(id)
  }

  // 广告位-删除
  _delSpace(id, row) {
    const {deleteSpace} = this.props;
    deleteSpace(row.id)
  }

  // 广告-发布/暂停发布/恢复发布
  _release(id, row) {
    const {modifyItem} = this.props;
    if (row.status == 'UNRELEASE') {
      modifyItem({
        id: id,
        status: 'RELEASE'
      })
    } else if (row.status == 'RELEASE') {
      modifyItem({
        id: id,
        status: 'PAUSE'
      })
    } else {
      modifyItem({
        id: id,
        status: 'RELEASE'
      })
    }
  }

  // 广告位-编辑
  _edit(newName, row) {
    const {modifySpace} = this.props;
    modifySpace({
      id: row.id,
      name: newName || row.name
    })
  }

  componentDidMount() {
    const {params} = this.state;
    const {queryList, spaceList} = this.props;
    queryList(params.ad);
    spaceList({pageSize: 999})
  }

  componentWillReceiveProps(nextProps) {
    const {params} = this.state;
    /*if (nextProps.modResult.is) {
      nextProps.modResult.is = false;
      nextProps.queryList(params);
      return;
    }
    if (nextProps.delResult.is) {
      nextProps.delResult.is = false;
      nextProps.queryList(params);
      return;
    }
    if (nextProps.modSpaceResult.is) {
      nextProps.modSpaceResult.is = false;
      nextProps.spaceList({pageSize: 999})
      return;
    }
    if (nextProps.delSpaceResult.is) {
      nextProps.delSpaceResult.is = false;
      nextProps.spaceList({pageSize: 999})
      return;
    }*/
  }

  getFormOptions() {
    const context = this;
    const {queryList} = this.props;
    return {
      handleSubmit(value) {
        context.state.params.ad = value;
        context.forceUpdate()
      },
      handleReset() {
        setTimeout(() => {
          context.state.params.ad = {};
          queryList(context.state.params.ad);
        });
      }
    }
  }

  render() {
    const {params} = this.state;
    const {list, queryList, total, loading, spaceResult, spaceList,isP} = this.props;
    const tableOptions = {
      dataSource: list,
      action: queryList,
      pagination: {
        total: total
      },
      loading,
      params: params.ad
    }
    const tableOptionsP = {
      dataSource: spaceResult && spaceResult.length ? spaceResult[0] : [],
      action: spaceList,
      pagination: false,
      loading,
    }
    /**
     * 广告位
     * @type {Array}
     */
    let sList = [];
    if (spaceResult) {
      sList = spaceResult && spaceResult.length && spaceResult[0].map(c => {
          return {
            value: c.id,
            title: c.name
          }
        });
    } else {
      sList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
    return <Panel title=""><TabsView tableOptions={tableOptions} getFormOptions={this.getFormOptions} sList={sList} toEdit={this.toEdit}
                                     tableOptionsP={tableOptionsP} toDel={this.toDel} toRelease={this.toRelease} toDelSpace={this.toDelSpace}
                                     params={params} isP={isP}
    /></Panel>
  }
}

Advertise.propTypes = {}

const mapActionCreators = {
  queryList,
  modifyItem,
  deleteItem,
  deleteSpace,
  modifySpace,
  spaceList
}

const mapStateToProps = (state) => {
  const {result, modResult = {}, modSpaceResult, delResult, delSpaceResult, spaceResult, loading, isP} = state.advertise;
  let list = [], total = 0;
  if (result instanceof Array) {
    list = result[0].list;
    total = result[0].total;
  }
  return {list, total, loading, modResult, modSpaceResult, delResult, delSpaceResult, spaceResult, isP};
}

export default connect(mapStateToProps, mapActionCreators)(Advertise)

