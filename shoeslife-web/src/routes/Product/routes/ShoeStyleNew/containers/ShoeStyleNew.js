import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import ShoeStyleView from '../components/ShoeStyleView'
import Panel from 'components/Panel'
import {queryList, modifyItem, cateList, desList, styleList, deleteItem} from '../modules/ShoeStyleReducer'
import {getTimeStamp, getNowTime, formatDate,initScreen} from 'common/utils';
import {message} from 'antd';

class ShoeStyleNew extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.toDel = this._del.bind(this);
    this.toRelease = this._release.bind(this);
    this.recent = this._recent.bind(this);

    let params = initScreen({
        data:{
          status:null,
          designerId:null,
          styleCategory:null,
          newDesignCategory:null
        }
    });

    this.state = {
      params: params
    }
  }

  //上/下架、发布
  _release(id, row) {
    const {modifyItem} = this.props;
    let status = row.status == 'ONLINE'?'OFFLINE':'ONLINE';

    modifyItem({
      shoeId: id,
      status: status
    })

  }

  //删除
  _del(id) {
    const {deleteItem} = this.props;
    deleteItem(id)
  }

  //近7天，近30天
  _recent(t) {
    const {queryList} = this.props;
    const {params} = this.state;
    let startDate = getTimeStamp(getNowTime()) - t;

    params.onlineStart = formatDate(startDate);
    params.onlineEnd = getNowTime();

    queryList(params);
  }

  componentDidMount() {
    const {queryList, location, cateList, desList, styleList} = this.props;
    const {query} = location;
    let pageNum = query.p ? Number(query.p) : 1;
    queryList(this.state.params);
    /**
     * 分类列表 cateList
     * 设计师列表  desList
     * 设计风格列表 styleList
     */
    cateList({
      categoryType: '1'
    });
    desList();
    styleList({
      categoryType: '4'
    });
  }
  componentWillReceiveProps(nextProps){
    const content = this;
    const {queryList,location} = this.props;
    const {params} = this.state;
    if(nextProps.modResult.isResult){
        nextProps.modResult.isResult = false;
        params.pageNum = location.query.p || 1;
        queryList(content.state.params);
    }
  }

  getFormOptions() {
    const context = this;
    return {
      handleSubmit(value) {

        if(value.newDesignCategory&&value.newDesignCategory.length>1)
          value.designCategory = value.newDesignCategory[1];
        else
          value.designCategory = null;

        if (getTimeStamp(value.onlineStart) > getTimeStamp(value.onlineEnd)) {
          message.error('开始时间不能晚于结束时间！');
          return false
        } else {

          context.setState({
            params: value
          });
        }
      },
      handleReset() {
        setTimeout(() => {
          context.setState({
            params: {designerId:null,styleCategory:null,status:null}
          })
        });
      }
    }
  }

  render() {
    const {params} = this.state;
    const {list, queryList, total, loading, cateResult, desResult, styleResult} = this.props;


    const tableOptions = {
      dataSource: list,                         //加载组件时，表格从容器里获取初始值
      action: queryList,                        //表格翻页时触发的action
      pagination: {                             //表格页码配置，如果为false，则不展示页码
        total: total
      },
      loading,
      params,
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
    /**
     * 设计风格
     * @type {Array}
     */
    let sList = [];
    if (styleResult) {
      sList = styleResult.map(c => {
        return {
          value: c.categoryId,
          title: c.categoryName
        }
      });
    } else {
      sList = [{
        value: null,
        title: '正在加载中...'
      }]
    }

    return <Panel title=""><ShoeStyleView tableOptions={tableOptions} getFormOptions={this.getFormOptions}
                                          toDel={this.toDel} toRelease={this.toRelease} recent={this.recent}
                                          cateList={loop(cateResult)} sList={sList} dList={dList} params = {params}

    /></Panel>
  }
}

ShoeStyleNew.propTypes = {

}

const mapActionCreators = {
  queryList,
  modifyItem,
  cateList,
  desList,
  styleList,
  deleteItem
}

const mapStateToProps = (state) => {
  let {result, loading, modResult, cateResult, desResult, styleResult, delResult} = state.shoeNew;
  let list = [],total = 0;
  if(result instanceof Array){
      list = result[0].list;
      total = result[0].total;
  }
  modResult = modResult || {};
  return {list, total, loading, modResult, cateResult, desResult, styleResult, delResult};
}

export default connect(mapStateToProps, mapActionCreators)(ShoeStyleNew)
