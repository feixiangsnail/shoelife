import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import NotateView from '../components/NotateView'
import Panel from 'components/Panel'
import {queryList, addItem, modifyItem, deleteItem} from '../modules/NotateReducer'
import {initScreen} from 'common/utils';
import {message} from 'antd'
class Notate extends Component {

  constructor(props) {
    super(props);
    this.toDel = this._del.bind(this);
    this.addSubm = this._addSubm.bind(this);
    this.toSubm = this._subm.bind(this);
    this.logList = this._logList.bind(this);
    this.state = {

    }
  }

  _subm(newName, newCode, row) {
    const {modifyItem} = this.props;
    let dNmame = newName || row.dictName
    let dCode = newCode || row.dictCode
    if (!(/^[\u4e00-\u9fa5]{1,5}$/.test(dNmame))) {
      message.error('5个汉字以内');
      return false
    }
    if (dCode.length > 30) {
      message.error('30个位以内');
      return false
    }
    modifyItem({
      dictId: row.dictId,
      dictName: dNmame,
      dictCode: dCode,
    })
  }
  _logList(infor){
    if(infor && infor.file && infor.file.response && infor.file.response.returncode == 0){
        message.success(infor.file.response.message);
    }else{
      message.error(infor.file.response.message)
    }
    const {addItem} = this.props;
    addItem('-1');
  }
  /**
   * 新增
   * @private
   */
  _addSubm() {
    const {addItem} = this.props;
    addItem(0)
  }

  /**
   * 删除
   * @param id
   * @private
   */
  _del(id) {
    const {deleteItem} = this.props;
    deleteItem(id)
  }

  componentDidMount() {
    const {params} = this.state;
    const {addItem} = this.props;
    addItem('-1');
  }

  componentWillReceiveProps(nextProps) {
    const {params} = this.state;
    /*if (nextProps.addResult.is) {
      nextProps.addResult.is = false;
      nextProps.queryList(params);
      return;
    }*/
    if (nextProps.delResult.is) {
      nextProps.delResult.is = false;
      nextProps.addItem('-1');
      return;
    }
    if (nextProps.modResult.is) {
      nextProps.modResult.is = false;
      nextProps.addItem('-1');
      return;
    }
  }

  render() {
    const {params} = this.state;

    const {addResult, addItem, isP} = this.props;
    const tableOptions = {
      dataSource: addResult && addResult.length ? addResult : [],
      action: addItem,
      pagination: false,
      params,
    }

    return <Panel title=""><NotateView tableOptions={tableOptions} params={params} toDel={this.toDel} addSubm={this.addSubm} toSubm={this.toSubm}
                                       dataSource={addResult} {...tableOptions} isP={isP} logList={this.logList}/></Panel>
  }
}

Notate.propTypes = {}

const mapActionCreators = {
  queryList,
  deleteItem,
  modifyItem,
  addItem
}


const mapStateToProps = (state) => {
  const {result, loading, addResult, modResult = {}, delResult = {}, isP} = state.notate;
  return {result, loading, addResult, modResult, delResult, isP};
}

export default connect(mapStateToProps, mapActionCreators)(Notate)

