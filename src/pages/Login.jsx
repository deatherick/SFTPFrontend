import { Button, Card, Form, Input, Space } from 'antd';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { requestLoginUser } from '../stores/authReducer';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const { error, payload } = await dispatch(requestLoginUser(values));
        if (error) {
            alert("User not found or invalid code. Please try again.");
        }
        if (payload.valid) {
            navigate('/dashboard');
        } else {
            alert("Invalid code. Please try again.");
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onRegisterClick = () => {
        navigate('/register');
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
                        name="username"
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
                        label="One-Time Password"
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 16,
                        }}
                    >
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button type="link" htmlType="button" onClick={onRegisterClick}>
                                Register
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    );
}

export default Login;