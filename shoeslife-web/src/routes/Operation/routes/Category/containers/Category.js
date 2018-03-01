import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import CategoryView from '../components/CategoryView'
import Panel from 'components/Panel'
import {cateList, categoryList, deleteItem} from '../modules/CategoryReducer'
import {initScreen} from 'common/utils';

class Category extends Component {

  constructor(props) {
    super(props);

    this.getFormCategoryOptions = this.getFormCategoryOptions.bind(this);
    this.getQuickOptions = this.getQuickOptions.bind(this);

    this.toDel = this._del.bind(this);

    this.state = {
      params: initScreen({
        data:{
          categoryType:null
        }
      })
    }
  }

  _del(id, row, display) {
    const {deleteItem} = this.props;
    deleteItem({
      categoryId: id,
      categoryName: row.categoryName,
      display: display
    })
  }

  componentDidMount() {
    const {cateList, categoryList, location} = this.props;
    const {params} = this.state;
    categoryList(params);
    cateList();
  }

  /**
   * (表格功能配置项)
   *
   * @returns (description)
   */
  getFormCategoryOptions() {
    const context = this;
    const {categoryList} = context.props;
    return {
      handleSubmit(value) {
        if(value.newParentId && value.newParentId.length > 0){
            value.parentId = value.newParentId[0];
        }else{
          value.parentId = null;
        }
        context.setState({
          params: value
        });
        /*categoryList({
         pageNum: 1,
         categoryName: value.categoryName,
         categoryType: value.categoryType,
         parentId: value.parentId && value.parentId.length > 0 ? value.parentId[0] : null
         });*/
      },
      handleReset() {
        setTimeout(() => {
          context.setState({
            params: {
              categoryType:null
            }
          })
        });
      }
    }
  }

  getQuickOptions() {
    const contex = this;
    return {
      doUp() {
      },
    }
  }

  render() {
    const {params} = this.state;
    const {cateResult, categoryList, categoryResult, loading} = this.props;
    const tableCategoryOptions = {
      dataSource: categoryResult && categoryResult.length > 0 ? categoryResult[0].list : [],
      action: categoryList,                         //表格翻页时触发的action
      pagination: {
        total: categoryResult && categoryResult.length > 0 ? categoryResult[0].total : ''
      },
      loading,
      params
    }
    /**
     * 分类列表
     * @param lists
     * @returns {*}
     */
    const loop = (lists) => {
      return lists && lists.map(a => {
          return {
            value: a.categoryId + '',
            label: a.categoryName
          }
        })
    }

    return <Panel title=""><CategoryView cateList={loop(cateResult)} getFormCategoryOptions={this.getFormCategoryOptions}
                                         tableCategoryOptions={tableCategoryOptions} toDel={this.toDel} params={params}
    /></Panel>
  }
}


Category.propTypes = {

}

const mapActionCreators = {
  cateList,
  categoryList,
  deleteItem
}


const mapStateToProps = (state) => {
  const {cateResult, categoryResult} = state.category;
  return {cateResult, categoryResult};
}

export default connect(mapStateToProps, mapActionCreators)(Category)
