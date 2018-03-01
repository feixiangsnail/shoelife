import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import PartsView from '../components/PartsView'
import Panel from 'components/Panel'
import { message } from 'antd'
import {
  queryObj,setDefault,setPicture,up3DName,up3DModeName,upType,
  delMaterial,defMaterial,setCommend,unCommend,upMaterial,
  delRelation,addRelation,setMain,getMaterial,upModePut,selectMode,
  shoeStyleUp,getMaterialModel,materialModelColse,saveMaterial3D
} from '../modules/PartsReducer'
import {jumpUrl} from 'common/utils';

class Parts extends Component {

  constructor(props) {
    super(props);
    this.upMap = this.upMap.bind(this);
    this.upSilentMap = this.upSilentMap.bind(this);
    this.state = {
      logList:[],
      material:{},
      shoe:{}
    }
  }
  upMap(val){
    if(!val) return;
    let context = this;
    setTimeout(()=>{
      context.setState({
        material:val
      });
    })
  }
  upSilentMap(material){
    this.state.material = material;
  }
  logImg(files,info) {
    let {history} = this.props,
      response = info.file.response
    ;
    if(response && response.returncode == 1){
      info.file.status = 'error';
      notification.error({
          duration:60,
          message: '文件错误',
          description: response.message,
        });
    }
    this.setState({
      logList: files
    });
    if(info.file.status=='done') window.location.reload();
  }
  componentDidMount() {
    const {queryObj,params,getMaterialModel} = this.props;
    this.state.mId = sessionStorage.getItem('materialsMid');
    queryObj(params.sid);
  }
  lood(mode){
    let parent = this;
    mode.map((item)=>{
        if(item.modeId==parent.state.mId){return parent.upMap(item);}
        if(item.mode && item.mode.length){
            parent.lood(item.mode);
        }
    })
  }
  componentWillReceiveProps(nextProps) {
    let { queryObj,resultARM,resultSMD } = nextProps,
        {material} = this.state,
        parent = this,
        result
    ;
    if( nextProps.result ){
      if(this.state.mId){
        result = nextProps.result;
        this.lood(result.heel);
        if(!this.state.material.modeId)
          this.lood(result.upper);
      }
    }
    if( resultSMD.is ){
      message.success('保存用料信息成功');
      resultSMD.is = false;
    }

    //关联材料 泛层 执行动画后 再重新 加载模行
    if(nextProps.resultARM.is){
      setTimeout(()=>{
          parent.componentDidMount();
      },600)
    }
    nextProps.resultARM.is = false;
  }
  render() {
    let {logList,imgList,material,shoe} = this.state;
    return (
      <Panel>
        <PartsView logList={logList} upMap={this.upMap} upSilentMap={this.upSilentMap}  material={material} containers={{...this.props}} logImg={this.logImg.bind(this)} shoe3d={shoe} />
      </Panel>
    )
  }
}

const mapActionCreators = {
  queryObj,setDefault,setPicture,up3DName,
  up3DModeName,upType,delMaterial,defMaterial,
  setCommend,unCommend,upMaterial,delRelation,
  addRelation,setMain,getMaterial,upModePut,selectMode,
  shoeStyleUp,getMaterialModel,materialModelColse,saveMaterial3D
}

const mapStateToProps = (state) => {
  let {result = {},resultARM={is:false},resultSMD={is:false}} = state.parts;
  if(result instanceof Array)
    state.parts.result = result[0];
  return {...state.parts,resultARM,resultSMD};
}
export default connect(mapStateToProps, mapActionCreators)(Parts)
