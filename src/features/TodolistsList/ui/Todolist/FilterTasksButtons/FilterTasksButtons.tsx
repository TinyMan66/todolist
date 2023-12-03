import {Button} from "@mui/material";
import {TodolistDomainType, todolistsActions} from "features/TodolistsList/model/todolists/todolistsSlice";
import {useAppDispatch} from "common/hooks";

export const FilterTasksButtons = ({todolist}: Props) => {
    const dispatch = useAppDispatch();
    const {id, filter} = todolist

    const allClickHandler = () => {
        dispatch(todolistsActions.changeTodolistFilter({id, filter}));
    };
    const activeClickHandler = () => {
        dispatch(todolistsActions.changeTodolistFilter({id, filter}));
    };
    const completedClickHandler = () => {
        dispatch(todolistsActions.changeTodolistFilter({id, filter}));
    };

    return (
        <>
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
        </>
    );
};

// types
type Props = {
    todolist: TodolistDomainType;
}