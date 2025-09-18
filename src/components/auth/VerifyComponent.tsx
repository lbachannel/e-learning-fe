// 'use client';

// import { getCodeExpired, retryVerifyAPI, verifyAccountAPI } from "@/services/api";
// import { App, Form, Input, Spin } from "antd";
// import dayjs from "dayjs";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import duration from "dayjs/plugin/duration";
// import { SyncOutlined } from "@ant-design/icons";
// import axios from "axios";
// dayjs.extend(duration);

// interface VerifyComponentProps {
//     id: string;
// }
// const VerifyComponent = ({ id }: VerifyComponentProps) => {
//     const router = useRouter();
//     const { notification, message } = App.useApp();
//     const [remaining, setRemaining] = useState('00:00');
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmit, setIsSubmit] = useState(false);
//     const [ isRetry, setIsRetry ] = useState(false);
//     const [ form ] = Form.useForm();

//     useEffect(() => {
//         setIsLoading(true);
//         let endTime = localStorage.getItem("endTime");
//         if (!endTime) {
//             const handleGetCodeExpired = async (id: string) => {
//                 try {
//                     const response = await getCodeExpired(id);
//                     if (response?.data?.statusCode === 201) {
//                         const endTimeFromDB = response.data?.data?.codeExpired;
//                         if (response.data?.data?.codeExpired) {
//                             endTime = response.data?.data?.codeExpired;
//                         }
//                         if (!dayjs().isBefore(endTimeFromDB)) {
//                             setRemaining('');
//                             setIsLoading(false);
//                             return;
//                         }
//                     }
//                 } catch (error) {
//                     console.error(error);
//                 }
//             }
//             handleGetCodeExpired(id);
//         };
//         const timer = setInterval(() => {
//             setIsLoading(false);
//             const startTime = dayjs();
//             const diff = dayjs(endTime).diff(startTime);
//             if (diff <= 0) {
//                 // resending email
//                 setRemaining('');
//                 localStorage.removeItem('endTime');
//                 clearInterval(timer);
//             } else {
//                 const _duration = dayjs.duration(diff);
//                 const minutes = String(_duration.minutes()).padStart(2, '0');
//                 const second = String(_duration.seconds()).padStart(2, '0');
//                 setRemaining(`${minutes}:${second}`);
//             }

//         }, 1000);
//         return () => clearInterval(timer);
//     }, [isRetry, id]);

//     useEffect(() => {
//         const email = localStorage.getItem('email');
//         if (email) {
//             form.setFieldValue('userEmail', email);
//             return;
//         };
//         return;
//     }, [form])

//     const handleResendMail = async (values: IResendMail) => {
//         const { userEmail } = values;
//         setIsRetry(true);
//         try {
//             const response = await retryVerifyAPI(userEmail);
//             if (response?.data?.statusCode === 201) {
//                 setRemaining('');
//             }
//         } catch (error: unknown) {
//             if (axios.isAxiosError(error)) {
//                 if (error?.response?.data?.statusCode === 400) {
//                     notification.error({
//                         message: 'Retry verification failed',
//                         description: error.response.data.message
//                     })
//                 } else {
//                     notification.error({
//                         message: 'Retry verification failed',
//                         description: error?.response?.data?.message || 'Something went wrong' 
//                     })
//                 }
//             } else {
//                 notification.error({
//                     message: 'Retry verification failed',
//                     description: 'Unexpected error'
//                 })
//             }
//         } finally {
//             setIsRetry(false);
//         }
//     }

//     const onFinish = async (values: IVerifyAccount) => {
//         const { _id, code } = values;
//         setIsSubmit(true);
//         try {
//             const response = await verifyAccountAPI(_id, code);
//             if (response?.data?.statusCode === 201) {
//                 message.success('Verification successfully');
//                 router.push('/auth/login');
//             }
//         } catch (error: unknown) {
//             if (axios.isAxiosError(error)) {
//                 if (error?.response?.data?.statusCode === 400) {
//                     notification.error({
//                         message: 'Verification failed',
//                         description: error.response.data.message
//                     })
//                 } else {
//                     notification.error({
//                         message: 'Verification failed',
//                         description: error?.response?.data?.message || 'Something went wrong'
//                     })
//                 }
//             } else {
//                 notification.error({
//                     message: 'Verification failed',
//                     description: 'Unexpected error'
//                 })
//             }
//         } finally {
//             setIsSubmit(false);
//         }
//     }
//     return (
//         <div className="verify-layout">
//             <h1 className="verify-layout__title">PLEASE VERIFY YOUR ACCOUNT</h1>
//             {/* <div className="verify-layout__wrapper-img">
//                 <Image
//                     src="/images/email.png"
//                     width={70}
//                     height={70}
//                     alt="Email"
//                     priority
//                 />
//             </div>
//             {isLoading ?
//                 <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//                     <Spin />
//                 </div>
//                 :
//                 <div>
//                     {remaining 
//                     ? 
//                     <p className="verify-layout__text timer">
//                         {remaining}
//                     </p> 
//                     : 
//                     <div className="verify-layout__wrapper-btn">
//                         <Form
//                             className="verify-layout__form"
//                             onFinish={handleResendMail}
//                             form={form}
//                         >
//                             <Form.Item
//                                 hidden
//                                 name='userEmail'
//                             >
//                                 <Input disabled />
//                             </Form.Item>
//                             <button type="submit" className="verify-layout__btn-resend" disabled={isSubmit} >
//                                 <SyncOutlined style={{marginRight: '5px'}} /> RESEND CODE
//                             </button>
//                         </Form>
//                     </div>}
//                 </div>
//             }
//             <p className="verify-layout__text">
//                 A verification code has been sent to your registered email.
//             </p>
//             <p className="verify-layout__text">
//                 Please check your inbox.
//             </p>
//             <div className="verify-layout__wrapper-form">
//                 <Form
//                     onFinish={onFinish}
//                     className="verify-layout__form"
//                     form={form}
//                 >
//                     <Form.Item
//                         hidden
//                         initialValue={id}
//                         name="_id"
//                     >
//                         <Input />
//                     </Form.Item>

//                     <Form.Item
//                         name="code"
//                         rules={[{ required: true, message: 'Please input your code!' }]}
//                     >
//                         <Input placeholder="Enter your code..." />
//                     </Form.Item>

//                     <div className="verify-layout__wrapper-btn">
//                         <button type="submit" className="verify-layout__btn" disabled={isSubmit} >
//                             SEND VERIFICATION CODE
//                         </button>
//                     </div>

//                 </Form>
//             </div> */}
//         </div>
//     )
// }

// export default VerifyComponent;

'use client';

const TestComponent = () => {
  return (
    <div>
      <h1>Trang Verify đã tải thành công!</h1>
      <p>Lỗi không phải ở đây.</p>
    </div>
  );
};

export default TestComponent;