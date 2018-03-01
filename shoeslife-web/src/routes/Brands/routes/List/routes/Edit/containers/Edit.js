import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditMateriView from '../components/EditView'
import Panel from 'components/Panel'
import {addItem, view, modifyItem} from '../modules/EditReducer'
import {message} from 'antd'

class Edit extends Component {

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
        item: nextProps.result ? nextProps.result[0] : '',
        logList: nextProps.result ? nextProps.result[0].log : []
      })
    }
  }

  getFormOptions() {
    const context = this;
    const {addItem, modifyItem, params} = context.props;
    const {logList} = context.state;
    return {
      handleSubmit(value, key) {
        let pic = typeof logList == 'string' ? logList : logList[0].name
        if (key === 'save') {
          if (!pic) {
            message.error('LOGO不能为空！')
          } else {
            params.id ? modifyItem({
              brandId: params.id,
              brandName: value.brandName,
              introduction: value.introduction,
              log: pic,
            }) :
              addItem({
                brandName: value.brandName,
                introduction: value.introduction,
                log: pic,
              })
          }
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
    const {logList, item} = this.state;
    const {loading, result, cateResult} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }
    return <Panel title=""> <EditMateriView {...formOptions} logList={logList} logImg={this.logImg}
                                            item={item}/></Panel >
  }
}

Edit.propTypes = {
  addItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  addItem,
  view,
  modifyItem,
}
const mapStateToProps = (state) => {
  const {addResult, result, modResult, loading, isJump} = state.edit;
  return {addResult, result, modResult, loading, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(Edit)









































