import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { callFetchListBook } from '../../../services/api';
import InputSearchBook from './InputSearchBook';
import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import BookViewDetail from './BookViewDetail';

const TaBle = () => {

    const [listBook, setListBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState("");
    const [sorter, setSorter] = useState("");
    const [openDetail, setOpenDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState("")

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (text, record, index) => {
                return (
                    <a href='#' onClick={() => {
                        setOpenDetail(true)
                        setDataDetail(record)
                    }}>

                        {record._id}
                    </a>
                )
            }

        },
        {
            title: 'Tên sách',
            dataIndex: 'mainText',
            sorter: true

        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            sorter: true
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            sorter: true
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            sorter: true
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            sorter: true
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <>
                        <span style={{ cursor: "pointer", margin: "0 20" }}>
                            <DeleteTwoTone
                                twoToneColor="#f57800"
                            />
                        </span>
                        <EditTwoTone twoToneColor="#f57800" style={{ marginLeft: 20, cursor: "pointer" }}

                        />
                    </>

                )
            }
        },
    ];


    useEffect(() => {
        fetchBook()
    }, [current, pageSize, filter, sorter])

    const fetchBook = async () => {
        let query = `current=${current}&pageSize=${pageSize}`
        if (filter) {
            query += `&${filter}`
        }
        if (sorter) {
            query += `&${sorter}`
        }
        console.log('check filter', filter)
        const res = await callFetchListBook(query);
        console.log('check res query', res)
        if (res && res.data) {
            setListBook(res.data.result)
            setTotal(res.data.meta.total)
        }
    }


    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current)
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
        console.log('check sorter', sorter)
        if (sorter && sorter.field) {
            const q = sorter.order = "ascend" ? `sort=${sorter.field}` : `sort=-${sorter.field}`
            setSorter(q)
        }
    };

    const handleSearch = (query) => {
        setFilter(query)
    }
    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List Book</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type='primary'
                    // onClick={() => exportFile()}
                    >
                        Export
                    </Button>


                    <Button
                        icon={<PlusOutlined />}
                        type='primary'
                    // onClick={() => setOpenCreat(true)}
                    >
                        Thêm mới
                    </Button>

                    <Button
                        type='ghost' onClick={() => {
                            setFilter("");
                            setSorter("")
                        }}
                    >
                        <ReloadOutlined />
                    </Button>
                </span>
            </div>
        )
    }


    return (

        <>

            <InputSearchBook
                handleSearch={handleSearch}
                setFilter={setFilter}
            />

            <Table
                title={renderHeader}
                columns={columns}
                dataSource={listBook}
                onChange={onChange}
                rowKey="_id"
                pagination={
                    {
                        showTotal: (total, range) => {
                            return (
                                <div>
                                    {range[0]}-{range[1]} trên {total} rows
                                </div>
                            )
                        },

                        current: current,
                        pageSize: pageSize,
                        total: total,
                        showSizeChanger: true
                    }
                }
            />

            <BookViewDetail
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}

            />
        </>



    )
}
export default TaBle