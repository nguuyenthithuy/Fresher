import React, { useEffect, useState } from 'react';


import { Table, Row, Col } from 'antd';
import InputInsearch from './InputInsearch';
import { callFetchListUser } from '../../../services/api';

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
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);


    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: true,
        },
        {
            title: 'Action',
            render: (text, record, index) => {

                return (
                    <>
                        <button>Delete</button>
                    </>
                )
            }
        },
    ];

    useEffect(() => {
        fetchUser()

    })
    const fetchUser = async () => {
        const query = `current=${current}&pageSize=${pageSize}`;
        const res = await callFetchListUser(query);
        if (res && res.data) {
            setListUser(res.data.result)
            setTotal(res.data.meta.total)
        }
    }






    const onChange = (pagination, filters, sorter, extra) => {
        console.log('check pagguineatoion', pagination)
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize)
            setCurrent(1);
        }
    };
    return (
        <>

            <InputInsearch />

            <Table
                className='def'
                columns={columns}
                dataSource={listUser}
                onChange={onChange}
                rowKey="_id"
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total

                    }
                }
            />



        </>
    )

}

export default UserTable;