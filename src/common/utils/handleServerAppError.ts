import {Dispatch} from "redux";
import {appActions} from "app/appSlice";
import {BaseResponse} from "common/types/commonTypes";

/**
 * Error handler for server interactions with the API
 *
 * @template D - Generic type for the response data.
 * @param {BaseResponse<D>} data - The response data from the server.
 * @param {Dispatch} dispatch - Redux dispatch function.
 * @param {boolean} [showGlobalError=true] - Flag to indicate whether to show the global error in the application.
 * @returns {void}
 */

export const handleServerAppError = <D>(data: BaseResponse<D>, dispatch: Dispatch, showGlobalError = true) => {
    if (showGlobalError) {
        dispatch(appActions.setAppError({ error: data.messages.length? data.messages[0] : "Some error occurred" }));
    }
};