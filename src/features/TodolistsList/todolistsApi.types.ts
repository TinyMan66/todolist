import {TaskPriorities, TaskStatuses} from "common/enums/enums";

export type TodolistType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};
export type TaskType = {
    description: string;
    title: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};
export type UpdateTaskArg = {
    taskId: string
    domainModel: UpdateDomainTaskModelType
    todolistId: string
}
export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
}
export type UpdateTaskModelType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
};
export type CreateTaskArg = {
    todolistId: string
    title: string
}
export type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: TaskType[];
};