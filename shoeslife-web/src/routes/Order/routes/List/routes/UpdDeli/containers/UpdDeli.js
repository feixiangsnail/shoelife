import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import UpdDeliView from '../components/UpdDeliView'
import Panel from 'components/Panel'
import {modifyItem, view} from '../modules/UpdDeliReducer'
import {message} from 'antd'
class UpdDeli extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {},
      item: null
    }
  }

  componentDidMount() {
    const {params, view} = this.props;
    if (params.key) {
      view(params.key)
    }
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {
      setTimeout(() => {
        nextProps.history.go(-1);
      }, 800);
    }
    if (nextProps.params.key) {
      this.setState({
        item: nextProps.result ? nextProps.result[0] : ''
      })
    }
  }

  getFormOptions() {
    const context = this;
    const {modifyItem} = context.props;
    const {item} = this.state;
    return {
      handleSubmit(value) {
        /**
         * 判断是否为空对象
         * @param e
         * @returns {boolean}
         */
        let isEmptyObject = function (e) {
          let t;
          for (t in e)
            return !1;
          return !0
        }
        if (item.orderStatus == '3') {
          if (isEmptyObject(value)) {
            message.error('请勾选并填写快递公司和快递单号');
            return false
          } else {
            modifyItem({
              orderId: item.orderId,
              orderStatus: '4',
              ...value
            })
          }
        } else {
          modifyItem({
            orderId: item.orderId,
            orderStatus: '3',
          })
        }
      },
      handleReset() {
      }
    }
  }

  render() {
    const {item} = this.state;
    const {loading, result} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }
    return <Panel title=""><UpdDeliView  {...formOptions} item={item}/></Panel>
  }
}

UpdDeli.propTypes = {}

const mapActionCreators = {
  view,
  modifyItem,
}

const mapStateToProps = (state) => {
  const {result, modResult, loading, isJump} = state.updDeli;
  return {result, modResult, loading, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(UpdDeli)

















