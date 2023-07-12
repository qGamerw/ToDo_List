import React, {useEffect, useMemo, useState} from 'react';
import {Button, Card, Checkbox, Col, Divider, Input, List, Popover, Radio, Row, Select, Tooltip} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/tasksService";
import Meta from "antd/es/card/Meta";
import UpdateTask from "../component/UpdateTask";
import { useParams } from 'react-router-dom';
import {CheckOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import categoriesService from "../services/categoriesService";
import CreateTask from "../component/CreateTask";
import statusService from "../services/statusService";
import priorityService from "../services/priorityService";

const {Option} = Select;

const TaskPage = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const options = ['Show', 'Hide', 'Center'];
    const [arrow, setArrow] = useState('Show');
    const category = useSelector((state) => state.categories.categoryName);
    const statusRepository = useSelector((state) => state.status.status);

    let id = useParams()["*"];

    useEffect(() => {
        taskService.getTaskByCategoryId(id, dispatch);
        categoriesService.getCategoryById(id, dispatch);
    }, [id, dispatch]);

    useEffect(() => {
        const filtered = tasks.filter(tasks => tasks.title.toLowerCase().includes(searchTerm.toLowerCase())
                || tasks.description.toLowerCase().includes(searchTerm.toLowerCase()))
            || tasks.deadline.includes(searchTerm.toLowerCase());
        setFilteredProducts(filtered);
    }, [searchTerm, tasks]);


    const handleButtonClickToDelete = (task, dispatch) => {
        taskService.deleteTask(task.id, dispatch);
    }
    const handleButtonClickToComplete = (task, dispatch) => {
        const idComplete = statusRepository.filter(item => item.name === "EXECUTED");
        console.log(idComplete);

        // taskService.updateTask(task)
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

    const countComplete = filteredProducts.filter(item => item.status.name === "EXECUTED").length;
    const countAll = filteredProducts.length;

    return (
        <div>
            <div>
                <Meta title="Вы находитетсь в категории " description={category? category.name : null}/><br/>
                <Meta title="Сегодняшняя дата " description={dayOfWeek + ', ' + day + ' ' + month}/><br/>
                {countAll > 0 ? <Meta title="Статистика выполнения заданий"
                                      description={`Выполнено ${countComplete} из ${countAll} задач`} />: null}<br/>

                <CreateTask categoryId={id} drawerVisible={drawerVisible} handleDrawerClose={handleDrawerClose}/>
                <Tooltip placement="top" title="Полностью удаляет категорию" arrow={mergedArrow}>
                    <Button
                        type="primary"
                        style={{marginLeft: 10, marginTop: 10, marginBottom: 10}}
                        onClick={() => categoriesService.deleteCategory(id, dispatch)}
                        icon={<DeleteOutlined  /> }
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
                            <Meta title="Название" description={task.title}/><br/>

                            {"" !== task.description ? <> <Meta title="Описание" description={task.description}/> <br/> </>: null}
                            {"2026-12-31 00:00:00" !== task.deadline ? <> <Meta title="Срок завершения" description={task.deadline}/> <br/> </>: null}

                            <Meta title="Статус" description={task.status.name}/><br/>
                            <Meta title="Приоритет" description={task.priority.name}/><br/>
                            <Meta title="Повторение задачи" description={task.regularity.dateNotify}/><br/>


                            <Tooltip placement="top" title="Отметить задачу как выполненое" arrow={mergedArrow}>
                                <Button
                                    type="primary"
                                    style={{marginLeft: 10, marginTop: 10, marginBottom: 10}}
                                    onClick={() => handleButtonClickToComplete(task, dispatch)}
                                    icon={<CheckOutlined  /> }
                                >
                                    Завершить задачу
                                </Button>
                            </Tooltip>

                            <UpdateTask task={task} drawerVisible={drawerVisible}
                                        handleDrawerClose={handleDrawerClose}/>

                            <Tooltip placement="top" title="Полное удаление задачи" arrow={mergedArrow}>
                                <Button
                                    type="primary"
                                    style={{marginLeft: 15, marginTop: 10}}
                                    onClick={() => handleButtonClickToDelete(task, dispatch)}
                                    icon={<DeleteOutlined /> }
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

export default TaskPage;