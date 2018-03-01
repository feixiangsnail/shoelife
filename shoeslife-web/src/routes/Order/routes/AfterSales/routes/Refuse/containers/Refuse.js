import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import RefuseView from '../components/RefuseView'
import Panel from 'components/Panel'
import {modifyItem} from '../modules/RefuseReducer'

class Refuse extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {}
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {
      setTimeout(() => {
        nextProps.history.go(-1);
      }, 800);
    }
  }

  getFormOptions() {
    const context = this;
    const {modifyItem, params} = this.props;
    return {
      handleSubmit(value) {
        modifyItem({
          aftersaleId: params.id,
          aftersaleStatus: '2',
          ...value
        })
      },
      handleReset() {
      }
    }
  }


  render() {
    const {params} = this.state;

    const {loading, result} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }


    return <Panel title=""><RefuseView  {...formOptions} /></Panel>
  }
}


Refuse.propTypes = {
  modifyItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  modifyItem
}


const mapStateToProps = (state) => {
  const {result, loading, isJump} = state.refuse;
  return {'result': result, loading, isJump};

}

export default connect(mapStateToProps, mapActionCreators)(Refuse)

