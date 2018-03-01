import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import VListView from '../components/VListView'
import Panel from 'components/Panel'
import {queryList} from '../modules/VListReducer'
import {initScreen} from 'common/utils';
class VList extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params:initScreen({
        userName: null,
        status: null
      })
    }
  }

  componentDidMount() {
    const {queryList, params} = this.props;
    this.state.params.voucherId = params.id;
    queryList(this.state.params);
  }

  getFormOptions() {
    const context = this;
    const {params} = this.props;
    return {
      handleSubmit(value) {
        value.voucherId = params.id;
        context.setState({
          params: value
        })
      },
      handleReset(value) {
        setTimeout(() => {
          value.voucherId = params.id;
          context.setState({
            params: value
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

    return <Panel title=""><VListView {...tableOptions} {...formOptions} params={params} /></Panel>
  }
}

VList.propTypes = {}

const mapActionCreators = {
  queryList
}


const mapStateToProps = (state) => {
  const {result, loading} = state.vList;
  let list = [], total = 0;
  if (result instanceof Array) {
    list = result[0].list;
    total = result[0].total;
  }
  return {list, total, loading};

}

export default connect(mapStateToProps, mapActionCreators)(VList)

