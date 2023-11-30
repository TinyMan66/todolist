import React from "react";
import {useFormik} from "formik";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from "@mui/material";
import {selectIsLoggedIn} from "features/Login/auth.selectors";
import {authThunks} from "features/Login/auth-reducer";
import {BaseResponse} from "common/types/commonTypes";

export const Login = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values, formikHelpers ) => {
      dispatch(authThunks.login(values))
          .unwrap()
          .then(() => {})
          .catch((reason: BaseResponse) => {
            reason.fieldsErrors?.forEach((f) =>{
              return formikHelpers.setFieldError(f.field, f.error)
            })
          })
    },
  });

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered{" "}
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p> Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField autoComplete='off' label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
              <TextField autoComplete='off' type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
