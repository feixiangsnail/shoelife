import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {addItem, modifyItem, view} from '../modules/EditReducer'

class Edit extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {},
      item: null,
    }
  }

  componentDidMount() {
    const {view, params} = this.props;
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
    const {params, addItem, modifyItem} = context.props;
    return {
      handleSubmit(value) {
        params.id ? modifyItem({
          id: params.id,
          ...value
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

    return <Panel title=""><EditView  {...formOptions} item={item} params={params}/></Panel>
  }
}


Edit.propTypes = {}

const mapActionCreators = {
  addItem,
  modifyItem,
  view
}


const mapStateToProps = (state) => {
  const {result, loading, addResult, isJump, modResult} = state.edit;
  return {'result': result, loading, addResult, isJump, modResult};
}

export default connect(mapStateToProps, mapActionCreators)(Edit)

