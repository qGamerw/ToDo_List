import {useDispatch, useSelector} from "react-redux";
import {Avatar, Typography} from "antd";
import React from "react";
import logo from '../imgs/avatarjpg.jpg';

export const Clients = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { Text, Link } = Typography;
    const tasksRepository = useSelector((state) => state.tasks.tasks);

    let countINPROCESS = tasksRepository.filter(item => item.status.name === "EXECUTED").length;
    let countPENDING = tasksRepository.filter(item => item.status.name === "EXECUTED").length;
    let countEXECUTED = tasksRepository.filter(item => item.status.name === "EXECUTED").length;

    let countLOW = tasksRepository.filter(item => item.priority.name === "LOW").length;
    let countMEDIUM = tasksRepository.filter(item => item.priority.name === "MEDIUM").length;
    let countHIGH = tasksRepository.filter(item => item.priority.name === "HIGH").length;

    let countNONE = tasksRepository.filter(item => item.regularity.name === "NONE").length;
    let countONCE = tasksRepository.filter(item => item.regularity.name === "ONCE").length;
    let countDAILY = tasksRepository.filter(item => item.regularity.name === "DAILY").length;
    let countWEEKLY = tasksRepository.filter(item => item.regularity.name === "WEEKLY").length;
    let countMONTHLY = tasksRepository.filter(item => item.regularity.name === "MONTHLY").length;

    let countAll = tasksRepository.length;

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
            <br/><Text style={{fontSize: '18px', color: 'grey' }} >Информация о пользователе</Text><br/>

            <Text style={{fontSize: '18px', color: 'grey', marginLeft: 20 }} >Имя</Text><br/>
            <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{user.username}</Text><br/><br/>

            <Text style={{fontSize: '18px', color: 'grey', marginLeft: 20  }} >Email</Text><br/>
            <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{user.email}</Text><br/><br/>

            <Text style={{fontSize: '18px', color: 'grey', marginLeft: 20 }} >Статистика по выполнению задач</Text><br/><br/>

            {countAll > 0? <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Задачи в процессе ${countINPROCESS} из ${countAll} задач`}</Text><br/><br/> </> :
                <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Создайте задачи для просмотра`}</Text><br/><br/> </> }

            {countAll > 0? <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Задачи в ожидании ${countPENDING} из ${countAll} задач`}</Text><br/><br/> </> :
                <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Создайте задачи для просмотра`}</Text><br/><br/> </> }

            {countAll > 0? <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Выполнено задач ${countEXECUTED} из ${countAll} задач`}</Text><br/><br/> </> :
                <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Создайте задачи для просмотра`}</Text><br/><br/> </> }

            <Text style={{fontSize: '18px', color: 'grey', marginLeft: 20 }} >Статистика по приоритету задач</Text><br/><br/>

            {countAll > 0? <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Задачи с низким приоритетом ${countLOW} из ${countAll} задач`}</Text><br/><br/> </> :
                <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Создайте задачи для просмотра`}</Text><br/><br/> </> }

            {countAll > 0? <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Задачи со средним приоритетом ${countMEDIUM} из ${countAll} задач`}</Text><br/><br/> </> :
                <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Создайте задачи для просмотра`}</Text><br/><br/> </> }

            {countAll > 0? <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Задачи с высоким приоритетом ${countHIGH} из ${countAll} задач`}</Text><br/><br/> </> :
                <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Создайте задачи для просмотра`}</Text><br/><br/> </> }

            <Text style={{fontSize: '18px', color: 'grey', marginLeft: 20 }} >Статистика по регулярности задач</Text><br/><br/>

            {countAll > 0? <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Не повторяющиеся задачи ${countNONE} из ${countAll} задач`}</Text><br/><br/> </> :
                <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Создайте задачи для просмотра`}</Text><br/><br/> </> }

            {countAll > 0? <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Повторяющиеся один раз задачи ${countONCE} из ${countAll} задач`}</Text><br/><br/> </> :
                <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Создайте задачи для просмотра`}</Text><br/><br/> </> }

            {countAll > 0? <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Ежедневные задачи ${countDAILY} из ${countAll} задач`}</Text><br/><br/> </> :
                <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Создайте задачи для просмотра`}</Text><br/><br/> </> }

            {countAll > 0? <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Еженедельные задачи ${countWEEKLY} из ${countAll} задач`}</Text><br/><br/> </> :
                <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Создайте задачи для просмотра`}</Text><br/><br/> </> }

            {countAll > 0? <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Ежемесячные задачи ${countMONTHLY} из ${countAll} задач`}</Text><br/><br/> </> :
                <> <Text style={{fontSize: '20px', color: 'black', marginLeft: 25 }} >{`Создайте задачи для просмотра`}</Text><br/><br/> </> }

        </>
    );
}

export default Clients;