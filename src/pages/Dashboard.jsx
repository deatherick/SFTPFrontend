import { AppstoreOutlined, LogoutOutlined } from "@ant-design/icons";
import { Menu, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearState } from "../stores/authReducer";
import Data from "./Data";

const items = [
    {
        label: 'Dashboard',
        key: 'home',
        icon: <AppstoreOutlined />,
    },
    {
        label: 'Log Out',
        key: 'logout',
        icon: < LogoutOutlined />,
    },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [current, setCurrent] = useState('home');
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!user || !user.valid) {
            window.location.href = '/';
        }
    }, []);

    const onClick = (e) => {
        setCurrent(e.key);
        if (e.key === 'logout') {
            dispatch(clearState());
            navigate('/');
        }
    };

    return (
        (user && user.valid) && (
            <Space direction="vertical" size={16}>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                <Data />
            </Space>)
    );
};

export default Dashboard;