import React from 'react';
import Form from 'components/Form';
import {setScreen,clearScreen} from 'common/utils';
import { Icon, Button, Row, Col} from 'antd';

import './Search.less';

export default React.createClass({
    /**
    * 自定义所有搜索按钮onSubmit函数
    * clearScreen 未找到标实 清空所有记录
   */
    getInitialState(){
        const {onSubmit,sign} = this.props;
        let context = this.props;

        let state = {
            onSubmit:function(vals,key){
                onSubmit(...arguments);

                if(key!='reset')
                    return setScreen(vals,sign);

                clearScreen(sign);
            }
        };
        return state;
    },
    render() {
        const {loading} = this.props;

        const buttonOption = {
            col: false,
            span : '4',
            buttons: [
                {
                    name : '搜索',
                    icon : 'search',
                    type : 'primary',
                    loading : loading
                },
                {
                    name : '重置',
                    key : 'reset'
                },
            ]
        };
        return <Form submitAfterReset prefixCls="search-box" ref="form" buttonOption={buttonOption} inline {...this.props} {...this.state} resetNumber={{ pageNum: 1 }} />
    }
});
