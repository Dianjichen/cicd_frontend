import React from 'react';
import './App.css';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import LoginPage from './routers/LoginPage';
import NoteListPage from './routers/NoteListPage';
//import PrivateRoute from "./router/PrivateRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                {/*<Route element={ <PrivateRoute/> }>*/}
                    <Route path="/noteList" element={<NoteListPage/>}/>
                {/*</Route>*/}
            </Routes>
        </Router>
    );
}

export default App;


 