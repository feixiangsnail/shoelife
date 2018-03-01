import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Button,Col,Icon,Row,Input,Switch,InputNumber} from 'antd'
import Material from './Material';
import 'static/jquery';

import {loadStart} from './Load3D';

class Model extends Component {
  constructor(props) {
    super(props);
    this.onExhibition = this.onExhibition.bind(this);
    this.state = {
      defaults:{},
      isInit:true,
      mesh:null,
      exhibition:'down'
    }
  }
  componentWillReceiveProps(props) {
    if(!(props.result&&this.state.isInit)) return;
    let parent = this,
      state = this.state,
      sid = props.params.sid,
      val = '',
      data = props.data,
      shoe3d
    ;
    if(!props.result.heel.length) return;
    shoe3d = loadStart(props.result,(mode)=>{
       props.upMap(mode);
    })
    state.shoe = shoe3d.shoeScene;
    props.shoe3d.shoeModel = shoe3d.shoeModel;
    props.shoe3d.shoeScene = shoe3d.shoeScene;

    state.isInit = false;
    for(var i in state.shoe){
      if(!data[i])
        continue;
      state.shoe[i](data[i]);
    }
  }
 onColorUp(name){
    this.onStyleUp(name,$('#'+name).val());
 }
 onStyleUp(name,value){
    let {state,props} = this,
      file = {}
    ;
    props.data[name] = value;
    file[name] = value;
    file.shoeId = props.params.sid;
    state.shoe[name](value);

    props.shoeStyleUp(file)
    this.forceUpdate();
  }
  onExhibition(){
    let exhibition = this.state.exhibition=='down'?'up':'down';
    this.setState({exhibition:exhibition})
  }
  render() {

    let parent = this,
      {onStyleUp,onColorUp} = this,
      {
        params,material,data={},setCommend,
        unCommend,defMaterial,delMaterial,
        upMaterial,shoe3d,saveMaterial3D
      } = this.props
    ;
    return (
        <div className="model-view">
        <div id="shoeshow" className="pre" >

        </div>
        <div className={data.shoeId?'':'hide'}>
          <div className="exhibition" >
            <Icon type={this.state.exhibition} onClick={this.onExhibition} />
          </div>
          <div className={this.state.exhibition=='down'?'console':'hide'}>
            <Row className="all">
              <Col span="3" className="describe">整体效果：</Col>
              <Col span="20">
                <Row>
                  <Col span="2">亮度</Col>
                  <Col span="2">
                    <InputNumber size="small" min={0} max={1} value={data.ambientIntensity} step={0.1} onChange={onStyleUp.bind(this,'ambientIntensity')}></InputNumber>
                  </Col>
                  <Col span="3">环境色</Col>
                  <Col span="2"><Input type="color" id="ambientColor" value={data.ambientColor} size="small" onChange={onColorUp.bind(this,'ambientColor')} /> </Col>
                </Row>
              </Col>
            </Row>
            <Row className="parallel-light">
              <Col span="3" className="describe">平行光：</Col>
              <Col span="20">
                <Row>
                  <Col className="mr-b" span="2">强度</Col>
                  <Col span="2">
                    <InputNumber size="small" value={data.directIntensity} onChange={onStyleUp.bind(this,'directIntensity')} min={0} max={5} step={0.1} ></InputNumber>
                  </Col>
                  <Col span="3">颜色</Col>
                  <Col span="2"><Input type="color" id="changeDirColor" value={data.changeDirColor} size="small" onChange={onColorUp.bind(this,'changeDirColor')} /> </Col>
                  <Col span="3">更新方向</Col>
                  <Col span="3"><Switch checkedChildren="开" onChange={onStyleUp.bind(this,'directPointer')} checked={data.directPointer} unCheckedChildren="关" /> </Col>
                </Row>
              </Col>
            </Row>
            <Row className="spotlight">
              <Col span="3" className="describe">电灯泡：</Col>
              <Col span="20">
                <Row>
                  <Col span="2">强度</Col>
                  <Col span="2">
                    <InputNumber size="small" value={data.spotIntensity} onChange={onStyleUp.bind(this,'spotIntensity')} min={0} max={5} step={0.1} ></InputNumber>
                  </Col>
                  <Col span="3">颜色</Col>
                  <Col span="2"><Input type="color" id="pointColor" value={data.pointColor} size="small" onChange={onColorUp.bind(this,'pointColor')} /> </Col>
                  <Col span="3">衰减系数</Col>
                  <Col span="2">
                      <InputNumber size="small" value={data.decay} onChange={onStyleUp.bind(this,'decay')} min={0} max={5} step={0.1} ></InputNumber>
                  </Col>
                  <Col span="1">X</Col>
                  <Col span="2">
                    <InputNumber size="small" value={data.pointMoveX} onChange={onStyleUp.bind(this,'pointMoveX')} defaultValue={0} min={-500} max={500} ></InputNumber>
                  </Col>
                  <Col span="1">Y</Col>
                  <Col span="2">
                    <InputNumber size="small" value={data.pointMoveY} onChange={onStyleUp.bind(this,'pointMoveY')} defaultValue={20} min={-500} max={500} ></InputNumber>
                  </Col>
                  <Col span="1">Z</Col>
                  <Col span="2">
                    <InputNumber size="small" value={data.pointMoveZ} onChange={onStyleUp.bind(this,'pointMoveZ')} defaultValue={0} min={-500} max={500} ></InputNumber>
                  </Col>
                </Row>
              </Col>
            </Row>
            </div>
          </div>
          <Material shoe3d={shoe3d} saveMaterial3D={saveMaterial3D} data={material} upMaterial={upMaterial} unCommend={unCommend} params={params} setCommend={setCommend} defMaterial={defMaterial} delMaterial={delMaterial}></Material>
        </div>
    )
  }
}

Model.propTypes = {
  loading: React.PropTypes.bool,
}

export default Model;
