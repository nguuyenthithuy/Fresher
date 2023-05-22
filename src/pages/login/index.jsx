
import { Button, Checkbox, Form, Input, message, notification } from 'antd';
import './login.scss';
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {

    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log("check login")
    }
    const handleOnclick = () => {
        navigate('/register')
    }


    return (
        <>
            <div className='register-page'>
                <div className='resgister-1' >
                    <div className='resgister-2'>


                        <h3 style={{ textAlign: 'center' }}>Đăng nhập</h3>

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
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 24 }}>
                                <Button type="primary" htmlType="submit" loading={false}>
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>

                        <h3 style={{ textAlign: 'center' }}>Or</h3>
                        <div className='size'>
                            <div >Chưa có tài khoản ? <span className='colo' onClick={() => handleOnclick()}> Đăng kí</span></div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default LoginPage;