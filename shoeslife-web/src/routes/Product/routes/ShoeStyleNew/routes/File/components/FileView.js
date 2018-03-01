import React, {Component, PropTypes} from 'react';
import {Button,message,Alert} from 'antd'
import Form from 'components/Form';
import {FormItems} from './Config.js'
import DJSON from './Demonstration';
import {jumpUrl} from 'common/utils';
import Trees from 'components/Trees';

class FileView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Alert message="温馨提示"
             description="OBJ文件建议按照以下方式分组，可提高录入效率"
             type="info" closeText="不再提醒"
             showIcon/>
          <Form horizontal buttonOption={{buttons: false}} items={FormItems(this)}  />
          <Trees config={{...DJSON}} />
      </div>
    )
  }
}
FileView.propTypes = {
  loading: React.PropTypes.bool,
}
export default FileView;
