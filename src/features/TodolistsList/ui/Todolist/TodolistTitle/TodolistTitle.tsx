import {EditableSpan} from "common/components";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import React, {useCallback} from "react";
import {TodolistDomainType, todolistsThunks} from "features/TodolistsList/model/todolists/todolistsSlice";
import {useAppDispatch} from "common/hooks";

export const TodolistTitle = ({todolist}: Props) => {
    const dispatch = useAppDispatch();
    const {id, title, entityStatus} = todolist

    const removeTodolistHandler = () => {
        dispatch(todolistsThunks.removeTodolist(id))
    };

    const changeTodolistTitleHandler = useCallback(
        (title: string) => {
            dispatch(todolistsThunks.changeTodolistTitle({id, title}));
        },
        [id],
    );
    return (
        <h3>
            <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </h3>
    );
};

// types
type Props = {
    todolist: TodolistDomainType
}