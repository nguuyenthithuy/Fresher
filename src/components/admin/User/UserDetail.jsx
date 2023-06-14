import { Badge, Descriptions, Divider, Drawer } from "antd";
import moment from "moment/moment";

const UserDetail = (props) => {
    const { openDetail, setOpenDetail, dataDetail, setDataDetail } = props

    console.log('check opendetail', openDetail)
    console.log('check data', dataDetail)

    const onClose = () => {
        setOpenDetail(false);
        setDataDetail('');
    };
    return (
        <>

            <Drawer
                title="Chức năng xem chi tiết"
                width={'50vw'}
                onClose={onClose}
                open={openDetail}

            >
                <Descriptions title="Thông tin user" bordered
                    column={2}>
                    <Descriptions.Item label="Id">{dataDetail._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên hiển thị">{dataDetail.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataDetail.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{dataDetail.phone}</Descriptions.Item>

                    <Descriptions.Item label="Role" span={2}>
                        <Badge status="processing" text={dataDetail.role} />
                    </Descriptions.Item>
                    <Descriptions.Item label="CreatedAt">
                        {moment(dataDetail.createdAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>
                    <Descriptions.Item label="UpdatedAt">
                        {moment(dataDetail.updatedAt).format('DD-MM-YYYY hh:mm:ss')}
                    </Descriptions.Item>

                </Descriptions>


            </Drawer>
        </>
    )
}

export default UserDetail