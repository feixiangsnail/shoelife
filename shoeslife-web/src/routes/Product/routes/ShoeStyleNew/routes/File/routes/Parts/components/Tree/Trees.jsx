import React, {PropTypes, Component} from 'react'
import {Tree,Icon,message,Radio,Modal } from 'antd'
import Names from './Names';
import Eye from './Eye';
import DefaultAndFile from './DefaultAndFile';
import {UploadImage} from 'components/FileLoader';
import {UpModeConfig} from '../Config.js';

const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;

class Trees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleName:null
    }
    this.upNameData = this.upNameData.bind(this);
  }
  onSelect(obj,e){
      obj.is = obj.is?'':'tree-hide';
      this.forceUpdate();
      e.preventDefault();
      e.stopPropagation();
  }

  setDefault(obj){
    let {data,setDefault} = this.props;
    data.map(function(item){
        if(obj.styleId!=item.styleId) item.isDefault = false;
        else item.isDefault = true;
    });
    setDefault(obj.styleId);
    this.forceUpdate();
  }
  isMode(item){
      if(typeof item.styleId =='undefined') return true
      else false;
  }
  upNameData(){
      this.forceUpdate();
  }
  loop(mode){
    let parent = this
      ;
    const {
      params,treesEvent,upMap,shoe3d,
      material,data,upSilentMap
    } = this.props;
    const {
      up3DName,up3DModeName,setDefault,setPicture,
      upType,delRelation,addRelation,setMain,getMaterial,
      queryObj,upModePut,selectMode
    } = treesEvent;

    let html =  mode.map((item) => {
      if(item.styleName)
        parent.state.styleName = item.styleName;
      else
        item.fatherName = parent.state.styleName;

      if (item.mode && item.mode.length) {
        return (<li className={item.is+' piece'} >
                  <Icon type="caret-down" onClick={parent.onSelect.bind(parent,item)} />
                  <Icon type="caret-right" onClick={parent.onSelect.bind(parent,item)} />
                  <Names material={material} shoe3d={shoe3d} params={params} item={item} selectMode={selectMode} up3DName={up3DName} up3DModeName={up3DModeName} upType={upType} upMap={upMap} delRelation={delRelation} addRelation={addRelation} setMain={setMain} getMaterial={getMaterial} queryObj={queryObj} upModePut={upModePut}></Names>
                  {
                    parent.isMode(item)?'':(
                      <DefaultAndFile item={item} params={params} data={parent.props.data} setPicture={setPicture} setDefault={setDefault} ></DefaultAndFile>
                    )
                  }
                  <Eye shoe3d={shoe3d} item={item} upNameData={this.upNameData} data={data}/>
                  {this.loop(item.mode)}
                </li>);
      }
      return (<li className={ material.modeId==item.modeId?'on':''}>
                <Names material={material} shoe3d={shoe3d} params={params} selectMode={selectMode} item={item} up3DName={up3DName} up3DModeName={up3DModeName} upType={upType} upMap={upMap} delRelation={delRelation} addRelation={addRelation} setMain={setMain} getMaterial={getMaterial} queryObj={queryObj} upModePut={upModePut}></Names>
                <Eye item={item} shoe3d={shoe3d} upNameData={this.upNameData} data={data} />
              </li>);
    });
    return html;
  }

  render(){
    let {data} = this.props;
    if(!data) return <div></div>;
    return (
        <div>
          <ul className="tree-custom">
            {this.loop(data)}
          </ul>
        </div>
    )
  }
}
Trees.contextTypes = {
    props: React.PropTypes.object
}

export default Trees;
