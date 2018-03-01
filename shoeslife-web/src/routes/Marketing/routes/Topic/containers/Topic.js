import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import TopicView from '../components/TopicView'
import Panel from 'components/Panel'
import {queryList, deleteItem} from '../modules/TopicReducer'
import {initScreen} from 'common/utils';
class Topic extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.toDel = this._del.bind(this);
    this.state = {
      params: initScreen({
        name: null
      })
    }
  }

  _del(id) {
    const {deleteItem} = this.props;
    deleteItem(id)
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
      handleReset(value) {
        setTimeout(() => {
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

    return <Panel title=""><TopicView {...tableOptions} {...formOptions} toDel={this.toDel} params={params}/></Panel>
  }
}


Topic.propTypes = {}

const mapActionCreators = {
  queryList,
  deleteItem
}

const mapStateToProps = (state) => {
  const {result, loading, delResult} = state.topic;
  let list = [], total = 0;
  if (result instanceof Array) {
    list = result[0].list;
    total = result[0].total;
  }
  return {list, total, loading, delResult};

}

export default connect(mapStateToProps, mapActionCreators)(Topic)

