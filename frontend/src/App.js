import './App.css';
import {
    CalendarOutlined,
    LinkOutlined,
    LoginOutlined,
    LogoutOutlined, MailOutlined,
    ManOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    ShopOutlined,
    UserAddOutlined,
    UserOutlined,
} from '@ant-design/icons';

import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Button, Layout, Menu, message, theme} from "antd";

import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import RegistrationPage from "./pages/Registration";
import LoginPage from "./pages/LoginPage";
import authService from "./services/auth.service";
import {logout} from "./slices/authSlice";
import {NotFoundPage} from "./pages/NotFoundPage";
import ProductsPage from "./pages/ProductPage";
import ClientPage from "./pages/ClientPage";
import {SettingProducts} from "./pages/SettingProductPage";

const {
    Header,
    Sider,
    Content
} = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);

    const isLoginIn = useSelector((state) => state.auth.isLoggedIn);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let isAdmin = false;

    if (isLoginIn && user.roles[0] === "ROLE_ADMIN") {
        isAdmin = true;
    }

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const handleLogOut = () => {
        dispatch(logout(user));
        authService.logout();
        isAdmin = false;
        navigate("/")

        const handleButtonClick = () => {
            setTimeout(() => {
                message.success('Ты успешно покинул тайное место!', 3);
            }, 100);
        };
        handleButtonClick();
        navigate("/")
    }

    function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

    const items = [
        getItem('Profile', 'profile', <UserOutlined/>),
        getItem('Category', 'category', <MailOutlined/>, [
            getItem('Home', null, null, [getItem('Name category 1', '1'), getItem('Name category 2', '2')], 'group'),
            getItem('Work', null, null, [getItem('Name category 1', '3'), getItem('Name category 2', '4')], 'group'),
        ]),
        getItem('Create category', 'create_catalog', <MailOutlined/>),
    ];

    return (
        <Layout className="App">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical"/>

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['2']}
                    style={{
                        fontSize: '14px',
                    }}
                    items={items}
                >
                    <Menu.Item key="0" icon={<ManOutlined/>} disabled>
                        Gachimuchi
                    </Menu.Item>

                    {isLoginIn ?
                        <Menu.Item key="1" icon={<UserOutlined/>}>
                            <NavLink to="/users" activeclassname="active">
                                Клиент
                            </NavLink>
                        </Menu.Item> :
                        ""}

                    {!isLoginIn ?
                        <Menu.Item key="2" icon={<LoginOutlined/>}>
                            <NavLink to="/" activeclassname="active">
                                Войти
                            </NavLink>
                        </Menu.Item> :
                        ""}
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '32px',
                            width: 64,
                            height: 64,
                        }}/>

                    <Button
                        type="primary"
                        icon={<LogoutOutlined />}
                        onClick={handleLogOut}
                        style={{
                            fontSize: '16px',
                            width: 96,
                            height: 35,
                            float: "right",
                            marginRight: 10,
                            marginTop: 10,
                            display: isLoginIn ? "block" : "none"
                        }}
                    >
                        Выйти
                    </Button>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: '100vh',
                        background: colorBgContainer,
                    }}
                >
                    <Routes>
                        <Route index element={<LoginPage/>}/>
                        <Route path="/users" element={<ClientPage/>}/>
                        {/*<Route path="/setting-products" element={<SettingProducts/>}/>*/}
                        {/*<Route path="/product" element={<LoginPage/>}/>*/}
                        <Route path="/register" element={<RegistrationPage/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    )
};
//
// import {MailOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
// import {Menu} from 'antd';
// import {useEffect} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import categoriesService from "./services/categoriesService";
// import {Route, Routes, useNavigate} from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import ClientPage from "./pages/ClientPage";
// import RegistrationPage from "./pages/Registration";
// import {NotFoundPage} from "./pages/NotFoundPage";
// import CategoryPage from "./pages/CategoryPage";
//
// function getItem(label, key, icon, children, type) {
//     return {
//         key,
//         icon,
//         children,
//         label,
//         type,
//     };
// }
//
// const App = () => {
//     const dispatch = useDispatch();
//     const allCategories = useSelector((state) => state.categories.categories);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         categoriesService.getCategories(dispatch);
//     }, []);
//
//     const onClick = (e) => {
//
//         if (e.key === "profile") {
//             console.log('click', e);
//             navigate("/users")
//         } else if (e.key === "create_catalog") {
//             console.log('click', e);
//             navigate("/")
//         }
//     };
//
//     const items = [
//         getItem('Profile', 'profile', <UserOutlined/>),
//         getItem('Category', 'category', <MailOutlined/>, [
//             getItem('Home', null, null, [getItem('Name category 1', '1'), getItem('Name category 2', '2')], 'group'),
//             getItem('Work', null, null, [getItem('Name category 1', '3'), getItem('Name category 2', '4')], 'group'),
//         ]),
//         getItem('Create category', 'create_catalog', <MailOutlined/>),
//     ];
//
//     const newItems = [{
//         key: 10,
//         icon: <SettingOutlined/>,
//         children: null,
//         label: 'Option 12',
//     }
//     ];
//
//     const updatedItems = [...items, ...newItems];
//
//     return (
//         <>
//             <Menu
//                 onClick={onClick}
//                 style={{
//                     width: 256,
//                     height: 1000
//                 }}
//                 mode="vertical"
//                 items={updatedItems}
//                 theme={'dark'}
//             >
//                 <Routes>
//                     <Route index element={<LoginPage/>}/>
//                     <Route path="/users" element={<ClientPage/>}/>
//                     {/*<Route path="/setting-products" element={<SettingProducts/>}/>*/}
//                     {/*<Route path="/product" element={<LoginPage/>}/>*/}
//                     <Route path="/category" element={<CategoryPage/>}/>
//                     <Route path="/register" element={<RegistrationPage/>}/>
//                     <Route path="*" element={<NotFoundPage/>}/>
//                 </Routes>
//             </Menu>
//         </>
//     )
// }

export default App;