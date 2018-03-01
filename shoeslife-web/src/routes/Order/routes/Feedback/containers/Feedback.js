import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import FeedbackView from '../components/FeedbackView'
import Panel from 'components/Panel'
import {queryList} from '../modules/FeedbackReducer'
import {initScreen} from 'common/utils';

class Feedback extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: initScreen({
        data: {
          satisfaction: null,
          orderId: null
        }
      })
    }
  }

  componentDidMount() {
    const {queryList} = this.props;
    const {params} = this.state;
    queryList(params);
  }

  getFormOptions() {
    const context = this;
    return {
      handleSubmit(value) {
        context.setState({
          params: value
        })
      },
      handleReset() {
        setTimeout(() => {
          context.setState({
            params: {
              satisfaction: null,
              orderId: null
            }
          })
        });
      }
    }
  }

  render() {
    const {params} = this.state;
    const {list, queryList, total, loading} = this.props;
    const tableOptions = {
      dataSource: list,
      action: queryList,
      pagination: {
        total: total
      },
      loading,
      params,
    }

    const formOptions = {
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><FeedbackView {...tableOptions} {...formOptions} params={params}/></Panel>
  }
}

Feedback.propTypes = {}

const mapActionCreators = {
  queryList
}


const mapStateToProps = (state) => {
  const {result, loading, modResult, delResult} = state.feedback;
  let list = [], total = 0;
  if (result instanceof Array) {
    list = result[0].list;
    total = result[0].total;
  }
  return {list, total, loading, modResult, delResult};

}

export default connect(mapStateToProps, mapActionCreators)(Feedback)
