import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import UpgradeView from '../components/UpgradeView'
import Panel from 'components/Panel'
import {queryList,deleteItem,publishedItem} from '../modules/UpgradeReducer'
import {initScreen} from 'common/utils';

class Upgrade extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.toDel = this._del.bind(this);
    this.toPublished = this._published.bind(this);
    this.state = {
      params:initScreen({
        data:{
          appType:null,
          status:null
        }
      })
    }
  }

  _del(id) {
    const {deleteItem} = this.props;
    deleteItem(id)
  }

  _published(id) {
    const {publishedItem} = this.props;
    publishedItem(id)
  }

  componentDidMount() {
    const {queryList} = this.props;
    const {params} = this.state;
    queryList(params);
  }

  /**
   * (表格功能配置项)
   *
   * @returns (description)
   */
  getFormOptions() {
    const context = this;
    return {
      /**
       * (筛选表单提交)
       *
       * @param value (description)
       */
      handleSubmit(value) {
        context.setState({
          params: value
        })
      },

      /**
       * (筛选表单重置)
       */
      handleReset() {
        setTimeout(() => {
          context.setState({
            params: {
              appType:null,
              status:null
            }
          })
        });
      }
    }
  }

  render() {
    const {params} = this.state;

    const {queryList, list, total, loading} = this.props;
    const tableOptions = {
      dataSource: list,                         //加载组件时，表格从容器里获取初始值
      action: queryList,                         //表格翻页时触发的action
      pagination: {                              //表格页码配置，如果为false，则不展示页码
        total: total                    //数据总数
      },
      loading,                                    //表格加载数据状态
      params,                                     //表格检索数据参数
    };
    return <Panel title=""><UpgradeView tableOptions={tableOptions} getFormOptions={this.getFormOptions} params={params} toDel={this.toDel} toPublished={this.toPublished}/></Panel>
  }
}


Upgrade.propTypes = {
  queryList: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList,
  deleteItem,
  publishedItem,
};

const mapStateToProps = (state) => {
  const {result, loading,delResult,pubResult} = state.upgrade;
  let list = [],total = 0;
  if(result instanceof Array){
      list = result[0].list;
      total = result[0].total;
  }
  return {result, loading, list, total,delResult,pubResult};
};
export default connect(mapStateToProps, mapActionCreators)(Upgrade)
