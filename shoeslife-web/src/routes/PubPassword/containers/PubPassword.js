import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import PubPasswordView from '../components/PubPasswordView'
import {modifyItem} from '../modules/PubPasswordReducer'
import Cookie from 'js-cookie';
import store from 'store2';
class PubPassword extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {}
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {
      setTimeout(() => {
        store.clearAll();
        Cookie.remove('SESSION');
        nextProps.history.replace('/login');
      }, 800);
    }
  }

  getFormOptions() {
    const context = this;
    return {
      handleSubmit(value) {
        const {modifyItem} = context.props;
        context.setState({
          params: value
        })
        modifyItem({
          ...value
        })
      },
      handleReset() {
      }
    }
  }

  render() {
    const {params} = this.state;
    const {loading, result} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }
    return <PubPasswordView  {...formOptions} />
  }
}

PubPassword.propTypes = {
  result: React.PropTypes.object,
  modifyItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  modifyItem
}

const mapStateToProps = (state) => {
  const {result, loading, isJump} = state.pubPassword;
  return {'result': result, loading, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(PubPassword)

