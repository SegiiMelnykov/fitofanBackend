import { Request, Response } from 'express';

export type UserType = {
    id?: number;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export type SighnInAndUpReq<T> = Request<{}, {}, T>


export interface AuthReq extends Request {
    user: {
        id: number
        email: string,
    }
}

export interface TokenResponse extends Response {
    token: string
}