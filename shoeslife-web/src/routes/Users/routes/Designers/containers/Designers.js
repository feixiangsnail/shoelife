import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import DesignersView from '../components/DesignersView'
import Panel from 'components/Panel'
import {queryList, modifyItem} from '../modules/DesignersReducer'
import {initScreen} from 'common/utils';
class Designers extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.toRecommend = this._recommend.bind(this);
    this.state = {
      params: initScreen({
        data: {
          adminName: null
        }
      })
    }
  }

  _recommend(id, row) {
    const {modifyItem} = this.props;
    if (row.recommend) {
      modifyItem(id + '/false')
    } else {
      modifyItem(id + '/true')
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
              adminName: null
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
      params
    }

    const formOptions = {
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><DesignersView {...tableOptions} {...formOptions} params={params} toRecommend={this.toRecommend}/></Panel>
  }
}


Designers.propTypes = {}

const mapActionCreators = {
  queryList,
  modifyItem,
}

const mapStateToProps = (state) => {
  const {result, loading} = state.designers;
  let list = [], total = 0;
  if (result instanceof Array) {
    list = result[0].list;
    total = result[0].total;
  }
  return {list, total, loading};
}

export default connect(mapStateToProps, mapActionCreators)(Designers)

