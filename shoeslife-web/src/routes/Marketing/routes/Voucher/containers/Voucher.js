import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import VoucherView from '../components/VoucherView'
import Panel from 'components/Panel'
import {queryList, deleteItem, sentItem} from '../modules/VoucherReducer'
import {initScreen} from 'common/utils';

class Voucher extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.toDel = this._del.bind(this);
    this.toRelease = this._release.bind(this);
    this.state = {
      params: initScreen({
        data: {
          name: null,
          status: null
        }
      })
    }
  }

  _del(id) {
    const {deleteItem} = this.props;
    deleteItem(id)
  }

  _release(id, row) {
    const {sentItem} = this.props;
    if (row.status == 0) {
      sentItem({
        voucherId: id,
        status: 1
      })
    }
    if (row.status == 1) {
      sentItem({
        voucherId: id,
        status: 3
      })
    }
  }

  componentDidMount() {
    const {queryList} = this.props;
    const {params} = this.state;
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
            params: {
              orderStatus: null,
              payStatus: null
            }
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
    return <Panel title=""><VoucherView {...tableOptions} {...formOptions} toDel={this.toDel} toRelease={this.toRelease} params={params}/></Panel>
  }
}

Voucher.propTypes = {}

const mapActionCreators = {
  queryList,
  deleteItem,
  sentItem
}


const mapStateToProps = (state) => {
  const {result, loading, delResult, sentResult} = state.voucher;
  let list = [], total = 0;
  if (result instanceof Array) {
    list = result[0].list;
    total = result[0].total;
  }
  return {list, total, loading, delResult, sentResult};

}

export default connect(mapStateToProps, mapActionCreators)(Voucher)

