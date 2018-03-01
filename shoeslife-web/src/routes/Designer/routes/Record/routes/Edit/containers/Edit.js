import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {modifyItem, view} from '../modules/EditReducer'
import {message} from 'antd'
class Edit extends Component {
  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.photoImg = this._photoImg.bind(this);
    this.toItem = this.toItem.bind(this);
    this.state = {
      params: {},
      item: null,
      photoList: []
    }
  }

  _photoImg(files) {
    this.setState({
      photoList: files
    })
  }

  componentDidMount() {
    const {params, view} = this.props;
    if (params.id) {
      view(params.id)
    }
  }

  toItem(e) {
    if (!this.state.item)  return;
    if (e.target.value == this.state.item.profils) return;
    this.state.item.profils = e.target.value;
  }

  componentWillReceiveProps(nextProps, preProps) {
    let context = this;
    if (nextProps.isJump) {
      setTimeout(() => {
        nextProps.history.go(-1);
      }, 800);
    }
    if (!nextProps.params.id) return;
    let viewData = nextProps.result ? nextProps.result[0] : [];
    if (!viewData) return;
    if (viewData instanceof Array) return;
    setTimeout(function () {
      context.setState({
        item: viewData,
        photoList: viewData.photo || []
      })
    }, 50)
  }

  getFormOptions() {
    const context = this;
    const {params, modifyItem} = context.props;
    const {photoList} = context.state;

    return {
      handleSubmit(value) {
        let contentText = tinyMCE.activeEditor && tinyMCE.activeEditor.getContent()
        if (contentText == "<div>&nbsp;</div>") {
          message.error('内容不能为空！')
          return false
        }
        if (typeof photoList != 'string') {
          message.error('请上传一张头像！')
          return false
        }
        value.photo = photoList
        value.profils = contentText
        modifyItem({
          ...value,
          id: params.id
        })
      },
      handleReset() {
      }
    }
  }

  render() {
    const {params, photoList, item} = this.state;

    const {loading, result} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><EditView  {...formOptions} photoList={photoList} photoImg={this.photoImg} item={item}
                                      params={params} toItem={this.toItem}/></Panel>
  }
}

Edit.propTypes = {}

const mapActionCreators = {
  modifyItem,
  view
}

const mapStateToProps = (state) => {
  const {result, loading, modResult, isJump} = state.edit;
  return {result, loading, modResult, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(Edit)

