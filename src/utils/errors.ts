import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError{
    static type: string;
    constructor(message?: any) {
        super();
        this.type = message;
    }

}

export class InvalidEmailPasswordError extends AuthError {
    static type = "Invalid credentials";
}

export class InActivedAccountError extends AuthError {
    static type = "Your account is not activated yet. Please check your email to verify your account."
}