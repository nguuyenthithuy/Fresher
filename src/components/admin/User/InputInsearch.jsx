import React, { useState } from 'react';


import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd';



const AdvancedSearchForm = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [expand, setExpand] = useState(false);

    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={8}>

                    <Form.Item
                        labelCol={{ span: 24 }} // whole column
                        name={`fullName`}
                        label={`Name`}

                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`email`}
                        label={`Email`}

                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`phone`}
                        label={`Số điện thoại`}
                    >

                        <Input placeholder="Số điện thoại" />
                    </Form.Item>
                </Col>

            </Row>

            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>

                    <Button type='primary' htmlType="submit">
                        Search
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        Clear
                    </Button>
                </Col>
            </Row>

            {/* <Space size="small">
                <Button type="primary" htmlType="submit">
                    Search
                </Button>
                <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        Clear
                    </Button>
                
                {/* <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <DownOutlined rotate={expand ? 180 : 0} /> Collapse
          </a> */}
            {/* </Space> */}

        </Form>
    );
};

const InputInsearch = () => {
    return (
        <div>
            <AdvancedSearchForm />
        </div>
    )
}

export default InputInsearch;


