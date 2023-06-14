import React, { useState } from 'react';
import {
    AppstoreAddOutlined,
    DollarCircleOutlined,
    DownOutlined,
    ExceptionOutlined,
    HeartTwoTone,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown, Space, message, Avatar } from 'antd';

import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,

} from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { callLogout } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doLogoutAction } from '../../../redux/account/accountSlice';
import TaBle from './Table';

const { Header, Content, Footer, Sider } = Layout;

const items = [
    {
        label: <Link to='/admin'>Dashboard</Link>,
        key: 'dashboard',
        icon: <AppstoreAddOutlined />
    },
    {
        label: <span>Manage User</span>,
        icon: <UserOutlined />,
        children: [
            {
                label: <Link to='/admin/user'>CRUD</Link>,
                key: 'crud',
                icon: <TeamOutlined />

            },
            {
                label: 'File1',
                key: 'file1',
                icon: <TeamOutlined />
            }



        ]
    },
    {
        label: <Link to='/admin/book'>Manage Books</Link>,
        key: 'book',
        icon: <ExceptionOutlined />
    },
    {
        label: <Link to='/admin/order'>Manage Orders</Link>,
        key: 'order',
        icon: <DollarCircleOutlined />
    }
];
const BookTable = () => {



    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.account.user)

    const handLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/')
        }
    }

    const itemsDropdown = [
        {
            label: <label style={{ cursor: 'pointer' }}>Quản lí tài khoản</label>,
            key: 'account',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },

    ];

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;

    return (
        <Layout style={{ minHeight: '100vh' }} className='layout-admin'>
            <Sider
                theme="light"
                collapsible collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                    Admin
                </div>
                <Menu defaultSelectedKeys={activeMenu}
                    mode="inline"
                    items={items}
                    onClick={(e) => setActiveMenu(e.key)} />
            </Sider>
            <Layout>
                <div className='admin-header'>
                    <span >
                        {
                            React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => setCollapsed(!collapsed),
                            })}

                    </span>
                    <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <Avatar src={urlAvatar} />
                                {user?.fullName}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
                <Content>
                    <span className='ok'>
                        <TaBle />
                    </span>
                    <Outlet />
                </Content>
                <Footer style={{ padding: 0 }}>
                    React Test Fresher &copy; Nguyen Thanh Dat - Made with <HeartTwoTone />
                </Footer>

            </Layout>

        </Layout>
    );
};



export default BookTable