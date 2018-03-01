import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import ShoeStyleView from '../components/ShoeRelatedView';
import Panel from 'components/Panel';
import {queryList,addBound,unBound} from '../modules/ShoeRelated';
import {getTimeStamp,initScreen} from 'common/utils';
import {message} from 'antd';
class ShoeRelated extends Component {

  constructor(props) {
    super(props);
    this.state={
        params:initScreen({pageSize:999}),
        selectList:[]
    };
    this.onBound = this.onBound.bind(this);
    this.getFormOptions = this.getFormOptions.bind(this);
  }

  componentDidMount() {
    const {queryList} = this.props;
    queryList(this.state.params);
  }
  componentWillReceiveProps(nextProps) {
    let {bResult,queryList,uResult} = nextProps
      ,params = this.state.params
      ;
    if(bResult.is||uResult.is){
      queryList(params);
      uResult.is = false;
      bResult.is = false;
    }
  }
  onBound(type){
    const {addBound} = this.props;
    let {selectList} = this.state;
    addBound({type:type,list:selectList});
  }
  getFormOptions() {
    const context = this;
    return {
      handleSubmit(value,key) {
        context.setState({
          params: {
            ...value,
            pageSize:999
          }
        })
      },
      handleReset() {
        setTimeout(() => {
          context.setState({
            params: {pageSize:999}
          })
        });
      }
    }
  }
  handleRowSelection() {
    return {
      onSelect: (record, selected, selectedRows) => {
        let selectList = selectedRows.map(c => {
          return c.shoeId
        });
        this.setState({selectList});
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        let selectList = selectedRows.map(c => {
          return c.shoeId
        });
        this.setState({selectList});
      }
    }
  }
  render() {
    const {params,selectList} = this.state;
    const {list, queryList, total, loading,unBound} = this.props;
    const tableOptions = {
      dataSource: list,
      action:queryList,
      loading,
      params,
      rowSelection: this.handleRowSelection()
    }

    const formOptions = {
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><ShoeStyleView list={list} {...tableOptions} {...formOptions} selectList={selectList} downParams={params} onBound={this.onBound} unBound={unBound} /></Panel>
  }
}


ShoeRelated.propTypes = {
  queryList: React.PropTypes.func,
  addBound:React.PropTypes.func,
  list: React.PropTypes.array.isRequired,
  total: React.PropTypes.number.isRequired,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  unBound,
  queryList,
  addBound
}

const mapStateToProps = (state) => {
  const {result, loading,bResult={},uResult={}} = state.shoeRelated;
  let list = [],total = 0;
  if(result instanceof Array){
      list = result;
  }
  return {list, loading,bResult,uResult};

}

export default connect(mapStateToProps, mapActionCreators)(ShoeRelated)
