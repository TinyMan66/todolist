import {useEffect} from "react";
import "./App.css";
import {useSelector} from "react-redux";
import {HashRouter} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {selectIsInitialized} from "app/app.selectors";
import {useAppDispatch} from "common/hooks";
import {ErrorSnackbar} from "common/components";
import {authThunks} from "features/auth/model/authSlice";
import {Header} from "app/header/Header";
import {Routing} from "app/routing/Routing";

function App() {
    const isInitialized = useSelector(selectIsInitialized);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authThunks.initializeApp());
    }, []);

    if (!isInitialized) {
        return (
            <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
                <CircularProgress/>
            </div>
        );
    }

    return (
        <HashRouter>
            <div className="App">
                <ErrorSnackbar/>
                <Header/>
                <Routing/>
            </div>
        </HashRouter>
    );
}

export default App;
