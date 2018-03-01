import React, {Component, PropTypes} from 'react';
import classes from './style.less';
import {Row, Col, Button, Icon} from 'antd';
import {formatDate} from 'common/utils';
import Image from 'components/Image';
const GENDER = {
  '0': "男",
  '1': "女",
};
class Infor extends Component {
  toBack() {
    history.go(-1);
  }

  render() {
    const context = this;
    const {item, params} = context.props;
    if (!item) {
      return false
    }
    return (
      <div className={classes.infor}>
        <div className={classes.photo}>
          {
            item.photo ? (params.wx ? (item.photo.indexOf('http') == '-1' ? <Image src={item.photo} width='114' height='114'/> : <img src={item.photo} width='114' height='114'/>) :
                <Image src={item.photo} width='114' height='114'/>)
              : '暂无图片'
          }
        </div>
        <dl>
          <dt>基本信息</dt>
          <dd className="clearfix">
            <span className={classes.left}>昵称：</span>
            <span className={classes.right}>{item.userName}</span>
          </dd>
          <dd className="clearfix">
            <span className={classes.left}>性别：</span>
            <span className={classes.right}>{GENDER[item.gender]}</span>
          </dd>
          <dd className="clearfix">
            <span className={classes.left}>手机号码：</span>
            <span className={classes.right}>{item.mobile}</span>
          </dd>
          <dd className="clearfix">
            <span className={classes.left}>注册时间：</span>
            <span className={classes.right}>{formatDate(item.createtime, 'yyyy-MM-dd HH:mm:ss')}</span>
          </dd>
          <dd className="clearfix">
            <span className={classes.left}>出生日期：</span>
            <span className={classes.right}>{formatDate(item.birthday, 'yyyy-MM-dd HH:mm:ss')}</span>
          </dd>
          <dd className="clearfix">
            <span className={classes.left}>鞋码(mm)：</span>
            <span className={classes.right}>{item.shoeCardMessage}</span>
          </dd>
          <dd className="clearfix">
            <span className={classes.left}>关注数：</span>
            <span className={classes.right}>{item.flowNum}</span>
          </dd>
          <dd className="clearfix">
            <span className={classes.left}>粉丝数：</span>
            <span className={classes.right}>{item.fans}</span>
          </dd>
        </dl>
        <dl>
          <dt>用户介绍</dt>
          <dd className={classes.contents}>
            {item.profile ? item.profile : '~~~'}
          </dd>
        </dl>
        <Button type="ghost" size="large" onClick={context.toBack.bind(context)}>返回</Button>
      </div>
    )
  }
}

Infor.propTypes = {}

export default Infor;
