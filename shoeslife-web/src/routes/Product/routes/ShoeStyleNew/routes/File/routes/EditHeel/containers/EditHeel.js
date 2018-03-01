import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditHeelView from '../components/EditHeelView'
import Panel from 'components/Panel'
import {addItem, view, modifyItem} from '../modules/EditHeelReducer'
import {message} from 'antd'
class EditHeel extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.rendImg = this.rendImg.bind(this);

    this.state = {
      params: {},
      item: null,
      rendList: []
    }
    sessionStorage.setItem('activeKey',1);
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
      }, 800)
    }
    if (nextProps.params.cid) {
      this.setState({
        item: nextProps.vResult ? nextProps.vResult[0] : '',
        rendList: nextProps.vResult ? nextProps.vResult[0].rendering : [],
      })
    }
  }

  /**
   * (表格功能配置项)
   *
   * @returns (description)
   */
  getFormOptions() {
    const context = this;
    const {rendList} = context.state;
    const {addItem, params, modifyItem} = context.props;
    return {
      handleSubmit(value) {
        let pic = typeof rendList == 'string' ? rendList : rendList[0].name
        if (!pic) {
          message.error('效果图不能为空！')
        } else {
          params.cid ? modifyItem({
              shoeId: params.sid,
              styleId: params.cid,
              styleName: value.styleName,
              styleCode: value.styleCode,
              rendering: pic,
              styleHeight: value.styleHeight,
              description1: value.description1,
              description2: value.description2,
              stylePosition: 'h'
            }) : addItem({
              shoeId: params.sid,
              styleName: value.styleName,
              styleCode: value.styleCode,
              rendering: pic,
              styleHeight: value.styleHeight,
              description1: value.description1,
              description2: value.description2,
              stylePosition: 'h'
            })
        }
      },
      handleReset() {
      }
    }
  }

  render() {
    const {item, rendList} = this.state;
    const {loading, result, params} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><EditHeelView rendList={rendList} rendImg={this.rendImg} item={item} params={params}
                                         {...formOptions} /></Panel>
  }
}

EditHeel.propTypes = {
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
  const {result, modResult, vResult, loading, isJump} = state.editHeel;
  return {result, modResult, vResult, loading, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(EditHeel)
