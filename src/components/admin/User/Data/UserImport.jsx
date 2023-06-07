import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Modal, Table, Upload } from 'antd';

const { Dragger } = Upload;
const UserImport = (props) => {

    const { openUpload, setOpenUpload } = props

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
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (

        <Modal
            title="Import file user"
            open={openUpload}
            onOk={() => setOpenUpload(false)}
            okText={'Import File'}
            onCancel={() => setOpenUpload(false)}
            okButtonProps={{
                disabled: true
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
            </Dragger>

            <Table style={{ paddingTop: 20 }}
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