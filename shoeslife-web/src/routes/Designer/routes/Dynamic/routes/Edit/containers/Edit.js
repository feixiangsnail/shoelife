import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {queryList, addItem, modifyItem, view} from '../modules/EditReducer'
import {message} from 'antd'
class Edit extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.toItem = this._toItem.bind(this);
    this.iconImg = this._iconImg.bind(this);
    this.state = {
      params: {},
      item: null,
      iconList: null,
    }
  }

  _iconImg(files) {
    this.setState({
      iconList: files
    })
  }

  _toItem(e) {
    if (!this.state.item)  return;
    if (e.target.value == this.state.item.content) return;
    this.state.item.content = e.target.value;
  }

  componentDidMount() {
    const {queryList, params, view} = this.props;
    queryList();
    if (params.id) {
      view(params.id)
    }
  }

  componentWillReceiveProps(nextProps, preProps) {
    let context = this;
    if (nextProps.isJump) {
      setTimeout(() => {
        nextProps.history.go(-1);
      }, 800);
    }
    if (!nextProps.params.id) return;
    let viewData = nextProps.vResult ? nextProps.vResult[0] : '';
    if (!viewData) return;
    if (viewData instanceof Array) return;
    setTimeout(function () {
      context.setState({
        item: viewData,
        iconList: viewData.icon || ''
      })
    }, 50)
  }

  getFormOptions() {
    const context = this;
    const {addItem, params, modifyItem} = context.props;
    const {iconList} = context.state;
    return {
      handleSubmit(value) {
        let contentText = tinyMCE.activeEditor && tinyMCE.activeEditor.getContent()
        if (contentText == "<div>&nbsp;</div>") {
          message.error('内容不能为空！')
          return false
        }
        if (typeof iconList != 'string') {
          message.error('请上传一张动态配图！')
          return false
        }
        params.id ? modifyItem({
          designerId: value.designerId,
          title: value.title,
          content: contentText,
          icon: iconList,
          designerDynamicId: params.id
        }) : addItem({
          designerId: value.designerId,
          title: value.title,
          icon: iconList,
          content: contentText
        })
      },
      handleReset() {
      }
    }
  }

  render() {
    const {iconList, item} = this.state;
    const {result, loading, params} = this.props
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }
    /**
     * 设计师
     * @type {Array}
     */
    let dList = [];
    if (result && result.length) {
      dList = result.map(c => {
        return {
          value: c.id,
          title: c.adminName
        }
      });
    } else {
      dList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
    let dId = null;
    if (result && result.length == 1) {
      dId = result[0].id
    }
    return <Panel title=""><EditView  {...formOptions} dList={dList} dId={dId}
                                      toItem={this.toItem} iconList={iconList}
                                      iconImg={this.iconImg} item={item} params={params}
    /></Panel>
  }
}

Edit.propTypes = {}

const mapActionCreators = {
  queryList,
  view,
  modifyItem,
  addItem
}


const mapStateToProps = (state) => {
  const {result, loading, addResult, modResult, vResult, isJump} = state.edit;
  return {result, loading, addResult, modResult, vResult, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(Edit)
