'use client';

import AuthLayout from "@/components/auth/AuthComponent";
import { registerAPI } from "@/services/api";
import { App, ConfigProvider, Form, Input, Space, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { redirect } from 'next/navigation';

const RegisterPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { notification } = App.useApp();
    const onFinish = async (values: IRegisterReq) => {
        setIsLoading(true);
        const { name, username, password } = values;
        try {
            const response = await registerAPI(name, username, password);
            if (response?.data?.statusCode === 201) {
                if (response.data?.data?.codeExpired) {
                    localStorage.setItem('endTime', response.data.data.codeExpired);
                }
                localStorage.setItem('email', username);
                redirect(`/verify/${response?.data?.data?._id}`);

            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.data?.statusCode === 400) {
                    notification.error({
                        message: 'Register failed',
                        description: error.response.data.message
                    })
                } else {
                    notification.error({
                        message: 'Register failed',
                        description: error?.response?.data?.message || 'Something went wrong' 
                    })
                }
            } else {
                notification.error({
                    message: "Register failed",
                    description: "Unexpected error",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <AuthLayout title="Register account">
            {isLoading &&
                <div className="spinner-overlay">
                    <Spin />
                </div>
            }
            <Form
                className={'auth-layout__register'}
                onFinish={onFinish}
                autoComplete="on"
            >
                <Form.Item
                    name="name"
                >
                    <Input placeholder="Name" />
                </Form.Item>

                <Form.Item
                    name="username"
                    rules={[
                        { required: true, message: 'Email is required!' },
                        { type: "email", message: 'Invalid email format!' }
                    ]}
                    validateTrigger="onBlur"
                >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Password is required!' },
                        { min: 10, message: "Password must be at least 10 characters!" }
                    ]}
                    validateTrigger="onBlur"
                    hasFeedback
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    rules={[
                        { required: true, message: 'Please input your confirm password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                                }
                                return Promise.reject(new Error("Passwords do not match!"));
                            },
                        })
                    ]}
                    validateTrigger="onBlur"
                    hasFeedback
                >
                    <Input.Password placeholder="Confirm password" />
                </Form.Item>

                <ConfigProvider >
                    <Space>
                        <button type="submit" className="auth-layout__register-btn">
                            Register
                        </button>
                    </Space>
                </ConfigProvider>
            </Form>
        </AuthLayout>
    )
}

export default RegisterPage;