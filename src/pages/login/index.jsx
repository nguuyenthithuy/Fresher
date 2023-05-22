
import { Button, Checkbox, Descriptions, Form, Input, message, notification } from 'antd';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import { callLogin } from '../../services/api';



const LoginPage = () => {

    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { username, password } = values;

        const res = await callLogin(username, password);
        if (res?.data) {
            localStorage.setItem("access_token", res.data.access_token)
            message.success("Đăng nhập thành công")
            navigate('/');
        }
        else {
            notification.error({
                message: "Có lỗi xảy ra",
                Descriptions: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 5
            })
        }
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
                                label="Email"
                                name="username"
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