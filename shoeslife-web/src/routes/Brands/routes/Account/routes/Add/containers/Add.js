import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import AddView from '../components/AddView'
import Panel from 'components/Panel'
import {message} from 'antd'
import {addItem, queryList} from '../modules/AddReducer'

class Add extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.photoImg = this.photoImg.bind(this);
    this.state = {
      params: {},
      photoList: [],
      roleId:''
    }
  }

  photoImg(files) {
    this.setState({
      photoList: files
    })
  }

  upReducerId(id){
    this.state.roleId = id;
  }

  componentDidMount() {
    const {queryList} = this.props;
    queryList()
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
    const {addItem} = context.props;
    const {photoList} = context.state;
    return {
      handleSubmit(value) {
        value.roleId = context.state.roleId; //组件BUG  不能自动 更新单选
        /*if(value.roleId == '10'){
            let list = photoList.split(',');
            if (list.length == 0 || list.length < 0) {
              message.error('图像不能为空！')
              return false
            }
            value.photo = photoList;
        }*/
        addItem({
          ...value
        })
      },
      handleReset() {
      }
    }
  }

  render() {
    const {photoList} = this.state;
    const {result, loading} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }
    /**
     * 获取所有企业角色
     * @type {Array}
     */
    let roleList = [];
    if (result && result.length > 0) {
      roleList = result.map(c => {
        return {
          value: c.roleId + '',
          title: c.roleName
        }
      });
    } else {
      roleList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
    return <Panel title=""><AddView  {...formOptions} photoList={photoList} photoImg={this.photoImg} roleList={roleList} upReducerId={this.upReducerId.bind(this)} />
    </Panel>
  }
}

Add.propTypes = {
  addItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  addItem,
  queryList,
}

const mapStateToProps = (state) => {
  const {result, addResult, isJump, loading} = state.add;
  return {result, addResult, loading, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(Add)
