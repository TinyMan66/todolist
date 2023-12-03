import {Button} from "@mui/material";
import {
    FilterValuesType,
    TodolistDomainType,
    todolistsActions
} from "features/TodolistsList/model/todolists/todolistsSlice";
import {useAppDispatch} from "common/hooks";

export const FilterTasksButtons = ({todolist}: Props) => {
    const dispatch = useAppDispatch();

    const changeTodolistFilterHandler = (filter : FilterValuesType) => {
        dispatch(todolistsActions.changeTodolistFilter({id: todolist.id, filter}));
    }

    return (
        <>
            <Button
                variant={todolist.filter === "all" ? "outlined" : "text"}
                onClick={()=>changeTodolistFilterHandler("all")}
                color={"inherit"}
            >
                All
            </Button>
            <Button
                variant={todolist.filter === "active" ? "outlined" : "text"}
                onClick={()=>changeTodolistFilterHandler("active")}
                color={"primary"}
            >
                Active
            </Button>
            <Button
                variant={todolist.filter === "completed" ? "outlined" : "text"}
                onClick={()=>changeTodolistFilterHandler("completed")}
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