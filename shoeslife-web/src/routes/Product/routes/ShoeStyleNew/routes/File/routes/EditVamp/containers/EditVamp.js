import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditVampView from '../components/EditVampView'
import Panel from 'components/Panel'
import {addItem, view, modifyItem} from '../modules/EditVampReducer'
import {message} from 'antd'
class EditVamp extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.rendImg = this.rendImg.bind(this);

    this.state = {
      params: {},
      item: null,
      rendList: null
    }
    sessionStorage.setItem('activeKey',2);
  }

  rendImg(files) {
    this.setState({
      rendList: files
    })
  }

  componentDidMount() {
    const {params, view} = this.props;
    if (params.cid) {
      view(params.cid)
    }
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {
      setTimeout(() => {
        nextProps.history.go(-1);
      }, 800);
    }
    if (nextProps.params.cid) {
      this.setState({
        item: nextProps.result && nextProps.result.length > 0 ? nextProps.result[0] : '',
        rendList: nextProps.result && nextProps.result.length > 0 ? nextProps.result[0].rendering : []
      })
    }
  }

  getFormOptions() {
    const context = this;
    const {addItem, modifyItem, params} = context.props;
    const {rendList} = context.state;
    return {
      handleSubmit(value) {
        let pic = typeof rendList == 'string' ? rendList : rendList.length > 0 ? rendList[0].name:null
        if (!pic) {
          message.error('效果图不能为空！')
          return false
        }
        params.cid ? modifyItem({
          shoeId: params.sid,
          styleId: params.cid,
          stylePosition: 'u',
          styleName: value.styleName,
          styleCode: value.styleCode,
          rendering: pic
        }) :
          addItem({
            shoeId: params.sid,
            stylePosition: 'u',
            styleName: value.styleName,
            styleCode: value.styleCode,
            rendering: pic
          })
      },
      handleReset() {
      }
    }
  }

  render() {
    const {rendList, item} = this.state;
    const {loading, result, params} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><EditVampView {...formOptions} rendList={rendList} rendImg={this.rendImg}
                                         item={item} params={params}/></Panel>
  }
}

EditVamp.propTypes = {
  addItem: React.PropTypes.func,
  modifyItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  addItem,
  view,
  modifyItem
}

const mapStateToProps = (state) => {
  const {result, modResult, addResult, loading, isJump} = state.editVamp;
  return {result, modResult, addResult, loading, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(EditVamp)
