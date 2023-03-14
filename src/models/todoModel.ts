import sequelize from "../db";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import User from "./userModel";
import { ToDoType } from "../types/todo";

interface ToDoModel extends Model<InferAttributes<ToDoModel>, InferCreationAttributes<ToDoModel>>, ToDoType {} 

const ToDo = sequelize.define<ToDoModel>('todo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT},
    dueDate: { type: DataTypes.DATE },
    completed: {type: DataTypes.BOOLEAN, defaultValue: false}
});

User.hasMany(ToDo);

export default ToDo;