import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import ResetPasswordView from '../components/ResetPasswordView'
import Panel from 'components/Panel'
import {modifyItem} from '../modules/ResetPasswordReducer'

class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {}
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {
      setTimeout(() => {
        nextProps.history.replace('/login');
      }, 800);
    }
  }

  getFormOptions() {
    const context = this;
    const {modifyItem, params} = context.props;
    return {
      handleSubmit(value) {
        modifyItem({
          email: params.email,
          code: params.code,
          ...value
        })
      },
      handleReset() {
      }
    }
  }

  render() {
    const {loading, result, params} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }
    return <ResetPasswordView  {...formOptions} params={params} />
  }
}


ResetPassword.propTypes = {
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  modifyItem
}

const mapStateToProps = (state) => {
  const {result, loading, isJump} = state.resetPassword;
  return {'result': result, loading, isJump};
}
export default connect(mapStateToProps, mapActionCreators)(ResetPassword)

