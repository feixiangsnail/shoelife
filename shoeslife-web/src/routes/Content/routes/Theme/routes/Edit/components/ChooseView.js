import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import Search from 'components/Search';
import Image from 'components/Image';
import {H5_URL} from '../../../../../../../static/apiAlias';
import {formatDate} from 'common/utils';
import {Row, Col, Button, Icon, Popconfirm} from 'antd';

//状态
const STATUS = {
  'UNPUBLISHED': "未发布",
  'OFFLINE': "下架",
  'ONLINE': "上架"
};
class ShoeStyle extends Component {
  _getFormItems() {
    const context = this;
    const {shoeList}=context.props;
    let config = {
      formItems: [{
        label: "商品编号：",
        name: "shoeCode",
        span: "6",
        labelCol: {span: 7},
        input: {
          placeholder: "请输入商品编号"
        }
      }, {
        label: "分类：",
        name: "designCategory",
        span: "6",
        labelCol: {span: 6},
        wrapperCol: {span: 17},
        cascader: {
          options: shoeList,
          placeholder: "请选择分类",
          changeOnSelect: true
        }
      }],
      initValue: {
        shoeCode: null,
        designCategory: null
      }
    }
    return config;
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '编号',
      dataIndex: 'shoeCode'
    }, {
      key: '1',
      title: '宣传图',
      dataIndex: 'coverPhoto',
      render(key){
        return <div>
          {
            key && key.split(',') && key.split(',').length && key.split(',').map((i) => {
              return <span style={{marginRight:'10px'}}>
                <Image src={i+'?x-oss-process=image/resize,h_80'} />
              </span>
            })
          }
        </div>
      }
    }, {
      key: '2',
      title: '鞋款名称',
      dataIndex: 'shoeName',
      render(key, row){
        let toUrl = H5_URL + 'h5/shoes.html?id=' + row.shoeId;
        let tName = key;
        return <a href={toUrl} target="_blank">{tName}</a>
      }
    }, {
      key: '3',
      title: '分类',
      dataIndex: 'designCategoryName'
    }, {
      key: '4',
      title: '设计师',
      dataIndex: 'designer'
    }, {
      key: '5',
      title: '价格（元）',
      dataIndex: 'price',
      render(key, row){
        return <span>
          {
            row.status == 'ONLINE' ? row.bottomPrice + '-' + row.topPrice : ''
          }
        </span>
      }
    }, {
      key: '6',
      title: '状态',
      dataIndex: 'status',
      render(key){
        return <span>{STATUS[key]}</span>;
      }
    }, {
      key: '7',
      title: '最新上架时间',
      dataIndex: 'lastOnlineTime',
      render(key){
        return formatDate(key,'yyyy-MM-dd HH:mm:ss')
      }
    }];
    return columns;
  }

  render() {
    const {chooseTableOptions, chooseFormOption,selectList} = this.props;
    const {handleSubmit, handleReset} = chooseFormOption();
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={handleSubmit} onReset={handleReset}/>
        <DataTable bordered={true} columns={this._getColumns()} {...chooseTableOptions} />
        <div style={{textAlign: 'right', 'fontSize': '14px',marginTop: '20px'}}>已关联 {selectList?selectList.length:'0'} 款鞋</div>
      </div>
    )
  }
}


ShoeStyle.propTypes = {}


export default ShoeStyle;
