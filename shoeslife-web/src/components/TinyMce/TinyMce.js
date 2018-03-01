import React from 'react';
import {findDOMNode} from 'react-dom';
import isEqual from 'lodash/isEqual';
import clone from 'lodash/clone';
import {Modal,message} from 'antd';
import {UploadImage} from 'components/FileLoader'
import {FILE_UPLOAD,IMG_URL} from '../../static/apiAlias'
const ucFirst = (str) => {
  return str[0].toUpperCase() + str.substring(1);
}

let plugins = [
  'advlist autolink lists link image charmap print preview anchor',
  'searchreplace visualblocks code fullscreen media',
  'insertdatetime table contextmenu paste code',
  // 'placeholder'  //    '//g.alicdn.com/uxcore/uxcore-lib/tinymce/4.2.5/plugins/placeholder/plugin.min.js'
];
const EditorConfig = {
  inline: false,
  elementpath: false,
  theme: 'modern',
  height: 300,
  width: 960,
  language: 'zh_CN',
  menubar: false,//菜单项
  file_picker_types: 'image',
  resize: true, // 是否可以鼠标拖动编辑器改变大小
  convert_urls: false, // 当你insertContent的时候，取消一些节点src的转换
  visual: true, // table的虚框是否显示，由于大文本设置虚框很耗性能，所以取消掉
  keep_values: false, // 必须设置false用来提高性能
  forced_root_block: 'div', // 当空文本的时候，tinymce会设置一个根节点，默认是P，我们要改成div比较合理
  show_system_default_font: true, // 是否开启系统字体的探测。
  link_title: true, // link plugins enable title edit
  plugins: plugins,
  toolbar1: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | link image media | fullscreen ',
  wordcount_countregex: /[^\x00-\xff]+/g
};

const EVENTS = [
  'focusin', 'focusout', 'click', 'dblclick', 'mousedown', 'mouseup',
  'mousemove', 'mouseover', 'beforepaste', 'paste', 'cut', 'copy',
  'selectionchange', 'mouseout', 'mouseenter', 'mouseleave', 'keydown',
  'keypress', 'keyup', 'contextmenu', 'dragend', 'dragover', 'draggesture',
  'dragdrop', 'drop', 'drag', 'BeforeRenderUI', 'SetAttrib', 'PreInit',
  'PostRender', 'init', 'deactivate', 'activate', 'NodeChange',
  'BeforeExecCommand', 'ExecCommand', 'show', 'hide', 'ProgressState',
  'LoadContent', 'SaveContent', 'BeforeSetContent', 'SetContent',
  'BeforeGetContent', 'GetContent', 'VisualAid', 'remove', 'submit', 'reset',
  'BeforeAddUndo', 'AddUndo', 'change', 'undo', 'redo', 'ClearUndos',
  'ObjectSelected', 'ObjectResizeStart', 'ObjectResized', 'PreProcess',
  'PostProcess', 'focus', 'blur'
];
const HANDLER_NAMES = EVENTS.map((event) => {
  return 'on' + ucFirst(event);
});
let count = 0;
const uid = () => 'react-tinymce-' + count++

let uploadedFiles = null, curPropsTypes = {};

HANDLER_NAMES.forEach((name) => {
  curPropsTypes[name] = React.PropTypes.func;
});

const TinyMCE = React.createClass({
  displayName: 'TinyMCE',
  getInitialState(){
    return {
      visible: false,
      fileList: []
    }
  },
  getDefaultProps() {
    return {
      config: {},
      content: ''
    };
  },
  getContent(nextProps) {
    const {value, content} = nextProps || this.props;
    return value || content
  },
  componentWillMount() {
    if (typeof tinymce !== 'object') {
      console.warn("TinyMCE is not found in global, init failed");
    }
    this.id = this.id || this.props.id || uid();
  },
  componentDidMount() {
    const config = clone(this.props.config);
    this._init(config);
  },
  componentWillReceiveProps(nextProps) {
    const content = this.getContent(nextProps);

    if (!isEqual(this.props.id, nextProps.id)) {
      this.id = nextProps.id;
    }
    if (!isEqual(this.props.config, nextProps.config) || !isEqual(this.props.id, nextProps.id)) {
      this._init(clone(nextProps.config), content);
      return;
    }
    if (!isEqual(this.props.content, content)) {
      let editor = tinymce.EditorManager.get(this.id);
      if (editor) {
        editor.setContent(content);
        editor.selection.select(editor.getBody(), true);
        editor.selection.collapse(false);
      }
    }
  },
  shouldComponentUpdate(nextProps, nextState) {
    const content = this.getContent(nextProps);
    return (
      !  isEqual(this.props.content, content)
      || !isEqual(this.props.config, nextProps.config)
      || !isEqual(this.state.visible, nextState.visible)
      || !isEqual(this.state.fileList, nextState.fileList)
    );
  },
  componentWillUnmount() {
    this._remove();
  },
  resetValue(value) {
    tinymce.get(this.id).setContent(value)
  },
  render() {
    const {placeholder, className, config} = this.props;
    const content = this.getContent();
    return config.inline ? (
      <div
        id={this.id}
        className={className}
        dangerouslySetInnerHTML={{__html: content}}
      />
    ) : (
      <div>
        {this.renderUploadModal()}
        <textarea
          id={this.id}
          className={className}
          defaultValue={content}
          placeholder={placeholder}
        />
      </div>
    );
  },
  renderUploadModal() {
    const context = this;
    let upConfig = {
      listType: 'picture',
      showUploadList: true,
      onlyFile: true,
      fileList:this.state.fileList,
      action: FILE_UPLOAD,
      data: {
        model: 'operations/content'
      },
      beforeUpload(file) {
        const isFile = /\.(jpg|jpeg|gif|png)$/ig.test(file.name);
        if (!isFile) {
          message.error('只能上传 jpg、jpeg、gif、png 后缀图片！', 2);
          return isFile;
        }
        if (file.size > 500*1024){
          message.error('只能上传 500KB 以内的图片！', 2);
          return false
        }
      },
      onChangeFileList(files,info) {
        uploadedFiles = files;
        context.setState({
          fileList: files
        })
      },
    };

    return <Modal title="请选择图片" visible={this.state.visible}
                  onOk={this.afterUpload} onCancel={this.handleCancel}>
      <UploadImage upConfig={upConfig} title="选择图片" className='upload-list-inline' />
    </Modal>
  },

  // 隐藏modal
  handleCancel(e) {
    this.setState({
      fileList: []
    })
    this.setState({
      visible: false
    });
  },

  // 编辑器里面的文件上传成功后，执行callback操作，添加图片到编辑器
  afterUpload() {
    this.setState({
      fileList: []
    })
    this.setState({
      visible: false
    });

    if (!uploadedFiles) return
    this.__callback(IMG_URL + uploadedFiles, {alt: ''});
    uploadedFiles = null;
  },

  file_callback(callback, value, meta) {
    this.__callback = callback;
    if (meta.filetype == 'image') {
      this.setState({
        visible: true
      });
    }
  },

  _init(config, content) {
    if (this._isInit) {
      this._remove();
    }

    findDOMNode(this).style.hidden = 'hidden';

    config.selector = '#' + this.id;
    let configs = Object.assign({}, EditorConfig, config);
    let context = this;

    configs.file_picker_callback = config.file_picker_callback || this.file_callback

    configs.setup = (editor) => {
      EVENTS.forEach((event, index) => {
        const handler = this.props[HANDLER_NAMES[index]];
        if (typeof handler !== 'function') return;
        editor.on(event, (e) => {
          e.target.value = editor.getContent()
          handler(e, editor);
        });
      });
      if (content) {
        editor.on('init', () => {
          editor.setContent(content);
        });
      }
    };

    tinymce.init(configs);

    findDOMNode(this).style.hidden = '';

    this._isInit = true;
  },

  _remove() {
    tinymce.EditorManager.editors = [];
    this._isInit = false;
  }
});

export default TinyMCE
