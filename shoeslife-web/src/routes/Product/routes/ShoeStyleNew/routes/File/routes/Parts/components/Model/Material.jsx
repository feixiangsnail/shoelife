import React, {Component, PropTypes} from 'react';
import {Button,Col,Card,Icon,Row,Input,Slider,Switch,Popover,InputNumber,Select,Checkbox,message} from 'antd';
import {Link} from 'react-router';
import {IMG_URL} from 'static/apiAlias';
import {UpImg} from '../Config.js';
import {UploadImage} from 'components/FileLoader';
import 'static/jquery';
import {objNum} from 'common/utils';

const Option = Select.Option;
const OptGroup = Select.OptGroup;

class Material extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select:{},
      defaults:{},
      isDef:false,
    }
  }

  onMaterial(skey,vals){
    let {select} = this.state
      ,{shoe3d} = this.props
    ;
    for(var i in select){
      select[i]= false
    }
    select[skey] = true;
    this.forceUpdate();
    shoe3d.shoeModel.setCurrentMaterial(vals);
  }
  objNum(data,val){
    let num = 0;
    for(var i in data){
      data[i].map((item)=>{
        if(item.isCommend)
          num++;
      })
    }
    return num;
  }
  onCommend(vals){
    let{data,unCommend,setCommend} = this.props;
    if(vals.isCommend){
      unCommend(vals.modeMaterialId);
    }else{
      if(this.objNum(data.map)>2){
        message.error('推荐数已经超过上限');
        return;
      }
      setCommend(vals.modeMaterialId);
    }

    vals.isCommend = !vals.isCommend;
    this.forceUpdate();
  }
  onMaterialDef(vals,skey){
    let {defaults} = this.state
      ,{data} = this.props
      ,id = skey.split('_')[1]
    ;
    this.props.defMaterial(vals.modeMaterialId);

    for(var i in data.map){
      data.map[i].map((item)=>{
        item.isDefault = false
      });
    }
    vals.isDefault = true;
    this.forceUpdate();
  }
  onMaterialDel(list,vals){
    this.props.delMaterial(vals.modeMaterialId);
    list.map((obj,i)=>{
        if(obj.modeMaterialId != vals.modeMaterialId)
          return;
        list.splice(i,1)
    })
    this.forceUpdate();
  }
  onEditUp(vals){
    vals.edit = !vals.edit;
    this.forceUpdate();
  }
  onEditOk(vals){
    this.props.upMaterial({
      materialPrice:vals.materialPrice,
      modeMaterialId:vals.modeMaterialId
    });
    this.onEditUp(vals);
  }
  handleInputChange(vals,val) {
    vals.materialPrice =  val;
    this.forceUpdate();
 }
 onColorUp(obj,name,e){
   this.onStyleUp(obj,name,e.target.value);
 }
 onStyleUp(obj,name,value){
    let file = {
        modeMaterialId:obj.modeMaterialId
      },
      {shoe3d} = this.props
    ;
    file[name] = value;
    obj[name] = value;
    this.forceUpdate();
    this.props.upMaterial(file);
    shoe3d.shoeModel.setCurrentMaterial(obj);
  }
  onShelves(obj,name){
    let file = {
        modeMaterialId:obj.modeMaterialId,
        status:1
      }
    ;
    if(obj.status){
      file.status = 0;
      obj.status = 0;
    }else{
      obj.status = 1;
    }
    this.forceUpdate();
    this.props.upMaterial(file);
  }
  onMaterialAdd(id){
    let { saveMaterial3D } = this.props;
    saveMaterial3D(id);
  }
  render() {
    let parent = this,skey,
      {onColorUp,onStyleUp} = this,
      {params,data} = this.props,
      title = data.fatherName || data.modeName
    ;
    if(data.fatherName&&data.modeName)
      title = data.fatherName+'/'+(data.modeName);
    data.map = data.map || {};
    return (
          <Card className={data.modeId&&(!(data.isGroup&&data.parentId==null))?'modeAdd':'hide'} title={title+':已添加材料'} extra={
            <Link to={`/product/shoeNew/file/${params.sid}/${params.stat}/parts/mater/${data.modeId}`}><Icon type="plus" />添加材料</Link>
          }>
            <div className="material-all">
            <div className={Object.entries(data.map).length>0?'hide':'material-no'}>暂无材料</div>
              {
                Object.entries(data.map).map(function(list,key){
                  return (
                    <Row key={key} className={list[1].length>0?'':'hide'}>
                      <Row>
                        <Col span="3">{list[0]}:</Col>
                        <Col span="21">
                          {
                            list[1].map(function(vals,mkey){
                              skey = key+''+mkey+'_'+vals.modeId;
                              let {icon} = vals.material3d;
                              return (
                                <Col span="2" className="material-icon" key={mkey}>
                                    <img src={IMG_URL+icon} onClick={parent.onMaterial.bind(parent,skey,vals)} className={parent.state.select[skey]?'on':''} />
                                    <span>¥{vals.materialPrice}</span>
                                    <div className={vals.isCommend&&vals.isDefault?'silentAndpush':''}>
                                      <span className={vals.isCommend?'push':'hide'}>推</span>
                                      <span className={vals.isDefault?'silent':'hide'}>默</span>
                                      <span className={!vals.status?'alreadyLaid':'hide'}>下</span>
                                    </div>
                                </Col>
                            )
                        })
                      }
                      </Col>
                    </Row>
                  {
                    list[1].map(function(vals,mkey){
                        skey = key+''+mkey+'_'+vals.modeId;
                        let {
                          categoryNameSecond,
                          materialIdentifier,materialName,renderType,type
                        } = vals.material3d;
                      return (
                          <Card title={
                            materialName&&materialIdentifier?
                            materialName+'/'+materialIdentifier:
                            materialName||materialIdentifier
                          }  extra={<span className="material-second">所属分类/{categoryNameSecond}</span>} className={parent.state.select[skey]?'material-row':'hide'} >
                          <Row className="material-map">
                            <Col span="4">
                              <Col span="12">透明度</Col>
                              <Col span="12" className="input"><InputNumber onChange={onStyleUp.bind(parent,vals,'opacity')} size="small" value={vals.opacity} min="0" max="1" step="0.1" ></InputNumber></Col>
                            </Col>
                            <Col span="4" className="hide">
                              <Col span="12">自发光</Col>
                              <Col span="12" className="input"><InputNumber onChange={onStyleUp.bind(parent,vals,'emissive')} size="small" value={vals.emissive} min="0" max="1.0" step="0.1" ></InputNumber></Col>
                            </Col>
                            <Col span="4">
                              <Col span="12">颜色</Col>
                              <Col span="12" className="input"><Input type="color" id="color" value={vals.color} size="small"  onChange={onColorUp.bind(parent,vals,'color')} /> </Col>
                            </Col>
                            <Col span="4">
                              <Col span="12">凹凸度</Col>
                              <Col span="12" className="input"><InputNumber onChange={onStyleUp.bind(parent,vals,'bumpScale')} value={vals.bumpScale} size="small" min="0" max="10" step="0.5"></InputNumber></Col>
                            </Col>
                            <Col span="4">
                              <Col span="12">法向度</Col>
                              <Col span="12" className="input" className="input"><InputNumber onChange={onStyleUp.bind(parent,vals,'normalScale')} value={vals.normalScale} size="small" ></InputNumber></Col>
                            </Col>
                            <Col span="4">
                              <Col span="12">角度</Col>
                              <Col span="12" className="input"><InputNumber size="small" onChange={onStyleUp.bind(parent,vals,'angle')} value={vals.angle} min="0" max="360" ></InputNumber></Col>
                            </Col>
                            <Col span="4">
                              <Col span="12">X轴</Col>
                              <Col span="12" className="input"><InputNumber onChange={onStyleUp.bind(parent,vals,'offsetx')} value={vals.offsetx} size="small" min="-2" max="2" step="0.1" ></InputNumber></Col>
                            </Col>
                            <Col span="4">
                              <Col span="12">Y轴</Col>
                              <Col span="12" className="input"><InputNumber onChange={onStyleUp.bind(parent,vals,'offsety')} value={vals.offsety} size="small" min="-2" max="2" step="0.1" ></InputNumber></Col>
                            </Col>
                            <Col span="4">
                              <Col span="12">缩放X</Col>
                              <Col span="12" className="input"><InputNumber onChange={onStyleUp.bind(parent,vals,'scaleValuex')} value={vals.scaleValuex} size="small" min="0" max="100" step="0.1" ></InputNumber></Col>
                            </Col>
                            <Col span="4">
                              <Col span="12">缩放Y</Col>
                              <Col span="12" className="input"><InputNumber onChange={onStyleUp.bind(parent,vals,'scaleValuey')} value={vals.scaleValuey} size="small" min="0" max="100" step="0.1" ></InputNumber></Col>
                            </Col>
                            <Col span="4">
                              <Col span="12">是否透明</Col>
                              <Col span="12" className="switch"><Switch checkedChildren="开" onChange={onStyleUp.bind(parent,vals,'transparent')} checked={vals.transparent} unCheckedChildren="关" /> </Col>
                            </Col>
                              <Col span="4" className={renderType==1&&type?'hide':''}>
                                <Col span="12">高光色</Col>
                                <Col span="12" className="input"><Input type="color" id="specular" value={vals.specular} size="small" onInput={onColorUp.bind(parent,vals,'specular')} /></Col>
                              </Col>
                              <Col span="4" className={renderType==1&&type?'hide':''}>
                                <Col span="12">闪亮度</Col>
                                <Col span="12" className="input"><InputNumber onChange={onStyleUp.bind(parent,vals,'shininess')} value={vals.shininess} size="small" min="0" max="150" ></InputNumber> </Col>
                              </Col>
                              <Col span="4" className={renderType==1&&type==0?'hide':''}>
                                <Col span="12">金属度</Col>
                                <Col span="12" className="input"><InputNumber onChange={onStyleUp.bind(parent,vals,'metalness')} value={vals.metalness} size="small" min="0" max="1" step="0.1" ></InputNumber></Col>
                              </Col>
                              <Col span="4" className={renderType==1&&type==0?'hide':''}>
                                <Col span="12">粗糙度</Col>
                                <Col span="12" className="input"><InputNumber onChange={onStyleUp.bind(parent,vals,'roughness')} value={vals.roughness} size="small" min="0" max="1" step="0.1"></InputNumber></Col>
                              </Col>
                              <Col span="4" className={renderType==1&&type==0?'hide':''}>
                                <Col span="12">渲染面</Col>
                                <Col span="12" className="input"><InputNumber onChange={onStyleUp.bind(parent,vals,'side')} value={vals.side} size="small" min="0" max="2" step="1"></InputNumber></Col>
                              </Col>
                              
                              <Col span="4">
                                <Col span="12">自发光</Col>
                                <Col span="12" className="input"><Input type="color" id="emissive" value={vals.emissive} size="small"  onChange={onColorUp.bind(parent,vals,'emissive')} /> </Col>
                              </Col>
                              <Col span="5" className={renderType==2?'files':'hide'} >
                                  <UploadImage className='upload-list-inline upload-fixed'
                                      upConfig={{...UpImg((url,fileList)=>{
                                        if(typeof url == 'string'&& url)
                                          onStyleUp.bind(parent)(vals,'map',url)
                                      },'漫反射贴图')}} />
                                  <Icon className={vals.map&&vals.map!='null'?'':'hide'} type="cross" onClick={onStyleUp.bind(parent,vals,'map','null')} />
                              </Col>
                              <Col span="5" className={renderType==2?'files':'hide'}>
                                  <UploadImage className='upload-list-inline upload-fixed'
                                    upConfig={{...UpImg((url,fileList)=>{
                                      if(typeof url == 'string'&& url)
                                        onStyleUp.bind(parent)(vals,'bumpMap',url)
                                    },'凹凸贴图') }} />
                                  <Icon className={vals.bumpMap&&vals.bumpMap!='null'?'':'hide'} type="cross" onClick={onStyleUp.bind(parent,vals,'bumpMap','null')} />
                              </Col>
                              <Col span="5" className={renderType==2?'hide':'hide'}>
                                  <UploadImage className='upload-list-inline upload-fixed'
                                    upConfig={{...UpImg((url,fileList)=>{
                                      if(typeof url == 'string'&& url)
                                          onStyleUp.bind(parent)(vals,'alphaMap',url)
                                    },'alpha贴图') }} />
                                  <Icon className={vals.alphaMap&&vals.alphaMap!='null'?'':'hide'} type="cross" onClick={onStyleUp.bind(parent,vals,'alphaMap','null')} />
                              </Col>
                              <Col span="5" className={renderType==2?'hide':'hide'}>
                                  <UploadImage className='upload-list-inline upload-fixed'
                                    upConfig={{...UpImg((url,fileList)=>{
                                      if(typeof url == 'string'&& url)
                                        onStyleUp.bind(parent)(vals,'normalMap',url)
                                    },'法向量贴图') }} />
                                  <Icon className={vals.normalMap&&vals.normalMap!='null'?'':'hide'} type="cross" onClick={onStyleUp.bind(parent,vals,'normalMap','null')} />
                              </Col>
                            <Col span="24" className="buts">
                                <Col span="6" className={vals.edit?'money':'hide money'}>
                                    <Col span="12">
                                      <InputNumber placeholder="加价金额" onChange={parent.handleInputChange.bind(parent,vals)} value={vals.materialPrice} size="small" min="0" max="9999" step="10" ></InputNumber>
                                    </Col>
                                    <Col sapn="12">
                                      <Icon type="check" onClick={parent.onEditOk.bind(parent,vals)} />
                                      <Icon type="cross" onClick={parent.onEditUp.bind(parent,vals)} />
                                    </Col>
                                </Col>
                                <Col span="6" className={!vals.edit?'money':'hide'}>
                                    <span >加价金额：¥{vals.materialPrice}元</span>
                                    <Icon type="edit"  onClick={parent.onEditUp.bind(parent,vals)} />
                                </Col>
                                <Col span="1"></Col>
                                <Col span="4"><Button type="ghost" onClick={parent.onMaterialAdd.bind(parent,vals.modeMaterialId)}>保存材料信息</Button></Col>
                                <Col span="4" className={params.stat=='UNPUBLISHED'||params.stat=='UPLOADED'?'':'hide'}>
                                  <Button type="ghost" onClick={parent.onMaterialDel.bind(parent,list[1],vals)}>删除此用料</Button>
                                </Col>
                                <Col span="4" className={params.stat=='OFFLINE'?'':'hide'}>
                                  <Button type="ghost" onClick={parent.onShelves.bind(parent,vals)}>{vals.status?'下架此用料':'上架此用料'}</Button>
                                </Col>
                                <Col span="4">
                                  <Button type="ghost" onClick={parent.onMaterialDef.bind(parent,vals,skey,vals.modeId)} className={vals.isDefault?'hide':''}>设为默认</Button>
                                </Col>
                                <Col span="4">
                                  <Button type="ghost" onClick={parent.onCommend.bind(parent,vals)}>{vals.isCommend?'取消推荐':'设为推荐'}</Button>
                                </Col>
                            </Col>
                          </Row>
                      </Card>
                      )
                    })
                  }
                </Row>
                )
              })
            }
          </div>
      </Card>
    )
  }
}

Material.propTypes = {
  loading: React.PropTypes.bool,
}

export default Material;
