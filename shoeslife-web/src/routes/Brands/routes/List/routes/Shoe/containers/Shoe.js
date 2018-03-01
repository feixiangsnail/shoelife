import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ShoeView from '../components/ShoeView'
import Panel from 'components/Panel'
import {queryList, cateList, desList, styleList} from '../modules/ShoeReducer'
import {getTimeStamp, getNowTime, formatDate} from 'common/utils';
import {message} from 'antd';

class Shoe extends Component {

    constructor(props) {
        super(props);
        this.getFormOptions = this.getFormOptions.bind(this);
        this.recent = this._recent.bind(this);

        this.state = {
            params: {}
        }
    }

  //近7天，近30天
  _recent(t) {
    const {queryList,params} = this.props;
    let startDate = getTimeStamp(getNowTime()) - t;
    queryList({
      pageNum: 1,
      pageSize: 10,
      brandId: params.id,
      onlineStart: formatDate(startDate),
      onlineEnd: getNowTime()
    });
  }
  componentDidMount() {
    const {queryList, location, cateList, desList, styleList,params} = this.props;
    const {query} = location;
    let pageNum = query.p ? Number(query.p) : 1;
    queryList({
      pageNum,
      pageSize: 10,
      brandId: params.id
    });
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

  getFormOptions() {
    const context = this;
    const {queryList,params} = context.props;
    return {
      handleSubmit(value) {
        value.designCategory = value.designCategory && value.designCategory.length ? value.designCategory[1] : null
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

    return <Panel title=""><ShoeView tableOptions={tableOptions} getFormOptions={this.getFormOptions} recent={this.recent}
                                          cateList={loop(cateResult)} sList={sList} dList={dList}
    /></Panel>
  }
}


Shoe.propTypes = {
    queryList: React.PropTypes.func,
    list: React.PropTypes.array.isRequired,
    total: React.PropTypes.number.isRequired,
    loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList,
  cateList,
  desList,
  styleList
}


const mapStateToProps = (state) => {
  const {result, loading, cateResult, desResult, styleResult} = state.shoe;
  const {list = [], total} = result[0] || {};
  return {list, total, loading, cateResult, desResult, styleResult};

}

export default connect(mapStateToProps, mapActionCreators)(Shoe)

