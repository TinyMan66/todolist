import {useAppDispatch} from "common/hooks";
import {useFormik} from "formik";
import {authThunks} from "features/auth/model/authSlice";
import {BaseResponse} from "common/types/commonTypes";
import {LoginParamsType} from "features/auth/api/authApi.types";

export const useLogin = () => {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        validate: (values) => {
            const errors: FormikError = {};
            if (!values.email) {
                errors.email = "Email is required!";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }

            if (!values.password) {
                errors.password = "Password is equired!";
            } else if (values.password.length < 3) {
                errors.password = "Must be 3 characters or more";
            }

            return errors;
        },
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
            captcha: ""
        },
        onSubmit: (values, formikHelpers ) => {
            formik.setFieldValue('captcha', "")
            dispatch(authThunks.login(values))
                .unwrap()
                .then(() => {
                })
                .catch((reason: BaseResponse) => {
                    reason.fieldsErrors?.forEach((f) =>{
                        return formikHelpers.setFieldError(f.field, f.error)
                    })
                })
        },
    });

    return {formik}
}

// types
type FormikError = Partial<Omit<LoginParamsType, 'captcha'>>