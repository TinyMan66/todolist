import { appActions } from "app/appSlice";
import { Dispatch } from "redux";
import axios from "axios";

/**
 * Handles network errors from server responses or other unknown sources.
 *
 * @param {unknown} error - The error object, which may be an Axios error, a native JavaScript error, or another type of error.
 * @param {Dispatch} dispatch - The dispatch function from Redux to update the application state.
 * @returns {void}
 */

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage = "Some error occurred!"

  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`;
  } else {
    errorMessage = JSON.stringify(error);
  }

  dispatch(appActions.setAppError({ error: errorMessage }));
};
