import { Form, Input, Modal, message, notification } from "antd";
import { callCreatedUser } from "../../../services/api";
import { useState } from "react";

const UserModalCreate = (props) => {

    const { openCreate, setOpenCreat } = props;
    const [isSubmit, setIsSubmit] = useState(false)
    console.log("check props create", props)

    const [form] = Form.useForm()
    console.log('check form ', form)

    const onFinish = async (values) => {
        const { fullName, email, phone, password } = values;
        setIsSubmit(true)
        const res = await callCreatedUser(fullName, email, phone, password)

        if (res && res.data) {
            message.success("Tạo user mới thành công")
            setOpenCreat(false)
            form.resetFields();
            await props.fetchUser();

        }
        else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.message
            })
        }
        setIsSubmit(false)
    }
    const handleCancel = () => {

        setOpenCreat(false);
    };
    return (
        <>

            <Modal
                title="Thêm mới user"
                open={openCreate}
                onOk={() => form.submit()}
                okText={'Tạo mới'}
                confirmLoading={isSubmit}
                cancelText={'Hủy'}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 24 }}
                    // wrapperCol={{ span: 16 }}
                    // style={{ maxWidth: 600, margin: '0 auto', marginTop: '50px' }}
                    // initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <></>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Họ tên"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your Phone!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}
export default UserModalCreate