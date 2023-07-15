import React, {useEffect, useMemo, useState} from 'react';
import {Button, Card, Col, Input, Row, Select, Tag, Tooltip, Typography} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/tasksService";
import UpdateTask from "../component/UpdateTask";
import {DeleteOutlined} from "@ant-design/icons";

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
    const today = new Date();
    const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    const dayOfWeek = weekDays[today.getDay()];
    const day = today.getDate();
    const month = months[today.getMonth()];

    useEffect(() => {
        taskService.getTaskByArchive(dispatch);
    }, [dispatch, status, category]);

    useEffect(() => {
        const filtered = tasks.filter(tasks => (status === "all" || tasks.status.id === status)
            && (tasks.title.toLowerCase().includes(searchTerm.toLowerCase())
                || tasks.description.toLowerCase().includes(searchTerm.toLowerCase())));
        setFilteredProducts(filtered);
    }, [searchTerm, tasks]);

    const handleButtonClickToDelete = (task, dispatch) => {
        taskService.deleteTask(task.id, dispatch);
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

    return (
        <div>
            <div>
                <Text style={{fontSize: '18px', color: 'grey' }} >Вы находитесь в категории</Text><br/>
                <Text style={{fontSize: '20px', color: 'black' }} >Архив</Text><br/><br/>

                <Text style={{fontSize: '18px', color: 'grey' }} >Сегодняшняя дата</Text><br/>
                <Text style={{fontSize: '20px', color: 'black' }} >{dayOfWeek + ', ' + day + ' ' + month}</Text><br/><br/>


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
                {filteredProducts.filter(item => item.limitCategory.name === "Архив").map(task => (
                    <Col span={8} key={task.id}>
                        <Card
                            hoverable
                            style={{
                                width: 240,
                                backgroundColor: (task.status.name === "IN_PROCESS" ? "#bae0ff" :
                                    task.status.name === "EXECUTED" ? "#d9f7be" : "#ffccc7"),
                                marginTop: 10
                            }}
                        >
                            <UpdateTask task={task} drawerVisible={drawerVisible}
                                        handleDrawerClose={handleDrawerClose}/>

                            <Tooltip placement="top" title="Удалить задачу" arrow={mergedArrow}>
                                <Button
                                    type="primary"
                                    style={{float: "right"}}
                                    onClick={() => handleButtonClickToDelete(task, dispatch)}
                                    icon={<DeleteOutlined/>}
                                >
                                </Button>
                            </Tooltip>

                            <br/><Text style={{fontSize: '18px', color: 'grey' }} >Название</Text><br/>
                            <Text style={{
                                textDecoration: task.status.name === "EXECUTED" ? 'line-through' : '',
                                fontSize: '20px',
                                color: 'black'
                            }}>
                                {task.title}
                            </Text><br/><br/>

                            {task.description !== "" ?
                                <>
                                    <Text style={{fontSize: '18px', color: 'grey' }} >Описание</Text><br/>
                                    <Text style={{
                                        textDecoration: task.status.name === "EXECUTED" ? 'line-through' : '',
                                        fontSize: '20px',
                                        color: 'black'
                                    }}>
                                        {task.description}
                                    </Text><br/><br/>
                                </>
                                : null }

                            <Text style={{fontSize: '18px', color: 'grey' }} >Категория</Text><br/>
                            <Text style={{fontSize: '20px', color: 'black' }} >{task.limitCategory.name}</Text><br/><br/>

                            {task.deadline !== "2026-12-31 00:00:00" ? (
                                <>
                                    <Text style={{ fontSize: 18, color: 'grey' }}>Срок завершения</Text><br />
                                    <Text style={{
                                        fontSize: 20,
                                        color: ( ( Math.floor( ( new Date(task.deadline) - new Date() ) / (1000 * 60 * 60 * 24) ) ) > 3 ? 'black' : 'red')
                                    }}>{task.deadline}</Text><br /><br />
                                </>
                            ) : null}

                            <Text style={{fontSize: '18px', color: 'grey' }} >Статус</Text><br/>
                            {task.status.name === "IN_PROCESS" ? <> <Tag color="#52C41A"><span
                                style={{fontSize: '20px'}}>{task.status.name}</span></Tag><br/><br/> </> : null}
                            {task.status.name === "PENDING" ? <> <Tag color="#4096ff"><span
                                style={{fontSize: '20px'}}>{task.status.name}</span></Tag><br/><br/> </> : null}
                            {task.status.name === "EXECUTED" ? <> <Tag color="#8c8c8c"><span
                                style={{fontSize: '20px'}}>{task.status.name}</span></Tag><br/><br/> </> : null}

                            <Text style={{fontSize: '18px', color: 'grey' }} >Приоритет</Text><br/>
                            {task.priority.name === "LOW" ? <> <Tag color="#ffc53d"><span
                                style={{fontSize: '20px'}}>{task.priority.name}</span></Tag><br/><br/> </> : null}
                            {task.priority.name === "MEDIUM" ? <> <Tag color="#008080"><span
                                style={{fontSize: '20px'}}>{task.priority.name}</span></Tag><br/><br/> </> : null}
                            {task.priority.name === "HIGH" ? <> <Tag color="#8B0000"><span
                                style={{fontSize: '20px'}}>{task.priority.name}</span></Tag><br/><br/> </> : null}

                            <Text style={{fontSize: '18px', color: 'grey' }} >Повторение задачи</Text><br/>
                            {task.regularity.name === "NONE" ? <> <Tag color="#ffa940"><span
                                style={{fontSize: '20px'}}>{task.regularity.name}</span></Tag><br/><br/> </> : null}
                            {task.regularity.name === "ONCE" ? <> <Tag color="#4512AE"><span
                                style={{fontSize: '20px'}}>{task.regularity.name}</span></Tag><br/><br/> </> : null}
                            {task.regularity.name === "DAILY" ? <> <Tag color="#fadb14"><span
                                style={{fontSize: '20px'}}>{task.regularity.name}</span></Tag><br/><br/> </> : null}
                            {task.regularity.name === "WEEKLY" ? <> <Tag color="#ff4d4f"><span
                                style={{fontSize: '20px'}}>{task.regularity.name}</span></Tag><br/><br/> </> : null}
                            {task.regularity.name === "MONTHLY" ? <> <Tag color="#ff7a45"><span
                                style={{fontSize: '20px'}}>{task.regularity.name}</span></Tag><br/><br/> </> : null}

                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ArchivePage;