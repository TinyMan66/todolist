import React, {memo, useCallback, useEffect} from "react";
import {TodolistDomainType} from "features/TodolistsList/model/todolists/todolistsSlice";
import {tasksThunks} from "features/TodolistsList/model/tasks/tasksSlice";
import {useAppDispatch} from "common/hooks";
import {AddItemForm} from "common/components";
import {TaskType} from "features/TodolistsList/api/tasks/tasksApi.types";
import {FilterTasksButtons} from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "features/TodolistsList/ui/Todolist/Tasks/Tasks";
import {TodolistTitle} from "features/TodolistsList/ui/Todolist/TodolistTitle/TodolistTitle";

export const Todolist = memo(function ({tasks, todolist}: Props) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(tasksThunks.fetchTasks(todolist.id));
    }, []);

    const addTaskCallback = useCallback(
        (title: string) => {
            dispatch(tasksThunks.addTask({title, todolistId: todolist.id}))
        },
        [todolist.id],
    );

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"}/>
            <Tasks todolist={todolist} tasks={tasks}/>
            <div style={{paddingTop: "10px"}}>
                <FilterTasksButtons todolist={todolist}/>
            </div>
        </div>
    );
});

// types
type Props = {
    todolist: TodolistDomainType
    tasks: TaskType[]
};