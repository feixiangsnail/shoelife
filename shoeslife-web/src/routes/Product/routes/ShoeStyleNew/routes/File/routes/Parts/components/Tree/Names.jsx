import React, {PropTypes, Component} from 'react'
import {Icon,message,Input,Tag,Menu, Dropdown,Popover,Row,Col } from 'antd'
import {UploadImage} from 'components/FileLoader';
import {UpModeConfig} from '../Config.js';
import {delSpace} from 'common/utils';
import Material from './Material';


class Names extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item:{},
      visible:false
    }
    this.onPut = this.onPut.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }
  onEdit(obj,e){
    obj.edit = true;
    this.forceUpdate();
    e.preventDefault();
    e.stopPropagation();
  }
  onCross(obj){
    obj.edit = false;
    this.forceUpdate();
  }
  isMode(item){
      if(typeof item.styleId =='undefined') return true
      else false;
  }
  up3DName(d,e){
    let {styleName,styleCode} = this.state;
    if(!delSpace(styleName))
        return message.error('名称不能为空');

    if(!delSpace(styleCode))
        return message.error('款式编号不能为空');

    this.props.up3DName({
      styleId:d.styleId,
      styleName:styleName,
      styleCode:styleCode
    });

    d.styleName = styleName;
    d.styleCode = styleCode;

    this.onCross(d);
    e.preventDefault();
    e.stopPropagation();
  }
  up3DModeName(d,e){
    let {modeName} = this.state;
    if(!delSpace(modeName))
        return message.error('名称不能为空');
    this.props.up3DModeName({
      modeId:d.modeId,
      modeName:modeName
    });
    d.modeName = modeName;
    this.onCross(d);
    e.preventDefault();
    e.stopPropagation();
  }

  setItem(item){
    this.state.item = item;
  }
  upType(d,e){
    this.props.upType({
      modeId:this.state.item.modeId
      ,type:d.key
    });
    this.state.item.type = d.key
    this.forceUpdate();
  }
  upMap(d){
    this.props.upMap(d);
    if(!d.modeId) return;
    this.props.shoe3d.shoeModel.findMeshById(d.modeId);
  }
  onPut(){
    const { upModePut,item } = this.props;
    if(item.status) item.status = 0;
    else item.status = 1;
    upModePut(item.styleId,item.status);
  }
  onUpload(e){
    const {
      queryObj,params
    } = this.props;

    if(typeof e == 'string')
      queryObj(params.sid);
  }

  render(){
    let {
        setMain,item,params,addRelation,
        selectMode,material
      } = this.props
      ,{stat,sid} = params
      ,parent = this
      ,styleName = item.styleName
    ;

    const menu = (
      <Menu onClick={this.upType.bind(this)}>
        <Menu.Item key="1" >
          部位
        </Menu.Item>
        <Menu.Item key="2">
          装饰
        </Menu.Item>
      </Menu>
    );

    if(item.edit){

      if(this.isMode(item)){
        this.state.modeName = item.modeName;
        return (
          <div className="ant-edit">
            <div className="edit-input">
              <Input size="small" maxLength="5" defaultValue={item.modeName} onKeyUp={(e)=>{this.state.modeName=e.target.value;}} placeholder="请输入部位名称" />
            </div>
            <div className="edit-input-icon">
              <Icon type="check" onClick={this.up3DModeName.bind(this,item)} />
              <Icon type="cross" onClick={this.onCross.bind(this,item)} />
            </div>
          </div>
        )
      }
      this.state.styleName = item.styleName;
      this.state.styleCode = item.styleCode;
      return (
        <div className="ant-edit">
          <div className="edit-input">
            <Input size="small" maxLength="5" defaultValue={item.styleName} onKeyUp={(e)=>{
              this.state.styleName = e.target.value
            }} placeholder="请输入款式名称" />
          </div>
          <div className="edit-input">
            <Input size="small" maxLength="20" defaultValue={item.styleCode}  onKeyUp={(e)=>{this.state.styleCode=e.target.value;}}
            placeholder="请输入款式编号" />
          </div>
          <div className="edit-input-icon">
            <Icon type="check" onClick={this.up3DName.bind(this,item)} />
            <Icon type="cross" onClick={this.onCross.bind(this,item)} />
          </div>
        </div>
      )
    }
    if(item.styleCode)
      styleName += '/'+item.styleCode
    return(
      <span>
        <span className={material.modeId==item.modeId&&(!item.styleId)?'on name':'name'} onClick={this.upMap.bind(this,item)}>
          {
            styleName||item.modeName
          }
          <Icon type="edit" onClick={this.onEdit.bind(this,item)} />
          {
            this.isMode(item)&&(item.isGroup == false||item.parentId!=null)?(
              <UploadImage className='upload-list-inline upload-fixed'
                            upConfig={{...UpModeConfig(item.modeId,this.onUpload)}} />
            ):''
          }
        </span>
        {
          !this.isMode(item)?(
            <a className="ant-dropdown-link put" href="javascript:void(0)" onClick={this.onPut}>
              {!item.status?'上架':'下架'}
            </a>
          ):''
        }
        {

          this.isMode(item)&&item.parentId==null?(
            <Dropdown overlay={menu} trigger={['click']} >
              <a className="ant-dropdown-link" href="javascript:void(0)" onClick={this.setItem.bind(this,item)}>
                {item.type==1?'部位':'装饰'} <Icon type="down" />
              </a>
            </Dropdown>
          ):''
        }
        {
          this.isMode(item)&&(item.isGroup&&item.parentId ==null)?(
            <Material  setMain={setMain} addRelation={addRelation} item={item} selectMode={selectMode}></Material>
          ):''
        }

      </span>
    )
  }
}
Names.contextTypes = {
    props: React.PropTypes.object
}

export default Names;
