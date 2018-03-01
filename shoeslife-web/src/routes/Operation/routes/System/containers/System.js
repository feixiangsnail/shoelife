import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import SystemView from '../components/SystemView'
import Panel from 'components/Panel'
import {queryList} from '../modules/SystemReducer'
import {initScreen} from 'common/utils';

class System extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: initScreen()
    }
  }

  componentDidMount() {
    const {params} = this.state;
    const {queryList} = this.props;
    queryList(params);
  }

  getFormOptions() {
    const context = this;
    return {
      handleSubmit(value) {
        context.setState({
          params: value
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

    return <Panel title=""><SystemView  {...tableOptions} {...formOptions} params={params} /></Panel>
  }
}

System.propTypes = {
  queryList: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList
}


const mapStateToProps = (state) => {
  const {result, loading} = state.system;
  let list = [],total = 0;
  if(result instanceof Array){
      list = result[0].list;
      total = result[0].total;
  }
  return {list, total, loading};
}

export default connect(mapStateToProps, mapActionCreators)(System)
