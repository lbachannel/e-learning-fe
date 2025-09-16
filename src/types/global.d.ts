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

    interface IRegister {
        _id: string;
        codeExpired: string;
    }

    interface ICodeExpired {
        codeExpired: string;
    }

    interface IRetryVerification {
        _id: string;
    }
}