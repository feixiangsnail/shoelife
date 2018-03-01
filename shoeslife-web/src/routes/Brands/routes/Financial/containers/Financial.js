import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import FinancialView from '../components/FinancialView';
import Panel from 'components/Panel';
import {queryList,countItem} from '../modules/FinancialReducer';
import {getTimeStamp,initScreen} from 'common/utils';
import {message} from 'antd';
class Financial extends Component {

  constructor(props) {
    super(props);
    this.state={
        params:initScreen()
    };

    this.getFormOptions = this.getFormOptions.bind(this);
  }

  componentDidMount() {
    const {params} = this.state;
    const {queryList,countItem} = this.props;

    queryList(this.state.params);
    countItem(this.state.params)
  }

  getFormOptions() {
    const context = this;
    const {countItem} = this.props;
    return {
      handleSubmit(value,key) {
        if (getTimeStamp(value.tradeTimeStart) > getTimeStamp(value.tradeTimeEnd)) {
          message.error('开始时间不能晚于结束时间！');
          return false
        } else {
          context.setState({
            params: value
          })
        }
        countItem({
          ...value
        })
      },
      handleReset() {
        setTimeout(() => {
          context.setState({
            params: {}
          })
        });
      }
    }
  }

  render() {
    const {params} = this.state;

    const {list, queryList, total, loading,countResult} = this.props;
    const tableOptions = {
      dataSource: list,
      action:queryList,
      pagination: {
        total: total
      },
      loading,
      params
    }


    const formOptions = {
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><FinancialView {...tableOptions} {...formOptions} countResult={countResult} downParams={params} /></Panel>
  }
}


Financial.propTypes = {
  queryList: React.PropTypes.func,
  list: React.PropTypes.array.isRequired,
  total: React.PropTypes.number.isRequired,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList,
  countItem
}

const mapStateToProps = (state) => {
  const {result, loading,countResult} = state.financial;
  let list = [],total = 0;
  if(result instanceof Array){
      list = result[0].list;
      total = result[0].total;
  }
  return {list, total, loading,countResult};

}

export default connect(mapStateToProps, mapActionCreators)(Financial)
