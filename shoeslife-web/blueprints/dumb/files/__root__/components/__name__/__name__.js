import React, {Component, PropTypes} from 'react';
import {Button, Icon} from 'antd';
<%if (type !== 'less') {%>
class <%= pascalEntityName %> extends Component {
    constructor(props){
        super(props);
        this.state ={}
    }
  
    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }
    
    componentWillReceiveProps(nextProps, preProps) {
      
    }
    
    render(){
      return <div>111</div>
    }
}

<%= pascalEntityName %>.propTypes = {
   
}

<%= pascalEntityName %>.defaultProps = {
   
}
<% }else{ %>
export const <%= pascalEntityName %> = (props) => {
    
    return <div><%= pascalEntityName %></div>
}
<% } %>
export default <%= pascalEntityName %>;