import React, {PropTypes, Component} from 'react'
import {Icon,message,Radio,Modal } from 'antd'
import {UploadImage} from 'components/FileLoader';
import {IMG_URL} from 'static/apiAlias'
import {UpPicture} from '../Config.js';
import Names from './Names';
const RadioGroup = Radio.Group;

class DefaultAndFile extends Component {

  setDefault(){
    let {data,setDefault,item} = this.props;
    data.map(function(list){
        if(item.styleId!=list.styleId) list.isDefault = false;
        else list.isDefault = true;
    });
    setDefault(item.styleId);
    this.forceUpdate();
  }
  render(){
    let item = this.props.item;
    let params = this.props.params;
    return (
      <span className="operation ant-upload-list-item-single">
        <span className="set-default">
          <Radio checked={item.isDefault} onChange={this.setDefault.bind(this,)}>设为默认</Radio>
        </span>
        <UploadImage className='upload-list-inline upload-fixed'
          upConfig={{...UpPicture((url,fileList)=>{
            item.stylePic = url;
            this.forceUpdate();
            if(typeof url == 'string'&& url)
                this.props.setPicture({
                  styleId:item.styleId,
                  stylePic:url
                });
          },'效果图',item,params)}} />
      </span>
    )
  }
}
DefaultAndFile.contextTypes = {
    props: React.PropTypes.object
}

export default DefaultAndFile;
