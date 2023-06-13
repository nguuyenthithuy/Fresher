import { Form, Input, Modal, message, notification } from "antd";
import { useEffect, useState } from "react";
import { callUpdateUser } from "../../../services/api";

const UpdateUser = (props) => {
    const { openUpdate, setOpenUpdate, dataUpdate, setDataUpdate } = props
    const [isSubmit, setIsSubmit] = useState(false)
    const [form] = Form.useForm()
    const onFinish = async (values) => {
        console.log('chcek value', values)
        const { _id, fullName, phone } = values;
        setIsSubmit(true)
        const res = await callUpdateUser(_id, fullName, phone)
        console.log('check res', res)

        if (res && res.data) {
            message.success("Update user thành công")
            setOpenUpdate(false)
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

    useEffect(() => {
        form.setFieldsValue(dataUpdate)  // gan gia tri cho tat ca cac truong
    }, [dataUpdate])
    return (
        <>

            <Modal
                title="Update User"
                open={openUpdate}
                onOk={() => form.submit()}
                okText={'Cập nhật'}
                confirmLoading={isSubmit}
                cancelText={'Hủy'}
                onCancel={() => {
                    setOpenUpdate(false)
                    setDataUpdate(null)

                }}
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
                        hidden
                        labelCol={{ span: 24 }}
                        label="Id"
                        name="_id"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

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
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your Phone!' }]}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )

}
export default UpdateUser