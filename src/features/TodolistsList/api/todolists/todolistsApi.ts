import {instance} from "common/api/instance";
import {BaseResponse} from "common/types/commonTypes";
import {TodolistType} from "features/TodolistsList/api/todolists/todolistsApi.types";

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists");
    },
    createTodolist(title: string) {
        return instance.post<BaseResponse<{ item: TodolistType }>>("todo-lists", { title: title });
    },
    deleteTodolist(id: string) {
        return instance.delete<BaseResponse>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<BaseResponse>(`todo-lists/${id}`, { title: title });
    },
};
