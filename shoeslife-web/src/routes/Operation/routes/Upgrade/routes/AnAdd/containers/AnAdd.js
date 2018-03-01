import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import AnAddView from '../components/AnAddView'
import Panel from 'components/Panel'
import {view, addItem, modifyItem} from '../modules/AnAddReducer'

class AnAdd extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.logImg = this.logImg.bind(this);
    this.state = {
      params: {},
      item: null,
      logList: []
    }
  }

  logImg(files) {
    this.setState({
      logList: files
    })
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
    const {logList} = context.state;
    const {addItem, modifyItem, params} = context.props;
    return {
      handleSubmit(value) {
        value.fileId = logList;
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
    const {item, logList} = this.state;
    const {loading, result, params} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><AnAddView  {...formOptions} item={item} logList={logList} logImg={this.logImg}/></Panel>
  }
}

AnAdd.propTypes = {}

const mapActionCreators = {
  view,
  modifyItem,
  addItem
}


const mapStateToProps = (state) => {
  const {addResult, result, modResult, loading, isJump} = state.anAdd;
  return {addResult, result, modResult, loading, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(AnAdd)
