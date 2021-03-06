import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import ListView from '../components/ListView'
import Panel from 'components/Panel'
import {queryList} from '../modules/ListReducer'
import {getTimeStamp, getNowTime, formatDate,initScreen} from 'common/utils';
import {message} from 'antd';

class List extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.recent = this._recent.bind(this);
    this.state = {
      params:initScreen({
        data:{
          orderStatus:null,
          payStatus:null
        }
      })
    }
  }
  //近7天，近30天
  _recent(t) {
    const {queryList} = this.props;
    let startDate = getTimeStamp(getNowTime()) - t;
    this.state.params.startOrderTime = formatDate(startDate);
    this.state.params.endOrderTime = getNowTime();
    queryList(this.state.params);
  }
  componentDidMount() {

    const {queryList} = this.props;
    const {params} = this.state;
    queryList(params);

  }
  getFormOptions() {
    const context = this;
    return {
      handleSubmit(value) {
        if (getTimeStamp(value.startOrderTime) > getTimeStamp(value.endOrderTime)) {
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
              orderStatus:null,
              payStatus:null
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
      params,
    }
    const formOptions = {
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><ListView {...tableOptions} {...formOptions} params={params} recent={this.recent}/></Panel>
  }
}

List.propTypes = {
  queryList: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList
}


const mapStateToProps = (state) => {
  const {result, loading} = state.list;
  let list = [],total = 0;
  if(result instanceof Array){
      list = result[0].list;
      total = result[0].total;
  }
  return {list, total, loading};
}

export default connect(mapStateToProps, mapActionCreators)(List)
