import {Button, Form, Input, message, Select,} from 'antd';
import authService from "../services/auth.service";
import {useNavigate} from "react-router-dom";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";

const {} = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const RegistrationPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = (values) => {
        authService.register(values)

        const handleButtonClick = () => {
            setTimeout(() => {
                message.success('Приветствую, юный cum-ван!', 3);
            }, 100);
        };
        handleButtonClick();
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            className="login-form"
            onFinish={onFinish}
            style={{
                padding: '20px 50px',
                width: '30%',
                justifyContent: 'center'
            }}
            scrollToFirstError
        >
            <Form.Item
                name="username"
                label="Логин"
                rules={[
                    {
                        required: true,
                        whitespace: true,
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon"/>}
                    placeholder="Username"/>
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'Введите email!',
                    },
                    {
                        required: true,
                        message: 'Введите email!',
                    },
                ]}
            >
                <Input prefix={<MailOutlined  className="site-form-item-icon"/>}
                       placeholder="E-mail"
                />
            </Form.Item>

            <Form.Item
                name="password"
                label="Пароль"
                rules={[
                    {
                        required: true,
                        message: 'Введите пароль!',
                    },
                ]}
                hasFeedback
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Зарегистрироваться
                </Button>

                <Button type="link" htmlType="button" onClick={() => {navigate("/")}}>
                    Войти
                </Button>

            </Form.Item>
        </Form>
    );
};
export default RegistrationPage;