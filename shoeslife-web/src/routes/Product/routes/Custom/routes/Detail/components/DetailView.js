import React, {Component, PropTypes} from 'react';
import {Row, Col, Button, Icon, Table} from 'antd';
import classes from './style.less';
import Image from 'components/Image';
class Detail extends Component {

  render() {
    const context = this;
    const {item} = context.props;
    /**
     * 鞋跟款式
     * @type {[*]}
     */
    const H = [{
      title: '可变区域',
      dataIndex: 'modeName',
      width: '33%'
    }, {
      title: '材料名称',
      dataIndex: 'materialName',
      render(key, row) {
        return <span>{key}/{row.materialColor}</span>;
      }
    }, {
      title: '材料编号',
      dataIndex: 'materialIdentifier',
      width: '33%'
    }];
    /**
     * 鞋面款式
     * @type {[*]}
     */
    const U = [{
      title: '可变区域',
      dataIndex: 'modeName',
      width: '33%'
    }, {
      title: '材料名称',
      dataIndex: 'materialName',
      render(key, row) {
        return <span>{key}/{row.materialColor}</span>;
      }
    }, {
      title: '材料编号',
      dataIndex: 'materialIdentifier',
      width: '33%'
    }];
    if (!item) {
      return false
    }
    return (
      <div className={classes.infor}>
        <Row>
          <Col span="14">
            <dl>
              <dt>基本信息</dt>
              <dd>原鞋款信息：{item.shoeName }（{item.shoeCode}）</dd>
            </dl>
            {
              <div>
                <dl>
                  <dt>鞋面款式：{item.upperName + ' / ' + item.upperCode}</dt>
                  <dd style={{padding: '15px 0'}}>
                    {
                      <Table rowKey={record => record.modeId} columns={U}
                             dataSource={
                               item.list.filter((u) => {
                                 return u.styleType == 2;
                               })
                             } pagination={false}/>
                    }
                  </dd>
                </dl>
                <p style={{color: '#F00', margin: '15px 15px 50px 15px', fontWeight: 'bold'}}>备注：车线配面色</p>
              </div>
            }
            {
              <div>
                <dl>
                  <dt>鞋跟款式：{item.heelName + ' / ' + item.heelCode}</dt>
                  <dd style={{padding: '15px 0'}}>
                    {
                      <Table rowKey={record => record.modeId} columns={U}
                             dataSource={
                               item.list.filter((f) => {
                                 return f.styleType == 1;
                               })
                             } pagination={false}/>
                    }
                  </dd>
                </dl>
              </div>
            }
          </Col>
          <Col span="10">
            <div style={{position: 'fixed', top: '35%', right: '10%'}}>
              {
                item.image ? <Image src={item.image + '?x-oss-process=image/resize,m_fixed,h_350,w_350'}/> : '暂无图片'
              }
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

Detail.propTypes = {

}

export default Detail;
