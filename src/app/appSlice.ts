import {AnyAction, createSlice, isAnyOf, isFulfilled, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {authThunks} from "features/auth/model/authSlice";

const slice = createSlice({
    name: "app",
    initialState: {
        status: "idle" as RequestStatusType,
        error: null as string | null,
        isInitialized: false,
    },
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        },
        setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, (state) => {
                    state.status = 'loading'
                }
            )
            .addMatcher(isFulfilled, (state) => {
                    state.status = 'succeeded'
                }
            )
            .addMatcher(isRejected, (state, action: AnyAction) => {
                    state.status = 'failed';
                    if (action.payload) {
                        if (action.type.includes("addTodolist") || action.type.includes("addTask") || action.type.includes("initializeApp")) return;
                        state.error = action.payload.messages[0]
                    } else {
                        state.error = action.error.message ? action.error.message : 'Some error occurred!'
                    }
                }
            )
            .addMatcher(
                isAnyOf(authThunks.initializeApp.fulfilled, authThunks.initializeApp.rejected),
                (state) => {
                    state.isInitialized = true;
                });
    }

});

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = ReturnType<typeof slice.getInitialState>;

export const appSlice = slice.reducer;
export const appActions = slice.actions;
