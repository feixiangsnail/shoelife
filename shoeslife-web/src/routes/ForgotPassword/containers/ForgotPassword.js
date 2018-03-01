import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import ForgotPasswordView from '../components/ForgotPasswordNew'
import Panel from 'components/Panel'
import {addItem} from '../modules/ForgotPasswordReducer'
import {SECUR_CODE} from '../../../static/apiAlias'
const imgUrl = SECUR_CODE;
class ForgotPassword extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uptVcode = this.uptVcode.bind(this);

    this.state = {
      vcodeUrl: imgUrl,
      isShow: false,
      userName: null
    }
  }

  componentDidMount() {
    this.uptVcode();
  }

  getValidateStatus(field) {
    const {isFieldValidating, getFieldError, getFieldValue} = this.props.form;
    if (isFieldValidating(field)) {
      return 'validating';
    } else if (!!getFieldError(field)) {
      return 'error';
    } else if (getFieldValue(field)) {
      return 'success';
    }
  }

  handleSubmit(e, form) {
    e.preventDefault();
    form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      this.props.addItem(values)
    });
  }

  uptVcode() {
    this.setState({
      vcodeUrl: imgUrl + '?t=' + new Date().getTime()
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOk) {
      this.setState({
        isShow: true,
        userName:nextProps.result[0]
      })
    }
  }

  componentWillUnmount() {
    document.onkeydown = () => {
    }
  }

  render() {
    const {loading} = this.props;
    const {vcodeUrl, isShow,userName} = this.state;
    return <ForgotPasswordView handleSubmit={this.handleSubmit} vCode={this.uptVcode} vcodeUrl={vcodeUrl} isLoading={loading} isShow={isShow} userName={userName} />
  }
}


ForgotPassword.propTypes = {
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  addItem
}


const mapStateToProps = (state) => {
  const {result, loading, isOk} = state.forgotPassword;
  return {'result': result, loading, isOk};
}

export default connect(mapStateToProps, mapActionCreators)(ForgotPassword)

