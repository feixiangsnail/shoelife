import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import HomeView from '../components/HomeView'
import {view} from '../modules/HomeReducer'
import {HOME_URL} from '../../../static/apiAlias'
/**
 * 根据 menuId 来匹配跳转链接，这里在前端进行配置
 * @type {{96: string, 97: string, 98: string, 99: string, 100: string, 102: string, 103: string, 104: string, 105: string}}
 */
const URL = {
  //今日新增订单
  '96': '/order/list',
  //待发货订单
  '97': '/order/list',
  //已上架鞋款
  '98': '/product/shoe',
  //未审核售后服务
  '99': '/order/sales',
  //今日订购单收入
  '100': '/brand/financial',
  //未读用户反馈
  '102': '/users/feedback',
  //未处理的主编申请
  '103': '/users/editorApply',
  //今日新上架鞋款
  '104': '/product/shoe',
  //今日成交金额
  '105': '/brand/financial',
}
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: []
    }
  }

  componentDidMount() {
    this.props.view()
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps) {
      this.setState({
        item: nextProps.result
      })
    }
  }

  render() {
    const { item} = this.state;

    if(item && item!=null && item.length>0){
      return <HomeView  item={item}/>
    }else{
      return false;
    }
  }
}

Home.propTypes = {
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  view
}

const mapStateToProps = (state) => {
  const {result, loading} = state.home;
  return {'result': result, loading};
}

export default connect(mapStateToProps, mapActionCreators)(Home)

