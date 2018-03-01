import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import ListView from '../components/ListView'
import Panel from 'components/Panel'
import {getTimeStamp, getNowTime, formatDate,initScreen} from 'common/utils';
import {queryList, cateList, modifyItem, deleteItem, editorList} from '../modules/ListReducer'
import {message} from 'antd';
class List extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.toDel = this._del.bind(this);
    this.toRelease = this._release.bind(this);
    this.recent = this._recent.bind(this);
    this.state = {
      params: initScreen({
        data:{
          editorId:null,
          isRelease:null
        }
      })
    }
  }
  _del(id) {
    const {deleteItem} = this.props;
    deleteItem(id)
  }

  _release(id) {
    const {modifyItem} = this.props;
    modifyItem({
      articleId:id,
      isRelease:0
    })
  }

  //近1天，近7天
  _recent(t) {
    const {queryList} = this.props;
    let startDate = getTimeStamp(getNowTime()) - t;
    this.state.params.startTime = formatDate(startDate);
    this.state.params.endTime = getNowTime();
    queryList(this.state.params);
  }
  componentDidMount() {
    const {queryList, cateList, editorList} = this.props;
    const {params} = this.state;

    queryList(params);

    /**
     * 分类列表 cateList
     */
    cateList({
      categoryType: '3'
    });
    editorList()
  }
  getFormOptions() {
    const context = this;
    return {
      /**
       * (筛选表单提交)
       *
       * @param value (description)
       */
      handleSubmit(value) {
        if(value.selectSecondCategory && value.selectSecondCategory.length)
           value.secondCategoryId = value.selectSecondCategory[1];
        else
          value.secondCategoryId = null

        if (getTimeStamp(value.startTime) > getTimeStamp(value.endTime)) {
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
              editorId:null,
              isRelease:null
            }
          })
        });
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    const {params} = this.state;
    if(nextProps.delResult.is){
      nextProps.delResult.is = false;
      nextProps.queryList(params);
      return;
    }
    if(nextProps.modResult.is){
      nextProps.modResult.is = false;
      nextProps.queryList(params);
      return;
    }
  }
  render() {
    const {params} = this.state;
    const {list, queryList, total, loading, cateResult, eResult} = this.props;
    const tableOptions = {
      dataSource: list,                         //加载组件时，表格从容器里获取初始值
      action: queryList,                         //表格翻页时触发的action
      pagination: {                              //表格页码配置，如果为false，则不展示页码
        total: total                             //数据总数
      },
      loading,                                    //表格加载数据状态
      params,                                     //表格检索数据参数
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
          value: c.id,
          title: c.userName
        }
      });
    } else {
      eList = [{
        value: null,
        title: '正在加载中...'
      }]
    }

    const formOptions = {
      'formOptions': this.getFormOptions()
    }
    return <Panel title=""><ListView {...tableOptions} {...formOptions} recent={this.recent} params={params}
                                     cateList={loop(cateResult)} eList={eList} toDel={this.toDel} toRelease={this.toRelease}
    /></Panel>
  }
}


List.propTypes = {

}

const mapActionCreators = {
  queryList,
  deleteItem,
  modifyItem,
  cateList,
  editorList
}


const mapStateToProps = (state) => {
  const {result,modResult={},delResult = {},loading, cateResult, eResult} = state.list;

  let list = [],total = 0;
  if(result instanceof Array){
      list = result[0].list;
      total = result[0].total;
  }

  return {list, total, loading, cateResult, eResult,modResult,delResult};

}

export default connect(mapStateToProps, mapActionCreators)(List)
