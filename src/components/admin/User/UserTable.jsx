import React from 'react';


import { Table, Row, Col } from 'antd';
import InputInsearch from './InputInsearch';

// import InputSearch from './InputInsearch';
// import type { ColumnsType, TableProps } from 'antd/es/table';

// interface DataType {
//   key: React.Key;
//   name: string;
//   chinese: number;
//   math: number;
//   english: number;
// }
const UserTable = () => {


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Chinese Score',
            dataIndex: 'chinese',
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: 'Math Score',
            dataIndex: 'math',
            sorter: {
                compare: (a, b) => a.math - b.math,
                multiple: 2,
            },
        },
        {
            title: 'English Score',
            dataIndex: 'english',
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
        },
    ];

    let data = [
        {
            key: '1',
            name: 'John Brown',
            chinese: 98,
            math: 60,
            english: 70,
        },
        {
            key: '2',
            name: 'Jim Green',
            chinese: 98,
            math: 66,
            english: 89,
        },
        {
            key: '3',
            name: 'Joe Black',
            chinese: 98,
            math: 90,
            english: 70,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: 88,
            math: 99,
            english: 89,
        },
    ];
    data = data.concat(data).concat(data).concat(data).concat(data);
    data = data.concat(data);

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <>

            <InputInsearch />

            <Table
                className='def'
                columns={columns}
                dataSource={data}
                onChange={onChange}
                pagination={
                    { current: 1, pageSize: 1, showSizeChanger: true }
                }
            />



        </>
    )

}

export default UserTable;