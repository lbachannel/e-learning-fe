/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthError } from "@auth/core/errors";

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
    static type = "Account not activated";
}