import React from "react"
import {Switch , Route} from "react-router-dom"
import {Home,Login,Register,MainApp,DataTesting,DataTraining,TambahData,EditDataTraining,ActivationEmail} from "../../../pages"

function Body(){
    return(
        <section>
            <Switch>
                <Route path="/" component={Home} exact />
            </Switch>
            <Switch>
                <Route path="/dataTraining" component={DataTraining} exact />
            </Switch>
            <Switch>
                <Route path="/dataTesting" component={DataTesting} exact />
            </Switch>
            <Switch>
                <Route path="/edit/:id" component={EditDataTraining} exact/>
            </Switch>
            <Switch>
                <Route path="/tambahData" component={TambahData} exact />
            </Switch>
            <Switch>
                <Route path="/login" component={Login} exact/>
            </Switch>
            <Switch>
                <Route path="/register" component={Register} exact/>
            </Switch>
            <Switch>
            <Route path="/activate/:activation_token" component={ActivationEmail} exact />
            </Switch>
        </section>
    )
}

export default Body