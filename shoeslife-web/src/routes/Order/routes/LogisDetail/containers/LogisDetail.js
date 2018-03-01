import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import LogisDetailView from '../components/LogisDetailView'
import Panel from 'components/Panel'
import {view} from '../modules/LogisDetailReducer'
import {formatDate} from 'common/utils';
class LogisDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      item: null
    }
  }

  componentDidMount() {
    const {params, view} = this.props;
    view({
      expSpellName: params.name,
      logisticsId: params.id
    })
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.params.id && nextProps.params.name) {
      this.setState({
        item: nextProps.result ? nextProps.result : []
      })
    }
  }

  render() {
    const {item} = this.state;
    const {params} = this.props;
    let logisList = [];
    if (item && item.length > 0) {
      logisList = item.map(c => {
        return {
          title: c.context,
          description: formatDate(c.time, 'yyyy-MM-dd HH:mm:ss')
        }
      });
    } else {
      logisList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
    return <Panel title=""><LogisDetailView logisList={logisList} params={params}/></Panel>
  }
}

LogisDetail.propTypes = {}

const mapActionCreators = {
  view
}

const mapStateToProps = (state) => {
  const {result, loading} = state.logisDetail;
  return {result, loading};
}

export default connect(mapStateToProps, mapActionCreators)(LogisDetail)













