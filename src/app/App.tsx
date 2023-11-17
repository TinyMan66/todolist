import React, { useCallback, useEffect } from "react";
import "./App.css";
import { TodolistsList } from "features/TodolistsList/TodolistsList";
import { ErrorSnackbar } from "components/ErrorSnackbar/ErrorSnackbar";
import { useSelector } from "react-redux";
import { initializeAppTC } from "./app-reducer";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Login } from "features/Login/Login";
import { logoutTC } from "features/Login/auth-reducer";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import {selectAppStatus, selectIsInitialized} from "app/app.selectors";
import {selectIsLoggedIn} from "features/Login/auth.selectors";
import {useAppDispatch} from "hooks/useAppDispatch";

type PropsType = {
  demo?: boolean;
};

function App({ demo = false }: PropsType) {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC());
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">News</Typography>
            {isLoggedIn && (
              <Button color="inherit" onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList demo={demo} />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </HashRouter>
  );
}

export default App;