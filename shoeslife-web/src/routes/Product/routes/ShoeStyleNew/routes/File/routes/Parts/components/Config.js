import {
  FILE_UPOBJ,
  FILE_UPLOAD,
  UP_3D_MODE,
  FILE_3D_STYLE
} from 'static/apiAlias';
import {message} from 'antd'
export function UpConfig(context){
  const {containers, logList,logImg} = context.props;
  const {params} = containers;
  let json = {
    title:"重新上传",
    showUploadList: true,
    fileList:logList,
    action: FILE_UPOBJ+'/'+params.sid,
    onChangeFileList: logImg,
    beforeUpload:function(file,fileList){
      const isFile = /\.(obj)$/ig.test(file.name);
      if (!isFile) {
        message.error('只能上传 obj 后缀！', 2);
        return isFile;
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
  return json;
}
export function UpModeConfig(mId,changeFile){

  let json = {
    title:"更新",
    showUploadList: true,
    action: UP_3D_MODE+'/'+mId,
    onChangeFileList: changeFile,
    beforeUpload:function(file,fileList){
      const isFile = /\.(obj)$/ig.test(file.name);
      if (!isFile) {
        message.error('只能上传 obj 后缀！', 2);
        return isFile;
      }
      if(fileList){
        if (fileList.length) {
          message.error('只能上传一个文件');
          return false;
        }
      }
    },
    data: {
      model: 'operations/brand'
    }
  }
  return json;
}
export function UpPicture(changeFile,name,item){
  let json = {
    title:name||"效果图",
    showUploadList: true,
    action: FILE_UPLOAD,
    onlyFile:true,
    headers: {
      authorization: 'authorization-text',
    },
    onChangeFileList: changeFile,
    fileList:item.stylePic,
    beforeUpload:function(file,fileList){
      const isFile = /\.(png)$/ig.test(file.name);
      if (!isFile) {
        message.error('只能上传 png 后缀的图片！', 2);
        return isFile;
      }
      if (file.size > 150*1024) {
        message.error('只能上传 150KB 以内的图片！', 2);
        return false
      }
    },
    data: {
      model: 'operations/shoe/style'
    }
  }
  return json;
}
export function upStyle(name,id,changeFile){
  let json = {
    title:name,
    showUploadList: true,
    action: FILE_3D_STYLE+id,
    onlyFile:true,
    headers: {
      authorization: 'authorization-text',
    },
    onChangeFileList: changeFile,
    beforeUpload:function(file,fileList){
      const isFile = /\.(obj)$/ig.test(file.name);
      if (!isFile) {
        message.error('只能上传 obj 后缀！', 2);
        return isFile;
      }
      if(fileList){
        if (fileList.length) {
          message.error('只能上传一个文件');
          return false;
        }
      }
    }
  }
  return json;
}

export function UpImg(changeFile,name,url){
  let json = {
    title:name,
    showUploadList: true,
    action: FILE_UPLOAD,
    onlyFile:true,
    headers: {
      authorization: 'authorization-text',
    },
    defaultFileList:url,
    onChangeFileList: changeFile,
    beforeUpload:function(file,fileList){
      const isFile = /\.(png)$/ig.test(file.name);
      if (!isFile) {
        message.error('只能上传 png 后缀的图片！', 2);
        return isFile;
      }
    },
    data: {
      model: 'product/shoeNew'
    }
  }
  return json;
}
