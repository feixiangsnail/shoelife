import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditStampView from '../components/EditStampView'
import Panel from 'components/Panel'
import {addItem, view, modifyItem, queryList} from '../modules/EditStampReducer'
import {message} from 'antd'
class EditStamp extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.rendImg = this.rendImg.bind(this);
    this.state = {
      item: null,
    }
    sessionStorage.setItem('activeKey',3);
  }

  rendImg(files) {
    this.setState({
      rendList: files
    })
  }

  componentDidMount() {
    const {queryList, params, view} = this.props;
    queryList({
      materialType: '4',
      pageNum: 1,
      pageSize: 99999
    })
    if (params.id) {
      view(params.id)
    }
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {
      setTimeout(() => {
        nextProps.history.go(-1);
      }, 800)
    }
    if (nextProps.params.id) {
      this.setState({
        item: nextProps.vResult ? nextProps.vResult[0] : '',
        rendList: nextProps.vResult ? nextProps.vResult[0].rendering : [],
      })
    }
  }

  getFormOptions() {
    const context = this;
    const {rendList} = context.state;
    const {addItem, params, modifyItem} = context.props;
    let pic = typeof rendList == 'string' ? rendList : rendList && rendList.length > 0 ? rendList[0].name : null;
    return {
      handleSubmit(value) {
        if (!pic) {
          message.error('效果图不能为空！');
          return false
        }
        params.id ? modifyItem({
            shoeId: params.sid,
            styleId: params.pid,
            markId: params.id,
            materialId: value.materialId,
            part: value.part,
            rendering: pic,
          }) :
          addItem({
            shoeId: params.sid,
            materialId: value.materialId,
            part: value.part,
            rendering: pic,
          })
      },
      handleReset() {
      }
    }
  }


  render() {
    const {item, rendList} = this.state;
    const {loading, result, qResult, params} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }
    /**
     * 印记列表
     * @type {Array}
     */
    let xList = [];
    if (qResult && qResult.length > 0 && qResult[0].list) {
      xList = qResult[0].list.map(c => {
        return {
          title: c.materialIdentifier + '/' + c.materialName,
          value: c.materialId
        }
      });
    } else {
      xList = [{
        value: null,
        title: '正在加载中...'
      }]
    }

    return <Panel title=""><EditStampView rendList={rendList} rendImg={this.rendImg} item={item} {...formOptions} params={params}
                                          xList={xList}/></Panel>
  }
}


EditStamp.propTypes = {

}

const mapActionCreators = {
  addItem,
  queryList,
  view,
  modifyItem,
}

const mapStateToProps = (state) => {
  const {result, modResult, vResult, loading, isJump, qResult} = state.editStamp;
  return {modResult, vResult, result, loading, isJump, qResult};
}

export default connect(mapStateToProps, mapActionCreators)(EditStamp)
