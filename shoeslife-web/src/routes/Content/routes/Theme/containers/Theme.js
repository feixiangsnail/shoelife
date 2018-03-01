import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import ThemeView from '../components/ThemeView'
import Panel from 'components/Panel'
import {queryList, modifyItem, deleteItem} from '../modules/ThemeReducer'
import {initScreen} from 'common/utils';
class Theme extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.toDel = this._del.bind(this);
    this.toRelease = this._release.bind(this);
    this.state = {
      params: initScreen({
        data: {
          name: null,
          status: null,
        }
      })
    }
  }

  // 发布/上线/下线
  _release(id, row) {
    const {modifyItem} = this.props;
    if(row.status == 'ONLINE'){
      modifyItem({
        id: id,
        status: 'OFFLINE'
      })
    }else {
      modifyItem({
        id: id,
        status: 'ONLINE'
      })
    }
  }

  //删除
  _del(id) {
    const {deleteItem} = this.props;
    deleteItem(id)
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
              name: null,
              status: null,
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

    return <Panel title=""><ThemeView {...tableOptions} {...formOptions} params={params}
                                      toDel={this.toDel} toRelease={this.toRelease}/></Panel>
  }
}

Theme.propTypes = {}

const mapActionCreators = {
  queryList,
  deleteItem,
  modifyItem,
}


const mapStateToProps = (state) => {
  const {result, loading} = state.theme;
  let list = [], total = 0;
  if (result instanceof Array) {
    list = result[0].list;
    total = result[0].total;
  }
  return {list, total, loading};

}

export default connect(mapStateToProps, mapActionCreators)(Theme)

