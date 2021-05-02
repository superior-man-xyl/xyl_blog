import React,{useState} from 'react';
import {Card,Input,Button,Spin} from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import '../static/css/Login.css'

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2524706_srtt7ikn6b.js'
  ],
});

function Login(){

    const [userName,setUserName] = useState('');
    const [passWord,setPassWord] = useState('');
    const [isLoading,setInLoading] = useState(false);

    const checkLogin=()=>{
        setInLoading(true)
        setTimeout(()=>{
            setInLoading(false)//1秒后加载结束,取消加载状态
        },1000)
    }

    return (
        <div className="login-div">
            <Spin tip="Loadin..." spinning={isLoading}>
                <Card title="蟹黄同学的博客后台" bordered={true} style={{width:400}}>
                    <Input 
                         id="userName"
                         size="large"
                         placeholder="Enter your userName"
                         prefix={<IconFont type="icon-my" style={{color:'rgba(0,0,0,.25)'}} />}
                         onChange={(e)=>{setUserName(e.target.value)}}
                    />
                    <br/><br/>
                    <Input.Password
                         id="password"
                         size="large"
                         placeholder="Enter your password"
                         prefix={<IconFont type="icon-mima" style={{color:'rgba(0,0,0,.25)'}} />}
                         onChange={(e)=>{setPassWord(e.target.value)}}
                    />
                    <br/><br/>

                    <Button type="primary" size="large" block onClick={checkLogin}>Login in</Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login;