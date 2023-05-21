import React from 'react';
// import './index.css';
import { Button, Checkbox, Form, Input } from 'antd';
import './register.scss'

const RegisterPage = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
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
                            name="username"
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
                            <Button type="primary" htmlType="submit" loading={false}>
                                Đăng kí
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>

    )
}
export default RegisterPage;