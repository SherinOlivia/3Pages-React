import React from 'react';
import { SmileOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Input, Form as AntForm } from 'antd';
import { Formik, Form, Field, ErrorMessage,  } from 'formik';
import * as Yup from 'yup'
import { TextLevel } from '../../components';
import styles from './Register.module.css'
import { useNavigate } from 'react-router-dom';
interface RegisterInfo {
    name: string;
    email: string;
    password: string;
}

const passwordValidationError = (str: string) => {
    return `Your Password must have at least 1 ${str} character`;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please Enter Your Name'),
    email: Yup.string().email("Invalid Email!").required('Please Enter Your Email'),
    password: Yup.string().min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, passwordValidationError("digit"))
    .matches(/[a-z]/, passwordValidationError("lowercase"))
    .matches(/[A-Z]/, passwordValidationError("uppercase"))
    .required('Please Enter Your Password')
})

  const Register: React.FC = () => {
    const navigate = useNavigate()

    // const handleSubmit = (values: RegisterInfo) => {
    //     console.log(`Successfully registered!`,values)
    //     navigate('/login')
    //   }
      const handleRegister = async (values: RegisterInfo) => {
        console.log(`Successfully Registered..!`, values)
        const apiUrl = "https://mock-api.arikmpt.com/api/user/register"
    
        try {
            const response = await fetch (apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            console.log(response)
            const data = await response.json()
    
            if (response.ok){
                navigate('/login');
            } else {
                alert(data.errors)
            }
        } catch (error) {
            alert("Register Failedddd...!")
        }
    
      }

      return (
        <Row className={styles.wrapper}>
            <Col span={8}></Col>
            <Col span={8} className={styles.body}>
                <Card className={styles.card}>
                    <Formik 
                    initialValues = {{name: "", email: "", password: ""}}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}>
                        <Form name="basic" autoComplete="off">
                            <TextLevel level={3} content={"Register"}/>
                    
                            <AntForm.Item label="Name">
                            <Field prefix={<SmileOutlined className="site-form-item-icon" />} 
                            name="name" as={Input} placeholder="Enter Your Name" />
                            
                            <div className={styles.error}>
                                <ErrorMessage name="name" />
                            </div>
                            </AntForm.Item>
                    
                            <AntForm.Item label="Email" name="email">
                            <Field prefix={<UserOutlined className="site-form-item-icon" />} 
                            name="email" as={Input} placeholder="Enter Your Email" />
                            
                            <div className={styles.error}>
                                <ErrorMessage name="email" />
                            </div>
                            </AntForm.Item>
                        
                            <AntForm.Item label="Password" name="password">
                            <Field prefix={<LockOutlined className="site-form-item-icon" />} 
                            name="password" as={Input} placeholder="Enter Your Password" />

                            <div className={styles.error}>
                                <ErrorMessage name="password" />
                            </div>
                            </AntForm.Item>
                        
                            <AntForm.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                            </AntForm.Item>
                        </Form>
                    </Formik>
                </Card>
            </Col>
        </Row>
      )
 
    };

  export default Register