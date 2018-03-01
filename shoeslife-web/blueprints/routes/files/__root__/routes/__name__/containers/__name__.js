import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import <%= pascalEntityName %>View from '../components/<%= pascalEntityName %>View'
import Panel from 'components/Panel'
import {queryList, addItem, modifyItem, deleteItem} from '../modules/<%= pascalEntityName %>Reducer'

class <%= pascalEntityName %> extends Component {

    constructor(props) {
        super(props);
        <% if (hasSearch === 'true' || type === 'form') { %>
        this.getFormOptions = this.getFormOptions.bind(this);
        <% } %>
        <% if (hasQuickButton === 'true') { %>
        this.getQuickOptions = this.getQuickOptions.bind(this);
        <% } %>
        this.state = {
            params: {}
        }
    }

    componentDidMount() {
        <% if (type === 'table') { %>
        const {queryList, location} = this.props;
        const {query} = location;
        let pageNum = query.p ? Number(query.p) : 1;
        queryList({ pageNum });
        <% } %>
    }
    <% if (hasSearch === 'true' || type === 'form') { %>

      getFormOptions() {
          const context = this;
          return {
              handleSubmit(value) {
                  context.setState({
                      params: value
                  })
              },
              handleReset() {
              }
          }
      }
    <% } %>
    <% if (hasQuickButton === 'true') { %>
      getQuickOptions(){
          const contex = this;
          return {
              doUp() {
              },
          }
      }
    <% } %>
    <% if (type === 'table') { %>
    handleRowSelection() {
        return {
            onSelect(record, selected, selectedRows) {
            },
            onSelectAll(selected, selectedRows, changeRows) {
            },
        }
    }
    <% } %>
    render() {
        const {params} = this.state;
        <% if (type === 'table') { %>
        const {list, queryList, total, loading} = this.props;
        const tableOptions = {
            dataSource : list,
            action : queryList,
            pagination : {
                total : total
            },
            loading,
            params,
            rowSelection : this.handleRowSelection()
        }
        <% }else{ %>
           const {loading, result} = this.props;
           const formOptions = {
              loading,
              result,
              'formOptions' : this.getFormOptions()
           }
        <% } %>
        <% if (hasSearch === 'true' && type !== 'form'){  %>
        const formOptions = {
            'formOptions' : this.getFormOptions()
        }
        <% } %>
        return <Panel title=""><<%= pascalEntityName %>View <% if (type === 'table') { %>{...tableOptions}<% } %><% if (hasSearch === 'true' || type === 'form') { %> {...formOptions}<% } %><% if (hasQuickButton === 'true') { %> quickOptions={this.getQuickOptions()} <% } %> /></Panel>
    }
}


<%= pascalEntityName %>.propTypes = {
    <% if (type === 'table') { %>
    queryList: React.PropTypes.func,
    list: React.PropTypes.array.isRequired,
    total: React.PropTypes.number.isRequired,
    <% }else{ %>
    result: React.PropTypes.object,
    deleteItem: React.PropTypes.func,
    modifyItem: React.PropTypes.func,
    addItem : React.PropTypes.func,
    <% } %>
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    queryList,
    deleteItem,
    modifyItem,
    addItem
}


const mapStateToProps = (state) => {
    const {result, loading} = state.<%= camelEntityName %>;
    <% if (type === 'table') { %>
    //const {list = [], total} = result[0] || {};
    let list = [],total = 0;
    if(result instanceof Array){
      list = result[0].list;
      total = result[0].total;
    }
    return { list, total, loading };
    <% }else{ %>
    return { 'result' : result, loading };
    <% } %>
}

export default connect(mapStateToProps, mapActionCreators)(<%= pascalEntityName %>)

