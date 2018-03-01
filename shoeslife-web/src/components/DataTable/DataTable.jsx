import React, {Component, PropTypes} from 'react';
import {Table} from 'antd';
import {isEqual,setScreen} from 'common/utils';

/**
 * (description)
 *
 * @class DataTable
 * @extends {Component}
 */
class DataTable extends Component {

    /**
     * Creates an instance of DataTable.
     *
     * @param props (description)
     */
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            selectedRowKeys: [],
            table:{}
        }
        this.refresh = this.refresh.bind(this);
    }

    /**
     * (description)
     */
    refresh() {
        setTimeout(() => { this.requestData() }, 50);
    }

    /**
     * (description)
     *
     * @returns (description)
     */
    getCurrentPage() {
        const {location} = this.context.props;
        const {p} = location.query;
        return Number(p) || 1;
    }
    /**
     * (description)
     *
     * @param param (description)
     * @param current (description)
     */
    requestData(param, current) {

        const {location} = this.context.props;
        const {action, params,sign} = this.props;
        if (current) {
            params && params.pageNum && delete params.pageNum;
        }

        setTimeout(()=>{
            let data = Object.assign({
                pageNum: current || this.getCurrentPage(),
                pageSize : this.state.pageSize
            }, param || params);

            action(data);
            //多个表格 初始化分页时 使用记录值 容易产生BUG 后面修改
            if(!sign)
              setScreen(data);
            this.setState({
                selectedRowKeys: []
            })
        },10);
    }

    componentDidMount() {
        this.setState({ current: this.getCurrentPage() })
    }

    componentWillUnmount() {

    }
    /**
    * 搜索后跳转第一页
    */
    resetPage(){
      let props = this.state.table.context.props;
      const {location, router} = props;
      router.push({...location, query:{ p: 1 }});
    }

    /**
    * 是否接收到新的属性，来确定是否需要重新获取数据
    * @param  {any} nextProps
    */
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps, this.props);
        if (!isEqual(nextProps.params, this.props.params)) {
            //if(!isEqual(nextProps,this.props)){
            if ((nextProps.params && nextProps.params.pageNum)) {
                let pageNum = nextProps.params.pageNum;
                const {location,router} = this.context.props
                this.setState({
                    current: pageNum
                });
                router.push({...location, query : { p: pageNum }});
            }
            this.resetPage();
            this.requestData(nextProps.params);
        }
    }

    /**
     * row key
     * @param  {any} record
     * @param  {any} index
     */
    _rowKey(record, index) {

        return index
    }

    /**
    * 当点击分页页码的时候触发
    * @param  {any} currentPage
    */
    _onPaginationChange(pagination, filters, sorter) {
        const {location, router} = this.context.props;
        const {current} = pagination;
        router.push({...location, query:{ p: current }});
        this.requestData(null, current);
        this.setState({
            current
        })
    }

    getQuickButton(quickButton){
       return  <div style={{paddingBottom:15}}>{quickButton}</div>
    }

    onShowSizeChange(current, pageSize){
        this.setState({
            pageSize
        });
    }

    render(){
        let tableProps;
        let {selectedRowKeys} = this.state;
        let {rowSelection, pagination, action, quickButton, ...other} = this.props;
        this.state.table = this;

        if (rowSelection) {
            tableProps = {
                rowSelection: {
                    selectedRowKeys,
                    onChange: (selectedRowKeys) => {
                        this.setState({
                            selectedRowKeys
                        })
                    },
                        ...rowSelection
                },
                    ...other
            }
        }else{
            tableProps = {
                ...other
            }
        }

        if(pagination){
            pagination =  {
                current: this.getCurrentPage(),
                showQuickJumper : true,
                showSizeChanger : false,
                showTotal : () => `共 ${pagination.total} 条`,
                onShowSizeChange : this.onShowSizeChange.bind(this),
                ...pagination
            };
        }else{
            pagination = false;
        }
        return <div>
            {quickButton ? this.getQuickButton(quickButton) : ''}
            <Table  rowKey={this._rowKey} pagination={pagination} {...tableProps} onChange={this._onPaginationChange.bind(this) } />
        </div>
    }
}

DataTable.propTypes = {
    action : React.PropTypes.func,
    params : React.PropTypes.object,
    pagination: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object
    ])
}

DataTable.contextTypes = {
    props: React.PropTypes.object
}

export default DataTable;
