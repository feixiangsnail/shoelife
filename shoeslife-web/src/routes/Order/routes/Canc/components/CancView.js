import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Row, Col, Button, Icon} from 'antd';

import DataTable from 'components/DataTable';
import {DownLoader} from 'components/FileLoader';
import {formatDate} from 'common/utils';
class Canc extends Component {

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '订单编号',
      dataIndex: 'orderId',
      render(id, row){
        return <Link to={`/order/orderDetail/${id}`}>{id}</Link>;
      }
    }, {
      key: '1',
      title: '取消原因',
      dataIndex: 'reason'
    }, {
      key: '2',
      title: '取消时间',
      dataIndex: 'cancelTime',
      render(key, row){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }

    }, {
      key: '3',
      title: '下单时间',
      dataIndex: 'orderTime',
      render(key, row){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }];
    return columns;
  }

  quickButton() {
    return <div style={{textAlign: 'right'}}>
      <DownLoader url='/order/common/ordercancel/export' title='导出Excel'/>
    </div>
  }

  render() {
    const {...tableOptions} = this.props;
    return (
      <div>
        <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton()} {...tableOptions} />
      </div>
    )
  }
}


Canc.propTypes = {

}


export default Canc;
