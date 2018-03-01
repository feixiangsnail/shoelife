import React, {PropTypes, Component} from 'react'
import {Tree} from 'antd'
const TreeNode = Tree.TreeNode;
let key = 0;
class Trees extends Component {
  loop(data){
    let html =  data.map((item) => {
      key++;
      if (item.mode && item.mode.length) {
        return <TreeNode key={item.styleId || key} title={item.styleName||item.styleCode||item.modeEnName||item.modeCode}>{this.loop(item.mode)}</TreeNode>;
      }
      return <TreeNode key={item.styleId || key} title={item.styleName||item.styleCode||item.modeEnName||item.modeCode} />;
    });
    return html;
  }

  render(){
    let {data,expandedKeys} = this.props.config;
    if(!data) return <div></div>;
    return (
        <Tree defaultExpandedKeys={expandedKeys} >
          {this.loop(data)}
        </Tree>
    )
  }
}
Trees.contextTypes = {
    props: React.PropTypes.object
}

export default Trees;
