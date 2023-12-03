import React, {useCallback, useEffect} from "react";
import {Task} from "features/TodolistsList/ui/Todolist/Task/Task";
import {
    TodolistDomainType,
    todolistsActions, todolistsThunks
} from "features/TodolistsList/model/todolists/todolistsSlice";
import {tasksThunks} from "features/TodolistsList/model/tasks/tasksSlice";
import {useAppDispatch} from "common/hooks";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {AddItemForm, EditableSpan} from "common/components";
import {TaskStatuses} from "common/enums/enums";
import {TaskType} from "features/TodolistsList/api/tasks/tasksApi.types";

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

    const allClickHandler = useCallback(
        () => {
            dispatch(todolistsActions.changeTodolistFilter({ id: todolist.id, filter: "all" }));
        },
        [todolist.id],
    );
    const activeClickHandler = useCallback(
        () => {
            dispatch(todolistsActions.changeTodolistFilter({ id: todolist.id, filter: "active" }));
        },
        [todolist.id],
    );
    const completedClickHandler = useCallback(
        () => {
            dispatch(todolistsActions.changeTodolistFilter({ id: todolist.id, filter: "completed" }));
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
                <Button
                    variant={todolist.filter === "all" ? "outlined" : "text"}
                    onClick={allClickHandler}
                    color={"inherit"}
                >
                    All
                </Button>
                <Button
                    variant={todolist.filter === "active" ? "outlined" : "text"}
                    onClick={activeClickHandler}
                    color={"primary"}
                >
                    Active
                </Button>
                <Button
                    variant={todolist.filter === "completed" ? "outlined" : "text"}
                    onClick={completedClickHandler}
                    color={"secondary"}
                >
                    Completed
                </Button>
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