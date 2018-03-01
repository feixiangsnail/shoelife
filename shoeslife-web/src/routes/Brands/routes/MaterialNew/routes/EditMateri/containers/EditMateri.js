import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditMateriView from '../components/EditMateriView'
import Panel from 'components/Panel'
import {addItem, view, modifyItem, cateList} from '../modules/EditMateriReducer'
import {message} from 'antd'
import {getRoute} from 'common/utils';

class EditMateri extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.iconImg = this.iconImg.bind(this);
    this.state = {
      params: {
        type:0,
        palettes:null,
        palettesMetal:null
      },
      item: null,
      iconList: [],
      normalMap: [],
      alphaMap: [],
      bumpMap: [],
      map: []
    }
    sessionStorage.setItem('activeKey',2);
  }

  /**
   * 需求 修改上传图片 只更图不更新名称
   * 因 只更图不更新名称 导至 图片无法 加载新的数据
   * 结绝方法  增加 随机数
   * @export
   * @param params (name)
   * @returns obj|string
   */

  addRandom(name){
    if(typeof name == 'string')
        return name = name.split('?')[0]+'?'+this.S4();
    return name;
  }
  S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }

  iconImg(name) {
    return (fileName,files)=>{
      if(!files) return;
      this.state[name] = this.addRandom(fileName)
      this.forceUpdate();
    }
  }

  componentDidMount() {
    const {params, cateList, view} = this.props;
    if (params.id) {
      view(params.id)
    }
    cateList({
      categoryType: '2'
    });
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {

      setTimeout(() => {
        nextProps.history.replace('/brand/materialNew');
      }, 800);
    }
    if (!nextProps.params.id) return;

    if( nextProps.result && nextProps.result.length>0){
      let {icon,normalMap,alphaMap,bumpMap,map} = nextProps.result[0];
      this.setState({
        item: nextProps.result[0] ,
        iconList:nextProps.result[0].icon ,
        normalMap:normalMap?normalMap:[] ,
        alphaMap: alphaMap?alphaMap:[]  ,
        bumpMap: bumpMap?bumpMap:[]  ,
        map:map?map:[]
      })
    }
  }

  getFormOptions() {
    let file = {};
    const context = this;
    const {addItem, modifyItem,params} = context.props;
    let {iconList, item,normalMap,alphaMap,bumpMap,map} = context.state;
    let imgs = {icon:iconList,normalMap,alphaMap,bumpMap,map};
    return {
      handleSubmit(value, key) {
        if (key !== 'save')  return;

        if (!iconList.length)
          return message.error('通用贴图不能为空！');

        value.materialId = params.id;
        value.firstCategoryId =  value.category[0];
        value.secondCategoryId = value.category[1];

        value.materialType = 2;
        value.renderType = params.renderType;
        value.type = params.type;

        for(var i in imgs){
          if(imgs[i].length>0){
            value[i] = imgs[i].split('?')[0];
            continue;
          }
          value[i] = '';
        }

        if(params.id)
          return modifyItem(value);
        addItem(value);
      },
      handleReset() {
      }
    }
  }

  render() {
    const {iconList, item, usePostion,normalMap, alphaMap, bumpMap, map} = this.state;
    const {loading, result, cateResult, params} = this.props;
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
    return  (<Panel title="">
                <EditMateriView {...formOptions}
                                iconList={iconList} normalMap={normalMap} alphaMap={alphaMap} bumpMap={bumpMap} map={map}
                                iconImg={this.iconImg} cateList={loop(cateResult)} params={params} item={item}/>
            </Panel>)
  }
}

EditMateri.propTypes = {
  addItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  addItem,
  view,
  modifyItem,
  cateList
}

const mapStateToProps = (state) => {
  const {addResult, result, modResult, loading, cateResult, isJump} = state.editMateri;
  return {addResult, result, modResult, loading, cateResult, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(EditMateri)
