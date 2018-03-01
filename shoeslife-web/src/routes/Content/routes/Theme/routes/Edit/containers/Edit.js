import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {message} from 'antd'
import {queryList, addItem, modifyItem, view, sCateList, getShoe} from '../modules/EditReducer'

class Edit extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.toGet = this.toGet.bind(this);
    this.toDel = this.toDel.bind(this);
    this.iconImg = this.iconImg.bind(this);
    this.state = {
      params: {},
      item: null,
      itemTab: null,
      iconList: [],
      selectList: null,
      tabDataSource: [],
      selectTable: null,
      selectedRowKeys: [],
      itemData: []
    }
  }

  isOK(data) {
    let { tabDataSource} = this.state,
      index = true
    ;
    data.map((objd) => {
      index = true;
      tabDataSource.map((obj) => {
        if (obj.shoeId == objd.shoeId) index = false;
      });
      if (index) tabDataSource.push(objd);
    });

    this.setState({
      tabDataSource,
      selectedRowKeys: [],
      selectList: []
    });
  }

  toDel(datas) {
    const context = this;
    context.setState({
      tabDataSource: datas,
      itemData: datas
    })
  }

  toGet() {
    const context = this;
    const {queryList, sCateList} = context.props;
    queryList({
      pageNum: 1,
      pageSize: 20,
      status: "ONLINE"
    })
    sCateList({
      categoryType: '1'
    })
  }

  iconImg(files) {
    this.setState({
      iconList: files
    })
  }

  componentDidMount() {
    const {view, params} = this.props;
    if (params.id) {
      view(params.id)
    }
  }

  componentWillReceiveProps(nextProps, preProps) {
    const {getShoe} = this.props;
    let context = this;
    if (nextProps.isJump) {
      setTimeout(() => {
        nextProps.history.go(-1);
      }, 800);
    }
    if (!nextProps.params.id) return;
    let viewData = nextProps.result ? nextProps.result[0] : [];
    if (!viewData) return;
    if (viewData instanceof Array) return;
    let tabData = viewData.shoeInfos

    setTimeout(function () {
      context.setState({
        item: viewData,
        tabDataSource: tabData,
        iconList: viewData.icon || []
      })
    }, 50)
  }

  getFormOptions() {
    const context = this;
    const {addItem, params, modifyItem} = context.props;
    const {iconList, tabDataSource, itemData} = context.state;
    let pic = typeof iconList == 'string' ? iconList : iconList && iconList.length > 0 ? iconList[0].name : ''
    let ids = itemData && itemData.length > 0 ? itemData.map(c => {
      return c.shoeId
    }) : tabDataSource.map(t => {
      return t.shoeId
    });
    return {
      handleSubmit(value) {
        if (!pic) {
          message.error('宣传图片不能为空！')
          return false;
        }
        if (!ids.length) {
          message.error('请选择关联鞋款！')
          return false;
        }
        params.id ? modifyItem({
          id: params.id,
          name: value.name,
          icon: pic,
          shoeIds: ids.join(','),
          sortWeight: value.sortWeight,
          url: value.url
        }) :
          addItem({
            name: value.name,
            icon: pic,
            shoeIds: ids.join(','),
            sortWeight: value.sortWeight,
            url: value.url
          })
      },
      handleReset() {
      }
    }
  }

  chooseFormOption() {
    const context = this;
    const {queryList} = context.props;
    return {
      handleSubmit(value) {
        queryList({
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
    const {params, item, iconList, selectList, tabDataSource, itemTab, rowKeys, itemData} = this.state;
    const {loading, result, queryList, sResult, sCateResult} = this.props;
    const chooseTableOptions = {
      dataSource: sResult && sResult.length ? sResult[0].list : [],
      action: queryList,
      pagination: false,
      loading,
      rowSelection: this.chooseRowSelection(),
      params
    }
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
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
    return <Panel title=""><EditView  {...formOptions} iconList={iconList} isGet={this.toGet} toDel={this.toDel} iconImg={this.iconImg}
                                      item={item} chooseTableOptions={chooseTableOptions} isOK={this.isOK.bind(this)} selectList={selectList}
                                      chooseFormOption={this.chooseFormOption.bind(this)}
                                      tabDataSource={itemData && itemData.length && itemData.length > 0 ? itemData : tabDataSource}
                                      shoeList={loop(sCateResult)}
    /></Panel>
  }
}

Edit.propTypes = {}

const mapActionCreators = {
  queryList,
  modifyItem,
  view,
  sCateList,
  addItem,
  getShoe
}

const mapStateToProps = (state) => {
  const {result, loading, addResult, modResult, sResult, sCateResult, isJump, showResult} = state.edit;
  return {result, loading, addResult, modResult, sResult, sCateResult, isJump, showResult};
}

export default connect(mapStateToProps, mapActionCreators)(Edit)
