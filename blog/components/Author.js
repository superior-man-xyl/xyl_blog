import {Avatar,Divider,Popover,Button,Card} from 'antd';
import {GithubOutlined,WechatOutlined,QqOutlined} from '@ant-design/icons'

const Author=()=>{
    const {Meta} = Card;
    const content_1= (
        <Button type="primary" onClick={()=>{window.open("https://github.com/superior-man-xyl") }}>GitHub</Button>
    )
    const content_2= (
        <Card
        hoverable
        style={{ width: 200 }}
        cover={<img alt="微信二维码" src="../static/images/weixin.jpg" />}
      >
        <Meta title="微信二维码" description="扫码加好友" />
      </Card>
    )
    const content_3= (
        <Card
        hoverable
        style={{ width: 200 }}
        cover={<img alt="QQ二维码" src="../static/images/QQ.jpg" />}
      >
        <Meta title="QQ二维码" description="扫码加好友" />
      </Card>
    )
    const content_4= (
        <Button type="primary" onClick={()=>{window.open("https://juejin.cn/user/2462537381852910") }}>掘金</Button>
    )
    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src="../static/images/Avater.jpg" onContextMenu={(e)=>{e.preventDefault(); alert('调用右键菜单失败，请检查浏览器版本是否最新！');/**用于禁止默认的右键菜单，以防止查看图片 */}}/></div>
            <div>吃蟹黄的Thilo</div>
            <div className="author-introduction">
            蟹黄吃到饱，前端搞的好，一个梦想能吃蟹黄吃到饱的前端程序员
            </div>
            <Divider>社交账号</Divider>
            <Popover content={content_1} trigger="click">
            <Avatar size={28} icon={<GithubOutlined />} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} className="account"  />
            </Popover>
            <Popover content={content_2} trigger="click">
            <Avatar size={28} icon={<WechatOutlined />} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} className="account" />
            </Popover>
            <Popover content={content_3} trigger="click">
            <Avatar size={28} icon={<QqOutlined />} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} className="account"  />
            </Popover>
            <Divider>博客社区账号</Divider>
            <Popover content={content_4} trigger="click">
            <div className='juejingIcon'><img src="../static/images/juejing.png" /></div>
            </Popover>
        </div>
    );
}
export default Author;