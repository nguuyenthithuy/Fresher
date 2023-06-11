import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Descriptions, message, Modal, notification, Table, Upload } from 'antd';
import *as XLSX from 'xlsx'
import { callBulkCreatUser } from '../../../../services/api';
import simplefile from './simplefile.xlsx?url'
const { Dragger } = Upload;
const UserImport = (props) => {

    const { openUpload, setOpenUpload } = props
    const [dataExcel, setDataExcel] = useState([])

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 2000);
    };

    const propsImport = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",

        // Cho tải lên file gì csv excel
        //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',    

        customRequest: dummyRequest, // custom file ko dùng action
        onChange(info) {
            console.log('check info', info)
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log('check fiel', info.file, info.fileList);
            }
            if (status === 'done') {
                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj

                    const reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onload = function (e) {
                        const data = new Uint8Array(e.target.result);

                        const workbook = XLSX.read(data, { type: 'array' });

                        // find the name of your sheet in the workbook first
                        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

                        // convert to json format
                        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                            header: ["fullName", "email", "phone"],
                            range: 1
                        });
                        if (jsonData && jsonData.length > 0) {
                            setDataExcel(jsonData)
                        }
                    };



                }

            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const handleSubmit = async () => {
        const data = dataExcel.map(item => {
            item.password = '123456'
            return item;

        })
        const res = await callBulkCreatUser(data)
        console.log('check data', res)
        if (res && res.data) {
            notification.success({
                description: `Success :${res.data.countSuccess} ; Error :${res.data.countError}`,
                message: "Upload thành công"
            })
            setDataExcel([]);
            setOpenUpload(false)
        }
        else {
            notification.error({
                description: res.message,
                message: "Có lỗi xảy ra"
            })
        }
    }

    // e => e.stopPropagation() ( dung thao tac o thao tac con khong dụng den thao tac cha)
    return (

        <Modal
            title="Import file user"
            open={openUpload}
            onOk={() => handleSubmit()}
            okText={'Import File'}
            onCancel={() => setOpenUpload(false)}
            okButtonProps={{
                disabled: dataExcel.length < 1
            }}
            maskClosable={false}
        >

            <Dragger {...propsImport}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.

                </p>
                <a onClick={e => e.stopPropagation()} href={simplefile} download>Download Sample File</a>

            </Dragger>

            <Table style={{ paddingTop: 20 }}
                dataSource={dataExcel}
                title={() => <span>Dữ liệu Upload</span>}
                columns={[
                    { dataIndex: 'fullName', title: 'Tên hiển thị' },
                    { dataIndex: 'email', title: 'Email' },
                    { dataIndex: 'phone', title: 'Số điện thoại' },
                ]}
            >

            </Table>
        </Modal>

    )



}
export default UserImport