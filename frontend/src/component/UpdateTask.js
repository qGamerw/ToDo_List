import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useState } from 'react';
import taskService from "../services/tasksService";
import {useDispatch} from "react-redux";
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

    const category = { "id" : task.limitCategory.id };
    const updateTask = () => {
        taskService.updateTask({ ...task,
            title : title || task.title,
            description : description || task.description,
            deadline : (deadline? deadline.format("YYYY-MM-DD HH:mm:ss") : task.deadline),
            category : category || task.category,
            status : status || task.status,
            priority : priority || task.priority,
            regularity : regularity || task.regularity
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
                                label="Title"
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
                                label="Description"
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
                                label="Deadline"
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
                                label="Status"
                            >
                                <Select placeholder="Please select an owner">
                                    <Option value="xiao">Xiaoxiao Fu</Option>
                                    <Option value="mao">Maomao Zhou</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="priority"
                                label="Priority"
                            >
                                <Select placeholder="Please select an owner">
                                    <Option value="xiao">Xiaoxiao Fu</Option>
                                    <Option value="mao">Maomao Zhou</Option>
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