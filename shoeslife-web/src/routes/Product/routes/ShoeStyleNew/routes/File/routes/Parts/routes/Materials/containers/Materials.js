import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import MaterialView from '../components/MaterialView'
import Panel from 'components/Panel'
import {jumpUrl} from 'common/utils'
import { materialList,cateList,addModeMaterial } from '../modules/MaterialsReducer'

class Material extends Component {

  constructor(props) {
    super(props);
    this.getFormMateriOptions = this.getFormMateriOptions.bind(this);
    this.state = {
      params:{
        modeId:props.params.mid,
        pageSize:10
      },
      ids:[]
    }
  }
  componentDidMount() {
    let {params} = this.state;
    const { materialList, cateList} = this.props;
     materialList(params);
     cateList({
       categoryType: '2'
     });
  }
  componentWillReceiveProps(nextProps) {
    let {history,params} = this.props
    ;
    if(!nextProps.aResult.is) return
    nextProps.aResult.is = false;
    history.replace('/product/shoeNew/file/'+params.sid+'/'+params.stat+'/parts');
  }
  handleRowSelection() {
    return {
      onSelect: (record, selected, selectedRows) => {
        let ids = selectedRows.map(c => {
          return c.materialId
        });
        console.log(ids);
        this.setState({ids});
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        let ids = selectedRows.map(c => {
          return c.materialId
        });
        this.setState({ids});
      }
    }
  }
  getFormMateriOptions() {
    const context = this;
    const {materialList} = this.props;
    let {params} = this.state
    return {
      handleSubmit(value) {
        params.searchKey = value.searchKey;
        params.firstCategoryId = value.category && value.category.length > 0 ? value.category[0] : '';
        params.secondCategoryId = value.category && value.category.length > 0 ? value.category[1] : '';
        materialList(params);
      },
      handleReset() {

      }
    }
  }
  addMaterials(){
    var materialIds = []
      ,ids = this.state.ids
      ,mId = this.props.params.mid
    ;
    sessionStorage.setItem('materialsMid',mId);
    this.props.addModeMaterial({
      modeId:mId,
      materialId:ids
    });
  }
  render() {
    let {params,ids} = this.state;
    const { mResult,  loading, cateResult,materialList} = this.props;
    const tableMateriOptions = {
      dataSource: mResult && mResult.length > 0 ? mResult[0].list : [],
      action: materialList,
      pagination: {
        total: mResult && mResult.length > 0 ? mResult[0].total : ''
      },
      rowSelection: this.handleRowSelection(),
      loading,
      params,

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

    return (<Panel>
        <MaterialView cateList={loop(cateResult)} materialIds={ids} addMaterials={this.addMaterials.bind(this)} tableMateriOptions={tableMateriOptions} getFormMateriOptions={this.getFormMateriOptions} params={params}
    /></Panel>)
  }
}

Material.propTypes = {
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  materialList,
  cateList,
  addModeMaterial
}
const mapStateToProps = (state) => {
  const { mResult=[], loading, aResult={},cateResult=[]} = state.materials;
  return { mResult,loading, cateResult,aResult};

}

export default connect(mapStateToProps, mapActionCreators)(Material)
