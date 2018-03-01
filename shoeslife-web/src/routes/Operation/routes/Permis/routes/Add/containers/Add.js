import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import AddView from '../components/AddView'
import Panel from 'components/Panel'
import {addItem, queryList} from '../modules/AddReducer'

class Add extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {},
    }
  }

  componentDidMount() {
    const {queryList} = this.props;
    queryList()
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {
      setTimeout(() => {
        nextProps.history.go(-1);
      }, 800);
    }
  }

  getFormOptions() {
    const context = this;
    const {addItem} = context.props;
    return {
      handleSubmit(value) {
        addItem({
          ...value
        })
      },
      handleReset() {
      }
    }
  }

  render() {
    const {result, loading} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }
    /**
     * 获取所有平台角色
     * @type {Array}
     */

    let roleList = [];
    if (result && result.length > 0) {
      roleList = result.map(c => {
        return {
          value: c.roleId + '',
          title: c.roleName
        }
      });
    } else {
      roleList = [{
        value: null,
        title: '正在加载中...'
      }]
    }

    return <Panel title=""><AddView  {...formOptions} roleList={roleList}/>
    </Panel>
  }
}


Add.propTypes = {
  addItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  addItem,
  queryList,
}

const mapStateToProps = (state) => {
  const {result, addResult, isJump, loading} = state.add;
  return {result, addResult, loading, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(Add)

