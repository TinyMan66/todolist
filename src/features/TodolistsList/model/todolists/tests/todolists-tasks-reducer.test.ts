import {TodolistDomainType, todolistsSlice, todolistsThunks} from "features/TodolistsList/model/todolists/todolistsSlice";
import { tasksSlice, TasksState } from "features/TodolistsList/model/tasks/tasksSlice";
import {TodolistType} from "features/TodolistsList/api/todolists/todolistsApi.types";

test("ids should be equals", () => {
  const startTasksState: TasksState = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  let todolist: TodolistType = {
    title: "new todolist",
    id: "any id",
    addedDate: "",
    order: 0,
  };

  const action = todolistsThunks.addTodolist.fulfilled({ todolist }, "requestId", todolist.title);

  const endTasksState = tasksSlice(startTasksState, action);
  const endTodolistsState = todolistsSlice(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
