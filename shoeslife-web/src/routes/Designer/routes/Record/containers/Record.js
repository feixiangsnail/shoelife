import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import RecordView from '../components/RecordView'
import Panel from 'components/Panel'
import {queryList} from '../modules/RecordReducer'

class Record extends Component {

  constructor(props) {
    super(props);
    this.state = {
      params: {}
    }
  }

  componentDidMount() {
    const {queryList} = this.props;
    queryList({pageSize: 999});
  }

  render() {
    const {params} = this.state;
    const {list, queryList, loading} = this.props;
    const tableOptions = {
      dataSource: list,
      action: queryList,
      pagination: false,
      loading,
      params,
    }

    return <Panel title=""><RecordView {...tableOptions} /></Panel>
  }
}

Record.propTypes = {}

const mapActionCreators = {
  queryList
}

const mapStateToProps = (state) => {
  const {result, loading} = state.record;
  let list = [];
  if (result instanceof Array) {
    list = result;
  }
  return {list, loading};
}

export default connect(mapStateToProps, mapActionCreators)(Record)

