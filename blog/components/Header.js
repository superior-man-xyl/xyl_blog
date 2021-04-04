import React from 'react';
import {Row,Col,Menu} from 'antd';
import {VideoCameraOutlined,HomeFilled,SmileOutlined} from '@ant-design/icons'
import MenuItem from 'antd/lib/menu/MenuItem';
import 'antd/dist/antd.css';

const Header=()=>(
    <div className="header">
        <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <span className="header-logo">谢永良</span>
                <span className="header-txt">专注于前端技术分享</span>
            </Col>
            <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal">
                    <MenuItem key="home">
                    <HomeFilled />
                        首页
                    </MenuItem>
                    <MenuItem key="video">
                    <VideoCameraOutlined />
                        视频
                    </MenuItem>
                    <MenuItem key="life">
                    <SmileOutlined />
                        生活
                    </MenuItem>
                </Menu>
            </Col>
        </Row>
    </div>
)

export default Header;