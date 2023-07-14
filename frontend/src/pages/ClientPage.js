import {useDispatch, useSelector} from "react-redux";
import {Avatar, Descriptions} from "antd";
import React from "react";
import logo from '../imgs/avatarjpg.jpg';

export const Clients = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    console.log(user);

    return (
        <>
            <Avatar
                size={{
                    xs: 14 * 2,
                    sm: 32 * 2,
                    md: 40 * 2,
                    lg: 64 * 2,
                    xl: 80 * 2,
                    xxl: 100 * 2,
                }}
                src={logo}
                alt="avatar"
                style={{marginLeft: 10, marginTop: -20}}
            />
            <Descriptions title="Информация о клиенте">
                <Descriptions.Item label="Имя">{user.username}</Descriptions.Item>
                <Descriptions.Item label="Email" span={3}>{user.email}</Descriptions.Item>

            </Descriptions>
            <br/>
        </>
    );
}

export default Clients;