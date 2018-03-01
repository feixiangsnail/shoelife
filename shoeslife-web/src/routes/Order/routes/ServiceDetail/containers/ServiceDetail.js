import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import ServiceDetailView from '../components/ServiceDetailView'
import Panel from 'components/Panel'
import {view} from '../modules/ServiceDetailReducer'

class ServiceDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      params: {},
      item: null
    }
  }

  componentDidMount() {
    const context = this;
    const {view, params} = context.props;
    if (params.id) {
      view(params.id)
    }
  }

  componentWillReceiveProps(nextProps, preProps) {
    this.setState({
      item: nextProps.result && nextProps.result.length > 0 ? nextProps.result[0] : null
    })
  }

  render() {
    const {item} = this.state;
    return <Panel title=""><ServiceDetailView item={item}/></Panel>
  }
}

ServiceDetail.propTypes = {
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  view
}


const mapStateToProps = (state) => {
  const {result, loading} = state.serviceDetail;
  return {'result': result, loading};
}

export default connect(mapStateToProps, mapActionCreators)(ServiceDetail)

