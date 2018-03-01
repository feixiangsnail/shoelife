import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classes from './style.less';
import {Row, Col, Button, Icon, Steps} from 'antd';

const Step = Steps.Step;
class LogisDetail extends Component {
  toBack() {
    history.go(-1);
  }

  render() {
    const context = this;
    const {params,logisList} = context.props;
    let s = null;
    if (!logisList) {
      return false
    }
    if (logisList && logisList.length) {
      s = logisList.map((s, i) => <Step key={i} title={s.title} icon="notification" description={s.description}/>);
    }
    return (
      <div className={classes.infor}>
        <ul>
          <li>收件信息：{params.type}</li>
        </ul>
        <Steps direction="vertical" current={1}>{s}</Steps>
        <Button type="ghost" onClick={context.toBack.bind(context)}>返回</Button>
      </div>
    )
  }
}

LogisDetail.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default LogisDetail;





