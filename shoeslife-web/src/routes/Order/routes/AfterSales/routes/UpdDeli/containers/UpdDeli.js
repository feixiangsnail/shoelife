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
    const {modifyItem, params} = context.props;
    const {item} = this.state;
    return {
      handleSubmit(value) {
        /**
         * STATUS==3/4  显示“已收到商品”操作（已审核通过，商家未受到商品之前显示）---5  type
         * STATUS==5  显示“开始受理”操作（商家确认收到商品后可以开始受理）----6
         * STATUS==5/6 && TYPE ==3  显示“退款”操作（退货：商家确认收到后可办理退货）---9
         * STATUS==6 && TYPE !=3/4   显示“发货”操作（商家受理后可发货）-----11
         */
        /*if (params.type == 'null') {
          message.error('用户还未发货！');
          return false;
        } else {
          item.aftersaleStatus == '3'||item.aftersaleStatus == '4' ?
           modifyItem({
           aftersaleId: item.aftersaleId,
           aftersaleType: item.aftersaleType,
           aftersaleStatus: '5'
           }) : '';
        }*/
        item.aftersaleStatus == '3'||item.aftersaleStatus == '4' ?
          modifyItem({
            aftersaleId: item.aftersaleId,
            aftersaleType: item.aftersaleType,
            aftersaleStatus: '5'
          }) : '';
        item.aftersaleStatus == '5' && item.aftersaleType !== '3' ? modifyItem({
            aftersaleId: item.aftersaleId,
            aftersaleType: item.aftersaleType,
            aftersaleStatus: '6'
          }) : '';
        (item.aftersaleStatus == '6' || item.aftersaleStatus == '5') && (item.aftersaleType == '3') ? modifyItem({
            aftersaleId: item.aftersaleId,
            aftersaleType: item.aftersaleType,
            aftersaleStatus: '9',
            ...value
          }) : '';
        (item.aftersaleStatus == '6') && item.aftersaleType !== '3' && item.aftersaleType !== '4' ?
          modifyItem({
            aftersaleId: item.aftersaleId,
            aftersaleType: item.aftersaleType,
            aftersaleStatus: '11',
            ...value
          }) : '';
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





















