import './App.css';
import {
    AppstoreAddOutlined,
    AppstoreOutlined,
    CheckCircleOutlined,
    LoginOutlined,
    LogoutOutlined,
    RestOutlined,
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
import AllTaskPage from "./pages/AllTaskPage";
import TaskPage from "./pages/TaskPage";
import statusService from "./services/statusService";
import priorityService from "./services/priorityService";
import ClientPage from "./pages/ClientPage";
import ArchivePage from "./pages/ArchivePage";

const {Header, Content, Footer, Sider} = Layout;


const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userCategory = useSelector((state) => state.categories.categories);
    const isLoginIn = useSelector((state) => state.auth.isLoggedIn);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const user = useSelector((state) => state.auth.user);

    const openModalCreateCategory = () => {
        setModalVisible(true);
    };

    if (isLoginIn) {
        statusService.getAllStatus(dispatch);
        priorityService.getAllPriority(dispatch);
    }

    useEffect(() => {
        if (isLoginIn) {
            categoriesService.getCategories(dispatch);
        }
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
        return userCategory.filter(item => item.name !== "Архив").map(item => {
            return (
                {
                    key: item.id,
                    children: null,
                    label: item.name,
                }
            );
        });
    }

    const items = [
        (isLoginIn ? getItem('Профиль', 'profile', <UserOutlined/>) : null),
        (isLoginIn ? getItem('Все задачи', 'all-task-category', <CheckCircleOutlined/>) : null),
        (isLoginIn ? getItem('Категории', 'category', <AppstoreOutlined/>, [...getUserCategory(),
            getItem('Создать', 'create_catalog', <AppstoreAddOutlined/>)],) : null),
        (isLoginIn ? getItem('Архив', 'all-task', <RestOutlined/>) : null),
        (isLoginIn ? getItem('Выйти', 'sign', <LogoutOutlined/>) :
            getItem('Войти', 'sign', <LoginOutlined/>)),
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
            if (!isLoginIn) {
                console.log('click', e);
                navigate("/api/auth/signin")
            } else {
                dispatch(logout(user));
                authService.logout();
                navigate("/api/auth/signin")
            }
        } else if (e.keyPath[1] === "category") {
            console.log('click', e);
            const id = e.key;
            navigate("/category/" + id);
        } else if (e.key === "all-task-category") {
            console.log('click', e);
            navigate("/all-task");
        } else if (e.key === "all-task") {
            console.log('click', e);
            navigate("/archive");
        }

        console.log(e)
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
                      defaultSelectedKeys={['2']}
                      mode="inline"
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
                            <Route index element={<AllTaskPage/>}/>
                            <Route path="/api/auth/signin" element={<LoginPage/>}/>
                            <Route path="/api/auth/signup" element={<RegistrationPage/>}/>
                            <Route path="/all-task" element={<AllTaskPage/>}/>
                            <Route path="/category/*" element={<TaskPage/>}/>
                            <Route path="/archive" element={<ArchivePage/>}/>
                            <Route path="/user" element={<ClientPage/>}/>

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
                            <Form.Item name="name" label="Название категории"
                                       rules={[{required: true, message: 'Введите имя'}]}>
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