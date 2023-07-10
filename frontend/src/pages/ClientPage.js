import {useSelector} from "react-redux";
import {Avatar, Descriptions} from "antd";
import React from "react";
import logo from '../imgs/avatarjpg.jpg';

export const Clients = () => {
    const client = useSelector((state) => state.auth.user);

    return (
        <>
            <Avatar
                size={{
                    xs: 24 * 2,
                    sm: 32 * 2,
                    md: 40 * 2,
                    lg: 64 * 2,
                    xl: 80 * 2,
                    xxl: 100 * 2,
                }}
                src={logo}
                alt={"Van"}
                style={{marginLeft: 10, marginTop: -20}}
            />
            <Descriptions title="Информация о клиенте">
                <Descriptions.Item label="Имя">{client.username} "Ван Даркхолм"</Descriptions.Item>
                <Descriptions.Item label="Телефон">1810000000</Descriptions.Item>
                <Descriptions.Item label="Email" span={3}>{client.email}</Descriptions.Item>
                <Descriptions.Item label="О себе">Также известный как <br/>
                    TDN Косуги (TDNコスギ),
                    Ван-сама (VAN様),<br/>
                    Тёмная фея (闇の妖精),<br/>
                    М@СТЕР БОНДАЖА (ボンデージマスター),<br/>
                    Тонг Дарк Вэй (佟 dark 为),<br/>
                    Мастер бондажа<br/>
                </Descriptions.Item>
                <Descriptions.Item label="Регион доставки">Вьетнам</Descriptions.Item>
                <Descriptions.Item label="Адресс">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, Vietnam
                </Descriptions.Item>
                <Descriptions.Item label="Режим доступа аккаунта">
                    {client.roles}
                </Descriptions.Item>
            </Descriptions>
        </>
    );
}

export default Clients;