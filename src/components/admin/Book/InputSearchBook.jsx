import React, { useState } from 'react';


import { Button, Col, Form, Input, Row, Select, Space, theme } from 'antd';



const InputSearchBook = (props) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();


    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };



    const onFinish = (values) => {
        console.log('check value', values)
        let query = '';
        if (values.mainText) {
            query += `&mainText=/${values.mainText}/i`
        }
        if (values.category) {
            query += `&category=/${values.category}/i`
        }
        if (values.author) {
            query += `&author=/${values.author}/i`
        }
        if (query) {
            props.handleSearch(query);  //1
        }
    };

    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={8}>

                    <Form.Item
                        labelCol={{ span: 24 }} // whole column
                        name={`mainText`}
                        label={`Tên sách`}

                    >
                        <Input placeholder="Tên sách" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`author`}
                        label={`Tác giả`}

                    >
                        <Input placeholder="Tác giả" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`category`}
                        label={`Thể loại`}
                    >

                        <Input placeholder="Thể loại" />
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



export default InputSearchBook;


