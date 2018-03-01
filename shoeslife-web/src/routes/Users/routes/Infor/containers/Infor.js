import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import InforView from '../components/InforView'
import Panel from 'components/Panel'
import {view} from '../modules/InforReducer'

class Infor extends Component {

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
    const {params} = this.props;
    return <Panel title=""><InforView item={item} params={params}/></Panel>
  }
}

Infor.propTypes = {
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  view
}


const mapStateToProps = (state) => {
  const {result, loading} = state.infor;
  return {'result': result, loading};

}

export default connect(mapStateToProps, mapActionCreators)(Infor)

