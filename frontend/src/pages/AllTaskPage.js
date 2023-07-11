import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Drawer, Input, Row, Select} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import taskService from "../services/tasksService";
import Meta from "antd/es/card/Meta";
import CreateTask from "../component/CreateTask";
import UpdateTask from "../component/UpdateTask";

const {Option} = Select;

const AllTaskPage = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);


    useEffect(() => {
        taskService.getAllTask(dispatch);
    }, []);

    useEffect(() => {
        const filtered = tasks.filter(tasks => tasks.title.toLowerCase().includes(searchTerm.toLowerCase())
            || tasks.description.toLowerCase().includes(searchTerm.toLowerCase()))
            || tasks.deadline.includes(searchTerm.toLowerCase());
        setFilteredProducts(filtered);
    }, [searchTerm, tasks]);

    const handleButtonClick = (task, dispatch) => {

        taskService.deleteTask(task.id, dispatch);
    }

    const handleDrawerClose = () => {
        setDrawerVisible(false); // Закрыть Drawer
    }

    return (
        <div>
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
                            <Meta title="Название" description={task.title}/><br/>
                            <Meta title="Описание" description={task.description}/><br/>
                            <Meta title="Срок завершения"
                                  description={task.deadline}/><br/>
                            <Meta title="Статус" description={task.status.name}/><br/>
                            <Meta title="Приоритет" description={task.priority.name}/><br/>
                            <Meta title="Повторение задачи" description={task.regularity.dateNotify}/><br/>

                            <UpdateTask task={task} drawerVisible={drawerVisible} handleDrawerClose={handleDrawerClose}/>

                            <Button
                                type="primary"
                                style={{marginLeft: 15, marginTop: 10}}
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