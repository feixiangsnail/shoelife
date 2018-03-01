import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import Search from 'components/Search';
import Image from 'components/Image';
import ImageSlider from 'components/ImageSlider';
import {H5_URL, IMG_URL} from 'static/apiAlias';
import {formatDate} from 'common/utils';
import {Row, Col, Modal, Icon, Popconfirm, DatePicker} from 'antd';
//状态
const STATUS = {
  'UNPUBLISHED': "未发布",
  'UPLOADED':"已上传OBJ未发布",
  'OFFLINE': "下架",
  'ONLINE': "上架"
};
class ShoeStyle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否显示图片预览modal
      previewVisible: false,
      // 要预览的图片
      previewImages: [],
    }
  }
  /**
   * 发布之后才能上架，上架才能下架，下架也能重新上架
   * @param UNPUBLISHED
   * @param ONLINE
   * @param OFFLINE
   */
  release(row, id) {
    const {toRelease} = this.props;
    toRelease(row, id);
  }

  /**
   * 未发布的才能删除
   * @param UNPUBLISHED
   * @param ONLINE
   * @param OFFLINE
   */
  del(id) {
    const {toDel} = this.props;
    toDel(id)
    this.refs && this.refs.dt.refresh();
  }

  /**
   * 近7天、近30天
   * @param t
   */
  recentTime(t) {
    const {recent} = this.props;
    recent(t)
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

  _getFormItems() {
    const context = this;
    const {cateList, sList, dList,params}=context.props;
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
        name: "newDesignCategory",
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
            <a href="javascript:;" onClick={context.recentTime.bind(context,604800000)}>近7天</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="javascript:;" onClick={context.recentTime.bind(context,2592000000)}>近30天</a>
          </div>
        }
      }],
      initValue: params
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
            <Image src={key && key.split(',') && key.split(',').length && key.split(',')[0]+'?x-oss-process=image/resize,h_80'}
                   onClick={context.onClickImage.bind(context,key)}/>
          }
        </div>
      }
    }, {
      key: '2',
      title: '鞋款名称',
      dataIndex: 'shoeName',
      render(key, row){
        let toUrl = H5_URL + 'h5/#/shoes/' + row.shoeId+'?star='+'preview';
        return <a href={toUrl} target="_blank">{key}</a>
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
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      title: '操作',
      dataIndex: 'shoeId',
      render(id, row){
        let styleUrl = ['/product/shoeNew/file/'+id+'/'+row.status].join(' ');
        if(row.status=='UPLOADED'||row.status=='OFFLINE')
          styleUrl += '/Parts';
        return <span>
          {
            row.status == 'UNPUBLISHED'||row.status == 'UPLOADED'  ?
              <Popconfirm title="发布后将立即上架，请确保可按期生产及发货。" onConfirm={context.release.bind(context, id, row)}><a
                href="javascript:;">发布</a></Popconfirm> : ''
          }
          {
            row.status == 'OFFLINE' ?(
              <span>
                <Popconfirm title="上架后，此鞋款可接受用户定制，请确保可按期生产及发货。" onConfirm={context.release.bind(context, id, row)}>
                  <a href="javascript:;">上架</a>
                </Popconfirm>
              </span>
                )
                : ''
          }
          {
            row.status == 'ONLINE' ?(
                <Popconfirm title="下架后，APP相关页面将不再显示此鞋款。" onConfirm={context.release.bind(context, id, row)}>
                  <a href="javascript:;">下架</a>
                </Popconfirm>
                )
                : ''
          }
          {
            row.status == 'UNPUBLISHED'||row.status == 'UPLOADED' ||row.status =='OFFLINE' ?(
              <Link to={`/product/shoeNew/editNew/${id}`}> / 基本信息 / </Link>)
            : ''
          }
          {
            row.status == 'UNPUBLISHED'||row.status == 'UPLOADED' ||row.status =='OFFLINE' ?
                <Link to={styleUrl}>款式管理</Link>: ''
          }
          {
            row.status == 'UNPUBLISHED'||row.status == 'UPLOADED' ?
              <Popconfirm title="是否删除该款式？" onConfirm={context.del.bind(context, id, row)}><a href="javascript:;"> / 删除</a></Popconfirm> : ''
          }
        </span>
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
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}

ShoeStyle.propTypes = {

}

export default ShoeStyle;
