import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Drawer, Input, Row, Select} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/tasksService";
import Meta from "antd/es/card/Meta";
import CreateTask from "../component/CreateTask";
import UpdateTask from "../component/UpdateTask";
import {CheckOutlined} from "@ant-design/icons";

const {Option} = Select;

const AllTaskPage = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [status, setStatus] = useState('all');
    const statusRepository = useSelector((state) => state.status.status);
    const tasksRepository = useSelector((state) => state.tasks.tasks);


    useEffect(() => {
        taskService.getAllTask(dispatch);
    }, [dispatch, status]);

    let countComplete = tasksRepository.filter(item => item.status.name === "EXECUTED").length;
    let countAll = tasksRepository.length;

    useEffect(() => {
        const filtered = tasks.filter(tasks => (status === "all" || tasks.status.id === status)
            && ( tasks.title.toLowerCase().includes(searchTerm.toLowerCase())
                || tasks.description.toLowerCase().includes(searchTerm.toLowerCase())) );
        setFilteredProducts(filtered);
    }, [searchTerm, tasks]);

    const handleButtonClick = (task, dispatch) => {

        taskService.deleteTask(task.id, dispatch);
    }

    const handleDrawerClose = () => {
        setDrawerVisible(false); // Закрыть Drawer
    }

    const today = new Date();

    const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

    const dayOfWeek = weekDays[today.getDay()];
    const day = today.getDate();
    const month = months[today.getMonth()];

    const handleButtonClickToComplete = (task, dispatch) => {

        if (task.status.name !== "EXECUTED") {
            taskService.updateTask({
                ...task,
                "title": task.title,
                "description": task.description,
                "deadline": task.deadline,
                "category": {
                    "id": task.limitCategory.id
                },
                "status": {
                    "id": 2
                },
                "priority": {
                    "id": task.priority.id
                },
                "regularity": {
                    "id": 1
                }
            }, dispatch);
        } else {
            taskService.updateTask({
                ...task,
                "title": task.title,
                "description": task.description,
                "deadline": task.deadline,
                "category": {
                    "id": task.limitCategory.id
                },
                "status": {
                    "id": 1
                },
                "priority": {
                    "id": task.priority.id
                },
                "regularity": {
                    "id": 1
                }
            }, dispatch);
        }
    }

    return (
        <div>
            <Meta title="Сегодняшняя дата " description={<span
                style={{fontSize: '20px'}}>{dayOfWeek + ', ' + day + ' ' + month}</span>}/><br/>
            {countAll > 0 ? <Meta title="Статистика выполнения заданий"
                                  description={<span
                                      style={{fontSize: '20px'}}>{`Выполнено ${countComplete} из ${countAll} задач`}</span>} />: null}<br/>

            <Select defaultValue="all" style={{marginLeft: 10, width: 150}} onChange={(e) => setStatus(e)}>
                <Select.Option key="all" value="all">
                    All
                </Select.Option>

                {statusRepository.map((status) => (
                    <Select.Option key={status.id} value={status.id}>
                        {status.name}
                    </Select.Option>
                ))}
            </Select>

            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 40}}>
                <Input.Search size="text"
                              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                              placeholder="Поиск по имени или описанию задачи" enterButton
                              className="custom-search-input"
                              style={{width: '600px'}}
                />
            </div>
            <Row gutter={[16, 16]}>
                {filteredProducts.map(task => (
                    <Col span={8} key={task.id}>
                        <Card
                            hoverable
                            style={{
                                width: 240,
                                backgroundColor: "#69c0ff",
                                marginTop: 10
                            }}
                        >
                            {"" !== task.title ? <> <Meta title="Название" description={<span style={{ fontSize: '22px' }}>{task.title}</span>}/><br/> </>
                                : null}

                            {"" !== task.description ? <> <Meta title="Описание" description={<span style={{ fontSize: '20px' }}>{task.description}</span>}/><br/> </>
                                : null}

                            {"2026-12-31 00:00:00" !== task.deadline ? <> <Meta title="Срок завершения"
                                                                                description={<span style={{ fontSize: '20px' }}>{task.deadline}</span>}/><br/> </>
                                : null}

                            <Meta title="Статус" description={<span style={{ fontSize: '20px' }}>{task.status.name}</span>}/><br/>
                            <Meta title="Приоритет" description={<span style={{ fontSize: '20px' }}>{task.priority.name}</span>}/><br/>
                            <Meta title="Повторение задачи" description={<span style={{ fontSize: '20px' }}>{task.regularity.dateNotify}</span>}/><br/>

                            <Button
                                type="primary"
                                style={{marginLeft: 10, marginTop: 10, marginBottom: 10}}
                                onClick={() => handleButtonClickToComplete(task, dispatch)}
                                icon={<CheckOutlined/>}
                            >
                                {task.status.name === "EXECUTED" ? "Выполнять работу" : "Завершить задачу"}
                            </Button>

                            <UpdateTask task={task} drawerVisible={drawerVisible} handleDrawerClose={handleDrawerClose}/>

                            <Button
                                type="primary"
                                style={{marginLeft: 25, marginTop: 10}}
                                onClick={() => handleButtonClick(task, dispatch)}
                            >
                                Удалить задачу
                            </Button>

                        </Card>
                    </Col>
                ))}
            </Row>


        </div>
    );
};

export default AllTaskPage;