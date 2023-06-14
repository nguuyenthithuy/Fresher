import { Badge, Descriptions, Divider, Drawer, Modal, Upload } from "antd";
import moment from "moment";
import { useState } from "react";



const BookViewDetail = (props) => {
    const { openDetail, setOpenDetail, dataDetail, setDataDetail } = props

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);


        });

    const onClose = () => {
        setOpenDetail(false)
        setDataDetail('')
    }
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },

    ]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || (file.preview));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) =>
        setFileList(newFileList);
    return (
        <>
            <Drawer
                title="Xem chi tiết sách"
                width={'50vw'}
                onClose={onClose}
                open={openDetail}
            >
                <Descriptions title="Thông tin book" bordered column={2}>

                    <Descriptions.Item label="Id">{dataDetail._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên sách">{dataDetail.mainText}</Descriptions.Item>
                    <Descriptions.Item label="Tác giả" >{dataDetail.author}</Descriptions.Item>
                    <Descriptions.Item label="Giá tiền">{dataDetail.price}</Descriptions.Item>

                    <Descriptions.Item label="Thể loại" span={2}>
                        <Badge status="processing" text={dataDetail.category} />
                    </Descriptions.Item>
                    <Descriptions.Item label="CreatedAt">

                        {moment(dataDetail.createdAt).format('DD-MM-YYYY hh:mm:ss')}

                    </Descriptions.Item>
                    <Descriptions.Item label="UpdatedAt">

                        {moment(dataDetail.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>


                </Descriptions>

                <Divider orientation="left"> Ảnh book</Divider>

                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    showUploadList={
                        {
                            showRemoveIcon: false
                        }
                    }
                >

                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>

            </Drawer>
        </>
    )

}
export default BookViewDetail;