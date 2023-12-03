import React, {useCallback, useEffect} from "react";
import {Task} from "features/TodolistsList/ui/Todolist/Task/Task";
import {
    TodolistDomainType, todolistsThunks
} from "features/TodolistsList/model/todolists/todolistsSlice";
import {tasksThunks} from "features/TodolistsList/model/tasks/tasksSlice";
import {useAppDispatch} from "common/hooks";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {AddItemForm, EditableSpan} from "common/components";
import {TaskStatuses} from "common/enums/enums";
import {TaskType} from "features/TodolistsList/api/tasks/tasksApi.types";
import {FilterTasksButtons} from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";

export const Todolist = React.memo(function ({demo = false, tasks, todolist}: Props) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(tasksThunks.fetchTasks(todolist.id));
    }, []);

    const addTaskCallback = useCallback(
        (title: string) => {
            dispatch(tasksThunks.addTask({title, todolistId: todolist.id}))
        },
        [todolist.id],
    );

    const removeTodolistHandler = () => {
        dispatch(todolistsThunks.removeTodolist(todolist.id))
    };

    const changeTodolistTitleHandler = useCallback(
        (title: string) => {
            dispatch(todolistsThunks.changeTodolistTitle({id: todolist.id, title}));
        },
        [todolist.id],
    );

    let tasksForTodolist = tasks;

    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3>
                <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"}/>
            <div>
                {tasksForTodolist?.map((t) => (
                    <Task
                        key={t.id}
                        task={t}
                        todolistId={todolist.id}
                    />
                ))}
            </div>
            <div style={{paddingTop: "10px"}}>
                <FilterTasksButtons todolist={todolist}/>
            </div>
        </div>
    );
});

// types

type Props = {
    todolist: TodolistDomainType;
    tasks: Array<TaskType>;
    demo?: boolean;
};