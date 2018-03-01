import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Image from 'components/Image';
import ImageSlider from 'components/ImageSlider';
import {IMG_URL} from '../../../../../static/apiAlias';

import {DownLoader} from 'components/FileLoader';

import {formatDate} from 'common/utils';
import Search from 'components/Search';

import {Row, Col, Modal, Icon, DatePicker, Popconfirm} from 'antd';
//状态
const STATUS = {
  '0': "未读",
  '2': "重要",
};

const PLAT = {
  'android': "android",
  'iOS': "iOS",
};
class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否显示图片预览modal
      previewVisible: false,
      // 要预览的图片
      previewImages: [],
    }
  }
  del(id, row) {
    const {toDel} = this.props;
    toDel(id, row)
    this.refs && this.refs.dt.refresh();
  }

  reUpdate(key, row) {
    const {toUpdate} = this.props;
    toUpdate(key, row)
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
    const {params} = this.props;
    let config = {
      formItems: [{
        label: "账号：",
        name: "userName",
        span: "6",
        labelCol: {span: 4},
        input: {}
      }, {
        label: "版本号：",
        name: "appVersion",
        span: "6",
        input: {}
      }, {
        label: "平台：",
        name: "appPlat",
        span: "6",
        select: {
          tipValue: "全部",
          optionValue: Object.keys(PLAT).map((key) => {
            return {'value': key, 'title': PLAT[key]}
          })
        }
      }, {
        label: "状态：",
        name: "status",
        span: "6",
        select: {
          tipValue: "全部",
          optionValue: Object.keys(STATUS).map((key) => {
            return {'value': key, 'title': STATUS[key]}
          })
        }
      }, {
        label: "反馈时间：",
        span: '12',
        labelCol: {span: 3},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div><DatePicker {...getCustomFieldProps('startTime')}/>
            <p className="ant-form-split">~</p>
            <DatePicker {...getCustomFieldProps('endTime')}/>
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
      initValue: params
    }
    return config;
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '标记',
      dataIndex: 'status',
      width: '50px',
      render(key, row){
        switch (key) {
          case '0':
            return <span onClick={context.reUpdate.bind(context, key, row)} style={{fontSize: '24px', cursor: 'pointer'}}><Icon type="tags"/></span>
          case '1':
            return <span onClick={context.reUpdate.bind(context, key, row)} style={{fontSize: '24px', cursor: 'pointer'}}><Icon type="tags"/></span>
          case '2':
            return <span onClick={context.reUpdate.bind(context, key, row)} style={{color: '#ff6e00', fontSize: '24px', cursor: 'pointer'}}><Icon
              type="tags"/></span>
        }
      }
    }, {
      key: '1',
      title: '用户账号',
      dataIndex: 'userName',
      render(key, row){
        return <span>
          {
            row.userName != null ?
              <Link to={`/users/infor/${row.userId}`} style={{fontWeight: row.status == '0' ? 'bold' : ''}}>{key}</Link> : '无'
          }
          </span>
      }
    }, {
      key: '2',
      title: '反馈内容',
      dataIndex: 'content',
      width: '300px',
      render(key, row){
        return <span onClick={context.reUpdate.bind(context, key, row)}
                     style={{fontWeight: row.status == '0' ? 'bold' : '', cursor: 'pointer'}}>{key}</span>;
      }
    }, {
      key: '3',
      title: '异常截图',
      dataIndex: 'icon',
      width: '286px',
      render(key){
        return <div>
          {
            <Image src={key && key.split(',') && key.split(',').length && key.split(',')[0]+'?x-oss-process=image/resize,h_80'}
                   onClick={context.onClickImage.bind(context,key)}/>
          }
        </div>
      }
    }, {
      key: '4',
      title: '反馈时间',
      dataIndex: 'createTime',
      render(key, row){
        return <span style={{fontWeight: row.status == '0' ? 'bold' : ''}}>{formatDate(key, 'yyyy-MM-dd HH:mm:ss')}</span>;
      }
    }, {
      key: '5',
      title: '终端机型',
      dataIndex: 'terminalType',
      render(key, row){
        return <span style={{fontWeight: row.status == '0' ? 'bold' : ''}}>{key}</span>;
      }
    }, {
      key: '6',
      title: '操作系统',
      dataIndex: 'terminalOs',
      render(key, row){
        return <span style={{fontWeight: row.status == '0' ? 'bold' : ''}}>{key}</span>;
      }
    }, {
      key: '7',
      title: '版本号',
      dataIndex: 'appVersion',
      render(key, row){
        return <span style={{fontWeight: row.status == '0' ? 'bold' : ''}}>{key}</span>;
      }
    }, {
      title: '操作',
      dataIndex: 'feedbackId',
      width: '50px',
      render(id, row){
        return <span style={{fontWeight: row.status == '0' ? 'bold' : ''}}>
          <Popconfirm title="删除后不可恢复，确认该装饰么？" onConfirm={context.del.bind(context, id, row)}>
            <a href="javascript:;">删除</a>
          </Popconfirm>
        </span>
      }
    }];
    return columns;
  }

  quickButton() {
    const {params} = this.props;
    return <Row>
      <Col span='2'>
        <DownLoader url='/users/common/feedback/export' params={params} title='导出Excel'/>
      </Col>
    </Row>
  }

  render() {
    const {formOptions, ...other} = this.props;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>
        <DataTable bordered={false} columns={this._getColumns()} quickButton={this.quickButton()} {...other} ref='dt'/>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.cancelPreview}>
          <ImageSlider items={this.state.previewImages}/>
        </Modal>
      </div>
    )
  }
}

Feedback.propTypes = {

}

export default Feedback;
