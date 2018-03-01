import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import AccountView from '../components/AccountView'
import Panel from 'components/Panel'
import {queryList, lockItem, recoverItem, deleteItem} from '../modules/AccountReducer'

class Account extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.toDel = this._del.bind(this);
    this.toLock = this._lock.bind(this);

    this.state = {
      params: {email:''}
    }
  }

  _del(id) {
    const {deleteItem} = this.props;
    deleteItem(id)
  }

  _lock(id,row) {
    const {lockItem, recoverItem} = this.props;
    row.status == '0' ? lockItem(id) : recoverItem(id)
  }

  componentDidMount() {
    const {queryList} = this.props;
    queryList(this.state.params);
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
      }
    }
  }

  render() {
    const {params} = this.state;
    const {result, queryList} = this.props;
    const tableOptions = {
      dataSource: result.length ? result : [],
      action: queryList,
      pagination: false,
      params,
    }
    return <Panel title=""><AccountView tableOptions={tableOptions} toDel={this.toDel} toLock={this.toLock} dataSource={result} getFormOptions={this.getFormOptions}/></Panel>
  }
}

Account.propTypes = {

}

const mapActionCreators = {
  queryList,
  deleteItem,
  lockItem,
  recoverItem
}

const mapStateToProps = (state) => {
  const {result, lockResult, reResult, delResult} = state.account;
  return {result, lockResult, reResult, delResult};
}

export default connect(mapStateToProps, mapActionCreators)(Account)







