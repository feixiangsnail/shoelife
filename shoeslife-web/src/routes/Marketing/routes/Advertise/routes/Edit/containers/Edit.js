import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {queryList, addItem, modifyItem, view, spaceList} from '../modules/EditReducer'
import {message} from 'antd'
import {getTimeStamp,formatDate} from 'common/utils';
class Edit extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.iconImg = this.iconImg.bind(this);

    this.state = {
      params: {},
      item: null,
      iconList: null
    }
    sessionStorage.setItem('activeKey', 1);
  }

  iconImg(files) {
    this.setState({
      iconList: files
    })
  }

  componentDidMount() {
    const {params, view, queryList, spaceList} = this.props;
    if (params.id) {
      view(params.id)
    }
    queryList({
      pageNum: 1,
      pageSize: 1000,
    })
    spaceList({
      pageNum: 1,
      pageSize: 1000,
    })
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {
      setTimeout(() => {
        nextProps.history.go(-1);
      }, 800);
    }
    if (nextProps.params.id) {
      let viewData = nextProps.result && nextProps.result.length ? nextProps.result[0] : [];
      this.setState({
        item: viewData,
        iconList: viewData.icon || []
      })
    }
  }

  getFormOptions() {
    const context = this;
    return {
      handleSubmit(value, key) {
        const {addItem, params, modifyItem} = context.props;
        const {iconList} = context.state;
        if (!iconList) {
          message.error('广告图不能为空！');
          return;
        }
        if (getTimeStamp(value.playStartTime) > getTimeStamp(value.playEndTime)) {
          message.error('开始时间不能晚于结束时间！', 3);
          return false
        }
        params.id ? modifyItem({
          id: params.id,
          spaceId: value.spaceId,
          sortWeight: value.sortWeight,
          playEndTime: getTimeStamp(formatDate(value.playEndTime, false) + ' 23:59:59'),
          playStartTime: getTimeStamp(formatDate(value.playStartTime, false) + ' 00:00:00'),
          h5Id: value.h5Id,
          icon: iconList,
        }) :
          addItem({
            spaceId: value.spaceId,
            sortWeight: value.sortWeight,
            playEndTime: getTimeStamp(formatDate(value.playEndTime, false) + ' 23:59:59'),
            playStartTime: getTimeStamp(formatDate(value.playStartTime, false) + ' 00:00:00'),
            h5Id: value.h5Id,
            icon: iconList,
          })
      },
      handleReset() {
      }
    }
  }


  render() {
    const {item, iconList} = this.state;

    const {loading, result, params, hResult, spaceResult} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }

    /**
     * H5页面列表
     * @type {Array}
     */
    let pList = [];
    if (hResult && hResult.length > 0 && hResult[0].list) {
      pList = hResult[0].list.map(c => {
        return {
          value: c.id,
          title: c.name
        }
      });
    } else {
      pList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
    /**
     * 广告位
     * @type {Array}
     */
    let sList = [];
    if (spaceResult) {
      sList = spaceResult && spaceResult.length && spaceResult[0].map(c => {
          return {
            value: c.id,
            title: c.name
          }
        });
    } else {
      sList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
    return <Panel title=""><EditView  {...formOptions} iconList={iconList} iconImg={this.iconImg}
                                      item={item} params={params} pList={pList} sList={sList}
    /></Panel>
  }
}


Edit.propTypes = {}

const mapActionCreators = {
  queryList,
  view,
  modifyItem,
  addItem,
  spaceList
}


const mapStateToProps = (state) => {
  const {result, loading, modResult, addResult, hResult, isJump, spaceResult} = state.edit;
  return {result, loading, modResult, addResult, hResult, isJump, spaceResult};

}

export default connect(mapStateToProps, mapActionCreators)(Edit)

