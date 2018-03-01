import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import PermisView from '../components/PermisView'
import Panel from 'components/Panel'
import {queryList, lockItem, recoverItem, deleteItem} from '../modules/PermisReducer'
import {initScreen} from 'common/utils';

class Permis extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.toDel = this._del.bind(this);
    this.toLock = this._lock.bind(this);

    this.state = {
      params:initScreen({
        pageSize:9999
      })
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
    const {result, queryList} = this.props;
    const tableOptions = {
      dataSource: result.length ? result : [],
      action: queryList,
      pagination: false,
      params,
    }
    return <Panel title=""><PermisView tableOptions={tableOptions} params={params} toDel={this.toDel} toLock={this.toLock} dataSource={result} getFormOptions={this.getFormOptions} /></Panel>
  }
}

Permis.propTypes = {

}

const mapActionCreators = {
  queryList,
  deleteItem,
  lockItem,
  recoverItem
}

const mapStateToProps = (state) => {
  const {result, lockResult, reResult, delResult} = state.permis;
  return {result, lockResult, reResult, delResult};
}

export default connect(mapStateToProps, mapActionCreators)(Permis)
