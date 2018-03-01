import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditSpaceView from '../components/EditSpaceView'
import Panel from 'components/Panel'
import {addItem} from '../modules/EditSpaceReducer'

class EditSpace extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {}
    }
    sessionStorage.setItem('activeKey',2);
  }
  componentDidMount() {

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
    return {
      handleSubmit(value) {
        const {addItem} = context.props;
        addItem({
          ...value
        })
      },
      handleReset() {
      }
    }
  }

  render() {
    const {loading, result} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><EditSpaceView  {...formOptions} /></Panel>
  }
}

EditSpace.propTypes = {}

const mapActionCreators = {
  addItem
}


const mapStateToProps = (state) => {
  const {result, loading, isJump} = state.editSpace;
  return {'result': result, loading, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(EditSpace)

