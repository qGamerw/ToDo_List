import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useState } from 'react';
import taskService from "../services/tasksService";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
const { Option } = Select;
const UpdateTask = ({ task, drawerVisible }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [regularity, setRegularity] = useState('');

    const statusRepository = useSelector((state) => state.status.status);
    const priorityRepository = useSelector((state) => state.priority.priority);

    const showDrawer = () => {
        setOpen(true);
    };

    if (drawerVisible) {
        showDrawer();
    }

    const onClose = () => {
        setOpen(false);
    };

    const [deadline, setDateTime] = useState(null);

    const handleDateTimeChange = (value) => {
        setDateTime(value);
    };

    const updateTask = () => {
        taskService.updateTask({ ...task,
            "title": title || "Нет имени",
            "description": description || "",
            "deadline": (deadline ? deadline.format("YYYY-MM-DD HH:mm:ss") : "2026-12-31 00:00:00" ),
            "category": {
                "id": task.limitCategory.id
            },
            "status": {
                "id": status || 1
            },
            "priority": {
                "id": priority || 1
            },
            "regularity": {
                "id": 1
            }
        }, dispatch);
        setOpen(false);
    };

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };

    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<EditOutlined />}>
                Редактировать задачу
            </Button>
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
                                label="Заглавление"
                            >
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
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
                                    placeholder="Please enter description"
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
                                    format="YYYY-MM-DD HH:mm:ss"
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
                                label="Regularity"
                            >
                                <Select placeholder="Please choose the approver">
                                    <Option value="jack">Jack Ma</Option>
                                    <Option value="tom">Tom Liu</Option>
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