import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import IosAddView from '../components/IosAddView'
import Panel from 'components/Panel'
import {view, addItem, modifyItem} from '../modules/IosAddReducer'

class IosAdd extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {}
    }
  }

  componentDidMount() {
    const {params, view} = this.props;
    if (params.id) {
      view(params.id)
    }
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {
      setTimeout(() => {
        nextProps.history.go(-1);
      }, 800);
    }

    if (nextProps.params.id) {
      this.setState({
        item: nextProps.result ? nextProps.result[0] : ''
      })
    }
  }

  getFormOptions() {
    const context = this;
    const {addItem, modifyItem, params} = context.props;
    return {
      handleSubmit(value) {
        params.id ? modifyItem({
          ...value,
          versionId: params.id
        }) : addItem({
          ...value
        })
      },
      handleReset() {
      }
    }
  }

  render() {
    const {item} = this.state;

    const {loading, result, params} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><IosAddView  {...formOptions} item={item}/></Panel>
  }
}

IosAdd.propTypes = {}

const mapActionCreators = {
  view,
  modifyItem,
  addItem
}


const mapStateToProps = (state) => {
  const {addResult, result, modResult, loading, isJump} = state.iosAdd;
  return {addResult, result, modResult, loading, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(IosAdd)

