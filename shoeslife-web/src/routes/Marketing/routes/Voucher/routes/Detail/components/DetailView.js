import React, {Component, PropTypes} from 'react';
import classes from './style.less';
import {Row, Col, Button, Icon, Collapse} from 'antd';
import {formatDate} from 'common/utils';
import {Link} from 'react-router';
//发放形式
const TYPE = {
  '1': "活动发放",
  '2': "指定账号",
  '3': "新用户",
};
const Panel = Collapse.Panel;
class Detail extends Component {
  render() {
    const context = this;
    const {item, params} = context.props;
    if (!item) {
      return false
    }
    return (
      <div className={classes.voucherInfor}>
        <dl>
          <dt>基本信息</dt>
          <dd className="clearfix">
            <span className={classes.left}>代金券ID：</span>
            <span className={classes.right}>{item.voucherId}</span>
          </dd>
          <dd className="clearfix">
            <span className={classes.left}>面额（元）：</span>
            <span className={classes.right}>{item.denomination}</span>
          </dd>
          <dd className="clearfix">
            <span className={classes.left}>发放形式：</span>
            <span className={classes.right}>{TYPE[item.type]}</span>
          </dd>
          <dd className="clearfix">
            <span className={classes.left}>
              {item.type == 1 ? '兑换码：' : item.type == 2 ? '发放账号：' : ''}
            </span>
            <span className={classes.right}>
              {
                item.type == 1 && item.conversionCode ? item.conversionCode :
                  item.type == 2 ? <Collapse defaultActiveKey={['1']} style={{width: '20%'}}>
                    <Panel header="展开/收起" key="1">
                      {
                        item.accounts.match(/\d{11}/g) && item.accounts.match(/\d{11}/g).map((i) => {
                          return <p style={{lineHeight: '2'}}>{i}</p>
                        })
                      }
                    </Panel>
                  </Collapse> : ''
              }
              </span>
          </dd>
          <dd className="clearfix">
            <span className={classes.left}>发放数量：</span>
            <span className={classes.right}>{item.totalQuantity || '0'} 份</span>
          </dd>
          <dd className="clearfix">
            <span className={classes.left}>领取时间段：</span>
            <span
              className={classes.right}>{formatDate(item.sendStartTime, 'yyyy-MM-dd HH:mm:ss') + ' ~ ' + formatDate(item.sendEndTime, 'yyyy-MM-dd HH:mm:ss')}</span>
          </dd>
          <dd className="clearfix">
            <span className={classes.left}>使用有效期：</span>
            <span className={classes.right}>
              {item.expireDate ? item.expireDate + '天以内' : formatDate(item.useStartTime, 'yyyy-MM-dd HH:mm:ss') + '~' + formatDate(item.useEndTime, 'yyyy-MM-dd HH:mm:ss')}
              </span>
          </dd>
          <dd className="clearfix">
            <span className={classes.left}>使用说明：</span>
            <span className={classes.right}
                  dangerouslySetInnerHTML={{__html: item.instructions.replace(/\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029)/g, "<br>")}}></span>
          </dd>

        </dl>
        <dl>
          <dt>领用概述</dt>
          <dd className={classes.contents}>
            <ul>
              <li><span style={{color: '', fontWeight: 'bold', fontSize: '16px'}}>{item.seedQuantity || '0'}</span> 位用户领取或兑换</li>
              <li><span style={{color: '#f00', fontWeight: 'bold', fontSize: '16px'}}>{item.usedQuantity || '0'}</span> 位用户已抵用消费</li>
              <li>共计减免 {item.denomination * item.usedQuantity} 元（面额 x 已使用的数量）</li>
            </ul>
          </dd>
        </dl>
        <Button type="primary">
          <Link to={`/market/voucher/vList/${params.id}`}>查看领用详情</Link>
        </Button>
      </div>
    )
  }
}

Detail.propTypes = {}

export default Detail;
