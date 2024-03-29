import {EditOutlined} from '@ant-design/icons';
import {Button, Col, DatePicker, Drawer, Form, Input, message, Row, Select, Space, Tooltip} from 'antd';
import React, {useMemo, useState} from 'react';
import taskService from "../services/tasksService";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import moment from "moment";

const { Option } = Select;

const UpdateTask = ({ task, drawerVisible }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [regularity, setRegularity] = useState('');
    const [deadline, setDateTime] = useState(null);
    const [category, setCategory] = useState("");
    const [arrow, setArrow] = useState('Show');

    const statusRepository = useSelector((state) => state.status.status);
    const priorityRepository = useSelector((state) => state.priority.priority);
    const regularityRepository = useSelector((state) => state.regularity.regularity);
    const userCategory = useSelector((state) => state.categories.categories);

    const showDrawer = () => {
        setOpen(true);
    };

    if (drawerVisible) {
        showDrawer();
    }

    const onClose = () => {
        setOpen(false);
    };

    const handleDateTimeChange = (value) => {
        setDateTime(value);
    };

    const updateTask = () => {
        taskService.updateTask({ ...task,
            "title": title || task.title,
            "description": description || task.description,
            "deadline": (deadline ? deadline.format("YYYY-MM-DD HH:mm:ss") : task.deadline ),
            "category": {
                "id": category || task.limitCategory.id
            },
            "status": {
                "id": status || task.status.id
            },
            "priority": {
                "id": priority || task.priority.id
            },
            "regularity": {
                "id": regularity || 1
            }
        }, dispatch);
        setOpen(false);

        const textList = [
            "Задача обновлена, отголоски новых идей уже пронизывают весь список!",
            "Вдохновение в действии: задача обновлена, цели становятся более ясными",
            "Задача преобразилась, теперь она красива, как веселый клоун!",
            "Версия 2.0: задача обновлена, результаты станут еще лучше!",
        ]
        const handleButtonClick = () => {
            setTimeout(() => {
                message.success(textList[Math.floor(Math.random() * textList.length)], 3);
            }, 100);
        };
        handleButtonClick();
    };

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };

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
        <>
            <Tooltip placement="top" title="Редактировать задачу" arrow={mergedArrow}>
                <Button type="primary" onClick={showDrawer} icon={<EditOutlined />} >

                </Button>
            </Tooltip>

            <Drawer
                title="Редактирование задачи"
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Отмена</Button>
                        <Button onClick={updateTask} type="primary">
                            Сохранить
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" requiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="title"
                                label="Заголовок"
                            >
                                <Input
                                    value={title}
                                    defaultValue={task.title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Введите заголовок"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="description"
                                label="Описание"
                            >
                                <Input
                                    value={description}
                                    defaultValue={task.description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Введите описание"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="deadline"
                                label="Срок завершения"
                            >
                                <DatePicker
                                    showTime
                                    placeholder="Выберите дату и время"
                                    value={deadline}
                                    defaultValue={moment(task.deadline)}
                                    onChange={handleDateTimeChange}
                                    format={"YYYY-MM-DD HH:mm:ss"}
                                    disabledDate={disabledDate}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="status"
                                label="Статус"
                            >
                                <Select value={task.status.id} placeholder="Введите статус задачи" onChange={(e) => setStatus(e)} >
                                    {statusRepository.map((status) => (
                                        <Select.Option key={status.id} value={status.id}>
                                            {status.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="priority"
                                label="Приоритет"
                            >
                                <Select value={task.priority.id} placeholder="Введите приоритет задачи" onChange={(e) => setPriority(e)} >
                                    {priorityRepository.map((priority) => (
                                        <Select.Option key={priority.id} value={priority.id}>
                                            {priority.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="regularity"
                                label="Регулярность"
                            >
                                <Select value={task.regularity.id} placeholder="Введите регулярность задачи" onChange={(e) => setRegularity(e)} >
                                    {regularityRepository.map((regularity) => (
                                        <Select.Option key={regularity.id} value={regularity.id}>
                                            {regularity.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="category"
                                label="Категория"
                            >
                                <Select value={task.limitCategory.id} placeholder="Введите категорию" onChange={(e) => setCategory(e)} >
                                    {userCategory.map((category) => (
                                        <Select.Option key={category.id} value={category.id}>
                                            {category.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};
export default UpdateTask;