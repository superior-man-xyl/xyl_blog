import {Avatar,Divider} from 'antd';
import {GithubOutlined,WechatOutlined,QqOutlined} from '@ant-design/icons'

const Author=()=>{
    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src="../static/images/Avater.jpg" /></div>
            <div>蟹黄饱</div>
            <div className="author-introduction">
            蟹黄吃到饱，前端搞的好，一个梦想能吃蟹黄吃到饱的前端程序员
            </div>
            <Divider>社交账号</Divider>
            <Avatar size={28} icon={<GithubOutlined />} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} className="account"  />
            <Avatar size={28} icon={<WechatOutlined />} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} className="account" />
            <Avatar size={28} icon={<QqOutlined />} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} className="account"  />
        </div>
    );
}
export default Author;