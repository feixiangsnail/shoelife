import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Image from 'components/Image';
import ImageSlider from 'components/ImageSlider';
import {IMG_URL} from '../../../../../static/apiAlias';
import {Row, Col, Button, Icon, Modal} from 'antd';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否显示图片预览modal
      previewVisible: false,
      // 要预览的图片
      previewImages: [],
    }
  }
  del(id) {
    const {toDel} = this.props;
    toDel(id)
    this.refs && this.refs.dt.refresh();
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

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: 'LOGO',
      dataIndex: 'log',
      render(key){
        return key ? <Image src={key+'?x-oss-process=image/resize,h_80'} onClick={context.onClickImage.bind(context,key)}/> : '暂无图片'
      }
    }, {
      key: '1',
      title: '品牌名称',
      dataIndex: 'brandName',
      width: '200px'
    }, {
      key: '2',
      title: '品牌简介',
      dataIndex: 'introduction'
    }, {
      title: '操作',
      dataIndex: 'brandId',
      width: '150px',
      render(id, row){
        return <span>
          <a onClick={context.del.bind(context, id, row)} href="javascript:;">删除 / </a>
          <Link to={`/brand/list/edit/${id}`}>编辑 / </Link>
          <Link to={`/brand/list/shoe/${row.brandId}`}>鞋款管理</Link>
        </span>
      }
    }];
    return columns;
  }

  quickButton() {
    return <Row>
      <Col span='2'>
        <Button type="ghost">
          <Link to={`/brand/list/edit`}>
            <Icon type="plus"/> 添加品牌
          </Link>
        </Button>
      </Col>
    </Row>
  }

  render() {
    const {tableOptions, dataSource} = this.props;

    return (
      <div>
        <DataTable bordered={false} dataSource={dataSource} columns={this._getColumns()} quickButton={this.quickButton()} {...tableOptions} ref='dt'/>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}


List.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default List;
