import {AnyAction, createSlice, PayloadAction} from "@reduxjs/toolkit";

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
    extraReducers: builder => {
        builder
            .addMatcher((action: AnyAction) => {
                return action.type.endsWith('/pending')
            }, (state, action) => {
                state.status = 'loading'
            }).addMatcher((action) => {
                return action.type.endsWith('/rejected')
            }, (state, action) => {
                state.status = 'failed'
            }).addMatcher((action) => {
                return action.type.endsWith('/fulfilled')
            }, (state, action) => {
                state.status = 'succeeded'
            })
    }
});

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = ReturnType<typeof slice.getInitialState>;

export const appSlice = slice.reducer;
export const appActions = slice.actions;
