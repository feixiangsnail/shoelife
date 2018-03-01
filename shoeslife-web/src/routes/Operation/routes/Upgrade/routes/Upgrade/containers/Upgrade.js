import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import SetUpgradleView from '../components/UpgradeView'
import Panel from 'components/Panel'
import {upgradeItem, view} from '../modules/UpgradeReducer'
import {message} from 'antd'

class Upgrade extends Component {

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
    const {upgradeItem,  params} = context.props;
    return {
      handleSubmit(value, key) {
        if (key === 'save') {
          if(params.id){
            value.versionId=params.id;
          }
          upgradeItem({
            ...value
          })

        }
      },
      /**
       * (筛选表单重置)
       */
      handleReset() {
      }
    }
  }


  render() {
    const {item} = this.state;

    const {loading, result,params} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }
    return <Panel title=""> <SetUpgradleView {...formOptions} params={params} item={item}/></Panel >
  }
}


Upgrade.propTypes = {
  upgradeItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  upgradeItem,
  view,
}

const mapStateToProps = (state) => {
  const {upgradeResult, result, loading, isJump} = state.upgrade;
  return {upgradeResult, result, loading, isJump};
}




export default connect(mapStateToProps, mapActionCreators)(Upgrade)
