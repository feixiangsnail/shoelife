import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import ListView from '../components/ListView'
import Panel from 'components/Panel'
import {queryList, deleteItem} from '../modules/ListReducer'

class List extends Component {

  constructor(props) {
    super(props);

    this.toDel = this._del.bind(this);

    this.state = {
      params: {}
    }
  }

  _del(id) {
    const {deleteItem} = this.props;
    deleteItem(id)
  }

  componentDidMount() {
    const {queryList} = this.props;
    queryList({
      pageNum: 1,
      pageSize: 10,
    });
  }

  render() {

    const {params} = this.state;
    const {queryList, result, loading} = this.props;

    const tableOptions = {
      dataSource: result.length ? result : [],
      action: queryList,
      pagination: false,
      loading,
      params,
    }
    return <Panel title=""><ListView dataSource={result} tableOptions={tableOptions} toDel={this.toDel}/></Panel>
  }
}

List.propTypes = {

  queryList: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList,
  deleteItem
}

const mapStateToProps = (state) => {
  const {result, loading, delResult} = state.list;
  return {result, loading, delResult};

}

export default connect(mapStateToProps, mapActionCreators)(List)
