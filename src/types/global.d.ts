export {};

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface ILogin {
        user: {
            _id: string;
            email: string;
            name: string;
        }
        access_token: string;
    }

    interface IRegisterRes {
        _id: string;
        codeExpired: string;
    }

    interface IRegisterReq {
        name: string;
        username: string;
        password: string;
    }


    interface ICodeExpired {
        codeExpired: string;
    }

    interface IRetryVerification {
        _id: string;
    }

    interface IPropsModalResendMail {
        isModalOpen: boolean;
        setIsModalOpen: (open: boolean) => void;
        userEmail: string;
    }

    interface IResendMail {
        userEmail: string;
    }

    interface IVerifyAccount {
        _id: string;
        code: string
    }

    interface IVerifyEmail {
        codeId: string;
    }
}