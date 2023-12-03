import {instance} from "common/api/instance";
import {BaseResponse} from "common/types/commonTypes";
import {LoginParamsType} from "features/auth/api/authApi.types";

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<BaseResponse<{ userId?: number }>>("auth/login", data);
    },
    logout() {
        return instance.delete<BaseResponse<{ userId?: number }>>("auth/login");
    },
    me() {
        return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("auth/me");
    },
};