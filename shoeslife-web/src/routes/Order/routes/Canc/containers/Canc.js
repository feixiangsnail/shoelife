import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import CancView from '../components/CancView'
import Panel from 'components/Panel'
import {queryList} from '../modules/CancReducer'
import {initScreen} from 'common/utils';
class Canc extends Component {

  constructor(props) {
    super(props);
    this.state = {
      params: initScreen({
        data: null
      })
    }
  }

  componentDidMount() {
    const {queryList} = this.props;
    const {params} = this.state;
    queryList(params);
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

    return <Panel title=""><CancView {...tableOptions}/></Panel>
  }
}


Canc.propTypes = {}

const mapActionCreators = {
  queryList
}


const mapStateToProps = (state) => {
  const {result, loading} = state.canc;
  let list = [], total = 0;
  if (result instanceof Array) {
    list = result[0].list;
    total = result[0].total;
  }
  return {list, total, loading};
}

export default connect(mapStateToProps, mapActionCreators)(Canc)

