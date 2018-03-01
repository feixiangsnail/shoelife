import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import Search from 'components/Search';
import Image from 'components/Image';

import {formatDate} from 'common/utils';
import {Row, Col, Button, Icon, Popconfirm, DatePicker} from 'antd';

import {H5_URL} from '../../../../../../../static/apiAlias';
//状态
const STATUS = {
  'UNPUBLISHED': "未发布",
  'OFFLINE': "下架",
  'ONLINE': "上架"
};


class Shoe extends Component {
  /**
   * 近7天、近30天
   * @param t
   */
  recentTime(t) {
    const {recent} = this.props;
    recent(t)
  }

  _getFormItems() {
    const context = this;
    const {cateList, sList, dList}=context.props;
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
          options: cateList,
          placeholder: "请选择分类",
          changeOnSelect: true
        }
      }, {
        label: "设计师：",
        name: "designerId",
        span: "6",
        labelCol: {span: 6},
        select: {
          tipValue: "全部",
          optionValue: dList
        }
      }, {
        label: "设计风格：",
        name: "styleCategory",
        span: "6",
        labelCol: {span: 7},
        select: {
          tipValue: "全部",
          optionValue: sList
        }
      }, {
        label: "状态：",
        name: "status",
        span: "6",
        labelCol: {span: 7},
        select: {
          tipValue: "全部",
          optionValue: Object.keys(STATUS).map((key) => {
            return {'value': key, 'title': STATUS[key]}
          })
        }
      }, {
        label: "上架日期：",
        span: '11',
        labelCol: {span: 3},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div><DatePicker {...getCustomFieldProps('onlineStart')}/>
            <p className="ant-form-split">~</p>
            <DatePicker {...getCustomFieldProps('onlineEnd')}/>
          </div>
        }
      }, {
        label: "",
        span: "3",
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div>
            <a href="javascript:;" style={{fontSize:'14'}} onClick={context.recentTime.bind(context,604800000)}>近7天</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="javascript:;" onClick={context.recentTime.bind(context,2592000000)}>近30天</a>
          </div>
        }
      }],
      initValue: {
        shoeCode: null,
        designCategory: null,
        designerId: null,
        styleCategory: null,
        status: null,
        onlineStart: null,
        onlineEnd: null


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
                <Image src={i+'?x-oss-process=image/resize,h_80'}/>
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
      render(id, row){
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
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }];
    return columns;
  }

  render() {
    const {getFormOptions, tableOptions, ...other} = this.props;

    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={getFormOptions().handleSubmit} onReset={getFormOptions().handleReset}/>
        <DataTable bordered={false} columns={this._getColumns()} {...tableOptions} ref='dt'/>
      </div>
    )
  }
}

Shoe.propTypes = {
  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Shoe;
