import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import FeedbackView from '../components/FeedbackView'
import Panel from 'components/Panel'
import {queryList, modifyItem, deleteItem} from '../modules/FeedbackReducer'
import {getTimeStamp, getNowTime, formatDate,initScreen} from 'common/utils';
import {message} from 'antd';

class Feedback extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.toDel = this._del.bind(this);
    this.toUpdate = this._update.bind(this);
    this.recent = this._recent.bind(this);
    this.state = {
      params: initScreen({
        data:{
          appPlat:null,
          status:null
        }
      })
    }
  }

  _del(id, row) {
    const {deleteItem} = this.props;
    deleteItem(row.feedbackId)
  }

  _update(key, row) {
    const {modifyItem} = this.props;
    if (row.status == '0') {
      modifyItem({
        feedbackId: row.feedbackId,
        status: '1'
      })
    }
    if (row.status == '1') {
      modifyItem({
        feedbackId: row.feedbackId,
        status: '2'
      })
    }
    if (row.status == '2') {
      modifyItem({
        feedbackId: row.feedbackId,
        status: '1'
      })
    }
  }

  //近7天，近30天
  _recent(t) {
    const {queryList} = this.props;
    let startDate = getTimeStamp(getNowTime()) - t;
    this.state.params.startTime = formatDate(startDate);
    this.state.params.endTime = getNowTime();
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
              appPlat:null,
              status:null
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

    return <Panel title=""><FeedbackView {...tableOptions} {...formOptions} params={params} toUpdate={this.toUpdate} toDel={this.toDel} recent={this.recent} /></Panel>
  }
}


Feedback.propTypes = {

  queryList: React.PropTypes.func,
  list: React.PropTypes.array.isRequired,
  total: React.PropTypes.number.isRequired,

  loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList,
  deleteItem,
  modifyItem
}


const mapStateToProps = (state) => {
  const {result, loading, modResult, delResult} = state.feedback;
  let list = [],total = 0;
  if(result instanceof Array){
      list = result[0].list;
      total = result[0].total;
  }
  return {list, total, loading, modResult, delResult};

}

export default connect(mapStateToProps, mapActionCreators)(Feedback)
