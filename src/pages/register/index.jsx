import React, { useState } from 'react';

import { Button, Checkbox, Form, Input, message, notification } from 'antd';
import './register.scss'
import { useNavigate } from 'react-router-dom';
import { callRegister } from '../../services/api';



const RegisterPage = () => {

    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false)

    const handleOnclick = () => {
        navigate('/login')
    }


    const onFinish = async (values) => {
        const { fullName, email, password, phone } = values;
        setIsSubmit(true);
        const res = await callRegister(fullName, email, password, phone);
        setIsSubmit(false);
        if (res?.data?._id) { // ?. nghĩa là thay chữ &&
            message.success("Đăng kí thành công");
            navigate('/login')
        }
        else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    res.message && res.message.length > 0 ? res.message[0] : res.message,
                duration: 5,
            })
        }




    };

    return (



        <div className='register-page'>
            <div className='resgister-1' >
                <div className='resgister-2'>


                    <h3 style={{ textAlign: 'center' }}>Đăng kí người dùng mới</h3>

                    <Form
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

                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button type="primary" htmlType="submit" loading={isSubmit}>
                                Đăng kí
                            </Button>
                        </Form.Item>

                        <h3 style={{ textAlign: 'center' }}>Or</h3>
                        <div className='size'>
                            <div >Đã có tài khoản ? <span className='colo' onClick={() => handleOnclick()}> Đăng nhập</span></div>
                        </div>


                    </Form>
                </div>
            </div>
        </div>

    )
}
export default RegisterPage;