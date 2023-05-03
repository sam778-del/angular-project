export interface User {
    id?: number,
    name: string;
    email: string;
    password: string;
    role: number;
    Role?: any;
}

export interface checkToken {
    valid: boolean;
}

export interface GetUserOptions {
    audience?: string;
    scope?: string;
}