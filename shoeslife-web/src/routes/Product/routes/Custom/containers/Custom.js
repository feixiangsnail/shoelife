import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import CustomView from '../components/CustomView'
import Panel from 'components/Panel'
import {queryList, modifyItem} from '../modules/CustomReducer'
import {initScreen} from 'common/utils';

class Custom extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.toRecom = this._recom.bind(this);
    this.state = {
      params: initScreen({
        data: {
          key: null,
          isRecommend: null
        }
      })
    }
  }

  _recom(id, row) {
    const {modifyItem} = this.props
    row.isRecommend ? modifyItem(id + '/false') : modifyItem(id + '/true')
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
        setTimeout(() => {
          context.setState({
            params: {
              key: null,
              isRecommend: null
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

    return <Panel title=""><CustomView params={params} {...tableOptions} {...formOptions} toRecom={this.toRecom}/></Panel>
  }
}

Custom.propTypes = {}

const mapActionCreators = {
  queryList,
  modifyItem
}

const mapStateToProps = (state) => {
  const {result, loading, modResult} = state.custom;
  let list = [], total = 0;
  if (result instanceof Array) {
    list = result[0].list;
    total = result[0].total;
  }
  return {list, total, loading, modResult};

}

export default connect(mapStateToProps, mapActionCreators)(Custom)
