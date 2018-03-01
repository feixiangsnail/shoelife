import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import Image from 'components/Image';
import ImageSlider from 'components/ImageSlider';
import {Modal} from 'antd';
import {H5_URL, IMG_URL} from '../../../../../static/apiAlias';
import {formatDate} from 'common/utils';
class Record extends Component {
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
      title: '头像',
      dataIndex: 'photo',
      render(key){
        return key ? <Image src={key + '?x-oss-process=image/resize,h_80'} onClick={context.onClickImage.bind(context, key)}/> : '暂无图片'
      }
    }, {
      key: '1',
      title: '昵称',
      dataIndex: 'adminName',
      render(key, row){
        let toUrl = H5_URL + 'h5/#/designer/' + row.id;
        let tName = key;
        return <span><a href={toUrl} target="_blank">{tName}</a>{row.status != 0 ? '（已禁用）' : ''}</span>
      }
    }, {
      key: '2',
      title: '修改时间',
      dataIndex: 'modifyTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      title: '操作',
      dataIndex: 'adminId',
      render(id, row){
        return <span><Link to={`/designer/record/edit/${row.id}`}>编辑</Link></span>
      }
    }];
    return columns;
  }

  render() {
    const {...tableOptions} = this.props;
    return (
      <div>
        <DataTable bordered={false} columns={this._getColumns()}  {...tableOptions} />
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}

Record.propTypes = {}

export default Record;
