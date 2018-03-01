import React, {Component, PropTypes} from 'react';
import classes from './style.less';
import {Row, Col, Button, Modal, Steps} from 'antd';
import {formatDate} from 'common/utils';
import ImageSlider from 'components/ImageSlider';
import '../../../../../static/jquery'
import '../../../../../static/jQuery.print'

import Image from 'components/Image';
import {IMG_URL} from '../../../../../static/apiAlias';

const TYPE = {
  '1': "免费维修",
  '2': "免费保养",
  '3': "退货",
  '4': "换货",
};
const CLIST = {'SFEXPRESS': "顺丰快递"}
const Step = Steps.Step;
class ServiceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否显示图片预览modal
      previewVisible: false,
      // 要预览的图片
      previewImages: [],
    }
  }
  toBack() {
    history.go(-1);
  }

  toPrint() {
    $("#print").print()
  }

  /**
   * 隐藏图片预览
   */
  cancelPreview = () => {
    this.setState({previewVisible: false});
  };

  /**
   * 点击图片时显示幻灯片
   * @param text
   */
  onClickImage(text) {
    let newImageArray = [];
    if (typeof(text) === 'string' || text instanceof String && text.length > 0) {
      newImageArray = text.split(',') && text.split(',').length&&text.split(',').map((k)=>{
          return {url: IMG_URL + k, alt: ''}
        })
    }
    // 如果没有图片, 点击就不要显示modal
    if (newImageArray.length > 0) {
      this.setState({previewVisible: true, previewImages: newImageArray});
    }
  }

  /**
   * 售后服务状态
   * @param d
   * @returns {*}
   */
  getMassge(d) {
    switch (d.afterSaleStatus) {
      case "0":
        return "您已取消申请"
        break;
      case "1":
        return "您的服务单已申请，请等待商家审核"
        break;
      case "2":
        return "您的服务单审核关闭"
        break;
      case "3":
        return "商家已审核通过，请将商品寄到指定地址，并填写快递信息"
        break;
      case "4":
        return "您寄回的快递单号为【" + d.accountExpressNo + "】，等待商家收货"
        break;
      case "5":
        return "已收到您的商品，即将开始受理"
        break;
      case "6":
        return "商家正在受理，请耐心等待发货"
        break;
      case "7":
        return "已收到商品,生成新的零元订单编号为：" + d.subOrderId
        break;
      case "8":
        return "服务单已完成，并为您创建新的订单（" + d.subOrderId + "），感谢您的支持与理解，祝生活愉快"
        break;
      case "9":
        return "订单金额已退回原支付方式，约1~10个工作日到账，请注意查收"
        break;
      case "10":
        return "服务单已完成，感谢您的支持与理解，祝生活愉快"
        break;
      case "11":
        return "您的商品已寄回【" + CLIST[d.companyExpressCompany] +"，"+ d.companyExpressNo + "】，请注意查收"
        break;
    }
  }

  render() {
    const context = this;
    let s = null;
    const {item} = context.props;
    if (!item) {
      return false
    }
    if (item && item.afterSaleStatus && item.afterSaleStatus.length) {
      /**
       * 服务单描述信息
       */
      s = item.afterSaleStatus.map((d) => {
        return ({
          title: '【' + d.createUserName + '】' + '，' + context.getMassge(d),
          description: formatDate(d.createTime,'yyyy-MM-dd HH:mm:ss')
        })
      }).reverse().map((s, i) => <Step key={i} title={s.title} icon="notification" description={s.description}/>);
    }
    return (
      <div>
      <div className={classes.infor}>
        <div id="print">
          <ul>
            <li>
              <span className={classes.detalTitle}>服务单号：</span>
              <span className="detalContent">
              {item.aftersaleId}
            </span>
            </li>
            <li>
              <span className={classes.detalTitle}>服务类型：</span>
              <span className="detalContent">
              {TYPE[item.aftersaleType]}
            </span>
            </li>
            <li>
              <span className={classes.detalTitle}>回寄地址：</span>
              <span className="detalContent">
              {item.addressInfo}
            </span>
            </li>
            <li>
              <span className={classes.detalTitle}>用户说明：</span>
              <span className="detalContent">
              {item.accountDesc}
            </span>
            </li>
          </ul>
          <div className={classes.iconImg}>
            {
              item.icon ? item.icon.split(',').map((c) => {
                return <Image src={c + '?x-oss-process=image/resize,h_80'} onClick={context.onClickImage.bind(context,c)} />
              }) : ''
            }
          </div>
          <Steps direction="vertical" current={1}>{s}</Steps>
        </div>
        <Button type="primary" onClick={context.toPrint.bind(context)}>打印</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type="ghost" onClick={context.toBack.bind(context)}>返回</Button>
      </div>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}
ServiceDetail.propTypes = {}

export default ServiceDetail;








