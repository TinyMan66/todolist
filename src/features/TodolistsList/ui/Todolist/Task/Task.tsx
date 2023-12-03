import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses} from "common/enums/enums";
import {TaskType} from "features/TodolistsList/api/tasks/tasksApi.types";
import {tasksThunks} from "features/TodolistsList/model/tasks/tasksSlice";
import {useAppDispatch} from "common/hooks";
import s from "./Task.module.css";

export const Task = React.memo(({task, todolistId}: Props) => {
    const dispatch = useAppDispatch();

    const removeTaskHandler = () => {
        dispatch(tasksThunks.removeTask({taskId: task.id, todolistId}))
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(tasksThunks.updateTask({
            taskId: task.id,
            domainModel: {status},
            todolistId
        }))
    }

    const changeTitleHandler = (title: string) => {
        dispatch(tasksThunks.updateTask({
            taskId: task.id,
            domainModel: {title},
            todolistId
        }))
    }

    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
            <Checkbox checked={task.status === TaskStatuses.Completed} color="primary"
                      onChange={changeStatusHandler}/>

            <EditableSpan value={task.title} onChange={changeTitleHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});

// types
type Props = {
    task: TaskType;
    todolistId: string;
};