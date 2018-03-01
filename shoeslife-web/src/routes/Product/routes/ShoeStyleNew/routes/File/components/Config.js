import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {FILE_UPOBJ} from 'static/apiAlias'
import {UploadImage} from 'components/FileLoader';

export function FormItems(context){
  let config = {};
  const {containers, logList,logImg} = context.props;
  const {result,params,history} = containers;

  let upConfig = {
    title:"上传OBJ文件",
    showUploadList: true,
    fileList:logList,
    action: FILE_UPOBJ+'/'+params.sid,
    onChangeFileList: logImg,
    beforeUpload:function(file,fileList){
      if(result.is[0]){
        setTimeout(()=>{
          history.replace('/product/shoeNew/notate');
        },2000);
        message.error('您未配置命名规则2秒后自动跳转');
        return false;
      }
      if (logList.length) {
        message.error('只能上传一个文件');
        return false;
      }
    },
    data: {
      model: 'operations/brand'
    }
  }

  config.panels = [{
    title: '',
    formItems: [{
      custom(getCustomFieldProps) {
        return (<div>
              <UploadImage className={params.stat=='OFFLINE'?'hide':'upload-list-inline upload-fixed'} upConfig={{...upConfig}}
                          {...getCustomFieldProps('log')} />
              <Link to={`/product/shoeNew/notate`}>配置命名规则</Link>
            </div>)
      }
    }]
  }];
  config.initValue = {};
  return config;
}
