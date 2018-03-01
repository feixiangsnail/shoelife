import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditLastView from '../components/EditLastView'
import Panel from 'components/Panel'
import {addItem, view, modifyItem} from '../modules/EditLastReducer'
import {message} from 'antd'

class EditLast extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);

    this.state = {
      params: {},
      item: null,
    }
    sessionStorage.setItem('activeKey',1);
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
        nextProps.history.replace('/brand/materialNew');
      }, 800);
    }
    if (nextProps.params.id) {
      this.setState({
        item: nextProps.vResult && nextProps.vResult.length > 0 ? nextProps.vResult[0] : null
      })
    }
  }

  getFormOptions() {
    const context = this;
    return {
      handleSubmit(value, key) {
        const {addItem, params, modifyItem} = context.props;

        if (key === 'save') {
          params.id ? modifyItem({
            materialName: value.materialName,
            materialIdentifier: value.materialIdentifier,
            materialType: 1,
            lastHeight:value.lastHeight,
            materialId: params.id
          }) :
            addItem({
              materialName: value.materialName,
              materialIdentifier: value.materialIdentifier,
              lastHeight:value.lastHeight,
              materialType: 1
            })
        }
      },
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
    return <Panel title=""> < EditLastView {...formOptions} item={item} params={params}/></Panel >
  }
}


EditLast.propTypes = {

  addItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  addItem,
  modifyItem,
  view
}


const mapStateToProps = (state) => {
  const {result, loading, isJump, modResult, vResult} = state.editLast;

  return {result, loading, isJump, modResult, vResult};
}

export default connect(mapStateToProps, mapActionCreators)(EditLast)
