import {instance} from "common/api/instance";
import {UpdateDomainTaskModelType} from "features/TodolistsList/tasks-reducer";
import {ResponseType} from "common/types/commonTypes";
import {CreateTaskArg, GetTasksResponse, TaskType, TodolistType} from "features/TodolistsList/todolistsApi.types";

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists");
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", { title: title });
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, { title: title });
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(arg: CreateTaskArg) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title });
    },
    updateTask(taskId: string, todolistId: string, model: UpdateDomainTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
};
