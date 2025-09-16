'use client';
import { retryVerifyAPI, verifyAccountAPI } from "@/services/api";
import { useHasMounted } from "@/utils/customHook";
import { SmileOutlined, SolutionOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import { App, Form, Input, Modal, Steps } from "antd";
import { useEffect, useState } from "react";

const ModalResendMail = (props: any) => {
    const { isModalOpen, setIsModalOpen, userEmail } = props;
    const [current, setCurrent] = useState(0);
    const [ userId, setUserId ] = useState('');
    const hasMounted = useHasMounted();
    const [ form ] = Form.useForm();
    const { notification } = App.useApp();
    
    useEffect(() => {
        if (userEmail) {
            form.setFieldValue('userEmail', userEmail);
        }
    }, [userEmail])
    
    if (!hasMounted) {
        return <></>
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // step 0
    const handleResendMail = async (values: any) => {
        const { userEmail } = values;
        try {
            const response = await retryVerifyAPI(userEmail);
            if (response?.data?.statusCode === 201) {
                setUserId(response.data?.data?._id!);
                setCurrent(1);
            }
        } catch (error: any) {
            if (error.response.data.statusCode === 400) {
                notification.error({
                    message: 'Retry verification failed',
                    description: error.response.data.message
                })
            } else {
                notification.error({
                    message: 'Retry verification failed',
                    description: error?.response?.data?.message || 'Something went wrong' 
                })
            }
        }
    }

    // step 1
    const handleVerifyEmail = async (values: any) => {
        const { codeId } = values;
        try {
            const response = await verifyAccountAPI(userId, codeId);
            if (response?.data?.statusCode === 201) {
                setCurrent(2);
            }
        } catch (error: any) {
            if (error.response.data.statusCode === 400) {
                notification.error({
                    message: 'Verification failed',
                    description: error.response.data.message
                })
            } else {
                notification.error({
                    message: 'Verification failed',
                    description: error?.response?.data?.message || 'Something went wrong'
                })
            }
        }
    }

    return (
        <Modal
            title="Verification account"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            maskClosable={false}
            footer={false}
        >
            <Steps
                current={current}
                items={[
                    {
                        title: 'Login',
                        icon: <UserOutlined />,
                    },
                    {
                        title: 'Verification',
                        icon: <SolutionOutlined />,
                    },
                    {
                        title: 'Done',
                        icon: <SmileOutlined />,
                    },
                ]}
            />

            {current === 0 &&
                <div>
                    <p style={{margin: '20px 0 20px'}}>Your account is not activated yet</p>
                    <Form
                        onFinish={handleResendMail}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            name="userEmail"
                        >
                            <Input disabled />
                        </Form.Item>

                        <button type="submit" className="auth-layout__btn-resend" >
                            <SyncOutlined style={{marginRight: '5px'}} /> RESEND CODE
                        </button>
                    </Form>
                </div>}
            {current === 1 && 
                <div>
                    <p style={{margin: '20px 0 20px'}}>Please enter the verification code.</p>
                    <Form
                        className={''}
                        onFinish={handleVerifyEmail}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            name="codeId"
                            rules={[{ required: true, message: 'Code is required!' }]}
                        >
                            <Input placeholder="Enter the verification code..." />
                        </Form.Item>

                        <button type="submit" className="auth-layout__btn-resend" >
                            <SyncOutlined style={{marginRight: '5px'}} /> Active
                        </button>
                    </Form>
                </div>}
            {current === 2 && 
                <div>
                    <p style={{margin: '20px 0 20px'}}>Your account has been successfully verified, please log in again.</p>
                </div>}
        </Modal>
    )
};

export default ModalResendMail;