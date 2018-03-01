import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import CollectView from '../components/CollectView'
import Panel from 'components/Panel'
import {queryList, addItem, modifyItem, deleteItem, setsSort, setStatus, shoeList, sCateList} from '../modules/CollectReducer'
import {message} from 'antd';
class Collect extends Component {

  constructor(props) {
    super(props);
    this.toSubm = this._Subm.bind(this);
    this.chooseFormOption = this._chooseFormOption.bind(this);
    this.toGet = this._toGet.bind(this);
    this.toDelImg = this._toDelImg.bind(this);
    this.isOK = this._isOK.bind(this);
    this.toDel = this._del.bind(this);
    this.toRelease = this._release.bind(this);
    this.getSort = this._sort.bind(this);
    this.isOKSort = this._isOKSort.bind(this);
    this.state = {
      params: {},
      selectList: null,
      tabDataSource: [],
      selectTable: null,
      selectedRowKeys: [],
      tabDataAddSource:[]
    }
  }

  /**
   * 编辑/新增文字
   * @param key
   * @param row
   * @returns {boolean}
   * @private
   */
  _Subm(key, row) {
    const context = this;
    const {tabDataSource,tabDataAddSource} = context.state;
    const {addItem, modifyItem} = context.props;
    let ids = tabDataSource && tabDataSource.length > 0 && tabDataSource.map(c => {
        return c.shoeId
      });
    let idsAdd = tabDataAddSource && tabDataAddSource.length > 0 && tabDataAddSource.map(c => {
        return c.shoeId
      });
    if (ids.length < 3 || ids.length > 10) {
      message.error('添加鞋款为3～10款以内');
      return false
    }
    if (idsAdd.length < 3 || idsAdd.length > 10) {
      message.error('添加鞋款为3～10款以内11111111');
      return false
    }
    if(key.length > 10){
      message.error('请输入10个字以内');
      return false
    }
    row.id ? modifyItem({
      id: row.id,
      name: key || row.name,
      shoeIds: ids && ids.length ? ids.join(',') : row.shoeIds
    }) :
      addItem({
        name: key,
        sortWeight: 100,
        shoeIds: idsAdd && idsAdd.length ? idsAdd.join(',') : null
      })
  }

  /**
   * 弹出层添加图片
   * @param data
   * @param key
   * @returns {boolean}
   * @private
   */
  _isOK(data, key) {
    const {modifyItem} = this.props,
      {tabDataSource,tabDataAddSource} = this.state;
    let index = true;
    data.map((objd) => {
      index = true;
      tabDataSource.map((obj) => {
        if (obj.shoeId == objd.shoeId) index = false;
      });
      if(index && key && key.id){
        tabDataSource.push(objd);
      }else {
        tabDataAddSource.push(objd);
      }
    });
    this.setState({
      //tabDataSource: tabDataSource,
      selectedRowKeys: [],
      selectList: []
    });
    let addId = tabDataSource.length && tabDataSource.map((t) => {
        return t.shoeId
      })
    if (key && key.id) {
      let ids = Array.from(
        new Set(
          !!(key.shoeInfos && key.shoeInfos.length) ? key.shoeInfos.map((k) => {
            return k.shoeId
          }).concat(addId) : addId
        )
      )
      if (ids.length < 3 || ids.length > 10) {
        message.error('添加鞋款为3～10款以内');
        return false
      }
      modifyItem({
        id: key.id,
        shoeIds: ids && ids.length ? ids.join(',') : null
      })
    }
  }

  /**
   * 修改排序
   * @param sortData
   * @private
   */
  _isOKSort(sortData) {
    const context = this;
    const {setsSort} = context.props
    let sortParam = sortData && sortData.length && sortData.map((s) => {
        return {
          id: s.id,
          sortWeight: s.sortWeight
        }
      })
    setsSort(sortParam)
  }

  /**
   * 删除图片
   * @param filterIds
   * @param row
   * @returns {boolean}
   * @private
   */
  _toDelImg(filterIds, row) {
    const context = this;
    const {modifyItem} = context.props
    /*if (filterIds.length < 3 || filterIds.length > 10) {
      message.error('添加鞋款为3～10款以内');
      return false
    }*/
    modifyItem({
      id: row.id,
      shoeIds: filterIds.length ? filterIds.join(',') : null
    })
  }

  /**
   * 获取鞋列表
   * @private
   */
  _toGet() {
    const context = this;
    const {shoeList, sCateList} = context.props;
    shoeList({
      pageNum: 1,
      pageSize: 20,
      status: "ONLINE"
    })
    sCateList({
      categoryType: '1'
    })
  }

  /**
   * 获取排序列表
   * @private
   */
  _sort() {
    const {queryList} = this.props;
    queryList({pageSize: 999});
  }

  /**
   * 发布
   * @param row
   * @private
   */
  _release(row) {
    const {setStatus} = this.props;
    if (row.shoeInfos && row.shoeInfos.length < 3) {
      message.error('至少要添加3款鞋，才可发布');
      return false
    }
    setStatus({
      status: 'ONLINE',
      id: row.id
    })
  }

  /**
   * 删除
   * @param row
   * @private
   */
  _del(row) {
    const {deleteItem} = this.props;
    deleteItem(row.id)
  }

  componentDidMount() {
    const {queryList} = this.props;
    queryList({pageSize: 999});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.delResult.is) {
      nextProps.delResult.is = false;
      nextProps.queryList({pageSize: 999});
      return;
    }
    if (nextProps.modResult.is) {
      nextProps.modResult.is = false;
      nextProps.queryList({pageSize: 999});
      this.setState({tabDataSource:[]})
      return;
    }
    if (nextProps.addResult.is) {
      nextProps.addResult.is = false;
      nextProps.queryList({pageSize: 999});
      this.setState({tabDataAddSource:[]})
      return;
    }
    if (nextProps.statusResult.is) {
      nextProps.statusResult.is = false;
      nextProps.queryList({pageSize: 999});
      return;
    }
    if (nextProps.sortResult.is) {
      nextProps.sortResult.is = false;
      nextProps.queryList({pageSize: 999});
      return;
    }
  }

  _chooseFormOption() {
    const context = this;
    const {shoeList} = context.props;
    return {
      handleSubmit(value) {
        shoeList({
          pageNum: 1,
          pageSize: 20,
          shoeCode: value.shoeCode,
          designCategory: value.designCategory ? value.designCategory[1] : '',
          status: "ONLINE"
        });
      },
      handleReset() {
      }
    }
  }

  chooseRowSelection() {
    const {selectedRowKeys} = this.state;
    return {
      onSelect: (record, selected, selectedRows) => {
        this.setState({selectList: selectedRows});
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        this.setState({selectList: selectedRows});
      },
      selectedRowKeys,
      onChange: (selectedRowKeys) => {
        this.setState({
          selectedRowKeys
        })
      }
    }
  }

  render() {
    const {params, selectList, tabDataSource,tabDataAddSource} = this.state;
    const {list, queryList, total, loading, sqResult, shoeList, sCateResult,addResult} = this.props;
    const chooseTableOptions = {
      dataSource: sqResult && sqResult.length ? sqResult[0].list : [],
      action: shoeList,
      pagination: false,
      loading,
      rowSelection: this.chooseRowSelection(),
    }
    const sortTableOptions = {
      dataSource: list,
      action: queryList,
      pagination: false,
      loading,
    }
    const loop = (lists) => {
      return lists && lists.map(a => {
          let children = ((a.subcategory !== null) && (a.subcategory.length > 0)) ? loop(a.subcategory) : '';
          if ((a.subcategory !== null) && (a.subcategory.length > 0)) {
            return {
              value: a.categoryId + '',
              label: a.categoryName,
              children
            }
          } else {
            return {
              value: a.categoryId + '',
              label: a.categoryName
            }
          }
        })
    }

    return <Panel title=""><CollectView item={list} isSubm={this.toSubm} isGet={this.toGet} isGetSortList={this.getSort} toDelImg={this.toDelImg}
                                        chooseTableOptions={chooseTableOptions} isOK={this.isOK} isOKSort={this.isOKSort} selectList={selectList}
                                        chooseFormOption={this.chooseFormOption} tabDataAddSource={tabDataAddSource} sortTableOptions={sortTableOptions}
                                        shoeList={loop(sCateResult)} toDel={this.toDel} toRelease={this.toRelease} addResult={addResult}/></Panel>
  }
}

Collect.propTypes = {}

const mapActionCreators = {
  queryList,
  deleteItem,
  modifyItem,
  addItem,
  setsSort,
  setStatus,
  shoeList,
  sCateList
}

const mapStateToProps = (state) => {
  const {result, loading, addResult = {}, modResult = {}, delResult = {}, sortResult = {}, statusResult = {}, sqResult, sCateResult} = state.collect;
  let list = [], total = 0;
  if (result instanceof Array) {
    list = result[0].list;
    total = result[0].total;
  }
  return {list, total, loading, addResult, modResult, delResult, sortResult, statusResult, sqResult, sCateResult};

}

export default connect(mapStateToProps, mapActionCreators)(Collect)

