import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@mui/material";
import {selectCaptchaUrl, selectIsLoggedIn} from "features/auth/model/auth.selectors";
import {useLogin} from "features/auth/lib/useLogin";
import {useAppDispatch} from "common/hooks";
import {authThunks} from "features/auth/model/authSlice";
import s from "./Login.module.css"

export const Login = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const captchaUrl = useSelector(selectCaptchaUrl);
  const {formik} = useLogin();
  const dispatch = useAppDispatch();
  const refreshCaptchaImage = () => {
      dispatch(authThunks.captcha())
  }

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
                {captchaUrl &&
                    <div className={s.captchaContainer}>
                        <img src={captchaUrl} alt="captcha"/>
                        <Button type={"button"} variant={"contained"} color={"primary"} onClick={refreshCaptchaImage}>
                            Change image
                        </Button>
                        <TextField style={{width: "100%", marginBottom: "20px"}} autoComplete='off' type="captcha" label="Enter symbols from the picture" margin="normal" {...formik.getFieldProps("captcha")} />
                    </div> }
              <Button type={"submit"} variant={"contained"} color={"primary"} disabled={!(formik.isValid && formik.dirty)}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};