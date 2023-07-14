import React, {useEffect, useMemo, useState} from 'react';
import {Button, Card, Col, Input, message, Row, Select, Tag, Tooltip, Typography} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/tasksService";
import UpdateTask from "../component/UpdateTask";
import {useNavigate, useParams} from 'react-router-dom';
import {CheckOutlined, CloseCircleOutlined, DeleteOutlined} from "@ant-design/icons";
import categoriesService from "../services/categoriesService";
import CreateTask from "../component/CreateTask";
import {useForm} from "antd/es/form/Form";
import statusService from "../services/statusService";
import priorityService from "../services/priorityService";
import regularityService from "../services/regularityService";

const {Option} = Select;

const TaskPage = () => {
    const tasksRepository = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const options = ['Show', 'Hide', 'Center'];
    const [arrow, setArrow] = useState('Show');
    const categoryRepository = useSelector((state) => state.categories.categoryName);
    const statusRepository = useSelector((state) => state.status.status);
    const [status, setStatus] = useState('all');
    const [category, setCategory] = useState('');
    const { Text, Link } = Typography;
    const navigate = useNavigate();
    const [form] = useForm();
    const today = new Date();
    const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    const dayOfWeek = weekDays[today.getDay()];
    const day = today.getDate();
    const month = months[today.getMonth()];

    let id = useParams()["*"];

    let countComplete = tasksRepository.filter(item => item.status.name === "EXECUTED" && item.limitCategory.id === parseInt(id)).length;
    let countAll = tasksRepository.filter(item => item.limitCategory.id === parseInt(id)).length;

    useEffect(() => {
        statusService.getAllStatus(dispatch);
        priorityService.getAllPriority(dispatch);
        regularityService.getAllRegularity(dispatch);
    }, []);

    useEffect(() => {
        taskService.getTaskByCategoryId(id, dispatch);
        categoriesService.getCategoryById(id, dispatch);
    }, [id, dispatch, status, category]);

    useEffect(() => {
        const filtered = tasksRepository.filter(tasks => (status === "all" || tasks.status.id === status)
            && ( tasks.title.toLowerCase().includes(searchTerm.toLowerCase())
                || tasks.description.toLowerCase().includes(searchTerm.toLowerCase())) );
        setFilteredProducts(filtered);
    }, [searchTerm, tasksRepository]);

    const handleButtonClickToDelete = (task, dispatch) => {
        taskService.deleteTask(task.id, dispatch);

        const textList = [
            "Удалено! Можно отдохнуть и радоваться достижению.",
            "Удалил задачу! Свобода и прогресс!",
            "Перечеркнул! Готов к следующему вызову!",
            "Минус одна задача. Великолепно продвигаюсь вперед!",
            "Пау! Закончил задачу. Время насладиться успехом и немного поднять ЧСВ!"
        ]
        const handleButtonClick = () => {
            setTimeout(() => {
                message.success(textList[Math.floor(Math.random() * textList.length)], 3);
            }, 100);
        };
        handleButtonClick();
    }

    const changeDateToNow = () => {
        const currentTime = new Date();
        tasksRepository.forEach(item => {
            if (item.status.name !== "EXECUTED" || item.regularity.name === 'NONE') {
                return;
            }

            const compareDate = new Date(item.deadline);

            if (compareDate < currentTime) {
                const dateObject = new Date(item.deadline);
                dateObject.setHours(dateObject.getHours() + 3);
                const differenceInDays = Math.floor((currentTime - compareDate) / (1000 * 60 * 60 * 24));

                switch (item.regularity.name) {
                    case "ONCE":
                        dateObject.setDate(dateObject.getDate() + 1);
                        item.regularity.id = 1;
                        break;
                    case "DAILY":
                        if (differenceInDays > 3) {
                            dateObject.setDate(dateObject.getDate() + (differenceInDays-3));
                        } else {
                            dateObject.setDate(dateObject.getDate() + 1);
                        }
                        break;
                    case "WEEKLY":
                        dateObject.setDate(dateObject.getDate() + 7);
                        break;
                    case "MONTHLY":
                        dateObject.setMonth(dateObject.getMonth() + 1);
                        break;
                    default:
                        break;
                }

                const newDateString = dateObject.toISOString().slice(0, 19).replace("T", " ");

                taskService.updateTask({
                    "id": item.id,
                    "title": item.title,
                    "description": item.description,
                    "deadline": newDateString,
                    "category": {
                        "id": item.limitCategory.id
                    },
                    "status": {
                        "id": 1
                    },
                    "priority": {
                        "id": item.priority.id
                    },
                    "regularity": {
                        "id": item.regularity.id
                    }
                }, dispatch);
            }
        });
    }
    changeDateToNow();

    const handleButtonClickToComplete = (task, dispatch) => {
        if (task.status.name !== "EXECUTED") {
            taskService.updateTask({
                "id": task.id,
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
                    "id": task.regularity.id
                }
            }, dispatch);

        } else if (task.status.name === "EXECUTED") {
            taskService.updateTask({
                "id": task.id,
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
                    "id": task.regularity.id
                }
            }, dispatch);

        }
        const textList = [
            "Ого, ты её выполнил!",
            "Твои усилия привели к результату, и ты сделал очередную задачу на своем ToDo list.",
            "Можешь поднять своё ЧСВ немного выше.",
            "Ты просто говоришь 'Прощай, категория!', и она исчезает, как никогда не существовала.",
            "Я надеюсь, что эта задача не будет последней."
        ]
        const handleButtonClick = () => {
            setTimeout(() => {
                message.success(textList[Math.floor(Math.random() * textList.length)], 3);
            }, 100);
        };
        handleButtonClick();
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

    const deleteCategoryByClick = () => {
        categoriesService.deleteCategory(id, dispatch);
        navigate("/user");

        const textList = [
            "Просто жмешь на кнопку 'Удалить', и они исчезают, точно так же, как и все проблемы, когда мы их игнорируем!",
            "Удаление категории в Todo list - это как удалять неудобные задачи из своей жизни.",
            "Знаешь, как удаление категории в Todo list напоминает экзорцизм?",
            "Ты просто говоришь 'Прощай, категория!', и она исчезает, как никогда не существовала.",
            "Ах, эти таинственные и необычайные способности программного кода!"
        ]
        const handleButtonClick = () => {
            setTimeout(() => {
                message.success(textList[Math.floor(Math.random() * textList.length)], 3);
            }, 100);
        };
        handleButtonClick();
    }

    return (
        <div>
            <div>
                <Text style={{fontSize: '18px', color: 'grey' }} >Вы находитесь в категории</Text><br/>
                <Text style={{fontSize: '20px', color: 'black' }} >{categoryRepository ? categoryRepository.name : null}</Text><br/><br/>

                <Text style={{fontSize: '18px', color: 'grey' }} >Сегодняшняя дата</Text><br/>
                <Text style={{fontSize: '20px', color: 'black' }} >{dayOfWeek + ', ' + day + ' ' + month}</Text><br/><br/>

                {countAll > 0 ?
                    <>
                        <Text style={{fontSize: '18px', color: 'grey' }} >Статистика выполнения заданий</Text><br/>
                        <Text style={{fontSize: '20px', color: 'black' }} >{`Выполнено ${countComplete} из ${countAll} задач`}</Text><br/><br/>
                    </>
                    : null }

                <CreateTask form={form} categoryId={id} drawerVisible={drawerVisible} handleDrawerClose={handleDrawerClose}/>

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

                <Tooltip placement="top" title="Удалить категорию" arrow={mergedArrow}>
                    <Button
                        type="primary"
                        style={{marginLeft: 10, marginTop: 10, marginBottom: 40}}
                        onClick={deleteCategoryByClick}
                        icon={<DeleteOutlined/>}
                    >
                        Удалить категорию
                    </Button>
                </Tooltip>
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
                {filteredProducts.filter(item => item.limitCategory.id === parseInt(id)).map(task => (
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
                            <Tooltip placement="top" title="Отметить задачу" arrow={mergedArrow}>
                                <Button type="primary"
                                        style={{marginLeft: 0, marginRight: 10, marginTop: -1, marginBottom: 10 }}
                                        onClick={() => handleButtonClickToComplete(task, dispatch)}
                                        icon={task.status.name === "EXECUTED" ? <CloseCircleOutlined/> : <CheckOutlined/> }>
                                </Button>
                            </Tooltip>

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

export default TaskPage;