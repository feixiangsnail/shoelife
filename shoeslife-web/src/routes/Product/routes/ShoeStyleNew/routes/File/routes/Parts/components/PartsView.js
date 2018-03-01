import React, {Component, PropTypes} from 'react';
import {UploadImage} from 'components/FileLoader';
import {UpConfig,upStyle} from './Config.js';
import { Button } from 'antd'
import Trees from './Tree';
import Model from './Model';
import classes from './Parts.less';
import {H5_URL} from 'static/apiAlias';

class PartsView extends Component {
  constructor(props) {
    super(props);
    this.onFileStyle = this.onFileStyle.bind(this);
    this.state = {
      styleName:null
    }
  }

  onFileStyle(file,memory){
    const {
      params,queryObj
    } = this.props.containers;
    if(typeof file != 'object'&&memory.fileList.length)
      queryObj(params.sid);
  }
  render() {
    const {containers,material,upMap,shoe3d,upSilentMap} = this.props;
    const {
      result,params,delMaterial,defMaterial,setCommend,
      unCommend,upMaterial,shoeStyleUp,saveMaterial3D
    } = containers;
    let toUrl = H5_URL + 'h5/#/design/' + params.sid+'/preview';
    return (
      <div>
          <div className='uploadImage' >
            <UploadImage className={params.stat=='OFFLINE'?'hide':'upload-list-inline upload-fixed'}
                        upConfig={{...UpConfig(this) }} />
            <a href={toUrl} target="_blank"><Button type="primary">预览设计</Button></a>
          </div>

        <div className={classes.left}>

          {
            typeof result =='object'?
              <div className={result.shoe?'show':'hide'}>
                <div className="demoNav">
                    鞋跟款式
                    <UploadImage className='upload-list-inline upload-fixed'
                        upConfig={{...upStyle('鞋跟款式',params.sid,this.onFileStyle) }} />
                </div>
                <Trees data={result.heel} treesEvent={containers} upMap={upMap} upSilentMap={upSilentMap} params={params} shoe3d={shoe3d} material={material}/>
                <div className="demoNav">鞋面款式
                    <UploadImage className='upload-list-inline upload-fixed'
                      upConfig={{...upStyle('鞋面款式',params.sid,this.onFileStyle) }} />

                </div>
                <Trees data={result.upper} treesEvent={containers} upMap={upMap} upSilentMap={upSilentMap} params={params} shoe3d={shoe3d} material={material}/>
              </div>
            :''
          }
        </div>
        <div className={classes.right}>
          <Model shoeStyleUp={shoeStyleUp} upMap={upMap} data={result?result.shoe:{}} saveMaterial3D={saveMaterial3D} shoe3d={shoe3d} result={result} params={params} material={material} delMaterial={delMaterial} defMaterial={defMaterial} setCommend={setCommend} unCommend={unCommend} upMaterial={upMaterial}></Model>
        </div>
      </div>
    )
  }
}

PartsView.propTypes = {
  loading: React.PropTypes.bool,
}

export default PartsView;
