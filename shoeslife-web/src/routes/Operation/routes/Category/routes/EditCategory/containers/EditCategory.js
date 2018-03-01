import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditCategoryView from '../components/EditCategroyView'
import Panel from 'components/Panel'
import {addItem, view, modifyItem, topCateList} from '../modules/EditCategoryReducer'
import {message} from 'antd'

class EditCategory extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.iconImg = this.iconImg.bind(this);
    this.bannerImg = this.bannerImg.bind(this);
    this.toChange = this._change.bind(this);
    this.state = {
      params: {},   //表格需要的筛选参数
      iconList: null,
      iconNew: [],
      bannerNew: [],
      bannerList: null
    }
  }

  _change(value) {
    const {topCateList} = this.props;
    topCateList({
      categoryType: value
    });
  }

  iconImg(files) {
    this.setState({
      iconList: files
    })
    this.setState({
      iconNew: files
    })
  }

  bannerImg(files) {
    this.setState({
      bannerList: files
    })
    this.setState({
      bannerNew: files
    })
  }

  componentDidMount() {
    const {params, view, topCateList} = this.props;
    if (params.id) {
      view(params.id)
    }
    topCateList({
      categoryType: '1'
    });
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {
      setTimeout(() => {
        nextProps.history.go(-1);
      }, 800);
    }
    if (nextProps.params.id) {
      this.setState({
        item: nextProps.vResult && nextProps.vResult.length ? nextProps.vResult[0] : null,
        iconList: nextProps.vResult && nextProps.vResult.length ? nextProps.vResult[0].icon : null,
        bannerList: nextProps.vResult && nextProps.vResult.length ? nextProps.vResult[0].bannerIcon : null
      })
    }
  }

  getFormOptions() {
    const context = this;
    return {
      handleSubmit(value, key) {
        const {addItem, params, modifyItem} = context.props;
        const {iconNew, iconList, bannerNew, bannerList} = context.state;

        if (typeof iconList == 'string') {
          value.icon = iconList
        } else {
          value.icon = null
        }
        if (typeof bannerList == 'string') {
          value.bannerIcon = bannerList
        } else {
          value.bannerIcon = null
        }
        if (params.id) {
          if (iconNew.length == 0) {
            if (typeof value.icon == 'string') {
              value.icon = value.icon
            } else {
              value.icon = null
            }
          } else {
            if (typeof iconNew == 'string') {
              value.icon = iconNew
            } else {
              value.icon = null
            }
          }
          if (bannerNew.length == 0) {
            if (typeof value.bannerIcon == 'string') {
              value.bannerIcon = value.bannerIcon
            } else {
              value.bannerIcon = null
            }
          } else {
            if (typeof bannerNew == 'string') {
              value.bannerIcon = bannerNew
            } else {
              value.bannerIcon = null
            }
          }
        }
        if (key === 'save') {
          params.id ? modifyItem({
            categoryId: params.id,
            categoryName: value.categoryName,
            categoryType: value.categoryType,
            parentId: value.parentId && value.parentId.length > 0 ? value.parentId[0] : '',
            icon: value.icon,
            bannerIcon: value.bannerIcon,
            display: value.display,
            sort: value.sort,
            status: 0,
          }) :
            addItem({
              categoryName: value.categoryName,
              categoryType: value.categoryType,
              parentId: value.parentId && value.parentId.length > 0 ? value.parentId[0] : '',
              icon: value.icon,
              bannerIcon: value.bannerIcon,
              display: value.display,
              sort: value.sort,
              status: 0,
            })
        }
      },
      handleReset() {
      }
    }
  }

  render() {
    const {item, iconList, bannerList} = this.state;
    const {loading, result, cateResult, topCateResult, params} = this.props;
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
    const toploop = (lists) => {
      if (lists) {
        lists.unshift({categoryId: '0', categoryName: '顶级分类'})
      }
      return lists && lists.map(a => {
          return {
            value: a.categoryId + '',
            label: a.categoryName
          }
        })
    }
    return <Panel title=""> <EditCategoryView topList={toploop(topCateResult)}
                                              {...formOptions} iconList={iconList} toChange={this.toChange}
                                              iconImg={this.iconImg} item={item} params={params}
                                              bannerList={bannerList} bannerImg={this.bannerImg}
                                              handleChange={this.handleChange}/></Panel >
  }
}

EditCategory.propTypes = {

  addItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  addItem,
  modifyItem,
  view,
  topCateList
}


const mapStateToProps = (state) => {
  const {result, loading, modResult, vResult, isJump, topCateResult} = state.editCategory;
  return {result, loading, modResult, vResult, isJump, topCateResult};
}

export default connect(mapStateToProps, mapActionCreators)(EditCategory)
