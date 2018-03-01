import React, {PropTypes, Component} from 'react'
import {Icon} from 'antd'

class Eye extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMesh:true
    }
    this.onEye = this.onEye.bind(this);
  }

  lood(data,isEye){
    let parent = this;
    data.map((o)=>{
        o.isEye = isEye;
        if(o.mode) parent.lood(o.mode,isEye);
    })
  }
  onEye(){
    let parent = this
        ,{item,shoe3d,upNameData,data} = this.props
        ,name = item.isEye?'hide':'show'
    ;
    item.isEye = !item.isEye;
    if(!item.styleId){
      shoe3d.shoeModel[name+'Mesh'](item.modeId);
    }else{
      this.lood(item.mode,item.isEye)

      shoe3d.shoeModel[name+'Group'](item.styleId);
    }
    shoe3d.shoeScene.updateShadow();
    upNameData();
  }

  render(){
    let {item} = this.props
    ;
    if(typeof item.isEye == 'undefined'){
      item.isEye = item.isDefault;
      item.mode.map((vals)=>{
        vals.isDefault = item.isDefault;
      })
    }
    return (
        <span>
          <Icon type="eye" className={item.isEye?'':'hide'} onClick={this.onEye} />
          <Icon type="eye-o" className={item.isEye?'hide':''} onClick={this.onEye} />
        </span>
    )
  }
}
Eye.contextTypes = {
    props: React.PropTypes.object
}

export default Eye;
