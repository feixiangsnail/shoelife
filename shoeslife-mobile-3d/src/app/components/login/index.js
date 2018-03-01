import './css.less';
import { Toast } from 'mint-ui';
import {urlData} from '../../common/utils.js';

export default{
    data(){
        return {
            mobile:'',
            codeVal:'获取验证码',
            securityCode:'',
            time:0
        }
    },
    created() {
        var code = urlData('code');
        if(code){
            let href = window.location.href,
                route = href.match(/#(\S*)/)[1],
                reset = href.split('?')[0]+'#'+route
            ;
            this.$http.g({ name: 'wxLogin', id:code }).then((d) => {
                window.location.href = reset;
            }).catch((d)=>{
                window.location.href = reset;
            });
        }
    },
    computed:{
        isPhone(){
            if(this.mobile.length!=11){
                Toast('手机号码应为11位');
                return false;
            }
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.mobile))){ 
                Toast('手机号码格式错误');
                return false; 
            }  
            return true; 
        },
        isCode(){
            if(this.securityCode.length!=4){
                Toast('验证码应为4位');
                return false;
            }
            return true; 
        },
        isLoad(){
            if(this.mobile.length==11&&this.securityCode.length==4) return 'acc';
        }
    },
    methods:{
        code(){
            var self = this;
            if( self.codeVal!='获取验证码' ) return;
            if(!this.isPhone) return;
            this.$http.p('securityCode',{mobile:this.mobile}).then((d) => {
                Toast('验证码发送成功');
                var time = 90;
                var inter = setInterval(()=>{
                    if(!time){ 
                        clearInterval(inter);
                        self.codeVal = '获取验证码'
                        return;    
                    }
                    self.codeVal = --time+'s后重新发送';
                },1000);
            })
        },
        signIn(){
            
            if(!this.isLoad) return;
            if(!this.isPhone) return;
            if(!this.isCode) return;
            this.$http.p('login',
                {
                    mobile:this.mobile,
                    securityCode:this.securityCode
                }).then((d) => {
                    this.close();
                    Toast('登录成功');
            });
        },
        valiPhone(){
            if(this.mobile.length>11){
                this.mobile = this.mobile.substring(0,11);
            }
        },
        valiCode(){
            if(this.securityCode.length>4){
                this.securityCode = this.securityCode.substring(0,4);
            }
        },
        close(){
            this.$store.commit('upSing',false);
        }
    }
}