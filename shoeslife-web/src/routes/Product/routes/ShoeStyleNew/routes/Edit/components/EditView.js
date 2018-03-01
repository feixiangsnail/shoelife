import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Icon, message} from 'antd';
import './Edit.less';
import Form from 'components/Form';
import {UploadImage} from 'components/FileLoader';
import {FILE_UPLOAD} from '../../../../../../../static/apiAlias'
//维修、保养
const KEEP = {
  '1': "一个月内免费",
  '3': "三个月内免费",
  '6': "半年内免费",
  '12': "一年内免费",
  '0': "终身免费",
};

class EditView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleChecked: []
    }
  }

  _getFormItems() {
    let config = {};
    const context = this;
    const {
      cateList, sList, dList, bList,
      coverList, coverImg,
      introduceList, introduceImg,
      videoList, videoImg,
      sightList, sightImg,
      xList, item
    } = context.props;
    /**
     * 宣传图配置项
     * @type {{listType: string, showUploadList: boolean, onlyFile: boolean, action: *, data: {model: string}, beforeUpload: ((file))}}
     */
    let upConfigCover = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: false,
      action: FILE_UPLOAD,
      data: {
        model: 'product/cover'
      },
      beforeUpload(file) {
        const isFile = /\.(jpg)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传 jpg 后缀图片！', 2);
          return isFile;
        }
        if (file.size > 500 * 1024) {
          message.error('只能上传 500KB 以内的图片！', 2);
          return false
        }
      }
    };
    /**
     * 详情介绍配置项
     * @type {{listType: string, showUploadList: boolean, onlyFile: boolean, action: *, data: {model: string}, beforeUpload: ((file))}}
     */
    let upConfigIntroduce = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: false,
      action: FILE_UPLOAD,
      data: {
        model: 'product/introduce'
      },
      beforeUpload(file) {
        const isFile = /\.(jpg|gif)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传 jpg、gif 后缀图片！', 2);
          return isFile;
        }
        if (file.size > 500 * 1024) {
          message.error('只能上传 500KB 以内的图片！', 2);
          return false
        }
      }
    };
    /**
     * 小视频配置项
     * @type {{listType: string, showUploadList: boolean, onlyFile: boolean, action: *, data: {model: string}, beforeUpload: ((file))}}
     */
    let upConfigVideo = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: true,
      action: FILE_UPLOAD,
      data: {
        model: 'product/video'
      },
      beforeUpload(file) {
        const isFile = /\.(mp4)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传 mp4 格式的视频！', 2);
          return isFile;
        }
        if (file.size > 1024 * 1024) {
          message.error('只能上传 1M 以内的图片！', 2);
          return false
        }
      }
    };
    /**
     * 情景图配置项
     * @type {{listType: string, showUploadList: boolean, onlyFile: boolean, action: *, data: {model: string}, beforeUpload: ((file))}}
     */
    let upConfigSight = {
      listType: 'picture-card',
      showUploadList: true,
      onlyFile: true,
      action: FILE_UPLOAD,
      data: {
        model: 'product/sightPhoto'
      },
      beforeUpload(file) {
        const isFile = /\.(jpg)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传 jpg后缀图片！', 2);
          return isFile;
        }
        if (file.size > 150 * 1024) {
          message.error('只能上传 150KB 以内的图片！', 2);
          return false
        }
      }
    };

    const styleList = sList.map((item) => {
      return item.title
    })
    const getChecked = () => {
      let checked = [], checks = null;
      if (item) {
        let str = item.styleIdsStr ? item.styleIdsStr.toString().split(','):[];
        checks = str.length&&str.length>0 ? str.map((rItem) => {
          return rItem
        }):[]
        checks && checks.length > 0 && checks.forEach((cItem) => {
          sList.forEach((s) => {
            if (s.value == cItem) {
              checked.push(s.title)
            }
          })
        })
      }
      return this.state.styleChecked.length ? this.state.styleChecked : (checked || [])
    }
    config.panels = [
      {
        title: '基本信息',
        formItems: [{
          label: "鞋款名称：",
          name: "shoeName",
          labelCol: {span: 2},
          wrapperCol: {span: 13},
          rules: [
            {required: true, message: '请输入要添加的鞋款名称，5-50个字符以内'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(function () {
                    if (value.length > 50 || value.length < 5) {
                      callback([new Error('请输入要添加的鞋款名称，5-50个字符以内')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            placeholder: '请输入要添加的鞋款名称，5-50个字符以内'
          }
        }, {
          label: "楦头：",
          name: "shoeLastId",
          rules: [
            {required: true, type: 'number', message: '请选择所用楦头'},
          ],
          select: {
            style: {width: '200px'},
            optionValue: xList,
            showSearch: true,
            notFoundContent: "无法找到",
            optionFilterProp: "children",
            searchPlaceholder: "请输入楦头名称"
          }
        }, {
          label: "款式编号：",
          name: "shoeCode",
          wrapperCol: {span: 10},
          rules: [
            {required: true, message: '请输入正确的鞋款编号，5-20个字符以内，字母数字均可'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(function () {
                    if (!(/^[a-zA-Z0-9,-]{5,20}$/.test(value))) {
                      callback([new Error('请输入正确的鞋款编号，5-20个字符以内，字母数字均可')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            placeholder: '请输入正确的鞋款编号，5-20个字符以内，字母数字均可'
          }
        }, {
          label: "分类：",
          name: "designCategory",
          rules: [{required: true, type: 'array', message: '请选择分类'}],
          cascader: {
            options: cateList,
            placeholder: "请选择分类",
            changeOnSelect: false
          }
        }, {
          label: "设计风格：",
          name: "styleIdsStr",
          wrapperCol: {span: 20},
          required: true,
          //rules: [{required: true, type: 'array', message: '请选择设计风格'}],
          checkboxGroup: {
            options: styleList,
            value: getChecked(),
            onChange: (value) => {
              this.setState({
                styleChecked: value
              })
            }
          }
        }, {
          label: "品牌：",
          name: "brandId",
          rules: [{required: true, type: 'number', message: '请选择品牌'}],
          select: {
            tipValue: "请选择",
            optionValue: bList
          }
        }, {
          label: "设计师：",
          name: "designerId",
          rules: [{required: true, type: 'number', message: '请选择设计师'}],
          select: {
            tipValue: "请选择",
            optionValue: dList,
            style: {width: '300px'}
          }
        }, {
          label: "基准价：",
          name: "price",
          cName: 'afterInput',
          rules: [{required: true, type: 'number', message: '请输入2-5位的整数'}],
          infoLabel: <div style={{color: '#76838f'}}>元</div>,
          inputNumber: {
            min: 10,
            max: 99999,
            style: {width: '190px'}
          }
        }, {
          label: "售后服务-维修：",
          name: "freeRepair",
          wrapperCol: {span: 10},
          rules: [{required: true, type: 'string', message: '请选择免费维修时间'}],
          select: {
            tipValue: "全部",
            optionValue: Object.keys(KEEP).map((key) => {
              return {'value': key, 'title': KEEP[key]}
            })
          }
        }, {
          label: "宣传图：",
          name: "coverPhoto",
          required: true,
          wrapperCol: {span: 13},
          infoLabel: <div style={{color: '#f96868'}}>可上传2~5张，图片格式为.jpg，单张500K以内，951*951px</div>,
          custom(getCustomFieldProps) {
            upConfigCover.fileList = coverList || [];
            return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfigCover, onChangeFileList: coverImg}}/>
          }
        }, {
          label: "小视频：",
          name: "video",
          wrapperCol: {span: 13},
          infoLabel: <div style={{color: '#f96868'}}>可上传.mp4格式，1M以内</div>,
          custom(getCustomFieldProps) {
            upConfigVideo.fileList = videoList || [];
            return <UploadImage  className='upload-list-inline upload-fixed'
                                upConfig={{...upConfigVideo, onChangeFileList: videoImg,title:"选择视频"}}/>
          }
        }, {
          label: "情景图：",
          name: "sightPhoto",
          required: true,
          wrapperCol: {span: 13},
          infoLabel: <div style={{color: '#f96868'}}>可上传1张，图片格式：.jpg，150KB以内，212*260px</div>,
          custom(getCustomFieldProps) {
            upConfigSight.fileList = sightList || [];
            return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfigSight, onChangeFileList: sightImg}}/>
          }
        }, {
          label: "详情介绍：",
          name: "introducePhoto",
          required: false,
          wrapperCol: {span: 13},
          infoLabel: <div style={{color: '#f96868'}}>可上传0~10张，格式为.jpg或者.gif，单张500K以内，宽度为1125px，高度自适应</div>,
          custom(getCustomFieldProps) {
            upConfigIntroduce.fileList = introduceList || [];
            return <UploadImage title="选择图片" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfigIntroduce, onChangeFileList: introduceImg}}/>
          }
        }, {
          label: "生产周期：",
          name: "productionPeriod",
          cName: 'afterInput',
          rules: [{required: true, type: 'number', message: '请输入1-45的整数'}],
          infoLabel: <div style={{color: '#76838f'}}>天</div>,
          inputNumber: {
            min: 1,
            max: 45,
            style: {width: '190px'}
          }
        }]
      }
    ]

    config.initValue = {
      shoeName: null,
      shoeCode: null,
      designCategory: null,
      styleIdsStr: null,
      brandId: null,
      designerId: null,
      price: 10,
      afterSever: null,
      freeRepair: null,
      coverPhoto: null,
      introducePhoto: null,
      video: null,
      sightPhoto: null,
      productionPeriod: 1,
      shoeLastId: null,
    };

    if (item) {
      config.initValue = item;
      if (typeof item.designCategory == 'number') {
        const s = item.designCategory.toString(), reg = /\d{3}/g, rs = s.match(reg);
        rs.push(s.substring(rs.join('').length));
        rs.pop();
        rs.splice(-1, 1, item.designCategory.toString())
        config.initValue.designCategory = rs
      }

      if (this.state.styleChecked.length && (this.state.styleChecked.length > 0)) {
        const checkList = []
        this.state.styleChecked.forEach((cItem) => {
          sList.forEach((item) => {
            if (item.title == cItem) {
              checkList.push(item.value)
            }
          })
        })
        config.initValue.styleIdsStr = checkList
      } else {
        config.initValue.styleIdsStr = item.styleIdsStr ? item.styleIdsStr.toString().split(',') : []
      }
    } else {
      const checkList = []
      this.state.styleChecked.forEach((cItem) => {
        sList.forEach((item) => {
          if (item.title == cItem) {
            checkList.push(item.value)
          }
        })
      })
      config.initValue.styleIdsStr = checkList
    }

    return config;
  }

  render() {
    const {formOptions,params, ...other} = this.props;
    let name = params.id ?'保存':'下一步';
    const buttonOptionNone = {
      buttons: [
        {
          key: 'save',
          type: 'primary',
          name: name
        },
        {
          key: 'reset',
          name: '重置'
        }
      ]
    }
    return (
      <div>
        <Form horizontal buttonOption={buttonOptionNone} items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
              onReset={formOptions.handleReset}/>
      </div>
    )
  }
}

EditView.propTypes = {}
export default EditView;
