import React from 'react'
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom';
import { Login, MainApp, Register, DataTesting, DataTraining, TambahData,Home,EditDataTraining,ActivationEmail } from '../../pages';

const Routes = () => {
    return (
    <Router>
        <Switch>
            <Route path="/">
                <MainApp />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/activate/:activation_token">
                <ActivationEmail/>
            </Route>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/datatesting">
                <DataTesting />
            </Route>
            <Route path="/datatraining">
                <DataTraining />
            </Route>
            <Route path="/edit/:id" >
                <EditDataTraining />
            </Route>
            <Route path="/akurasi">
                <TambahData />
            </Route>
        </Switch>
    </Router>
    )
}

export default Routes;
