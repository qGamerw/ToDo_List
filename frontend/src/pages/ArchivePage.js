import React, {useEffect, useMemo, useState} from 'react';
import {Button, Card, Col, Input, Row, Select, Tag, Tooltip, Typography} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/tasksService";
import Meta from "antd/es/card/Meta";
import UpdateTask from "../component/UpdateTask";
import {useNavigate} from 'react-router-dom';
import {CheckOutlined, DeleteOutlined} from "@ant-design/icons";

const {Option} = Select;

const ArchivePage = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const options = ['Show', 'Hide', 'Center'];
    const [arrow, setArrow] = useState('Show');
    const category = useSelector((state) => state.categories.categoryName);
    const statusRepository = useSelector((state) => state.status.status);
    const [status, setStatus] = useState('all');
    const {Text, Link} = Typography;

    // let id = useParams()["*"];

    console.log(category)


    useEffect(() => {
        taskService.getTaskByArchive(dispatch);
    }, [dispatch, status]);

    useEffect(() => {
        const filtered = tasks.filter(tasks => (status === "all" || tasks.status.id === status)
            && (tasks.title.toLowerCase().includes(searchTerm.toLowerCase())
                || tasks.description.toLowerCase().includes(searchTerm.toLowerCase())));
        setFilteredProducts(filtered);
    }, [searchTerm, tasks]);


    const handleButtonClickToDelete = (task, dispatch) => {
        taskService.deleteTask(task.id, dispatch);
    }
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

    const handleDrawerClose = () => {
        setDrawerVisible(false); // Закрыть Drawer
    }

    const mergedArrow = useMemo(() => {
        if (arrow === 'Hide') {
            return false;
        }
        if (arrow === 'Show') {
            return true;
        }
        return {
            pointAtCenter: true,
        };
    }, [arrow]);

    const today = new Date();

    const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

    const dayOfWeek = weekDays[today.getDay()];
    const day = today.getDate();
    const month = months[today.getMonth()];

    return (
        <div>
            <div>
                <Meta title="Вы находитетсь в категории " description={<span
                    style={{fontSize: '20px'}}>Архив</span>}/><br/>
                <Meta title="Сегодняшняя дата " description={<span
                    style={{fontSize: '20px'}}>{dayOfWeek + ', ' + day + ' ' + month}</span>}/><br/>

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
            </div>

            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 40}}>
                <Input.Search size="text"
                              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                              placeholder="Поиск по имени или описанию адачи" enterButton
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
                            {"" !== task.title ? <> <Meta title="Название" description={<span style={{
                                    fontSize: '22px',
                                    ...(task.status.name === "EXECUTED" ? {textDecoration: 'line-through'} : null)
                                }}>{task.title}</span>}/><br/> </>
                                : null}

                            {"" !== task.description ? <> <Meta title="Описание" description={<span style={{
                                    fontSize: '20px',
                                    ...(task.status.name === "EXECUTED" ? {textDecoration: 'line-through'} : null)
                                }}>{task.description}</span>}/><br/> </>
                                : null}

                            {"2026-12-31 00:00:00" !== task.deadline ? <> <Meta title="Срок завершения"
                                                                                description={<span
                                                                                    style={{fontSize: '20px'}}>{task.deadline}</span>}/><br/> </>
                                : null}

                            <Meta title="Статус"/><br/>
                            {task.status.name === "IN_PROCESS" ? <> <Tag color="#FF7400"><span
                                style={{fontSize: '20px'}}>{task.status.name}</span></Tag><br/><br/> </> : null}
                            {task.status.name === "PENDING" ? <> <Tag color="#4512AE"><span
                                style={{fontSize: '20px'}}>{task.status.name}</span></Tag><br/><br/> </> : null}
                            {task.status.name === "EXECUTED" ? <> <Tag color="#BFAC30"><span
                                style={{fontSize: '20px'}}>{task.status.name}</span></Tag><br/><br/> </> : null}

                            <Meta title="Приоритет"/><br/>
                            {task.priority.name === "LOW" ? <> <Tag color="#FF7400"><span
                                style={{fontSize: '20px'}}>{task.priority.name}</span></Tag><br/><br/> </> : null}
                            {task.priority.name === "MEDIUM" ? <> <Tag color="#BFAC30"><span
                                style={{fontSize: '20px'}}>{task.priority.name}</span></Tag><br/><br/> </> : null}
                            {task.priority.name === "HIGH" ? <> <Tag color="#4512AE"><span
                                style={{fontSize: '20px'}}>{task.priority.name}</span></Tag><br/><br/> </> : null}

                            <Meta title="Повторение задачи" description={<span
                                style={{fontSize: '20px'}}>{task.regularity.dateNotify}</span>}/><br/>

                            <Tooltip placement="top" title="Отметить задачу как выполненое" arrow={mergedArrow}>
                                <Button
                                    type="primary"
                                    style={{marginLeft: 10, marginTop: 10, marginBottom: 10}}
                                    onClick={() => handleButtonClickToComplete(task, dispatch)}
                                    icon={<CheckOutlined/>}
                                >
                                    {task.status.name === "EXECUTED" ? "Выполнять работу" : "Завершить задачу"}
                                </Button>
                            </Tooltip>

                            <UpdateTask task={task} drawerVisible={drawerVisible}
                                        handleDrawerClose={handleDrawerClose}/>

                            <Tooltip placement="top" title="Полное удаление задачи" arrow={mergedArrow}>
                                <Button
                                    type="primary"
                                    style={{marginLeft: 15, marginTop: 10}}
                                    onClick={() => handleButtonClickToDelete(task, dispatch)}
                                    icon={<DeleteOutlined/>}
                                >
                                    Удалить задачу
                                </Button>
                            </Tooltip>

                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ArchivePage;