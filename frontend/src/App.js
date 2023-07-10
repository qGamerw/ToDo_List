import './App.css';
// import {LogoutOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined,} from '@ant-design/icons';
// import React, {useEffect, useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {Button, Card, Col, Input, Layout, Menu, message, theme} from "antd";
// import {useNavigate} from "react-router-dom";
// import authService from "./services/auth.service";
// import {logout} from "./slices/authSlice";
// import categoriesService from "./services/categoriesService";
// import logo from "./imgs/products.jpg";
// import Meta from "antd/es/card/Meta";
// const {
//     Header,
//     Sider,
//     Content
// } = Layout;
// const App = () => {
//     const [collapsed, setCollapsed] = useState(false);
//
//     const isLoginIn = useSelector((state) => state.auth.isLoggedIn);
//     const user = useSelector((state) => state.auth.user);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//
//     let isAdmin = false;
//
//     if (isLoginIn && user.roles[0] === "ROLE_ADMIN") {
//         isAdmin = true;
//     }
//
//     const {
//         token: {colorBgContainer},
//     } = theme.useToken();
//
//     const allProducts = useSelector((state) => state.categories.categories);
//
//     useEffect(() => {
//         categoriesService.getCategories(dispatch);
//     }, []);
//
//     const handleLogOut = () => {
//         dispatch(logout(user));
//         authService.logout();
//         isAdmin = false;
//         navigate("/")
//
//         const handleButtonClick = () => {
//             setTimeout(() => {
//                 message.success('Ты успешно покинул тайное место!', 3);
//             }, 100);
//         };
//         handleButtonClick();
//         navigate("/")
//     }
//
//     function getItem(label, key, icon, children, type) {
//         return {
//             key,
//             icon,
//             children,
//             label,
//             type,
//         };
//     }
//
//     const ff = () => {
//         return allProducts.map(item => {
//             return (
//                 {
//                     label: item.name,
//                     key: item.id+1
//                 }
//             );
//         });
//     }
//
//     const items = [
//         getItem('Profile', 'profile', <UserOutlined/>),
//         getItem('Category', 'category', <MailOutlined/>, [
//             getItem('Home', null, null, [ff()], 'group'),
//
//         ]),
//         getItem('Create category', 'create_catalog', <MailOutlined/>),
//     ];
//
//     return (
//         <Layout className="App">
//             <Sider trigger={null} collapsible collapsed={collapsed}>
//                 <div className="demo-logo-vertical"/>
//
//                 <Menu
//                     theme="dark"
//                     mode="inline"
//                     defaultSelectedKeys={['2']}
//                     style={{
//                         fontSize: '14px',
//                     }}
//                     items={items}
//                 />
//             </Sider>
//             <Layout>
//                 <Header
//                     style={{
//                         padding: 0,
//                         background: colorBgContainer,
//                     }}
//                 >
//                     <Button
//                         type="text"
//                         icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
//                         onClick={() => setCollapsed(!collapsed)}
//                         style={{
//                             fontSize: '32px',
//                             width: 64,
//                             height: 64,
//                         }}/>
//
//                     <Button
//                         type="primary"
//                         icon={<LogoutOutlined/>}
//                         onClick={handleLogOut}
//                         style={{
//                             fontSize: '16px',
//                             width: 96,
//                             height: 35,
//                             float: "right",
//                             marginRight: 10,
//                             marginTop: 10,
//                             display: isLoginIn ? "block" : "none"
//                         }}
//                     >
//                         Выйти
//                     </Button>
//                 </Header>
//                 <Content
//                     style={{
//                         margin: '24px 16px',
//                         padding: 24,
//                         minHeight: '100vh',
//                         background: colorBgContainer,
//                     }}
//                 >
//                     {/*<Routes>*/}
//                     {/*    <Route index element={<LoginPage/>}/>*/}
//                     {/*    <Route path="/users" element={<ClientPage/>}/>*/}
//                     {/*    /!*<Route path="/setting-products" element={<SettingProducts/>}/>*!/*/}
//                     {/*    /!*<Route path="/product" element={<LoginPage/>}/>*!/*/}
//                     {/*    <Route path="/register" element={<RegistrationPage/>}/>*/}
//                     {/*    <Route path="*" element={<NotFoundPage/>}/>*/}
//                     {/*</Routes>*/}
//                 </Content>
//             </Layout>
//         </Layout>
//     )
// };
//
// import {MailOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
// import {Menu} from 'antd';
// import {useEffect} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import categoriesService from "./services/categoriesService";
// import {Route, Routes, useNavigate} from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import RegistrationPage from "./pages/Registration";
// import {NotFoundPage} from "./pages/NotFoundPage";
// import SettingProducts from "./pages/SettingProductPage";
// import ClientPage from "./pages/ClientPage";
//
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
// const App1 = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const allProducts = useSelector((state) => state.categories.categories);
//     const isLoginIn = useSelector((state) => state.auth.isLoggedIn);
//
//     useEffect(() => {
//         categoriesService.getCategories(dispatch);
//     }, []);
//
//     const onClick = (e) => {
//
//         if (e.key === "profile") {
//             console.log('click', e);
//             navigate("/")
//         } else if (e.key === "create_catalog") {
//             console.log('click', e);
//             navigate("/")
//         }
//     };
//     const getUserCategory = () => {
//         return allProducts.map(item => {
//             return (
//                 {
//                     key: item.id,
//                     icon: <SettingOutlined/>,
//                     children: null,
//                     label: item.name,
//                 }
//             );
//         });
//     }
//
//     const items = [
//         getItem('Profile', 'profile', <UserOutlined/>),
//         getItem('Категории', 'category', <MailOutlined/>, [
//             getItem('Личное', null, null, [
//                 getItem('Дом', '1.01'),
//                 getItem('Семья', '2.01'),
//                 getItem('Досуг', '3.01')
//             ], 'group'),
//             getItem('Работа', null, null, [
//                 getItem('Дела до работы', '1.01'),
//                 getItem('На работе', '2.01'),
//                 getItem('После работе', '3.01')
//             ], 'group'),
//             getItem('Пользовательские группы', null, null, [...getUserCategory()], 'group'),
//         ]),
//         getItem('Создать категорию', 'create_catalog', <MailOutlined/>),
//     ];
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
//                 items={items}
//                 theme={'dark'}
//             />
//
//             { isLoginIn? <LoginPage/> : <LoginPage/> }
//
//
//         </>
//     )
// }
import {
    AppstoreAddOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    RestOutlined,
    SettingOutlined,
    UserOutlined
} from '@ant-design/icons';
import {Button, Form, Input, Layout, Menu, Modal, theme} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useNavigate} from "react-router-dom";
import categoriesService from "./services/categoriesService";
import {NotFoundPage} from "./pages/NotFoundPage";
import RegistrationPage from "./pages/Registration";
import LoginPage from "./pages/LoginPage";
import authService from "./services/auth.service";
import {logout} from "./slices/authSlice";


const {Header, Content, Footer, Sider} = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allProducts = useSelector((state) => state.categories.categories);
    const isLoginIn = useSelector((state) => state.auth.isLoggedIn);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const user = useSelector((state) => state.auth.user);

    const openModalCreateCategory = () => {
        setModalVisible(true);
    };

    useEffect(() => {
        categoriesService.getCategories(dispatch);
    }, []);

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const getUserCategory = () => {
        return allProducts.map(item => {
            return (
                {
                    key: item.id,
                    icon: <SettingOutlined/>,
                    children: null,
                    label: item.name,
                }
            );
        });
    }

    const items = [
        (isLoginIn? getItem('Профиль', 'profile', <UserOutlined/>) : null),
        (isLoginIn? getItem('Все задачи', 'all-task-category', <CheckCircleOutlined/>) : null),
        (isLoginIn? getItem('Категории', 'category', <CalendarOutlined/>, [
            getItem('Личное', null, null, [
                getItem('Дом', '1.01'),
                getItem('Семья', '2.01'),
                getItem('Досуг', '3.01')]
                    , 'group'),
            getItem('Работа', null, null, [
                getItem('Дела до работы', '4.01'),
                getItem('На работе', '5.01'),
                getItem('После работе', '6.01')
            ], 'group'),
            getItem('Пользовательские группы', null, null, [...getUserCategory()], 'group'),
        ]): null),
        (isLoginIn? getItem('Создать категорию', 'create_catalog', <AppstoreAddOutlined/>) : null),
        (isLoginIn? getItem('Архив', 'all-task', <RestOutlined/>) : null),
        getItem((isLoginIn ? 'Выйти' : "Войти"), 'sign', <AppstoreAddOutlined/>),
    ];

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const onClick = (e) => {
        if (e.key === "profile") {
            console.log('click', e);
            navigate("/user")
        } else if (e.key === "create_catalog") {
            console.log('click', e);
            openModalCreateCategory();
        } else if (e.key === "sign") {
            if (!isLoginIn){
                console.log('click', e);
                navigate("/")
            } else {
                dispatch(logout(user));
                authService.logout();
            }

        } else if (e.keyPath[2] === "category") {
            console.log('click', e);
            navigate("/category/" + e.key);
        }

    };

    const onFinish = (values) => {
        categoriesService.createCategory(values, dispatch);
        setModalVisible(false);
        form.resetFields();
    };


    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark"
                      defaultSelectedKeys={['1']}
                      mode="vertical"
                      items={items}
                      onClick={onClick}
                      onCancel={() => setModalVisible(false)}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >

                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        <Routes>
                            <Route index element={<LoginPage/>}/>
                            {/*<Route path="/setting-products" element={<SettingProducts/>}/>*/}
                            <Route path="/product" element={<LoginPage/>}/>
                            <Route path="/register" element={<RegistrationPage/>}/>
                            <Route path="*" element={<NotFoundPage/>}/>
                        </Routes>
                    </div>

                    <Modal
                        title="Создать категорию"
                        open={modalVisible}
                        onCancel={() => setModalVisible(false)}
                        footer={[
                            <Button key="cancel" onClick={() => setModalVisible(false)}>
                                Отмена
                            </Button>,
                            <Button key="submit" type="primary" onClick={() => form.submit()}>
                                Создать категорию
                            </Button>,
                        ]}
                    >
                        <Form form={form} onFinish={onFinish}>
                            <Form.Item name="name" label="Имя" rules={[{required: true, message: 'Введите имя'}]}>
                                <Input/>
                            </Form.Item>
                        </Form>
                    </Modal>

                </Content>

                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;