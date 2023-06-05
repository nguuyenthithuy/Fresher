import React, { useEffect, useState } from 'react';


import { Table, Row, Col, Button } from 'antd';
import { callFetchListUser } from '../../../services/api';
import InputSearch from './InputInsearch';
import UserDetail from './UserDetail';
import { CloudUploadOutlined, ExportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import UserModalCreate from './UserModalCreate';

const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("");

    const [openDetail, setOpenDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState('');

    const [openCreate, setOpenCreat] = useState(false)

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',

            render: (text, record, index) => {
                console.log("check record", record)
                return (
                    <a href='#' onClick={() => {
                        setOpenDetail(true);
                        setDataDetail(record);
                    }}>
                        {record._id}

                    </a>
                )
            }
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

    }, [current, pageSize, filter, sortQuery])

    const fetchUser = async () => {

        let query = `current=${current}&pageSize=${pageSize}`;
        if (filter) { //3
            query += `&${filter}`
        }
        console.log('check filter', filter)
        if (sortQuery) {
            query += `&${sortQuery}`
        }
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
        console.log('cgeck sorter', sorter)
        if (sorter && sorter.field) {
            const q = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`
            setSortQuery(q);
        }

    };

    const handleSearch = (query) => {
        setFilter(query)
    }

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List User</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type='primary'
                    >
                        Export
                    </Button>

                    <Button
                        icon={<CloudUploadOutlined />}
                        type='primary'
                    >
                        Import
                    </Button>

                    <Button
                        icon={<PlusOutlined />}
                        type='primary'
                        onClick={() => setOpenCreat(true)}
                    >
                        Thêm mới
                    </Button>

                    <Button
                        type='ghost' onClick={() => {
                            setFilter("");
                            setSortQuery("")
                        }}
                    >
                        <ReloadOutlined />
                    </Button>
                </span>
            </div>
        )
    }
    // Handlesearch : 3 ( props)
    return (
        <>

            <InputSearch handleSearch={handleSearch}
                setFilter={setFilter}
            />

            <Table
                className='def'
                title={renderHeader}
                columns={columns}
                dataSource={listUser}
                onChange={onChange}
                rowKey="_id"
                pagination={
                    {

                        showTotal: (total, range) => {
                            return (
                                <div> {range[0]}-{range[1]} trên {total}
                                    rows</div>
                            )
                        },
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total
                    }
                }
            />

            <UserDetail
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />

            <UserModalCreate
                openCreate={openCreate}
                setOpenCreat={setOpenCreat}
                fetchUser={fetchUser}

            />


        </>
    )

}

export default UserTable;