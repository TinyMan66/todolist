import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {fetchTasksTC} from "./tasks-reducer";
import {AppThunk} from "../../app/store";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'CLEAR-DATA':
            return []
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const clearTodosDataAC = () => ({type: 'CLEAR-DATA'} as const)

// thunks
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    const res = await todolistsAPI.getTodolists()
    dispatch(setTodolistsAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
    const todos = res.data
    todos.forEach(tl => {
        dispatch(fetchTasksTC(tl.id))
    })
}
// export const _fetchTodolistsTC = (): AppThunk => {
//     return (dispatch) => {
//         dispatch(setAppStatusAC('loading'))
//         todolistsAPI.getTodolists()
//             .then((res) => {
//                 dispatch(setTodolistsAC(res.data))
//                 dispatch(setAppStatusAC('succeeded'))
//                 return res.data
//             })
//             .then((todos) => {
//                 todos.forEach(tl => {
//                     dispatch(fetchTasksTC(tl.id))
//                 })
//             })
//     }
// }
export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(setAppStatusAC('loading'))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    await todolistsAPI.deleteTodolist(todolistId)
    dispatch(removeTodolistAC(todolistId))
    //скажем глобально приложению, что асинхронная операция завершена
    dispatch(setAppStatusAC('succeeded'))
}
export const addTodolistTC = (title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    const res = await todolistsAPI.createTodolist(title)
    dispatch(addTodolistAC(res.data.data.item))
    dispatch(setAppStatusAC('succeeded'))
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => async dispatch => {
    await todolistsAPI.updateTodolist(id, title)
    dispatch(changeTodolistTitleAC(id, title))
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ClearTodosDataActionType = ReturnType<typeof clearTodosDataAC>
export type TodolistsActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | ClearTodosDataActionType
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
// type ThunkDispatch = Dispatch<TodolistsActionsType | SetAppStatusActionType>
