import React from 'react';
import {Button, Icon, Upload, message, Alert} from 'antd';
import Image from '../Image';
import './fileloader.less';

const getImageUrl = Image.getImageUrl;
/*
 DownLoader  导出文件
 @url 接口url， 必填
 @bType button类型配置 ，默认ghost
 @iType icon类型配置 ，默认download
 @title 导出按钮标题， 默认为空
 @params 接口导出查询条件

 @example 默认情况配url和title即可，如果涉及到查询条件导出，需要配置params
 <DownLoader title='导出映射信息' url=‘/api-channelMapping.exportChannelMapping’ />
 */

export const DownLoader = (props) => {
  const {url, bType = 'ghost', iType = 'download', title = '', params, onClick, disabled} = props;
  let curUrl = url;

  if (!params)
    return <a href={disabled && curUrl ? "javascript:;" : curUrl}><Button type={bType} disabled={disabled} onClick={onClick}><Icon type={iType}/>{title}
    </Button></a>

  let mapParams = [];
  for (let key in params) {
    if (!params.hasOwnProperty(key)) continue;
    if (params[key] === null || params[key] === undefined) continue;

    var value = params[key];
    if (Array.isArray(value))
      mapParams.push(value.map(_id => key + '=' + _id).join('&'));
    else
      mapParams.push(key + '=' + value);
  }

  let urlParams = curUrl.indexOf('?') != -1 ? mapParams.join('&') : '?' + mapParams.join('&')
  curUrl += urlParams;
  return <a href={disabled && curUrl ? "javascript:;" : curUrl}><Button type={bType} disabled={disabled} onClick={onClick}><Icon type={iType}/>{title}
  </Button></a>
}

/**
 * 获取上传文件列表，转化成upload需要的格式
 * @param  {string|array} input
 * @param  {object} originFile 原始文件对象
 * @example
 *      {
            uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
            name: 'xx.png'   // 文件名
            status: 'done',  // 状态有：uploading done error removed
            url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',         // 图片链接
            thumbUrl : 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'    //点击图片显示链接
        }
 */
const getFileList = (input, originFile = {status: 'done'}) => {
  //删除时，图片为空数组
  if (null !== input && input && !input.length) {
    return '';
  }

  /**
   * 格式化上传数据
   * @param  {any} name
   * @param  {any} index
   * @param  {any} status
   */

const format = (name, index, status) => {
    return {
      uid: -index++,
      name,
      status,
      url: getImageUrl({name}),
      thumbUrl: getImageUrl({name})
    }
  }
  // 处理编辑模式下字符串的情况
  if (typeof input === 'string') {
    input = input.split(',')
    return input.map((f, index) => {
      return format(f, index, originFile.status)
    })
  }

  // 正常上传的情况
  return input && input.length > 0 && input.map((file, index) => {
      if (file && file.response && file.response.data && file.response.data.length > 0) {
        const data = file.response.data[0];
        const fileName = data ? data.fileName : '';
        return format(fileName, index, originFile.status)
      }
      return file
    })
}

/*
 UpLoader  导入文件
 @upConfig 导入配置项， 必填
 @bType button类型配置 ，默认ghost
 @iType icon类型配置 ，默认download
 @title 导入按钮标题， 默认为空

 @example 默认情况配upConfig的ation和title
 <UpLoader title='导入映射信息' upConfig={{action: '/api-channelMapping.importChannelMapping'}} />
 */
export const UpLoader = (props) => {
  const {upConfig = {}, onChange, ...other} = props;
  let {action, imgDomain, fileList, onlyFile = false,title = '上传图片'} = upConfig;
  const {bType = 'ghost', iType = 'upload', children, className = ''} = other;
  let uploadFormItem = '',newFileLists = '';

  if (imgDomain) upConfig.action = '/file' + action;
  if (typeof fileList === 'string') fileList = getFileList(fileList);

  let config = {
    showUploadList: false,
    action: '/',
    multiple: true,

    onChange(info) {
      if (info.file.status === 'error') message.error(info.file.name + ' 上传失败。');

      if (info.file.status !== 'done')
          return this.onChangeFileList(info.fileList,info);

      if(info.file.response.returncode){
        info.fileList.pop();
        message.error(info.file.name + info.file.response.message);
        this.onChangeFileList(info.fileList,info);
        return;
      }

      message.success(info.file.name + ' 上传成功。');
      if (onlyFile) info.fileList = info.fileList.slice(-1);
      newFileLists = getFileList(info.fileList, info);
      if (onlyFile) uploadFormItem = newFileLists[0]['name'];
      else uploadFormItem = newFileLists.map(f => f.name).join(',');
      
      this.onChangeFileList(uploadFormItem,info);
      return;
    },
    //判断上传文件类型
    beforeUpload: function (file) {
      const isFile = /\.(xls|xlsx)$/ig.test(file.name);
      const isOnly = onlyFile && fileList.length;
      if (!isFile) {
        message.error('只能上传 xls或xlsx 后缀文件！');
        if (isOnly) {
          message.warning('只能上传一个文件');
          return false;
        }
      }
      return isFile;
    }
  }
  const uploadConfig = {...config, ...upConfig};
  if(fileList)
    uploadConfig.fileList = fileList;
  else
    delete uploadConfig.fileList;

  return <div className={className}>
    <Upload {...uploadConfig} >
      {children ? children : uploadConfig.listType == 'picture-card' ? <div><Icon type="plus"/>
            <div className="ant-upload-text">{title}</div>
          </div> : <Button type={bType}><Icon type={iType}/>{title}</Button>}
    </Upload>
  </div>
}

// 枚举图片系统编码,业务类型全暂定base
const IMADOMAINPATH = {
  'product': 'product',
  'system': 'system'
};

export const UploadImage = (props) => {
  const {upConfig, ...other} = props;
  let {action, listType, beforeUpload, fileList, onlyFile = false} = upConfig;
  upConfig.listType = listType ? listType : 'picture';
  if (onlyFile) {
    upConfig.multiple = false;
  }
  upConfig.beforeUpload = beforeUpload ? beforeUpload : (file) => {
      const isFile = /\.(png)$/ig.test(file.name);
      if (!isFile) {
        message.error('只能上传 png 后缀图片文件！', 2);
        return isFile;
      }
      if (file.name.length > 30) {
        message.error('文件名称过长');
        return false;
      }
      if (file.size > 1000000) {
        message.error('只能上传 小于1M 图片文件！', 2);
        return false;
      }
      if (onlyFile && fileList.length) {
        message.error('只能上传一个文件');
        return false;
      }
    }
  return UpLoader({
    upConfig: {...upConfig},
    ...other
  });
}
UploadImage.getFileList = getFileList;
