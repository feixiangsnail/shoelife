import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ChooseView from './ChooseView'
import {Button, Icon, Modal, Table, Input, message} from 'antd';
import {UploadImage} from 'components/FileLoader';
import TinyMce from 'components/TinyMce'
import Form from 'components/Form';
import Image from 'components/Image';
import {formatDate} from 'common/utils';
import {FILE_UPLOAD, H5_URL} from '../../../../../../../static/apiAlias'
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  showModal() {
    const context = this;
    const {isGet}=context.props;
    context.setState({
      visible: true
    });
    isGet()
  }

  handleOk() {
    const context = this;
    let {isOK, selectList}=context.props;
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
    const {tabDataSource,toDel} = this.props;
    let filterTabs = tabDataSource.filter((tab) => {
      return tab.shoeId !== id
    })
    toDel(filterTabs)
  }

  _getFormItems() {
    const context = this;
    let config = {};
    const {item, iconImg, iconList, cateList, eList,tabDataSource,toItem} = context.props;

    let upConfig = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: true,
      action: FILE_UPLOAD,
      data: {
        model: 'operations/title'
      },
      beforeUpload(file) {
        const isFile = /\.(jpg|png)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传 png、jpg 后缀图片！', 2);
          return isFile;
        }
        if (file.size > 500*1024){
          message.error('只能上传 500KB 以内的图片！', 2);
          return false
        }
      }
    };
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
      title: '所属品牌',
      dataIndex: 'brandName'
    }, {
      key: '4',
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
      key: '5',
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
    config.panels = [
      {
        title: '基本信息',
        formItems: [{
          label: "文章标题：",
          name: "title",
          wrapperCol: {span: 13},
          rules: [
            {required: true, min: 5, max: 50, message: '请输入文章标题，5-50个字符，字符格式不限'}
          ],
          input: {
            placeholder: "请输入文章标题，5-50个字符，字符格式不限",
          }
        }, {
          label: "所属分类：",
          name: "category",
          rules: [{required: true, type: 'array', message: '此处必填'}],
          cascader: {
            options: cateList,
            placeholder: "请选择分类",
            changeOnSelect: false
          }
        }, {
          label: "主编：",
          name: "editorId",
          rules: [{required: true, message: '必填'}],
          select: {
            tipValue: "全部",
            optionValue: eList
          }
        }, {
          label: "标题图片：",
          name: "icon",
          required: true,
          wrapperCol: {span: 13},
          infoLabel: <div style={{color: '#f96868'}}>可上传1张，图片格式为.png、.jpg格式，尺寸750*512px，500KB 以内的图片</div>,
          custom(getCustomFieldProps) {
            upConfig.fileList = iconList || [];
            return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfig, onChangeFileList: iconImg}}
              {...getCustomFieldProps('icon')} />
          }
        }]
      }, {
        title: '图文内容',
        formItems: [{
          label: "",
          custom(getCustomFieldProps) {
            return <TinyMce id='tinymce-desc' value={getCustomFieldProps('content').value} onKeyup={toItem} onChange={toItem} />
          }
        }]
      },
      {
        title: '关联鞋款',
        formItems: [{
          label: "",
          wrapperCol: {span: 24},
          custom(getCustomFieldProps) {
            return <div>
              <span style={{position: 'absolute', top: '-45px', left: '100px', color: '#62a8ea', cursor: 'pointer'}}
                    onClick={context.showModal.bind(context)}>添加</span>
              {
                tabDataSource && tabDataSource.length > 0 ?
                  <Table rowKey={record => record._index} columns={columns} dataSource={tabDataSource} pagination={false} size="middle"
                         style={{marginTop: '20px', margin: '20px 90px 20px 90px'}}/> : ''
              }
            </div>
          }
        }]
      }
    ]
    config.initValue = {
      title: null,
      category: null,
      editorId: null,
      icon: null,
      content: null,
    };
    if (item) {
      let c = [], u = [];
      c.push(item.firstCategoryId.toString(), item.secondCategoryId.toString());
      config.initValue = item;
      config.initValue.category = c;
      config.initValue.editorId = item.editorId.toString();
    }
    return config;
  }

  render() {
    const {formOptions, chooseTableOptions, shoeList, chooseFormOption, selectList,rowKeys} = this.props;
    const buttonOptionNone = {
      buttons: [
        {
          key: 'save',
          type: 'primary',
          name: '保存'
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
          <ChooseView shoeList={shoeList} selectList={selectList} chooseTableOptions={chooseTableOptions} chooseFormOption={chooseFormOption} />
        </Modal>
      </div>
    )
  }
}

Add.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default Add;
