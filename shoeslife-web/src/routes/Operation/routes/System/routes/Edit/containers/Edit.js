import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditMateriView from '../components/EditView'
import Panel from 'components/Panel'
import {modifyItem, view} from '../modules/EditReducer'
import {message} from 'antd'

class Edit extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {},
      item: null
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
    const {modifyItem, params} = context.props;
    return {
      handleSubmit(value) {
        modifyItem({
          ...value,
          paramId: params.id
        })
      },
      handleReset() {
      }
    }
  }

  render() {
    const {item} = this.state;
    const {loading, result} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }
    return <Panel title=""> <EditMateriView {...formOptions} item={item}/></Panel >
  }
}

Edit.propTypes = {
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  view,
  modifyItem
}

const mapStateToProps = (state) => {
  const {result, modResult, loading, isJump} = state.edit;
  return {result, modResult, loading, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(Edit)
