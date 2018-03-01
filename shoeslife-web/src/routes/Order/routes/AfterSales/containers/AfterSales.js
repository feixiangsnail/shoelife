import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import AfterSalesView from '../components/AfterSalesView'
import Panel from 'components/Panel'
import {queryList, addItem, modifyItem} from '../modules/AfterSalesReducer'
import {getTimeStamp, getNowTime, formatDate,initScreen} from 'common/utils';
import {message} from 'antd';
class AfterSales extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.toAccept = this._accept.bind(this);
    this.toGet = this._get.bind(this);
    this.recent = this._recent.bind(this);


    this.state = {
      params:initScreen({
        data:{
          aftersaleType:null,
          nowStatus:null
        }
      })
    }
  }

  //接受
  _accept(key, row) {
    const {modifyItem} = this.props;
    modifyItem({
      aftersaleId: row.aftersaleId,
      aftersaleStatus: '3'
    })
  }

  //确认收货
  _get(key, row) {
    const {addItem} = this.props;
    addItem({
      aftersaleId: row.aftersaleId,
      aftersaleStatus: '7'
    })
  }
  //近7天，近30天
  _recent(t) {
    const {queryList} = this.props;
    let {params} = this.state;
    let startDate = getTimeStamp(getNowTime()) - t;
    params.startCreateTime = formatDate(startDate);
    params.endCreateTime = getNowTime();
    this.setState();
    queryList(params);
  }

  componentWillReceiveProps(nextProps, preProps) {
    const {queryList} = this.props;
    let {params} = this.state;
    //强制更新数据
    if (nextProps.isGet) queryList(params);
  }

  componentDidMount() {
    const {queryList} = this.props;
    let {params} = this.state;
    queryList(params);
  }

  getFormOptions() {
    const context = this;
    return {
      handleSubmit(value) {
        if (getTimeStamp(value.startCreateTime) > getTimeStamp(value.endCreateTime)) {
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
              aftersaleType:null,
              nowStatus:null
            }
          })
        });
      }
    }
  }

  render() {
    const {params} = this.state;

    const {list, queryList, total, loading} = this.props;
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

    return <Panel title=""><AfterSalesView {...tableOptions} {...formOptions} params={params} recent={this.recent}
                                                                              toAccept={this.toAccept} toGet={this.toGet}/></Panel>
  }
}

AfterSales.propTypes = {
  queryList: React.PropTypes.func,
  list: React.PropTypes.array.isRequired,
  total: React.PropTypes.number.isRequired,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList,
  modifyItem,
  addItem
}

const mapStateToProps = (state) => {
  const {result, loading, isGet} = state.afterSales;
  let list = [],total = 0;
  if(result instanceof Array){
      list = result[0].list;
      total = result[0].total;
  }
  return {list, total, loading, isGet};
}

export default connect(mapStateToProps, mapActionCreators)(AfterSales)
