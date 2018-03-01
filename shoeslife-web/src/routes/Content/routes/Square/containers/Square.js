import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import SquareView from '../components/SquareView'
import Panel from 'components/Panel'
import {queryList, modifyItem, deleteItem,queryRecommendList} from '../modules/SquareReducer'
import {getTimeStamp, getNowTime, formatDate,initManyScreen} from 'common/utils';
import {message} from 'antd';

class Square extends Component {

  constructor(props) {
    super(props);
    let params = initManyScreen(['all','reacommend']);
    params.reacommend.status = 1;

    this.getFormOptions = this.getFormOptions.bind(this);
    this.getFormOptionsR = this.getFormOptionsR.bind(this);
    this.toDel = this._del.bind(this);
    this.isRecommend = this._recommend.bind(this);
    this.recent = this._recent.bind(this);

    this.state = {
      params: params
    }
  }

  //删除
  _del(id) {
    const {deleteItem} = this.props;
    deleteItem(id)
  }
  //推荐/取消
  _recommend(id, row) {
    const {modifyItem} = this.props;
    row.status == 0 ? modifyItem({
      dynamicId: id,
      status: '1'
    }) : modifyItem({
      dynamicId: id,
      status: '0'
    })
  }
  //近1天，近7天
  _recent(t,name) {
    const {queryList,queryRecommendList} = this.props;
    const {params} = this.state

    let startDate = getTimeStamp(getNowTime()) - t;
    params[name].startTime = formatDate(startDate);
    params[name].endTime = getNowTime();

    if(name=='all') queryList(params.all);
    else queryRecommendList(params.reacommend);

  }
  componentDidMount() {
    const {queryList,queryRecommendList} = this.props;
    const {all,reacommend} = this.state.params
    queryList(all);
    queryRecommendList(reacommend);
  }

  getFormOptions() {
    const context = this;
    const {queryList} = this.props;
    const {params} = this.state;
    return {
      handleSubmit(value) {
        if (getTimeStamp(value.startTime) > getTimeStamp(value.endTime)) {
          message.error('开始时间不能晚于结束时间！');
          return false
        } else {

          params.all.startTime = value.startTime;
          params.all.endTime = value.endTime;
          queryList(params.all);

        }
      },
      handleReset() {
        setTimeout(() => {
          params.all = {};
          queryList(params.all);
        });
      }
    }
  }

  getFormOptionsR() {
    const context = this;
    const {queryRecommendList} = this.props;
    const {params} = this.state;
    return {
      handleSubmit(value) {
        params.reacommend.startTime = value.startTime;
        params.reacommend.endTime = value.endTime;
        queryRecommendList(params.reacommend);
      },
      handleReset() {
        setTimeout(() => {
          params.reacommend = {
              status:1
          };
          queryRecommendList(params.recommend);
        });
      }
    }
  }

  render() {
    const {all,reacommend} = this.state.params;
    const {list, queryList, total, loading,queryRecommendList,recommendList} = this.props;

    const tableOptions = {
      dataSource: list,
      action: queryList,
      pagination: {
        total: total
      },
      loading,
      all
    }
    const tableOptionsR = {
      dataSource: recommendList,
      action: queryRecommendList,
      pagination: {
        total: total
      },
      loading,
      reacommend
    }

    return <Panel title=""><SquareView tableOptions={tableOptions} getFormOptions={this.getFormOptions}
                                       tableOptionsR={tableOptionsR} getFormOptionsR={this.getFormOptionsR}
                                       toDel={this.toDel} isRecommend={this.isRecommend} recent={this.recent}
                                       paramsAll={all} paramsR={reacommend}
    /></Panel>
  }
}

Square.propTypes = {
  queryList: React.PropTypes.func,
  queryRecommendList:React.PropTypes.func,
  list: React.PropTypes.array.isRequired,
  total: React.PropTypes.number.isRequired,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList,
  queryRecommendList,
  deleteItem,
  modifyItem,
}


const mapStateToProps = (state) => {
  const {result, loading,ResultR} = state.square;
  let list = [],total = 0,recommendList;
  if(result instanceof Array){
      list = result[0].list;
      total = result[0].total;
  }
  if(ResultR) recommendList = ResultR[0].list;
  else recommendList = {};
  return {list,recommendList, total, loading};

}

export default connect(mapStateToProps, mapActionCreators)(Square)
