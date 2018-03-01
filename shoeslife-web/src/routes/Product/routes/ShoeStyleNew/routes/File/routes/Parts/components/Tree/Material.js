import React, {PropTypes, Component} from 'react'
import {Icon,message,Input,Tag,Menu, Dropdown,Popover,Row,Col,Modal,Checkbox } from 'antd'
import {IMG_URL} from 'static/apiAlias'

class Material extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select:{},
      modeIds:{},
      visible: false
    }
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  handleOk() {
    let {addRelation,item} = this.props
        ,{ select } = this.state
        ,errorVal = ''
        ,isMain
    ;
    let childrenids = [];

    item.mode.map((vals)=>{
      if(vals.isMain) isMain = vals.isMain;
    })
    if(!isMain) return message.error('请先设置主要关联');
    for(var i in select){
      i.split('_~_')[0];
      if(!select[i]){
        errorVal +=['“',i.split('_~_')[0],'”,'].join('');
        continue;
      }
      childrenids.push(select[i]);
    }
    if(errorVal){
      message.error(errorVal+'尚未选择关联材料，请全部关联后再提交');
      return;
    }
    if(childrenids.length) {
      addRelation(childrenids);
    }
    this.setState({
      visible: false,
    });
  }
  handleCancel(e) {
    this.setState({
      visible: false,
    });
  }

  onRelated(d,item,isMain) {
    let parent = this
      ,{select,modeIds} = this.state
    ;
    if(d.is) return;
    if(!isMain){
      select[d.keyName] = d.modeMaterialId;
      this.forceUpdate();
      return;
    }
    for(var i in select){
      select[i] = false;
    }
    d.ids.map((v)=>{
      select[modeIds[v]] = v;
    });
    select[d.keyName] = d.modeMaterialId;
    this.forceUpdate();
  }
  componentWillUpdate(p,s){
    if(!s.visible){
      for(var i in s.select){
          s.select[i] = null;
      }
    }
  }
  onMain(d){
    let parent = this;
    let {item,setMain} = this.props;
    let {select} = this.state;
    if(d.isMain == true) return;
    Modal.confirm({
       title: '您是否确认更改',
       content: '将弃用之前设置的关联材料，确认更改吗？',
       onOk() {
         setMain(d.modeId);
         item.mode.map((mode)=>{
             mode.isMain = false;
         });
         Object.entries(d.map).map((list,key)=>{
           list[1].map((vals,key)=>{
              vals.ids = [];
           });
         });

         d.isMain = true;
         parent.forceUpdate();
       }
     });
  }
  onSelectMode(obj,e){
    obj.isCustomizable = e.target.checked;
    this.props.selectMode(obj.modeId,e.target.checked);
    this.forceUpdate();
  }
  render(){
    let parent = this
      ,name
    ;
    let {item} = this.props;
    let {select,visible,modeIds} = this.state;

    return (
        <span className="materials">
        <a className="ant-dropdown-link" href="javascript:void(0)" onClick={this.showModal} >
          关联用料
        </a>
        <Modal title="关联材料" width="660" visible={visible}
         onOk={this.handleOk} onCancel={this.handleCancel}>
       {
         item.mode.map((obj,key)=>{
             name = obj.modeName||obj.modeCode;
             return(
               <Row key={key} className="materials-related">
                   <Col span="24">
                     <span className="related-name">
                       {
                         obj.isMain?
                            <Tag color="red" onClick={this.onMain.bind(parent,obj)}>主要</Tag>:
                            <Tag onClick={this.onMain.bind(parent,obj)}>主要</Tag>
                       }
                     </span>
                     <span className="mode-name">
                       {obj.modeName||obj.modeCode}
                     </span>
                     {
                        !obj.isMain?<Checkbox className="user-up" checked={obj.isCustomizable} onChange={parent.onSelectMode.bind(parent,obj)}>用户可修改</Checkbox>:''
                     }
                   </Col>
                   {
                     Object.entries(obj.map).map((list,key)=>{
                         return(
                               list[1].map((vals,key)=>{
                                 let {icon,materialName} = vals.material3d;
                                 vals.keyName = obj.modeName||obj.modeCode;
                                 vals.keyName += '_~_'+vals.modeId;
                                 modeIds[vals.modeMaterialId] = vals.keyName;
                                 if(!select[vals.keyName]) select[vals.keyName] = null;

                                 return (
                                   <Col span="3" key={key} className={vals.status?'':'hide'}>
                                     <img src={IMG_URL+icon} onClick={parent.onRelated.bind(parent,vals,item.mode,obj.isMain)} className={select[vals.keyName]==vals.modeMaterialId?'on':''} />
                                     <span>{materialName}</span>
                                   </Col>
                                 )
                               })
                         )
                     })
                   }
               </Row>
             )
         })
       }
       </Modal>
      </span>
    )
  }
}
Material.contextTypes = {
    props: React.PropTypes.object
}

export default Material;
