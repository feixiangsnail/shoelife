import React, {Component, PropTypes} from 'react';
import {Button, Icon} from 'antd';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  displayName: 'UEditor'
  // 设置默认的属性值
  getDefaultProps() {
    return {
      disabled: false,
      height: 500,
      content: '',
      id: 'editor'
    };
  }
  initEditor(){
    const id = this.props.id;
    let ue = UE.getEditor(id, {
      // 工具栏，不配置有默认项目
      toolbars: [[
        'fullscreen', 'source', '|', 'undo', 'redo', '|',
        'bold', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch',
        '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
        'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
        'indent', '|',
        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
        'emotion',
        'horizontal', '|', 'date', 'time', '|', 'insertimage'
      ]],
      lang: 'zh-cn',
      // 字体
      'fontfamily': [
        {label: '', name: 'songti', val: '宋体,SimSun'},
        {label: '', name: 'kaiti', val: '楷体,楷体_GB2312, SimKai'},
        {label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei'},
        {label: '', name: 'heiti', val: '黑体, SimHei'},
        {label: '', name: 'lishu', val: '隶书, SimLi'},
        {label: '', name: 'andaleMono', val: 'andale mono'},
        {label: '', name: 'arial', val: 'arial, helvetica,sans-serif'},
        {label: '', name: 'arialBlack', val: 'arial black,avant garde'},
        {label: '', name: 'comicSansMs', val: 'comic sans ms'},
        {label: '', name: 'impact', val: 'impact,chicago'},
        {label: '', name: 'timesNewRoman', val: 'times new roman'}
      ],
      // 字号
      'fontsize': [10, 11, 12, 14, 16, 18, 20, 24, 36],
      // 为编辑器实例添加一个路径，必需项
      'UEDITOR_HOME_URL': '/react/dist/ueditor/',
      // 上传图片时后端提供的接口
      serverUrl: window.api_host + '/innerMessage/uploadImage',
      enableAutoSave: false,
      autoHeightEnabled: false,
      initialFrameHeight: this.props.height,
      initialFrameWidth: '100%',
      // 是否允许编辑
      readonly: this.props.disabled
    });
    var me = this;
    ue.ready( (ueditor)=> {
      var value = me.props.value ? me.props.value : '<p></p>';
      ue.setContent(value);
    });
  }
  componentDidMount() {
    this.initEditor();
  }

  componentWillUnmount() {

  }

  componentWillReceiveProps(nextProps, preProps) {

  }

  render() {
    return (
      <script id={this.props.id} name="content" type="text/plain">

      </script>
    )
  }
}

Editor.propTypes = {}

Editor.defaultProps = {}

export default Editor;
