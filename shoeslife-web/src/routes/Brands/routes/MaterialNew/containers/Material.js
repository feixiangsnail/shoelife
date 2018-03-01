import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import MaterialView from '../components/MaterialView'
import Panel from 'components/Panel'
import {initManyScreen} from 'common/utils';
import {lastList, materialList, cateList, deleteItem} from '../modules/MaterialReducer'

class Material extends Component {

  constructor(props) {
    super(props);

    let params = initManyScreen(['last','materi']);

    if(!params.materi.usePart)
      params.materi.usePart = null;

    params.last.materialType = 1;
    params.materi.materialType = 2;

    this.getFormLastOptions = this.getFormLastOptions.bind(this);
    this.getFormMateriOptions = this.getFormMateriOptions.bind(this);
    this.toDel = this._del.bind(this);
    this.state = {
      params:params
    }
  }

  _del(id) {
    const {deleteItem} = this.props;
    deleteItem(id)
  }

  componentDidMount() {
    let {last,materi} = this.state.params;
    const {lastList, materialList, cateList} = this.props;

    /**
     * 材料管理列表  材料类型:1为楦头，2为材料，3为装饰,材料分类
     */
     materi.firstCategoryId = materi.category && materi.category.length > 0 ? materi.category[0] : '';
     materi.secondCategoryId = materi.category && materi.category.length > 0 ? materi.category[1] : '';
     lastList(last);
     materialList(materi);

     cateList({
       categoryType: '2'
     });
  }

  getFormLastOptions() {
    const context = this;
    const {params} = this.state;
    const {lastList} = context.props;
    return {
      handleSubmit(value) {
          params.last.searchKey = value.searchKey;
          context.setState();
          lastList(context.state.params.last);
      },
      handleReset() {
        setTimeout(() => {
          params.last = {materialType:1};
          context.setState();
        });
      }
    }
  }

  getFormMateriOptions() {
    const context = this;
    const {materialList} = context.props;
    let {params} = context.state
    return {
      handleSubmit(value) {
        params.materi.searchKey = value.searchKey;
        params.materi.usePart = value.usePart;
        params.materi.firstCategoryId = value.category && value.category.length > 0 ? value.category[0] : '';
        params.materi.secondCategoryId = value.category && value.category.length > 0 ? value.category[1] : '';

        context.setState();

        materialList(params.materi);
      },
      handleReset() {
        setTimeout(() => {
          params.materi = {materialType:2,usePart:null};
          context.setState();
        });
      }
    }
  }

  render() {
    let {last,materi} = this.state.params;
    const {lResult, mResult, dResult,sResult, loading, lastList, materialList, cateResult} = this.props;

    const tableLastOptions = {
      dataSource: lResult && lResult.length > 0 ? lResult[0].list : [],
      action: lastList,
      pagination: {
        total: lResult && lResult.length > 0 ? lResult[0].total : ''
      },
      loading,
      params:last
    }
    const tableMateriOptions = {
      dataSource: mResult && mResult.length > 0 ? mResult[0].list : [],
      action: materialList,
      pagination: {
        total: mResult && mResult.length > 0 ? mResult[0].total : ''
      },
      loading,
      params:materi
    }
    /**
     * 分类列表
     * @param lists
     * @returns {*}
     */
    const loop = (lists) => {
      return lists && lists.map(a => {
          let children = ((a.subcategory !== null) && (a.subcategory.length > 0)) ? loop(a.subcategory) : '';
          if ((a.subcategory !== null) && (a.subcategory.length > 0)) {
            return {
              value: a.categoryId + '',
              label: a.categoryName,
              children
            }
          } else {
            return {
              value: a.categoryId + '',
              label: a.categoryName
            }
          }
        })
    }

    return <Panel title=""><MaterialView cateList={loop(cateResult)} toDel={this.toDel}
                                         tableLastOptions={tableLastOptions} getFormLastOptions={this.getFormLastOptions} lastParams={last}
                                         tableMateriOptions={tableMateriOptions} getFormMateriOptions={this.getFormMateriOptions} materiParams={materi}
    /></Panel>
  }
}


Material.propTypes = {
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  lastList,
  materialList,
  cateList,
  deleteItem
}


const mapStateToProps = (state) => {
  const {lResult, mResult, dResult,sResult, loading, cateResult} = state.materialNew;
  return {lResult, mResult, dResult,sResult, loading, cateResult};

}

export default connect(mapStateToProps, mapActionCreators)(Material)
