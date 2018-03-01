import React, {Component, PropTypes} from 'react';
import DataTable from 'components/DataTable';
import {message, Input} from 'antd';
class Sort extends Component {
  _getColumns() {
    const context = this;
    const {item} = context.props;
    let columns = [{
      key: '0',
      title: '手动排序',
      dataIndex: 'sortWeight',
      render(key, row){
        return <Input name='sortWeight' value={key} onChange={(e) => {
          if (!(/^[a-zA-Z0-9]{1,4}$/.test(e.target.value))) {
            message.warning('请输入4位以内的数字');
            return false
          }
          item.forEach((val, index) => {
            if (row.id == val.id) {
              item[index].sortWeight = e.target.value
            }
          })
          context.setState({
            item
          })
        }}/>
      },
      width: '200px'
    }, {
      key: '1',
      title: '合集名称',
      dataIndex: 'name'
    }];
    return columns;
  }

  render() {
    const {sortTableOptions} = this.props;
    return (
      <div>
        <DataTable bordered={true} columns={this._getColumns()} {...sortTableOptions} />
      </div>
    )
  }
}


Sort.propTypes = {}


export default Sort;
