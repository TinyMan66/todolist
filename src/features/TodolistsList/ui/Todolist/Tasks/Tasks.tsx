import {Task} from "features/TodolistsList/ui/Todolist/Task/Task";
import {TodolistDomainType} from "features/TodolistsList/model/todolists/todolistsSlice";
import {TaskType} from "features/TodolistsList/api/tasks/tasksApi.types";
import {TaskStatuses} from "common/enums";

export const Tasks = ({todolist, tasks}: Props) => {
    let tasksForTodolist = tasks

    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }
    return (
        <>
            {tasksForTodolist?.map((t) => (
                <Task
                    key={t.id}
                    task={t}
                    todolistId={todolist.id}
                />
            ))}
        </>
    );
};

type Props = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}