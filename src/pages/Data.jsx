import { Line, Pie } from '@ant-design/charts';
import { Card, Divider, Flex, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { requestGetData, requestGetFiles } from '../stores/authReducer';
import dayjs from 'dayjs';
import { SearchOutlined } from '@ant-design/icons';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'File',
        dataIndex: 'file',
        key: 'file',
    },
    {
        title: 'Insertion Date',
        dataIndex: 'insertionDate',
        key: 'insertionDate',
        render: ((date) => dayjs.unix(date).format('YYYY/MM/DD'))
    },
];

const initialData = [
    { age: '0-10', value: 3 },
    { age: '11-20', value: 4 },
    { age: '21-30', value: 3.5 },
    { age: '31-40', value: 5 },
    { age: '41-50', value: 4.9 },
    { age: '51-60', value: 6 },
    { age: '61-70', value: 7 },
    { age: '71-80', value: 9 },
    { age: '81-90', value: 13 },
    { age: '91++', value: 0 },
];

const Data = () => {
    const dispatch = useDispatch();
    const { files, data } = useSelector((state) => state.auth);
    const [dataSource, setDataSource] = useState(initialData);
    const [searchedVal, setSearchedVal] = useState("");

    const filteredFiles =
        searchedVal != null && searchedVal.length > 3
            ? files?.filter((file) => {
                return (
                    file.file
                        .toLowerCase()
                        .includes(searchedVal.toLowerCase())
                );
            })
            : files;

    useEffect(() => {
        dispatch(requestGetFiles());
    }, []);

    useEffect(() => {
        if (!files.length) return;

        //Get First File Data
        dispatch(requestGetData({ fileCode: files[0].file }));
    }, [files]);

    useEffect(() => {
        if (!data.length) return;
        const newData = data.slice(0, 10);
        setDataSource(newData);

    }, [data]);

    const handleSearch = (event) => {
        setSearchedVal(event.target.value);
    };

    return (
        <Flex style={{ width: "100vh" }} vertical>
            <h1>Dashboard</h1>
            <Input
                style={{ flex: 1 }}
                allowClear
                onChange={(event) => handleSearch(event)}
                placeholder={"Search..."}
                prefix={<SearchOutlined />}
            />
            <Table dataSource={filteredFiles} columns={columns} rowKey="id" />
            <Divider />
            <Card title="Line Chart">
                <Line data={dataSource} xField={'age'} yField={'value'} />
            </Card>
            <Divider />
            <Card title="Pie Chart">
                <Pie data={dataSource} xField={'age'} yField={'value'} />
            </Card>
        </Flex>
    );
};

export default Data;