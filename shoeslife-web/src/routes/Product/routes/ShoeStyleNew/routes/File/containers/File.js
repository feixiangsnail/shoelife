import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import FileView from '../components/FileView'
import Panel from 'components/Panel'
import {isDict} from '../modules/FileReducer'
import {jumpUrl} from 'common/utils';
import {notification} from 'antd'

class File extends Component {
  constructor(props) {
    super(props);
    this.logImg = this.logImg.bind(this);
    this.state = {
      logList: []
    }
  }
  logImg(files,info) {
    let {history} = this.props,
      response = info.file.response
    ;
    if(response && response.returncode == 1){
      info.file.status = 'error';
      notification.error({
          duration:60,
          message: '文件错误',
          description: response.message,
        });
    }
    this.setState({
      logList: files
    });

    if(info.file.status=='done') jumpUrl(this.props,'/parts');
  }
  componentDidMount() {
    let {isDict} = this.props;
    isDict();
  }
  render() {
    const {logList} = this.state;
    return (<Panel>
        <FileView logList={logList} containers={{...this.props}} logImg={this.logImg} />
      </Panel>)
  }
}

File.propTypes = {}
const mapActionCreators = {
  isDict
}
const mapStateToProps = (state) => {
  return {...state.file};
}
export default connect(mapStateToProps, mapActionCreators)(File)
