import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import {DownLoader} from 'components/FileLoader';
import Search from 'components/Search';
import {getScreen} from 'common/utils';
import Image from 'components/Image';
import ImageSlider from 'components/ImageSlider';
import {formatDate} from 'common/utils';
import {H5_URL, IMG_URL} from 'static/apiAlias';
import {Row, Col, Button,Modal,message,Icon} from 'antd';
const confirm = Modal.confirm;
class ShoeRelatedView extends Component {
  constructor(props) {
    super(props);
    this.vampConfirm = this.vampConfirm.bind(this);
    this.withConfirm = this.withConfirm.bind(this);
    this.state = {
      // 是否显示图片预览modal
      previewVisible: false,
      // 要预览的图片
      previewImages: [],
    }
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
    const {downParams} = this.props;
    let config = {
      formItems: [{
        label: "款式编号：",
        name: "shoeCode",
        span: "6",
        labelCol: {span: 6},
        input: {
          placeholder: '名称或编号'
        }
      },{
        label: "楦头编号：",
        name: "shoeLastIdCode",
        span: "6",
        labelCol: {span: 6},
        input: {
          placeholder: '名称或编号'
        }
      }],
      initValue: downParams
    }
    return config;
  }
  _getColumns() {
    const context = this;
    let columns = [
      {
      key: '1',
      title: '鞋款宣传图',
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
      title: '款式编号',
      dataIndex: 'shoeCode'
    },
    {
      key: '3',
      title: '鞋款名称',
      dataIndex: 'shoeName',
      render(key, row){
        let toUrl = H5_URL + 'h5/#/shoes/' + row.shoeId+'?star='+'preview';;
        return <a href={toUrl} target="_blank">{key}</a>
      }
    }, {
      key: '4',
      title: '楦头编号',
      dataIndex: 'shoeLastIdCode'
    }, {
      key: '5',
      title: '关联跟高',
      dataIndex: 'heel',
      render(key, row){
        if(!key) return ;
        return (<div>
            {
              key.map((vals,key)=>{
                return (
                  <div key={key}>
                    {
                      vals.shoeCode
                    }
                    <Icon onClick={context.onCross.bind(context,1,vals.shoeId)} type="cross" />
                  </div>
                )
              })
            }
          </div>)
      }
    },{
      key: '6',
      title: '关联鞋面款',
      dataIndex: 'upper',
      render(key, row){
        if(!key) return ;
        return (<div>
            {
              key.map((vals,key)=>{
                return (
                  <div key={key}>
                    {
                      vals.shoeCode
                    }
                    <Icon onClick={context.onCross.bind(context,2,vals.shoeId)} type="cross" />
                  </div>
                )
              })
            }
          </div>)
      }
    },
    {
      key: '7',
      title: '最新上架时间',
      dataIndex: 'lastOnlineTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }];
    return columns;
  }
  vampConfirm() {
    const {onBound} = this.props;
    confirm({
      title: '关联鞋面',
      content: '关联后，客户端个性设计页“鞋面款式”选择将增加关联款式的选项，确认关联鞋面款式吗？',
      onOk() {
        onBound(2);
      }
    });
  }
  withConfirm(){
    const {onBound} = this.props;
    confirm({
      title: '关联高度',
      content: '关联后，客户端个性设计页“鞋跟高度”选择将增加关联款式的选项，确认关联鞋跟高度吗？',
      onOk() {
        onBound(1);
      }
    });
  }
  onCross(type,id){
    const {unBound} = this.props;
    unBound(type,id);
  }
  render() {
    const {formOptions,list,selectList, ...other} = this.props;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit}  onReset={formOptions.handleReset}/>
        <DataTable bordered={false} columns={this._getColumns()} {...other} />
        <br />
        <Row className={list.length?'show':'hide'}>
          <Col span="16"></Col>
          <Col span="2">
            <Button type="primary" disabled={selectList.length?'':'disabled'} onClick={this.withConfirm} >
              关联鞋跟高度
            </Button>
          </Col>
          <Col span="2">
            <Button type="primary" disabled={selectList.length?'':'disabled'} onClick={this.vampConfirm}>
              关联鞋面款式
            </Button>
          </Col>
        </Row>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}

ShoeRelatedView.propTypes = {

  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default ShoeRelatedView;
