import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ChooseView from './ChooseView'
import {Button, Icon, Modal, Table, message} from 'antd';

import {UploadImage} from 'components/FileLoader';
import Form from 'components/Form';
import Image from 'components/Image';

import {formatDate} from 'common/utils';
import {FILE_UPLOAD, H5_URL} from '../../../../../../../static/apiAlias'

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  showModal() {
    const context = this;
    const {isGet} = context.props;
    context.setState({
      visible: true
    });
    isGet()
  }

  handleOk() {
    const context = this;
    let {isOK, selectList} = context.props;
    context.setState({
      visible: false
    });
    isOK(selectList);
  }

  handleCancel() {
    this.setState({
      visible: false
    });
  }

  del(id) {
    const {tabDataSource, toDel} = this.props;
    let filterTabs = tabDataSource.filter((tab) => {
      return tab.shoeId !== id
    })
    toDel(filterTabs)
  }

  _getFormItems() {
    const context = this;
    const {item, iconImg, iconList, tabDataSource} = context.props;
    let upConfig = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: true,
      action: FILE_UPLOAD,
      data: {
        model: 'product/theme'
      },
      beforeUpload(file) {
        const isFile = /\.(jpg|png)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传 jpg、png 后缀图片！', 2);
          return isFile;
        }
        if (file.size > 150 * 1024) {
          message.error('只能上传 150KB 以内的图片！', 2);
          return false
        }
      }
    };
    let columns = [{
      key: '0',
      title: '宣传图',
      dataIndex: 'coverPhoto',
      render(key){
        return <div>
          {
            key && key.split(',') && key.split(',').length && key.split(',').map((i) => {
              return <span style={{marginRight: '10px'}}>
                <Image src={i + '?x-oss-process=image/resize,h_80'}/>
              </span>
            })
          }
        </div>
      }
    }, {
      key: '1',
      title: '鞋款编号',
      dataIndex: 'shoeCode'
    }, {
      key: '2',
      title: '款式名称',
      dataIndex: 'shoeName',
      render(key, row){
        let toUrl = H5_URL + 'h5/shoes.html?id=' + row.shoeId;
        let tName = key;
        return <a href={toUrl} target="_blank">{tName}</a>
      }
    }, {
      key: '3',
      title: '设计师',
      dataIndex: 'designer'
    }, {
      key: '4',
      title: '最新上架时间',
      dataIndex: 'lastOnlineTime',
      render(key){
        return formatDate(key, 'yyyy-MM-dd HH:mm:ss')
      }
    }, {
      title: '操作',
      dataIndex: 'shoeId',
      render(id, row){
        return <span>
          <a onClick={context.del.bind(context, id, row)} href="javascript:;">删除</a>
        </span>
      }
    }];
    let config = {
      formItems: [{
        label: "标题：",
        name: "name",
        wrapperCol: {span: 13},
        rules: [
          {required: true, message: '请输入标题名称，15个字以内，字符格式不限'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (value.length > 15 || value.length < 0) {
                    callback([new Error('请输入标题名称，15个字以内，字符格式不限')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {
          placeholder: "请输入标题名称，15个字以内，字符格式不限",
        }
      }, {
        label: "宣传图：",
        name: "icon",
        required: true,
        wrapperCol: {span: 13},
        infoLabel: <div style={{color: '#f96868'}}>可上传1张，图片要求：jpg、png格式，150KB，750*320px</div>,
        custom(getCustomFieldProps) {
          upConfig.fileList = iconList || [];
          return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                              upConfig={{...upConfig, onChangeFileList: iconImg}}
                              {...getCustomFieldProps('icon')} />
        }
      }, {
        label: "排序：",
        name: "sortWeight",
        rules: [
          {required: true, message: '请输入序号'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (!(/^[0-9]{1,4}$/.test(value))) {
                    callback([new Error('请输入4位以内的数字')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {
          placeholder: '',
          style: {width: 100}
        }
      }, {
        label: "H5链接：",
        name: "url",
        rules: [
          {required: true, message: '请输入正确的URL地址'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(function () {
                  if (!(/^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/.test(value))) {
                    callback([new Error('请输入正确的URL地址')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {
          placeholder: ''
        }
      }, {
        label: "关联鞋款",
        required: true,
        wrapperCol: {span: 24},
        custom(getCustomFieldProps) {
          return <div>
              <span style={{position: 'absolute', top: '-37px', left: '130px', color: '#62a8ea', cursor: 'pointer'}}
                    onClick={context.showModal.bind(context)}>添加</span>
            {
              tabDataSource && tabDataSource.length > 0 ?
                <Table rowKey={record => record.shoeId} columns={columns} dataSource={tabDataSource} pagination={false} size="middle"
                       style={{marginTop: '20px', margin: '20px 90px 20px 90px'}}/> : ''
            }
          </div>
        }
      }],
      initValue: {
        name: null,
        icon: null,
        sortWeight: '100',
        url: null,
      }
    }
    if(item){
      config.initValue = item
    }
    return config;
  }

  render() {
    const {formOptions, chooseTableOptions, shoeList, chooseFormOption, selectList, rowKeys} = this.props;
    const buttonOptionNone = {
      buttons: [
        {
          key: 'save',
          type: 'primary',
          name: '提交'
        }
      ]
    }
    return (
      <div>
        <Form horizontal buttonOption={buttonOptionNone} items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
              onReset={formOptions.handleReset}/>
        <Modal visible={this.state.visible}
               width={1366}
               onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
          <ChooseView shoeList={shoeList} selectList={selectList} chooseTableOptions={chooseTableOptions} chooseFormOption={chooseFormOption}/>
        </Modal>
      </div>
    )
  }
}

Edit.propTypes = {}

export default Edit;
