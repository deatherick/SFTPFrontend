import { Button, Card, Checkbox, Form, Input, Space } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
        navigate('/qr-code', { state: { email: values.email} });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Space direction="vertical" size={16}>
            <Card
                title="Login"
                style={{
                    width: 500,
                }}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                                type: 'email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 16,
                        }}
                    >
                        <Space>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    );
}

export default Register;