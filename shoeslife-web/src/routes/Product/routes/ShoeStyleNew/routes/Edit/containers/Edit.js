import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {addItem, cateList, styleList, brandList, desList, materialList, view, modifyItem} from '../modules/EditReducer'
import {message} from 'antd'

class Edit extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.coverImg = this.coverImg.bind(this);
    this.introduceImg = this.introduceImg.bind(this);
    this.videoImg = this.videoImg.bind(this);
    this.sightImg = this.sightImg.bind(this);

    this.state = {
      params: {},
      item: null,
      coverList: null,
      introduceList: null,
      videoList: null,
      sightList: null,
    }
  }

  coverImg(files) {
    this.setState({
      coverList: files
    })
  }

  introduceImg(files) {
    this.setState({
      introduceList: files
    })
  }

  videoImg(files) {
    this.setState({
      videoList: files
    })
  }

  sightImg(files) {
    this.setState({
      sightList: files
    })
  }

  componentDidMount() {
    const {params, cateList, styleList, brandList, desList, materialList, view} = this.props;
    /**
     * 分类列表 cateList
     * 设计风格列表 styleList
     * 品牌 brandList
     * 设计师列表  desList
     */
    cateList({
      categoryType: '1'
    });
    brandList();
    styleList({
      categoryType: '4'
    });
    desList();
    materialList({
      pageNum: 1,
      pageSize: 1000,
      materialType: '1'
    })
    if (params.id) {
      view(params.id)
    }
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {
      let id,pathname,status;
      if(nextProps.params.id){
          id = nextProps.modResult[0].shoeId;
          status = nextProps.modResult[0].status;
      }else{
        id = nextProps.result[0].shoeId;
        status = nextProps.result[0].status;
      }
      setTimeout(() => {
        pathname = '/product/shoeNew';
        if(!nextProps.params.id)
          pathname += '/file/'+id+'/'+status;

        nextProps.history.replace(pathname);
      }, 800);
    }
    if (nextProps.params.id) {
      this.setState({
        item: nextProps.vResult && nextProps.vResult.length > 0 ? nextProps.vResult[0] : null,
        coverList: nextProps.vResult && nextProps.vResult.length > 0 ? nextProps.vResult[0].coverPhoto : '',
        introduceList: nextProps.vResult && nextProps.vResult.length > 0 ? nextProps.vResult[0].introducePhoto : '',
        videoList: nextProps.vResult && nextProps.vResult.length > 0 ? nextProps.vResult[0].video : '',
        sightList: nextProps.vResult && nextProps.vResult.length > 0 ? nextProps.vResult[0].sightPhoto : '',
      })
    }
  }

  getFormOptions() {
    const context = this;
    const {addItem, params, modifyItem} = context.props;
    const {coverList, introduceList, videoList, sightList} = context.state;
    return {
      handleSubmit(value, key) {
        /*let c = null, i = null;
        if (typeof introduceList == 'string') {
          i = introduceList.split(',')
        } else {
          i = []
        }*/
        // 情景图
        if (typeof sightList == 'string') {
          value.sightPhoto = sightList;
        } else {
          message.error('请上传一张情景图！')
          return false
        }

        // 宣传图
        if (typeof coverList == 'string') {
          let i = coverList.toString().split(',');
          if (i.length < 2 || i.length > 5) {
            message.error('请上传 2~5 张宣传图！')
            return false
          }
          value.coverPhoto = coverList
        } else {
          if (coverList.length < 2 || coverList.length > 5) {
            message.error('请上传 2~5 张宣传图！')
            return false
          }
          let pics = coverList.map((c) => {
            return c.name
          })
          value.coverPhoto = pics.join(',')
        }

        // 详情介绍
        if (typeof introduceList == 'string') {
          let k = introduceList.split(',')
          if (k.length && k.length > 10) {
            message.error('详情介绍图不能超过 10 张！')
            return false
          }
          value.introducePhoto = introduceList
        } else {
          if (introduceList&&introduceList.length  > 10) {
            message.error('详情介绍图不能超过 10 张！')
            return false
          }
          let pics = introduceList && introduceList && introduceList.map((c) => {
            return c.name
          })
          value.introducePhoto =pics && pics.length && pics.join(',')
        }

        // 设计风格
        if(!value.styleIdsStr||value.styleIdsStr==''){
          message.error('请选择设计风格')
          return false
        }
        value.designCategory = value.designCategory[value.designCategory.length - 1];
        value.video = videoList;
        value.styleIdsStr = value.styleIdsStr.join(',');
        if (key == 'save') {
          if (params.id) {
            modifyItem({
              ...value,
              shoeId: params.id
            })
          } else {
            addItem({
              ...value
            })
          }
        }
      },
      handleReset() {
      }
    }
  }

  render() {
    const {params, item, coverList, introduceList, videoList, sightList} = this.state;
    const {loading, result, cateResult, styleResult, brandResult, desResult, mResult} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }
    /**
     * 分类列表
     * @param lists
     * @returns {*}
     */
    const loop = (lists) => {
      return lists && lists.map(a => {
          let children = ((a.subcategory !== null) && (a.subcategory.length > 0)) ? loop(a.subcategory) : '';
          if ((a.subcategory !== null) && (a.subcategory.length > 0)) {
            return {
              value: a.categoryId + '',
              label: a.categoryName,
              children
            }
          } else {
            return {
              value: a.categoryId + '',
              label: a.categoryName
            }
          }
        })
    }
    /**
     * 设计师
     * @type {Array}
     */
    let dList = [];
    if (desResult) {
      dList = desResult.map(c => {
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
    /**
     * 设计风格
     * @type {Array}
     */
    let sList = [];
    if (styleResult) {
      sList = styleResult.map(c => {
        return {
          value: c.categoryId,
          title: c.categoryName
        }
      });
    } else {
      sList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
    /**
     * 品牌
     * @type {Array}
     */
    let bList = [];
    if (brandResult) {
      bList = brandResult.map(c => {
        return {
          value: c.brandId,
          title: c.brandName
        }
      });
    } else {
      sList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
    /**
     * 楦头列表
     * @type {Array}
     */
    let xList = [];
    if (mResult && mResult.length > 0 && mResult[0].list) {
      xList = mResult[0].list.map(c => {
        return {
          value: c.materialId,
          title: c.materialIdentifier + '/' + c.materialName
        }
      });
    } else {
      xList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
    return <Panel title=""> < EditView {...formOptions }
                                       handleChangeIntroduce={ this.handleChangeIntroduce }
                                       xList={ xList }
                                       cateList={ loop(cateResult) }
                                       coverList={coverList}
                                       introduceList={introduceList}
                                       videoList={videoList}
                                       sightList={sightList}
                                       coverImg={ this.coverImg }
                                       introduceImg={ this.introduceImg }
                                       videoImg={ this.videoImg }
                                       sightImg={ this.sightImg }
                                       item={ item }
                                       sList={ sList }
                                       dList={ dList }
                                       bList={ bList }
                                       params={ this.props.params }
    /></Panel >
  }
}

Edit.propTypes = {
  addItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  addItem,
  cateList,
  styleList,
  brandList,
  desList,
  materialList,
  view,
  modifyItem
}

const mapStateToProps = (state) => {
  const {result, cateResult, styleResult, brandResult, desResult, loading, mResult, isJump, modResult, vResult} = state.edit;
  return {'result': result, loading, cateResult, styleResult, brandResult, desResult, mResult, isJump, modResult, vResult};
}

export default connect(mapStateToProps, mapActionCreators)(Edit)
