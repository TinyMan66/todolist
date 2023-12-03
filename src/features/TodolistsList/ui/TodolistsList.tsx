import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "app/store";
import {todolistsThunks,
} from "features/TodolistsList/model/todolists/todolistsSlice";
import {Grid, Paper} from "@mui/material";
import {Todolist} from "features/TodolistsList/ui/Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "common/hooks";
import {selectTodolists} from "features/TodolistsList/model/todolists/todolistsSelectors";
import {selectTasks} from "features/TodolistsList/model/tasks/tasksSelectors";
import {AddItemForm} from "common/components";

type PropsType = {
    demo?: boolean;
};

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks);
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        dispatch(todolistsThunks.fetchTodolists());
    }, []);

    const addTodolistCallback = useCallback((title: string) => {
        dispatch(todolistsThunks.addTodolist(title));
    }, []);

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>;
    }

    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolistCallback}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id];

                    return (
                        <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={allTodolistTasks}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};
