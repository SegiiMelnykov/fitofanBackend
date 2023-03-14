import { Request, Response } from 'express';
import { AuthReq } from './user';


export type ToDoType = {
    id?: number;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    userId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ReqWithAuthAndParams extends AuthReq {
    params: {
        id: string;
    };
}

export interface ReqWithAuthAndBody extends AuthReq {
    body: ToDoType;
}

export interface ReqWithAuthAndBodyAndParams extends AuthReq {
    body: ToDoType;
    params: {
        id: string
    };
}
