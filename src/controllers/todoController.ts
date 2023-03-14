import { NextFunction, Response } from "express";

import { ReqWithAuthAndParams, ReqWithAuthAndBody, ReqWithAuthAndBodyAndParams } from "../types/todo";
import { AuthReq } from "../types/user";

import ApiError from "../error/ApiError";
import ToDo from "../models/todoModel";





class ToDoController {
    async create(req: ReqWithAuthAndBody, res: Response, next: NextFunction) {
        try {
            const { title, description, dueDate, completed } = req.body;
            if (title.length < 3) {
                return next(ApiError.badRequest("Title must be at least 3 characters long"));
            }
            if (!dueDate) {
                return next(ApiError.badRequest("Due date is required"));
            }
            const todo = await ToDo.create({ title, description, dueDate, completed, userId: req.user.id });
            return res.json(todo);
        } catch (e) {
            next(ApiError.internal("Something went wrong"));
        }
    }
    async getAll(req: AuthReq, res: Response, next: NextFunction) {
        try {
            const todos = await ToDo.findAll({ where: { userId: req.user.id }, order: [['dueDate', 'ASC']] });
            return res.json(todos);
        } catch (e) {
            next(ApiError.internal("Something went wrong"));
        }
    }
    async getOne(req: ReqWithAuthAndParams, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const todo = await ToDo.findOne({ where: { id, userId: req.user.id } });
            if (!todo) {
                return next(ApiError.badRequest("Todo not found"));
            }
            return res.json(todo);
        }
        
        catch (e) {
            next(ApiError.internal("Something went wrong"));
        }
    }
    async update(req: ReqWithAuthAndBodyAndParams, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { title, description, dueDate, completed } = req.body;
            const todo = await ToDo.findOne({ where: { id, userId: req.user.id } });
            if (!todo) {
                return next(ApiError.badRequest("Todo not found"));
            }
            todo.title = title;
            todo.description = description;
            todo.dueDate = dueDate;
            todo.completed = completed
            await todo.save();
            return res.json(todo);
        } catch (e) {
            next(ApiError.internal("Something went wrong"));
        }
    }
    async delete(req: ReqWithAuthAndParams, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const todo = await ToDo.findOne({ where: { id, userId: req.user.id } });
            if (!todo) {
                return next(ApiError.badRequest("Todo not found"));
            }
            await todo.destroy();
            return res.json('ok');
        } catch (e) {
            next(ApiError.internal("Something went wrong"));
        }
    }

}



export default new ToDoController();
