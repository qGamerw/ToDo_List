import {EditOutlined} from '@ant-design/icons';
import {Button, Col, DatePicker, Drawer, Form, Input, message, Row, Select, Space, Tooltip} from 'antd';
import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import tasksService from "../services/tasksService";
import dayjs from "dayjs";

const {Option} = Select;
const CreateTask = ({form, categoryId, drawerVisible}) => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [regularity, setRegularity] = useState('');
    const [deadline, setDateTime] = useState(null);

    const statusRepository = useSelector((state) => state.status.status);
    const priorityRepository = useSelector((state) => state.priority.priority);
    const regularityRepository = useSelector((state) => state.regularity.regularity);
    const [arrow, setArrow] = useState('Show');

    const showDrawer = () => {
        setOpen(true);
    };

    if (drawerVisible) {
        showDrawer();
    }

    const onClose = () => {
        form.resetFields();
        setOpen(false);
    };


    const handleDateTimeChange = (value) => {
        setDateTime(value);
    };

    const createTask = () => {
        tasksService.createTaskInCategory({
            "title": title || "Как же тебя назвать",
            "description": description || "",
            "deadline": (deadline ? deadline.format("YYYY-MM-DD HH:mm:ss") : "2026-12-31 00:00:00" ),
            "category": {
                "id": categoryId
            },
            "status": {
                "id": status || 1
            },
            "priority": {
                "id": priority || 1
            },
            "regularity": {
                "id": regularity || 5
            }
        }, dispatch);
        form.resetFields();
        onClose();

        const textList = [
            "Молодец!",
            "Мне нужно больше инфор... всего!",
            "Надеюсь ты ее выполнишь!",
            "Понятно, и когда ты ее выполнишь?!"
        ]
        const handleButtonClick = () => {
            setTimeout(() => {
                message.success(textList[Math.floor(Math.random() * textList.length)], 3);
            }, 100);
        };
        handleButtonClick();
    }

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
            <Tooltip placement="top" title="Создать задачу" arrow={mergedArrow}>
                <Button type="primary" onClick={showDrawer} icon={<EditOutlined/>}>
                    Создать задачу
                </Button>
            </Tooltip>

            <Drawer
                title="Создание задачи"
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Отмена</Button>
                        <Button onClick={createTask} type="primary">
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
                                <Select placeholder="Введите статус задачи" onChange={(e) => setStatus(e)} >
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
                                <Select placeholder="Введите приоритет задачи" onChange={(e) => setPriority(e)} >
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
                                <Select placeholder="Введите регулярность задачи" onChange={(e) => setRegularity(e)} >
                                    {regularityRepository.map((regularity) => (
                                        <Select.Option key={regularity.id} value={regularity.id}>
                                            {regularity.name}
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
export default CreateTask;