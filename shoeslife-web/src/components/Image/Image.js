import React, {Component, PropTypes} from 'react';
import store from 'store2';
import {IMG_URL} from '../../static/apiAlias'

const getImageUrl = (props) => {
  const {name} = props;
  const isFile = /\.(apk)$/ig.test(name);
  const isMp4 = /\.(mp4)$/ig.test(name);
  let url = null;
  if (isFile) {
    url = IMG_URL + 'www/android.jpg'
  }else if (isMp4){
    url = IMG_URL + 'www/mp4.jpg'
  }else {
    url = IMG_URL + name
  }
  return url;
}

const defaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=";

const Image = (props) => {
  let {src, absoluteUrl = true, linked, ...other} = props;

  if (!src) {
    return <span>暂无图片</span>
  }
  if (absoluteUrl) {
    src = getImageUrl({name: src, ...other})
  }
  // 错误图片
  const img = <img {...props} src={src} onError={(e)=> {
    e.target.src = defaultImage
  }}/>

  const fullUrl = src.replace(/!(\d+)x(\d+)/gi, '');

  return linked ? <a href={fullUrl} target="_blank">{img}</a> : img;
};


Image.getImageUrl = getImageUrl;


export default  Image;
