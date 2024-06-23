import { Button, Card, Space } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const QRCode = () => {
    const { state } = useLocation();
    const { email } = state;
    const navigate = useNavigate();

    const onBackClick = () => {
        navigate('/');
    };
    return (
        <Space direction="vertical" size={16}>
            <Card
                title="QR Code"
                style={{
                    width: 500,
                }}
            >
                <p>Scan the QR code below to generate a one-time password</p>
                <iframe width={200} height={200} style={{ border: "none" }} src={`http://localhost:8080/code/generate/${email}`}></iframe>
                <br />
                <Space>
                    <Button type="primary" htmlType="submit" onClick={onBackClick}>
                        Back to Login
                    </Button>
                </Space>
            </Card>
        </Space>
    );
};

export default QRCode;