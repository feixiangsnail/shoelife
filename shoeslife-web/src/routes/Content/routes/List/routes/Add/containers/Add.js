import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import AddView from '../components/AddView'
import Panel from 'components/Panel'
import {addItem, modifyItem, view, cateList, editorList, queryList, sCateList} from '../modules/AddReducer'
import {message} from 'antd'
class Add extends Component {

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
      tabDataSource:[],
      selectTable: null,
      selectedRowKeys:[]
    }
  }

  isOK(data) {
    let {tabDataSource} = this.state,
        index = true
      ;
    data.map((objd)=>{
        index = true;
        tabDataSource.map((obj)=>{
          if(obj.shoeId==objd.shoeId) index = false;
        });
        if(index) tabDataSource.push(objd);
    });


    this.setState({
        tabDataSource:tabDataSource,
        selectedRowKeys:[],
        selectList:[]
    });
  }

  toDel(datas) {
    const context = this;
    context.setState({
      tabDataSource: datas
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

  toItem(e){
    if(!this.state.item)  return;
    if (e.target.value == this.state.item.content) return;

    this.state.item.content = e.target.value;
  }
  componentDidMount() {
    const {cateList, editorList, view, params} = this.props;
    cateList({
      categoryType: '3'
    });
    editorList()
    if (params.id) {
      view(params.id)
    }
  }

  componentWillReceiveProps(nextProps, preProps) {
    let context = this;
    if (nextProps.isJump) {
      setTimeout(() => {
        nextProps.history.go(-1);
      }, 800);
    }
    if (!nextProps.params.id) return;
    let viewData = nextProps.result ? nextProps.result[0] : [];
    if(!viewData) return;
    if(viewData instanceof Array) return;
    let tabData = viewData.articleProduct.map(c => {
        return c.shoe
    });
    setTimeout(function(){
      context.setState({
        item: viewData,
        tabDataSource: tabData,
        iconList: viewData.icon || []
      })
    },50)

  }

  getFormOptions() {
    const context = this;
    const {addItem, params, modifyItem} = context.props;
    const {iconList, tabDataSource} = context.state;
    let pic = typeof iconList == 'string' ? iconList : iconList && iconList.length > 0 ? iconList[0].name : ''
    let ids = tabDataSource && tabDataSource.length > 0 && tabDataSource.map(c => {
        return {
          shoeId: c.shoeId
        }
      });
    return {
      handleSubmit(value) {
        let contentText = tinyMCE.activeEditor && tinyMCE.activeEditor.getContent()
        if (!pic) {
          message.error('标题图片不能为空！')
        } else {
          params.id ? modifyItem({
              articleId: params.id,
              title: value.title,
              firstCategoryId: value.category[0],
              secondCategoryId: value.category[1],
              editorId: value.editorId,
              icon: pic,
              content: contentText,
              articleProduct: ids||[]
            }) :
            addItem({
              title: value.title,
              firstCategoryId: value.category[0],
              secondCategoryId: value.category[1],
              editorId: value.editorId,
              icon: pic,
              content: contentText,
              articleProduct: ids||[]
            })
        }
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
    const {params, item, iconList, selectList, tabDataSource, itemTab,rowKeys} = this.state;
    const {loading, result, queryList, cateResult, eResult, sResult, sCateResult} = this.props;
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
    /**
     * 分类列表
     * @param lists
     * @returns {*}
     */
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

    /**
     * 主编
     * @type {Array}
     */
    let eList = [];
    if (eResult) {
      eList = eResult.map(c => {
        return {
          value: c.id + '',
          title: c.userName
        }
      });
    } else {
      eList = [{
        value: null,
        title: '正在加载中...'
      }]
    }

    return <Panel title=""><AddView  {...formOptions} iconList={iconList} cateList={loop(cateResult)} isGet={this.toGet} toDel={this.toDel}
                                                      eList={eList} iconImg={this.iconImg} item={item} shoeList={loop(sCateResult)}
                                                      chooseTableOptions={chooseTableOptions} isOK={this.isOK.bind(this)} selectList={selectList}
                                                      chooseFormOption={this.chooseFormOption.bind(this)} toItem={this.toItem.bind(this)} tabDataSource={tabDataSource}
    />
    </Panel>
  }
}

Add.propTypes = {

  result: React.PropTypes.object,
  deleteItem: React.PropTypes.func,
  modifyItem: React.PropTypes.func,
  addItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  view,
  cateList,
  editorList,
  modifyItem,
  addItem,
  queryList,
  sCateList
}

const mapStateToProps = (state) => {
  const {result, addResult, modResult, cateResult, eResult, loading, sResult, sCateResult, isJump} = state.add;
  return {result, loading, addResult, modResult, cateResult, eResult, sResult, sCateResult, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(Add)
